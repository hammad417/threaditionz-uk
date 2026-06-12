// One-off alt-text audit across the product image library (GEO plan 0.9).
// Reads SHOPIFY_STORE_DOMAIN + SHOPIFY_STOREFRONT_ACCESS_TOKEN from .env.local
// and reports every product image with missing or trivially short alt text.
// Fix gaps in Shopify admin (product → media → alt text); the storefront
// renders altText straight from the API.
//
// Usage: node scripts/check-alt-text.mjs

import { readFileSync } from "node:fs";

for (const line of readFileSync(new URL("../.env.local", import.meta.url), "utf8").split("\n")) {
  const m = line.match(/^([A-Z_]+)="?([^"]*)"?$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
if (!domain || !token) {
  console.error("Missing SHOPIFY_STORE_DOMAIN / SHOPIFY_STOREFRONT_ACCESS_TOKEN");
  process.exit(1);
}

const QUERY = /* GraphQL */ `
  query products($cursor: String) {
    products(first: 100, after: $cursor) {
      pageInfo { hasNextPage endCursor }
      edges {
        node {
          handle
          title
          images(first: 20) {
            edges { node { url altText } }
          }
        }
      }
    }
  }
`;

let cursor = null;
let total = 0;
let missing = 0;
const offenders = [];

do {
  const res = await fetch(`https://${domain.replace(/^https?:\/\//, "")}/api/2025-01/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query: QUERY, variables: { cursor } }),
  });
  const json = await res.json();
  if (json.errors) {
    console.error(JSON.stringify(json.errors, null, 2));
    process.exit(1);
  }
  const page = json.data.products;
  for (const { node: p } of page.edges) {
    for (const { node: img } of p.images.edges) {
      total++;
      const alt = (img.altText || "").trim();
      if (alt.length < 5) {
        missing++;
        offenders.push(`${p.handle}\t${alt ? `"${alt}"` : "(none)"}\t${img.url.split("/").pop().split("?")[0]}`);
      }
    }
  }
  cursor = page.pageInfo.hasNextPage ? page.pageInfo.endCursor : null;
} while (cursor);

console.log(`Images checked: ${total}`);
console.log(`Missing/short alt text: ${missing} (${total ? Math.round((missing / total) * 100) : 0}%)`);
if (offenders.length) {
  console.log("\nhandle\talt\tfile");
  console.log(offenders.join("\n"));
}
