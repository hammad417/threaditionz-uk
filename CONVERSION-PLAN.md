# Conversion & Sales Plan — Threaditionz

Prioritised CRO roadmap. ✅ done · 🔧 in-repo (code) · ☁️ Shopify app / external.

## Shipped in this pass ✅
- **Analytics scaffold** (`components/analytics.tsx`) — GA4 + Meta Pixel + Microsoft
  Clarity, each loads only when its `NEXT_PUBLIC_*` ID is set. *Add a cookie-consent banner for UK/EU.*
- **Free-shipping progress bar** in the side cart (`NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD`).
- **"Buy It Now" express** button → straight to Shopify checkout (Shop Pay / Apple Pay / Google Pay wallets).
- **Sticky mobile add-to-cart bar** on the PDP.
- **Trust badges** in the buy box (silk / shipping / free returns / secure checkout).

## Next, by impact
1. 🔴 ☁️ **Reviews app** (Loox / Judge.me) — biggest trust + CTR lever; then 🔧 wire `aggregateRating` into Product schema (star ratings in Google/Shopping).
2. 🟠 **AOV**: 🔧 cart cross-sell ("add a matching pocket square"), surface **Complete the Look** in the cart; ☁️ **bundle & save** (any 3 pocket squares), **gift wrapping / gift message** at cart.
3. 🟠 ☁️ **Klaviyo** — email/SMS popup with first-order discount + **abandoned-cart**, browse-abandonment, back-in-stock, post-purchase flows.
4. 🟠 **Discovery**: ☁️ Shopify **Search & Discovery** app (typo tolerance, synonyms ascot↔cravat, **filters/facets** by colour/pattern/occasion).
5. 🟡 **Urgency**: 🔧 low-stock indicators ("Only 3 left"), limited-edition framing for Luxe / L'Atelier, occasion countdowns (wedding/Eid).
6. 🟡 **Accounts & wishlist**: ☁️ enable Shopify customer accounts (fixes `/account`); 🔧 wishlist + recently-viewed (gift shoppers save/compare).
7. 🟢 **Cart polish**: the side cart still uses the default blue/neutral theme — reskin to midnight & gold.

## Activation (your side)
Set the analytics IDs + `NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD` in Vercel env, and create a
matching **free-shipping rule in Shopify** so the bar is truthful. Connect a reviews app and Klaviyo.
