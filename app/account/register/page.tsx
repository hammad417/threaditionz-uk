import AuthShell from "components/account/auth-shell";
import RegisterForm from "components/account/register-form";
import { getCurrentCustomer } from "lib/customer-session";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a Threaditionz account to track orders, save your details and check out faster.",
  robots: { index: false, follow: true },
};

export default async function RegisterPage() {
  if (await getCurrentCustomer()) redirect("/account");
  return (
    <AuthShell
      eyebrow="Account"
      title="Create Account"
      subtitle="Join Threaditionz to track your orders, save your details and reorder your favourites in a click."
    >
      <RegisterForm />
    </AuthShell>
  );
}
