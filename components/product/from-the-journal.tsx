import { journalLinksForProduct } from "lib/product-journal";
import type { Product } from "lib/shopify/types";
import Link from "next/link";

// "From the Journal" — contextual guide links on the product page (audit L2).
// Server-rendered real <a href> so the links are crawlable, mapping the product's
// type and occasion to the guides that build buying confidence at the decision
// point (how to tie/fold/style, what to wear for the occasion).
export function FromTheJournal({ product }: { product: Product }) {
  const guides = journalLinksForProduct(product);
  if (!guides.length) return null;

  return (
    <section className="py-16">
      <div className="mb-8">
        <span className="eyebrow">From the Journal</span>
        <p className="mt-2 text-sm text-muted-foreground">
          Guides to help you wear and care for your silk.
        </p>
        <div className="gold-divider mt-3" />
      </div>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((g) => (
          <li key={g.slug}>
            <Link
              href={`/journal/${g.slug}`}
              className="group flex h-full flex-col border border-gold/15 p-6 transition-colors hover:border-gold/50"
            >
              <span className="eyebrow !text-charcoal/60">{g.category}</span>
              <h3 className="mt-2 font-heading text-lg text-foreground group-hover:text-gold">
                {g.h1}
              </h3>
              <span className="mt-3 text-xs uppercase tracking-[0.2em] text-gold">
                Read guide →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
