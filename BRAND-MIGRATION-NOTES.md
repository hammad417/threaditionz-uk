# Threaditionz — Brand Reskin Notes

This is `vercel/commerce` (Next.js 15 App Router, React 19, Tailwind v4, Shopify
Storefront API) reskinned to the Threaditionz "midnight & gold" aesthetic with a
custom mega menu. The template's data layer, routing, SSR, cart and checkout are
unchanged.

## Files changed / added

### Design tokens

- `app/globals.css` — **rewritten**. Brand theme via Tailwind v4 `@theme`
  (midnight/charcoal/gold/gold-light/burgundy/cream/warm-white, border,
  muted-foreground, primary=midnight, accent=gold, radius 0.25rem), HSL triplets
  on `:root`, base font wiring, and helpers `.eyebrow`, `.gold-divider`,
  `.text-gold-gradient`, `.tracked-label` (+ carousel/fadeIn keyframes).
- `app/layout.tsx` — Playfair Display + Lato via `next/font/google` exposed as
  `--font-playfair` / `--font-lato` (mapped to `--font-heading` / `--font-body`);
  `<html lang="en-GB">`; brand body classes.

### Header + mega menu (new)

- `components/layout/navbar/menu-data.ts` — **typed config** for all mega groups
  (Product / Colour / Pattern / Occasion), swatches, featured tiles, simple links.
  **Edit handles here.**
- `components/layout/navbar/mega-header.tsx` — sticky midnight header, desktop
  mega panels (hover + keyboard, 200 ms close intent, Escape, focus-out, arrow-key
  nav, `aria-haspopup`/`aria-expanded`). Panels are always in the DOM (hidden via
  CSS) so every link is in the server HTML.
- `components/layout/navbar/mobile-mega-menu.tsx` — hamburger drawer with
  collapsible accordions + simple links.
- `components/layout/navbar/index.tsx` — now just renders `<MegaHeader/>`.
- `components/brand-wordmark.tsx` — gold "T" + "HREADITIONZ" logo (new).
- `components/cart/open-cart.tsx` — restyled trigger (cream bag icon, gold badge).
- Old `navbar/search.tsx` and `navbar/mobile-menu.tsx` are no longer imported
  (left in place, unused — safe to delete).

### Footer

- `components/layout/footer.tsx` — midnight footer, brand block + social squares,
  Shop / Help / Company columns, bottom bar. Still renders the Shopify
  `next-js-frontend-footer-menu` if present.

### Product page

- `lib/shopify/types.ts` — added `Metafield` type + `metafields` on product.
- `lib/shopify/queries/product.ts` — single-product query now requests
  `metafields(identifiers: [...])` for namespace `custom`
  (material, size, dimensions, made_in, care_instructions, fold_styles,
  pair_with, faq). Kept out of the shared fragment so list queries stay light.
- `lib/shopify/metafields.ts` (new) — parsers (map, care lines, JSON lists,
  handle lists, FAQ → Q/A pairs, handle prettifier).
- `components/product/product-details.tsx` (new) — Details grid, Care bullets,
  Recommended Fold Styles, "Complete the Look" links, FAQ `<details>` accordion.
- `components/product/product-description.tsx` — Playfair title + gold price.
- `components/cart/add-to-cart.tsx`, `components/product/variant-selector.tsx` —
  square midnight/gold buttons.
- `app/product/[handle]/page.tsx` — brand layout + breadcrumb trail;
  keeps **Product** JSON-LD, adds **BreadcrumbList** and **FAQPage** JSON-LD.

### Collection grid + homepage

- `components/grid/tile.tsx`, `components/label.tsx` — brand card (square,
  object-cover, scale-105 hover zoom duration-700, Playfair title, gold price).
- `app/search/[collection]/page.tsx` — branded collection header (eyebrow +
  Playfair title + gold divider + description); filtering/sorting/SSR untouched.
- `app/page.tsx` — Hero → Featured Collection (`ThreeItemGrid`) → New This Season
  (`Carousel`) → editorial bands → Footer. Data-driven grid/carousel preserved.
- `components/home/hero.tsx`, `components/home/editorial.tsx` (new).

### Resilience (small, pattern-consistent)

- `lib/shopify/index.ts` — added the existing "Shopify not configured" guard to
  `getCollection` and `getProducts` (the only two functions missing it) so the app
  renders cleanly before credentials are set. No behavioural change once configured.

## Live verification (creds connected — store `threaditionz-uk`)

Connected with the real Storefront token and tested end-to-end:

- ✅ Token authenticates; **all 34** mega-menu / footer collection handles
  resolve against the live store (0 missing).
- ✅ `/search/pocket-squares` renders **64 real products** server-side.
- ✅ `/product/the-solid-navy-blue-silk-pocket-square` renders live title/price
  - **FAQ accordion** + **FAQPage / BreadcrumbList / Product** JSON-LD.

Store setup done / outstanding:

1. ✅ **Hidden homepage collections — CREATED.** I created
   `hidden-homepage-featured-items` (3 products) and `hidden-homepage-carousel`
   (10 products) via the Admin API, populated them with real silk pocket squares,
   and published both to the **"storefront"** publication (the sales channel your
   Storefront token reads — REST `published:true` alone was NOT enough; they had
   to be added to that publication via `publishablePublish`). Homepage Featured
   grid + carousel now render. Re-curate membership anytime in Shopify admin.

2. ✅ **Product metafields — populated & key mismatch fixed.** Two problems found
   and resolved:
   - The store's real keys are **not** what the spec implied. The Storefront-enabled
     definitions are: `custom_material, custom_size, custom_dimensions,
custom_made_in, custom_care_instructions, for_occasion, faq,
**custom_pair_with**, **custom_fold_styles**` (note the doubled prefixes).
     The product query + `product-details.tsx` now use these exact keys, and a new
     **"Ideal Occasions"** section renders `custom.for_occasion`.
   - `custom_fold_styles` / `custom_pair_with` (both **json**-typed) were empty —
     the original `push_to_shopify.py` had written those values to the _un-doubled_
     keys (`custom.fold_styles` / `custom.pair_with`), which have no
     Storefront-readable definition. I pushed both to the correct doubled json keys
     for **all 181 active products** (`product_import_files/push_fold_pair.py`,
     352 metafields set, 0 errors). All six product sections now render live.
   - `faq` is Shopify **rich-text** (bold paragraph = question, next paragraph =
     answer); the parser handles that shape as well as a JSON `[{question,answer}]`.
   - ✅ Orphan cleanup DONE: the old un-doubled `custom.fold_styles` /
     `custom.pair_with` metafields were deleted from all 181 products
     (`finalize_content.py`, 352 deleted, 0 errors).
   - ✅ Descriptions verified: all 181 `body_html` values are already live in the
     store (normalized comparison — the only delta was Shopify folding `&nbsp;`
     to spaces, so no re-push was needed; 0 genuinely different, 0 empty).

## What YOU still need to set in Shopify / env

1. **Credentials** — `.env.local` is filled in with the live domain + Storefront
   token. (`SHOPIFY_REVALIDATION_SECRET` left blank — only needed for the webhook
   revalidate route; set it + configure the Shopify webhook when you want
   edit-triggered cache busting.)
   ⚠️ The Storefront token is now stored in plaintext in `.env.local` **and** was
   pasted into our chat — consider rotating it. It's a Storefront (not Admin)
   token so the blast radius is small, but rotation is good hygiene.

2. **Collection handles** — all current ones resolve. If you rename a collection,
   update the handle in `menu-data.ts` / `footer.tsx` / `hero.tsx`. Also create the
   two hidden homepage collections (see Live verification #1).

3. **Product metafields** — already populated for the 181 active products (see Live
   verification #2). The content source lives in `../product_import_files/`
   (`threaditionz_active_content.json` + push scripts) if you re-import or extend.
   The app reads these exact Storefront-enabled `custom.*` keys:
   `custom_material, custom_size, custom_dimensions, custom_made_in,
custom_care_instructions, for_occasion, faq, custom_pair_with (json),
custom_fold_styles (json)`. If you add products, populate the same keys (and run
   `push_fold_pair.py` for the two json ones).

4. **Footer pages** — create Shopify pages for the Help/Company/legal links, or
   edit the hrefs in `footer.tsx`: `shipping-returns, size-guide, contact, faqs,
our-story, sustainability, privacy-policy, terms-conditions`.

5. **Account link** — the header "account" icon points to `/account`, which has no
   route in this template. Wire it to Shopify customer accounts (new customer
   accounts URL) or remove the icon in `mega-header.tsx`.

6. _(Optional)_ The mega menu is hardcoded (per spec). To drive it from the
   Shopify "Next.js Frontend Header Menu" instead, replace `menu-data.ts`
   consumption with `getMenu(...)` nested items.

## Verified

- `pnpm dev` runs (Turbopack, http://localhost:3000).
- `tsc --noEmit` passes.
- View-source of `/` is full server-rendered HTML (~120 KB, not an empty root):
  `<html lang="en-GB">`, the gold wordmark, every mega-menu/footer link as a real
  `<a href="/search/…">`, hero, editorial and footer all present.
- `/search`, `/search/<handle>` return 200 with the brand nav + footer in the HTML
  (collection bodies populate once Shopify credentials are set).
