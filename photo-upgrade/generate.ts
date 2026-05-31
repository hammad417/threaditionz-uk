/**
 * photo-upgrade/generate.ts — generates the MISSING premium shots the catalogue lacks
 * (on-body / drape / packaging) from the real product image via Higgsfield.
 *
 * Truth model: the real product photo is passed as --image and the product_context is
 * built ONLY from real Shopify metafields, so colour/print/material are described, never
 * invented. gpt_image_2 re-renders through the scene, so these are PREMIUM LIFESTYLE /
 * SECONDARY shots — the exact-print PDP primary + macro stay as the real (relit) photo.
 *
 * Idempotent: skips a shot if its output PNG already exists. Records every asset in
 * out/manifest.json with status. Run in the background (each image ~1-2 min, ~7 credits):
 *   npx tsx --env-file=.env.local photo-upgrade/generate.ts the-solid-... imperial-ajrak-...
 *   (no args → uses the built-in PILOT list)
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = import.meta.dirname;
const PILOT = [
  "the-solid-antique-gold-silk-pocket-square",
  "imperial-ajrak-silk-cravat",
  "floral-indigo-silk-cravat",
];

type ProductImage = { url: string; featured: boolean };
type ProductRecord = {
  handle: string;
  title: string;
  collections: string[];
  metafields: Record<string, string>;
  images: ProductImage[];
};

// Which net-new shots to produce + their mode/ratio (allowed ratios: 1:1,4:3,3:4,16:9,9:16,3:2,2:3).
// Filter with the SHOTS env var, e.g. SHOTS=onbody for Option C (one on-body per product).
const ALL_SHOTS = [
  { type: "onbody", mode: "virtual_model_tryout", ratio: "3:4" },
  { type: "drape", mode: "lifestyle_scene", ratio: "1:1" },
] as const;
const SHOT_FILTER = process.env.SHOTS?.split(",").map((s) => s.trim());
const SHOTS = SHOT_FILTER
  ? ALL_SHOTS.filter((s) => SHOT_FILTER.includes(s.type))
  : ALL_SHOTS;

function category(
  p: ProductRecord,
): "cravat" | "gift set" | "scarf" | "pocket square" | "silk accessory" {
  const coll = p.collections.join(" ").toLowerCase();
  const h = (p.handle + " " + p.title).toLowerCase();
  // Order matters: gift-set + scarf are checked before pocket because the set/scarf
  // handles also contain "pocket-square" but should NOT be treated as pocket squares.
  if (coll.includes("cravat") || h.includes("cravat")) return "cravat";
  if (coll.includes("gift-set")) return "gift set";
  if (coll.includes("scarv") || h.includes("scarf")) return "scarf";
  if (coll.includes("pocket-square") || h.includes("pocket"))
    return "pocket square";
  return "silk accessory";
}

function printNote(p: ProductRecord): string {
  const tags = (p.handle + " " + p.collections.join(" ")).toLowerCase();
  if (tags.includes("ajrak"))
    return "bold navy & red Ajrak heritage block-print";
  if (tags.includes("calligraphy")) return "calligraphy / heritage art print";
  if (tags.includes("damask") || tags.includes("brocade"))
    return "damask/brocade motif";
  if (tags.includes("floral")) return "floral print";
  if (tags.includes("paisley")) return "paisley print";
  if (tags.includes("polka")) return "polka-dot pattern";
  if (tags.includes("solid")) return "solid colour";
  return "its real printed pattern";
}

function productContext(p: ProductRecord): string {
  const mat = p.metafields.custom_material?.trim() || "100% silk";
  return (
    `${mat} ${category(p)} — ${printNote(p)}. ` +
    "Preserve the real print, colour, weave and hand-rolled edge exactly — never redraw, recolour or reinterpret the pattern."
  );
}

// Diverse UK-based male models — representative of Britain's ethnic mix. One is
// picked per product (deterministically by handle, so re-runs are stable).
const UK_MODELS = [
  "British white male model, fair complexion, classic English features",
  "Black British male model, dark skin, short cropped hair",
  "British South Asian male model, brown skin, neat dark hair",
  "British East Asian male model, light-medium complexion, short dark hair",
  "mixed-race British male model, medium-brown complexion",
  "British Middle-Eastern male model, olive complexion, short neat beard",
];

// British weather / settings — soft overcast UK conditions instead of a warm studio.
const UK_SETTINGS = [
  "soft overcast British daylight, cool diffused grey sky, weathered London stone wall behind",
  "misty British morning, muted cool light, Georgian townhouse facade backdrop",
  "drizzly London street, wet-pavement sheen, soft diffused overcast light",
  "autumnal English park, soft grey daylight, bare-branch bokeh behind",
  "moody overcast English courtyard, cool soft daylight, pale stone backdrop",
];

// Stable per-product pick (avoids Math.random so resumed runs stay consistent).
function pick<T>(handle: string, arr: T[], salt: number): T {
  let h = salt;
  for (const c of handle) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return arr[h % arr.length]!;
}

function intentPrompt(p: ProductRecord, type: string): string {
  const cat = category(p);
  const model = pick(p.handle, UK_MODELS, 1);
  const setting = pick(p.handle, UK_SETTINGS, 99);
  const base = `${setting}; soft overcast British daylight ~6200K; premium menswear catalogue editorial`;
  if (type === "onbody") {
    if (cat === "pocket square")
      return `On-body editorial: ${model}, a folded silk pocket square in the breast pocket of his midnight-navy suit jacket, cropped torso. ${base}`;
    if (cat === "scarf")
      return `On-body editorial: ${model}, wearing the silk scarf draped around the neck over a midnight-navy overcoat, cropped torso. ${base}`;
    if (cat === "gift set")
      return `On-body editorial: ${model}, styled with the matching silk scarf around the neck and the pocket square in the breast pocket of a midnight-navy suit, cropped torso. ${base}`;
    return `On-body editorial: ${model}, in a midnight-navy suit wearing the ${cat} in a classic ascot knot, cropped torso. ${base}`;
  }
  // drape still-life (no model)
  const drapeBase =
    "soft overcast British daylight, cool diffused light, weathered stone surface, premium menswear catalogue product detail, true colour, sharp focus on the silk";
  if (cat === "gift set")
    return `Still-life flat-lay: the matching silk scarf and pocket square arranged together, the scarf softly draped beside the folded pocket square, both prints clearly visible, ${drapeBase}`;
  if (cat === "cravat")
    return `Still-life: the silk cravat draped in an elegant curve over a weathered stone edge, showing the print, silk sheen and hand-rolled edge, ${drapeBase}`;
  if (cat === "scarf")
    return `Still-life: the long silk scarf draped and gently flowing over a weathered stone edge with the fringe visible, showing the full print and silk movement, ${drapeBase}`;
  return `Still-life: the silk ${cat} draped over a weathered stone edge to show fluid hand-feel, sheen and movement, ${drapeBase}`;
}

function loadProducts(): Record<string, ProductRecord> {
  const arr: ProductRecord[] = JSON.parse(
    readFileSync(join(ROOT, "audit", "products.json"), "utf8"),
  );
  return Object.fromEntries(arr.map((p) => [p.handle, p]));
}

// Download ALL of a product's images (featured first), capped, as reference paths.
// More real views → the model reproduces the actual print/colour far more exactly.
const MAX_REFS = 5;
function ensureRefs(p: ProductRecord): string[] {
  const ordered = [...p.images].sort(
    (a, b) => Number(b.featured) - Number(a.featured),
  );
  const dir = join(ROOT, "refs", p.handle);
  mkdirSync(dir, { recursive: true });
  const paths: string[] = [];
  ordered.slice(0, MAX_REFS).forEach((img, i) => {
    const fp = join(dir, `${i}.jpg`);
    if (!existsSync(fp)) execFileSync("curl", ["-sS", "-o", fp, img.url]);
    paths.push(fp);
  });
  if (!paths.length) throw new Error(`No image for ${p.handle}`);
  return paths;
}

// Run one shot with all reference images; retry transient backend failures (NO URL / errors).
function runShot(
  refs: string[],
  shot: { type: string; mode: string; ratio: string },
  p: ProductRecord,
): string | null {
  const imageArgs = refs.flatMap((r) => ["--image", r]);
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const out = execFileSync(
        "higgsfield",
        [
          "product-photoshoot",
          "create",
          "--mode",
          shot.mode,
          "--aspect_ratio",
          shot.ratio,
          "--count",
          "1",
          "--json",
          ...imageArgs,
          "--product_context",
          productContext(p),
          "--prompt",
          intentPrompt(p, shot.type),
        ],
        { encoding: "utf8", timeout: 9 * 60_000, maxBuffer: 10 * 1024 * 1024 },
      );
      const url = (JSON.parse(out).urls ?? [])[0];
      if (url) return url;
    } catch {
      /* transient — fall through to retry */
    }
    if (attempt < 3)
      console.log(`  retry ${attempt + 1}/3 ${p.handle} ${shot.type}`);
  }
  return null;
}

type ManifestEntry = {
  handle: string;
  shot: string;
  ratio: string;
  file: string;
  status: "qa_pending" | "failed";
  ref_count: number;
};

function loadManifest(): ManifestEntry[] {
  const p = join(ROOT, "out", "manifest.json");
  return existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : [];
}
function saveManifest(m: ManifestEntry[]) {
  writeFileSync(join(ROOT, "out", "manifest.json"), JSON.stringify(m, null, 2));
}

function main() {
  const products = loadProducts();
  const args = process.argv.slice(2);
  const explicit = args.filter((a) => !a.startsWith("--"));
  const fromIdx = args.indexOf("--from");
  const fromFile = fromIdx >= 0 && args[fromIdx + 1] ? args[fromIdx + 1] : null;
  const handles = fromFile
    ? readFileSync(join(ROOT, fromFile), "utf8")
        .split(/\r?\n/)
        .map((s) => s.trim())
        .filter(Boolean)
    : args.includes("--all")
      ? Object.keys(products)
      : explicit.length
        ? explicit
        : PILOT;
  console.log(
    `Generating shots [${SHOTS.map((s) => s.type).join(", ")}] for ${handles.length} products...`,
  );
  const manifest = loadManifest();

  for (const handle of handles) {
    const p = products[handle];
    if (!p) {
      console.error(`! ${handle} not in products.json — skipping`);
      continue;
    }
    const refs = ensureRefs(p);
    const outDir = join(ROOT, "out", handle);
    mkdirSync(outDir, { recursive: true });

    for (const shot of SHOTS) {
      const outFile = join(
        outDir,
        `${handle}_${shot.type}_${shot.ratio.replace(":", "x")}.png`,
      );
      if (existsSync(outFile)) {
        console.log(`= skip ${handle} ${shot.type} (exists)`);
        continue;
      }
      console.log(
        `+ generate ${handle} ${shot.type} (${shot.ratio}, ${refs.length} refs)...`,
      );
      const url = runShot(refs, shot, p);
      if (!url) {
        console.error(`  FAILED ${handle} ${shot.type} (after retries)`);
        manifest.push({
          handle,
          shot: shot.type,
          ratio: shot.ratio,
          file: "",
          status: "failed",
          ref_count: refs.length,
        });
        saveManifest(manifest);
        continue;
      }
      execFileSync("curl", ["-sS", "-o", outFile, url]);
      console.log(`  saved ${outFile}`);
      manifest.push({
        handle,
        shot: shot.type,
        ratio: shot.ratio,
        file: outFile.replace(ROOT + "/", ""),
        status: "qa_pending",
        ref_count: refs.length,
      });
      saveManifest(manifest);
    }
  }
  console.log(`Done. ${manifest.length} manifest entries.`);
}

main();
