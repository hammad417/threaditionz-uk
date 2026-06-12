import { getAllProducts } from "lib/shopify";
import { baseUrl } from "lib/utils";

// /products.json — structured catalogue feed for AI shopping agents and
// product-graph consumers (referenced from /agents.md and /llms.txt).
// Backed by the cached full-catalogue fetch used by the sitemap.
export const dynamic = "force-dynamic";

export async function GET() {
  const products = await getAllProducts();

  const feed = {
    store: "Threaditionz",
    url: baseUrl,
    description:
      "Hand-finished 100% mulberry silk pocket squares, cravats, scarves and gift sets, made in England.",
    productCount: products.length,
    products: products.map((p) => ({
      title: p.title,
      url: `${baseUrl}/product/${p.handle}`,
      sku: p.variants.find((v) => v.sku)?.sku || p.handle,
      price: p.priceRange.minVariantPrice.amount,
      currency: p.priceRange.minVariantPrice.currencyCode,
      availability: p.availableForSale ? "in_stock" : "out_of_stock",
      image: p.featuredImage?.url,
      description: p.description?.slice(0, 300) || undefined,
      updatedAt: p.updatedAt,
    })),
  };

  return Response.json(feed, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
