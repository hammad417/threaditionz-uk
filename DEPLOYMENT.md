# Deployment Runbook — Threaditionz Storefront

Next.js 15 (App Router) + Shopify Storefront API. Recommended host: **Vercel**.
The repo root **is** the Next app, so no subdirectory configuration is needed.

---

## 1. Connect the repo to Vercel
1. vercel.com → **Add New → Project** → import `hammad417/threaditionz-uk`.
2. Framework preset: **Next.js** (auto-detected). Root Directory: **`./`** (default).
3. Don't deploy yet — add environment variables first.

## 2. Environment variables
In **Project → Settings → Environment Variables**, add the keys from
[`.env.example`](./.env.example) for **Production** (and Preview):

| Key | Notes |
|---|---|
| `SHOPIFY_STORE_DOMAIN` | `your-store.myshopify.com` |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Storefront API token |
| `SHOPIFY_ADMIN_ACCESS_TOKEN` | Admin API token (server-only) |
| `SHOPIFY_REVALIDATION_SECRET` | any long random string |
| `NEXT_PUBLIC_SITE_URL` | **final domain** `https://threaditionz.co.uk` |
| `SITE_NAME`, `COMPANY_NAME` | `Threaditionz` |
| `NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD` | `50` |
| `NEXT_PUBLIC_GA_ID` / `_FB_PIXEL_ID` / `_CLARITY_ID` | optional analytics |

`NEXT_PUBLIC_*` values are exposed to the browser — keep secrets (Shopify tokens) **without** that prefix (already the case).

## 3. Custom domain
1. Vercel → **Settings → Domains** → add `threaditionz.co.uk` (+ `www`).
2. Update DNS at your registrar as Vercel instructs (A / CNAME).
3. Confirm `NEXT_PUBLIC_SITE_URL` matches the live domain, then **redeploy**
   (canonicals, `sitemap.xml`, OG and JSON-LD all read from it).

## 4. Cache revalidation webhook (keep the site fresh)
Product/collection edits in Shopify won't appear until the cache is purged.
In **Shopify admin → Settings → Notifications → Webhooks**, create webhooks to:

```
https://threaditionz.co.uk/api/revalidate?secret=<SHOPIFY_REVALIDATION_SECRET>
```

Topics: `products/create`, `products/update`, `products/delete`,
`collections/create`, `collections/update`, `collections/delete`.
(The route reads the `x-shopify-topic` header Shopify sends automatically.)

## 5. Checkout & store settings (in Shopify admin — not code)
Checkout is already wired: the cart redirects to Shopify's hosted checkout via
the Storefront API `checkoutUrl`. Make sure in admin:
- **Payments** — activate Shopify Payments / a provider (otherwise test mode).
- **Shipping & delivery** — zones/rates (free-over-£50 UK rule already exists;
  re-check the pre-existing "Standard £0.00" UK rate).
- **Taxes** — UK VAT.
- **Checkout** — branding, customer accounts, abandoned-cart emails.
- **Domains** — set the store's primary/checkout domain for brand-consistent
  checkout URLs.

## 6. Post-launch
- Place one real test order → confirm it appears under the customer's `/account`.
- Submit `sitemap.xml` in Google Search Console; request indexing.
- Keep **classic customer accounts** enabled (the `/account` system depends on it).

---

## Notes baked into this repo
- **`vercel.json`** pins serverless functions to **London (`lhr1`)** for lower
  latency on cart/checkout/account actions for UK shoppers.
- **Image cost:** `next.config.ts` uses a custom loader
  (`lib/shopify-image-loader.ts`) so product images are resized by **Shopify's
  CDN (free)** rather than Vercel's metered image optimizer. Local `/public`
  assets pass through untouched.
- **Hosting tier:** Vercel's free *Hobby* tier is **not** licensed for
  commercial use — deploy on **Pro** ($20/mo).
