export default {
  experimental: {
    // ppr (Partial Prerendering) removed 2026-07-07: on the pinned
    // 15.6 canary it intermittently served raw RSC/flight payloads
    // ("resumableState"/"nextSegmentId" resume data) instead of HTML on
    // CDN cache MISS — SEO reliability beats streaming optimisation here.
    // Do not re-enable without re-running scripts/check-html-integrity.mjs
    // against production cold cache.
    inlineCss: true,
    useCache: true,
  },
  async redirects() {
    return [
      // The cinematic story launched at /story, then merged into the
      // established /our-story URL (footer, llms.txt, indexed).
      { source: "/story", destination: "/our-story", permanent: true },
    ];
  },
  images: {
    // Resize via Shopify's CDN (free) instead of Vercel's metered optimizer.
    loader: "custom",
    loaderFile: "./lib/shopify-image-loader.ts",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
    ],
  },
};
