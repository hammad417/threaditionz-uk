import { getGuide } from "lib/journal";
import Image from "next/image";
import Link from "next/link";

// Homepage "From the Journal" row (audit L9). The homepage previously linked only
// the journal index; this surfaces individual guides so the cluster gets crawl
// equity and visitors drop into editorial content from the front door.
const FEATURED_SLUGS = [
  "how-to-tie-a-cravat",
  "how-to-fold-a-pocket-square",
  "best-pocket-squares-navy-suit",
  "silk-accessories-for-weddings",
];

export default function FromTheJournal() {
  const guides = FEATURED_SLUGS.map((s) => getGuide(s)).filter(
    (g): g is NonNullable<typeof g> => Boolean(g),
  );
  if (!guides.length) return null;

  return (
    <section className="bg-warm-white">
      <div className="mx-auto max-w-(--breakpoint-2xl) px-6 py-20 lg:px-8">
        <div className="text-center">
          <span className="eyebrow">The Journal</span>
          <div className="gold-divider gold-divider-center mt-4" />
          <h2 className="mt-6 font-heading text-3xl text-foreground lg:text-4xl">
            From the Journal
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            How to tie, fold, choose and wear silk — guides for the modern
            gentleman.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/journal/${g.slug}`}
              className="group flex flex-col border border-gold/15 bg-cream transition-colors hover:border-gold/50"
            >
              {g.heroImage ? (
                <Image
                  src={g.heroImage}
                  alt={g.heroAlt || g.h1}
                  width={800}
                  height={450}
                  className="aspect-video w-full object-cover"
                />
              ) : null}
              <div className="flex flex-1 flex-col gap-2 p-6">
                <span className="eyebrow !text-charcoal/60">{g.category}</span>
                <h3 className="font-heading text-lg text-foreground group-hover:text-gold">
                  {g.h1}
                </h3>
                <span className="mt-auto pt-2 text-xs uppercase tracking-[0.2em] text-gold">
                  Read guide →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/journal"
            className="inline-flex items-center justify-center border border-gold/40 px-8 py-4 text-xs uppercase tracking-[0.25em] text-charcoal transition-colors hover:border-gold hover:bg-gold hover:text-white"
          >
            Explore the Journal
          </Link>
        </div>
      </div>
    </section>
  );
}
