import Footer from "components/layout/footer";
import { baseUrl } from "lib/utils";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const title =
  "Our Story — Heritage Silk Accessories, Hand-Finished in England";
const description =
  "The Threaditionz story: hand-finished 100% mulberry silk pocket squares, cravats and scarves that carry Ajrak, Mughal and calligraphy heritage motifs into modern menswear.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "Threaditionz story",
    "heritage silk accessories",
    "hand-finished pocket squares",
    "Ajrak silk",
    "luxury menswear accessories UK",
    "British silk brand",
  ],
  alternates: { canonical: "/our-story" },
  openGraph: {
    type: "article",
    title,
    description,
    url: `${baseUrl}/our-story`,
    images: [{ url: "/occasions/fathers-day.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/occasions/fathers-day.jpg"],
  },
};

const chapters = [
  {
    heading: "Heritage, woven in",
    body: "Our designs draw on a rich visual heritage — Ajrak block-prints, Mughal motifs, calligraphy and the poetry of Ghalib — reimagined for the modern gentleman. Each print is chosen to carry meaning, not just colour, and is reproduced faithfully onto real silk.",
  },
  {
    heading: "Made by hand",
    body: "We work in pure mulberry silk and finish every piece by hand, with rolled edges and careful attention to drape and feel. It's slower, and it shows — in the weight of the silk, the depth of the colour and the way a piece sits.",
  },
  {
    heading: "For the discerning gentleman",
    body: "From everyday refinement to weddings, Eid and occasions worth remembering, Threaditionz is made to be worn, gifted and kept. Heritage craftsmanship, made to be remembered.",
  },
];

export default function OurStoryPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Our Story",
        item: `${baseUrl}/our-story`,
      },
    ],
  };

  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Our Story",
    url: `${baseUrl}/our-story`,
    description,
    about: {
      "@type": "Brand",
      name: "Threaditionz",
      description:
        "Hand-finished 100% silk accessories carrying heritage motifs into modern menswear.",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      {/* Editorial hero */}
      <section className="relative isolate flex min-h-[55vh] items-center justify-center overflow-hidden bg-midnight">
        <Image
          src="/occasions/fathers-day.jpg"
          alt="A gentleman in a navy suit with a silk pocket square"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-midnight/90 via-midnight/60 to-midnight/30"
        />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center">
          <span className="eyebrow">Our Heritage</span>
          <div className="gold-divider gold-divider-center mt-5" />
          <h1 className="mt-6 font-heading text-4xl text-cream sm:text-5xl lg:text-6xl">
            Our Story
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/75">
            Threaditionz was founded on a simple belief: that the smallest
            details finish the look. A silk pocket square, a well-tied cravat, a
            scarf with a story — the touches that turn an outfit into a
            signature.
          </p>
        </div>
      </section>

      {/* Chapters */}
      <div className="mx-auto max-w-3xl px-6 py-20">
        <div className="space-y-14">
          {chapters.map((c, i) => (
            <section key={c.heading} className="text-center">
              <span className="font-heading text-2xl text-gold/80">
                0{i + 1}
              </span>
              <h2 className="mt-2 font-heading text-2xl text-foreground lg:text-3xl">
                {c.heading}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {c.body}
              </p>
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-col items-center gap-5 border-t border-gold/15 pt-12 text-center">
          <h2 className="font-heading text-2xl text-foreground">
            Wear the heritage
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Explore hand-finished silk{" "}
            <Link href="/search/pocket-squares" className="text-gold hover:underline">
              pocket squares
            </Link>
            ,{" "}
            <Link href="/search/cravats" className="text-gold hover:underline">
              cravats
            </Link>{" "}
            and{" "}
            <Link href="/search/silk-scarves" className="text-gold hover:underline">
              scarves
            </Link>
            , or discover the rare weaves of the Luxe Collection.
          </p>
          <Link
            href="/search"
            className="mt-2 inline-flex items-center justify-center bg-gold px-8 py-4 text-xs uppercase tracking-[0.25em] text-white transition-colors hover:bg-gold-light"
          >
            Explore the Collection
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
