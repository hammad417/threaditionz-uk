"use client";

import { AddToCart } from "components/cart/add-to-cart";
import Price from "components/price";
import { Product } from "lib/shopify/types";

// Always-visible buy bar on mobile so the primary CTA is one tap away while scrolling.
export default function StickyBuyBar({ product }: { product: Product }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/20 bg-warm-white/95 px-4 py-3 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-(--breakpoint-2xl) items-center gap-3">
        <div className="shrink-0 font-heading text-lg leading-none text-gold">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
            currencyCodeClassName="text-xs text-muted-foreground"
          />
        </div>
        <div className="flex-1">
          <AddToCart product={product} />
        </div>
      </div>
    </div>
  );
}
