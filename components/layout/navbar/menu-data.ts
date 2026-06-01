// ------------------------------------------------------------------
//  Threaditionz mega-menu configuration
//
//  Every link points to a Shopify collection. In this template,
//  collection pages are served at /search/[collection], so each href
//  is built as `/search/<handle>`. Edit handles here to match your
//  real Shopify collection handles.
// ------------------------------------------------------------------

/** Build a collection URL from a Shopify collection handle. */
export const collectionHref = (handle: string) => `/search/${handle}`;

export type MegaLink = {
  label: string;
  handle: string;
  /** Optional colour swatch (for the "Shop by Colour" group). */
  swatch?: string;
  /** Draw a 1px border around the swatch (for very light swatches). */
  swatchBorder?: boolean;
};

export type FeaturedTile = {
  eyebrow: string;
  heading: string;
  handle: string;
  /** Optional image src for the tile; falls back to a soft placeholder. */
  image?: string;
};

export type MegaGroup = {
  title: string;
  /** Visual layout of the panel body. */
  layout: "links" | "swatches" | "two-col";
  links: MegaLink[];
  featured?: FeaturedTile;
};

export type SimpleLink = {
  label: string;
  handle: string;
};

export const MEGA_GROUPS: MegaGroup[] = [
  {
    title: "Shop by Product",
    layout: "links",
    links: [
      { label: "Silk Pocket Squares", handle: "pocket-squares" },
      { label: "Silk Cravats", handle: "cravats" },
      { label: "Silk Scarves", handle: "silk-scarves" },
      { label: "Gift Sets", handle: "gift-sets" },
      { label: "Solid Silk Pocket Squares", handle: "solid-silk-pocket-squares" },
      {
        label: "Four-in-One Pocket Squares",
        handle: "four-in-one-pocket-squares",
      },
    ],
    featured: {
      eyebrow: "Featured",
      heading: "New In",
      handle: "new-arrivals",
    },
  },
  {
    title: "Shop by Colour",
    layout: "swatches",
    links: [
      { label: "Black", handle: "black-silk-accessories", swatch: "#1c1c1c" },
      { label: "Blue", handle: "blue-silk-accessories", swatch: "#1f2a44" },
      { label: "Green", handle: "green-silk-accessories", swatch: "#2f6b4f" },
      {
        label: "Red & Maroon",
        handle: "red-maroon-silk-accessories",
        swatch: "#7b2d3b",
      },
      {
        label: "Pink & Peach",
        handle: "pink-peach-silk-accessories",
        swatch: "#e3a7b5",
      },
      { label: "Purple", handle: "purple-silk-accessories", swatch: "#6b4a8a" },
      {
        label: "Yellow & Gold",
        handle: "yellow-gold-silk-accessories",
        swatch: "#d4a437",
      },
      { label: "Brown", handle: "brown-silk-accessories", swatch: "#6b4a2f" },
      {
        label: "Grey & Silver",
        handle: "grey-silver-silk-accessories",
        swatch: "#9aa0a6",
      },
      {
        label: "White & Ivory",
        handle: "white-ivory-silk-accessories",
        swatch: "#efe9da",
        swatchBorder: true,
      },
    ],
    featured: {
      eyebrow: "Featured",
      heading: "The Luxe Collection",
      handle: "luxe-collection",
    },
  },
  {
    title: "Shop by Pattern",
    layout: "two-col",
    links: [
      { label: "Solid", handle: "solid-silk-accessories" },
      { label: "Polka Dot", handle: "polka-dot-silk-accessories" },
      { label: "Paisley", handle: "paisley-silk-accessories" },
      { label: "Floral & Botanical", handle: "floral-silk-accessories" },
      { label: "Plaid & Check", handle: "plaid-check-silk-accessories" },
      { label: "Houndstooth", handle: "houndstooth-silk-accessories" },
      { label: "Geometric", handle: "geometric-silk-accessories" },
      { label: "Damask & Brocade", handle: "damask-brocade-silk-accessories" },
      { label: "Calligraphy & Art", handle: "calligraphy-art-silk-accessories" },
      { label: "Heritage & Ajrak", handle: "heritage-ajrak-silk-accessories" },
      { label: "Novelty", handle: "novelty-silk-accessories" },
    ],
    featured: {
      eyebrow: "Featured",
      heading: "Heritage & Ajrak",
      handle: "heritage-ajrak-silk-accessories",
    },
  },
  {
    title: "Shop by Occasion",
    layout: "links",
    links: [
      { label: "Weddings", handle: "wedding-silk-accessories" },
      { label: "Festive & Eid", handle: "festive-eid-silk-accessories" },
      { label: "Business & Formal", handle: "business-formal-silk-accessories" },
      { label: "Casual & Daytime", handle: "casual-daytime-silk-accessories" },
      { label: "Luxe Collection", handle: "luxe-collection" },
      { label: "Gifts for Him", handle: "gifts-for-him" },
    ],
    featured: {
      eyebrow: "Featured",
      heading: "Gifts for Him",
      handle: "gifts-for-him",
    },
  },
];

export const SIMPLE_LINKS: SimpleLink[] = [
  { label: "Gift Sets", handle: "gift-sets" },
  { label: "New In", handle: "new-arrivals" },
];
