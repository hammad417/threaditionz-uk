# Threaditionz GEO/AEO Implementation Plan

**Date:** 2026-06-12 · **Status:** Active
**Source:** Threaditionz GEO/AEO Competitive Audit (12 June 2026) — score **59/100 (C+)**, benchmarked live against Cravat Club (60), Mrs Bow Tie (67), Rampley & Co (70). Audit's read: *"Best-in-class technical plumbing; least-developed trust and depth."*
**Hard constraint (owner):** NO fabricated social proof. The audit's quick-win #2 ("seed with early-customer feedback") and its example PDP JSON-LD (a hardcoded 4.8★/36-review AggregateRating) are explicitly **rejected as written** — no rating/review markup ships until real, verified reviews exist. Section 6 defines the honest substitute.
**Companions:** CONTENT-STRATEGY.md, AEO-GEO-AUDIT.md, SEO-AUDIT.md, ASO-AUDIT.md, CONVERSION-PLAN.md

---

## 1. Audit verdict in one paragraph

Threaditionz already **leads all three competitors** on the structural layer: site-wide Organization/WebSite schema, Product+Offer markup including shipping & returns (unique in the set), BreadcrumbList everywhere, FAQPage on PDPs and collections, explicit AI-crawler allow-list, llms.txt. It **trails the whole set** on: customer reviews (2.0/10 — the single largest recommendation gap), content depth (guides ~390 words vs Rampley's ~1,200-word PDPs), product identifiers (slug-as-SKU, no GTIN), brand authority (no named humans, no sameAs, no press), and agentic commerce (all three competitors expose agents.md + UCP/MCP; we expose nothing). Audit projection: closing these moves 59 → low-to-mid 70s in a quarter and makes Threaditionz the most-cited brand in the niche.

## 2. Audit findings verified against the codebase (2026-06-12)

| Audit claim | Verified? | Note |
|---|---|---|
| sku = URL handle, no GTIN/MPN | ✅ Confirmed | `lib/structured-data.ts:99` — `sku: product.handle` |
| Meta descriptions exceed ~320 chars | ✅ Confirmed | PDP uses full `product.description` untruncated (`app/product/[handle]/page.tsx:33`) |
| Journal articles link zero products | ✅ Confirmed | `related` links go to collections only (`lib/journal.ts`) |
| No AggregateRating/Review | ✅ Confirmed, **by design** | Rating components are dormant until a reviews app writes real `reviews.rating` metafields — correct architecture, keep |
| Organization missing sameAs/phone/address | ✅ Confirmed | `lib/brand.ts` social handles all empty; no contactPoint address |
| Articles authored by Organisation, no named person | ✅ Confirmed | `app/journal/[slug]/page.tsx:94` |
| robots allow-list missing CCBot, Amazonbot, Meta-ExternalAgent, Vertex, DuckAssistBot | ✅ Confirmed | Also: current list ships deprecated `Claude-Web`/`Anthropic-AI` names (audit's Appendix A repeats them — use current `Claude-User`/`Claude-SearchBot` instead) |
| All content shares one launch date | ⚠️ Partly stale | True at crawl; 4 new guides + revisions shipped 2026-06-12. Cadence point stands |
| WebSite lacks SearchAction | ❌ Already built | `app/layout.tsx:64-70` — likely deployed after the crawl |
| Add HowTo to tying/folding guides | ❌ Already built | `app/journal/[slug]/page.tsx:64` |
| Sitemap lastmod | ❌ Already built | Full lastmod incl. image extensions |
| No ItemList of products w/ offers on collections | ⚠️ Partial | ItemList exists (name+url per product) but without offers — minor enrichment |
| Agentic commerce: zero | ✅ Confirmed | No agents.md, no feed/UCP/MCP surface; competitors get Shopify's stack on their standard storefronts — our headless build bypasses it |

## 3. Phase 0 — Code quick wins (this week, this repo)

| # | Action | Audit ref | Files |
|---|---|---|---|
| 0.1 | Expand robots AI allow-list: add `CCBot`, `Amazonbot`, `Meta-ExternalAgent`, `Google-CloudVertexBot`, `DuckAssistBot`; replace deprecated `Claude-Web`/`Anthropic-AI` with `Claude-User`, `Claude-SearchBot` | QW6 / App.A | `app/robots.ts` |
| 0.2 | Real SKUs in Product schema: read variant `sku` from the Storefront API (fallback to handle only when unset) | QW3 | `lib/shopify/queries`, `lib/structured-data.ts` — depends on owner task 1.6 |
| 0.3 | Truncate PDP/collection meta descriptions to ≤160 chars (sentence-boundary cut) | QW5 | `app/product/[handle]/page.tsx`, collection page |
| 0.4 | Direct product links in every guide: extend `Guide.related` to support product-level hrefs; link the exact pieces each guide discusses | QW7 | `lib/journal.ts`, journal template |
| 0.5 | Named author: `author` field on guides → visible byline + `Person` schema linked to Organization; founder Person on /our-story | S10 (start) | `lib/brand.ts`, `lib/journal.ts`, `app/journal/[slug]/page.tsx`, `app/our-story/page.tsx` |
| 0.6 | Visible "Published / Updated" dates on guide pages (schema already carries them) | 5.12 | `app/journal/[slug]/page.tsx` |
| 0.7 | Organization `contactPoint` + email/phone + address (as much as the owner will publish) | QW4 | `lib/brand.ts` |
| 0.8 | Collection ItemList: include price/availability per item | 6 (collections) | `lib/structured-data.ts` |
| 0.9 | Alt-text sweep across the 181-image library (script the check; fix gaps in Shopify) | QW5 | one-off script + admin |

## 4. Phase 1 — Trust, honestly (0–30 days; replaces audit QW1–2 as written)

| # | Action | Owner | Detail |
|---|---|---|---|
| 1.1 | Install reviews platform (Judge.me free tier), wired to the dormant `reviews.rating` / `reviews.rating_count` metafields the storefront already reads | Admin | Stars + AggregateRating appear **automatically and only** when real reviews accrue — zero code needed |
| 1.2 | Post-purchase review requests on every order from day one | Admin | Email at ~14 days post-delivery (gift timing); photo reviews incentivised with next-order discount, disclosed per platform defaults |
| 1.3 | **No seeding.** Early "gifting feedback" counts only if it's a real recipient, verified through the platform, and marked as such | Policy | This is where the audit's wording crosses the line; we don't |
| 1.4 | Create real social profiles (Instagram + Pinterest min.) → fill `lib/brand.ts` `social` → sameAs + footer light up automatically | Owner + code | Currently the entity has no third-party graph at all |
| 1.5 | Google Business Profile + Trustpilot listing | Owner | Site-level trust independent of product-review volume; both crawled by AI engines and listicle writers |
| 1.6 | Populate real SKUs in Shopify admin (enables 0.2); decide GTIN path: GS1 UK membership for gtin13 (Rampley's edge) or brand-MPN interim | Owner | GTINs feed Google Shopping + AI shopping panels; MPN is the zero-cost interim |
| 1.7 | Founder/maker named on /our-story: photo, short bio, craft credentials, the hand-finishing process shown not claimed | Owner + code | The audit is blunt: premium positioning rests on heritage claims with no evidentiary scaffolding |
| 1.8 | Disclosed gifting programme: product to 10–15 UK menswear/wedding micro-creators for honest, labelled reviews/photos/mentions | Owner | The legitimate route to third-party mentions and the review corpus |
| 1.9 | Wedding-party testimonial pipeline: post-event email to multi-piece orders for testimonial + photo permission | Owner | One real wedding gallery beats fifty anonymous stars for this product |

## 5. Phase 2 — Depth & moat (30–120 days)

| # | Initiative | Audit ref | Detail |
|---|---|---|---|
| 2.1 | Rebuild guides to 1,200–1,800 words: comparison tables, embedded FAQs, sourced statistics, named author | S8 | Start with the 4 highest-intent (cravat-or-tie, Royal Ascot, fold, tie-a-cravat); aligns with CONTENT-STRATEGY.md format standard |
| 2.2 | "Best X for Y" recommendation layer: "best silk pocket square for a navy suit", "best cravat for a summer wedding under £50", gift guides by budget/recipient — each hard-linking specific products | S9 | The highest-converting GEO surface; currently absent niche-wide |
| 2.3 | PDP enrichment: deeper styling/material/care copy (toward Rampley's ~1,200w on hero products), "pairs with / complete the set / related by colour-occasion" modules | S12 | Also lifts AOV; related modules give engines product-level anchors |
| 2.4 | Agentic commerce surface: publish `agents.md`; expose a structured product feed; evaluate pointing AI agents at Shopify's UCP/MCP endpoints (the competitors get these free on standard Shopify — confirm what the headless setup can reuse vs build) | S11 | All three competitors are machine-transactable today; we are not |
| 2.5 | ImageObject enrichment on PDPs/guides; VideoObject when how-to videos ship | S14 | Pairs with CONTENT-STRATEGY.md's video-per-guide plan |
| 2.6 | Publishing & refresh cadence: 2–3 guides/month (CONTENT-STRATEGY.md calendar) + genuine seasonal dateModified refreshes (wedding season, Royal Ascot, gifting) | S13 | Kills the "single launch date" signal permanently |
| 2.7 | Original citable data: one small, real survey ("UK Groom Accessories Survey 2026") published with methodology | — (carried from strategy) | The asset engines must cite *us* for; also PR fuel for 1.8 |

## 6. Credibility without fake reviews — the operating rules

1. AggregateRating/Review markup renders **only** from platform-verified reviews. Manual metafield writes are banned.
2. No invented counts, no "as seen in" without a real placement, no purchased or AI-written reviews, ever. One exposed incident is fatal to a heritage-luxury brand — and Google strips rich results for unverifiable review data.
3. Until reviews accrue, trust is carried by: provenance facts (mulberry silk, hand-rolled edges, made in England), the named founder, real social presence, GBP/Trustpilot, disclosed creator reviews, wedding galleries with permission, and guarantee clarity (14-day returns, free UK >£50).
4. Velocity over volume: 10 real reviews in month one beats 200 fake ones forever. Target 3–5% of delivered orders reviewing.

## 7. Measurement (audit Appendix C, monthly from the 59 baseline)

| KPI | How |
|---|---|
| Share of AI answers (prompt panel) | Fixed buying-prompt set ("best silk pocket square for a navy suit UK", the CONTENT-STRATEGY.md core queries) tested monthly in ChatGPT, Perplexity, AI Overviews, Gemini |
| Citation rate vs competitors | How often named alongside Cravat Club / Rampley / Mrs Bow Tie in the same answers |
| AI-referral sessions | Vercel Analytics/GA4 referrers: chatgpt.com, perplexity.ai, gemini, copilot |
| Review volume & average rating | Platform dashboard; the primary recommendation trust signal |
| Rich-result/structured-data coverage | Search Console + Rich Results Test; errors trending to zero |
| GTIN/SKU coverage, agents.md presence | Feed health checks |
| Content depth & freshness | Median words/guide; % of priority pages updated in last 90 days |
| AI-crawler hit rate | Vercel logs by user-agent (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot) |

**Sequencing:** Phase 0 ships now (all code). Phase 1 runs in parallel — items 1.1–1.2 (reviews collecting) and 1.4 (profiles) are the critical path; everything in Phase 2 compounds on them. Audit projection if executed: 59 → low-to-mid 70s within a quarter, with the niche's only combination of best-in-set schema *and* real trust signals.
