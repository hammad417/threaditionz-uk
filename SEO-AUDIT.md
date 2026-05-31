# SEO Audit — Threaditionz storefront

Audited against the codebase + live rendered pages (dev server). Solid technical base
(Vercel Commerce), with high-impact gaps. Status legend: ✅ ok · ⚠️ fix.

## ✅ Already good

- Dynamic `app/robots.ts` + `app/sitemap.ts` (home, all collections/products/pages, `lastmod`).
- Product JSON-LD: **Product + AggregateOffer + BreadcrumbList + FAQPage** (verified live).
- Per-page metadata from **Shopify SEO** fields; hidden products `noindex`.
- Single `<h1>` per page; `next/image` AVIF/WebP; OG image routes; Twitter cards; `<html lang="en-GB">`.

## 🔴 Critical

1. **8/9 footer & nav links 404** — `/size-guide /shipping-returns /faqs /our-story /sustainability /privacy-policy /terms-conditions /account` (only `/contact` = 200). Broken internal links + missing legal pages. → create the Shopify pages (or remove links).
2. **No canonical tags** — 0 `rel="canonical"` on home/product/collection. `alternates.canonical` never set → duplicate-content risk from `/search?sort=` filters. → add canonical in each `generateMetadata`.
3. **Production domain risk** — `baseUrl = https://${VERCEL_PROJECT_PRODUCTION_URL}` (`lib/utils.ts`). If prod isn't `threaditionz.co.uk`, all sitemap/robots/OG/canonical URLs point to `*.vercel.app`. → set an explicit site URL.

## 🟠 High

4. **`/search` indexable + in sitemap** — live `robots: index, follow`. → `noindex, follow`; drop from sitemap.
5. **Weak/incorrect image alt** — 383/518 product images have no Shopify alt; gallery falls back to `"{title} - {filename}"`; the uploaded AI images have alt `"AI on-body (Threaditionz)"`. → descriptive alts (backfill via Shopify uploader).
6. **ALL-CAPS titles/H1** — `IMPERIAL AJRAK SILK CRAVAT`. Hurts CTR/readability. → title-case in Shopify or CSS-cap H1 only.
7. **Collection title double-brands & overflows** — `Silk Cravats | Men's 100% Silk | Threaditionz UK | Threaditionz`. → use Shopify SEO title as absolute (no template re-append); keep < 60 chars.
8. **Homepage title = "Threaditionz"** only. → descriptive, keyword-rich.

## 🟡 Medium

- No `Organization` + `WebSite` (SearchAction) schema → add in `layout.tsx`.
- Product schema lacks `brand`/`sku`/`aggregateRating` → add `brand` at least.
- Hero video LCP: first `<video preload="auto">` downloads upfront → `preload="metadata"`/`none`.
- OG image alt = "AI on-body (Threaditionz)".

## 🟢 Low

- Link favicon/apple-touch-icon/manifest + root `description`/OG/Twitter defaults.
- `robots.ts` no `disallow` for `/api`, `/cart`.

## Fix order

1. Create the 8 missing pages (or remove links).
2. Canonicals + `noindex` on search + explicit prod domain (one pass: `lib/utils.ts`, 3 `generateMetadata`, `layout.tsx`).
3. Backfill descriptive image alt text (Shopify uploader).
4. Org/WebSite schema + `brand` on Product.
5. Title-case fixes + hero-video `preload`.
