"use client";

import { requestReset, type AuthState } from "app/account/actions";
import Link from "next/link";
import { useActionState } from "react";
import { Field, SubmitButton } from "./auth-fields";

export default function ResetForm() {
  const [state, formAction] = useActionState<AuthState, FormData>(
    requestReset,
    undefined,
  );

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {state?.success ? (
        <p className="border border-gold/30 bg-gold/5 px-4 py-3 text-sm text-charcoal">
          {state.success}
        </p>
      ) : null}
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
      <SubmitButton label="Send Reset Link" />
      <p className="text-center text-xs text-muted-foreground">
        <Link href="/account/login" className="text-gold hover:underline">
          Back to sign in
        </Link>
      </p>
    </form>
  );
}
