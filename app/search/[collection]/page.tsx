import { getCollection, getCollectionProducts } from "lib/shopify";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import CollectionFaqs from "components/collection/collection-faqs";
import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import { getCollectionFaqs } from "lib/collection-faqs";
import { defaultSort, sorting } from "lib/constants";

export async function generateMetadata(props: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  // Shopify SEO titles already include the brand, so use them verbatim (absolute)
  // to avoid the "… | Threaditionz UK | Threaditionz" double-branding from the template.
  const seoTitle = collection.seo?.title;

  return {
    title: seoTitle ? { absolute: seoTitle } : collection.title,
    description:
      collection.seo?.description ||
      collection.description ||
      `${collection.title} — 100% silk men's accessories, hand-finished in England.`,
    alternates: { canonical: `/search/${params.collection}` },
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

  const faqs = collection
    ? getCollectionFaqs(params.collection, collection.title)
    : [];

  return (
    <section>
      {collection ? (
        <div className="mb-12 text-center">
          <span className="eyebrow">The Collection</span>
          <h1 className="mt-3 font-heading text-3xl text-foreground lg:text-5xl">
            {collection.title}
          </h1>
          <div className="gold-divider gold-divider-center mt-5" />
          {collection.description ? (
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {collection.description}
            </p>
          ) : null}
          {products.length > 0 ? (
            <p className="mt-5 text-xs uppercase tracking-[0.25em] text-gold/80">
              {products.length} {products.length === 1 ? "Piece" : "Pieces"}
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

      {collection ? (
        <CollectionFaqs faqs={faqs} title={collection.title} />
      ) : null}
    </section>
  );
}
