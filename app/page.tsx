import { Carousel } from "components/carousel";
import { ThreeItemGrid } from "components/grid/three-items";
import Editorial from "components/home/editorial";
import Hero from "components/home/hero";
import Footer from "components/layout/footer";

export const metadata = {
  description:
    "Hand-finished 100% silk pocket squares, cravats and scarves, crafted in England for the modern gentleman.",
  openGraph: {
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Headings render only when their hidden Shopify collection has items. */}
      <ThreeItemGrid eyebrow="Curated" title="Featured Collection" />
      <Carousel eyebrow="Just Arrived" title="New This Season" />

      <Editorial />

      <Footer />
    </>
  );
}
