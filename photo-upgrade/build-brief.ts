/**
 * photo-upgrade/build-brief.ts — Phase 5 of the photography-upgrade plan.
 *
 * Turns each product image into a TRUTHFUL Higgsfield product-photoshoot brief, built
 * programmatically from live Shopify data (audit/products.json). Every metafield EXCEPT
 * `faq` is used, plus the plain product `description` and THIS image's `altText`.
 *
 * Reuses the canonical parsers from lib/shopify/metafields.ts (no logic duplicated).
 * Emits one JSON record per (product × image) into photo-upgrade/briefs.jsonl:
 *   { handle, image_url, alt, shot_type, mode, ratio, soul_id?, brief_text, manual_flag }
 *
 * Run (after inventory.ts):
 *   npx tsx --env-file=.env.local photo-upgrade/build-brief.ts
 *   # optional: PHOTO_SOUL_ID=<reference_id> to stamp on-body briefs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  parseCareInstructions,
  parseHandleList,
  parseJsonStringList,
  prettifyHandle,
} from "../lib/shopify/metafields";

type ProductImage = {
  url: string;
  altText: string | null;
  width: number;
  height: number;
  position: number;
  featured: boolean;
};
type ProductRecord = {
  handle: string;
  title: string;
  description: string;
  tags: string[];
  collections: string[];
  metafields: Record<string, string>;
  images: ProductImage[];
};

type ShotType = "front" | "macro" | "onbody" | "drape" | "packaging";

// Shot type → Higgsfield mode + target aspect ratio (mirrors the Phase 5 routing table).
const SHOT_CONFIG: Record<
  ShotType,
  { mode: string; ratio: string; needsModel?: boolean }
> = {
  front: { mode: "restyle", ratio: "1:1" },
  macro: { mode: "restyle", ratio: "1:1" },
  onbody: { mode: "virtual_model_tryout", ratio: "4:5", needsModel: true },
  drape: { mode: "lifestyle_scene", ratio: "1:1" },
  packaging: { mode: "product_shot", ratio: "1:1" },
};

// Collections that get the dark walnut / midnight-slate surface (Luxe & heritage).
const DARK_SURFACE_COLLECTIONS = new Set([
  "luxe-collection",
  "heritage-ajrak-silk-accessories",
  "calligraphy-art-silk-accessories",
  "damask-brocade-silk-accessories",
  "business-formal-silk-accessories",
]);

const PRESERVE_CLAUSE =
  "PRESERVE the real print, colour, weave and hand-rolled edge exactly — never invent, " +
  "redraw or recolour the pattern.";

/** Infer the shot type from an image's alt text; fall back to position when alt is empty. */
function classifyShot(
  alt: string | null,
  position: number,
): { type: ShotType; manual: boolean } {
  const a = (alt ?? "").toLowerCase();
  if (!a.trim())
    return { type: position <= 1 ? "front" : "macro", manual: true };
  if (/\b(box|gift|packag|ribbon|gift set|boxed)\b/.test(a))
    return { type: "packaging", manual: false };
  if (
    /\b(model|worn|wearing|on body|on-body|styled|suit|neck|tied|lapel)\b/.test(
      a,
    )
  )
    return { type: "onbody", manual: false };
  if (/\b(drap|fold|hanging|flow|movement|cascad)\b/.test(a))
    return { type: "drape", manual: false };
  if (/\b(close|detail|macro|edge|weave|texture|stitch|knot)\b/.test(a))
    return { type: "macro", manual: false };
  return { type: position <= 1 ? "front" : "macro", manual: false };
}

function firstSentence(text: string, max = 180): string {
  const clean = (text ?? "")
    .replace(/\s+/g, " ")
    .replace(/([.!?])([A-Z])/g, "$1 $2") // fix missing space after sentence end in source copy
    .trim();
  if (!clean) return "";
  const cut = clean.split(/(?<=[.!?])\s/)[0]!;
  return cut.length > max ? cut.slice(0, max).trim() : cut;
}

function surfaceFor(collections: string[], type: ShotType): string {
  if (type === "macro") return "cream linen / paper";
  return collections.some((c) => DARK_SURFACE_COLLECTIONS.has(c))
    ? "dark walnut / midnight-slate"
    : "warm stone / plaster";
}

function buildBriefText(
  p: ProductRecord,
  img: ProductImage,
  type: ShotType,
): string {
  const mf = p.metafields;
  const subject = prettifyHandle(p.title || p.handle);
  const material = mf.custom_material?.trim();
  const dims = [mf.custom_size, mf.custom_dimensions]
    .filter(Boolean)
    .join(", ")
    .trim();
  const madeIn = mf.custom_made_in?.trim();
  const occasion = (mf.for_occasion ?? "").split(/\r?\n/)[0]?.trim();
  const folds = parseJsonStringList(mf.custom_fold_styles);
  const pairWith = parseHandleList(mf.custom_pair_with).map(prettifyHandle);
  const careDelicate = parseCareInstructions(mf.custom_care_instructions).length
    ? "fine, delicate hand-finished silk"
    : "";
  const surface = surfaceFor(p.collections, type);
  const alt = (img.altText ?? "").replace(/\s+/g, " ").trim();

  // Subject line varies by shot type; all slots are truthful, sourced from product data.
  const parts: string[] = [];
  const fabric = [material, careDelicate].filter(Boolean).join(", ");

  switch (type) {
    case "front":
      parts.push(`Clean catalogue front of ${subject}`);
      if (fabric) parts.push(`(${fabric})`);
      if (dims) parts.push(`shown true to scale (${dims})`);
      parts.push(`centred on a ${surface} surface`);
      break;
    case "macro":
      parts.push(`Macro detail of ${subject}`);
      if (fabric) parts.push(`— ${fabric} —`);
      parts.push(`showing weave, sheen and hand-rolled edge, on ${surface}`);
      break;
    case "onbody":
      parts.push(`On-body editorial of ${subject}`);
      if (fabric) parts.push(`(${fabric})`);
      if (folds.length) parts.push(`presented in a ${folds[0]} fold`);
      parts.push(
        `worn by the house model, cropped torso, midnight-navy tailoring`,
      );
      if (occasion) parts.push(`styled for ${occasion.toLowerCase()}`);
      parts.push(`${surface} backdrop`);
      break;
    case "drape":
      parts.push(`${subject} draped to show silk hand-feel and movement`);
      if (fabric) parts.push(`(${fabric})`);
      parts.push(`over an edge, on ${surface}`);
      break;
    case "packaging":
      parts.push(`Gift presentation of ${subject}`);
      if (pairWith.length)
        parts.push(`arranged with ${pairWith.slice(0, 2).join(" and ")}`);
      parts.push(`in branded packaging on ${surface}`);
      break;
  }

  if (madeIn) parts.push(`heritage tone: ${madeIn}`);
  if (alt) parts.push(`Match the real subject in the supplied image: "${alt}"`);

  const narrative = firstSentence(p.description);
  if (narrative) parts.push(narrative);

  parts.push(
    "Soft directional key ~5200K with gentle falloff, premium menswear editorial",
  );
  parts.push(PRESERVE_CLAUSE);

  // Join slots into clean prose: trim each, drop trailing punctuation/ellipsis, single-space.
  return (
    parts
      .map((s) => s.trim().replace(/[.\s…]+$/, ""))
      .filter(Boolean)
      .join(". ")
      .replace(/\s+/g, " ") + "."
  );
}

function main() {
  const productsPath = join(import.meta.dirname, "audit", "products.json");
  let products: ProductRecord[];
  try {
    products = JSON.parse(readFileSync(productsPath, "utf8"));
  } catch {
    console.error(`Cannot read ${productsPath}. Run inventory.ts first.`);
    process.exit(1);
  }

  const soulId = process.env.PHOTO_SOUL_ID || null;
  const records: string[] = [];
  let manualCount = 0;

  for (const p of products) {
    for (const img of p.images) {
      const { type, manual } = classifyShot(img.altText, img.position);
      if (manual) manualCount++;
      const cfg = SHOT_CONFIG[type];
      records.push(
        JSON.stringify({
          handle: p.handle,
          image_url: img.url,
          alt: img.altText ?? "",
          shot_type: type,
          mode: cfg.mode,
          ratio: cfg.ratio,
          ...(cfg.needsModel ? { soul_id: soulId ?? "<SOUL_ID>" } : {}),
          brief_text: buildBriefText(p, img, type),
          manual_flag: manual,
        }),
      );
    }
  }

  const out = join(import.meta.dirname, "briefs.jsonl");
  writeFileSync(out, records.join("\n") + "\n");
  console.log(
    `Wrote briefs.jsonl — ${records.length} briefs across ${products.length} products ` +
      `(${manualCount} flagged for manual mode review${soulId ? "" : "; no PHOTO_SOUL_ID set"}).`,
  );
}

main();
