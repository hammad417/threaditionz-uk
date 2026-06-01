"use client";

import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { isSaved, toggleWishlist, WISHLIST_EVENT } from "lib/wishlist";
import type { WishlistItem } from "lib/wishlist";
import { useEffect, useState } from "react";

export function WishlistButton({
  item,
  className,
}: {
  item: WishlistItem;
  className?: string;
}) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const sync = () => setSaved(isSaved(item.handle));
    sync();
    window.addEventListener(WISHLIST_EVENT, sync);
    return () => window.removeEventListener(WISHLIST_EVENT, sync);
  }, [item.handle]);

  return (
    <button
      type="button"
      onClick={() => setSaved(toggleWishlist(item))}
      aria-pressed={saved}
      aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
      className={clsx(
        "inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-charcoal transition-colors hover:text-gold",
        className,
      )}
    >
      {saved ? (
        <HeartSolid className="h-5 w-5 text-gold" />
      ) : (
        <HeartOutline className="h-5 w-5" />
      )}
      {saved ? "Saved to wishlist" : "Save to wishlist"}
    </button>
  );
}
