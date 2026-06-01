import Link from "next/link";

const pillars = [
  {
    title: "Pure Silk",
    body: "Woven from 100% mulberry silk with a deep, lasting lustre.",
  },
  {
    title: "Hand-Rolled Edges",
    body: "Every edge is hand-rolled and finished by skilled artisans.",
  },
  {
    title: "Made to Last",
    body: "Heirloom accessories designed to be worn for a lifetime.",
  },
];

const giftAssurances = [
  "Signature gift boxing",
  "Hand-written note on request",
  "Free UK delivery over £50",
];

export default function Editorial() {
  return (
    <>
      {/* Cream craftsmanship band */}
      <section className="bg-cream">
        <div className="mx-auto max-w-(--breakpoint-2xl) px-6 py-20 text-center lg:px-8">
          <span className="eyebrow">Our Craft</span>
          <div className="gold-divider gold-divider-center mt-4" />
          <h2 className="mt-6 font-heading text-3xl text-foreground lg:text-4xl">
            Heritage in Every Thread
          </h2>
          <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
            {pillars.map((p, i) => (
              <div
                key={p.title}
                className="flex flex-col items-center gap-3 md:border-l md:border-gold/15 md:px-6 md:first:border-l-0"
              >
                <span className="font-heading text-2xl text-gold/80">
                  0{i + 1}
                </span>
                <h3 className="font-heading text-xl text-midnight">
                  {p.title}
                </h3>
                <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Midnight call-to-action band */}
      <section className="relative isolate overflow-hidden bg-midnight">
        {/* Soft gold glow for depth */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-40 [background:radial-gradient(circle_at_50%_0%,hsl(40_60%_50%/0.22),transparent_60%)]"
        />
        <div className="mx-auto flex max-w-(--breakpoint-2xl) flex-col items-center gap-6 px-6 py-24 text-center lg:px-8">
          <span className="eyebrow">The Gift of Silk</span>
          <div className="gold-divider gold-divider-center mt-2" />
          <h2 className="mt-4 max-w-2xl font-heading text-3xl text-cream lg:text-4xl">
            Considered gifts for the discerning gentleman
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-cream/60">
            Each piece arrives beautifully boxed and ready to give — the
            effortless gift for weddings, milestones and moments worth marking.
          </p>
          <Link
            href="/search/gift-sets"
            className="mt-2 inline-flex items-center justify-center bg-gold px-8 py-4 text-xs uppercase tracking-[0.25em] text-white transition-colors hover:bg-gold-light"
          >
            Shop Gift Sets
          </Link>
          <ul className="mt-6 flex flex-col items-center gap-3 text-xs uppercase tracking-[0.18em] text-cream/50 sm:flex-row sm:gap-8">
            {giftAssurances.map((a) => (
              <li key={a} className="flex items-center gap-2">
                <span className="text-gold">✦</span>
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
