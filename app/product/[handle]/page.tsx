import Footer from "components/layout/footer";
import { Gallery } from "components/product/gallery";
import { ProductDescription } from "components/product/product-description";
import { ProductDetails } from "components/product/product-details";
import RecentlyViewed from "components/product/recently-viewed";
import { Reviews } from "components/product/reviews";
import StickyBuyBar from "components/product/sticky-buy-bar";
import { TrackViewContent } from "components/product/track-view-content";
import { ProductCard } from "components/grid/product-card";
import { HIDDEN_PRODUCT_TAG } from "lib/constants";
import { getProduct, getProductRecommendations } from "lib/shopify";
import { metafieldMap, parseFaq } from "lib/shopify/metafields";
import type { Image } from "lib/shopify/types";
import { buildBreadcrumbJsonLd, buildProductJsonLd } from "lib/structured-data";
import { metaDescription } from "lib/utils";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: metaDescription(product.seo.description || product.description),
    alternates: { canonical: `/product/${product.handle}` },
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt,
            },
          ],
        }
      : null,
  };
}

export default async function ProductPage(props: {
  params: Promise<{ handle: string }>;
}) {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const productJsonLd = buildProductJsonLd(product);

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "" },
    { name: "Shop", path: "/search" },
    { name: product.title, path: `/product/${product.handle}` },
  ]);

  const faqs = parseFaq(metafieldMap(product.metafields).faq);
  const faqJsonLd = faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}

      {/* Product Open Graph (Pinterest Rich Pins / Facebook & shopping previews) */}
      <meta property="og:type" content="product" />
      <meta
        property="product:price:amount"
        content={product.priceRange.minVariantPrice.amount}
      />
      <meta
        property="product:price:currency"
        content={product.priceRange.minVariantPrice.currencyCode}
      />
      <meta
        property="product:availability"
        content={product.availableForSale ? "in stock" : "out of stock"}
      />
      <meta property="product:condition" content="new" />
      <meta property="product:brand" content="Threaditionz" />

      <TrackViewContent product={product} />

      <div className="mx-auto max-w-(--breakpoint-2xl) px-4 py-10">
        {/* Breadcrumb trail */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          <Link href="/" className="hover:text-gold">
            Home
          </Link>
          <span className="mx-2 text-gold/50">/</span>
          <Link href="/search" className="hover:text-gold">
            Shop
          </Link>
          <span className="mx-2 text-gold/50">/</span>
          <span className="text-charcoal">{product.title}</span>
        </nav>

        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          <div className="h-full w-full basis-full lg:basis-3/5">
            <Suspense
              fallback={
                <div className="relative aspect-square h-full max-h-[600px] w-full overflow-hidden" />
              }
            >
              <Gallery
                images={product.images.slice(0, 8).map((image: Image) => ({
                  src: image.url,
                  altText: image.altText,
                }))}
              />
            </Suspense>
          </div>

          <div className="basis-full lg:basis-2/5">
            <Suspense fallback={null}>
              <ProductDescription product={product} />
            </Suspense>
            <ProductDetails product={product} />
          </div>
        </div>

        <Reviews product={product} />
        <CompleteTheSet handle={product.handle} />
        <RelatedProducts id={product.id} />
        <RecentlyViewed
          current={{
            handle: product.handle,
            title: product.title,
            image: product.featuredImage?.url,
            amount: product.priceRange.maxVariantPrice.amount,
            currencyCode: product.priceRange.maxVariantPrice.currencyCode,
          }}
        />
      </div>
      <div className="h-24 md:hidden" aria-hidden />
      <StickyBuyBar product={product} />
      <Footer />
    </>
  );
}

// The catalogue is organised in design families sharing a handle prefix
// (e.g. x-silk-cravat / x-silk-pocket-square / x-silk-scarf / x-…-set), so the
// same design's other formats are derivable from the current handle.
const FAMILY_SUFFIXES: Record<string, string[]> = {
  cravat: ["-silk-cravat", "-cravat"],
  pocketSquare: ["-silk-pocket-square", "-pocket-square"],
  scarf: ["-silk-scarf", "-scarf"],
  set: ["-silk-scarf-pocket-square-set", "-scarf-pocket-square-set"],
};

function parseFamily(handle: string): { kind: string; base: string } | null {
  const all = Object.entries(FAMILY_SUFFIXES)
    .flatMap(([kind, sufs]) => sufs.map((s) => ({ kind, suffix: s })))
    .sort((a, b) => b.suffix.length - a.suffix.length);
  for (const { kind, suffix } of all) {
    if (handle.endsWith(suffix)) {
      return { kind, base: handle.slice(0, -suffix.length) };
    }
  }
  return null;
}

async function CompleteTheSet({ handle }: { handle: string }) {
  const family = parseFamily(handle);
  if (!family) return null;

  const siblings = (
    await Promise.all(
      Object.entries(FAMILY_SUFFIXES)
        .filter(([kind]) => kind !== family.kind)
        .map(async ([, suffixes]) => {
          for (const suffix of suffixes) {
            const sibling = await getProduct(`${family.base}${suffix}`);
            if (sibling) return sibling;
          }
          return null;
        }),
    )
  ).filter((p) => p !== null);

  if (!siblings.length) return null;

  return (
    <div className="pt-16">
      <div className="mb-8">
        <span className="eyebrow">Complete the Set</span>
        <p className="mt-2 text-sm text-muted-foreground">
          The same design, in its other formats.
        </p>
        <div className="gold-divider mt-3" />
      </div>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {siblings.map((product) => (
          <li
            key={product.handle}
            className="w-2/3 flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <ProductCard
              product={product}
              sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) return null;

  return (
    <div className="py-16">
      <div className="mb-8">
        <span className="eyebrow">You May Also Like</span>
        <div className="gold-divider mt-3" />
      </div>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product) => (
          <li
            key={product.handle}
            className="w-2/3 flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <ProductCard
              product={product}
              sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
