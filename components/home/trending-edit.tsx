import { getCollectionProducts } from "lib/shopify";
import Price from "components/price";
import Image from "next/image";
import Link from "next/link";

function GiftBoxIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M3 9h18v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9Zm0 0V7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2M12 6v15M12 6c-1-2.5-2.2-3.5-3.5-3.5A2 2 0 0 0 8.5 6H12Zm0 0c1-2.5 2.2-3.5 3.5-3.5A2 2 0 0 1 15.5 6H12Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const assurances = [
  "Gift-Boxed as Standard",
  "Hand-Tied Ribbon",
  "Personal Note on Request",
];

export async function TrendingEdit({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title?: string;
} = {}) {
  // Curated homepage collection — the season's most-gifted pieces.
  const products = await getCollectionProducts({
    collection: "hidden-homepage-carousel",
  });

  if (!products?.length) return null;

  // Triple the list so the marquee loops without gaps on wide screens.
  const carouselProducts = [...products, ...products, ...products];

  return (
    <section className="relative isolate overflow-hidden bg-midnight">
      {/* Soft gold glow + subtle ribbon line for a gifting mood */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-40 [background:radial-gradient(circle_at_50%_-10%,hsl(40_60%_50%/0.18),transparent_55%)]"
      />

      <div className="mx-auto max-w-(--breakpoint-2xl) px-6 pt-20 text-center lg:px-8 lg:pt-24">
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <div className="gold-divider gold-divider-center mt-4" />
        <h2 className="mt-6 font-heading text-3xl text-cream lg:text-4xl">
          {title ?? "The Gift Edit"}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-cream/60">
          The season's most-gifted silks — each piece arrives beautifully boxed
          and ribbon-tied, ready to give from the moment it lands.
        </p>

        {/* Packaging assurances */}
        <ul className="mt-7 flex flex-col items-center justify-center gap-3 text-xs uppercase tracking-[0.18em] text-cream/55 sm:flex-row sm:gap-8">
          {assurances.map((a) => (
            <li key={a} className="flex items-center gap-2">
              <GiftBoxIcon className="h-4 w-4 text-gold" />
              {a}
            </li>
          ))}
        </ul>
      </div>

      {/* Trending marquee — pauses on hover */}
      <div className="group/marquee mt-12 w-full overflow-x-hidden pb-4">
        <ul className="flex animate-carousel gap-5 group-hover/marquee:[animation-play-state:paused]">
          {carouselProducts.map((product, i) => (
            <li
              key={`${product.handle}${i}`}
              className="w-2/3 max-w-[300px] flex-none sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              <Link
                href={`/product/${product.handle}`}
                prefetch
                className="group/card block"
              >
                <div className="relative aspect-[3/4] overflow-hidden border border-gold/15 bg-cream">
                  {product.featuredImage?.url ? (
                    <Image
                      src={product.featuredImage.url}
                      alt={product.featuredImage.altText || product.title}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 66vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
                    />
                  ) : null}
                  {/* New-in pill */}
                  <span className="absolute left-3 top-3 inline-flex items-center bg-midnight/85 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-gold backdrop-blur-sm">
                    New In
                  </span>
                  {/* Gift-ready cue */}
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 bg-warm-white/85 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-charcoal backdrop-blur-sm">
                    <GiftBoxIcon className="h-3 w-3 text-gold" />
                    Gift-Ready
                  </span>
                  <div
                    aria-hidden
                    className="absolute inset-0 border border-gold/0 transition-colors duration-500 group-hover/card:border-gold/40"
                  />
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-2 px-0.5">
                  <h3 className="line-clamp-1 font-heading text-sm text-cream">
                    {product.title}
                  </h3>
                  <Price
                    className="flex-none font-heading text-sm text-gold"
                    amount={product.priceRange.maxVariantPrice.amount}
                    currencyCode={product.priceRange.maxVariantPrice.currencyCode}
                    currencyCodeClassName="hidden"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center px-6 pb-20 lg:pb-24">
        <Link
          href="/search/new-arrivals"
          className="inline-flex items-center justify-center border border-gold/40 px-8 py-4 text-xs uppercase tracking-[0.25em] text-cream transition-colors hover:border-gold hover:bg-gold hover:text-midnight"
        >
          Shop New In
        </Link>
      </div>
    </section>
  );
}
