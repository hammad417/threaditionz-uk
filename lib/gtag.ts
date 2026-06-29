// Thin wrapper around Google's gtag.js (GA4 + Google Ads). The base library and
// `gtag('config', …)` are loaded in components/analytics.tsx, and ONLY after
// cookie consent is granted (and a NEXT_PUBLIC_GA_ID / NEXT_PUBLIC_GOOGLE_ADS_ID
// is set). Until then `window.gtag` is undefined, so every call here is a safe
// no-op — consent is never bypassed. Mirrors lib/meta-pixel.ts for Meta.

type GtagParams = Record<string, unknown>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Fire a GA4 event (no-op until gtag.js has loaded). */
export function gtagEvent(name: string, params?: GtagParams): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function")
    return;
  window.gtag("event", name, params);
}

/**
 * Fire a Google Ads conversion (e.g. purchase). `sendTo` is the full
 * "AW-XXXXXXXXXX/ConversionLabel". No-op until gtag.js has loaded or when the
 * Ads id / label env vars are unset.
 */
export function gtagAdsConversion(
  sendTo: string | undefined,
  params?: GtagParams,
): void {
  if (!sendTo) return;
  if (typeof window === "undefined" || typeof window.gtag !== "function")
    return;
  window.gtag("event", "conversion", { send_to: sendTo, ...params });
}
