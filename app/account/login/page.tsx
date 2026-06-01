import AuthShell from "components/account/auth-shell";
import LoginForm from "components/account/login-form";
import { getCurrentCustomer } from "lib/customer-session";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Threaditionz account to track orders and check out faster.",
  robots: { index: false, follow: true },
};

export default async function LoginPage() {
  if (await getCurrentCustomer()) redirect("/account");
  return (
    <AuthShell
      eyebrow="Account"
      title="Sign In"
      subtitle="Welcome back. Sign in to track orders, save your details and check out faster."
    >
      <LoginForm />
    </AuthShell>
  );
}
