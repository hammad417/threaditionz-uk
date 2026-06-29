"use client";

import { trackViewItem } from "lib/analytics/ecommerce";
import type { Product } from "lib/shopify/types";
import { useEffect } from "react";

// Fires GA4 "view_item" + Meta "ViewContent" once per product view — the standard
// product-view signal both platforms use to build audiences and optimise ads.
// No-ops until cookie consent loads the tags (see lib/analytics/ecommerce).
export function TrackViewContent({ product }: { product: Product }) {
  useEffect(() => {
    trackViewItem(product);
  }, [
    product.id,
    product.title,
    product.priceRange.minVariantPrice.amount,
    product.priceRange.minVariantPrice.currencyCode,
  ]);

  return null;
}
