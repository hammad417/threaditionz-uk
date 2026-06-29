// Unified ecommerce event layer: every shopper action fires the GA4 standard
// event (gtag) AND the matching Meta Pixel event (fbq) from one call, so the two
// tag platforms stay in lockstep and components don't hand-roll payloads twice.
//
// Both underlying layers no-op until cookie consent loads their tag (see
// lib/gtag.ts and lib/meta-pixel.ts), so these helpers are always safe to call.
//
// GA4 events:  view_item · add_to_cart · begin_checkout · purchase
// Meta events: ViewContent · AddToCart · InitiateCheckout · Purchase
import { BRAND } from "lib/brand";
import { gtagEvent } from "lib/gtag";
import { pixelContentId, trackPixel } from "lib/meta-pixel";
import type { Cart, Product, ProductVariant } from "lib/shopify/types";

const num = (s: string): number => Number(s) || 0;

/** Product detail page view. */
export function trackViewItem(product: Product): void {
  const price = num(product.priceRange.minVariantPrice.amount);
  const currency = product.priceRange.minVariantPrice.currencyCode;

  gtagEvent("view_item", {
    currency,
    value: price,
    items: [
      {
        item_id: pixelContentId(product.id),
        item_name: product.title,
        item_brand: BRAND.name,
        price,
      },
    ],
  });

  trackPixel("ViewContent", {
    content_type: "product",
    content_ids: [pixelContentId(product.id)],
    content_name: product.title,
    value: price,
    currency,
  });
}

/** Add a chosen variant to the cart. */
export function trackAddToCart(args: {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}): void {
  const { product, variant, quantity } = args;
  const price = num(variant.price.amount);
  const value = price * quantity;
  const currency = variant.price.currencyCode;

  gtagEvent("add_to_cart", {
    currency,
    value,
    items: [
      {
        item_id: pixelContentId(variant.id),
        item_name: product.title,
        item_brand: BRAND.name,
        price,
        quantity,
      },
    ],
  });

  trackPixel("AddToCart", {
    content_type: "product",
    content_ids: [pixelContentId(product.id)],
    content_name: product.title,
    value,
    currency,
    contents: [{ id: pixelContentId(variant.id), quantity }],
  });
}

/** "Buy it now" — begin checkout for a single product/variant. */
export function trackBeginCheckoutItem(args: {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}): void {
  const { product, variant, quantity } = args;
  const price = num(variant.price.amount);
  const value = price * quantity;
  const currency = variant.price.currencyCode;

  gtagEvent("begin_checkout", {
    currency,
    value,
    items: [
      {
        item_id: pixelContentId(variant.id),
        item_name: product.title,
        item_brand: BRAND.name,
        price,
        quantity,
      },
    ],
  });

  trackPixel("InitiateCheckout", {
    content_type: "product",
    content_ids: [pixelContentId(product.id)],
    content_name: product.title,
    value,
    currency,
    num_items: quantity,
  });
}

/** Cart checkout — begin checkout for every line in the cart. */
export function trackBeginCheckoutCart(cart: Cart): void {
  const currency = cart.cost.totalAmount.currencyCode;
  const value = num(cart.cost.totalAmount.amount);

  gtagEvent("begin_checkout", {
    currency,
    value,
    items: cart.lines.map((line) => ({
      item_id: pixelContentId(line.merchandise.id),
      item_name: line.merchandise.product.title,
      item_brand: BRAND.name,
      price: num(line.cost.totalAmount.amount) / Math.max(1, line.quantity),
      quantity: line.quantity,
    })),
  });

  trackPixel("InitiateCheckout", {
    content_type: "product",
    content_ids: cart.lines.map((line) => pixelContentId(line.merchandise.id)),
    value,
    currency,
    num_items: cart.totalQuantity,
  });
}

// Purchase fires on Shopify's hosted checkout/thank-you page (this headless
// storefront hands off to checkout.threaditionz.co.uk and never renders the order
// confirmation), so it is wired up in the Shopify admin — NOT here. See
// /launch/feed/SETUP-CHECKLIST.md. This helper exists for the day an on-site
// order-status page is added; call it there with the order id, value and items.
export function trackPurchase(args: {
  transactionId: string;
  value: number;
  currency: string;
  items: {
    itemId: string;
    itemName: string;
    price: number;
    quantity: number;
  }[];
}): void {
  const { transactionId, value, currency, items } = args;

  gtagEvent("purchase", {
    transaction_id: transactionId,
    currency,
    value,
    items: items.map((i) => ({
      item_id: i.itemId,
      item_name: i.itemName,
      item_brand: BRAND.name,
      price: i.price,
      quantity: i.quantity,
    })),
  });

  trackPixel("Purchase", {
    content_type: "product",
    content_ids: items.map((i) => i.itemId),
    value,
    currency,
    num_items: items.reduce((n, i) => n + i.quantity, 0),
  });
}
