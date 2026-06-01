import CollectionFaqs from "components/collection/collection-faqs";
import Footer from "components/layout/footer";
import type { Faq } from "lib/collection-faqs";
import { baseUrl } from "lib/utils";
import type { Metadata } from "next";
import Link from "next/link";

const title =
  "Sustainability — Responsible Silk, Made to Last | Threaditionz";
const description =
  "How Threaditionz approaches responsible craftsmanship: 100% natural silk, hand-finishing in small runs, minimal recyclable packaging, and heirloom design made to be kept.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "sustainable silk accessories",
    "responsible menswear",
    "natural silk fibre",
    "ethical pocket squares",
    "slow fashion accessories UK",
    "recyclable packaging",
  ],
  alternates: { canonical: "/sustainability" },
  openGraph: {
    type: "article",
    title,
    description,
    url: `${baseUrl}/sustainability`,
  },
  twitter: { card: "summary_large_image", title, description },
};

const pillars = [
  {
    heading: "Natural materials",
    body: "We work in 100% silk — a natural, renewable and biodegradable fibre — rather than synthetics. Fewer, better pieces, made to last.",
  },
  {
    heading: "Hand-finished, not mass-produced",
    body: "Each piece is hand-finished in small runs, reducing waste and ensuring care goes into every item. We'd rather make something worth keeping than something disposable.",
  },
  {
    heading: "Considered packaging",
    body: "We aim to keep packaging minimal and recyclable — protecting your order, and the gift inside it, without excess.",
  },
  {
    heading: "Made to be remembered",
    body: "Heirloom-minded design is central to how we work: timeless prints and durable construction, so your Threaditionz pieces can be worn, gifted and passed on.",
  },
];

const faqs: Faq[] = [
  {
    question: "What materials do you use?",
    answer:
      "We use 100% mulberry silk — a natural, renewable and biodegradable fibre — in place of synthetic alternatives, so each piece is both beautiful and kinder at the end of its long life.",
  },
  {
    question: "How does buying fewer, better pieces help?",
    answer:
      "A well-made silk accessory kept for years has a far smaller footprint than disposable fashion. We design for longevity so a single piece can be worn, gifted and passed on rather than replaced.",
  },
  {
    question: "Is your packaging recyclable?",
    answer:
      "Yes — we keep packaging minimal and recyclable. Your order still arrives beautifully gift-boxed and ribbon-tied, just without unnecessary excess.",
  },
  {
    question: "Are your accessories ethically made?",
    answer:
      "Each piece is hand-finished in small runs with care and attention, rather than mass-produced. This reduces waste and keeps craftsmanship at the heart of every item.",
  },
];

export default function SustainabilityPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Sustainability",
        item: `${baseUrl}/sustainability`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto max-w-3xl px-6 py-16">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          <Link href="/" className="hover:text-gold">
            Home
          </Link>
          <span className="mx-2 text-gold/50">/</span>
          <span className="text-charcoal">Sustainability</span>
        </nav>

        <span className="eyebrow">Responsible Craft</span>
        <h1 className="mt-3 font-heading text-4xl text-foreground lg:text-5xl">
          Sustainability
        </h1>
        <div className="gold-divider mt-4" />
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          We believe the most sustainable accessory is one that's made well and
          kept for years. Our approach is rooted in quality, longevity and
          respect for the craft.
        </p>

        {/* Pillars */}
        <div className="mt-12 grid gap-px overflow-hidden border border-gold/15 bg-gold/15 sm:grid-cols-2">
          {pillars.map((p) => (
            <div key={p.heading} className="bg-warm-white p-7">
              <h2 className="font-heading text-xl text-foreground">
                {p.heading}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm italic leading-relaxed text-muted-foreground">
          We're always working to do better — if you have questions about our
          practices, please{" "}
          <Link href="/contact" className="not-italic text-gold hover:underline">
            get in touch
          </Link>
          .
        </p>

        <CollectionFaqs faqs={faqs} title="Sustainability" />
      </div>
      <Footer />
    </>
  );
}
