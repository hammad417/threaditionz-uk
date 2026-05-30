# photo-upgrade — premium product photography pipeline

Isolated workspace for the Higgsfield photography upgrade. **Touches no app code** and
**generates no images** until you clear Phase 0 and approve a pilot. Full plan:
`~/.claude/plans/you-are-my-e-commerce-rosy-hamming.md`.

## What's here now (built + validated, read-only)

- `inventory.ts` — pulls every product (description, all 9 `custom` metafields, per-image
  `altText`) from the live Storefront API. Writes `audit/products.json` + `audit/inventory.csv`.
- `build-brief.ts` — turns each product image into a truthful Higgsfield brief using
  **every metafield except `faq`** + description + that image's alt text. Writes `briefs.jsonl`.
- `STYLE-GUIDE.md` — the one-page visual standard (Phase 2).
- `audit/`, `refs/`, `soul/`, `out/`, `approved/` — working folders.

## Run (no new dependencies — Node 20.6+ / `npx tsx`)

```bash
# 1. Audit the live catalogue (read-only)
npx tsx --env-file=.env.local photo-upgrade/inventory.ts

# 2. Build truthful per-image prompt briefs
PHOTO_SOUL_ID=<reference_id> npx tsx photo-upgrade/build-brief.ts   # soul id optional
```

## Phase 0 — before ANY generation (your actions)

- [ ] `higgsfield account status` → confirm auth + credit balance (`higgsfield auth login` if needed).
- [ ] Decide Shopify write-back: manual Admin UI (pilot) vs. scoped Admin API token (scale).
- [ ] Drop 8–15 clean real reference photos for the pilot category into `refs/`.
- [ ] Reconcile the **"Made in Pakistan" (metafield) vs "Hand-Finished in England" (brand copy)** discrepancy — the briefs use the real metafield value.

## Audit findings (from the first real run — 181 products, 518 images)

- **383 / 518 images have no alt text**; the rest are title-only. ⇒ all classify as
  front/macro and are `manual_flag: true`.
- **No on-body / drape / packaging imagery exists** — the premium recipe shots are net-new.
- Briefs faithfully carry real `custom_material`, dimensions, occasion, fold styles,
  made-in, and the product description; `faq` is excluded by design.
