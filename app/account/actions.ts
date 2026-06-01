"use server";

import {
  associateCartWithCustomer,
  createCustomer,
  createCustomerAccessToken,
  deleteCustomerAccessToken,
  recoverCustomer,
} from "lib/shopify/customer";
import {
  clearCustomerSession,
  getCustomerToken,
  setCustomerSession,
} from "lib/customer-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type AuthState = { error?: string; success?: string } | undefined;

const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// Link the active cart to the customer so checkout (and repeat purchases) are
// recorded against their account.
async function linkCart(token: string) {
  const cartId = (await cookies()).get("cartId")?.value;
  if (cartId) await associateCartWithCustomer(cartId, token);
}

async function signIn(email: string, password: string): Promise<string | null> {
  const { data, errors } = await createCustomerAccessToken({ email, password });
  if (data?.accessToken) {
    await setCustomerSession(data.accessToken, data.expiresAt);
    await linkCart(data.accessToken);
    return null;
  }
  return errors[0]?.message || "Incorrect email or password.";
}

export async function login(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  if (!emailRe.test(email) || !password) {
    return { error: "Please enter a valid email and password." };
  }
  const error = await signIn(email, password);
  if (error) return { error };
  redirect("/account");
}

export async function register(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const firstName = String(formData.get("firstName") || "").trim();
  const lastName = String(formData.get("lastName") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!firstName || !lastName) return { error: "Please enter your name." };
  if (!emailRe.test(email)) return { error: "Please enter a valid email." };
  if (password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }

  const { data, errors } = await createCustomer({
    firstName,
    lastName,
    email,
    password,
  });
  if (!data) {
    return {
      error: errors[0]?.message || "Could not create your account.",
    };
  }
  // Account created — sign straight in.
  const error = await signIn(email, password);
  if (error) {
    return { error: "Account created. Please sign in." };
  }
  redirect("/account");
}

export async function logout() {
  const token = await getCustomerToken();
  if (token) await deleteCustomerAccessToken(token);
  await clearCustomerSession();
  redirect("/account/login");
}

export async function requestReset(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") || "").trim();
  if (!emailRe.test(email)) return { error: "Please enter a valid email." };
  await recoverCustomer(email);
  // Always report success to avoid leaking which emails are registered.
  return {
    success: "If that email is registered, we've sent reset instructions.",
  };
}
