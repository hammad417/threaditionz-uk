import Footer from "components/layout/footer";
import Prose from "components/prose";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How Threaditionz collects, uses, shares and protects your personal data when you shop with us.",
  alternates: { canonical: "/privacy-policy" },
};

// NOTE (for the team): starter template — have it reviewed by legal counsel and
// update the contact email / company details before relying on it.
const html = `
<p>This Privacy Policy explains how <strong>Threaditionz</strong> ("we", "us", "our") collects, uses, shares and protects your personal data when you visit threaditionz.co.uk or place an order with us. We are committed to protecting your privacy and complying with the UK GDPR and the Data Protection Act 2018.</p>

<h2>Information we collect</h2>
<ul>
  <li><strong>Order &amp; account information</strong> — your name, billing and shipping address, email address and phone number.</li>
  <li><strong>Payment information</strong> — processed securely by our payment providers; we do not store full card details.</li>
  <li><strong>Usage data</strong> — pages viewed, items added to cart, device and browser information, collected via cookies and similar technologies.</li>
  <li><strong>Communications</strong> — messages you send us via email or our contact form.</li>
</ul>

<h2>How we use your information</h2>
<ul>
  <li>To process, fulfil and deliver your orders and provide customer support.</li>
  <li>To manage your account and send order and shipping confirmations.</li>
  <li>To improve our products, website and service.</li>
  <li>To send marketing communications where you have consented (you can opt out at any time).</li>
  <li>To prevent fraud and meet our legal obligations.</li>
</ul>

<h2>Legal bases</h2>
<p>We rely on the performance of a contract (to fulfil your orders), your consent (for marketing and non-essential cookies), our legitimate interests (to improve and secure our service) and compliance with legal obligations.</p>

<h2>Cookies</h2>
<p>We use cookies and similar technologies to operate the store, remember your cart, understand site usage and (with consent) personalise marketing. You can control cookies through your browser settings.</p>

<h2>Sharing your information</h2>
<p>We share data only with trusted providers who help us run our business — including our e-commerce platform (Shopify), payment processors, and delivery partners — and only as needed to provide the service. We may also disclose information where required by law. We do not sell your personal data.</p>

<h2>Data retention</h2>
<p>We keep your personal data only as long as necessary for the purposes set out above, including to meet accounting, tax and other legal requirements.</p>

<h2>Your rights</h2>
<p>You have the right to access, correct, delete or restrict the processing of your personal data, to object to processing, and to data portability. To exercise these rights, contact us using the details below. You may also lodge a complaint with the UK Information Commissioner's Office (ICO).</p>

<h2>Security &amp; international transfers</h2>
<p>We take appropriate technical and organisational measures to protect your data. Where data is processed outside the UK/EEA, we ensure appropriate safeguards are in place.</p>

<h2>Changes to this policy</h2>
<p>We may update this policy from time to time. The "last updated" date below reflects the latest version.</p>

<h2>Contact us</h2>
<p>For any privacy questions or to exercise your rights, please email <a href="mailto:info@threaditionz.co.uk">info@threaditionz.co.uk</a> or use our <a href="/contact">contact page</a>.</p>
`;

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <span className="eyebrow">Threaditionz</span>
        <h1 className="mt-3 font-heading text-4xl text-foreground lg:text-5xl">
          Privacy Policy
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
