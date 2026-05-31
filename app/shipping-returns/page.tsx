import ContentPage from "components/content-page";

export const metadata = {
  title: "Shipping & Returns",
  description:
    "Threaditionz delivery times, shipping costs and our hassle-free returns policy for silk pocket squares, cravats and scarves.",
  alternates: { canonical: "/shipping-returns" },
};

// Starter content — update timeframes/costs to match your fulfilment.
const html = `
<h2>Shipping</h2>
<p>Each order is carefully packed and dispatched from our studio. Orders are typically processed within 1–2 business days.</p>
<ul>
  <li><strong>UK delivery</strong> — standard 2–4 business days; express options available at checkout.</li>
  <li><strong>International delivery</strong> — typically 5–14 business days depending on destination. Any customs duties or import taxes are the responsibility of the recipient.</li>
  <li>Shipping costs are calculated at checkout based on destination and method.</li>
</ul>
<p>You'll receive a confirmation email with tracking as soon as your order ships.</p>

<h2>Returns &amp; exchanges</h2>
<p>We want you to love your Threaditionz piece. If it isn't right, you may return unused items in their original condition and packaging within 14 days of delivery for a refund or exchange, in line with your statutory rights.</p>
<ul>
  <li>Items must be unworn, unwashed and with any tags intact.</li>
  <li>To start a return, contact us via our <a href="/contact">contact page</a> with your order number.</li>
  <li>Refunds are issued to the original payment method once we receive and inspect the return.</li>
  <li>For hygiene reasons, gift sets must be returned complete and unopened where sealed.</li>
</ul>

<h2>Faulty or incorrect items</h2>
<p>If your order arrives faulty or incorrect, please contact us within 14 days and we'll put it right at no cost to you.</p>
`;

export default function Page() {
  return <ContentPage title="Shipping & Returns" html={html} />;
}
