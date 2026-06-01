import Footer from "components/layout/footer";
import WishlistGrid from "components/wishlist/wishlist-grid";

export const metadata = {
  title: "Wishlist",
  description: "Your saved Threaditionz silk accessories.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/wishlist" },
};

export default function WishlistPage() {
  return (
    <>
      <div className="mx-auto max-w-(--breakpoint-2xl) px-4 py-12">
        <span className="eyebrow">Threaditionz</span>
        <h1 className="mt-3 font-heading text-3xl text-foreground lg:text-4xl">
          Wishlist
        </h1>
        <div className="gold-divider mt-4" />
        <div className="mt-8">
          <WishlistGrid />
        </div>
      </div>
      <Footer />
    </>
  );
}
