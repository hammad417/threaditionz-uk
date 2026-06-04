import { metafieldMap, parseReviewRating } from "lib/shopify/metafields";
import type { Product } from "lib/shopify/types";
import { StarRating } from "./star-rating";

// Aggregate review summary, anchored at #reviews (the rating row links here).
// Driven solely by the reviews.rating / reviews.rating_count metafields a
// reviews app populates — renders nothing, and reserves no space, until then.
export function Reviews({ product }: { product: Product }) {
  const rating = parseReviewRating(metafieldMap(product.metafields));
  if (!rating) return null;

  return (
    <section id="reviews" className="scroll-mt-24 py-16">
      <div className="mb-8">
        <span className="eyebrow">Customer Reviews</span>
        <div className="gold-divider mt-3" />
      </div>

      <div className="flex flex-col items-center gap-3 border border-gold/20 bg-cream/40 px-6 py-10 text-center">
        <span className="font-heading text-5xl text-foreground">
          {rating.value.toFixed(1)}
        </span>
        <StarRating value={rating.value} starClassName="h-5 w-5" />
        <p className="text-sm text-muted-foreground">
          Based on {rating.count}{" "}
          {rating.count === 1 ? "verified review" : "verified reviews"}
        </p>
      </div>
    </section>
  );
}
