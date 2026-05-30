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
          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title} className="flex flex-col items-center gap-3">
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
      <section className="bg-midnight">
        <div className="mx-auto flex max-w-(--breakpoint-2xl) flex-col items-center gap-6 px-6 py-20 text-center lg:px-8">
          <span className="eyebrow">The Gift of Silk</span>
          <h2 className="max-w-2xl font-heading text-3xl text-cream lg:text-4xl">
            Considered gifts for the discerning gentleman
          </h2>
          <Link
            href="/search/gift-sets"
            className="mt-4 inline-flex items-center justify-center bg-gold px-8 py-4 text-xs uppercase tracking-[0.25em] text-white transition-colors hover:bg-gold-light"
          >
            Shop Gift Sets
          </Link>
        </div>
      </section>
    </>
  );
}
