import { metafieldMap, parseReviewRating } from "lib/shopify/metafields";
import type { Product } from "lib/shopify/types";
import { StarRating } from "./star-rating";

// Compact "★★★★☆ 4.6 (128 reviews)" row shown beneath the title. Renders nothing
// until a reviews app populates reviews.rating / reviews.rating_count — ratings
// are never fabricated. Anchors to the on-page reviews section.
export function RatingRow({ product }: { product: Product }) {
  const rating = parseReviewRating(metafieldMap(product.metafields));
  if (!rating) return null;

  return (
    <a
      href="#reviews"
      className="group inline-flex items-center gap-2"
      aria-label={`Rated ${rating.value} out of 5 from ${rating.count} reviews. Read reviews.`}
    >
      <StarRating value={rating.value} />
      <span className="text-sm font-medium text-foreground">
        {rating.value.toFixed(1)}
      </span>
      <span className="text-sm text-muted-foreground underline-offset-4 group-hover:text-gold group-hover:underline">
        {rating.count} {rating.count === 1 ? "review" : "reviews"}
      </span>
    </a>
  );
}
