"use client";

import { addItem, getCartRecommendations } from "components/cart/actions";
import Price from "components/price";
import { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "./cart-context";

// "Complete the look" cross-sell shown inside the cart — drives AOV.
export function CartRecommendations({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const { cart, addCartItem } = useCart();
  const [recs, setRecs] = useState<Product[]>([]);

  const seedId = cart?.lines?.[0]?.merchandise?.product?.id;
  const inCart = new Set(
    (cart?.lines ?? []).map((l) => l.merchandise.product.handle),
  );
  const lineCount = cart?.lines?.length ?? 0;

  useEffect(() => {
    let active = true;
    if (!seedId) {
      setRecs([]);
      return;
    }
    getCartRecommendations(seedId).then((r) => {
      if (active) {
        setRecs(
          r
            .filter((p) => !inCart.has(p.handle) && p.availableForSale)
            .slice(0, 3),
        );
      }
    });
    return () => {
      active = false;
    };
    // re-fetch when the seed item or cart size changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seedId, lineCount]);

  if (!recs.length) return null;

  return (
    <div className="border-t border-gold/15 pt-3">
      <p className="mb-2 text-xs uppercase tracking-[0.15em] text-charcoal/70">
        Complete the look
      </p>
      <ul className="flex flex-col gap-2">
        {recs.map((p) => {
          const variant = p.variants[0];
          return (
            <li key={p.handle} className="flex items-center gap-3">
              <Link
                href={`/product/${p.handle}`}
                onClick={onNavigate}
                className="relative h-12 w-12 shrink-0 overflow-hidden border border-gold/20"
              >
                <Image
                  src={p.featuredImage.url}
                  alt={p.featuredImage.altText || p.title}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </Link>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs text-charcoal">{p.title}</p>
                <Price
                  className="text-xs text-gold"
                  amount={p.priceRange.minVariantPrice.amount}
                  currencyCode={p.priceRange.minVariantPrice.currencyCode}
                />
              </div>
              {variant ? (
                <form
                  action={async () => {
                    addCartItem(variant, p);
                    await addItem(null, variant.id);
                  }}
                >
                  <button
                    aria-label={`Add ${p.title} to cart`}
                    className="border border-midnight px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] text-midnight transition-colors hover:bg-midnight hover:text-cream"
                  >
                    Add
                  </button>
                </form>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
