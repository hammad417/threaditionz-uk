// Thin client-side helper around the Klaviyo Onsite object. Safe to call before
// the Onsite JS has finished loading (klaviyo.push queues calls) and a no-op when
// Klaviyo isn't configured/consented. Use for: associating the active browser
// with a known email (identify) and recording on-site activity that powers offers
// and abandonment flows (track).
//
//   identifyKlaviyo({ email });                          // attach email to the profile
//   trackKlaviyo("Viewed Product", { ProductName, ... }); // power browse-abandon offers
type KlaviyoGlobal = {
  push: (args: unknown[]) => void;
};

function getKlaviyo(): KlaviyoGlobal | undefined {
  if (typeof window === "undefined") return;
  const w = window as unknown as { klaviyo?: KlaviyoGlobal };
  return w.klaviyo;
}

// Associate the current browser with a customer. `properties` accepts the
// standard Klaviyo keys ($email, $first_name, …) or plain { email } shorthand.
export function identifyKlaviyo(properties: Record<string, unknown>): void {
  const klaviyo = getKlaviyo();
  if (!klaviyo) return;
  klaviyo.push(["identify", properties]);
}

// Record a custom on-site event (e.g. "Viewed Product", "Added to Cart") that
// Klaviyo flows can trigger from.
export function trackKlaviyo(
  eventName: string,
  properties?: Record<string, unknown>,
): void {
  const klaviyo = getKlaviyo();
  if (!klaviyo) return;
  klaviyo.push(["track", eventName, properties ?? {}]);
}
