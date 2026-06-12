# Threaditionz Content Strategy — Journal Expansion Plan

**Date:** 2026-06-12 · **Status:** Active (P0 published 2026-06-12)
**Positioning:** British luxury silk accessories. Cultural/fusion keyword clusters deliberately excluded per owner decision (2026-06-12).
**Companions:** AEO-GEO-AUDIT.md, SEO-AUDIT.md, ASO-AUDIT.md, CONVERSION-PLAN.md

Research basis: competitor content audit (12+ brands/publishers), UK search-demand triangulation (Google Trends GB 5-yr, en-GB autocomplete, SERP analysis), GEO citation-pattern research (Princeton GEO paper arXiv:2311.09735, Semrush/Profound/Ahrefs/Wix citation studies, June 2026).

---

## 1. Key research findings

1. **Only two competitors do content seriously:** Rampley & Co (243 posts + 17 evergreen fold pages + art-history "Product Focus" series) and Cravat Club (163 posts, 2–4/month, ranks #2 for "how to tie a cravat" via a dedicated evergreen page). Otway & Orford, Geoff Stocker, Shaun Gordon and Marwood have effectively no content operation.
2. **Retailer blogs already beat publishers in AI answers for this niche.** Small UK retailers — not Wikipedia/GQ — win the how-to and occasion queries; there is no authority wall. The Princeton GEO study found lower-ranked sites gain most from GEO optimisation (+115% visibility for rank-5 pages adding citations).
3. **The wedding-cravat cluster is the highest-value contested gap:** "cravat vs tie wedding" demand peaks 81–100 indexed every late May–mid June (Trends GB); incumbents are a 2010 blog post and small retailers.
4. **Silk-education queries are owned by bedding brands** (mulberry silk, momme, care) — no menswear brand covers them. Craft depth = the differentiation story ("hand-finished in England").
5. **Occasion queries reward annual freshness:** every "Royal Ascot dress code" winner carries the year in the title and refreshes annually.

### Demand snapshot (Trends GB 5-yr relative scale; "pocket square" = 24)

| Cluster | Signal | Seasonality | Verdict |
|---|---|---|---|
| Wedding cravat / cravat vs tie | Peaks 81–100 indexed yearly | Sharp Apr–Jun | Fight — weak incumbents |
| Pocket square heads/folds | High (24) but contested by US giants | May–Aug +60% | Avoid heads; hit weak sub-questions |
| Royal Ascot dress code | 20–58× spike, one June week | Mid-June | Annual-refresh play |
| Silk education/care | Med, evergreen, bedding brands own it | Flat | Take |
| Men's silk scarf styling | Low-med; #1 is one dated article | Oct–Jan | Beatable |
| Gifting heads (Christmas etc.) | High, GQ/John Lewis own them | Nov–Dec | Skip heads; long-tail only ("luxury silk gifts for him", "12th anniversary silk") |

---

## 2. Pillars

- **A. UK Wedding Authority** (revenue driver) — cravat-vs-tie, party coordination, colour matching → `/search/wedding-silk-accessories`, `/search/cravats`
- **B. Silk Craft & Education** (E-E-A-T engine + differentiation) — mulberry silk, momme, hand-rolled edges, printed vs woven, care
- **C. British Occasions & The Season** (freshness play) — Royal Ascot, Cheltenham, Goodwood Revival, Henley, black tie
- **D. Style How-Tos & Gifting** (traffic base) — folds library, scarf styling, matching rules, gifting long-tail

## 3. Roadmap

### P0 — ✅ published 2026-06-12
1. `cravat-or-tie-wedding` — Cravat or Tie for Your Wedding? (peak seasonal demand)
2. `royal-ascot-mens-accessories` — Royal Ascot 2026 by enclosure (refresh annually each April, update year in title)
3. `pocket-square-tie-matching` — Should Your Pocket Square Match Your Tie? (weak dated incumbents)
4. `groom-vs-groomsmen-accessories` — Groom vs Ushers coordination

### P1 — Jul–Sep 2026 (craft hub + wedding depth)
5. What Is Mulberry Silk? A Menswear Guide (momme, twill vs satin)
6. How to Care for Silk Accessories: Wash, Iron, Store (link from every PDP)
7. Hand-Rolled vs Machine-Stitched: Why Edges Matter
8. Printed vs Woven Silk: What You're Actually Paying For
9. Cravat Colours for Navy, Grey & Tweed Suits
10. Father of the Groom (and Bride): An Accessories Guide
11. How to Wear a Silk Scarf: A Man's Guide (publish Sep for Oct–Jan season)
12. Goodwood Revival Style Guide (publish early Sep; event mid-Sep)

### P2 — Oct 2026–Mar 2027
13. Luxury Silk Gifts for Him (mid-Oct)
14. Silk: The 12th Anniversary Gift (uncontested long-tail, year-round intent)
15. Black Tie Accessories: The Rules (Nov)
16. How to Tie a Scarf With an Overcoat (Nov)
17. Pocket Square Folds: The Complete Visual Library (Dec–Jan; Rampley pattern — one deep-linkable section per named fold)
18. Real Silk vs Fake: How to Tell
19. Woven in Britain: English Silk and the Macclesfield Legacy
20. The History of the Cravat
21. What to Wear to Cheltenham (early Feb; event mid-Mar)
22. Royal Ascot 2027 refresh + wedding-cluster refresh pass (Mar–Apr)

Parked (owner call): paisley-origin story — standard menswear textile history, but origin narrative is Persian/Kashmiri; excluded with the cultural cluster unless reframed as British textile history (Paisley, Scotland).

**Cadence:** 2–3 articles/month + quarterly refresh pass on occasion content.

---

## 4. GEO format standard (every article)

1. Answer-first lede (40–80 words answering the title question)
2. Question-based H2s, each opening with an extractable 1–2 sentence answer
3. Statistics with named sources + expert quotations (+30–41% measured generative-engine visibility — strongest evidence)
4. Comparison tables for vs-content; numbered steps for how-tos
5. Named author byline + Person schema (E-E-A-T must be structural, not tonal)
6. Visible datePublished/dateModified; occasion pieces carry the year in the title, refreshed annually
7. "Shop the look" collection cross-links + PDP→guide backlinks (care guide from every PDP care section)
8. 60–90s companion video per how-to (YouTube = top-3 cited domain on Perplexity 16.1% / AI Overviews 9.5%)
9. No keyword stuffing (measured −10% in generative engines)
10. Schema caveat: Google dropped FAQ rich results (May 2026) and HowTo (2023) — keep JSON-LD for AI-retrieval clarity only; invest in on-page answer text

### Technical
- Continue `lib/journal.ts` pattern; at ~15 guides split per-category and add `/journal` category filtering
- Add `author` field + byline rendering (P1)
- Consider standalone evergreen routes for the top 2–3 how-tos (Cravat Club `/pages/` pattern)
- Keep `/llms.txt` updated (low cost; evidence of AI-crawler pickup is ~zero — don't over-invest)

---

## 5. Off-site GEO (higher leverage than on-site for "best X" queries)

1. **Get into a neutral "best pocket square / cravat brands UK" listicle** — none exists; listicles drive ~90% of third-party brand mentions in AI answers; third-party mentions outweigh own-domain 6.5×. Biggest single gap found.
2. Digital PR on the Macclesfield/English-silk story (earned media rose sharply as an AI citation source post-Sept 2025)
3. UK wedding-blog guest features (Rock My Wedding / Magpie Wedding tier) on groom accessories
4. Authentic Reddit participation (r/weddingsUK, r/malefashionadvice) — high-value, volatile amplifier
5. YouTube shorts per how-to guide

## 6. Measurement (6-month targets)

- 15+ guides live
- Top-10 UK rankings: "cravat or tie wedding", "wedding cravat"
- AI-engine citations (monthly manual spot-check of 10 core queries in ChatGPT/Perplexity/AI Overviews) for ≥3 wedding/craft queries
- Guide → collection click-through via existing analytics; assisted conversions once reviews/Klaviyo land (CONVERSION-PLAN.md)

## 7. Open items

- On-site copy still references the removed positioning (`app/our-story/page.tsx` — Ajrak/Mughal/Ghalib/Eid; `lib/journal.ts` silk-accessories-for-weddings guide — heritage-motif/Eid lines; `/search/festive-eid-silk-accessories` collection links). Revisit for consistency with the new direction — owner decision pending.
- Royal Ascot 2026 article published during event week (late) — the value is the April 2027 refresh on an aged URL.
