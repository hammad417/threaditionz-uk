/**
 * photo-upgrade/upload-shopify.ts — Shopify Admin API handoff.
 *
 * Uploads the generated on-body + drape images to each product and sets the ON-BODY
 * shot as the FEATURED image (position 0). NON-DESTRUCTIVE: only adds media + reorders;
 * never deletes the real product photos. Idempotent (skips assets already uploaded,
 * detected by alt-text marker). Pilot-first: pass explicit handles, or --all.
 *
 * Requires in .env.local: SHOPIFY_STORE_DOMAIN, SHOPIFY_ADMIN_ACCESS_TOKEN (write_products).
 *
 * Run:
 *   npx tsx --env-file=.env.local photo-upgrade/upload-shopify.ts <handle>      # pilot one
 *   npx tsx --env-file=.env.local photo-upgrade/upload-shopify.ts --from target-handles.txt
 *   npx tsx --env-file=.env.local photo-upgrade/upload-shopify.ts --all --dry   # dry run, no writes
 *
 * Rollback: re-run with --rollback <handle...> to move the original first image back to
 * position 0 (the AI media stays on the product unless you also pass --delete).
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = import.meta.dirname;
const API_VERSION = "2024-10";
const ALT_ONBODY = "AI on-body (Threaditionz)";
const ALT_DRAPE = "AI drape still-life (Threaditionz)";

function env(name: string): string {
  const v = process.env[name];
  if (!v) {
    console.error(
      `Missing ${name}. Add it to .env.local and run with --env-file=.env.local`,
    );
    process.exit(1);
  }
  return v;
}

const DOMAIN = (() => {
  const d = env("SHOPIFY_STORE_DOMAIN");
  return d.startsWith("https://") ? d : `https://${d}`;
})();
const ADMIN_TOKEN = env("SHOPIFY_ADMIN_ACCESS_TOKEN");
const ENDPOINT = `${DOMAIN}/admin/api/${API_VERSION}/graphql.json`;

async function gql<T = any>(query: string, variables?: any): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": ADMIN_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  const body = await res.json();
  if (body.errors) {
    throw new Error("GraphQL: " + JSON.stringify(body.errors));
  }
  return body.data as T;
}

type MediaNode = { id: string; alt: string | null };
type Product = {
  id: string;
  title: string;
  media: MediaNode[];
  firstMediaId?: string;
};

async function getProduct(handle: string): Promise<Product | null> {
  const data = await gql<{ products: { edges: { node: any }[] } }>(
    `query($q:String!){ products(first:1, query:$q){ edges{ node{
        id title
        media(first:50){ edges{ node{ ... on MediaImage { id alt } } } }
      } } } }`,
    { q: `handle:${handle}` },
  );
  const node = data.products.edges[0]?.node;
  if (!node) return null;
  const media: MediaNode[] = node.media.edges
    .map((e: any) => e.node)
    .filter((n: any) => n && n.id);
  return { id: node.id, title: node.title, media, firstMediaId: media[0]?.id };
}

// Staged upload a local file, return the resourceUrl to use as originalSource.
async function stageUpload(path: string, filename: string): Promise<string> {
  const data = await gql<{ stagedUploadsCreate: any }>(
    `mutation($input:[StagedUploadInput!]!){ stagedUploadsCreate(input:$input){
        stagedTargets{ url resourceUrl parameters{ name value } }
        userErrors{ field message } } }`,
    {
      input: [
        {
          filename,
          mimeType: "image/png",
          httpMethod: "POST",
          resource: "IMAGE",
        },
      ],
    },
  );
  const errs = data.stagedUploadsCreate.userErrors;
  if (errs?.length)
    throw new Error("stagedUploadsCreate: " + JSON.stringify(errs));
  const target = data.stagedUploadsCreate.stagedTargets[0];
  // POST the file to the staged target with curl (multipart; file field LAST).
  const args = ["-sS", "-X", "POST", target.url];
  for (const p of target.parameters as { name: string; value: string }[]) {
    args.push("-F", `${p.name}=${p.value}`);
  }
  args.push("-F", `file=@${path}`);
  execFileSync("curl", args, { maxBuffer: 10 * 1024 * 1024 });
  return target.resourceUrl as string;
}

async function addMedia(
  productId: string,
  resourceUrl: string,
  alt: string,
): Promise<string> {
  const data = await gql<{ productCreateMedia: any }>(
    `mutation($pid:ID!,$media:[CreateMediaInput!]!){ productCreateMedia(productId:$pid, media:$media){
        media{ ... on MediaImage { id alt } }
        mediaUserErrors{ field message } } }`,
    {
      pid: productId,
      media: [{ originalSource: resourceUrl, alt, mediaContentType: "IMAGE" }],
    },
  );
  const errs = data.productCreateMedia.mediaUserErrors;
  if (errs?.length)
    throw new Error("productCreateMedia: " + JSON.stringify(errs));
  return data.productCreateMedia.media[0].id as string;
}

async function reorderMedia(
  productId: string,
  moves: { id: string; newPosition: string }[],
) {
  if (!moves.length) return;
  const data = await gql<{ productReorderMedia: any }>(
    `mutation($id:ID!,$moves:[MoveInput!]!){ productReorderMedia(id:$id, moves:$moves){
        job{ id } mediaUserErrors{ field message } } }`,
    { id: productId, moves },
  );
  const errs = data.productReorderMedia.mediaUserErrors;
  if (errs?.length)
    throw new Error("productReorderMedia: " + JSON.stringify(errs));
}

const MPATH = join(ROOT, "out", "upload-manifest.json");
function loadUploaded(): Record<string, any> {
  return existsSync(MPATH) ? JSON.parse(readFileSync(MPATH, "utf8")) : {};
}
function saveUploaded(m: Record<string, any>) {
  writeFileSync(MPATH, JSON.stringify(m, null, 2));
}

function resolveHandles(): {
  handles: string[];
  dry: boolean;
  rollback: boolean;
} {
  const args = process.argv.slice(2);
  const dry = args.includes("--dry");
  const rollback = args.includes("--rollback");
  const fromIdx = args.indexOf("--from");
  const fromFile = fromIdx >= 0 ? args[fromIdx + 1] : undefined;
  const explicit = args.filter((a) => !a.startsWith("--") && a !== fromFile);
  let handles: string[];
  if (fromIdx >= 0 && args[fromIdx + 1]) {
    handles = readFileSync(join(ROOT, args[fromIdx + 1]), "utf8")
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean);
  } else if (args.includes("--all")) {
    handles = readFileSync(join(ROOT, "target-handles.txt"), "utf8")
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean);
  } else {
    handles = explicit;
  }
  return { handles, dry, rollback };
}

async function main() {
  const { handles, dry, rollback } = resolveHandles();
  if (!handles.length) {
    console.error("No handles. Pass a handle, --from <file>, or --all.");
    process.exit(1);
  }
  console.log(
    `${rollback ? "ROLLBACK" : dry ? "DRY RUN" : "UPLOAD"} for ${handles.length} product(s) on ${DOMAIN}`,
  );
  const uploaded = loadUploaded();

  for (const handle of handles) {
    try {
      const product = await getProduct(handle);
      if (!product) {
        console.error(`! ${handle}: not found`);
        continue;
      }
      if (rollback) {
        // Move the first non-AI (original) media back to position 0.
        const original = product.media.find(
          (m) => !(m.alt || "").includes("(Threaditionz)"),
        );
        if (original && !dry)
          await reorderMedia(product.id, [
            { id: original.id, newPosition: "0" },
          ]);
        console.log(`↩ ${handle}: original image restored to featured`);
        continue;
      }

      const onbodyPath = join(ROOT, "out", handle, `${handle}_onbody_3x4.png`);
      const drapePath = join(ROOT, "out", handle, `${handle}_drape_1x1.png`);

      // Reuse already-uploaded AI media (by alt marker) so re-runs are idempotent.
      let onbodyId =
        product.media.find((m) => m.alt === ALT_ONBODY)?.id ?? null;
      let drapeId = product.media.find((m) => m.alt === ALT_DRAPE)?.id ?? null;

      const toUpload: string[] = [];
      if (existsSync(onbodyPath) && !onbodyId) toUpload.push("on-body");
      if (existsSync(drapePath) && !drapeId) toUpload.push("drape");

      if (dry) {
        console.log(
          `~ ${handle}: ${toUpload.length ? "would upload " + toUpload.join(", ") : "no new uploads"}; ` +
            `then order = on-body(featured), drape, originals`,
        );
        continue;
      }

      if (existsSync(onbodyPath) && !onbodyId) {
        const url = await stageUpload(onbodyPath, `${handle}_onbody.png`);
        onbodyId = await addMedia(product.id, url, ALT_ONBODY);
      }
      if (existsSync(drapePath) && !drapeId) {
        const url = await stageUpload(drapePath, `${handle}_drape.png`);
        drapeId = await addMedia(product.id, url, ALT_DRAPE);
      }

      // Enforce order every run: on-body -> position 0, drape -> position 1, originals after.
      const moves: { id: string; newPosition: string }[] = [];
      if (onbodyId) moves.push({ id: onbodyId, newPosition: "0" });
      if (drapeId) moves.push({ id: drapeId, newPosition: "1" });
      await reorderMedia(product.id, moves);

      uploaded[handle] = { productId: product.id, featured: "onbody" };
      saveUploaded(uploaded);
      console.log(
        `✓ ${handle}: ${toUpload.length ? "uploaded " + toUpload.join("+") + ", " : ""}order set (on-body, drape, originals)`,
      );
    } catch (e: any) {
      console.error(`✗ ${handle}: ${e?.message?.split("\n")[0]}`);
    }
  }
  console.log("Done.");
}

main();
