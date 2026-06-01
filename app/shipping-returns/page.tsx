import CollectionFaqs from "components/collection/collection-faqs";
import Footer from "components/layout/footer";
import type { Faq } from "lib/collection-faqs";
import { baseUrl } from "lib/utils";
import type { Metadata } from "next";
import Link from "next/link";

const title =
  "Shipping & Returns — Free UK Delivery Over £50 | Threaditionz";
const description =
  "Threaditionz shipping and returns: free UK delivery over £50, dispatch within 1–2 business days, worldwide delivery, and easy 14-day returns on silk pocket squares, cravats and scarves.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "Threaditionz shipping",
    "free UK delivery",
    "silk accessory delivery times",
    "international shipping UK",
    "returns policy",
    "14 day returns",
    "how to return an order",
  ],
  alternates: { canonical: "/shipping-returns" },
  openGraph: {
    type: "article",
    title,
    description,
    url: `${baseUrl}/shipping-returns`,
  },
  twitter: { card: "summary_large_image", title, description },
};

type DeliveryRow = {
  service: string;
  time: string;
  cost: string;
};

const deliveryRows: DeliveryRow[] = [
  {
    service: "UK Standard",
    time: "2–4 business days",
    cost: "Free over £50, otherwise calculated at checkout",
  },
  {
    service: "UK Express",
    time: "1–2 business days",
    cost: "Calculated at checkout",
  },
  {
    service: "International",
    time: "5–14 business days",
    cost: "Calculated at checkout — duties/taxes paid by recipient",
  },
];

const faqs: Faq[] = [
  {
    question: "When will my order be dispatched?",
    answer:
      "Every order is carefully packed and dispatched from our studio within 1–2 business days. You'll receive a confirmation email with tracking the moment it ships.",
  },
  {
    question: "Is UK delivery free?",
    answer:
      "Yes — UK delivery is free on all orders over £50. For orders below that, a standard rate is calculated at checkout, with express options also available.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "We do. International delivery typically takes 5–14 business days depending on the destination. Any customs duties or import taxes are the responsibility of the recipient.",
  },
  {
    question: "What is your returns policy?",
    answer:
      "If your piece isn't right, return unused items in their original condition and gift packaging within 14 days of delivery for a refund or exchange, in line with your statutory rights. Items must be unworn, unwashed and with any tags intact.",
  },
  {
    question: "How do I start a return?",
    answer:
      "Contact us via our contact page with your order number and we'll guide you through it. Refunds are issued to the original payment method once we receive and inspect the return.",
  },
  {
    question: "My order arrived faulty or incorrect — what should I do?",
    answer:
      "Please contact us within 14 days of delivery and we'll put it right at no cost to you, with a replacement or full refund.",
  },
];

export default function ShippingReturnsPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shipping & Returns",
        item: `${baseUrl}/shipping-returns`,
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
          <span className="text-charcoal">Shipping &amp; Returns</span>
        </nav>

        <span className="eyebrow">Delivery &amp; Returns</span>
        <h1 className="mt-3 font-heading text-4xl text-foreground lg:text-5xl">
          Shipping &amp; Returns
        </h1>
        <div className="gold-divider mt-4" />
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          Every order is hand-packed in our signature gift box and dispatched
          within 1–2 business days, with{" "}
          <strong className="text-foreground">
            free UK delivery on orders over £50
          </strong>
          . Here's everything you need to know.
        </p>

        {/* Delivery table */}
        <h2 className="mt-12 font-heading text-2xl text-foreground">
          Delivery options
        </h2>
        <div className="mt-5 overflow-x-auto border border-gold/15">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">
              Threaditionz delivery services, times and costs
            </caption>
            <thead>
              <tr className="bg-midnight text-cream">
                <th scope="col" className="px-4 py-3 font-heading font-normal">
                  Service
                </th>
                <th scope="col" className="px-4 py-3 font-heading font-normal">
                  Estimated time
                </th>
                <th scope="col" className="px-4 py-3 font-heading font-normal">
                  Cost
                </th>
              </tr>
            </thead>
            <tbody>
              {deliveryRows.map((r) => (
                <tr
                  key={r.service}
                  className="border-t border-gold/15 odd:bg-cream/40"
                >
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-foreground"
                  >
                    {r.service}
                  </th>
                  <td className="px-4 py-3 text-gold">{r.time}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Shipping is calculated at checkout based on destination and method.
          You'll receive a confirmation email with tracking as soon as your
          order ships.
        </p>

        {/* Returns */}
        <div className="mt-12 space-y-8">
          <section>
            <h2 className="font-heading text-2xl text-foreground">
              Returns &amp; exchanges
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              We want you to love your Threaditionz piece. If it isn't right,
              return unused items in their original condition and packaging
              within <strong>14 days</strong> of delivery for a refund or
              exchange, in line with your statutory rights.
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
              <li>Items must be unworn, unwashed and with any tags intact.</li>
              <li>
                To start a return, contact us via our{" "}
                <Link href="/contact" className="text-gold hover:underline">
                  contact page
                </Link>{" "}
                with your order number.
              </li>
              <li>
                Refunds are issued to the original payment method once we
                receive and inspect the return.
              </li>
              <li>
                For hygiene reasons, gift sets must be returned complete and
                unopened where sealed.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-foreground">
              Faulty or incorrect items
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              If your order arrives faulty or incorrect, please contact us
              within 14 days and we'll put it right at no cost to you.
            </p>
          </section>
        </div>

        <CollectionFaqs faqs={faqs} title="Shipping & Returns" />
      </div>
      <Footer />
    </>
  );
}
