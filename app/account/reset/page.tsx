import AuthShell from "components/account/auth-shell";
import ResetForm from "components/account/reset-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your Threaditionz account password.",
  robots: { index: false, follow: true },
};

export default function ResetPage() {
  return (
    <AuthShell
      eyebrow="Account"
      title="Reset Password"
      subtitle="Enter your email and we'll send you a link to reset your password."
    >
      <ResetForm />
    </AuthShell>
  );
}
