import { getGuide, type Guide } from "lib/journal";

// Collection cross-linking (audit L6 / Section D). Adds the two link types the
// collection pages were missing in-body: "Related guides" (collection → journal)
// and "You might also like" (collection → sibling collections). The global
// mega-nav already links every collection; this is the contextual, in-content
// layer that connects same-theme pages.

export type CollectionLink = { label: string; href: string };

// Human labels for sibling-collection anchors (descriptive anchor text matters
// more than the handle). Covers every collection we cross-link to.
const COLLECTION_LABELS: Record<string, string> = {
  "pocket-squares": "Pocket Squares",
  cravats: "Cravats",
  "silk-scarves": "Silk Scarves",
  "gift-sets": "Silk Gift Sets",
  "gifts-for-him": "Gifts for Him",
  "luxe-collection": "The Luxe Collection",
  "new-arrivals": "New Arrivals",
  "wedding-silk-accessories": "Wedding Silk Accessories",
  "business-formal-silk-accessories": "Business & Formal",
  "casual-daytime-silk-accessories": "Casual Daytime",
  "festive-eid-silk-accessories": "Festive & Eid",
  "solid-silk-accessories": "Solid Silk",
  "solid-silk-pocket-squares": "Solid Pocket Squares",
  "four-in-one-pocket-squares": "Four-in-One Pocket Squares",
  "heritage-ajrak-silk-accessories": "Heritage Ajrak",
  "calligraphy-art-silk-accessories": "Calligraphy & Art",
  "damask-brocade-silk-accessories": "Damask & Brocade",
  "polka-dot-silk-accessories": "Polka Dot",
  "paisley-silk-accessories": "Paisley",
  "floral-silk-accessories": "Floral",
  "plaid-check-silk-accessories": "Plaid & Check",
  "houndstooth-silk-accessories": "Houndstooth",
  "geometric-silk-accessories": "Geometric",
  "novelty-silk-accessories": "Novelty",
  "blue-silk-accessories": "Blue Silk",
  "black-silk-accessories": "Black Silk",
  "brown-silk-accessories": "Brown Silk",
  "green-silk-accessories": "Green Silk",
  "grey-silver-silk-accessories": "Grey & Silver Silk",
  "pink-peach-silk-accessories": "Pink & Peach Silk",
  "purple-silk-accessories": "Purple Silk",
  "red-maroon-silk-accessories": "Red & Maroon Silk",
  "white-ivory-silk-accessories": "White & Ivory Silk",
  "yellow-gold-silk-accessories": "Yellow & Gold Silk",
};

function labelFor(handle: string): string {
  return (
    COLLECTION_LABELS[handle] ??
    handle
      .replace(/-silk-accessories$/, "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

// Type "hub" collections — the safe sibling fallback for any colour/pattern
// collection (audit: link adjacent collections + the matching type collection).
const TYPE_HUBS = ["pocket-squares", "cravats", "silk-scarves"];

// Curated guide slugs per collection (audit Section D). Falls back by theme so
// all 35 collections surface at least one relevant guide.
const SQUARE_GUIDES = [
  "how-to-fold-a-pocket-square",
  "pocket-square-tie-matching",
  "best-pocket-squares-navy-suit",
];
const CRAVAT_GUIDES = [
  "how-to-tie-a-cravat",
  "cravat-vs-ascot-vs-tie",
  "cravat-or-tie-wedding",
];
const WEDDING_GUIDES = [
  "silk-accessories-for-weddings",
  "cravat-or-tie-wedding",
  "groom-vs-groomsmen-accessories",
];
const FORMAL_GUIDES = [
  "royal-ascot-mens-accessories",
  "cravat-vs-ascot-vs-tie",
  "pocket-square-tie-matching",
];

const COLLECTION_GUIDES: Record<string, string[]> = {
  "pocket-squares": SQUARE_GUIDES,
  "solid-silk-accessories": SQUARE_GUIDES,
  "solid-silk-pocket-squares": SQUARE_GUIDES,
  "four-in-one-pocket-squares": [
    "how-to-fold-a-pocket-square",
    "pocket-square-tie-matching",
  ],
  cravats: [...CRAVAT_GUIDES, "best-cravats-summer-wedding"].slice(0, 3),
  "silk-scarves": [
    "silk-accessories-for-weddings",
    "groom-vs-groomsmen-accessories",
  ],
  "wedding-silk-accessories": [
    ...WEDDING_GUIDES,
    "best-cravats-summer-wedding",
  ],
  "festive-eid-silk-accessories": [
    "silk-accessories-for-weddings",
    "best-cravats-summer-wedding",
  ],
  "business-formal-silk-accessories": FORMAL_GUIDES,
  "casual-daytime-silk-accessories": [
    "how-to-fold-a-pocket-square",
    "pocket-square-tie-matching",
    "cravat-vs-ascot-vs-tie",
  ],
  "gift-sets": [
    "silk-accessories-for-weddings",
    "groom-vs-groomsmen-accessories",
  ],
  "gifts-for-him": [
    "silk-accessories-for-weddings",
    "best-pocket-squares-navy-suit",
  ],
  "new-arrivals": [
    "best-pocket-squares-navy-suit",
    "best-cravats-summer-wedding",
  ],
  "luxe-collection": ["silk-accessories-for-weddings", "how-to-tie-a-cravat"],
  "heritage-ajrak-silk-accessories": [
    "how-to-tie-a-cravat",
    "how-to-fold-a-pocket-square",
  ],
  "blue-silk-accessories": [
    "best-pocket-squares-navy-suit",
    "pocket-square-tie-matching",
  ],
};

// Curated sibling collections per collection (audit Section D).
const COLLECTION_SIBLINGS: Record<string, string[]> = {
  "pocket-squares": [
    "solid-silk-pocket-squares",
    "four-in-one-pocket-squares",
    "cravats",
    "silk-scarves",
  ],
  cravats: [
    "pocket-squares",
    "wedding-silk-accessories",
    "business-formal-silk-accessories",
  ],
  "silk-scarves": ["gift-sets", "pocket-squares"],
  "wedding-silk-accessories": [
    "cravats",
    "gift-sets",
    "business-formal-silk-accessories",
    "luxe-collection",
  ],
  "gift-sets": ["gifts-for-him", "luxe-collection", "wedding-silk-accessories"],
  "gifts-for-him": ["gift-sets", "luxe-collection", "wedding-silk-accessories"],
  "new-arrivals": ["luxe-collection", "wedding-silk-accessories", "gift-sets"],
  "luxe-collection": [
    "heritage-ajrak-silk-accessories",
    "wedding-silk-accessories",
    "gift-sets",
  ],
  "business-formal-silk-accessories": [
    "cravats",
    "pocket-squares",
    "wedding-silk-accessories",
  ],
  "festive-eid-silk-accessories": ["wedding-silk-accessories", "gift-sets"],
  "casual-daytime-silk-accessories": [
    "pocket-squares",
    "silk-scarves",
    "cravats",
  ],
  "solid-silk-accessories": [
    "solid-silk-pocket-squares",
    "pocket-squares",
    "cravats",
  ],
  "solid-silk-pocket-squares": [
    "pocket-squares",
    "four-in-one-pocket-squares",
    "solid-silk-accessories",
  ],
  "four-in-one-pocket-squares": ["pocket-squares", "solid-silk-pocket-squares"],
  "heritage-ajrak-silk-accessories": [
    "luxe-collection",
    "calligraphy-art-silk-accessories",
    "wedding-silk-accessories",
  ],
};

function resolveGuides(slugs: string[]): Guide[] {
  const out: Guide[] = [];
  for (const s of slugs) {
    const g = getGuide(s);
    if (g) out.push(g);
  }
  return out;
}

export function relatedGuidesForCollection(handle: string): Guide[] {
  const explicit = COLLECTION_GUIDES[handle];
  if (explicit) return resolveGuides(explicit);

  // Theme fallback so every collection links at least one relevant guide.
  if (/cravat/.test(handle)) return resolveGuides(CRAVAT_GUIDES);
  if (/pocket-square/.test(handle)) return resolveGuides(SQUARE_GUIDES);
  if (/wedding|festive|gift/.test(handle)) return resolveGuides(WEDDING_GUIDES);
  if (/formal|business|ascot/.test(handle)) return resolveGuides(FORMAL_GUIDES);
  // Colour / pattern collections: pairing + folding are the universal picks.
  return resolveGuides([
    "pocket-square-tie-matching",
    "how-to-fold-a-pocket-square",
    "how-to-tie-a-cravat",
  ]);
}

export function siblingCollectionsForCollection(
  handle: string,
): CollectionLink[] {
  const explicit = COLLECTION_SIBLINGS[handle];
  const handles = (explicit ?? TYPE_HUBS).filter((h) => h !== handle);
  // Guarantee at least two siblings even after removing self.
  const filled = handles.length >= 2 ? handles : [...handles, ...TYPE_HUBS];
  const seen = new Set<string>();
  const out: CollectionLink[] = [];
  for (const h of filled) {
    if (h === handle || seen.has(h)) continue;
    seen.add(h);
    out.push({ label: labelFor(h), href: `/search/${h}` });
    if (out.length >= 4) break;
  }
  return out;
}
