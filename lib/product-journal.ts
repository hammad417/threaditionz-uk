import { getGuide, type Guide } from "lib/journal";
import type { Product } from "lib/shopify/types";

// Product → Journal mapping (audit L2 / Section C.0). Every product surfaces the
// guides relevant to its type, with occasion overlays from collection membership,
// so a cravat links the cravat how-tos and a pocket square links the fold/matching
// guides. Driven by productType + collections, so it applies to all 181 products.
//
// TODO: scarves have no dedicated guide yet — they fall back to the occasion
// guides below. Replace with "How to Style a Silk Scarf" / "Silk Care" once those
// are written (audit Section F).

const CRAVAT = [
  "how-to-tie-a-cravat",
  "cravat-vs-ascot-vs-tie",
  "cravat-or-tie-wedding",
];
const SQUARE = [
  "how-to-fold-a-pocket-square",
  "pocket-square-tie-matching",
  "best-pocket-squares-navy-suit",
];
const SCARF = [
  "silk-accessories-for-weddings",
  "groom-vs-groomsmen-accessories",
];

const WEDDING_CRAVAT = [
  "cravat-or-tie-wedding",
  "best-cravats-summer-wedding",
  "silk-accessories-for-weddings",
];
const WEDDING_OTHER = [
  "silk-accessories-for-weddings",
  "groom-vs-groomsmen-accessories",
];
const FORMAL = ["royal-ascot-mens-accessories", "cravat-vs-ascot-vs-tie"];

function inCollection(product: Product, handle: string): boolean {
  return product.collections.some((c) => c.handle === handle);
}

// /story — the cinematic brand-story page. Surfaces on PDPs whose pattern
// family the story actually covers (Ajrak block-printing, Mughal patternwork,
// calligraphy), matched against title, type, tags and collection handles.
export const storyLink = {
  href: "/our-story",
  label: "The story behind the pattern",
  matchesPatterns: ["ajrak", "mughal", "calligraphy"],
};

export function storyLinkForProduct(product: Product) {
  const haystack = [
    product.title,
    product.productType,
    ...product.tags,
    ...product.collections.map((c) => c.handle),
  ]
    .join(" ")
    .toLowerCase();
  return storyLink.matchesPatterns.some((p) => haystack.includes(p))
    ? storyLink
    : null;
}

export function journalLinksForProduct(product: Product, limit = 3): Guide[] {
  const slugs: string[] = [];
  const type = product.productType;

  if (type === "Cravat") slugs.push(...CRAVAT);
  else if (type === "Pocket Square") slugs.push(...SQUARE);
  else if (type === "Scarf") slugs.push(...SCARF);

  // Occasion overlays — only added when the product actually belongs to the
  // matching occasion collection.
  if (inCollection(product, "wedding-silk-accessories")) {
    slugs.push(...(type === "Cravat" ? WEDDING_CRAVAT : WEDDING_OTHER));
  }
  if (inCollection(product, "business-formal-silk-accessories")) {
    slugs.push(...FORMAL);
  }

  // De-dupe (preserving priority order), resolve to guides, cap.
  const seen = new Set<string>();
  const out: Guide[] = [];
  for (const slug of slugs) {
    if (seen.has(slug)) continue;
    seen.add(slug);
    const guide = getGuide(slug);
    if (guide) {
      out.push(guide);
      if (out.length >= limit) break;
    }
  }
  return out;
}
