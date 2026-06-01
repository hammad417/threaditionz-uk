import { getCollectionProducts } from "lib/shopify";
import { MEGA_GROUPS } from "./menu-data";
import MegaHeader from "./mega-header";

// The brand mega-menu header. Rendered as a server component wrapper so it
// stays in the server-rendered HTML; interactivity lives in MegaHeader
// (a client component) whose initial markup — including every nav link — is
// still emitted on the server. Here we also resolve each featured tile's
// hero image live from the top product of its collection.
export async function Navbar() {
  const handles = Array.from(
    new Set(
      MEGA_GROUPS.flatMap((g) => (g.featured ? [g.featured.handle] : [])),
    ),
  );

  const entries = await Promise.all(
    handles.map(async (handle) => {
      try {
        const products = await getCollectionProducts({ collection: handle });
        const url = products.find((p) => p.featuredImage?.url)?.featuredImage
          ?.url;
        return [handle, url] as const;
      } catch {
        return [handle, undefined] as const;
      }
    }),
  );

  const featuredImages: Record<string, string> = {};
  for (const [handle, url] of entries) {
    if (url) featuredImages[handle] = url;
  }

  return <MegaHeader featuredImages={featuredImages} />;
}
