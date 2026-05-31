import ContentPage from "components/content-page";

export const metadata = {
  title: "FAQs",
  description:
    "Frequently asked questions about Threaditionz silk pocket squares, cravats and scarves — materials, care, shipping, returns and gifting.",
  alternates: { canonical: "/faqs" },
};

const FAQS: { q: string; a: string }[] = [
  {
    q: "What are your accessories made from?",
    a: "Every Threaditionz piece is made from 100% silk and hand-finished with rolled edges for a premium drape and feel.",
  },
  {
    q: "How do I care for silk?",
    a: "Dry clean, or gentle cold hand wash where indicated. Don't wring; dry flat away from sunlight and cool-iron on the reverse if needed.",
  },
  {
    q: "Will the colours match the photos exactly?",
    a: "We photograph our pieces to be as true as possible, but because each item is hand-finished, slight natural variation in colour, print placement and finish is normal — and part of the character.",
  },
  {
    q: "How long does delivery take?",
    a: "UK orders typically arrive in 2–4 business days and international orders in 5–14 business days. You'll receive tracking when your order ships. See our Shipping & Returns page for details.",
  },
  {
    q: "What is your returns policy?",
    a: "You can return unused items in their original condition within 14 days of delivery for a refund or exchange, in line with your statutory rights.",
  },
  {
    q: "Do you offer gift sets and gift wrapping?",
    a: "Yes — our silk scarf-and-pocket-square gift sets arrive beautifully presented, making them a considered gift for the discerning gentleman.",
  },
];

const html =
  `<p>Can't find what you're looking for? <a href="/contact">Get in touch</a> and we'll be glad to help.</p>` +
  FAQS.map((f) => `<h2>${f.q}</h2><p>${f.a}</p>`).join("");

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ContentPage title="Frequently Asked Questions" html={html} />
    </>
  );
}
