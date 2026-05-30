import { GridTileImage } from "components/grid/tile";
import { getCollectionProducts } from "lib/shopify";
import type { Product } from "lib/shopify/types";
import Link from "next/link";

function ThreeItemGridItem({
  item,
  size,
  priority,
}: {
  item: Product;
  size: "full" | "half";
  priority?: boolean;
}) {
  return (
    <div
      className={
        size === "full"
          ? "md:col-span-4 md:row-span-2"
          : "md:col-span-2 md:row-span-1"
      }
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${item.handle}`}
        prefetch={true}
      >
        <GridTileImage
          src={item.featuredImage.url}
          fill
          sizes={
            size === "full"
              ? "(min-width: 768px) 66vw, 100vw"
              : "(min-width: 768px) 33vw, 100vw"
          }
          priority={priority}
          alt={item.title}
          label={{
            position: size === "full" ? "center" : "bottom",
            title: item.title as string,
            amount: item.priceRange.maxVariantPrice.amount,
            currencyCode: item.priceRange.maxVariantPrice.currencyCode,
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title?: string;
} = {}) {
  // Collections that start with `hidden-*` are hidden from the search page.
  const homepageItems = await getCollectionProducts({
    collection: "hidden-homepage-featured-items",
  });

  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <>
      {title ? (
        <div className="mx-auto max-w-(--breakpoint-2xl) px-4 pt-16 pb-6 text-center lg:px-8">
          {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
          <div className="gold-divider gold-divider-center mt-4" />
          <h2 className="mt-5 font-heading text-3xl text-foreground lg:text-4xl">
            {title}
          </h2>
        </div>
      ) : null}
      <section className="mx-auto grid max-w-(--breakpoint-2xl) gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
        <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
        <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
        <ThreeItemGridItem size="half" item={thirdProduct} />
      </section>
    </>
  );
}
