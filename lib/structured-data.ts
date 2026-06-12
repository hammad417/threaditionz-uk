import { BRAND, COMMERCE, ORG_ID } from "lib/brand";
import { metafieldMap, parseReviewRating } from "lib/shopify/metafields";
import type { Collection, Product } from "lib/shopify/types";
import { baseUrl } from "lib/utils";

// Centralised JSON-LD builders so Product / Collection / Breadcrumb structured
// data stays consistent and complete (returns, shipping, ratings, brand entity)
// for both rich results and generative answer engines.

// Offer-level return policy — mirrors /faqs and /shipping-returns.
const merchantReturnPolicy = {
  "@type": "MerchantReturnPolicy",
  applicableCountry: BRAND.areaServed,
  returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
  merchantReturnDays: COMMERCE.returnDays,
  returnMethod: "https://schema.org/ReturnByMail",
  returnFees: "https://schema.org/ReturnShippingFees",
};

// Free UK delivery, with handling + transit times.
const ukShippingDetails = {
  "@type": "OfferShippingDetails",
  shippingRate: {
    "@type": "MonetaryAmount",
    value: 0,
    currency: COMMERCE.currency,
  },
  shippingDestination: {
    "@type": "DefinedRegion",
    addressCountry: BRAND.areaServed,
  },
  deliveryTime: {
    "@type": "ShippingDeliveryTime",
    handlingTime: {
      "@type": "QuantitativeValue",
      minValue: COMMERCE.shippingHandlingDaysMin,
      maxValue: COMMERCE.shippingHandlingDaysMax,
      unitCode: "DAY",
    },
    transitTime: {
      "@type": "QuantitativeValue",
      minValue: COMMERCE.ukTransitDaysMin,
      maxValue: COMMERCE.ukTransitDaysMax,
      unitCode: "DAY",
    },
  },
};

// Rolling "price valid until" (end of next year) so offers never read as expired.
function priceValidUntil(): string {
  return `${new Date().getFullYear() + 1}-12-31`;
}

// Single colourway, if the product exposes one Colour option with a single value.
function singleColor(product: Product): string | undefined {
  const opt = product.options?.find((o) => /colou?r/i.test(o.name));
  return opt && opt.values.length === 1 ? opt.values[0] : undefined;
}

export function buildProductJsonLd(product: Product) {
  const map = metafieldMap(product.metafields);
  const min = product.priceRange.minVariantPrice;
  const max = product.priceRange.maxVariantPrice;
  const singlePrice = min.amount === max.amount;
  const color = singleColor(product);
  const rating = parseReviewRating(map);
  // Real stock code from Shopify where one is set; the handle is only a fallback
  // (a slug is a weak identifier for product-graph matching in shopping surfaces).
  const sku = product.variants.find((v) => v.sku)?.sku || product.handle;

  const offerBase = {
    priceCurrency: min.currencyCode,
    availability: product.availableForSale
      ? "https://schema.org/InStock"
      : "https://schema.org/OutOfStock",
    itemCondition: COMMERCE.defaultCondition,
    priceValidUntil: priceValidUntil(),
    hasMerchantReturnPolicy: merchantReturnPolicy,
    shippingDetails: ukShippingDetails,
    seller: { "@type": "Organization", "@id": ORG_ID },
    url: `${baseUrl}/product/${product.handle}`,
  };

  const offers = singlePrice
    ? { "@type": "Offer", price: min.amount, ...offerBase }
    : {
        "@type": "AggregateOffer",
        lowPrice: min.amount,
        highPrice: max.amount,
        offerCount: product.variants.length || 1,
        ...offerBase,
      };

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images?.length
      ? product.images.map((i) => i.url)
      : product.featuredImage?.url,
    sku,
    brand: { "@type": "Brand", name: BRAND.name },
    material: map["custom_material"] || COMMERCE.defaultMaterial,
    category: "Clothing Accessories",
    ...(color ? { color } : {}),
    url: `${baseUrl}/product/${product.handle}`,
    offers,
    ...(rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: rating.value,
            reviewCount: rating.count,
          },
        }
      : {}),
  };
}

type Crumb = { name: string; path: string };

export function buildBreadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${baseUrl}${c.path}`,
    })),
  };
}

// CollectionPage + embedded ItemList of the products on the page.
export function buildCollectionJsonLd({
  collection,
  products,
  path,
}: {
  collection: Collection;
  products: Product[];
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: collection.seo?.title || collection.title,
    description:
      collection.seo?.description ||
      collection.description ||
      `${collection.title} — 100% silk men's accessories, hand-finished in England.`,
    url: `${baseUrl}${path}`,
    isPartOf: { "@id": `${baseUrl}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Product",
          name: p.title,
          url: `${baseUrl}/product/${p.handle}`,
          ...(p.featuredImage?.url ? { image: p.featuredImage.url } : {}),
          offers: {
            "@type": "Offer",
            price: p.priceRange.minVariantPrice.amount,
            priceCurrency: p.priceRange.minVariantPrice.currencyCode,
            availability: p.availableForSale
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          },
        },
      })),
    },
  };
}
