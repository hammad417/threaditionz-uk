import ContentPage from "components/content-page";

export const metadata = {
  title: "Size Guide",
  description:
    "Dimensions and styling guidance for Threaditionz silk pocket squares, cravats and scarves.",
  alternates: { canonical: "/size-guide" },
};

const html = `
<p>Our accessories are made from 100% silk and hand-finished with rolled edges. Exact dimensions are listed on each product page; the typical sizes are below.</p>

<h2>Pocket squares</h2>
<p>Approximately <strong>30 × 30 cm (12 × 12")</strong> — the classic size, ideal for any breast pocket. Try a presidential (flat) fold for formal looks, or a puff fold for relaxed elegance.</p>

<h2>Cravats &amp; ascots</h2>
<p>Generously cut for a comfortable knot at the collar. Wear with an open-collar shirt under a jacket; a classic ascot knot or a draped-and-pinned style both work beautifully.</p>

<h2>Scarves</h2>
<p>Long-format silk scarves, finished with fringing on selected styles — long enough to drape, loop or knot over a jacket or overcoat.</p>

<h2>Care</h2>
<ul>
  <li>Dry clean only, or gentle hand wash in cold water where indicated on the product.</li>
  <li>Do not wring; lay flat or hang to dry away from direct sunlight.</li>
  <li>Cool iron on the reverse if needed; store flat or loosely rolled.</li>
</ul>
<p>Because each piece is hand-finished, slight natural variation in size, print placement and finish is normal.</p>
`;

export default function Page() {
  return <ContentPage title="Size Guide" html={html} />;
}
