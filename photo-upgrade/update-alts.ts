/**
 * photo-upgrade/update-alts.ts — backfill descriptive, SEO/a11y-friendly alt text on
 * ALL product media via the Shopify Admin API (fileUpdate). Fixes the placeholder
 * "AI on-body/drape (Threaditionz)" alts and fills empty alts on real product images.
 *
 * Idempotent: only writes when the computed alt differs from the current one.
 * Run: npx tsx --env-file=.env.local photo-upgrade/update-alts.ts [--dry] [--limit N]
 */
const DOMAIN = (process.env.SHOPIFY_STORE_DOMAIN || "").startsWith("https://")
  ? process.env.SHOPIFY_STORE_DOMAIN!
  : `https://${process.env.SHOPIFY_STORE_DOMAIN}`;
const TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!;
const ENDPOINT = `${DOMAIN}/admin/api/2024-10/graphql.json`;

async function gql(query: string, variables?: any): Promise<any> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  const body = await res.json();
  if (body.errors) throw new Error(JSON.stringify(body.errors));
  return body.data;
}

// "IMPERIAL AJRAK SILK CRAVAT" -> "Imperial Ajrak Silk Cravat"
function titleCase(s: string): string {
  return s
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bUk\b/g, "UK")
    .replace(/\b(\d+)point\b/gi, "$1-Point")
    .trim();
}

function category(handle: string, title: string): string {
  const h = (handle + " " + title).toLowerCase();
  if (h.includes("cravat")) return "cravat";
  if (h.includes("scarf")) return "scarf";
  if (h.includes("gift") || /set\b/.test(h)) return "gift set";
  if (h.includes("pocket")) return "pocket square";
  return "accessory";
}

// Compute a descriptive alt; returns null to leave a good existing alt untouched.
function altFor(
  title: string,
  handle: string,
  currentAlt: string | null,
  position: number,
): string | null {
  const t = titleCase(title);
  const cat = category(handle, title);
  const alt = currentAlt ?? "";

  let next: string;
  if (/AI on-body/i.test(alt)) {
    next =
      cat === "pocket square"
        ? `${t} folded in a suit breast pocket — men's silk pocket square`
        : `${t} worn by a model — men's ${cat}`;
  } else if (/AI drape/i.test(alt)) {
    next = `${t} — 100% silk ${cat}, draped detail`;
  } else if (
    !alt.trim() ||
    alt === title ||
    / - \d/.test(alt) || // the "{title} - {filename}" fallback
    /\.(jpg|jpeg|png|webp)/i.test(alt)
  ) {
    next =
      position === 0
        ? `${t} — men's 100% silk ${cat}`
        : `${t} — men's silk ${cat}, view ${position + 1}`;
  } else {
    return null; // already a real, human-written alt — leave it
  }
  return next === alt ? null : next;
}

async function main() {
  const dry = process.argv.includes("--dry");
  const limIdx = process.argv.indexOf("--limit");
  const limit =
    limIdx >= 0 ? parseInt(process.argv[limIdx + 1]!, 10) : Infinity;

  // SCOPE: only the published silk catalogue (audit/products.json), NOT the full
  // 3k-product Admin catalogue (which includes unrelated, non-silk items).
  const { readFileSync } = await import("node:fs");
  const { join } = await import("node:path");
  const allow = new Set<string>(
    JSON.parse(
      readFileSync(join(import.meta.dirname, "audit", "products.json"), "utf8"),
    ).map((p: any) => p.handle),
  );
  console.log(`Allowlist: ${allow.size} silk products.`);

  const updates: { id: string; alt: string }[] = [];
  let cursor: string | null = null;
  let scanned = 0;

  do {
    const data: any = await gql(
      `query($cursor:String){ products(first:50, after:$cursor){
        pageInfo{ hasNextPage endCursor }
        edges{ node{ handle title
          media(first:30){ edges{ node{ ... on MediaImage { id alt } } } } } } } }`,
      { cursor },
    );
    const conn = data.products;
    for (const e of conn.edges) {
      const p = e.node;
      if (!allow.has(p.handle)) continue; // skip non-silk catalogue
      const media = p.media.edges
        .map((m: any) => m.node)
        .filter((n: any) => n?.id);
      media.forEach((m: any, i: number) => {
        const next = altFor(p.title, p.handle, m.alt, i);
        if (next) updates.push({ id: m.id, alt: next });
      });
      scanned++;
      if (scanned >= limit) break;
    }
    cursor =
      conn.pageInfo.hasNextPage && scanned < limit
        ? conn.pageInfo.endCursor
        : null;
  } while (cursor);

  console.log(
    `Scanned ${scanned} products; ${updates.length} media need new alt.`,
  );
  if (dry) {
    updates.slice(0, 15).forEach((u) => console.log(`  ~ ${u.alt}`));
    console.log("(dry run — no writes)");
    return;
  }

  // Batch fileUpdate (25 per call).
  let done = 0;
  for (let i = 0; i < updates.length; i += 25) {
    const batch = updates.slice(i, i + 25);
    const r = await gql(
      `mutation($files:[FileUpdateInput!]!){ fileUpdate(files:$files){
        files{ id } userErrors{ field message } } }`,
      { files: batch },
    );
    const errs = r.fileUpdate.userErrors;
    if (errs?.length)
      console.error("  userErrors:", JSON.stringify(errs).slice(0, 200));
    done += batch.length;
    process.stdout.write(`\rUpdated ${done}/${updates.length} alts...`);
  }
  process.stdout.write("\n");
  console.log("Done.");
}

main();
