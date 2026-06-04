"use client";

import { pixelContentId, trackPixel } from "lib/meta-pixel";
import type { Product } from "lib/shopify/types";
import { useEffect } from "react";

// Fires a Meta Pixel "ViewContent" event once per product view — the standard
// signal Meta uses to build product audiences and optimise/retarget ads.
// No-ops until cookie consent loads the pixel (see lib/meta-pixel).
export function TrackViewContent({ product }: { product: Product }) {
  useEffect(() => {
    trackPixel("ViewContent", {
      content_type: "product",
      content_ids: [pixelContentId(product.id)],
      content_name: product.title,
      value: Number(product.priceRange.minVariantPrice.amount),
      currency: product.priceRange.minVariantPrice.currencyCode,
    });
  }, [
    product.id,
    product.title,
    product.priceRange.minVariantPrice.amount,
    product.priceRange.minVariantPrice.currencyCode,
  ]);

  return null;
}
