import { getCollection, getCollectionProducts } from "lib/shopify";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import { defaultSort, sorting } from "lib/constants";

export async function generateMetadata(props: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description ||
      collection.description ||
      `${collection.title} products`,
  };
}

export default async function CategoryPage(props: {
  params: Promise<{ collection: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;
  const [collection, products] = await Promise.all([
    getCollection(params.collection),
    getCollectionProducts({
      collection: params.collection,
      sortKey,
      reverse,
    }),
  ]);

  return (
    <section>
      {collection ? (
        <div className="mb-8">
          <span className="eyebrow">Collection</span>
          <h1 className="mt-3 font-heading text-3xl text-foreground lg:text-4xl">
            {collection.title}
          </h1>
          <div className="gold-divider mt-4" />
          {collection.description ? (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {collection.description}
            </p>
          ) : null}
        </div>
      ) : null}

      {products.length === 0 ? (
        <p className="py-3 text-lg text-muted-foreground">{`No products found in this collection`}</p>
      ) : (
        <Grid className="grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      )}
    </section>
  );
}
