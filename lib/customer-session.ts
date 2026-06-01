import "server-only";
import { cookies } from "next/headers";
import { getCustomerByToken, type Customer } from "./shopify/customer";

const COOKIE = "customerAccessToken";

// Persist the Storefront customer access token in an httpOnly cookie so it is
// never exposed to client JS. Expiry mirrors the token's own lifetime.
export async function setCustomerSession(token: string, expiresAt: string) {
  const expires = new Date(expiresAt);
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: Number.isNaN(expires.getTime()) ? undefined : expires,
  });
}

export async function clearCustomerSession() {
  (await cookies()).delete(COOKIE);
}

export async function getCustomerToken(): Promise<string | undefined> {
  return (await cookies()).get(COOKIE)?.value;
}

// Resolve the signed-in customer (profile + orders) or null. A stale/expired
// token simply resolves to null.
export async function getCurrentCustomer(): Promise<Customer | null> {
  const token = await getCustomerToken();
  if (!token) return null;
  return getCustomerByToken(token);
}
