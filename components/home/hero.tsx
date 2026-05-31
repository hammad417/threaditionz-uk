import Link from "next/link";
import HeroMedia from "./hero-media";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[70vh] items-center justify-center overflow-hidden bg-midnight">
      {/* Hero background: two alternating cinematic clips (poster fallback on mobile / reduced-motion) */}
      <HeroMedia />
      {/* Midnight scrim — keeps headline legible while the photo reads through */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-midnight/90 via-midnight/65 to-midnight/40"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-30 [background:radial-gradient(circle_at_70%_30%,hsl(40_60%_50%/0.25),transparent_55%)]"
      />

      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <span className="eyebrow">Hand-Finished in England</span>
        <div className="gold-divider gold-divider-center mt-5" />
        <h1 className="mt-6 font-heading text-4xl leading-tight text-cream sm:text-5xl lg:text-6xl">
          The Art of the <span className="italic text-gold">Pocket Square</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/70">
          Pure silk accessories for the modern gentleman — pocket squares,
          cravats and scarves, finished by hand and made to be remembered.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/search/new-arrivals"
            className="inline-flex items-center justify-center bg-gold px-8 py-4 text-xs uppercase tracking-[0.25em] text-white transition-colors hover:bg-gold-light"
          >
            Shop New In
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center justify-center border border-cream/30 px-8 py-4 text-xs uppercase tracking-[0.25em] text-cream transition-colors hover:border-gold hover:text-gold"
          >
            Explore the Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
