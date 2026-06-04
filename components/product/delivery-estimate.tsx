"use client";

import { TruckIcon } from "@heroicons/react/24/outline";
import { COMMERCE } from "lib/brand";
import { useEffect, useState } from "react";

// Adds the given number of business days to a date (skips Sat/Sun).
function addBusinessDays(start: Date, days: number): Date {
  const d = new Date(start);
  let added = 0;
  while (added < days) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day !== 0 && day !== 6) added++;
  }
  return d;
}

const fmt = (d: Date) =>
  d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

// "Order today → estimated delivery between X and Y" using the brand's real
// handling + UK transit times. Computed in the browser so the dates are
// relative to the shopper's own "today" without a hydration mismatch.
export function DeliveryEstimate() {
  const [range, setRange] = useState<{ from: string; to: string } | null>(null);

  useEffect(() => {
    const now = new Date();
    const totalMin =
      COMMERCE.shippingHandlingDaysMin + COMMERCE.ukTransitDaysMin;
    const totalMax =
      COMMERCE.shippingHandlingDaysMax + COMMERCE.ukTransitDaysMax;
    setRange({
      from: fmt(addBusinessDays(now, totalMin)),
      to: fmt(addBusinessDays(now, totalMax)),
    });
  }, []);

  if (!range) return null;

  return (
    <p className="mt-4 flex items-start gap-2 text-sm text-charcoal">
      <TruckIcon
        className="mt-0.5 h-5 w-5 shrink-0 text-gold"
        strokeWidth={1.25}
      />
      <span>
        Order today &mdash; estimated UK delivery{" "}
        <span className="font-semibold text-foreground">{range.from}</span> to{" "}
        <span className="font-semibold text-foreground">{range.to}</span>.
      </span>
    </p>
  );
}
