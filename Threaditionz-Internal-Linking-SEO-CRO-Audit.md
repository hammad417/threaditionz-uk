# Threaditionz.co.uk — Internal Linking, Related Products/Journals, SEO/AEO/GEO & CRO Audit

**Site audited:** https://threaditionz.co.uk/
**Method:** Manual crawl via Chrome of homepage, journal index + all 10 articles, a representative set of collection pages, multiple product pages across types (solid pocket square, cravat, scarf, scarf+square set, luxe set, four-in-one), and all informational/policy pages. Full URL inventory taken from `/sitemap.xml`.
**Date:** 26 June 2026
**Scope reminder:** Reviews are deliberately excluded from all recommendations, per brief.

**Site footprint (from sitemap.xml — 237 URLs):**

- 1 homepage
- 35 collection pages (served under `/search/...`)
- 181 product pages (`/product/...`)
- 1 journal index + 10 journal articles (`/journal/...`)
- 8 informational/policy pages: `/our-story`, `/sustainability`, `/contact`, `/faqs`, `/size-guide`, `/shipping-returns`, `/privacy-policy`, `/terms-conditions`

> **Note on product-page coverage:** All 181 product pages are rendered from a single template; the structural findings below (recommendation carousel logic, no contextual journal links, schema, breadcrumb) were verified to be identical across the product types sampled and therefore apply site-wide. Per-product copy/keywords differ, but the internal-linking architecture does not. Where the report says "every product page," it means the shared template that all 181 products inherit.

---

## A. Executive Summary

### Overall findings

Threaditionz is, technically, a well-built headless storefront. It already does several things most Shopify-class stores get wrong: collection pages have unique SEO intro copy and `FAQPage` schema, products carry `Product` + `BreadcrumbList` + `FAQPage` schema, the journal has 10 genuinely on-topic articles with `HowTo`/`Article`/`VideoObject` schema, and meta titles/descriptions are deliberately written. The taxonomy is rich — 35 collections spanning type, colour, pattern, occasion and curated edits — which means the _building blocks_ for excellent internal linking already exist.

The problem is **connective tissue**. The site has strong nodes but weak edges. Specifically:

1. **The product "You may also like" carousel is essentially a static "newest products" feed, identical on (almost) every product.** A solid navy pocket square and an Imperial Ajrak cravat show the **same ~14 recommended products**. There is no colour, pattern, type, price or occasion logic for standalone products. (Sets are the one exception — they correctly prepend their matching components.)
2. **No product page links to a single relevant journal article.** A cravat product does not link "How to Tie a Cravat." A navy pocket square does not link "Best Pocket Squares for a Navy Suit." The only journal link anywhere on a product page is the global footer "/journal" link.
3. **No journal article links to any other journal article.** "Related reading" does not exist on any of the 10 articles — a complete absence of topic-cluster cross-linking.
4. **Journals link very few products and zero collections in-body.** Guide articles link only 1–2 products; none link to a relevant _collection_ (e.g., the cravat guide doesn't link the Cravats collection).
5. **Collections don't link to journals or to sibling collections in-body.** The Weddings collection doesn't link the four wedding articles that exist; colour/pattern collections don't cross-link related colours/patterns beyond the global mega-nav.
6. **Informational pages are linking dead-ends.** Our Story, Sustainability, Size Guide, FAQs etc. contain only the global nav links — no contextual links to products, collections or journals.

### Biggest missed opportunities

- **Contextual related products on 181 product pages.** The single highest-impact fix. The carousel exists; only its _logic_ needs to change from "newest" to "same collection / matching set / same colour or pattern / complete-the-look."
- **Product → Journal linking (181 pages).** Every product can deep-link 1–3 relevant guides; the guides already exist.
- **Journal topic clusters.** 10 articles, all orphaned from each other. Adding "Related reading" turns them into a linked cluster — a major AEO/GEO and topical-authority win.
- **Journal → Collection "Shop this guide" modules.** Convert informational traffic into commercial sessions.

### Highest-impact fixes (ranked)

| #   | Fix                                                                                                                         | Effort                             | Impact    |
| --- | --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | --------- |
| 1   | Replace product carousel "newest" logic with contextual related-products logic (collection + colour/pattern + matching set) | Medium (1 template + ranking rule) | Very High |
| 2   | Add a "From the Journal" module to the product template, mapped by product type/occasion                                    | Medium                             | Very High |
| 3   | Add "Related reading" (3 links) to every journal article                                                                    | Low                                | High      |
| 4   | Add in-body "Shop this guide" collection + product links to all 10 articles                                                 | Low–Medium                         | High      |
| 5   | Add "Related guides" + "You might also like" collection cross-links to all 35 collection pages                              | Medium                             | High      |
| 6   | Add contextual links from Our Story / Size Guide / FAQs / Sustainability to collections + journals                          | Low                                | Medium    |
| 7   | Fix metadata bugs (duplicated `\| Threaditionz \| Threaditionz` brand suffix on set products) + render visible breadcrumbs  | Low                                | Medium    |

---

## B. Website Crawl Inventory

Page types and their internal-linking status. "Related products" / "Related journals" columns describe the _contextual, in-content_ modules — the global header/footer mega-nav (which links 34 collections + the journal index on every page) is present everywhere and is **not** counted as a contextual module.

| URL                           | Page type     | Related products                                | Related journals                | Key issue                                                                                   | Priority |
| ----------------------------- | ------------- | ----------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------- | -------- |
| `/`                           | Homepage      | Partial (10 "Gift Edit" products)               | None (links journal index only) | No links to individual articles; no "shop by occasion/colour" entry beyond nav              | P2       |
| `/search/*` (×35 collections) | Collection    | N/A                                             | None                            | No in-body journal links, no sibling-collection cross-links, FAQ present                    | P1       |
| `/product/*` (×181)           | Product       | Weak — static "newest" carousel, not contextual | None (footer link only)         | Irrelevant recommendations; no journal links; no complete-the-look for standalone items     | P1       |
| `/journal`                    | Journal index | N/A                                             | Lists all 10 (good)             | Healthy; could add "Shop the Journal" product/collection rail                               | P3       |
| `/journal/*` (×10 articles)   | Journal       | 1–6 product links (varies)                      | **None** (no related reading)   | No article-to-article links; thin articles link only 1 product; no collection links in-body | P1       |
| `/our-story`                  | Informational | None                                            | None                            | Linking dead-end; no product/collection/journal links                                       | P2       |
| `/sustainability`             | Informational | None                                            | None                            | Linking dead-end; thin (≈237 words)                                                         | P3       |
| `/contact`                    | Support       | None                                            | None                            | No links to FAQs/size guide/wedding collection                                              | P3       |
| `/faqs`                       | Support       | None                                            | None                            | FAQPage schema good; no links to relevant collections/guides                                | P2       |
| `/size-guide`                 | Support       | None                                            | None                            | No links to how-to-fold / how-to-tie guides or collections                                  | P2       |
| `/shipping-returns`           | Policy        | None                                            | None                            | Fine as policy; could link gifting/wedding collection                                       | P3       |
| `/privacy-policy`             | Policy        | None                                            | None                            | Standard policy page — no action                                                            | P4       |
| `/terms-conditions`           | Policy        | None                                            | None                            | Standard policy page — no action                                                            | P4       |

**Crawl observations applying site-wide**

- **Global mega-nav** links 34 collections + journal index from every page. Crawl depth to any collection is therefore shallow (good). But crawl depth/relevance _between_ content of the same theme is poor (the actual issue).
- **Schema is strong**: products carry `Product` + `BreadcrumbList` + `FAQPage`; collections carry `CollectionPage` + `BreadcrumbList` + `FAQPage`; how-to articles carry `HowTo` + `FAQPage` + `VideoObject`; journal index carries `ItemList` + `BreadcrumbList`. Sitewide `Organization`/`OnlineStore` + `WebSite`.
- **`BreadcrumbList` schema is present but no visible breadcrumb UI was detected** on product/collection/journal pages — schema and on-page UX are out of sync.
- **Metadata bug:** set products render a duplicated brand suffix, e.g. `Buy Caput Mortuum Dark Silk Scarf & Pocket Square Set | Threaditionz | Threaditionz`. Standalone products use a clean single suffix.

---

## C. Product Page Recommendations

### C.0 — The template-level issue (applies to all 181 products)

**Current behaviour (verified):**

- The "You may also like" carousel returns a near-identical static set of ~14 _newest_ products regardless of the product being viewed. Confirmed by comparing `/product/the-solid-navy-blue-silk-pocket-square` and `/product/imperial-ajrak-silk-cravat` — both show the same items (W21-Brf1 set, the three Traditional Ajrak Luxe items, Maroon & Black Mystery, Brown Indigo, In & Out cravat, W21-Daisy, Regimental, Navy Valour, Blue White Tartan…).
- **Exception — sets:** `/product/caput-mortuum-dark-silk-scarf-pocket-square-set` correctly prepends its own components (`…-pocket-square`, `…-scarf`) and a related solid before falling back to the static list. So the rail _can_ take contextual items; the ranking rule is simply missing for standalone products.
- **Zero contextual journal links.** The only journal link is the footer.

**Recommended related-products logic (priority order for the rail):**

1. **Matching set / components** — if a standalone item belongs to a set, surface the set + sibling components ("Complete the set"). If a set, surface its components (already works).
2. **Same collection, same colour** — e.g., navy pocket square → other navy items (`/search/blue-silk-accessories`) and other solids (`/search/solid-silk-pocket-squares`).
3. **Same pattern family** — Ajrak/heritage → other `/search/heritage-ajrak-silk-accessories`; tartan → other plaid/check; polka → other polka.
4. **Complete-the-look across types** — a cravat → matching pocket square + scarf; a pocket square → matching cravat (cross-sell to lift AOV).
5. **Same occasion** — wedding-tagged → other wedding items.
6. Fall back to best-sellers / new arrivals only to fill remaining slots.

**Recommended journal logic (map by product type → article):**

| Product type             | Journal articles to surface                                                                                          |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| Any **cravat**           | How to Tie a Cravat; Cravat vs Ascot vs Tie; Cravat or Tie for Your Wedding; Best Cravats for a Summer Wedding       |
| Any **pocket square**    | How to Fold a Pocket Square; Pocket Square & Tie Matching; Best Pocket Squares for a Navy Suit                       |
| Any **scarf**            | (create) How to Style a Silk Scarf; Silk Care guide                                                                  |
| **Wedding-tagged** items | Silk Accessories for Weddings; Cravat or Tie for Your Wedding; Groom vs Groomsmen; Best Cravats for a Summer Wedding |
| **Ascot / formal** items | Royal Ascot Men's Accessories; Cravat vs Ascot vs Tie                                                                |
| **Sets / gifting**       | Silk Accessories for Weddings; (create) Silk Gift Guide                                                              |

### C.1 — Representative per-product recommendations

These worked examples show the exact pattern to apply across the catalogue. Anchor text is given in _italics_.

**1. The Solid Navy Blue Silk Pocket Square** — `/product/the-solid-navy-blue-silk-pocket-square`

- _Current issue:_ Recommendations are the static newest list (Ajrak, tartans, cravats) — nothing navy, nothing solid, no matching cravat. No journal links.
- _Related products to add:_ other solids (`/product/the-solid-antique-gold…`, `…-sage-green…`, `…-zinc…`), navy-coordinating items, and any navy cravat/scarf to complete the look.
- _Related journals to add:_ _How to Fold a Pocket Square_, _Best Pocket Squares for a Navy Suit_, _Pocket Square & Tie Matching_.
- _Related categories:_ _Solid Silk Pocket Squares_, _Blue Silk Accessories_, _Pocket Squares_.
- _Suggested anchor text:_ "See more solid silk pocket squares", "Read: best pocket squares for a navy suit".
- _Priority:_ P1

**2. Imperial Ajrak Silk Cravat** — `/product/imperial-ajrak-silk-cravat`

- _Current issue:_ Same static recommendations; no link to the cravat how-to or to other Ajrak/heritage pieces.
- _Related products:_ _Traditional Ajrak_ cravat/pocket-square/scarf, other heritage prints, a matching Ajrak pocket square ("complete the look").
- _Related journals:_ _How to Tie a Cravat_, _Cravat vs Ascot vs Tie_.
- _Related categories:_ _Cravats_, _Heritage Ajrak Silk Accessories_, _Business & Formal_.
- _Suggested anchor text:_ "Shop all cravats", "New to cravats? How to tie a cravat".
- _Priority:_ P1

**3. Caput Mortuum Dark Silk Scarf & Pocket Square Set** — `/product/caput-mortuum-dark-silk-scarf-pocket-square-set`

- _Current issue:_ Recommendation logic already prepends components (good). But no journal links; title tag duplicates the brand (`… | Threaditionz | Threaditionz`).
- _Related products:_ keep component prepend; add other scarf+square sets and the Luxe sets.
- _Related journals:_ _Silk Accessories for Weddings_, _How to Fold a Pocket Square_.
- _Related categories:_ _Gift Sets_, _Silk Scarves_.
- _Suggested anchor text:_ "Explore more silk gift sets".
- _Priority:_ P1 (fix title), P2 (journal module)

**4. Four-in-One Cloudy Grey Silk Pocket Square** — `/product/four-in-one-cloudy-grey-silk-pocket-square`

- _Current issue:_ No links to the rest of the four-in-one range or the explainer of what "four-in-one" means.
- _Related products:_ other _Four-in-One_ pastel squares; grey/silver coordinating items.
- _Related journals:_ _How to Fold a Pocket Square_ (and a new "What is a four-in-one pocket square?" explainer — see Section F).
- _Related categories:_ _Four-in-One Pocket Squares_, _Grey & Silver Silk Accessories_.
- _Priority:_ P2

**5. Traditional Ajrak Silk Scarf & Pocket Square Set (Luxe Collection)** — `/product/traditional-ajrak-silk-scarf-and-pocket-square-set-luxe-collection`

- _Current issue:_ No cross-link to the other two Luxe Ajrak items or the Luxe Collection landing.
- _Related products:_ the Luxe Ajrak cravat set + pocket square; other Luxe items.
- _Related journals:_ _Silk Accessories for Weddings_; a future "Heritage of Ajrak" brand-story piece.
- _Related categories:_ _Luxe Collection_, _Heritage Ajrak Silk Accessories_, _Wedding Silk Accessories_.
- _Priority:_ P2

> **Rollout note:** Because the rail and journal module are template features, implementing the logic once fixes all 181 products. The per-product examples above are the QA acceptance pattern, not 181 separate dev tickets.

---

## D. Category / Collection Page Recommendations

**Template-level status (verified on `/search/pocket-squares` and `/search/wedding-silk-accessories`):**

- ✅ Unique SEO H1 + intro copy, optimised title/meta, `CollectionPage` + `BreadcrumbList` + `FAQPage` schema, on-page FAQ section, product count shown, sort + collection sidebar.
- ❌ No in-body links to relevant **journal articles**.
- ❌ No in-body **sibling/related-collection** cross-links (only the global mega-nav).
- ❌ No styling/buying-guide content block, no "complete the look" merchandising.
- ⚠️ No visible breadcrumb UI despite breadcrumb schema.

| Collection                                                                                                                                                  | URL                                   | Current issue                                                  | Related collections to add                                                                | Related journals to add                                                                                         | Missing content                                 | Priority |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | -------- |
| Pocket Squares                                                                                                                                              | `/search/pocket-squares`              | No journal/guide links; no sibling cross-links                 | Solid Silk Pocket Squares, Four-in-One Pocket Squares, Cravats (cross-sell), Silk Scarves | How to Fold a Pocket Square; Pocket Square & Tie Matching; Best Pocket Squares for a Navy Suit                  | "How to wear" block; buying guide               | P1       |
| Cravats                                                                                                                                                     | `/search/cravats`                     | No link to the 4 cravat guides                                 | Pocket Squares, Wedding, Business & Formal                                                | How to Tie a Cravat; Cravat vs Ascot vs Tie; Cravat or Tie for Wedding; Best Cravats for a Summer Wedding       | "How to tie" inline + video                     | P1       |
| Silk Scarves                                                                                                                                                | `/search/silk-scarves`                | No styling guidance; no guide exists yet                       | Gift Sets, Pocket Squares                                                                 | (create) How to Style a Silk Scarf; Silk Care                                                                   | Styling block, care block                       | P1       |
| Weddings                                                                                                                                                    | `/search/wedding-silk-accessories`    | 4 relevant wedding articles exist, none linked                 | Cravats, Gift Sets, Business & Formal, Luxe Collection                                    | Silk Accessories for Weddings; Cravat or Tie for Wedding; Groom vs Groomsmen; Best Cravats for a Summer Wedding | "Coordinate the wedding party" guidance + links | P1       |
| Gift Sets                                                                                                                                                   | `/search/gift-sets`                   | No gifting guide; no occasion cross-links                      | Gifts for Him, Luxe Collection, Wedding                                                   | (create) Silk Gift Guide; Silk Accessories for Weddings                                                         | Gifting reassurance, occasion picker            | P1       |
| New Arrivals                                                                                                                                                | `/search/new-arrivals`                | Curated edit with no editorial context                         | Luxe Collection, seasonal occasion collections                                            | Seasonal/trend article (create)                                                                                 | "What's new this season" intro refresh          | P2       |
| Luxe Collection                                                                                                                                             | `/search/luxe-collection`             | No brand-story link; no heritage context                       | Heritage Ajrak, Wedding                                                                   | (create) Heritage/craftsmanship story; Our Story link                                                           | Craftsmanship block                             | P2       |
| Colour collections (×10: black, blue, brown, green, grey-silver, pink-peach, purple, red-maroon, white-ivory, yellow-gold)                                  | `/search/{colour}-silk-accessories`   | No cross-link to adjacent colours or to matching-colour guides | 2–3 sibling colours + the matching type collection                                        | Best Pocket Squares for a Navy Suit (blue); Pocket Square & Tie Matching                                        | "Shop by colour" mini-nav                       | P2       |
| Pattern collections (×11: solid, polka-dot, paisley, floral, plaid-check, houndstooth, geometric, damask-brocade, calligraphy-art, heritage-ajrak, novelty) | `/search/{pattern}-silk-accessories`  | No pattern explainer; no sibling pattern links                 | Adjacent patterns + the parent type                                                       | Pattern/style guides (mostly to be created)                                                                     | "About this pattern" block                      | P3       |
| Occasion collections (business-formal, casual-daytime, festive-eid)                                                                                         | `/search/{occasion}-silk-accessories` | No occasion styling guidance                                   | Wedding, Gift Sets                                                                        | Royal Ascot (formal); occasion guides                                                                           | Occasion intro + guide links                    | P2       |

**Suggested FAQ additions for collections** (each already has an FAQ block — extend it):

- Pocket Squares: "What size pocket square should I buy?" → link Size Guide. "How do I fold a pocket square?" → link the how-to.
- Cravats: "How do I tie a cravat?" → link how-to + video. "Cravat vs tie for a wedding?" → link guide.
- Weddings: "How do I coordinate the groom and groomsmen?" → link Groom vs Groomsmen. "Cravat or tie?" → link guide.

---

## E. Journal / Blog Recommendations

**Template-level status (all 10 articles):**

- ✅ On-topic, well-titled, schema-rich (`HowTo`/`Article` + `VideoObject`, several `FAQPage`).
- ❌ **No article links to any other article** — zero "Related reading" across the whole journal.
- ⚠️ Guide articles link only 1–2 products; **no article links a collection in-body** (only the global nav).
- ⚠️ Four articles are thin (≈340–440 words): _Cravat vs Ascot vs Tie_, _Silk Accessories for Weddings_, _Pocket Square & Tie Matching_, _Groom vs Groomsmen_.

| Article                             | URL                                       | Words      | Current issue                                           | Products to link                  | Collections to link                           | Related journals to link                                                           | CTA / anchor text                    |
| ----------------------------------- | ----------------------------------------- | ---------- | ------------------------------------------------------- | --------------------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------ |
| How to Tie a Cravat                 | `/journal/how-to-tie-a-cravat`            | 985        | Only 2 cravats linked; no collection or related-reading | Add 2–4 beginner-friendly cravats | _Cravats_, _Wedding_                          | Cravat vs Ascot vs Tie; Cravat or Tie for Wedding; Best Cravats for Summer Wedding | "Shop all cravats" → /search/cravats |
| How to Fold a Pocket Square         | `/journal/how-to-fold-a-pocket-square`    | 913        | 2 squares linked; no collection/related reading         | Add solids + four-in-one examples | _Pocket Squares_, _Solid Silk Pocket Squares_ | Pocket Square & Tie Matching; Best Pocket Squares for Navy Suit                    | "Shop pocket squares"                |
| Cravat vs Ascot vs Tie              | `/journal/cravat-vs-ascot-vs-tie`         | 386 (thin) | 1 product; thin; no related reading                     | 3–4 cravats/ascot styles          | _Cravats_                                     | How to Tie a Cravat; Royal Ascot; Cravat or Tie for Wedding                        | "Find your cravat"                   |
| Silk Accessories for Weddings       | `/journal/silk-accessories-for-weddings`  | 343 (thin) | Thin; 2 products; no collection link                    | Add wedding sets + cravats        | _Wedding_, _Gift Sets_, _Luxe_                | Cravat or Tie for Wedding; Groom vs Groomsmen; Best Cravats for Summer Wedding     | "Shop wedding silk"                  |
| Cravat or Tie for Your Wedding      | `/journal/cravat-or-tie-wedding`          | 971        | 2 products; no collection/related reading               | Wedding cravats + sets            | _Cravats_, _Wedding_                          | Silk Accessories for Weddings; Best Cravats for Summer Wedding; Groom vs Groomsmen | "Shop wedding cravats"               |
| Royal Ascot Men's Accessories       | `/journal/royal-ascot-mens-accessories`   | 851        | 2 products; no collection/related reading               | Formal cravats + pocket squares   | _Business & Formal_, _Cravats_                | Cravat vs Ascot vs Tie; How to Tie a Cravat                                        | "Shop formal silk"                   |
| Pocket Square & Tie Matching        | `/journal/pocket-square-tie-matching`     | 430 (thin) | Thin; 2 products; no collection                         | Contrasting + solid squares       | _Pocket Squares_, _Solid Silk Pocket Squares_ | How to Fold a Pocket Square; Best Pocket Squares for Navy Suit                     | "Shop pocket squares"                |
| Groom vs Groomsmen Accessories      | `/journal/groom-vs-groomsmen-accessories` | 438 (thin) | Thin; 2 products; no collection                         | Coordinated set + cravats         | _Wedding_, _Gift Sets_                        | Silk Accessories for Weddings; Cravat or Tie for Wedding                           | "Coordinate the wedding party"       |
| Best Pocket Squares for a Navy Suit | `/journal/best-pocket-squares-navy-suit`  | 751        | Good (6 products); no collection/related reading        | Keep; add navy/blue solids        | _Pocket Squares_, _Blue Silk Accessories_     | How to Fold a Pocket Square; Pocket Square & Tie Matching                          | "Shop pocket squares for navy"       |
| Best Cravats for a Summer Wedding   | `/journal/best-cravats-summer-wedding`    | 765        | Good (6 products); no collection/related reading        | Keep; add pastel cravats          | _Cravats_, _Wedding_                          | Cravat or Tie for Wedding; Silk Accessories for Weddings                           | "Shop summer cravats"                |

**Universal journal recommendations:**

- Add a **"Related reading"** module (3 links) to every article using the cluster map in Section H.
- Add a **"Shop this guide"** module: 3–6 products + 1–2 collection buttons, positioned mid-article and again at the end.
- Expand the four thin articles to 700+ words so they can rank and earn the `FAQPage` treatment the stronger guides have.
- Add a sticky or repeated **CTA** to the relevant collection at the end of every article.

---

## F. New Journal / Content Ideas

| Proposed article                                  | Target keyword / intent              | Products / collections it supports    | Internal links to include                                       | Funnel stage | Priority |
| ------------------------------------------------- | ------------------------------------ | ------------------------------------- | --------------------------------------------------------------- | ------------ | -------- |
| How to Style a Silk Scarf (Men)                   | "how to wear a silk scarf men"       | Silk Scarves, Gift Sets               | Silk Scarves collection; How to Tie a Cravat; Silk Care         | TOFU         | P1       |
| How to Care for Silk Accessories                  | "how to wash silk / silk care"       | All products (care reassurance)       | Size Guide; Sustainability; all collections                     | MOFU         | P1       |
| What is a Four-in-One Pocket Square?              | "four in one pocket square"          | Four-in-One Pocket Squares            | Four-in-One collection; How to Fold a Pocket Square             | MOFU         | P1       |
| The Complete Silk Gift Guide (for Him)            | "silk gifts for him / luxury gift"   | Gift Sets, Gifts for Him, Luxe        | Gift Sets; Wedding; Silk Accessories for Weddings               | TOFU/BOFU    | P1       |
| Pocket Square Folds: 8 Ways                       | "pocket square folds"                | Pocket Squares, Solid Squares         | How to Fold; Pocket Square & Tie Matching                       | TOFU         | P2       |
| The Heritage of Ajrak & Calligraphy Silk          | "ajrak silk / heritage print"        | Heritage Ajrak, Calligraphy Art, Luxe | Luxe Collection; Our Story                                      | MOFU (brand) | P2       |
| What Colour Pocket Square With a Grey Suit?       | "pocket square grey suit"            | Pocket Squares, colour collections    | Best Pocket Squares for Navy Suit; Pocket Square & Tie Matching | BOFU         | P2       |
| Cravat Knots: 5 Ways to Tie                       | "cravat knot styles"                 | Cravats                               | How to Tie a Cravat; Cravats collection                         | MOFU         | P2       |
| Eid & Festive Silk Accessories Guide              | "eid gift men / festive accessories" | Festive Eid, Gift Sets                | Festive Eid collection; Gift Guide                              | Seasonal     | P3       |
| Wedding Colour Coordination for the Groom's Party | "wedding accessory colours"          | Wedding, colour collections           | Groom vs Groomsmen; colour collections                          | BOFU         | P2       |

---

## G. New Collection / Landing Page Ideas

| Proposed page                         | Purpose                                                                                      | Target intent                           | Products to include             | Journals to support                            | Priority      |
| ------------------------------------- | -------------------------------------------------------------------------------------------- | --------------------------------------- | ------------------------------- | ---------------------------------------------- | ------------- |
| Shop by Occasion hub                  | One entry point linking Wedding, Business & Formal, Casual Daytime, Festive Eid, Royal Ascot | "men's silk accessories for [occasion]" | Pulls from occasion collections | All wedding + Ascot articles                   | P1            |
| Complete the Look / Matching Sets hub | Surface print-matched cravat + square + scarf trios                                          | "matching pocket square and cravat set" | Gift Sets + sets                | Silk Accessories for Weddings; matching guides | P1            |
| Shop by Colour hub                    | Visual colour grid linking all 10 colour collections                                         | "[colour] pocket square / silk"         | Colour collections              | Navy-suit & matching guides                    | P2            |
| Royal Ascot 2026 edit                 | Seasonal landing for Ascot dress code                                                        | "royal ascot accessories men"           | Formal cravats, pocket squares  | Royal Ascot article                            | P2 (seasonal) |
| Gifts for Him hub (upgrade)           | Strengthen existing /search/gifts-for-him into a guided gift finder                          | "silk gifts for men"                    | Gift Sets, Luxe                 | Gift Guide; Wedding                            | P2            |
| The Luxe / Heritage story landing     | Editorial landing blending Luxe products + craftsmanship story                               | "luxury silk pocket square handmade"    | Luxe Collection                 | Heritage of Ajrak; Our Story                   | P3            |

---

## H. Internal Linking Map (recommended model)

The principle: every commercial page should link _down_ (to products), _across_ (to sibling collections/products), and _out_ (to a relevant guide); every guide should link _down_ (to products + a collection) and _across_ (to related guides). Today only the global mega-nav does any of this.

### Product → Product

- Standalone item → 4–8 contextual items by: matching set/components → same colour → same pattern → complete-the-look cross-type → same occasion. (Replaces the current static newest-products rail.)
- Set → its components + other sets (already partially working — preserve it).

### Product → Journal (new module: "From the Journal")

- Cravat products → How to Tie a Cravat · Cravat vs Ascot vs Tie · Cravat or Tie for Wedding
- Pocket-square products → How to Fold a Pocket Square · Pocket Square & Tie Matching · Best Pocket Squares for a Navy Suit
- Scarf products → How to Style a Silk Scarf (new) · Silk Care (new)
- Wedding-tagged → Silk Accessories for Weddings · Groom vs Groomsmen · Best Cravats for a Summer Wedding
- Formal/Ascot → Royal Ascot Men's Accessories · Cravat vs Ascot vs Tie

### Journal → Product ("Shop this guide")

- Each article surfaces 3–6 products it references + 1–2 collection CTAs (anchor text in Section E).

### Category → Journal

- Cravats → 4 cravat guides; Pocket Squares → 3 square guides; Weddings → 4 wedding guides; Silk Scarves → scarf-style + care (new); Gift Sets → gift guide (new); Blue → navy-suit guide.

### Journal → Category

- Every article ends with a "Shop [collection]" CTA to the most relevant collection (and a secondary cross-sell collection).

### Homepage → priority collection/content

- Homepage already links 34 collections + 10 Gift Edit products well. **Add a "From the Journal" row** linking 3–4 individual articles (currently it links only the journal index), and an **occasion entry** (Wedding / Ascot / Gifting) above the fold.

### Topic clusters (for "Related reading" + AEO/GEO authority)

- **Cravats cluster:** How to Tie a Cravat ↔ Cravat vs Ascot vs Tie ↔ Cravat or Tie for Wedding ↔ Best Cravats for a Summer Wedding ↔ Royal Ascot. Hub = Cravats collection.
- **Pocket Squares cluster:** How to Fold a Pocket Square ↔ Pocket Square & Tie Matching ↔ Best Pocket Squares for a Navy Suit ↔ (new) Pocket Square Folds. Hub = Pocket Squares collection.
- **Weddings cluster:** Silk Accessories for Weddings ↔ Cravat or Tie for Wedding ↔ Groom vs Groomsmen ↔ Best Cravats for a Summer Wedding. Hub = Weddings collection.
- **Scarves/Care cluster (to build):** How to Style a Silk Scarf ↔ Silk Care ↔ Sustainability. Hub = Silk Scarves collection.

### Orphan / weak-link risks

- **All 10 articles are orphaned from each other** (no article-to-article links) — highest internal-linking debt on the site.
- **181 product pages are content-orphans from the journal** (no contextual guide links).
- **Informational pages** (Our Story, Sustainability, Size Guide, FAQs, Contact) are linking dead-ends — they receive nav links but emit none contextually.
- The static rail means many catalogue products are likely **rarely linked from any other product**, while the ~14 "newest" items are over-linked — an uneven internal PageRank distribution.

---

## I. Technical SEO & Schema Recommendations

**What's already good (preserve):**

- `Product` + `BreadcrumbList` + `FAQPage` on products; `CollectionPage` + `BreadcrumbList` + `FAQPage` on collections; `HowTo`/`Article` + `VideoObject` (+ `FAQPage` on several) on journals; `ItemList` + `BreadcrumbList` on the journal index; site-wide `Organization`/`OnlineStore` + `WebSite`.
- Deliberate, keyword-aware titles and meta descriptions; unique collection intro copy.

**Fixes:**

1. **Breadcrumb UX:** `BreadcrumbList` schema is present but no visible breadcrumb trail was detected. Render a visible breadcrumb (Home › Collection › Product) to match the schema and improve crawl context + UX.
2. **Title-tag duplication:** set products output a doubled brand suffix (`… | Threaditionz | Threaditionz`) and a `Buy` prefix inconsistent with standalone products. Normalise the title template across all product types.
3. **`ItemList`/`Product` for recommendation & PLP grids:** ensure collection product grids and the new related-products rail expose item links in the rendered HTML (not only client-side) so they're crawlable.
4. **Add `Article`/`FAQPage` consistently:** the four thin articles use only `Article` + `VideoObject`; once expanded, add `FAQPage` to match the stronger guides.
5. **Internal link crawlability:** confirm the new "From the Journal", "Related reading", and "Shop this guide" modules render as real `<a href>` server-side (the site is JS-rendered — verify these links are in the SSR/SSG HTML, not injected only after hydration).
6. **Alt text:** product/lifestyle imagery should carry descriptive alt text (e.g., "Navy blue solid silk pocket square folded in a suit breast pocket") — important for image search and accessibility. Audit and templatise alt text from product name + colour + type.
7. **Self-referencing canonicals:** confirmed present on homepage/products; ensure colour/pattern/occasion collections that surface overlapping products each have self-canonicals and unique intro copy to avoid thin/duplicate-content risk (the colour and pattern collections are the main risk area — keep their intros distinct).
8. **Internal search → indexable collections:** collections live under `/search/`. Ensure these curated pages are not treated as parameterised internal-search results by crawlers — confirm they're in the sitemap (they are) and not blocked/`noindex`'d, and consider that the `/search/` path naming is unconventional for category pages (acceptable if indexable, but a `/collections/` path would read as more canonical to search engines).
9. **AEO/GEO answer blocks:** add concise, definition-style answer snippets (40–60 words) at the top of guides and collection FAQs (e.g., "A cravat is…", "For a navy suit, the best pocket square colours are…") so AI assistants and featured snippets can extract them. Pair with `FAQPage`/`HowTo` schema already in place.
10. **Entity/topical clustering:** implement the Section H clusters so search engines see a connected entity graph (cravats, pocket squares, weddings, silk care) rather than isolated pages.

---

## J. CRO & Ecommerce Enhancement Recommendations (reviews excluded)

1. **Contextual related products** (Section C) — the biggest discovery + AOV lever; replaces irrelevant rail.
2. **"Complete the look" / "Buy the set"** on every standalone item that has matching pieces — surfaces cross-type cravat/square/scarf bundles and lifts AOV.
3. **Recently viewed products** rail — none detected; add to product + collection pages to aid reconsideration.
4. **"From the Journal" on product pages** — builds confidence (how to tie/fold/care) right at the decision point.
5. **Delivery & returns reassurance near add-to-cart** — surface "Free UK delivery over £50" and easy-returns microcopy beside the buy button (the info exists on `/shipping-returns` but should be repeated at point of decision).
6. **Trust/quality block near add-to-cart** — "100% mulberry silk · hand-rolled edges · hand-finished in England" as concise badges (drawn from Our Story), reinforcing premium positioning without reviews.
7. **Shop-by entry points** — add Shop by Occasion / Colour / Fabric-Style modules on homepage and collection pages (taxonomy already exists; just needs surfacing).
8. **Size/spec clarity at product level** — link the Size Guide inline on every product and show dimensions in a consistent spec block; add a "What's a four-in-one?" tooltip on those products.
9. **Sticky add-to-cart** on mobile product pages for long scrolls.
10. **Gifting affordances** — gift messaging / "ships gift-ready" cues on Gift Sets, Gifts for Him, Luxe; link the new Gift Guide.
11. **Collection filtering/sorting** — a sort exists; add faceted filters (colour, pattern, occasion, price, type) on the larger collections (Weddings has 100+ items) to aid discovery.
12. **Empty/unavailable-product handling** — ensure sold-out or removed products show graceful states with related-item suggestions rather than dead ends.
13. **Mobile journal CTAs** — make "Shop this guide" buttons prominent and repeated on mobile articles.
14. **Homepage journal row** — surface individual articles (not just the index) to deepen sessions and feed the cluster.

---

## K. Prioritized Action Plan

**Phase 1 — Quick wins (days)**

- Fix set-product title duplication + normalise product title template.
- Add "Related reading" (3 links) to all 10 journal articles (cluster map, Section H).
- Add in-body "Shop this guide" collection CTA to all 10 articles.
- Add contextual links from Our Story, Size Guide, FAQs, Sustainability → relevant collections + guides.
- Add a homepage "From the Journal" row linking 3–4 articles.

**Phase 2 — Internal linking & related-content rollout (1–3 weeks)**

- Re-engineer the product recommendation rail: contextual logic (set/colour/pattern/complete-the-look/occasion) replacing "newest".
- Add the "From the Journal" module to the product template (type/occasion mapping).
- Add "Related guides" + sibling-collection cross-links to all 35 collection pages.
- Add collection→journal links and expand collection FAQ answers with guide links.

**Phase 3 — New content & landing pages (2–6 weeks)**

- Publish priority new guides: How to Style a Silk Scarf, Silk Care, What is a Four-in-One, Silk Gift Guide.
- Expand the four thin articles to 700+ words and add FAQPage schema.
- Build Shop-by-Occasion and Complete-the-Look/Matching-Sets hubs.

**Phase 4 — UX / CRO enhancements (parallel, 2–6 weeks)**

- Recently-viewed rail; complete-the-look bundles; delivery/returns + trust microcopy near add-to-cart; sticky mobile add-to-cart; faceted filters on large collections.

**Phase 5 — SEO / AEO / GEO optimisation (ongoing)**

- Visible breadcrumbs; alt-text templatisation; SSR verification of new link modules; answer-style snippets atop guides/FAQs; canonical/duplicate-content checks on colour/pattern collections; entity-cluster monitoring.

---

## L. Developer-Ready Task List

| #   | Task title                                  | Page/template                                                                                           | Description                                                                                                                                                                  | Acceptance criteria                                                                                                                                                                | Priority | Dependency                                |
| --- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------------------------------------- |
| L1  | Contextual related-products rail            | Product template (181 pages)                                                                            | Replace static "newest" feed with ranked logic: matching set/components → same colour → same pattern → complete-the-look cross-type → same occasion → fill with best-sellers | On 5 QA products (navy solid square, Ajrak cravat, a set, a four-in-one, a Luxe set) the rail shows ≥4 contextually relevant items; no two unrelated products show identical rails | P1       | Product taxonomy/tags exposed to template |
| L2  | "From the Journal" module on PDP            | Product template                                                                                        | Add module mapping product type/occasion → 1–3 relevant articles (mapping in Section C.0)                                                                                    | Every product renders ≥1 relevant journal link as server-side `<a href>`; cravats link the cravat guides, squares link the square guides                                           | P1       | Article mapping table                     |
| L3  | "Related reading" on articles               | Journal template (10 articles)                                                                          | Add 3 article-to-article links per cluster (Section H)                                                                                                                       | Each of the 10 articles links ≥2 other articles; links present in SSR HTML                                                                                                         | P1       | None                                      |
| L4  | "Shop this guide" on articles               | Journal template                                                                                        | Add product rail (3–6 items) + 1–2 collection CTA buttons, mid- and end-article                                                                                              | Each article links ≥3 products + ≥1 collection in-body                                                                                                                             | P1       | None                                      |
| L5  | Fix product title template                  | Product template                                                                                        | Remove duplicated `\| Threaditionz \| Threaditionz` and inconsistent `Buy` prefix on set products                                                                            | All product titles end in a single `\| Threaditionz`; consistent pattern across standalone + sets                                                                                  | P1       | None                                      |
| L6  | Collection → journal + sibling links        | Collection template (35 pages)                                                                          | Add "Related guides" block + "You might also like" sibling-collection block (maps in Section D)                                                                              | Each collection links ≥1 relevant article + ≥2 sibling collections in-body (not nav)                                                                                               | P1       | Collection→article/sibling map            |
| L7  | Visible breadcrumbs                         | Product + collection + journal templates                                                                | Render breadcrumb UI matching existing `BreadcrumbList` schema                                                                                                               | Visible Home › … trail on all PDP/PLP/article pages                                                                                                                                | P2       | None                                      |
| L8  | Informational-page contextual links         | Our Story, Size Guide, FAQs, Sustainability, Contact                                                    | Add in-body links to relevant collections + guides                                                                                                                           | Each page emits ≥2 contextual links to commercial/guide pages                                                                                                                      | P2       | None                                      |
| L9  | Homepage "From the Journal" row             | Homepage                                                                                                | Add a row linking 3–4 individual articles + an occasion entry point                                                                                                          | Homepage links ≥3 individual `/journal/*` URLs (currently 0)                                                                                                                       | P2       | None                                      |
| L10 | Recently-viewed rail                        | Product + collection templates                                                                          | Client-side recently-viewed module                                                                                                                                           | Rail shows last-viewed items; gracefully empty for new sessions                                                                                                                    | P2       | None                                      |
| L11 | Complete-the-look / buy-the-set             | Product template                                                                                        | For standalone items with matching pieces, surface the set + sibling pieces as a bundle CTA                                                                                  | Items with a known set show a "Complete the set" block                                                                                                                             | P2       | L1 ranking data                           |
| L12 | Delivery/returns + trust microcopy near ATC | Product template                                                                                        | Surface "Free UK delivery over £50", returns, and silk/craftsmanship badges beside add-to-cart                                                                               | Microcopy visible above the fold on PDP mobile + desktop                                                                                                                           | P2       | None                                      |
| L13 | Expand thin articles + FAQ schema           | 4 articles (cravat-vs-ascot, silk-accessories-weddings, pocket-square-tie-matching, groom-vs-groomsmen) | Grow to 700+ words; add `FAQPage`                                                                                                                                            | Word count ≥700; valid FAQPage schema                                                                                                                                              | P2       | Content                                   |
| L14 | New guides                                  | New journal pages                                                                                       | Publish: How to Style a Silk Scarf, Silk Care, What is a Four-in-One, Silk Gift Guide                                                                                        | 4 articles live, each with Shop-this-guide + Related-reading                                                                                                                       | P2       | Content; L3/L4 modules                    |
| L15 | Shop-by-Occasion & Complete-the-Look hubs   | New landing pages                                                                                       | Build the two priority hubs (Section G)                                                                                                                                      | Hubs live, linked from homepage + nav, indexable                                                                                                                                   | P3       | L14 content where referenced              |
| L16 | Alt-text templatisation                     | Product/image components                                                                                | Generate descriptive alt text from product name + colour + type                                                                                                              | All product images have non-empty descriptive alt                                                                                                                                  | P3       | None                                      |
| L17 | Answer-style snippets (AEO/GEO)             | Journal + collection FAQ                                                                                | Add 40–60 word definition answers atop guides + in collection FAQs                                                                                                           | Each guide/collection has ≥1 extractable answer block                                                                                                                              | P3       | None                                      |
| L18 | Faceted filters on large collections        | Collection template                                                                                     | Add colour/pattern/occasion/price filters (priority: Weddings 100+ items)                                                                                                    | Filters functional + indexation rules defined                                                                                                                                      | P3       | None                                      |
| L19 | SSR verification of link modules            | All new modules (L1–L4, L6)                                                                             | Confirm new internal links render in server HTML, not only post-hydration                                                                                                    | Links visible in `view-source` / SSR snapshot                                                                                                                                      | P2       | L1, L2, L3, L4, L6                        |
| L20 | Canonical/duplicate-content check           | Colour + pattern collections                                                                            | Ensure unique intro copy + self-canonicals across overlapping collections                                                                                                    | No two collections share intro copy; canonicals self-referential                                                                                                                   | P3       | None                                      |

---

### Appendix — Pages that could not be fully expanded

All 237 sitemap URLs were reachable. Product-page findings are template-level (verified across 6 product types: solid pocket square, cravat, scarf+square set, Luxe set, four-in-one, standalone scarf); individual product copy/keywords were not transcribed for all 181 items, but the internal-linking architecture is identical across them. `/privacy-policy` and `/terms-conditions` were treated as standard legal pages requiring no internal-linking action.
