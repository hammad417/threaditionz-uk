import Footer from "components/layout/footer";
import { baseUrl } from "lib/utils";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

const title =
  "FAQs — Silk Care, Sizing, Shipping, Returns & Gifting | Threaditionz";
const description =
  "Answers to common questions about Threaditionz silk pocket squares, cravats and scarves — materials and care, sizing, delivery times, free UK shipping, returns and gift sets.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "Threaditionz FAQ",
    "silk accessory care",
    "pocket square size",
    "silk delivery times UK",
    "returns policy",
    "gift wrapping",
    "how to care for silk",
  ],
  alternates: { canonical: "/faqs" },
  openGraph: { type: "article", title, description, url: `${baseUrl}/faqs` },
  twitter: { card: "summary_large_image", title, description },
};

// Answer can carry inline links (JSX) for the page; `text` is the plain-text
// version used for FAQPage structured data.
type Qa = { q: string; text: string; a: ReactNode };
type Group = { title: string; items: Qa[] };

const GROUPS: Group[] = [
  {
    title: "Product & Care",
    items: [
      {
        q: "What are your accessories made from?",
        text: "Every Threaditionz piece is made from 100% mulberry silk and hand-finished with rolled edges for a premium drape and feel.",
        a: (
          <>
            Every Threaditionz piece is made from <strong>100% mulberry silk</strong>{" "}
            and hand-finished with rolled edges for a premium drape and feel.
          </>
        ),
      },
      {
        q: "How do I care for my silk?",
        text: "Dry clean, or gentle cold hand wash where indicated. Don't wring; dry flat away from sunlight and cool-iron on the reverse if needed. See the size guide for full care guidance.",
        a: (
          <>
            Dry clean, or gentle cold hand wash where indicated. Don't wring; dry
            flat away from sunlight and cool-iron on the reverse if needed. See
            our{" "}
            <Link href="/size-guide" className="text-gold hover:underline">
              size &amp; care guide
            </Link>{" "}
            for the full routine.
          </>
        ),
      },
      {
        q: "What size are your accessories?",
        text: "Pocket squares are approximately 30 × 30 cm, cravats are a generous self-tie, and scarves are long-format. Exact dimensions are on each product page and in our size guide.",
        a: (
          <>
            Pocket squares are approximately <strong>30 × 30 cm</strong>, cravats
            are a generous self-tie, and scarves are long-format. Full
            measurements are in our{" "}
            <Link href="/size-guide" className="text-gold hover:underline">
              size guide
            </Link>
            .
          </>
        ),
      },
      {
        q: "Will the colours match the photos exactly?",
        text: "We photograph our pieces to be as true as possible, but because each item is hand-finished, slight natural variation in colour, print placement and finish is normal — and part of the character.",
        a: (
          <>
            We photograph our pieces to be as true as possible, but because each
            item is hand-finished, slight natural variation in colour, print
            placement and finish is normal — and part of the character.
          </>
        ),
      },
    ],
  },
  {
    title: "Shipping & Delivery",
    items: [
      {
        q: "How long does delivery take?",
        text: "UK orders typically arrive in 2–4 business days and international orders in 5–14 business days. You'll receive tracking when your order ships.",
        a: (
          <>
            UK orders typically arrive in 2–4 business days and international
            orders in 5–14 business days. You'll receive tracking when your order
            ships — see{" "}
            <Link href="/shipping-returns" className="text-gold hover:underline">
              Shipping &amp; Returns
            </Link>{" "}
            for full details.
          </>
        ),
      },
      {
        q: "Is UK delivery free?",
        text: "Yes — UK delivery is free on all orders over £50. Below that, a standard rate is calculated at checkout, with express options available.",
        a: (
          <>
            Yes — UK delivery is <strong>free on all orders over £50</strong>.
            Below that, a standard rate is calculated at checkout, with express
            options available.
          </>
        ),
      },
      {
        q: "Do you ship internationally?",
        text: "We do. International delivery typically takes 5–14 business days. Any customs duties or import taxes are the responsibility of the recipient.",
        a: (
          <>
            We do. International delivery typically takes 5–14 business days. Any
            customs duties or import taxes are the responsibility of the
            recipient.
          </>
        ),
      },
    ],
  },
  {
    title: "Returns & Exchanges",
    items: [
      {
        q: "What is your returns policy?",
        text: "You can return unused items in their original condition and packaging within 14 days of delivery for a refund or exchange, in line with your statutory rights.",
        a: (
          <>
            You can return unused items in their original condition and packaging
            within <strong>14 days</strong> of delivery for a refund or exchange,
            in line with your statutory rights.
          </>
        ),
      },
      {
        q: "How do I start a return?",
        text: "Contact us with your order number and we'll guide you through it. Refunds are issued to the original payment method once we receive and inspect the return.",
        a: (
          <>
            <Link href="/contact" className="text-gold hover:underline">
              Contact us
            </Link>{" "}
            with your order number and we'll guide you through it. Refunds are
            issued to the original payment method once we receive and inspect the
            return.
          </>
        ),
      },
    ],
  },
  {
    title: "Gifting",
    items: [
      {
        q: "Do you offer gift sets and gift wrapping?",
        text: "Yes — every order arrives gift-boxed and ribbon-tied as standard, and our silk scarf-and-pocket-square gift sets make a considered gift for the discerning gentleman.",
        a: (
          <>
            Yes — every order arrives gift-boxed and ribbon-tied as standard, and
            our{" "}
            <Link href="/search/gift-sets" className="text-gold hover:underline">
              silk gift sets
            </Link>{" "}
            make a considered gift for the discerning gentleman.
          </>
        ),
      },
      {
        q: "Can I add a gift message?",
        text: "Yes — add a hand-written note free of charge at checkout and we'll include it inside the box.",
        a: (
          <>
            Yes — add a hand-written note free of charge at checkout and we'll
            include it inside the box.
          </>
        ),
      },
      {
        q: "Can you match accessories for a wedding party?",
        text: "Many designs are available in multiples so the groom and groomsmen can coordinate. For larger parties, contact us and we'll help reserve matching pieces.",
        a: (
          <>
            Many{" "}
            <Link
              href="/search/wedding-silk-accessories"
              className="text-gold hover:underline"
            >
              wedding designs
            </Link>{" "}
            are available in multiples so the groom and groomsmen can coordinate.
            For larger parties,{" "}
            <Link href="/contact" className="text-gold hover:underline">
              contact us
            </Link>{" "}
            and we'll help reserve matching pieces.
          </>
        ),
      },
    ],
  },
];

export default function FaqsPage() {
  const allItems = GROUPS.flatMap((g) => g.items);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allItems.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.text },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "FAQs", item: `${baseUrl}/faqs` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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
          <span className="text-charcoal">FAQs</span>
        </nav>

        <div className="text-center">
          <span className="eyebrow">Help Centre</span>
          <h1 className="mt-3 font-heading text-4xl text-foreground lg:text-5xl">
            Frequently Asked Questions
          </h1>
          <div className="gold-divider gold-divider-center mt-4" />
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Everything you need to know about our silk, sizing, delivery,
            returns and gifting. Can't find your answer?{" "}
            <Link href="/contact" className="text-gold hover:underline">
              Get in touch
            </Link>{" "}
            and we'll be glad to help.
          </p>
        </div>

        <div className="mt-14 space-y-12">
          {GROUPS.map((group) => (
            <section key={group.title}>
              <h2 className="eyebrow !text-charcoal/70">{group.title}</h2>
              <div className="mt-4 divide-y divide-gold/15 border-y border-gold/15">
                {group.items.map((item) => (
                  <details key={item.q} className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left transition-colors hover:text-gold [&::-webkit-details-marker]:hidden">
                      <span className="font-heading text-base text-foreground group-open:text-gold lg:text-lg">
                        {item.q}
                      </span>
                      <span
                        aria-hidden
                        className="flex h-7 w-7 flex-none items-center justify-center border border-gold/40 text-gold transition-all duration-300 group-open:rotate-45 group-open:border-gold group-open:bg-gold group-open:text-midnight"
                      >
                        +
                      </span>
                    </summary>
                    <p className="pb-6 pr-11 text-sm leading-relaxed text-muted-foreground">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Closing CTA */}
        <div className="mt-16 flex flex-col items-center gap-4 border-t border-gold/15 pt-12 text-center">
          <h2 className="font-heading text-2xl text-foreground">
            Still have a question?
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Our team is happy to help with sizing, gifting or anything else.
          </p>
          <Link
            href="/contact"
            className="mt-1 inline-flex items-center justify-center border border-gold/40 px-8 py-4 text-xs uppercase tracking-[0.25em] text-charcoal transition-colors hover:border-gold hover:bg-gold hover:text-white"
          >
            Contact Us
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
