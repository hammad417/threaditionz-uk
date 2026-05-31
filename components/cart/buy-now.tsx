"use client";

import clsx from "clsx";
import { buyNow } from "components/cart/actions";
import { Product, ProductVariant } from "lib/shopify/types";
import { useSearchParams } from "next/navigation";

export function BuyNowButton({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const { variants, availableForSale } = product;
  const searchParams = useSearchParams();

  const variant = variants.find((v: ProductVariant) =>
    v.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase()),
    ),
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;

  if (!availableForSale) return null;

  return (
    <form action={async () => buyNow(selectedVariantId)}>
      <button
        disabled={!selectedVariantId}
        aria-label="Buy it now"
        className={clsx(
          "flex w-full items-center justify-center rounded-none border border-gold bg-gold p-4 text-xs uppercase tracking-[0.2em] text-midnight transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-60",
          className,
        )}
      >
        Buy It Now
      </button>
    </form>
  );
}
