import Price from "components/price";
import type { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";

const DEFAULT_SIZES =
  "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw";

// Sitewide premium product card: clean portrait image with a hover image-swap
// to the second shot, subtle status badges, and the title/price set beneath the
// frame in an editorial style. Server component — the hover is pure CSS.
export function ProductCard({
  product,
  priority,
  sizes = DEFAULT_SIZES,
}: {
  product: Product;
  priority?: boolean;
  sizes?: string;
}) {
  const primary = product.featuredImage?.url;
  const secondary = product.images?.find(
    (img) => img.url && img.url !== primary,
  )?.url;
  const isNew = product.tags?.some((t) => /new/i.test(t));
  const soldOut = product.availableForSale === false;

  return (
    <Link
      href={`/product/${product.handle}`}
      prefetch={true}
      className="group block h-full"
    >
      <div className="relative aspect-[4/5] overflow-hidden border border-gold/15 bg-cream">
        {primary ? (
          <Image
            src={primary}
            alt={product.featuredImage?.altText || product.title}
            fill
            sizes={sizes}
            priority={priority}
            className={`object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
              secondary ? "group-hover:opacity-0" : ""
            }`}
          />
        ) : null}
        {secondary ? (
          <Image
            src={secondary}
            alt=""
            aria-hidden
            fill
            sizes={sizes}
            className="object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
          />
        ) : null}

        {isNew && !soldOut ? (
          <span className="absolute left-3 top-3 z-10 bg-midnight/85 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-gold backdrop-blur-sm">
            New In
          </span>
        ) : null}
        {soldOut ? (
          <span className="absolute left-3 top-3 z-10 bg-charcoal/85 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-cream backdrop-blur-sm">
            Sold Out
          </span>
        ) : null}

        {/* Gold frame that warms on hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 border border-gold/0 transition-colors duration-500 group-hover:border-gold/40"
        />
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-3 px-0.5">
        <h3 className="line-clamp-1 font-heading text-sm text-foreground transition-colors group-hover:text-gold lg:text-base">
          {product.title}
        </h3>
        <Price
          className="flex-none font-heading text-sm text-gold"
          amount={product.priceRange.maxVariantPrice.amount}
          currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          currencyCodeClassName="hidden"
        />
      </div>
    </Link>
  );
}
