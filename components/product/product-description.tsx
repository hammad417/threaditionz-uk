import { AddToCart } from "components/cart/add-to-cart";
import { BuyNowButton } from "components/cart/buy-now";
import Price from "components/price";
import Prose from "components/prose";
import { WishlistButton } from "components/wishlist/wishlist-button";
import { Product } from "lib/shopify/types";
import { LowStock } from "./low-stock";
import { VariantSelector } from "./variant-selector";

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b border-gold/20 pb-6">
        <h1 className="mb-3 font-heading text-4xl leading-tight text-foreground lg:text-5xl">
          {product.title}
        </h1>
        <div className="font-heading text-2xl text-gold">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
            currencyCodeClassName="text-base text-muted-foreground"
          />
        </div>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      <LowStock product={product} />
      {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-relaxed text-charcoal"
          html={product.descriptionHtml}
        />
      ) : null}
      <div className="flex flex-col gap-3">
        <AddToCart product={product} />
        <BuyNowButton product={product} />
      </div>

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

      <ul className="mt-5 space-y-1.5 text-xs text-muted-foreground">
        <li>Hand-finished 100% silk</li>
        <li>Ships in 1–2 business days</li>
        <li>Free returns within 14 days</li>
        <li>Secure checkout</li>
      </ul>
    </>
  );
}
