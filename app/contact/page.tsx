import Footer from "components/layout/footer";
import { BRAND, ORG_ID } from "lib/brand";
import { baseUrl } from "lib/utils";
import type { Metadata } from "next";
import Link from "next/link";

const title = "Contact Us — Silk Accessory Help, Gifting & Wedding Orders";
const description =
  "Get in touch with Threaditionz about silk pocket squares, cravats and scarves — sizing, gifting, wedding-party coordination, orders and returns. We reply within one business day.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "contact Threaditionz",
    "silk accessory help",
    "wedding party silk order",
    "gifting enquiry",
    "returns help",
  ],
  alternates: { canonical: "/contact" },
  openGraph: { type: "website", title, description, url: `${baseUrl}/contact` },
  twitter: { card: "summary_large_image", title, description },
};

// Self-serve answers we point people to before they email — also strengthens the
// internal link graph that answer/generative engines follow.
const QUICK_LINKS = [
  {
    href: "/faqs",
    label: "FAQs",
    blurb: "Silk care, sizing, delivery, returns and gifting — answered.",
  },
  {
    href: "/shipping-returns",
    label: "Shipping & Returns",
    blurb: "Free UK delivery over £50, worldwide shipping and 14-day returns.",
  },
  {
    href: "/size-guide",
    label: "Size & Care Guide",
    blurb:
      "Dimensions for pocket squares, cravats and scarves, plus silk care.",
  },
];

export default function ContactPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact",
        item: `${baseUrl}/contact`,
      },
    ],
  };

  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Threaditionz",
    url: `${baseUrl}/contact`,
    description,
    mainEntity: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: BRAND.name,
      url: BRAND.url,
      email: BRAND.email,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: BRAND.email,
        ...(BRAND.phone ? { telephone: BRAND.phone } : {}),
        areaServed: BRAND.areaServed,
        availableLanguage: ["en"],
      },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
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
          <span className="text-charcoal">Contact</span>
        </nav>

        <div className="text-center">
          <span className="eyebrow">Get In Touch</span>
          <h1 className="mt-3 font-heading text-4xl text-foreground lg:text-5xl">
            Contact Us
          </h1>
          <div className="gold-divider gold-divider-center mt-4" />
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Questions about sizing, gifting, a wedding-party order, or an
            existing order? We&rsquo;re glad to help and typically reply within
            one business day.
          </p>
        </div>

        {/* Primary contact: email */}
        <div className="mt-12 flex flex-col items-center gap-5 border-y border-gold/15 py-12 text-center">
          <span className="eyebrow !text-charcoal/70">Email Us</span>
          <a
            href={`mailto:${BRAND.email}`}
            className="font-heading text-2xl text-foreground transition-colors hover:text-gold lg:text-3xl"
          >
            {BRAND.email}
          </a>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Include your order number where relevant and we&rsquo;ll get back to
            you quickly. For wedding parties, tell us the pieces and quantities
            you&rsquo;d like to coordinate.
          </p>
          <a
            href={`mailto:${BRAND.email}`}
            className="mt-1 inline-flex items-center justify-center bg-gold px-8 py-4 text-xs uppercase tracking-[0.25em] text-white transition-colors hover:bg-gold-light"
          >
            Send an Email
          </a>
        </div>

        {/* Self-serve quick links */}
        <div className="mt-14">
          <h2 className="eyebrow !text-charcoal/70 text-center">
            Find an answer faster
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {QUICK_LINKS.map((q) => (
              <Link
                key={q.href}
                href={q.href}
                className="group flex flex-col gap-2 border border-gold/15 p-6 transition-colors hover:border-gold/50"
              >
                <span className="font-heading text-base text-foreground group-hover:text-gold">
                  {q.label}
                </span>
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {q.blurb}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
