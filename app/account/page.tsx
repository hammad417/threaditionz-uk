import LogoutButton from "components/account/logout-button";
import Footer from "components/layout/footer";
import Price from "components/price";
import { getCurrentCustomer } from "lib/customer-session";
import type { CustomerOrder } from "lib/shopify/customer";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "My Account",
  robots: { index: false, follow: true },
};

function statusLabel(value: string | null) {
  if (!value) return "—";
  return value
    .toLowerCase()
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function OrderRow({ order }: { order: CustomerOrder }) {
  const date = new Date(order.processedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const items = order.lineItems
    .map((l) => `${l.quantity}× ${l.title}`)
    .join(", ");

  return (
    <div className="flex flex-col gap-3 border-t border-gold/15 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="flex items-baseline gap-3">
          <span className="font-heading text-base text-foreground">
            Order #{order.orderNumber}
          </span>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
        <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
          {items || "—"}
        </p>
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs uppercase tracking-[0.12em] text-charcoal/70">
          <span>Payment: {statusLabel(order.financialStatus)}</span>
          <span>Fulfilment: {statusLabel(order.fulfillmentStatus)}</span>
        </div>
      </div>
      <div className="flex flex-none items-center gap-5">
        <Price
          className="font-heading text-base text-gold"
          amount={order.currentTotalPrice.amount}
          currencyCode={order.currentTotalPrice.currencyCode}
          currencyCodeClassName="hidden"
        />
        <a
          href={order.statusUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs uppercase tracking-[0.15em] text-gold hover:underline"
        >
          View →
        </a>
      </div>
    </div>
  );
}

export default async function AccountPage() {
  const customer = await getCurrentCustomer();
  if (!customer) redirect("/account/login");

  const name =
    customer.firstName || customer.displayName || customer.email || "there";

  return (
    <>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="flex flex-col gap-4 border-b border-gold/15 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow">My Account</span>
            <h1 className="mt-3 font-heading text-3xl text-foreground lg:text-4xl">
              Welcome, {name}
            </h1>
            <div className="gold-divider mt-4" />
          </div>
          <LogoutButton />
        </div>

        {/* Profile */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="text-xs uppercase tracking-[0.2em] text-gold">
              Contact
            </h2>
            <p className="mt-3 text-sm text-foreground">
              {customer.firstName} {customer.lastName}
            </p>
            {customer.email ? (
              <p className="text-sm text-muted-foreground">{customer.email}</p>
            ) : null}
            {customer.phone ? (
              <p className="text-sm text-muted-foreground">{customer.phone}</p>
            ) : null}
          </div>
          <div>
            <h2 className="text-xs uppercase tracking-[0.2em] text-gold">
              Default Address
            </h2>
            {customer.defaultAddress?.formatted?.length ? (
              <address className="mt-3 text-sm not-italic leading-relaxed text-muted-foreground">
                {customer.defaultAddress.formatted.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">
                No address saved yet — you can add one at checkout.
              </p>
            )}
          </div>
        </div>

        {/* Orders */}
        <div className="mt-12">
          <h2 className="font-heading text-2xl text-foreground">
            Order History
          </h2>
          {customer.orders.length ? (
            <div className="mt-4">
              {customer.orders.map((order) => (
                <OrderRow key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <div className="mt-4 border-t border-gold/15 py-10 text-center">
              <p className="text-sm text-muted-foreground">
                You haven't placed any orders yet.
              </p>
              <Link
                href="/search"
                className="mt-5 inline-flex items-center justify-center bg-gold px-8 py-4 text-xs uppercase tracking-[0.25em] text-white transition-colors hover:bg-gold-light"
              >
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
