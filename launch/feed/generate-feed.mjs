// Generate a point-in-time Google Merchant Center snapshot for ALL products by
// querying the live Shopify Storefront API (the same data the storefront serves).
// Writes google-merchant-feed.tsv + .xml next to this file.
//
// Run from the repo root:  node launch/feed/generate-feed.mjs
//
// The durable, always-fresh feed is the app route /feed/google.xml (lib/feed.ts);
// this script mirrors that mapping to produce a tangible all-SKU artifact you can
// also upload manually. Reads credentials from .env.local (never committed).
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");

// --- minimal .env.local reader (no dotenv dependency) ---
function readEnv() {
  const env = {};
  try {
    for (const line of readFileSync(join(ROOT, ".env.local"), "utf8").split(
      "\n",
    )) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  } catch {
    /* fall through to process.env */
  }
  return { ...env, ...process.env };
}

const env = readEnv();
const DOMAIN = env.SHOPIFY_STORE_DOMAIN;
const TOKEN = env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const BASE_URL = env.NEXT_PUBLIC_SITE_URL || "https://threaditionz.co.uk";
const BRAND_NAME = "Threaditionz";
const BRAND_DESC =
  "British men's accessories brand specialising in hand-finished, 100% mulberry silk pocket squares, ascot cravats, scarves and gift sets.";

if (!DOMAIN || !TOKEN) {
  console.error(
    "Missing SHOPIFY_STORE_DOMAIN / SHOPIFY_STOREFRONT_ACCESS_TOKEN in .env.local",
  );
  process.exit(1);
}

const QUERY = `
  query Products($cursor: String) {
    products(first: 250, after: $cursor) {
      pageInfo { hasNextPage endCursor }
      edges { node {
        handle title productType description descriptionHtml availableForSale
        tags
        priceRange { minVariantPrice { amount currencyCode } }
        compareAtPriceRange { minVariantPrice { amount currencyCode } }
        collections(first: 10) { edges { node { handle title } } }
        featuredImage { url }
        images(first: 11) { edges { node { url } } }
        variants(first: 50) { edges { node { sku barcode } } }
      } }
    }
  }`;

async function fetchAllProducts() {
  const products = [];
  let cursor = null;
  do {
    const res = await fetch(`https://${DOMAIN}/api/2024-10/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": TOKEN,
      },
      body: JSON.stringify({ query: QUERY, variables: { cursor } }),
    });
    if (!res.ok) throw new Error(`Storefront API ${res.status}`);
    const json = await res.json();
    if (json.errors) throw new Error(JSON.stringify(json.errors));
    const conn = json.data.products;
    for (const e of conn.edges) {
      const n = e.node;
      products.push({
        ...n,
        collections: n.collections.edges.map((x) => x.node),
        images: n.images.edges.map((x) => x.node),
        variants: n.variants.edges.map((x) => x.node),
      });
    }
    cursor = conn.pageInfo.hasNextPage ? conn.pageInfo.endCursor : null;
  } while (cursor);
  return products;
}

// --- mapping (mirror of lib/feed.ts) ---
const FEED_COLUMNS = [
  "id",
  "title",
  "description",
  "link",
  "image_link",
  "additional_image_link",
  "availability",
  "price",
  "sale_price",
  "brand",
  "condition",
  "google_product_category",
  "product_type",
  "mpn",
  "gtin",
  "identifier_exists",
  "item_group_id",
];

function googleCategory(p) {
  const hay =
    `${p.productType} ${p.title} ${(p.tags || []).join(" ")} ${p.collections
      .map((c) => c.handle)
      .join(" ")}`.toLowerCase();
  if (/(cravat|ascot|necktie|\btie\b|bow ?tie)/.test(hay))
    return "Apparel & Accessories > Clothing Accessories > Neckties";
  if (/scarf|scarves|shawl|stole/.test(hay))
    return "Apparel & Accessories > Clothing Accessories > Scarves & Shawls";
  if (/pocket square|handkerchief|hank/.test(hay))
    return "Apparel & Accessories > Clothing Accessories > Handkerchiefs";
  return "Apparel & Accessories > Clothing Accessories";
}

function plainText(html, max = 4900) {
  const t = (html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
  return t.length > max ? `${t.slice(0, max - 1).trimEnd()}…` : t;
}

const money = (a, c) => `${Number(a).toFixed(2)} ${c}`;

function buildRow(p) {
  const min = p.priceRange.minVariantPrice;
  const cmp = p.compareAtPriceRange?.minVariantPrice;
  const onSale = cmp && Number(cmp.amount) > Number(min.amount) ? cmp : null;
  const sku = p.variants.find((v) => v.sku)?.sku || undefined;
  const gtin = p.variants.find((v) => v.barcode)?.barcode || undefined;
  const row = {
    id: sku || p.handle,
    title: p.title.slice(0, 150),
    description:
      plainText(p.descriptionHtml || p.description) ||
      `${p.title} — 100% silk, hand-finished in England by Threaditionz.`,
    link: `${BASE_URL}/product/${p.handle}`,
    image_link: p.featuredImage?.url || p.images?.[0]?.url || "",
    availability: p.availableForSale ? "in_stock" : "out_of_stock",
    price: onSale
      ? money(onSale.amount, onSale.currencyCode)
      : money(min.amount, min.currencyCode),
    brand: BRAND_NAME,
    condition: "new",
    google_product_category: googleCategory(p),
    product_type:
      p.productType || p.collections[0]?.title || "Silk Accessories",
  };
  if (onSale) row.sale_price = money(min.amount, min.currencyCode);
  const extra = (p.images || [])
    .map((i) => i.url)
    .filter((u) => u && u !== row.image_link)
    .slice(0, 10);
  if (extra.length) row.additional_image_link = extra.join(",");
  if (gtin) row.gtin = gtin;
  if (sku) row.mpn = sku;
  if (!gtin && !sku) row.identifier_exists = "no";
  if (p.variants.length > 1) row.item_group_id = p.handle;
  return row;
}

const xmlEscape = (s) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

function toXml(rows) {
  const items = rows
    .map((row) => {
      const tags = Object.keys(row)
        .filter((k) => row[k] != null && row[k] !== "")
        .map((k) => `      <g:${k}>${xmlEscape(String(row[k]))}</g:${k}>`)
        .join("\n");
      return `    <item>\n${tags}\n    </item>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${xmlEscape(BRAND_NAME)}</title>
    <link>${xmlEscape(BASE_URL)}</link>
    <description>${xmlEscape(BRAND_DESC)}</description>
${items}
  </channel>
</rss>
`;
}

function toTsv(rows) {
  const clean = (v) =>
    v == null
      ? ""
      : String(v)
          .replace(/[\t\r\n]+/g, " ")
          .trim();
  return (
    [
      FEED_COLUMNS.join("\t"),
      ...rows.map((r) => FEED_COLUMNS.map((c) => clean(r[c])).join("\t")),
    ].join("\n") + "\n"
  );
}

const products = await fetchAllProducts();
const rows = products.map(buildRow);
writeFileSync(join(__dirname, "google-merchant-feed.tsv"), toTsv(rows));
writeFileSync(join(__dirname, "google-merchant-feed.xml"), toXml(rows));
const inStock = rows.filter((r) => r.availability === "in_stock").length;
console.log(
  `Wrote ${rows.length} products (${inStock} in_stock) to launch/feed/google-merchant-feed.{tsv,xml}`,
);
