import Footer from "components/layout/footer";
import Prose from "components/prose";

export const metadata = {
  title: "Terms & Conditions",
  description:
    "The terms governing your use of threaditionz.co.uk and purchases of Threaditionz silk accessories.",
  alternates: { canonical: "/terms-conditions" },
};

// NOTE (for the team): starter template — have it reviewed by legal counsel and
// update the contact email / company details before relying on it.
const html = `
<p>These Terms &amp; Conditions govern your use of threaditionz.co.uk and your purchase of products from <strong>Threaditionz</strong> ("we", "us", "our"). By using our website or placing an order, you agree to these terms.</p>

<h2>Products</h2>
<p>Our pieces are made from 100% silk and hand-finished. Because each item is crafted by hand, slight variations in print placement, colour and finish are natural and are not defects. Product images are representative; on-screen colours may vary slightly from the physical item.</p>

<h2>Orders &amp; acceptance</h2>
<p>Your order is an offer to purchase. A contract is formed only when we send you a confirmation that your order has been dispatched. We may decline or cancel an order — for example if an item is out of stock or a pricing error occurs — and will refund any payment taken.</p>

<h2>Pricing &amp; payment</h2>
<p>Prices are shown at checkout and include applicable taxes where stated. Payment is taken at the time of order through our secure payment providers. We make every effort to ensure prices are accurate but reserve the right to correct errors.</p>

<h2>Shipping &amp; delivery</h2>
<p>We aim to dispatch orders promptly. Delivery times are estimates and not guaranteed. Risk in the goods passes to you on delivery. Any customs duties or import taxes on international orders are the responsibility of the recipient.</p>

<h2>Returns &amp; refunds</h2>
<p>If you are not completely satisfied, you may return unused items in their original condition within the period stated on our store, in line with your statutory rights under UK consumer law. Refunds are issued to the original payment method once the return is received and inspected.</p>

<h2>Intellectual property</h2>
<p>All content on this site — including designs, prints, photography, logos and text — is owned by or licensed to Threaditionz and may not be used without our written permission.</p>

<h2>Acceptable use</h2>
<p>You agree not to misuse the website, attempt to gain unauthorised access, or use it for any unlawful purpose.</p>

<h2>Limitation of liability</h2>
<p>Nothing in these terms limits liability that cannot be excluded by law. Subject to that, we are not liable for indirect or consequential loss, and our total liability is limited to the value of your order.</p>

<h2>Governing law</h2>
<p>These terms are governed by the laws of England and Wales, and disputes are subject to the exclusive jurisdiction of its courts. Your statutory rights as a consumer are unaffected.</p>

<h2>Contact us</h2>
<p>Questions about these terms? Email <a href="mailto:info@threaditionz.co.uk">info@threaditionz.co.uk</a> or use our <a href="/contact">contact page</a>.</p>
`;

export default function TermsConditionsPage() {
  return (
    <>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <span className="eyebrow">Threaditionz</span>
        <h1 className="mt-3 font-heading text-4xl text-foreground lg:text-5xl">
          Terms &amp; Conditions
        </h1>
        <div className="gold-divider mt-4" />
        <Prose className="mt-8 max-w-none text-foreground" html={html} />
        <p className="mt-10 text-sm italic text-muted-foreground">
          Last updated: 31 May 2026.
        </p>
      </div>
      <Footer />
    </>
  );
}
