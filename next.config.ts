export default {
  experimental: {
    ppr: true,
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
