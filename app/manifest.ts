import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Threaditionz",
    short_name: "Threaditionz",
    description:
      "Hand-finished 100% silk pocket squares, cravats and scarves, crafted in England.",
    start_url: "/",
    display: "standalone",
    background_color: "#151d32",
    theme_color: "#151d32",
    icons: [
      { src: "/icon", sizes: "64x64", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
