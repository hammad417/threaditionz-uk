# Domain Consolidation Handoff — make `threaditionz.co.uk` the one authoritative storefront

**Owner action required.** This repo (the `.co.uk` headless storefront) is now done — it emits
self-referencing canonicals + `en-GB`/`x-default` hreflang and uses the `.co.uk` domain in every
sitemap, robots, OG and JSON-LD URL (see "What was already fixed in code"). The remaining work is on
the **legacy `threaditionz.com` Shopify store**, in **Google Search Console**, and in your **ad
accounts** — none of which can or should be changed from this repo.

**Guardrail respected:** I made **no** DNS, registrar, hosting, or Shopify-admin changes. Everything
below is for you to action.

---

## 1. Current state (verified 27 Jun 2026)

| Check                           | `threaditionz.co.uk` (this repo)                                  | `threaditionz.com` (legacy Shopify)                                                                                                                              |
| ------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Platform                        | Headless Next.js → Shopify (`threaditionz-uk`)                    | Shopify storefront                                                                                                                                               |
| Currency / market               | **GBP / UK**                                                      | **PKR / Pakistan** (prices shown in `Rs.`)                                                                                                                       |
| Catalogue                       | Same designs (Huroof, Diwan-e-Ghalib, Ajrak, cravat+square sets…) | **Same designs / product names** — effectively duplicate brand content                                                                                           |
| `rel=canonical`                 | Self-referencing → `.co.uk` ✅                                    | **None found** ❌                                                                                                                                                |
| `hreflang`                      | `en-GB` + `x-default` → `.co.uk` ✅ (this change)                 | **None** ❌                                                                                                                                                      |
| `robots`                        | Indexable; AI crawlers welcomed; `sitemap.xml` → `.co.uk` ✅      | Indexable (`/products`, `/collections`, `/blogs` allowed); own `sitemap.xml`                                                                                     |
| Cross-links to the other domain | n/a                                                               | **None** — no link or canonical back to `.co.uk` ❌                                                                                                              |
| Brand-term search visibility    | **Not surfaced** in results for the brand's own product names     | **Owns the results** — a search for the distinctive product names ("Huroof", "Diwan-e-Ghalib", "… silk cravat & pocket square set") returns **only `.com` URLs** |

### Why this is a risk (SEO + ad data)

- **Authority split / duplicate content.** Two domains publish the same brand and near-identical
  product content with **no canonical or hreflang linking them**. Google has to pick a winner per
  query; today that winner is `.com`. `.co.uk` is starting from behind for its own brand terms.
- **`.com` is the incumbent.** It's fully indexable, has its own sitemap, and already ranks for the
  brand's most distinctive (zero-competition) product names. Every brand search that lands on `.com`
  is a UK sale leaking to a PKR store — and a brand-authority signal accruing to the wrong domain.
- **Ad-tracking fragmentation.** Pixels/conversions/audiences built on `.com` traffic don't help the
  `.co.uk` store, and remarketing pools are split across two cookie domains — wasted spend and broken
  attribution if both run ads.
- **No reciprocal signals.** Because `.com` carries no `canonical`/`hreflang` back to `.co.uk`, none of
  `.co.uk`'s now-correct self-canonicals can consolidate `.com`'s equity on their own. The fix has to
  be applied on the **`.com` side** too — that's this handoff.

---

## 2. What was already fixed in code (this repo, `.co.uk`)

No action needed from you here — listed so you know the `.co.uk` side is airtight:

- **Self-referencing canonicals** on every indexable template (home, products, collections, journal,
  info/legal pages) — all resolve to `https://threaditionz.co.uk/...` via `metadataBase`.
- **hreflang added**: `en-GB` (primary) + `x-default`, both → `.co.uk`, via a shared `seoAlternates()`
  helper (`lib/utils.ts`). Applied to all indexable pages; **noindex** pages (cart search, wishlist,
  account, out-of-stock products) are deliberately left canonical-only so they don't pollute the
  hreflang cluster.
- **Domain is single-sourced**: `baseUrl` (= `NEXT_PUBLIC_SITE_URL` = `https://threaditionz.co.uk`)
  drives the sitemap, robots (`host` + `Sitemap:`), Organization/WebSite/Product/Breadcrumb/Collection
  JSON-LD, OG URLs, the products feed, and `llms.txt`. No hardcoded `.com` references anywhere.
- **Locale signals**: `<html lang="en-GB">`, `og:locale=en_GB`, Organization `areaServed=GB`.

> ⚠️ One deploy prerequisite: make sure **`NEXT_PUBLIC_SITE_URL=https://threaditionz.co.uk` is set in
> the Vercel production environment** (it's in `.env.local` for dev). If it's missing in prod, canonicals
> fall back to the `*.vercel.app` URL and this work is undone.

---

## 3. Decision for the legacy `.com` — **DECIDED: Option A (301-redirect & consolidate)**

> **Decision (27 Jun 2026, owner):** Fold everything into a single global `.co.uk` brand. The `.com`
> Pakistan/PKR storefront is **not** being kept as a distinct market. **Execute Option A below.**
> Options B and C are retained only as rejected context.
>
> **No further code changes are required for this decision** — the `.co.uk` storefront's existing
> `en-GB` + `x-default` self-referencing hreflang is already correct for one global domain. The
> remaining work is all on the `.com` Shopify store, Search Console, and ad accounts (§3–§4).

### ✅ Option A — 301-redirect `.com` → `.co.uk` and consolidate to a single global domain

This is the most direct route to the goal ("`.co.uk` is THE storefront; stop the leakage; make
it unambiguously canonical"). A site-wide **301** from `.com` to the matching `.co.uk` page passes the
ranking equity and brand authority `.com` has accumulated to `.co.uk`, collapses the duplicate, and
unifies pixels/audiences on one cookie domain.

**Serving former PK/international customers:** with `.com` retired, handle non-UK buyers from `.co.uk`
via **Shopify Markets / multi-currency** on the UK store (your call, Shopify-admin level) — or accept
UK-only as in-scope. Either way the brand now lives on one domain.

**How (your steps, Shopify-admin level — no DNS changes needed for the redirect itself):**

1. In the **`.com` Shopify admin**, map `.com` URLs to their `.co.uk` equivalents and set **301
   redirects**. Note the URL shapes differ (`/products/<handle>` on `.com` vs `/product/<handle>` on
   `.co.uk`, `/collections/<handle>` vs `/search/<handle>`), so a blind 1:1 won't line up:
   - Redirect the **top 50–100 `.com` URLs** (home, best-selling products, main collections, blog
     posts) to the exact matching `.co.uk` page via **Online Store → Navigation → URL Redirects**
     (or a bulk-redirect app).
   - Redirect **everything else** to the closest `.co.uk` parent (e.g. any unmapped product →
     `/search/<nearest-collection>`; unknown → `.co.uk` home) rather than 404-ing.
   - Avoid redirect **chains** (`.com` → `.com` → `.co.uk`); point straight at the final `.co.uk` URL.
2. Keep the `.com` domain **registered and pointed at the redirect** for at least **12 months** so the
   301s keep flowing equity and no one re-registers the brand domain. _(If you later move the domain
   itself, that's a DNS/registrar action and explicitly outside this handoff — your call.)_
3. Once redirects are verified, see §4 for the Search Console "Change of Address" + consolidation.

**Trade-offs:** ✅ Strongest, simplest consolidation; one brand, one domain, one pixel; fastest path to
`.co.uk` owning the brand terms. ❌ You give up `.com` as a distinct PKR shopfront — the Pakistan market
must be served from `.co.uk` (Shopify Markets / multi-currency) or accepted as out-of-scope. ❌ A short
ranking wobble while Google processes the 301s (typically days–weeks).

---

### Rejected options (kept for the record — do not implement)

**Option B — Cross-domain canonical only (keep `.com` live, add `<link rel="canonical">` → `.co.uk`).**
Add canonical tags in the `.com` Shopify theme pointing each page at its `.co.uk` equivalent, without
redirecting. ❌ Weaker and riskier than a 301: canonicals are a _hint_ Google can ignore — and it often
does when the "canonical" target is a different domain with a different currency, different URL
structure, and imperfect page-to-page mapping. You also keep running/paying for a store you've told
Google to de-index. **Only worth it as a stop-gap** if you can't implement redirects immediately.

**Option C — Keep `.com` as a separate international market with reciprocal hreflang.**
Position `.co.uk` = `en-GB` and `.com` = the international/Pakistan market (`en-PK` or `en` + `x-default`
on the larger market), with **reciprocal `hreflang`** on **both** sides and **self-referencing
canonicals** on each (no cross-domain canonical). ✅ Preserves the live, already-ranking PKR business and
genuinely separates markets. ❌ Does **not** consolidate authority — by design both domains keep ranking,
which is the opposite of "make `.co.uk` unambiguously canonical." ❌ Requires real, ongoing market
separation (distinct currency/shipping/region targeting) and theme edits on `.com` to add the
reciprocal tags; the `.co.uk` side would then need its `seoAlternates()` extended to add the reciprocal
`en-PK`/`.com` entry (one-line change in `lib/utils.ts`, left out for now precisely because hreflang
must be reciprocal to be valid).

---

## 4. Search Console & ad-data consolidation (do alongside §3)

**Google Search Console**

1. Ensure **both** `threaditionz.co.uk` and `threaditionz.com` are verified as **Domain properties**.
2. After the site-wide 301 is live and verified, use GSC's **Change of Address** tool on the `.com`
   property to formally tell Google `.com` → `.co.uk`. (It requires both properties verified and the
   redirect in place.)
3. Submit/refresh sitemaps: confirm `https://threaditionz.co.uk/sitemap.xml` is submitted on the
   `.co.uk` property; on `.com`, leave its sitemap up _during_ migration so Google recrawls and sees the
   301s, then let it drop.
4. Watch **Pages → "Alternate page with proper canonical"** and "Duplicate" reports converge onto
   `.co.uk`, and brand-term queries (Performance report) shift from `.com` to `.co.uk` over 4–8 weeks.

**Bing / others:** repeat the verify-both + sitemap step in **Bing Webmaster Tools** (it has its own
Site Move tool).

**Ads & analytics (stop the data leak):**

- Point all live **Google Ads / Merchant Center / Meta** campaigns and product feeds at `.co.uk`; pause
  or repoint anything still sending paid traffic to `.com`.
- Consolidate the **Meta Pixel** (`.co.uk` already fires `NEXT_PUBLIC_FB_PIXEL_ID`) and GA4 onto
  `.co.uk`; rebuild remarketing audiences there. Don't keep spending to fill a `.com` pixel you're
  retiring.
- If `.com` had Merchant Center listings, remove/redirect them so you're not bidding two domains against
  each other for the same SKUs.

---

## 5. Acceptance checklist

- [x] `.co.uk` emits **self-referencing canonicals** on all indexable pages.
- [x] `.co.uk` emits **`en-GB` + `x-default` hreflang** (noindex pages excluded).
- [x] `.co.uk` uses its **own domain** in sitemap, robots, JSON-LD, OG, feed, `llms.txt` (single-sourced via `baseUrl`).
- [ ] **`NEXT_PUBLIC_SITE_URL` set in Vercel production** (verify after deploy).
- [x] **Option chosen** for `.com`: **A — 301 redirect & consolidate** (decided 27 Jun 2026).
- [ ] `.com` site-wide **301 redirects** to `.co.uk` implemented (Shopify admin — you).
- [ ] `.com` domain kept registered + pointed at the redirect ≥12 months.
- [ ] GSC: both properties verified; **Change of Address** filed; brand terms migrating to `.co.uk`.
- [ ] Ads/pixels/feeds consolidated on `.co.uk`.

_Prepared for the Threaditionz domain-consolidation task. Code changes are in this repo; everything in
§3–§4 is owner-actioned. No DNS, registrar, hosting, or Shopify-admin changes were made by me._
