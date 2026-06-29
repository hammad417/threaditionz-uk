# Measurement & Paid/Shopping Readiness — Setup Checklist

Everything in this repo is wired and inert until you supply IDs. This checklist is the **dashboard
work only you can do** (account creation, domain verification, feed submission, pixel connection).
No real tracking IDs are committed — the storefront reads them from env vars and each tag loads only
when its ID is set **and** the visitor has accepted analytics cookies.

**Guardrail honoured:** I did not log into any ad/Merchant dashboard and committed no real IDs.

---

## What's already built (no action needed)

| Capability                 | Where                                            | Activated by env var                                                         |
| -------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------- |
| GA4 + Google Ads tag       | `components/analytics.tsx` + `lib/gtag.ts`       | `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GOOGLE_ADS_ID`                             |
| Meta Pixel + base PageView | `components/analytics.tsx` + `lib/meta-pixel.ts` | `NEXT_PUBLIC_FB_PIXEL_ID`                                                    |
| Unified ecommerce events   | `lib/analytics/ecommerce.ts`                     | fires to GA4 **and** Meta from one call                                      |
| Product feed (live)        | `app/feed/google.xml` → `lib/feed.ts`            | always on — `https://threaditionz.co.uk/feed/google.xml`                     |
| Product feed (snapshot)    | `launch/feed/google-merchant-feed.{tsv,xml}`     | 181 products, regenerate with `node launch/feed/generate-feed.mjs`           |
| Domain-verification tags   | `app/layout.tsx`                                 | `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_FB_DOMAIN_VERIFICATION` |

**Events fired client-side** (all consent-gated):

| Action          | GA4              | Meta               | Fires from                                  |
| --------------- | ---------------- | ------------------ | ------------------------------------------- |
| View a product  | `view_item`      | `ViewContent`      | `components/product/track-view-content.tsx` |
| Add to cart     | `add_to_cart`    | `AddToCart`        | `components/cart/add-to-cart.tsx`           |
| Buy-it-now      | `begin_checkout` | `InitiateCheckout` | `components/cart/buy-now.tsx`               |
| Cart → checkout | `begin_checkout` | `InitiateCheckout` | `components/cart/modal.tsx`                 |
| **Purchase**    | `purchase`       | `Purchase`         | **Shopify checkout — see §5 (headless)**    |

---

## 1. Google Analytics 4

- [ ] Create a GA4 property (Admin → Create property) for `threaditionz.co.uk`.
- [ ] Copy the **Measurement ID** (`G-XXXXXXXXXX`).
- [ ] Set `NEXT_PUBLIC_GA_ID` in Vercel (Production) and redeploy.
- [ ] Mark `purchase` as a key event/conversion. Enable **Enhanced measurement** if you want page/scroll.
- [ ] Verify in **Admin → DebugView** that `view_item` / `add_to_cart` / `begin_checkout` arrive (accept cookies on the site first).

## 2. Google Ads + Merchant Center (Shopping)

**Google Ads**

- [ ] Create the Google Ads account; note the conversion/remarketing tag id (`AW-XXXXXXXXXX`).
- [ ] Set `NEXT_PUBLIC_GOOGLE_ADS_ID` in Vercel (Production) and redeploy. (This adds Ads remarketing
      to the same gtag include.)
- [ ] Create a **Purchase** conversion action — import it from GA4 (recommended) or from Shopify (§5),
      so conversions are de-duplicated against the on-site `begin_checkout`.

**Merchant Center**

- [ ] Create a Merchant Center account for `threaditionz.co.uk`.
- [ ] **Verify & claim the domain** — easiest path: put your token in
      `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (Vercel) and redeploy → it emits the
      `<meta name="google-site-verification">` tag; then click Verify. (Or use the existing GSC
      verification / DNS TXT.)
- [ ] Add a product feed → **Scheduled fetch** → URL `https://threaditionz.co.uk/feed/google.xml`,
      country **United Kingdom**, currency **GBP**, language **en**. (Or upload
      `launch/feed/google-merchant-feed.tsv` for a one-off.)
- [ ] Set up **shipping** (free over £50; standard rate otherwise) and **UK VAT/tax** settings —
      these live in Merchant Center, not the feed.
- [ ] Clear feed diagnostics. Expected nuance: most items have **no GTIN** (handmade silk), so they
      ship with `brand` + `mpn` and `identifier_exists=no` where there's no SKU — valid for apparel.
- [ ] **Link Google Ads ↔ Merchant Center**, then build a Performance Max / Shopping campaign.

## 3. Meta (Facebook/Instagram) Pixel + Catalog

- [ ] Create a Meta Business account + a Pixel (Events Manager). Copy the **Pixel ID**.
- [ ] Set `NEXT_PUBLIC_FB_PIXEL_ID` in Vercel (Production) and redeploy.
- [ ] **Verify the domain** in Business Settings → Brand Safety → Domains: put the token in
      `NEXT_PUBLIC_FB_DOMAIN_VERIFICATION` (Vercel) and redeploy → emits the
      `<meta name="facebook-domain-verification">` tag; then Verify.
- [ ] Create a **Catalog** → data feed. Meta accepts the same RSS/XML — use
      `https://threaditionz.co.uk/feed/google.xml` (or upload the TSV). Connect the pixel to the catalog
      for dynamic/Advantage+ ads.
- [ ] Confirm events with the **Meta Pixel Helper** browser extension (ViewContent, AddToCart, InitiateCheckout).
- [ ] (Recommended) Add the **Conversions API** for server-side Purchase — via the Shopify Meta channel (§5).

## 4. Cookie consent (already enforced)

- [ ] Nothing to configure — all tags are gated behind the on-site consent banner
      (`components/cookie-consent.tsx`). Confirm `purchase`/checkout tags you add in Shopify (§5) also
      respect consent (Shopify Customer Privacy API / consent mode).

## 5. Purchase tracking (headless — must be done in Shopify)

This storefront is headless: checkout and the order-confirmation/thank-you page are hosted by
**Shopify** (`checkout.threaditionz.co.uk`), which this app never renders. So the `purchase` event
cannot fire from this codebase — wire it on the Shopify side, where the order data lives:

- [ ] **GA4 purchase:** connect the **Google & YouTube** Shopify channel (sends GA4 purchase +
      Merchant feed), _or_ add a **Custom Pixel** (Settings → Customer events) that calls
      `gtag('event','purchase', …)` with the same `G-…` ID.
- [ ] **Meta purchase + CAPI:** connect the **Facebook & Instagram** Shopify channel (or a Custom
      Pixel) for server-side `Purchase` with the same Pixel ID — set the **same** pixel so on-site
      `InitiateCheckout` and checkout `Purchase` belong to one funnel.
- [ ] **Google Ads conversion:** import the purchase conversion from GA4 (§2) so checkout purchases
      attribute to Shopping/PMax.
- [ ] Use a consistent `transaction_id` (Shopify order id) across GA4/Meta/Ads to de-duplicate.

> The repo already exports a `trackPurchase()` helper (`lib/analytics/ecommerce.ts`) for the day an
> on-site order-status page exists; until then, Shopify-side is the correct place.

---

## 6. Env vars to set in Vercel (Production) — none committed with real values

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=000000000000000
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=...        # optional, for Merchant/GSC verify
NEXT_PUBLIC_FB_DOMAIN_VERIFICATION=...          # optional, for Meta domain verify
NEXT_PUBLIC_SITE_URL=https://threaditionz.co.uk # required so feed/links are absolute & canonical
```

Redeploy after setting. Tags stay off until both the ID is present and the visitor accepts cookies.

## 7. Feed maintenance

- The live route reflects the catalogue automatically (cached ~1h). Resubmit/scheduled-fetch handles updates.
- To refresh the static snapshot: `node launch/feed/generate-feed.mjs` (reads `.env.local`; writes the `.tsv` + `.xml`).
- Feed field reference: see `lib/feed.ts` (mapping is the source of truth).

---

### Acceptance status

- [x] Consent-aware tag layer with **env placeholders** (GA4, Google Ads, Meta) — no real IDs committed.
- [x] Standard ecommerce events `view_item` / `add_to_cart` / `begin_checkout` fire to GA4 + Meta;
      `purchase` helper present and documented for Shopify-side wiring.
- [x] Valid Google Merchant feed for **all 181 SKUs** — live route + saved snapshot (well-formed XML, GBP, categorised).
- [x] This checklist.
