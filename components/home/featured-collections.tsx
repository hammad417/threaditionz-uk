import { getCollectionProducts } from "lib/shopify";
import Image from "next/image";
import Link from "next/link";

// The collections we surface on the homepage as browse options. Each card pulls
// its hero image from the first product in that Shopify collection, so imagery
// stays in sync with the catalogue without manual curation.
const FEATURED = [
  {
    handle: "pocket-squares",
    label: "Pocket Squares",
    tagline: "Hand-rolled silk for the breast pocket",
  },
  {
    handle: "cravats",
    label: "Cravats",
    tagline: "Heritage neckwear, reimagined",
  },
  {
    handle: "silk-scarves",
    label: "Silk Scarves",
    tagline: "Lightweight lustre, year round",
  },
  {
    handle: "gift-sets",
    label: "Gift Sets",
    tagline: "Beautifully boxed, ready to give",
  },
  {
    handle: "luxe-collection",
    label: "The Luxe Collection",
    tagline: "Our finest weaves and rare motifs",
  },
  {
    handle: "new-arrivals",
    label: "New Arrivals",
    tagline: "The latest from the atelier",
  },
];

async function withImage(c: (typeof FEATURED)[number]) {
  const products = await getCollectionProducts({ collection: c.handle });
  const image = products.find((p) => p.featuredImage?.url)?.featuredImage;
  return { ...c, image };
}

export async function FeaturedCollections({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title?: string;
} = {}) {
  const resolved = (await Promise.all(FEATURED.map(withImage))).filter(
    (c) => c.image?.url,
  );

  if (resolved.length < 2) return null;

  return (
    <section className="bg-warm-white">
      <div className="mx-auto max-w-(--breakpoint-2xl) px-6 py-20 lg:px-8 lg:py-24">
        <div className="text-center">
          {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
          <div className="gold-divider gold-divider-center mt-4" />
          <h2 className="mt-6 font-heading text-3xl text-foreground lg:text-4xl">
            {title ?? "Shop the Collections"}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Explore the house — from everyday pocket squares to the rare weaves
            of the Luxe Collection.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
          {resolved.map((c, i) => (
            <Link
              key={c.handle}
              href={`/search/${c.handle}`}
              prefetch
              className="group relative aspect-[4/5] overflow-hidden bg-midnight"
            >
              <Image
                src={c.image!.url}
                alt={c.image!.altText || c.label}
                fill
                sizes="(min-width: 1024px) 32vw, (min-width: 768px) 33vw, 50vw"
                priority={i < 3}
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-midnight/85 via-midnight/20 to-transparent"
              />
              <div
                aria-hidden
                className="absolute inset-0 border border-gold/0 transition-colors duration-500 group-hover:border-gold/40"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
                <h3 className="font-heading text-xl text-cream lg:text-2xl">
                  {c.label}
                </h3>
                <p className="mt-1 hidden text-xs leading-relaxed text-cream/70 sm:block">
                  {c.tagline}
                </p>
                <span className="tracked-label mt-3 inline-flex items-center gap-2 text-xs text-gold">
                  Shop
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
