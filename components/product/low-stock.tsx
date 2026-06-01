"use client";

import { Product, ProductVariant } from "lib/shopify/types";
import { useSearchParams } from "next/navigation";

const THRESHOLD = 10;

// Urgency: "Only N left in stock" for the selected variant when inventory is low.
export function LowStock({ product }: { product: Product }) {
  const { variants } = product;
  const searchParams = useSearchParams();

  const variant = variants.find((v: ProductVariant) =>
    v.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase()),
    ),
  );
  const selected = variant ?? (variants.length === 1 ? variants[0] : undefined);
  const qty = selected?.quantityAvailable;

  if (qty == null || qty <= 0 || qty > THRESHOLD) return null;

  return (
    <p className="mt-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-burgundy">
      <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-burgundy" />
      Only {qty} left in stock
    </p>
  );
}
