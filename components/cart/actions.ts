"use server";

import { TAGS } from "lib/constants";
import {
  addToCart,
  createCart,
  getCart,
  getProductRecommendations,
  removeFromCart,
  updateCart,
} from "lib/shopify";
import { associateCartWithCustomer } from "lib/shopify/customer";
import type { Product } from "lib/shopify/types";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function addItem(
  prevState: any,
  payload: { selectedVariantId: string | undefined; quantity?: number },
) {
  const { selectedVariantId, quantity = 1 } = payload;

  if (!selectedVariantId) {
    return "Error adding item to cart";
  }

  try {
    await addToCart([
      { merchandiseId: selectedVariantId, quantity: Math.max(1, quantity) },
    ]);
    updateTag(TAGS.cart);
  } catch (e) {
    return "Error adding item to cart";
  }
}

export async function removeItem(prevState: any, merchandiseId: string) {
  try {
    const cart = await getCart();

    if (!cart) {
      return "Error fetching cart";
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId,
    );

    if (lineItem && lineItem.id) {
      await removeFromCart([lineItem.id]);
      updateTag(TAGS.cart);
    } else {
      return "Item not found in cart";
    }
  } catch (e) {
    return "Error removing item from cart";
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    merchandiseId: string;
    quantity: number;
  },
) {
  const { merchandiseId, quantity } = payload;

  try {
    const cart = await getCart();

    if (!cart) {
      return "Error fetching cart";
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId,
    );

    if (lineItem && lineItem.id) {
      if (quantity === 0) {
        await removeFromCart([lineItem.id]);
      } else {
        await updateCart([
          {
            id: lineItem.id,
            merchandiseId,
            quantity,
          },
        ]);
      }
    } else if (quantity > 0) {
      // If the item doesn't exist in the cart and quantity > 0, add it
      await addToCart([{ merchandiseId, quantity }]);
    }

    updateTag(TAGS.cart);
  } catch (e) {
    console.error(e);
    return "Error updating item quantity";
  }
}

export async function redirectToCheckout() {
  let cart = await getCart();
  redirect(cart!.checkoutUrl);
}

// Express "Buy Now": add the item, then go straight to Shopify checkout
// (where Shop Pay / Apple Pay / Google Pay express wallets are offered).
export async function buyNow(
  selectedVariantId: string | undefined,
  quantity: number = 1,
) {
  if (!selectedVariantId) {
    return "Error adding item to cart";
  }
  try {
    await addToCart([
      { merchandiseId: selectedVariantId, quantity: Math.max(1, quantity) },
    ]);
    updateTag(TAGS.cart);
  } catch (e) {
    return "Error adding item to cart";
  }
  const cart = await getCart();
  if (cart?.checkoutUrl) redirect(cart.checkoutUrl);
}

// Cross-sell suggestions for the cart ("Complete the look"), seeded from a cart item.
export async function getCartRecommendations(
  productId: string,
): Promise<Product[]> {
  if (!productId) return [];
  try {
    const recs = await getProductRecommendations(productId);
    return recs.slice(0, 6);
  } catch {
    return [];
  }
}

export async function createCartAndSetCookie() {
  let cart = await createCart();
  const cookieStore = await cookies();
  cookieStore.set("cartId", cart.id!);
  // If the shopper is signed in, tie the new cart to their account so the
  // resulting order is recorded against it.
  const token = cookieStore.get("customerAccessToken")?.value;
  if (token && cart.id) await associateCartWithCustomer(cart.id, token);
}
