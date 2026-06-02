import { baseUrl } from "lib/utils";

// Single source of truth for brand identity used across Organization JSON-LD,
// the contact page (ContactPoint), and the footer social links. Keeping it here
// means the brand entity stays consistent everywhere answer/generative engines
// look (sameAs, logo, contact), and there's one place to fill in real handles.

export const BRAND = {
  name: "Threaditionz",
  legalName: "Threaditionz",
  url: baseUrl,
  // Stable, hash-free logo URL (used for Google's logo-in-search + knowledge panel).
  logo: `${baseUrl}/logo.png`,
  email: "info@threaditionz.co.uk",
  // Public phone, if/when there is one (E.164, e.g. "+44 20 1234 5678"). Empty = omit.
  phone: "",
  description:
    "British men's accessories brand specialising in hand-finished, 100% mulberry silk pocket squares, ascot cravats, scarves and gift sets — heritage motifs reimagined for the modern gentleman, hand-finished in England.",
  // Where the brand sells / ships. ISO-3166 for areaServed.
  areaServed: "GB",
  countryOfOrigin: "GB",
  // Real social profile URLs → Organization `sameAs` (brand-entity signal) and the
  // footer icons. Fill these in with the actual handles; empty strings are filtered
  // out so we never emit fake/placeholder profiles (which hurt more than they help).
  social: {
    instagram: "",
    facebook: "",
    pinterest: "",
    tiktok: "",
  },
} as const;

// Commerce facts, kept truthful in one place and surfaced in Product structured
// data (return policy + shipping). Mirror the FAQ / Shipping & Returns pages.
export const COMMERCE = {
  currency: "GBP",
  // Returns: 14 days, unused/original condition, refund or exchange (see /faqs).
  returnDays: 14,
  // Shipping: free UK delivery over £50; UK dispatch 1–2 business days, transit 2–4.
  freeShippingThreshold: 50,
  shippingHandlingDaysMin: 1,
  shippingHandlingDaysMax: 2,
  ukTransitDaysMin: 2,
  ukTransitDaysMax: 4,
  // Brand-wide product truths (per-product metafields override where present).
  defaultMaterial: "100% mulberry silk",
  defaultCondition: "https://schema.org/NewCondition",
} as const;

// Non-empty social URLs only — safe to spread straight into JSON-LD `sameAs`.
export const brandSameAs: string[] = Object.values(BRAND.social).filter(
  (u) => u.length > 0,
);

// Stable @id so Product / Breadcrumb / ContactPoint nodes can reference the one
// Organization entity instead of redeclaring it.
export const ORG_ID = `${baseUrl}/#organization`;

// Reusable Organization node for the site-wide graph.
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "OnlineStore"],
  "@id": ORG_ID,
  name: BRAND.name,
  legalName: BRAND.legalName,
  url: BRAND.url,
  logo: BRAND.logo,
  image: BRAND.logo,
  description: BRAND.description,
  email: BRAND.email,
  areaServed: BRAND.areaServed,
  ...(brandSameAs.length ? { sameAs: brandSameAs } : {}),
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: BRAND.email,
    ...(BRAND.phone ? { telephone: BRAND.phone } : {}),
    areaServed: BRAND.areaServed,
    availableLanguage: ["en"],
  },
};
