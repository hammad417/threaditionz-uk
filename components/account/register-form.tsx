"use client";

import { register, type AuthState } from "app/account/actions";
import Link from "next/link";
import { useActionState } from "react";
import { Field, SubmitButton } from "./auth-fields";

export default function RegisterForm() {
  const [state, formAction] = useActionState<AuthState, FormData>(
    register,
    undefined,
  );

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {state?.error ? (
        <p className="border border-burgundy/30 bg-burgundy/5 px-4 py-3 text-sm text-burgundy">
          {state.error}
        </p>
      ) : null}
      <div className="grid grid-cols-2 gap-4">
        <Field
          label="First name"
          type="text"
          name="firstName"
          autoComplete="given-name"
          required
        />
        <Field
          label="Last name"
          type="text"
          name="lastName"
          autoComplete="family-name"
          required
        />
      </div>
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
        autoComplete="new-password"
        required
        minLength={6}
        placeholder="At least 6 characters"
      />
      <SubmitButton label="Create Account" />
      <p className="text-center text-xs text-muted-foreground">
        Already have an account?{" "}
        <Link href="/account/login" className="text-gold hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
