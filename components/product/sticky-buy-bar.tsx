"use client";

import { AddToCart } from "components/cart/add-to-cart";
import Price from "components/price";
import { Product } from "lib/shopify/types";
import Image from "next/image";
import { useEffect, useState } from "react";

// Always-available buy bar on mobile so the primary CTA is one tap away while
// scrolling. Reveals once the shopper has scrolled past the hero/buy box so it
// doesn't compete with the in-page CTA above the fold.
export default function StickyBuyBar({ product }: { product: Product }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-gold/20 bg-warm-white/95 px-4 py-3 backdrop-blur transition-transform duration-300 md:hidden ${
        shown ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-(--breakpoint-2xl) items-center gap-3">
        {product.featuredImage?.url ? (
          <div className="relative h-12 w-12 shrink-0 overflow-hidden border border-gold/20 bg-white">
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || product.title}
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
        ) : null}
        <div className="min-w-0 flex-1">
          <p className="truncate font-heading text-sm leading-tight text-foreground">
            {product.title}
          </p>
          <div className="font-heading text-base leading-none text-gold">
            <Price
              amount={product.priceRange.minVariantPrice.amount}
              currencyCode={product.priceRange.minVariantPrice.currencyCode}
              currencyCodeClassName="text-xs text-muted-foreground"
            />
          </div>
        </div>
        <div className="w-[45%] shrink-0">
          <AddToCart product={product} />
        </div>
      </div>
    </div>
  );
}
