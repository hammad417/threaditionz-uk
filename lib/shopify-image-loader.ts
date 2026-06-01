// Custom next/image loader. Product imagery lives on the Shopify CDN, which
// resizes on the fly for free — so we hand resizing to Shopify instead of
// Vercel's metered image optimizer. Local /public assets (hero posters,
// occasion tiles) are passed through untouched.
export default function shopifyImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  // Anything not on the Shopify CDN (local /public files, data URIs) → as-is.
  if (!src.includes("cdn.shopify.com")) return src;

  const url = new URL(src);
  url.searchParams.set("width", width.toString());
  if (quality) url.searchParams.set("quality", quality.toString());
  return url.toString();
}
