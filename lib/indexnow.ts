import { baseUrl } from "./utils";

// IndexNow: instant URL submission to Bing, Yandex and other participating engines.
// The key is verified via the matching file hosted at /<KEY>.txt (public/).
export const INDEXNOW_KEY = "a3f8e1c47b9d4e2f8c6a0b5d9e7f1234";

export async function pingIndexNow(urls: string[]): Promise<void> {
  if (!urls.length) return;
  const host = new URL(baseUrl).host;
  // Don't ping for localhost / preview hosts.
  if (host.includes("localhost") || host.endsWith(".local")) return;
  try {
    await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation: `${baseUrl}/${INDEXNOW_KEY}.txt`,
        urlList: urls.slice(0, 10000),
      }),
    });
  } catch {
    // best-effort — never block on IndexNow
  }
}
