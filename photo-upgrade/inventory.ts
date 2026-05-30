/**
 * photo-upgrade/inventory.ts — Phase 1.1 of the photography-upgrade plan.
 *
 * Read-only audit of the live Shopify catalogue. Pulls EVERY product with its
 * description, all 9 `custom` metafields, and per-image {url,width,height,altText}
 * for featuredImage + images(first:20). Writes two files used downstream:
 *   - audit/inventory.csv  : one row per IMAGE (carries that image's altText) — for scoring.
 *   - audit/products.json  : one record per PRODUCT (description + metafield map + ordered
 *                            images) — the data source for build-brief.ts (Phase 5).
 *
 * It does NOT import lib/shopify/index.ts (that pulls in Next server APIs); it reuses the
 * shared productFragment string and queries the Storefront API directly. Metafields are
 * fetched inline on the paginated product list (Storefront allows it on any Product node),
 * which is strictly fewer calls than the per-handle getProduct loop the plan sketched.
 *
 * Run (no new deps required):
 *   npx tsx --env-file=.env.local photo-upgrade/inventory.ts
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import productFragment from "../lib/shopify/fragments/product";

const SHOPIFY_GRAPHQL_API_ENDPOINT = "/api/2023-01/graphql.json";

// Mirrors the identifiers in lib/shopify/queries/product.ts (single source of truth there).
const METAFIELD_KEYS = [
  "custom_material",
  "custom_size",
  "custom_dimensions",
  "custom_made_in",
  "custom_care_instructions",
  "for_occasion",
  "custom_fold_styles",
  "custom_pair_with",
  "faq",
] as const;

const metafieldIdentifiers = METAFIELD_KEYS.map(
  (key) => `{ namespace: "custom", key: "${key}" }`,
).join("\n            ");

const ALL_PRODUCTS_QUERY = /* GraphQL */ `
  query auditProducts($cursor: String) {
    products(first: 100, after: $cursor) {
      pageInfo { hasNextPage endCursor }
      edges {
        node {
          ...product
          collections(first: 20) { edges { node { handle } } }
          metafields(
            identifiers: [
            ${metafieldIdentifiers}
            ]
          ) { key value type }
        }
      }
    }
  }
  ${productFragment}
`;

type Img = {
  url: string;
  altText: string | null;
  width: number;
  height: number;
};
type Metafield = { key: string; value: string | null; type: string } | null;
type Node = {
  handle: string;
  title: string;
  description: string;
  tags: string[];
  availableForSale: boolean;
  collections: { edges: { node: { handle: string } }[] };
  featuredImage: Img | null;
  images: { edges: { node: Img }[] };
  metafields: Metafield[];
};

function getEnv(name: string): string {
  const v = process.env[name];
  if (!v) {
    console.error(
      `Missing ${name}. Run with:  npx tsx --env-file=.env.local photo-upgrade/inventory.ts`,
    );
    process.exit(1);
  }
  return v;
}

async function fetchPage(
  endpoint: string,
  token: string,
  cursor: string | null,
) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query: ALL_PRODUCTS_QUERY, variables: { cursor } }),
  });
  const body = await res.json();
  if (body.errors) {
    console.error(
      "Shopify GraphQL error:",
      JSON.stringify(body.errors, null, 2),
    );
    process.exit(1);
  }
  return body.data.products as {
    pageInfo: { hasNextPage: boolean; endCursor: string };
    edges: { node: Node }[];
  };
}

function metafieldMap(metafields: Metafield[]): Record<string, string> {
  const map: Record<string, string> = {};
  for (const mf of metafields ?? [])
    if (mf?.key && mf.value) map[mf.key] = mf.value;
  return map;
}

const csvCell = (v: unknown) => {
  const s = String(v ?? "")
    .replace(/\r?\n/g, " ")
    .trim();
  return /[",]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

async function main() {
  const domainRaw = getEnv("SHOPIFY_STORE_DOMAIN");
  const domain = domainRaw.startsWith("https://")
    ? domainRaw
    : `https://${domainRaw}`;
  const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
  const token = getEnv("SHOPIFY_STOREFRONT_ACCESS_TOKEN");

  const products: Node[] = [];
  let cursor: string | null = null;
  do {
    const page = await fetchPage(endpoint, token, cursor);
    products.push(...page.edges.map((e) => e.node));
    cursor = page.pageInfo.hasNextPage ? page.pageInfo.endCursor : null;
    process.stdout.write(`\rFetched ${products.length} products...`);
  } while (cursor);
  process.stdout.write("\n");

  // products.json — one record per product, with parsed images + metafield map.
  const productsJson = products.map((p) => {
    // The featuredImage is normally also images[0]; dedupe by URL so it isn't counted
    // twice, but keep the `featured` flag on whichever entry matches.
    const featuredUrl = p.featuredImage?.url;
    const seen = new Set<string>();
    const images = p.images.edges
      .map((e) => e.node)
      .filter((img) => (seen.has(img.url) ? false : (seen.add(img.url), true)))
      .map((img, i) => ({
        ...img,
        position: i,
        featured: img.url === featuredUrl,
      }));
    // If the featuredImage somehow isn't in images(first:20), prepend it.
    if (featuredUrl && !images.some((img) => img.featured)) {
      images.unshift({ ...p.featuredImage!, position: 0, featured: true });
      images.forEach((img, i) => (img.position = i));
    }
    return {
      handle: p.handle,
      title: p.title,
      description: p.description,
      tags: p.tags,
      availableForSale: p.availableForSale,
      collections: p.collections.edges.map((e) => e.node.handle),
      metafields: metafieldMap(p.metafields),
      images,
    };
  });

  // inventory.csv — one row per image, for the Phase 1.2 scoring rubric.
  const rows: string[] = [
    [
      "handle",
      "title",
      "collections",
      "image_position",
      "is_featured",
      "url",
      "width",
      "height",
      "altText",
      "has_alt",
    ].join(","),
  ];
  let imageCount = 0;
  for (const p of productsJson) {
    for (const img of p.images) {
      imageCount++;
      rows.push(
        [
          csvCell(p.handle),
          csvCell(p.title),
          csvCell(p.collections.join("|")),
          img.position,
          img.featured,
          csvCell(img.url),
          img.width,
          img.height,
          csvCell(img.altText),
          img.altText ? "yes" : "no",
        ].join(","),
      );
    }
  }

  const auditDir = join(import.meta.dirname, "audit");
  writeFileSync(
    join(auditDir, "products.json"),
    JSON.stringify(productsJson, null, 2),
  );
  writeFileSync(join(auditDir, "inventory.csv"), rows.join("\n") + "\n");

  console.log(
    `Wrote audit/products.json (${productsJson.length} products) and ` +
      `audit/inventory.csv (${imageCount} images).`,
  );
}

main();
