import Footer from "components/layout/footer";
import { getAllGuides } from "lib/journal";
import { buildBreadcrumbJsonLd } from "lib/structured-data";
import { baseUrl } from "lib/utils";
import type { Metadata } from "next";
import Link from "next/link";

const title = "The Journal — Silk Style Guides & How-Tos | Threaditionz";
const description =
  "Guides for the modern gentleman: how to tie a cravat, how to fold a pocket square, cravat vs ascot vs tie, and choosing silk accessories for weddings.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/journal" },
  openGraph: { type: "website", title, description, url: `${baseUrl}/journal` },
  twitter: { card: "summary_large_image", title, description },
};

export default function JournalPage() {
  const guides = getAllGuides();

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "" },
    { name: "Journal", path: "/journal" },
  ]);

  // ItemList of the guides for answer engines to enumerate.
  const listJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Threaditionz Journal",
    itemListElement: guides.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${baseUrl}/journal/${g.slug}`,
      name: g.h1,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listJsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          <Link href="/" className="hover:text-gold">
            Home
          </Link>
          <span className="mx-2 text-gold/50">/</span>
          <span className="text-charcoal">Journal</span>
        </nav>

        <div className="text-center">
          <span className="eyebrow">The Journal</span>
          <h1 className="mt-3 font-heading text-4xl text-foreground lg:text-5xl">
            Style Guides &amp; How-Tos
          </h1>
          <div className="gold-divider gold-divider-center mt-4" />
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
            How to tie, fold, choose and wear silk — practical guides for the
            modern gentleman, from our workroom in England.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/journal/${g.slug}`}
              className="group flex flex-col gap-3 border border-gold/15 p-8 transition-colors hover:border-gold/50"
            >
              <span className="eyebrow !text-charcoal/60">{g.category}</span>
              <h2 className="font-heading text-xl text-foreground group-hover:text-gold lg:text-2xl">
                {g.h1}
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {g.lede}
              </p>
              <span className="mt-1 text-xs uppercase tracking-[0.2em] text-gold">
                Read guide →
              </span>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
