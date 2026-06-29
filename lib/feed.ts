// Google Merchant Center product feed mapping — the single source of truth for
// how a Shopify Product becomes a Merchant feed item. Consumed by the feed route
// (app/feed/google.xml) and mirrored by launch/feed/generate-feed.mjs for the
// static snapshot.
//
// One row per product (priced from the "from" / min-variant price). Brand is the
// single house brand; pure-silk handmade accessories rarely carry a GTIN, so we
// emit gtin only when a variant barcode exists and fall back to mpn = sku, with
// identifier_exists=no when neither is present (a valid Google state for apparel).
import { BRAND } from "lib/brand";
import type { Product } from "lib/shopify/types";

export type FeedRow = {
  id: string;
  title: string;
  description: string;
  link: string;
  image_link: string;
  additional_image_link?: string;
  availability: "in_stock" | "out_of_stock";
  price: string;
  sale_price?: string;
  brand: string;
  condition: "new";
  google_product_category: string;
  product_type: string;
  mpn?: string;
  gtin?: string;
  identifier_exists?: "no";
  item_group_id?: string;
};

// Column order for the TSV snapshot / manual upload (Google attribute names).
export const FEED_COLUMNS: (keyof FeedRow)[] = [
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

// Map a product to a Google product category (taxonomy leaf path). Keyword match
// on type/title/collections; falls back to the generic Clothing Accessories node.
function googleCategory(p: Product): string {
  const hay =
    `${p.productType} ${p.title} ${p.tags?.join(" ") ?? ""} ${p.collections
      ?.map((c) => c.handle)
      .join(" ")}`.toLowerCase();
  if (/(cravat|ascot|necktie|\btie\b|bow ?tie)/.test(hay))
    return "Apparel & Accessories > Clothing Accessories > Neckties";
  if (/scarf|scarves|shawl|stole/.test(hay))
    return "Apparel & Accessories > Clothing Accessories > Scarves & Shawls";
  if (/pocket square|handkerchief|hank/.test(hay))
    return "Apparel & Accessories > Clothing Accessories > Handkerchiefs";
  return "Apparel & Accessories > Clothing Accessories";
}

// Strip HTML, collapse whitespace, and cap to Google's description limit.
function plainText(html: string, max = 4900): string {
  const text = (html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

const money = (amount: string, currency: string) =>
  `${Number(amount).toFixed(2)} ${currency}`;

export function buildFeedRows(products: Product[], baseUrl: string): FeedRow[] {
  return products.map((p) => {
    const min = p.priceRange.minVariantPrice;
    const compareAt = p.compareAtPriceRange?.minVariantPrice;
    const onSale =
      compareAt && Number(compareAt.amount) > Number(min.amount)
        ? compareAt
        : undefined;

    const firstSku = p.variants.find((v) => v.sku)?.sku || undefined;
    const firstGtin = p.variants.find((v) => v.barcode)?.barcode || undefined;
    const productType =
      p.productType || p.collections?.[0]?.title || "Silk Accessories";

    const row: FeedRow = {
      id: firstSku || p.handle,
      title: p.title.slice(0, 150),
      description:
        plainText(p.descriptionHtml || p.description) ||
        `${p.title} — 100% silk, hand-finished in England by Threaditionz.`,
      link: `${baseUrl}/product/${p.handle}`,
      image_link: p.featuredImage?.url || p.images?.[0]?.url || "",
      availability: p.availableForSale ? "in_stock" : "out_of_stock",
      // When there's a strike-through compare-at price, that's the regular price
      // and the live price is the sale price; otherwise the live price is regular.
      price: onSale
        ? money(onSale.amount, onSale.currencyCode)
        : money(min.amount, min.currencyCode),
      brand: BRAND.name,
      condition: "new",
      google_product_category: googleCategory(p),
      product_type: productType,
    };

    if (onSale) row.sale_price = money(min.amount, min.currencyCode);

    const extra = (p.images || [])
      .map((i) => i.url)
      .filter((u) => u && u !== row.image_link)
      .slice(0, 10);
    if (extra.length) row.additional_image_link = extra.join(",");

    if (firstGtin) row.gtin = firstGtin;
    if (firstSku) row.mpn = firstSku;
    if (!firstGtin && !firstSku) row.identifier_exists = "no";
    if (p.variants.length > 1) row.item_group_id = p.handle;

    return row;
  });
}

const xmlEscape = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

/** RSS 2.0 + g: namespace document for a scheduled Merchant Center fetch. */
export function feedRowsToXml(
  rows: FeedRow[],
  channel: { title: string; link: string; description: string },
): string {
  const items = rows
    .map((row) => {
      const tags = (Object.keys(row) as (keyof FeedRow)[])
        .filter((k) => row[k] != null && row[k] !== "")
        .map((k) => `      <g:${k}>${xmlEscape(String(row[k]))}</g:${k}>`)
        .join("\n");
      return `    <item>\n${tags}\n    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${xmlEscape(channel.title)}</title>
    <link>${xmlEscape(channel.link)}</link>
    <description>${xmlEscape(channel.description)}</description>
${items}
  </channel>
</rss>
`;
}

/** Tab-separated snapshot (manual upload / inspection). */
export function feedRowsToTsv(rows: FeedRow[]): string {
  const clean = (v: unknown) =>
    v == null
      ? ""
      : String(v)
          .replace(/[\t\r\n]+/g, " ")
          .trim();
  const header = FEED_COLUMNS.join("\t");
  const lines = rows.map((row) =>
    FEED_COLUMNS.map((c) => clean(row[c])).join("\t"),
  );
  return [header, ...lines].join("\n") + "\n";
}
