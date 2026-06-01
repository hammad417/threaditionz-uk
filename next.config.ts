export default {
  experimental: {
    ppr: true,
    inlineCss: true,
    useCache: true,
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
