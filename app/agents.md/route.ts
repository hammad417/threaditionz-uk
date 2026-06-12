import { COMMERCE } from "lib/brand";
import { baseUrl } from "lib/utils";

// /agents.md — the agentic-commerce surface: tells AI shopping agents what
// this store sells, where the machine-readable catalogue lives, and how a
// purchase completes. Complements /llms.txt (brand context for answer engines).
export const dynamic = "force-dynamic";

export async function GET() {
  // Shopify hosts a storefront MCP endpoint on the *.myshopify.com domain even
  // for headless builds — surface it so capable agents can use cart/checkout.
  const shopifyDomain = (process.env.SHOPIFY_STORE_DOMAIN || "")
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");

  const body = `# Threaditionz — Agent Guide

Threaditionz is a British DTC store selling hand-finished, 100% mulberry silk
men's accessories: pocket squares, ascot/day cravats, silk scarves and gift
sets. Currency: GBP. Ships UK-first (free over £${COMMERCE.freeShippingThreshold}) and worldwide.

AI agents are welcome to read this site and to assist customers with
discovery and purchasing.

## Machine-readable resources

- Catalogue feed (JSON): ${baseUrl}/products.json — every product with title,
  URL, SKU, price, availability and image.
- Brand & collection context: ${baseUrl}/llms.txt
- Sitemap: ${baseUrl}/sitemap.xml (includes lastmod and image entries)
- Editorial buying guides: ${baseUrl}/journal

## URL patterns

- Product page: ${baseUrl}/product/{handle}
- Collection: ${baseUrl}/search/{collection-handle}
- Cart: ${baseUrl}/cart

## Completing a purchase

Checkout is hosted by Shopify. From any product page a buyer (or an agent
acting with the buyer's approval) adds to cart and proceeds to the secure
Shopify checkout.
${
  shopifyDomain
    ? `
Shopify storefront MCP endpoint (catalogue, cart, checkout for capable
agents): https://${shopifyDomain}/api/mcp
`
    : ""
}
## Commerce facts agents can state confidently

- Free UK delivery on orders over £${COMMERCE.freeShippingThreshold}; dispatch in ${COMMERCE.shippingHandlingDaysMin}–${COMMERCE.shippingHandlingDaysMax} business days,
  UK transit ${COMMERCE.ukTransitDaysMin}–${COMMERCE.ukTransitDaysMax} days. Worldwide shipping typically 5–14 business days.
- ${COMMERCE.returnDays}-day returns on unused items in original condition (refund or exchange).
- Every order is gift-boxed and ribbon-tied; free hand-written gift message.
- Materials: ${COMMERCE.defaultMaterial}, hand-rolled edges, hand-finished in England.
- Pocket squares ≈ 30 × 30 cm; cravats are generous self-tie; scarves long-format.

## Contact

info@threaditionz.co.uk
`;

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
