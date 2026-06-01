export type WishlistItem = {
  handle: string;
  title: string;
  image: string;
  amount: string;
  currencyCode: string;
};

const KEY = "wishlist";
const EVENT = "wishlist-change";

export function getWishlist(): WishlistItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function isSaved(handle: string): boolean {
  return getWishlist().some((i) => i.handle === handle);
}

function write(list: WishlistItem[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    // ignore (private mode / storage disabled)
  }
  window.dispatchEvent(new Event(EVENT));
}

// Toggle an item; returns the new saved state.
export function toggleWishlist(item: WishlistItem): boolean {
  const list = getWishlist();
  const exists = list.some((i) => i.handle === item.handle);
  write(
    exists ? list.filter((i) => i.handle !== item.handle) : [item, ...list],
  );
  return !exists;
}

export function removeFromWishlist(handle: string) {
  write(getWishlist().filter((i) => i.handle !== handle));
}

export const WISHLIST_EVENT = EVENT;
