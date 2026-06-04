import { AddToCart } from "components/cart/add-to-cart";
import { BuyNowButton } from "components/cart/buy-now";
import Prose from "components/prose";
import { WishlistButton } from "components/wishlist/wishlist-button";
import { Product } from "lib/shopify/types";
import Link from "next/link";
import { DeliveryEstimate } from "./delivery-estimate";
import { LowStock } from "./low-stock";
import { PriceBlock } from "./price-block";
import { QuantitySelector } from "./quantity-selector";
import { RatingRow } from "./rating-row";
import { TrustBadges } from "./trust-badges";
import { VariantSelector } from "./variant-selector";

export function ProductDescription({ product }: { product: Product }) {
  const hasSizeOption = product.options.some((o) => /size/i.test(o.name));

  return (
    <>
      {/* Title, rating, price */}
      <div className="mb-6 flex flex-col gap-3 border-b border-gold/20 pb-6">
        <h1 className="font-heading text-4xl leading-tight text-foreground lg:text-5xl">
          {product.title}
        </h1>
        <RatingRow product={product} />
        <PriceBlock product={product} />
        <p className="text-xs text-muted-foreground">
          Tax included. Shipping calculated at checkout.
        </p>
      </div>

      {/* Variant selection */}
      <div className="flex items-center justify-between">
        <span className="sr-only">Options</span>
        {hasSizeOption ? (
          <Link
            href="/size-guide"
            prefetch={true}
            className="ml-auto mb-4 inline-flex items-center gap-1 text-xs uppercase tracking-[0.15em] text-muted-foreground underline-offset-4 transition-colors hover:text-gold hover:underline"
          >
            Size Guide
            <span aria-hidden="true">→</span>
          </Link>
        ) : null}
      </div>
      <VariantSelector options={product.options} variants={product.variants} />

      <LowStock product={product} />

      {/* Quantity + primary actions */}
      <div className="mt-6">
        <QuantitySelector max={product.totalInventory} />
        <div className="flex flex-col gap-3">
          <AddToCart product={product} />
          <BuyNowButton product={product} />
        </div>
      </div>

      <DeliveryEstimate />

      <div className="mt-4">
        <WishlistButton
          item={{
            handle: product.handle,
            title: product.title,
            image: product.featuredImage?.url,
            amount: product.priceRange.maxVariantPrice.amount,
            currencyCode: product.priceRange.maxVariantPrice.currencyCode,
          }}
        />
      </div>

      {/* Reassurance + payment trust */}
      <TrustBadges />

      {/* Marketing description */}
      {product.descriptionHtml ? (
        <Prose
          className="mt-8 text-sm leading-relaxed text-charcoal"
          html={product.descriptionHtml}
        />
      ) : null}
    </>
  );
}
