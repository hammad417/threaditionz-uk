import { Carousel } from "components/carousel";
import Editorial from "components/home/editorial";
import { FeaturedCollections } from "components/home/featured-collections";
import Hero from "components/home/hero";
import OccasionGifting from "components/home/occasion-gifting";
import Footer from "components/layout/footer";

export const metadata = {
  title: {
    absolute:
      "Threaditionz — Hand-Finished Silk Pocket Squares, Cravats & Scarves",
  },
  description:
    "Hand-finished 100% silk pocket squares, cravats and scarves, crafted in England for the modern gentleman.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />

      <FeaturedCollections eyebrow="Curated" title="Shop the Collections" />

      <OccasionGifting />

      <Carousel eyebrow="Just Arrived" title="New This Season" />

      <Editorial />

      <Footer />
    </>
  );
}
