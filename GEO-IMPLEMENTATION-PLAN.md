# Threaditionz GEO/AEO Implementation Plan

**Date:** 2026-06-12 · **Status:** Proposed
**Framework source:** Phaedra Solutions GEO/AEO Competitive Audit (June 2026) — its 10 scored dimensions, quick-win/strategic split, schema patterns and KPI loop, adapted from a B2B agency site to this Shopify headless storefront.
**Hard constraint (owner):** NO fabricated social proof. No seeded review metafields, no invented ratings, no fake "as seen in". The existing rating components stay dormant until a real reviews app writes real data. Credibility is built honestly (Phase 1).
**Companions:** CONTENT-STRATEGY.md, AEO-GEO-AUDIT.md, SEO-AUDIT.md, ASO-AUDIT.md, CONVERSION-PLAN.md

---

## 1. Where the store stands against the audit's 10 dimensions

Verified in code on 2026-06-12:

| Audit dimension | Status here | Evidence |
|---|---|---|
| Content structure & answer formatting | **Strong** | Journal guides use answer-first ledes + question H2s (8 guides); FAQs page; collection FAQs |
| Structured data / schema | **Strong, minor gaps** | Organization, WebSite+SearchAction (`app/layout.tsx`), BreadcrumbList site-wide, Product w/ returns+shipping, Article/HowTo w/ dates, FAQPage, CollectionPage ItemList |
| AI-crawler access & llms.txt | **Moderate** | llms.txt is live and auto-includes guides. robots.ts AI list is outdated: ships deprecated `Claude-Web`/`Anthropic-AI`, missing `Claude-User`, `Claude-SearchBot`, `Amazonbot`, `meta-externalagent`, `CCBot`, `MistralAI-User` (`app/robots.ts:6-18`) |
| E-E-A-T & author authority | **Needs work (worst dimension)** | Guides authored by Organization, not a Person (`app/journal/[slug]/page.tsx:94`); no bylines, no author page, no Person schema anywhere |
| Entity clarity | **Moderate** | Organization node solid, but `sameAs` is empty — zero social profiles exist (`lib/brand.ts:25-30`) |
| Citability (stats, sourcing) | **Needs work** | Guides contain zero sourced statistics or expert quotations — the audit's highest-evidence GEO lever (+30–41%) |
| Metadata & semantic HTML | **Strong** | Canonicals, OG/Twitter cards, answer-style descriptions present |
| Freshness signals | **Moderate** | Sitemap lastmod works, guides carry dateModified in schema — but `STATIC_CONTENT_LAST_MODIFIED` is hardcoded stale (`app/sitemap.ts:34`, says 2026-06-02; static pages changed 2026-06-12) and no date is **visibly rendered** on guide pages |
| Conversational query alignment | **Strong** | Guide titles/H2s mirror real prompts ("Cravat or Tie for Your Wedding?") |
| Technical | **Strong** | Server-rendered Next.js 15, Shopify CDN image loader, AVIF/WebP |

**Net read (audit's language):** Threaditionz has the *structured layer* the audit found missing at Phaedra — schema, breadcrumbs, dates, llms.txt are already in place. Its gaps are the inverse: the *trust layer* (authors, entity profiles, third-party proof, citable claims). That's also exactly the new-store credibility problem.

---

## 2. Phase 0 — Code quick wins (this week, all in this repo)

| # | Action | File(s) | Notes |
|---|---|---|---|
| 0.1 | Update AI-crawler allow-list | `app/robots.ts` | Replace deprecated `Claude-Web`/`Anthropic-AI` with `ClaudeBot`, `Claude-User`, `Claude-SearchBot`; add `Amazonbot`, `meta-externalagent`, `CCBot`, `MistralAI-User` (audit Appendix A, 2026 agent landscape) |
| 0.2 | Fix stale static lastmod | `app/sitemap.ts` | Derive static-page lastModified from a maintained constant per page or the latest guide dateModified — never a forgotten hardcode |
| 0.3 | Visible "Published / Updated" dates on guides | `app/journal/[slug]/page.tsx` | Schema has the dates; render them in the UI (audit: visible freshness labels matter, not just markup) |
| 0.4 | Founder author: Person schema + bylines | `lib/brand.ts`, `app/journal/[slug]/page.tsx`, new `app/journal/author/[slug]` or about-block | Add `author` field to `Guide`; emit `Person` (linked to Organization via `@id`) as schema author; visible byline with 1-line credential on every guide. Single biggest E-E-A-T move available — the audit's analogue of "author → article trust graph" |
| 0.5 | TL;DR consistency pass | `lib/journal.ts` | Ledes already serve this; verify each new guide's lede is a 40–80 word extractable answer (it is for the 4 P0 guides; keep as a review-checklist item) |
| 0.6 | Alt-text sweep on content pages | journal/our-story imagery | Product alt text was backfilled; verify guide hero images (when added) always ship `heroAlt` |

## 3. Phase 1 — Honest credibility stack (0–30 days, replaces "reviews as biggest lever")

The constraint: a new store has no reviews and will not fake them. The fix is to make real proof arrive as fast as possible and use **non-review trust signals** in the meantime.

| # | Action | Owner | Detail |
|---|---|---|---|
| 1.1 | Install a real reviews app, leave UI dormant | Code + admin | Judge.me (free tier) or Loox; configure it to write the `reviews.rating` / `reviews.rating_count` metafields the storefront already reads (`lib/shopify/metafields.ts`). Stars and aggregateRating appear **only when genuine reviews exist** — zero code change needed, the components are built for exactly this |
| 1.2 | Automated post-purchase review requests | Admin | Judge.me email 14 days after delivery (silk = gift timing, don't ask at day 3). Photo reviews incentivised with a next-order discount — incentivised-but-honest, disclosed per app defaults |
| 1.3 | Create the real social profiles → fill `sameAs` | Owner + code | Instagram + Pinterest minimum (visual product), TikTok optional. Fill `lib/brand.ts social` — code already filters empty strings and wires real ones into Organization sameAs + footer. Until then the entity has no third-party graph at all |
| 1.4 | Google Business Profile + Trustpilot listing | Owner | Site-level trust that doesn't depend on product review volume; both are crawled by AI engines and listicle writers. GBP also unlocks Google review collection independent of the on-site app |
| 1.5 | Seeding/gifting programme (disclosed) | Owner | Gift product to 10–15 UK menswear/wedding micro-creators and stylists for honest, *disclosed* reviews, photos and Reddit/IG mentions. This is the legitimate version of "getting mentioned where AI engines look" — third-party mentions drive 85% of AI brand citations |
| 1.6 | Wedding-party testimonial pipeline | Owner | Every multi-piece wedding order gets a post-event email asking for a testimonial + photo permission. Grooms photograph well; one real wedding gallery outperforms fifty anonymous star ratings for this product |
| 1.7 | Provenance as proof | Code (small) | What a new store CAN truthfully claim: 100% mulberry silk, hand-rolled edges, made in England, 14-day returns, gift-boxed. Audit principle "source and date your claims": put these as a structured fact-block on PDPs/about, never round numbers that don't exist yet ("1,000+ happy customers" is banned until true) |
| 1.8 | Founder visibility | Owner + code | Named founder on /our-story with photo + short bio (feeds 0.4's Person schema). Anonymous brands are uncitable; the audit scored author authority as a top-3 gap for a reason |

## 4. Phase 2 — Citability & authority (30–120 days)

| # | Action | Detail |
|---|---|---|
| 2.1 | Sourced statistics in every new guide | Per CONTENT-STRATEGY.md format standard: each P1 article carries 2–3 dated, attributed stats (V&A, UK wedding industry surveys, textile bodies) + a founder quotation. Highest-evidence GEO lever; apply retroactively to the 8 live guides |
| 2.2 | Original citable data — the audit's "Phaedra Index" analogue | Run one small, real survey (e.g. "UK Groom Accessories Survey 2026", n=100+ via wedding forums/Prolific) and publish it as a guide. Original data = the thing engines must cite *you* for, and a PR asset for 1.5/2.3. Only worth doing honestly — methodology stated |
| 2.3 | Third-party listicle & press outreach | Carry-over from CONTENT-STRATEGY.md (biggest off-site gap: no "best pocket square brands UK" listicle exists). Phase 1's profiles, GBP and real reviews are prerequisites — listicle writers check them |
| 2.4 | llms.txt enrichment | Add buying-facts and the credibility facts (1.7) as they become true; auto-includes guides already |
| 2.5 | Collection-hub FAQ/schema audit | Re-validate CollectionPage + ItemList + collection FAQs after Shopify-side collection title changes (Eid/Ajrak renames pending) |

## 5. Measurement loop (adapted from audit Appendix C, monthly)

| KPI | How |
|---|---|
| AI citation share | Fixed 10-query set (the CONTENT-STRATEGY.md core queries) prompt-tested monthly in ChatGPT, Perplexity, AI Overviews; log brand mentions/links |
| AI-referred sessions | Vercel Analytics / GA4 referrers: chatgpt.com, perplexity.ai, gemini, copilot |
| Real-review velocity | Reviews collected per month; % of delivered orders leaving a review (target 3–5%) |
| Structured-data coverage | Validator sweep: Product, Article, BreadcrumbList at 100% of URLs |
| Freshness index | % of URLs with accurate lastmod/dateModified (catches the 0.2 class of bug) |
| Entity completeness | sameAs count, GBP live, Trustpilot live, founder Person linked to all guides |
| Share of voice vs Rampley & Co / Cravat Club | Same query set, comparative |

## 6. Explicitly out of scope (owner decision)

- Seeding `reviews.rating` metafields manually, importing purchased/AI-generated reviews, fake "as seen in" logos, invented customer counts. Beyond ethics: Google removes aggregateRating rich results for unverifiable review data, and a single exposed fake-review incident is fatal for a heritage-luxury brand. The dormant-until-real architecture already in the codebase is the correct design — keep it.
