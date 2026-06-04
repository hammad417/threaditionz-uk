// Thin wrapper around the Meta Pixel (fbq) for tracking shopper behaviour.
//
// The base pixel + PageView are loaded in components/analytics.tsx, and ONLY
// after cookie consent is granted. Until then `window.fbq` is undefined, so
// every call here is a safe no-op — consent is never bypassed. Use these
// helpers from client components to record standard ecommerce events.

type FbqParams = Record<string, unknown>;

declare global {
  interface Window {
    fbq?: (
      command: "track" | "trackCustom",
      event: string,
      params?: FbqParams,
    ) => void;
  }
}

/** Fire a standard Meta Pixel event (no-op until the pixel has loaded). */
export function trackPixel(event: string, params?: FbqParams): void {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("track", event, params);
}

/** Fire a custom (non-standard) Meta Pixel event. */
export function trackPixelCustom(event: string, params?: FbqParams): void {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("trackCustom", event, params);
}

/** Numeric Shopify GID (e.g. "gid://shopify/Product/123") → "123" for content_ids. */
export function pixelContentId(gid?: string): string | undefined {
  if (!gid) return undefined;
  const id = gid.split("/").pop();
  return id || undefined;
}
