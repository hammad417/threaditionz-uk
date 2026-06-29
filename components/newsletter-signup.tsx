"use client";

import { useState } from "react";
import { toast } from "sonner";

import { identifyKlaviyo } from "lib/klaviyo";

// Footer newsletter capture. Posts the email to /api/newsletter, which subscribes
// it to the configured Klaviyo list (welcome offer / flows take it from there),
// and identifies the browser with Klaviyo Onsite so on-site activity is attributed.
export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending) return;
    setPending(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        toast.error(data.error || "Something went wrong. Please try again.");
        return;
      }
      identifyKlaviyo({ $email: email });
      toast.success("Thank you — please check your inbox to confirm.");
      setEmail("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          aria-label="Your email address"
          className="min-w-0 flex-1 border border-gold/40 bg-transparent px-3 py-2 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
        />
        <button
          type="submit"
          disabled={pending}
          className="border border-gold bg-gold px-4 py-2 text-xs tracking-wide text-midnight uppercase transition-colors hover:bg-transparent hover:text-gold disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Joining…" : "Subscribe"}
        </button>
      </div>
    </form>
  );
}
