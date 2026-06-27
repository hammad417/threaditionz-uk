// Thin client-side helper around the PushOwl SDK queue. Safe to call before the
// SDK has finished loading (calls are queued) and a no-op when PushOwl isn't
// configured/consented. Use for: showing the opt-in widget on demand, syncing
// product views / cart for abandoned-cart offers, and customer attribution.
//
//   triggerPushOwl("showWidget");                 // open the newsletter/offer opt-in
//   triggerPushOwl("syncProductView", { ... });   // power browse-abandon offers
//   triggerPushOwl("setCustomerId", { id });       // revenue attribution
type PushOwlGlobal = {
  trigger?: (taskName: string, taskData?: unknown) => Promise<unknown>;
};

export function triggerPushOwl(
  taskName: string,
  taskData?: unknown,
): Promise<unknown> | undefined {
  if (typeof window === "undefined") return;
  const w = window as unknown as { pushowl?: PushOwlGlobal };
  if (!w.pushowl?.trigger) return;
  return w.pushowl.trigger(taskName, taskData);
}
