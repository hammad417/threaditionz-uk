import CollectionFaqs from "components/collection/collection-faqs";
import Footer from "components/layout/footer";
import type { Faq } from "lib/collection-faqs";
import { baseUrl } from "lib/utils";
import type { Metadata } from "next";
import Link from "next/link";

const title = "Silk Accessory Size Guide — Pocket Squares, Cravats & Scarves";
const description =
  "Full size guide for Threaditionz silk accessories: pocket square dimensions (30 × 30 cm), cravat and ascot sizing, and silk scarf lengths — in cm and inches, with folding, wearing and care guidance.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "pocket square size",
    "pocket square dimensions",
    "how big is a pocket square",
    "cravat size",
    "ascot dimensions",
    "silk scarf length",
    "men's silk accessory sizes UK",
    "how to fold a pocket square",
  ],
  alternates: { canonical: "/size-guide" },
  openGraph: {
    type: "article",
    title,
    description,
    url: `${baseUrl}/size-guide`,
  },
  twitter: { card: "summary_large_image", title, description },
};

type Row = { item: string; cm: string; inches: string; best: string };

const sizeRows: Row[] = [
  {
    item: "Pocket Square (Classic)",
    cm: "30 × 30 cm",
    inches: '12 × 12"',
    best: "Every breast pocket — presidential (flat) or puff fold",
  },
  {
    item: "Pocket Square (Four-in-One)",
    cm: "30 × 30 cm",
    inches: '12 × 12"',
    best: "Printed with four corners, so one square offers four looks",
  },
  {
    item: "Cravat / Ascot",
    cm: "approx. 90 cm long, self-tie",
    inches: 'approx. 35" long',
    best: "Open-collar shirt under a jacket or waistcoat",
  },
  {
    item: "Silk Scarf",
    cm: "approx. 160 × 28 cm",
    inches: 'approx. 63 × 11"',
    best: "Draped, looped or knotted over a jacket or overcoat",
  },
];

const faqs: Faq[] = [
  {
    question: "How big is a pocket square?",
    answer:
      "Our silk pocket squares measure approximately 30 × 30 cm (12 × 12 inches) — the classic proportion that suits every breast pocket, whether you prefer a crisp presidential fold or a relaxed puff.",
  },
  {
    question: "How do I fold a pocket square?",
    answer:
      "The presidential (flat) fold is best for business and black-tie; the puff or two-point fold adds character for weddings and evenings. Fold loosely so the silk keeps its volume, and let a little less than a centimetre show above the pocket.",
  },
  {
    question: "What size is a cravat or ascot?",
    answer:
      "Cravats are generously cut as a self-tie, roughly 90 cm long, so they knot comfortably at the collar and sit softly inside an open-collar shirt. Exact dimensions are listed on each product page.",
  },
  {
    question: "How long are the silk scarves?",
    answer:
      "Our long-format silk scarves are approximately 160 × 28 cm — long enough to drape, loop or knot over a jacket or overcoat, with fringing on selected styles.",
  },
  {
    question: "How should I care for silk accessories?",
    answer:
      "Dry clean only (or a gentle cold hand-wash where indicated), never wring, and lay flat or hang to dry away from direct sunlight. Cool iron on the reverse and store flat or loosely rolled to protect the lustre.",
  },
  {
    question: "Will the exact size vary between pieces?",
    answer:
      "Because every piece is hand-finished with hand-rolled edges, slight natural variation in size, print placement and finish is normal — it's the mark of a genuinely hand-made accessory.",
  },
];

export default function SizeGuidePage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Size Guide",
        item: `${baseUrl}/size-guide`,
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
          <span className="text-charcoal">Size Guide</span>
        </nav>

        <span className="eyebrow">Fit &amp; Dimensions</span>
        <h1 className="mt-3 font-heading text-4xl text-foreground lg:text-5xl">
          Size Guide
        </h1>
        <div className="gold-divider mt-4" />
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          Every Threaditionz accessory is made from 100% silk and hand-finished
          with rolled edges. Exact dimensions are listed on each product page —
          the typical sizes, in centimetres and inches, are below.
        </p>

        {/* Size table */}
        <div className="mt-10 overflow-x-auto border border-gold/15">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">
              Threaditionz silk accessory dimensions
            </caption>
            <thead>
              <tr className="bg-midnight text-cream">
                <th scope="col" className="px-4 py-3 font-heading font-normal">
                  Accessory
                </th>
                <th scope="col" className="px-4 py-3 font-heading font-normal">
                  Size (cm)
                </th>
                <th scope="col" className="px-4 py-3 font-heading font-normal">
                  Size (in)
                </th>
                <th
                  scope="col"
                  className="hidden px-4 py-3 font-heading font-normal sm:table-cell"
                >
                  Best for
                </th>
              </tr>
            </thead>
            <tbody>
              {sizeRows.map((r) => (
                <tr
                  key={r.item}
                  className="border-t border-gold/15 odd:bg-cream/40"
                >
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-foreground"
                  >
                    {r.item}
                  </th>
                  <td className="px-4 py-3 text-gold">{r.cm}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.inches}</td>
                  <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
                    {r.best}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Category guidance with internal links */}
        <div className="mt-12 space-y-8">
          <section>
            <h2 className="font-heading text-2xl text-foreground">
              Pocket squares
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              At <strong>30 × 30 cm</strong>, our{" "}
              <Link href="/search/pocket-squares" className="text-gold hover:underline">
                silk pocket squares
              </Link>{" "}
              are the classic size for any breast pocket. Choose a presidential
              fold for formal looks, or a puff fold for relaxed elegance.
            </p>
          </section>
          <section>
            <h2 className="font-heading text-2xl text-foreground">
              Cravats &amp; ascots
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Our{" "}
              <Link href="/search/cravats" className="text-gold hover:underline">
                silk cravats
              </Link>{" "}
              are generously cut for a comfortable knot at the collar — wear
              with an open-collar shirt under a jacket, in a classic ascot knot
              or a draped-and-pinned style.
            </p>
          </section>
          <section>
            <h2 className="font-heading text-2xl text-foreground">Scarves</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Long-format{" "}
              <Link href="/search/silk-scarves" className="text-gold hover:underline">
                silk scarves
              </Link>
              , finished with fringing on selected styles — long enough to
              drape, loop or knot over a jacket or overcoat.
            </p>
          </section>
          <section>
            <h2 className="font-heading text-2xl text-foreground">Care</h2>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
              <li>
                Dry clean only, or a gentle cold hand-wash where indicated on
                the product.
              </li>
              <li>
                Do not wring; lay flat or hang to dry away from direct sunlight.
              </li>
              <li>
                Cool iron on the reverse if needed; store flat or loosely
                rolled.
              </li>
            </ul>
          </section>
        </div>

        <p className="mt-10 text-sm italic text-muted-foreground">
          Because each piece is hand-finished, slight natural variation in size,
          print placement and finish is normal.
        </p>

        <CollectionFaqs faqs={faqs} title="Sizing" />
      </div>
      <Footer />
    </>
  );
}
