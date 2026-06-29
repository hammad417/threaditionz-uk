import { BRAND } from "lib/brand";
import { buildFeedRows, feedRowsToXml } from "lib/feed";
import { getAllProducts } from "lib/shopify";
import { baseUrl } from "lib/utils";

// /feed/google.xml — Google Merchant Center product feed (RSS 2.0 + g: namespace)
// for all live products. Submit this URL in Merchant Center as a scheduled fetch
// (or download it once). Backed by the cached full-catalogue fetch used by the
// sitemap, so it always reflects live pricing/availability. See
// /launch/feed/SETUP-CHECKLIST.md.
export const dynamic = "force-dynamic";

export async function GET() {
  const products = await getAllProducts();
  const rows = buildFeedRows(products, baseUrl);
  const xml = feedRowsToXml(rows, {
    title: BRAND.name,
    link: baseUrl,
    description: BRAND.description,
  });

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
