/**
 * photo-upgrade/submit-indexnow.ts — submit every live URL to IndexNow (Bing/Yandex)
 * for near-instant indexing. Reads the production sitemap and pings IndexNow.
 *
 * Run AFTER deploy (NEXT_PUBLIC_SITE_URL must be the live https domain):
 *   npx tsx --env-file=.env.local photo-upgrade/submit-indexnow.ts
 * Cron it (e.g. daily) to keep new/updated products fresh in Bing.
 */
import { INDEXNOW_KEY, pingIndexNow } from "../lib/indexnow";
import { baseUrl } from "../lib/utils";

async function main() {
  if (baseUrl.includes("localhost")) {
    console.error(
      "baseUrl is localhost — set NEXT_PUBLIC_SITE_URL to the live https domain and run against the deployed sitemap.",
    );
    process.exit(1);
  }
  const res = await fetch(`${baseUrl}/sitemap.xml`);
  const xml = await res.text();
  const urls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map(
    (m) => m[1]!,
  );
  console.log(`Found ${urls.length} URLs in sitemap; submitting to IndexNow…`);
  // IndexNow accepts up to 10k URLs per request.
  for (let i = 0; i < urls.length; i += 10000) {
    await pingIndexNow(urls.slice(i, i + 10000));
  }
  console.log(
    `Done. key=${INDEXNOW_KEY} keyLocation=${baseUrl}/${INDEXNOW_KEY}.txt`,
  );
}

main();
