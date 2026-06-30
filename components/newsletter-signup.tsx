"use client";

import { openKlaviyoForm } from "lib/klaviyo";

// Footer newsletter entry point. Opens the branded Klaviyo signup popup
// (NEXT_PUBLIC_KLAVIYO_NEWSLETTER_FORM_ID) — the same form that auto-displays via
// the Onsite JS — so capture, the WELCOME10 offer and the welcome flow all run
// through one Klaviyo form. No-ops gracefully until consent loads the Onsite JS.
const FORM_ID = process.env.NEXT_PUBLIC_KLAVIYO_NEWSLETTER_FORM_ID;

export default function NewsletterSignup() {
  if (!FORM_ID) return null;

  return (
    <button
      type="button"
      onClick={() => openKlaviyoForm(FORM_ID)}
      className="border border-gold bg-gold px-5 py-2.5 text-xs tracking-wide text-midnight uppercase transition-colors hover:bg-transparent hover:text-gold"
    >
      Get 10% off
    </button>
  );
}
