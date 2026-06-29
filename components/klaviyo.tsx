"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

// Klaviyo Onsite JS for the headless storefront — powers the email signup popups
// (newsletter capture), welcome-offer and browse/cart-abandonment forms, plus the
// on-site activity tracking that Klaviyo flows trigger from. The forms and flows
// themselves are configured in the Klaviyo dashboard; loading this script is all
// the storefront needs to surface them.
//
// Loads ONLY after (a) cookie consent is granted and (b)
// NEXT_PUBLIC_KLAVIYO_PUBLIC_API_KEY is set — the same consent gate as the
// analytics tags. The script exposes window.klaviyo; see lib/klaviyo.ts for the
// thin identify()/track() helper the rest of the app calls.
const PUBLIC_API_KEY = process.env.NEXT_PUBLIC_KLAVIYO_PUBLIC_API_KEY;

export default function Klaviyo() {
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

  if (!granted || !PUBLIC_API_KEY) return null;

  return (
    <Script
      id="klaviyo-onsite"
      strategy="afterInteractive"
      src={`https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=${PUBLIC_API_KEY}`}
    />
  );
}
