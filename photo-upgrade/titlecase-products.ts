/**
 * photo-upgrade/titlecase-products.ts — convert ALL-CAPS product titles to Title Case
 * for the 181 published silk products (Admin API productUpdate). Fixes the shouty
 * <title>/<h1>/OG/JSON-LD across the site. Scoped by allowlist; only touches titles
 * that are fully uppercase. Snapshots originals to out/title-backup.json for rollback.
 *
 * Run: npx tsx --env-file=.env.local photo-upgrade/titlecase-products.ts [--dry]
 * Rollback: npx tsx --env-file=.env.local photo-upgrade/titlecase-products.ts --rollback
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const DOMAIN = (process.env.SHOPIFY_STORE_DOMAIN || "").startsWith("https://")
  ? process.env.SHOPIFY_STORE_DOMAIN!
  : `https://${process.env.SHOPIFY_STORE_DOMAIN}`;
const TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!;
const ENDPOINT = `${DOMAIN}/admin/api/2024-10/graphql.json`;
const ROOT = import.meta.dirname;
const BACKUP = join(ROOT, "out", "title-backup.json");

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
    .replace(/\bEid\b/g, "Eid")
    .trim();
}

const isAllCaps = (t: string) => t === t.toUpperCase() && /[A-Z]/.test(t);

async function update(id: string, title: string) {
  const d = await gql(
    `mutation($input:ProductInput!){ productUpdate(input:$input){
      product{ id } userErrors{ field message } } }`,
    { input: { id, title } },
  );
  const errs = d.productUpdate.userErrors;
  if (errs?.length) throw new Error(JSON.stringify(errs));
}

async function main() {
  const dry = process.argv.includes("--dry");
  const rollback = process.argv.includes("--rollback");

  if (rollback) {
    if (!existsSync(BACKUP))
      return console.error("No title-backup.json found.");
    const snap: { id: string; old: string }[] = JSON.parse(
      readFileSync(BACKUP, "utf8"),
    );
    let n = 0;
    for (const s of snap) {
      await update(s.id, s.old);
      process.stdout.write(`\rRestored ${++n}/${snap.length}...`);
    }
    return console.log("\nRollback done.");
  }

  const allow = new Set<string>(
    JSON.parse(readFileSync(join(ROOT, "audit", "products.json"), "utf8")).map(
      (p: any) => p.handle,
    ),
  );
  console.log(`Allowlist: ${allow.size} silk products.`);

  const changes: { id: string; handle: string; old: string; new: string }[] =
    [];
  let cursor: string | null = null;
  do {
    const data: any = await gql(
      `query($cursor:String){ products(first:100, after:$cursor){
        pageInfo{ hasNextPage endCursor }
        edges{ node{ id handle title } } } }`,
      { cursor },
    );
    for (const e of data.products.edges) {
      const p = e.node;
      if (!allow.has(p.handle) || !isAllCaps(p.title)) continue;
      const next = titleCase(p.title);
      if (next !== p.title)
        changes.push({ id: p.id, handle: p.handle, old: p.title, new: next });
    }
    cursor = data.products.pageInfo.hasNextPage
      ? data.products.pageInfo.endCursor
      : null;
  } while (cursor);

  console.log(`${changes.length} titles to title-case.`);
  if (dry) {
    changes
      .slice(0, 12)
      .forEach((c) => console.log(`  ${c.old}  ->  ${c.new}`));
    return console.log("(dry run — no writes)");
  }

  writeFileSync(
    BACKUP,
    JSON.stringify(
      changes.map((c) => ({ id: c.id, handle: c.handle, old: c.old })),
      null,
      2,
    ),
  );
  let n = 0;
  for (const c of changes) {
    await update(c.id, c.new);
    process.stdout.write(`\rUpdated ${++n}/${changes.length} titles...`);
  }
  console.log("\nDone. Originals saved to out/title-backup.json.");
}

main();
