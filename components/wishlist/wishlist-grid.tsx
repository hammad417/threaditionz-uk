"use client";

import Price from "components/price";
import {
  getWishlist,
  removeFromWishlist,
  WISHLIST_EVENT,
  type WishlistItem,
} from "lib/wishlist";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function WishlistGrid() {
  const [items, setItems] = useState<WishlistItem[] | null>(null);

  useEffect(() => {
    const sync = () => setItems(getWishlist());
    sync();
    window.addEventListener(WISHLIST_EVENT, sync);
    return () => window.removeEventListener(WISHLIST_EVENT, sync);
  }, []);

  if (items === null) return null; // avoid SSR/CSR flash

  if (!items.length) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg text-muted-foreground">Your wishlist is empty.</p>
        <Link
          href="/search"
          className="mt-6 inline-flex items-center justify-center bg-gold px-8 py-4 text-xs uppercase tracking-[0.25em] text-midnight transition-colors hover:bg-gold-light"
        >
          Explore the Collection
        </Link>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => (
        <li key={p.handle} className="group relative">
          <Link
            href={`/product/${p.handle}`}
            className="relative block aspect-square w-full overflow-hidden border border-gold/10"
          >
            <Image
              src={p.image}
              alt={p.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </Link>
          <div className="mt-3 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Link
                href={`/product/${p.handle}`}
                className="block truncate text-sm text-foreground hover:text-gold"
              >
                {p.title}
              </Link>
              <Price
                className="text-sm text-gold"
                amount={p.amount}
                currencyCode={p.currencyCode}
              />
            </div>
            <button
              type="button"
              onClick={() => removeFromWishlist(p.handle)}
              aria-label={`Remove ${p.title} from wishlist`}
              className="shrink-0 text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-burgundy"
            >
              Remove
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
