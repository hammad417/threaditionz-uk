"use client";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";

// Quantity stepper backed by the `qty` URL param, mirroring how variant and
// image state live in the URL across the PDP. AddToCart reads the same param so
// the two stay in sync without shared client state.
export const MAX_QTY = 10;

export function QuantitySelector({ max }: { max?: number | null }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const ceiling = Math.min(MAX_QTY, max && max > 0 ? max : MAX_QTY);
  const raw = parseInt(searchParams.get("qty") ?? "1", 10);
  const qty = Math.min(ceiling, Math.max(1, Number.isNaN(raw) ? 1 : raw));

  const setQty = (next: number) => {
    const clamped = Math.min(ceiling, Math.max(1, next));
    const params = new URLSearchParams(searchParams.toString());
    if (clamped <= 1) params.delete("qty");
    else params.set("qty", String(clamped));
    const query = params.toString();
    router.replace(query ? `?${query}` : "?", { scroll: false });
  };

  return (
    <div className="mb-5">
      <span className="mb-3 block text-sm uppercase tracking-wide">
        Quantity
      </span>
      <div className="inline-flex items-center border border-border bg-white">
        <Step
          label="Decrease quantity"
          onClick={() => setQty(qty - 1)}
          disabled={qty <= 1}
        >
          <MinusIcon className="h-4 w-4" />
        </Step>
        <span
          aria-live="polite"
          className="w-12 select-none text-center text-sm font-medium text-foreground"
        >
          {qty}
        </span>
        <Step
          label="Increase quantity"
          onClick={() => setQty(qty + 1)}
          disabled={qty >= ceiling}
        >
          <PlusIcon className="h-4 w-4" />
        </Step>
      </div>
    </div>
  );
}

function Step({
  children,
  label,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "flex h-11 w-11 items-center justify-center text-foreground transition-colors hover:text-gold",
        disabled && "cursor-not-allowed opacity-40 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
