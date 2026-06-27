"use client";

import { useEffect, useState } from "react";

// PushOwl onsite SDK for the headless storefront — powers the email/web-push
// opt-in popups (newsletter capture) and the offer/abandoned-cart automations
// configured in the PushOwl dashboard. PushOwl can't auto-inject on a headless
// store, so we load its SDK ourselves (per PushOwl's headless install guide).
//
// Loads ONLY after (a) cookie consent is granted and (b) NEXT_PUBLIC_PUSHOWL_SUBDOMAIN
// is set — same consent gate as the analytics tags. The `window.pushowl` stub +
// queue let the rest of the app call `window.pushowl.trigger(...)` (see
// lib/pushowl.ts) before the real SDK finishes loading.
const SUBDOMAIN = process.env.NEXT_PUBLIC_PUSHOWL_SUBDOMAIN;
const PLATFORM = "shopify";

type PushOwlTask = {
  taskName: string;
  taskData: unknown;
  promise: { resolve: (v: unknown) => void; reject: (e: unknown) => void };
};

type PushOwlGlobal = {
  queue: PushOwlTask[];
  subdomain?: string;
  trigger: (taskName: string, taskData?: unknown) => Promise<unknown>;
};

export default function PushOwl() {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    const read = () => {
      try {
        setGranted(localStorage.getItem("cookie-consent") === "granted");
      } catch {
        setGranted(false);
      }
    };
    read();
    window.addEventListener("cookie-consent-change", read);
    return () => window.removeEventListener("cookie-consent-change", read);
  }, []);

  useEffect(() => {
    if (!granted || !SUBDOMAIN) return;

    const w = window as unknown as { pushowl?: PushOwlGlobal };
    if (w.pushowl?.subdomain) return; // already initialised

    w.pushowl = w.pushowl ?? {
      queue: [],
      trigger(taskName: string, taskData?: unknown) {
        return new Promise((resolve, reject) => {
          this.queue.push({
            taskName,
            taskData,
            promise: { resolve, reject },
          });
        });
      },
    };
    w.pushowl.subdomain = SUBDOMAIN;

    const s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.src =
      "https://cdn.pushowl.com/sdks/pushowl-sdk.js?subdomain=" +
      SUBDOMAIN +
      "&environment=production&shop=" +
      SUBDOMAIN +
      ".my" +
      PLATFORM +
      ".com&platform=" +
      PLATFORM;
    document.head.appendChild(s);
  }, [granted]);

  return null;
}
