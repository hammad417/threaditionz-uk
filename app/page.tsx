import Editorial from "components/home/editorial";
import { FeaturedCollections } from "components/home/featured-collections";
import FromTheJournal from "components/home/from-the-journal";
import Hero from "components/home/hero";
import OccasionGifting from "components/home/occasion-gifting";
import { TrendingEdit } from "components/home/trending-edit";
import Footer from "components/layout/footer";
import { seoAlternates } from "lib/utils";

export const metadata = {
  title: {
    absolute:
      "Threaditionz — Hand-Finished Silk Pocket Squares, Cravats & Scarves",
  },
  description:
    "Hand-finished 100% silk pocket squares, cravats and scarves, crafted in England for the modern gentleman.",
  alternates: seoAlternates("/"),
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

      <TrendingEdit eyebrow="Trending Now" title="The Gift Edit" />

      <FromTheJournal />

      <Editorial />

      <Footer />
    </>
  );
}
