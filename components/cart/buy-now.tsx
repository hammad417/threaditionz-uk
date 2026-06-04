"use client";

import clsx from "clsx";
import { buyNow } from "components/cart/actions";
import { pixelContentId, trackPixel } from "lib/meta-pixel";
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
  const rawQty = parseInt(searchParams.get("qty") ?? "1", 10);
  const quantity = Math.max(1, Number.isNaN(rawQty) ? 1 : rawQty);
  const selectedVariant = variants.find((v) => v.id === selectedVariantId);

  if (!availableForSale) return null;

  return (
    <form
      action={async () => {
        if (selectedVariant) {
          trackPixel("InitiateCheckout", {
            content_type: "product",
            content_ids: [pixelContentId(product.id)],
            content_name: product.title,
            value: Number(selectedVariant.price.amount) * quantity,
            currency: selectedVariant.price.currencyCode,
            num_items: quantity,
          });
        }
        await buyNow(selectedVariantId, quantity);
      }}
    >
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
