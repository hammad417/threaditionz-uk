import { logout } from "app/account/actions";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="inline-flex items-center justify-center border border-gold/40 px-6 py-3 text-xs uppercase tracking-[0.2em] text-charcoal transition-colors hover:border-gold hover:bg-gold hover:text-white"
      >
        Sign Out
      </button>
    </form>
  );
}
