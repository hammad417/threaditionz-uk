import ContentPage from "components/content-page";

export const metadata = {
  title: "Sustainability",
  description:
    "How Threaditionz approaches responsible craftsmanship — pure silk, hand-finishing, and a made-to-last philosophy.",
  alternates: { canonical: "/sustainability" },
};

const html = `
<p>We believe the most sustainable accessory is one that's made well and kept for years. Our approach is rooted in quality, longevity and respect for the craft.</p>

<h2>Natural materials</h2>
<p>We work in 100% silk — a natural, renewable and biodegradable fibre — rather than synthetics. Fewer, better pieces, made to last.</p>

<h2>Hand-finished, not mass-produced</h2>
<p>Each piece is hand-finished in small runs, reducing waste and ensuring care goes into every item. We'd rather make something worth keeping than something disposable.</p>

<h2>Considered packaging</h2>
<p>We aim to keep packaging minimal and recyclable, protecting your order without excess.</p>

<h2>Made to be remembered</h2>
<p>Heirloom-minded design is central to how we work: timeless prints and durable construction so your Threaditionz pieces can be worn, gifted and passed on.</p>

<p><em>We're always working to do better — if you have questions about our practices, please <a href="/contact">get in touch</a>.</em></p>
`;

export default function Page() {
  return <ContentPage title="Sustainability" html={html} />;
}
