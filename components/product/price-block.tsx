import Price from "components/price";
import type { Product } from "lib/shopify/types";

// Price display with authentic markdown support. When Shopify exposes a
// compareAtPrice above the selling price, we show the original struck through
// plus a "Save N%" badge — only ever driven by real Shopify data, never faked.
export function PriceBlock({ product }: { product: Product }) {
  const min = product.priceRange.minVariantPrice;
  const max = product.priceRange.maxVariantPrice;
  const isRange = min.amount !== max.amount;

  const compareAmount = product.compareAtPriceRange?.maxVariantPrice.amount;
  const current = parseFloat(min.amount);
  const compare = compareAmount ? parseFloat(compareAmount) : 0;
  const onSale = compare > current;
  const percentOff = onSale ? Math.round((1 - current / compare) * 100) : 0;

  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      {isRange ? (
        <span className="text-sm uppercase tracking-[0.15em] text-muted-foreground">
          From
        </span>
      ) : null}

      <span className="font-heading text-2xl text-gold">
        <Price
          amount={min.amount}
          currencyCode={min.currencyCode}
          currencyCodeClassName="text-base text-muted-foreground"
        />
      </span>

      {onSale ? (
        <>
          <span className="font-heading text-lg text-muted-foreground line-through">
            <Price
              amount={compareAmount!}
              currencyCode={min.currencyCode}
              currencyCodeClassName="hidden"
            />
          </span>
          <span className="inline-flex items-center bg-burgundy px-2 py-1 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-cream">
            Save {percentOff}%
          </span>
        </>
      ) : null}
    </div>
  );
}
