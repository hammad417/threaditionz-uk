# AEO & GEO Audit — Threaditionz Storefront

**Date:** 2026-06-02
**Scope:** Answer Engine Optimization (rich results, featured snippets, voice) and
Generative Engine Optimization (ChatGPT, Perplexity, Gemini, Google AI Overviews, Claude).
**Stack:** Next.js 15 App Router (SSR), Shopify Storefront API, Basic plan.

---

## Verdict

Grade: **B+ foundation.** The crawl/markup plumbing is genuinely strong — better than
most Shopify headless builds. The gap is **trust signals (reviews, real Organization
identity), entity-rich content (guides/HowTo), and a few schema completeness items**
that both Google rich results and LLM answer engines now expect.

The single highest-leverage move for GEO is **authoritative content** (buying guides,
how-to-tie/fold). The single highest-leverage move for AEO is **reviews +
Product schema completeness**.

---

## ✅ Already in place (don't redo these)

| Area | Status |
|------|--------|
| `metadataBase`, title templates, descriptions, canonicals | ✅ `app/layout.tsx` |
| Open Graph + Twitter cards (site + per-page) | ✅ |
| Organization + WebSite JSON-LD with SearchAction (sitelinks searchbox) | ✅ `app/layout.tsx:57` |
| Product JSON-LD (AggregateOffer) + BreadcrumbList | ✅ `app/product/[handle]/page.tsx:64` |
| FAQPage JSON-LD — product, collection, and /faqs | ✅ |
| AboutPage JSON-LD | ✅ `app/our-story/page.tsx:69` |
| Product Open Graph (price, availability, condition, brand) | ✅ |
| **AI crawler allowlist** (GPTBot, PerplexityBot, ClaudeBot, Google-Extended, Applebot-Extended…) | ✅ `app/robots.ts` |
| **`/llms.txt`** (llmstxt.org convention), dynamic + link-rich | ✅ `app/llms.txt/route.ts` |
| `sitemap.xml` with products/collections/pages + `<image:image>` | ✅ `app/sitemap.ts` |
| Semantic HTML (native `<details>`, breadcrumb `<nav>`, real `<h1>`) | ✅ |
| SSR (crawlers get full HTML, no JS-render dependency) | ✅ |
| `lang="en-GB"`, `themeColor`, per-product noindex for hidden tags | ✅ |

---

## 🔴 P0 — Fix now (correctness + high impact, low effort)

### 1. Broken `/contact` route (404)
`/contact` is linked from **`app/llms.txt/route.ts:43`** and **four times in `app/faqs/page.tsx`**,
plus `our-story`. **The route does not exist** (`app/contact/` is absent). Broken links
hurt crawl trust and send AI engines to dead ends.
- **Fix:** create `app/contact/page.tsx` with a contact form/details + `ContactPage`
  JSON-LD and a `ContactPoint`. Or remove the links. Creating it is strongly preferred —
  "contact" is a trust signal LLMs look for.

### 2. Organization identity is a stub
`app/layout.tsx:57` emits only `name` + `url`. Missing everything answer engines use to
build a brand entity / knowledge panel:
- `logo` (required for logo in Google results), `image`
- `sameAs` → real social profiles. **Footer links are placeholders** (`footer.tsx:98`
  points at `https://instagram.com`, not the real account) — fix these too.
- `description`, `email`, `contactPoint`, `address`/`areaServed`, `foundingDate`
- Consider `@type: ["Organization","OnlineStore"]` and a stable `@id` (`${baseUrl}/#organization`)
  so Product/Breadcrumb nodes can reference it as one graph.

### 3. Static-route `lastModified` churn in sitemap
`app/sitemap.ts:30` stamps every static route with `new Date()` on each crawl → tells
crawlers all pages changed every fetch (noise, can dampen crawl trust).
- **Fix:** use a stable build/edited date constant per static route.

---

## 🟠 P1 — High impact (the real growth levers)

### 4. Product schema completeness (AEO rich results / Merchant listings)
`productJsonLd` (`product/[handle]/page.tsx:64`) is missing fields Google now actively
flags and that LLMs extract:
- **`aggregateRating` + `review`** — see #5; biggest single rich-result win.
- **`hasMerchantReturnPolicy`** (`MerchantReturnPolicy`: 14-day, from FAQ) — Google flags
  its absence on product results.
- **`shippingDetails`** (`OfferShippingDetails`: free UK over £50, 2–4 days) — same.
- **`priceValidUntil`** on the offer.
- `material: "100% mulberry silk"`, `color`, `category` — strong GEO entity signals.
- Switch single-price items from `AggregateOffer` to `Offer` with `itemCondition:
  NewCondition` and `seller` → `@id` of the Organization.
- `image` should be the full image array, not just `featuredImage`.

### 5. No review / rating system at all
Zero `aggregateRating`/`Review` anywhere (`grep` confirms). Both AEO (star rich results)
and GEO (social-proof citations) weight this heavily.
- **Options:** Shopify Product Reviews app / Judge.me / Okendo → expose via metafields →
  render visible reviews + `aggregateRating` + `review` in Product JSON-LD.
- Even a small genuine review corpus materially changes how AI engines describe the brand.

### 6. Content depth for GEO — the biggest opportunity
There is **no blog / journal / buying-guide content** and **no `Article`/`HowTo` schema**.
GEO engines cite brands that *authoritatively answer questions*. For this brand the
high-intent queries are obvious:
- "How to fold a pocket square" / "how to tie a cravat/ascot" → **`HowTo` schema** +
  step content (also wins HowTo rich results & voice).
- "Cravat vs ascot vs tie", "best pocket square for a wedding", "what to wear for Eid",
  "silk care guide" → buying/comparison guides as `Article`.
- **Build:** `app/journal/[slug]` (or Shopify blog via Storefront API) with `Article`/
  `HowTo` JSON-LD, author, datePublished, internal links to collections/products.
- This is the slowest but highest-ceiling GEO lever. Start with 3–4 cornerstone pieces.

### 7. Collection pages missing structured data + breadcrumbs
`app/search/[collection]/page.tsx` renders a product grid but emits **no `ItemList` /
`CollectionPage` JSON-LD** and **no breadcrumb** (product/faqs/our-story all have one).
- Add `CollectionPage` + `ItemList` (itemListElement → product URLs) and a breadcrumb nav
  + `BreadcrumbList`. Helps AEO product carousels and GEO catalogue understanding.

---

## 🟡 P2 — Polish / compounding gains

### 8. Enrich `/llms.txt` (and add `llms-full.txt`)
Current file is good but thin. Make it *answer-complete* so an LLM can respond without a
second fetch:
- Inline the key facts: price ranges, **free UK shipping > £50**, **14-day returns**,
  delivery times, materials, occasions.
- Add deep links to bestsellers / hero products, not just collections.
- Add an `llms-full.txt` with expanded brand + FAQ + guide content.

### 9. `HowTo`/guide cross-linking & internal link graph
Once guides exist, interlink: product → relevant guide → collection. Dense, meaningful
internal links are a strong GEO/AEO ranking signal.

### 10. Image alt-text coverage
Ensure every product/gallery image has descriptive, factual alt text (Google Images +
GEO multimodal + a11y). Audit `gallery.tsx` / product images for empty `altText`.

### 11. `speakable` (optional, voice/AEO)
Add `speakable` (CSS-selector) to FAQ/guide pages for voice-assistant eligibility.

### 12. Verify Shopify product `description` quality
The Product JSON-LD `description` and meta description pull from Shopify. Confirm they're
substantive, factual paragraphs (materials, dimensions, occasion, care) — thin/duplicate
descriptions cap both AEO and GEO. (Repo has `photo-upgrade/titlecase-products.ts` etc.,
so there's already a content-tooling pattern to extend.)

---

## Suggested sequencing

1. **Week 1 (P0):** create `/contact`, complete Organization JSON-LD + real `sameAs`,
   fix sitemap `lastModified`. *(Small, fast, all in-repo.)*
2. **Week 1–2 (P1.4 + P1.7):** Product schema completeness (returns/shipping/material/
   rating-ready) + collection `ItemList`/breadcrumbs. *(In-repo.)*
3. **Week 2–3 (P1.5):** stand up reviews (app + metafields), wire `aggregateRating`.
4. **Ongoing (P1.6):** journal/guides with `HowTo`+`Article` — 3–4 cornerstone pieces,
   then expand. *(Highest GEO ceiling.)*
5. **Polish (P2):** enrich `llms.txt`/`llms-full.txt`, alt-text sweep, internal linking.

---

## Notes / constraints
- **Basic plan** blocks checkout branding API and CMS-page creation — that's why static
  content lives as code routes (`app/faqs`, `app/our-story`, etc.). Journal/guides should
  follow the same pattern (code routes) unless you add Shopify's blog.
- All schema added should be validated with the Shopify GraphQL/structured-data tooling
  and Google's Rich Results Test before shipping.
