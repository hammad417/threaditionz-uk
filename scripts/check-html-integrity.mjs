#!/usr/bin/env node
// HTML integrity monitor (P0 guard for the RSC/flight-payload serving bug).
//
// On 2026-07-07 an external crawl found cold-cache (x-vercel-cache: MISS)
// responses intermittently returning raw RSC/flight payloads ("resumableState",
// "nextSegmentId", self.__next_f chunks) instead of HTML while Next was pinned
// to 15.6.0-canary.60 with experimental.ppr. This script re-checks production:
// it fetches rotating sitemap URLs with a bot UA and a cache-busting query
// param (forces a CDN MISS) and fails loudly if any response is not a real
// HTML document.
//
// Usage: node scripts/check-html-integrity.mjs [origin]
//   origin defaults to https://threaditionz.co.uk
//   (also reads CHECK_ORIGIN env var)

const ORIGIN =
  process.argv[2] || process.env.CHECK_ORIGIN || "https://threaditionz.co.uk";
const SAMPLE_SIZE = 10;
const BOT_UA =
  "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";

async function getSitemapUrls() {
  const res = await fetch(`${ORIGIN}/sitemap.xml`, {
    headers: { "user-agent": BOT_UA },
  });
  if (!res.ok) {
    throw new Error(`sitemap.xml returned HTTP ${res.status}`);
  }
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (!urls.length) throw new Error("sitemap.xml contained no <loc> entries");
  return urls;
}

// Rotate the sample deterministically per 6-hour window so successive runs
// sweep the whole sitemap rather than re-testing the same ten URLs.
function rotatingSample(urls, size) {
  const window = Math.floor(Date.now() / (6 * 60 * 60 * 1000));
  const start = (window * size) % urls.length;
  const sample = [];
  for (let i = 0; i < Math.min(size, urls.length); i++) {
    sample.push(urls[(start + i) % urls.length]);
  }
  return sample;
}

async function checkUrl(url) {
  const busted = new URL(url);
  busted.searchParams.set("nocache", String(Date.now()));
  const res = await fetch(busted, {
    headers: {
      "user-agent": BOT_UA,
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
    redirect: "follow",
  });
  const body = await res.text();
  const head = body.slice(0, 200);
  const ok = res.ok && body.trimStart().toLowerCase().startsWith("<!doctype");
  return {
    url,
    ok,
    status: res.status,
    cache: res.headers.get("x-vercel-cache") ?? "-",
    contentType: res.headers.get("content-type") ?? "-",
    head,
  };
}

const urls = rotatingSample(await getSitemapUrls(), SAMPLE_SIZE);
console.log(`Checking ${urls.length} URLs on ${ORIGIN} (cache-busted, bot UA)`);

const results = await Promise.all(urls.map(checkUrl));
const failures = results.filter((r) => !r.ok);

for (const r of results) {
  console.log(
    `${r.ok ? "PASS" : "FAIL"}  ${r.status}  cache=${r.cache}  ${r.url}`,
  );
}

if (failures.length) {
  console.error(
    `\n${failures.length}/${results.length} URLs did NOT return an HTML document:\n`,
  );
  for (const f of failures) {
    console.error(`URL: ${f.url}`);
    console.error(
      `  status=${f.status} content-type=${f.contentType} x-vercel-cache=${f.cache}`,
    );
    console.error(`  first 200 bytes:\n  ${JSON.stringify(f.head)}\n`);
  }
  process.exit(1);
}

console.log(`\nAll ${results.length} responses are HTML documents.`);
