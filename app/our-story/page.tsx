import ContentPage from "components/content-page";

export const metadata = {
  title: "Our Story",
  description:
    "The Threaditionz story — hand-finished 100% silk accessories that carry heritage motifs into modern menswear.",
  alternates: { canonical: "/our-story" },
};

const html = `
<p>Threaditionz was founded on a simple belief: that the smallest details finish the look. A silk pocket square, a well-tied cravat, a scarf with a story — these are the touches that turn an outfit into a signature.</p>

<h2>Heritage, woven in</h2>
<p>Our designs draw on a rich visual heritage — Ajrak block-prints, Mughal motifs, calligraphy and the poetry of Ghalib — reimagined for the modern gentleman. Each print is chosen to carry meaning, not just colour.</p>

<h2>Made by hand</h2>
<p>We work in pure mulberry silk and finish every piece by hand, with rolled edges and careful attention to drape and feel. It's slower, and it shows — in the weight of the silk, the depth of the colour and the way a piece sits.</p>

<h2>For the discerning gentleman</h2>
<p>From everyday refinement to weddings, Eid and occasions worth remembering, Threaditionz is made to be worn, gifted and kept. Heritage craftsmanship, made to be remembered.</p>
`;

export default function Page() {
  return <ContentPage title="Our Story" html={html} />;
}
