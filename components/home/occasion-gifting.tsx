import Image from "next/image";
import Link from "next/link";

type Occasion = {
  eyebrow: string;
  title: string;
  copy: string;
  href: string;
  image: string;
  /** keep faces in frame when the card is cropped tall/wide */
  position?: string;
};

// Marquee gifting moments — the modern gentleman, styled in our silk, across
// the occasions that matter most. Imagery shares the hero campaign for cohesion.
const FEATURED: Occasion = {
  eyebrow: "The Wedding Edit",
  title: "Marriage & Wedding Gifts",
  copy: "Matching silk pocket squares for the groom and his party — a refined keepsake from the celebration.",
  href: "/search/wedding-silk-accessories",
  image: "/occasions/wedding.jpg",
  position: "object-center",
};

const SUPPORTING: Occasion[] = [
  {
    eyebrow: "For Him",
    title: "Father's Day Gifts",
    copy: "Timeless silk he'll reach for again and again.",
    href: "/search/gifts-for-him",
    image: "/occasions/fathers-day.jpg",
    position: "object-top",
  },
  {
    eyebrow: "The Boardroom",
    title: "Business & Formal",
    copy: "Quiet luxury for the deals that define a career.",
    href: "/search/business-formal-silk-accessories",
    image: "/occasions/business.jpg",
    position: "object-center",
  },
];

// Smaller occasion links for breadth, beneath the marquee cards.
const MORE = [
  { label: "Gift Sets", href: "/search/gift-sets" },
  { label: "Festive & Eid", href: "/search/festive-eid-silk-accessories" },
  { label: "The Luxe Collection", href: "/search/luxe-collection" },
];

function CardOverlay({
  occasion,
  large = false,
}: {
  occasion: Occasion;
  large?: boolean;
}) {
  return (
    <>
      <Image
        src={occasion.image}
        alt={occasion.title}
        fill
        sizes={large ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 38vw, 100vw"}
        className={`object-cover ${occasion.position ?? "object-center"} transition-transform duration-[1200ms] ease-out group-hover:scale-105`}
      />
      {/* Midnight gradient keeps the type legible over the photograph */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/30 to-midnight/10"
      />
      {/* Thin gold frame that warms on hover */}
      <div
        aria-hidden
        className="absolute inset-0 border border-gold/0 transition-colors duration-500 group-hover:border-gold/40"
      />
      <div
        className={`absolute inset-x-0 bottom-0 flex flex-col ${large ? "p-8 lg:p-10" : "p-6"}`}
      >
        <span className="eyebrow text-gold">{occasion.eyebrow}</span>
        <h3
          className={`mt-2 font-heading text-cream ${large ? "text-3xl lg:text-4xl" : "text-2xl"}`}
        >
          {occasion.title}
        </h3>
        <p
          className={`mt-2 max-w-md text-sm leading-relaxed text-cream/70 ${large ? "" : "hidden sm:block"}`}
        >
          {occasion.copy}
        </p>
        <span className="tracked-label mt-4 inline-flex items-center gap-2 text-xs text-gold">
          Shop the Edit
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </>
  );
}

export default function OccasionGifting() {
  return (
    <section className="bg-warm-white">
      <div className="mx-auto max-w-(--breakpoint-2xl) px-6 py-20 lg:px-8 lg:py-28">
        <div className="text-center">
          <span className="eyebrow">Thoughtful Gifting</span>
          <div className="gold-divider gold-divider-center mt-4" />
          <h2 className="mt-6 font-heading text-3xl text-foreground lg:text-4xl">
            Gifts for Every Occasion
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            From the wedding party to a milestone Father's Day, a hand-finished
            silk accessory is the gift remembered long after the moment.
          </p>
        </div>

        {/* Editorial bento: one marquee card + two supporting cards */}
        <div className="mt-12 grid gap-4 lg:h-[34rem] lg:grid-cols-12">
          <Link
            href={FEATURED.href}
            prefetch
            className="group relative h-80 overflow-hidden bg-midnight sm:h-96 lg:col-span-7 lg:h-full"
          >
            <CardOverlay occasion={FEATURED} large />
          </Link>

          <div className="grid gap-4 lg:col-span-5 lg:grid-rows-2">
            {SUPPORTING.map((o) => (
              <Link
                key={o.href}
                href={o.href}
                prefetch
                className="group relative h-72 overflow-hidden bg-midnight lg:h-full"
              >
                <CardOverlay occasion={o} />
              </Link>
            ))}
          </div>
        </div>

        {/* More occasions */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {MORE.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              prefetch
              className="inline-flex items-center justify-center border border-gold/30 px-6 py-3 text-xs uppercase tracking-[0.2em] text-charcoal transition-colors hover:border-gold hover:bg-gold hover:text-white"
            >
              {m.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
