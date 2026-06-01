"use client";

import { login, type AuthState } from "app/account/actions";
import Link from "next/link";
import { useActionState } from "react";
import { Field, SubmitButton } from "./auth-fields";

export default function LoginForm() {
  const [state, formAction] = useActionState<AuthState, FormData>(
    login,
    undefined,
  );

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {state?.error ? (
        <p className="border border-burgundy/30 bg-burgundy/5 px-4 py-3 text-sm text-burgundy">
          {state.error}
        </p>
      ) : null}
      <Field
        label="Email"
        type="email"
        name="email"
        autoComplete="email"
        required
        placeholder="you@example.com"
      />
      <Field
        label="Password"
        type="password"
        name="password"
        autoComplete="current-password"
        required
        placeholder="••••••••"
      />
      <SubmitButton label="Sign In" />
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <Link href="/account/reset" className="hover:text-gold">
          Forgot password?
        </Link>
        <Link href="/account/register" className="text-gold hover:underline">
          Create an account
        </Link>
      </div>
    </form>
  );
}
