# Threaditionz — Product Photography Style Guide (v1)

The one-page visual standard every shot must hit. Brand: "midnight & gold" —
premium, heritage, hand-finished menswear silk. Truth first: real prints, real
colours, real silk texture are never invented (see the plan's Truth Constraint).

## Lighting

- Single **soft key** (large softbox / north window) ~45° + subtle fill.
- One gentle gradient falloff so silk **sheen reads** across the surface.
- **No** hard speculars, no double shadows, no on-camera flatness.
- White balance **warm-neutral ~5000–5500K**; "gallery daylight" mood.

## Background surfaces (use 2–3 consistently — never plain white only)

1. **Warm stone / plaster** (matte cream-grey) — default for colourful silks.
2. **Dark walnut / midnight slate** — Luxe + heritage (Ajrak, calligraphy, damask,
   business-formal); flatters gold.
3. **Cream linen / paper** — clean flat-lay alt for macro/detail.

Keep the **same surface + same light direction within a collection** so the grid
reads as one set.

## Colour accuracy (truth)

- Neutralise white balance; the silk hue must match the product's **colour-collection**
  membership and its `custom_material` metafield.
- Use the swatch hex from `components/layout/navbar/menu-data.ts` as a guardrail
  (e.g. yellow-gold ≈ `#d4a437`, blue ≈ `#1f2a44`).
- Never push saturation/contrast to "improve" a colour.

## Per-product shot recipe (target set)

| #   | Shot                 | Ratio | Notes                                               |
| --- | -------------------- | ----- | --------------------------------------------------- |
| 1   | **Clean front**      | 1:1   | PDP primary; centred on brand surface; true colour  |
| 2   | **Macro detail**     | 1:1   | weave, hand-rolled edge, motif close-up             |
| 3   | **On-body**          | 4:5   | house model (Soul ID), real product composited in   |
| 4   | **Drape / movement** | 1:1   | silk falling over edge/hand — shows hand-feel       |
| 5   | **Packaging / gift** | 1:1   | box/ribbon; gift-set arrangement (esp. `gift-sets`) |

## Aspect ratios the site needs (confirmed in code)

- **1:1 square** — PDP gallery + every grid/carousel (the workhorse). _Required._
- **4:5 portrait** — mega-menu featured tiles + editorial.
- **16:9 / full-bleed** — homepage hero (`components/home/hero.tsx`) + collection banners.
- **9:16** — Instagram / TikTok stories & reels.

## Hard rules

- Heritage motifs (Ajrak, Mughal, calligraphy, Ghalib) are **never AI-drawn** — always
  the real captured pattern.
- Every preserve-mode asset is QA'd 100% against the real reference (colour drift, print
  fidelity, edge/weave) before it can ship.
- AI human imagery disclosed per policy; no implied real-person endorsement.
