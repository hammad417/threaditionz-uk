# ASO — All-Search Optimisation Audit (Threaditionz)

Beyond classic SEO: every surface a buyer might discover the products — web search,
**AI answer engines**, **Google/Bing Shopping**, **Pinterest & social**, image/visual
search, voice, and the store's own internal search. Grounded against the live site.
Legend: ✅ done · ⚠️ gap · 🔧 I can implement in-repo · ☁️ needs an external account.

## 1. Classic web search (Google / Bing) — mostly ✅

Covered in the SEO pass: canonicals, explicit domain, robots+sitemap, Product/Breadcrumb/
FAQ/Organization/WebSite schema, titles, descriptive alt text, legal+info pages, icons.

- ⚠️ 🔧 **Image sitemap** — `sitemap.xml` has **0 image entries**; add `<image:image>` per
  product so Google Images/Discover can surface them.
- ⚠️ 🔧 **Bing / IndexNow** — no IndexNow ping; add to get near-instant Bing/Yandex indexing.
- ⚠️ ☁️ **Search Console + Bing Webmaster** — verify the domain, submit the sitemap.

## 2. AI / answer engines (AEO / GEO) — ⚠️ the biggest opportunity

ChatGPT, Perplexity, Gemini, Google AI Overviews increasingly answer "best silk pocket
square brand" etc. and cite sources. Current state: **no AI surface at all.**

- ⚠️ 🔧 **`/llms.txt`** (404) — add a concise, link-rich brand+catalogue summary for LLMs.
- ⚠️ 🔧 **AI crawler access** — `robots.ts` allows all, but make it explicit (GPTBot,
  OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended) so you're cite-able.
- ✅ **Structured data + FAQ + clean factual copy** already help (LLMs lean on schema).
- ⚠️ **Entity consistency** — keep name/description/"made in" consistent across site,
  Shopify, and social (note: brand says "England", metafields say "Made in Pakistan" —
  reconcile, as AI answers will repeat whatever is most consistent).

## 3. Shopping search (Google Shopping, Bing Shopping) — ⚠️

This is where product buyers convert. Current state: relies on whatever Shopify channel
is connected; the storefront itself isn't optimised for it.

- ⚠️ ☁️ **Google Merchant Center feed** — connect Shopify's Google & YouTube channel
  (auto product feed) or Merchant Center; same for Microsoft/Bing Shopping.
- ⚠️ 🔧 **`og:type="product"` + product meta** — product pages currently have **no
  `og:type=product`** and no `product:price:amount` / `product:availability` /
  `og:price` tags → weaker Facebook/Pinterest/shopping previews. Add them.
- ⚠️ **Product schema gaps for shopping** — has `brand`/`sku`/price/availability; add
  `gtin`/`mpn` if available, and per-variant `Offer`s. (`AggregateOffer` is fine for ranges.)
- ⚠️ **Reviews** — no `aggregateRating`/reviews; ratings stars in SERP+Shopping lift CTR.
  Add a reviews app and surface review schema.

## 4. Social & discovery search (Pinterest, Instagram, TikTok) — ⚠️ high value for accessories

Pinterest especially is a search engine for menswear/style.

- ⚠️ 🔧 **Pinterest Rich Pins** — enabled by `og:type=product` + product tags (above).
- ⚠️ ☁️ **Pinterest business + tag**, **Meta/TikTok catalog** (shoppable) — connect the
  Shopify product feed; verify the domain on each.
- ✅ **Vertical imagery exists** — the new 3:4 on-body shots + 4:5 mega-menu format suit
  Pinterest/Reels; repurpose the 9:16 hero clips for Reels/TikTok.
- ⚠️ ☁️ **Domain-verification meta** (Pinterest `p:domain_verify`, Meta, Google) — none present.

## 5. Image & visual search (Google Images, Google Lens, Pinterest Lens) — partial

- ✅ **Descriptive alt text** (just backfilled, 750 media) + AVIF/WebP + high-res images.
- ⚠️ 🔧 **Image sitemap** (see #1) — the main lever for image indexing.
- ⚠️ **Image filenames** — Shopify CDN filenames are opaque hashes; not critical but
  descriptive names help. Lens benefits most from the alt text + structured data (done).

## 6. Voice search & featured snippets — mostly ✅

- ✅ **FAQ schema** on product pages + the new `/faqs` page (FAQPage) → snippet/voice eligible.
- ✅ **WebSite SearchAction** (sitelinks search box) added.
- ⚠️ Lean into **conversational, concise answers** in product/FAQ copy ("How do you fold a
  pocket square?") to win "how/what/best" queries.

## 7. Internal site search — ⚠️ conversion lever, not just SEO

On-site search is the highest-intent surface and it's weak today.

- ⚠️ **No typo tolerance / synonyms** — `?q=cravvat` → "no products"; `?q=cravat` → 52.
  Shopify's basic query is exact-match. Add a search app (Searchanise/Algolia/Shopify
  Search & Discovery) for typo-tolerance, synonyms ("ascot"↔"cravat"), and filters.
- ⚠️ **No filters/facets** on collection/search (only sort). Faceted nav (colour, pattern,
  occasion — you already have these as collections) improves discovery + long-tail SEO.
- ✅ `/search` is now `noindex` (correct).

## 8. Marketplaces — ☁️ optional

If you expand to Etsy/Amazon/Not On The High Street, each has its own ASO (titles,
tags, A+ content). The Higgsfield `marketplace-cards` skill can generate compliant
listing imagery when needed.

## 9. Performance / Core Web Vitals — cross-engine ranking factor

- ✅ Hero video `preload=metadata` + priority poster; AVIF/WebP; Next image optimisation.
- ⚠️ Run a **Lighthouse/CrUX** pass on home (hero video) + a PDP to confirm LCP/CLS/INP.

---

## Priority quick wins I can implement in-repo now (🔧)

1. **`/llms.txt`** — AI answer-engine brand+catalogue summary.
2. **`og:type=product` + product meta** on product pages — Pinterest Rich Pins + shopping previews.
3. **Image sitemap** — add `<image:image>` to `sitemap.ts`.
4. **Explicit AI-crawler allow** in `robots.ts` (GPTBot, PerplexityBot, ClaudeBot, Google-Extended, …).
5. (Optional) **IndexNow** ping endpoint for instant Bing indexing.

## Needs an external account (☁️ — your side)

- Connect Shopify **Google & YouTube** channel (Merchant feed) + **Microsoft/Bing Shopping**.
- **Pinterest business** + **Meta/TikTok catalog**; verify domain on each (+ Google Search Console / Bing Webmaster).
- Add a **reviews app** (review stars) and a **search & discovery app** (typo/synonyms/facets).
- Reconcile the **"Made in England" vs "Made in Pakistan"** entity inconsistency.
