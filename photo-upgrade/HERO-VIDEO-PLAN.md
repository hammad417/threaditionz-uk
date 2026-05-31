# Plan — Homepage Hero Background Video (Higgsfield)

## Context & objective
Replace the static homepage hero image with a **subtle, looping background video** behind
the existing "The Art of the Pocket Square" headline + CTAs. The video must match the
**same aesthetic as the product photoshoot** (diverse UK models · midnight-navy suiting ·
British overcast / Georgian London setting · real silk/Ajrak pocket square · "midnight &
gold" · cinematic editorial), **but with the full model face visible** (the on-body
product shots were cropped torso; the hero is a face-forward brand moment).

Current state: `components/home/hero.tsx` renders `public/hero/home-hero.jpg` full-bleed
behind a midnight scrim. This plan swaps that image layer for a `<video>` (poster = the
same JPG for instant paint + fallback).

> **Plan only — no generation until approved.** Current Higgsfield balance: ~1,001 credits.
> Video costs materially more per asset than the ~7-credit stills, so this is bounded
> (a few stills + a few short clips), pilot-first.

---

## 1. Creative direction (aesthetic match + full face)
- **Same visual language** as `STYLE-GUIDE.md` / the photoshoot: diverse British gentleman,
  midnight-navy three-piece suit, the navy-&-crimson Ajrak silk pocket square in the breast
  pocket, moody Georgian London interior with soft overcast window light, true colour,
  shallow depth, gentle film grain, gold accents.
- **Full face visible** — front or natural 3/4, eyes in shot; dignified, premium, calm.
- **Motion = subtle and loopable** (it sits *behind* headline text, so it must not distract):
  slow cinematic push-in / parallax, gentle fabric + light shimmer on the silk, a small
  natural model movement (breath, micro head turn, slow blink), drifting dust-in-light.
  **No** fast pans, no big gestures, no text.
- **Composition preserved**: subject offset to the **right**, darker negative space on the
  **left** for the headline — identical framing intent to the current hero, so text stays legible.

## 2. Higgsfield approach (skill + model)
- **Skill:** `higgsfield-generate` (video). *Not* `product-photoshoot` (image-only).
- **Method:** **image-to-video** — animate a chosen hero **still** so the exact scene,
  lighting, model and product are preserved and only *motion* is added. Most reliable and
  most on-brand (vs. text-to-video from scratch).
- **Model:** **`seedance_2_0`** (default; image-to-video; `aspect_ratio` 16:9/21:9,
  `resolution` 1080p, `duration` ~5–8s, `genre` drama/noir for cinematic mood).
  - Fallbacks: `cinematic_studio_video_v2` (highest fidelity, pricier) · `kling3_0` (cheaper).
- **Command shape:**
  `higgsfield generate create seedance_2_0 --start-image hero/hero_fullface.png --prompt "<subtle cinematic motion>" --aspect_ratio 16:9 --duration 6 --resolution 1080p --wait`
- **Truth constraint:** the hero is brand/banner art → fully-AI motion is allowed; the
  pocket square in the source still is the **real** product (we already do this for stills).

## 3. Source still (full face) — Phase A
The video is only as good as its first frame, so we make a **dedicated full-face hero still**:
- Generate 2–3 options via **`gpt_image_2`** (the reliable path we used for the current
  hero, which routes around the flaky product-photoshoot enhance service), 16:9, full face,
  Ajrak pocket square, dark-left composition. QA, pick the best → `hero/hero_fullface.png`.
- *(Alternative: reuse `public/hero/home-hero.jpg`, but its model looks away — a fresh
  face-forward still reads better as a video focal point. Recommend new.)*

## 4. Generation workflow — Phase B
1. **Stills:** generate 2–3 full-face hero stills (gpt_image_2, 16:9) → QA → pick one.
2. **Video:** image-to-video on the chosen still with `seedance_2_0`, **2–3 motion variants**
   (vary prompt/genre/duration). Each ~5–8s, 1080p, 16:9.
3. **QA each clip** (Phase 7) → pick the best single clip.
- Idempotent, retry-on-transient (same pattern as `generate.ts`); poll via `--wait`.

## 5. Web delivery (encode + loop)
- **Encode for web with `ffmpeg`** (already the standard; confirm installed):
  - **MP4 (H.264, yuv420p)** + **WebM (VP9 or AV1)** sources, **no audio track**.
  - Target **~2–5 MB**, 1080p (cap width ~1920), CRF-tuned.
  - **Seamless loop:** pick a clip that returns near its start, or add a short crossfade
    (`ffmpeg` reverse-append or xfade) so the loop doesn't jump.
- **Poster:** keep `public/hero/home-hero.jpg` (or the new still) as `poster` → instant
  first paint + the fallback image.
- Output: `public/hero/home-hero.mp4`, `public/hero/home-hero.webm`.

## 6. `hero.tsx` change (specifics)
- Replace the background `<Image>` with a full-bleed **`<video>`** layer (`-z-20`):
  `autoPlay muted loop playsInline preload="metadata" poster="/hero/home-hero.jpg" aria-hidden`,
  `<source>` mp4 + webm, `className="-z-20 h-full w-full object-cover object-center"`.
- **Keep** the midnight scrim + radial-gold overlays + **all text/CTAs unchanged**.
- **Accessibility/perf guards:**
  - `prefers-reduced-motion`: render only the poster image (no video) — small client guard
    or CSS, so motion-sensitive users + crawlers get the static hero.
  - **Mobile:** option to serve the **poster only** on small screens (data/battery); decide
    by final file size. iOS autoplays muted `playsInline` fine.
  - `bg-midnight` stays as the base so there's never a flash before poster/paint.

## 7. QA gate (approve before ship)
For the chosen clip, confirm: matches the brand stills · **full face visible & flattering**
· motion is subtle (doesn't fight the headline) · **no AI artifacts** (face/hands/fabric/
print warping) · loops without a jarring cut · headline + CTAs legible over it · file size
within budget · autoplays on **Safari/iOS** (muted + playsInline) and Chrome · reduced-motion
shows the poster.

## 8. Credits & phasing
- **Video is materially pricier than stills** — verify per-clip cost on the first job
  (`higgsfield account status` before/after). Bound the spend: ~2–3 stills (~7 ea) + ~2–3
  short clips. **Pilot first**: 1 still + 1 clip, wire behind the poster, QA on localhost,
  then finalize. Stop if a clip costs more than expected and reassess.

## 9. Handoff / go-live
- Pure front-end: commit `public/hero/home-hero.mp4` + `.webm` (+ poster) and the updated
  `hero.tsx`; push to `main` → ships on next deploy. **No Shopify involved.**
- **Rollback:** revert `hero.tsx` to the `<Image>` version (the poster JPG already lives in
  `public/hero/`), or just delete the `<video>` layer — instant, non-destructive.

## Verification
Run the dev server, load `localhost:3000`, confirm the hero autoplays + loops + text is
legible (screenshot / short screen recording); toggle OS "reduce motion" to confirm the
poster fallback; check on a mobile viewport.

## Open decisions (for you)
1. **Aspect:** 16:9 (matches current) or **21:9 ultra-wide** cinematic hero crop?
2. **Mobile:** video everywhere, or **static poster on mobile** to save data/battery?
3. **Source still:** new face-forward full-face render (recommended) or animate the existing
   `home-hero.jpg`?
4. **Model:** keep the diverse/random direction, or pick **one consistent hero face** for
   the brand moment?
5. **Length/feel:** ~6s calm loop (recommended) vs. longer/slower.

**Assumptions if you don't specify:** 16:9 · static poster on mobile · new full-face still ·
diverse (one strong individual) · ~6s subtle loop · `seedance_2_0` at 1080p.
