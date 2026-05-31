"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "cookie-consent";

// GDPR / UK-PECR cookie banner. Until the visitor chooses, no analytics/marketing
// cookies are set (the Analytics component is gated on the "granted" value here).
export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      // ignore (private mode / storage disabled)
    }
  }, []);

  const decide = (value: "granted" | "denied") => {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      // ignore
    }
    window.dispatchEvent(new Event("cookie-consent-change"));
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-gold/20 bg-midnight/95 px-4 py-4 text-cream backdrop-blur"
    >
      <div className="mx-auto flex max-w-(--breakpoint-2xl) flex-col gap-3 sm:flex-row sm:items-center">
        <p className="flex-1 text-sm leading-relaxed text-cream/80">
          We use cookies to enhance your experience and analyse traffic. You can
          accept or decline analytics cookies. See our{" "}
          <Link href="/privacy-policy" className="text-gold underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={() => decide("denied")}
            className="border border-cream/30 px-5 py-2 text-xs uppercase tracking-[0.2em] text-cream transition-colors hover:border-gold hover:text-gold"
          >
            Decline
          </button>
          <button
            onClick={() => decide("granted")}
            className="bg-gold px-5 py-2 text-xs uppercase tracking-[0.2em] text-midnight transition-colors hover:bg-gold-light"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
