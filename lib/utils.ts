import { ReadonlyURLSearchParams } from "next/navigation";

// Canonical site origin used for metadata, sitemap, robots, OG and JSON-LD.
// Prefer an explicit NEXT_PUBLIC_SITE_URL (e.g. https://threaditionz.co.uk) so these
// never point at the *.vercel.app deployment URL.
export const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

// Metadata `alternates` for an indexable page: a self-referencing canonical plus
// hreflang. Relative paths resolve against `metadataBase`
// (= NEXT_PUBLIC_SITE_URL, https://threaditionz.co.uk); the .com URL must stay
// absolute.
//
// Cross-domain duplicate-content control (added 2026-07-07): the same catalogue
// also sells on threaditionz.com. en-GB and x-default always self-reference
// .co.uk (this domain is the default experience); the generic `en` alternate
// points at the .com equivalent ONLY where the mapping is confident — the
// homepage and PDPs (.com serves products at /products/[same-handle]).
// Collections differ between the stores, and /search/*, /journal/* and static
// pages have no .com twin, so those pages emit no `en` alternate.
//
// RECIPROCITY: hreflang is only honoured when the .com pages emit matching
// return tags (en-GB → the .co.uk URL). That must be configured on the .com
// store separately — see /launch/domain/HANDOFF.md. For noindex pages, use a
// bare { canonical } instead — noindex URLs shouldn't sit in an hreflang
// cluster.
const COM_BASE = "https://www.threaditionz.com";

const comEquivalent = (path: string): string | undefined => {
  if (path === "/") return `${COM_BASE}/`;
  const product = path.match(/^\/product\/([^/]+)$/);
  if (product) return `${COM_BASE}/products/${product[1]}`;
  return undefined;
};

export const seoAlternates = (path: string) => {
  const com = comEquivalent(path);
  return {
    canonical: path,
    languages: {
      "en-GB": path,
      ...(com ? { en: com } : {}),
      "x-default": path,
    },
  };
};

// Meta descriptions over ~160 chars get truncated in SERPs and are less clean
// for AI snippet extraction. Cut at the last sentence end (or word) that fits.
export const metaDescription = (text: string, max = 160): string => {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const slice = clean.slice(0, max);
  const sentenceEnd = Math.max(
    slice.lastIndexOf(". "),
    slice.lastIndexOf("! "),
    slice.lastIndexOf("? "),
  );
  if (sentenceEnd > max * 0.5) return slice.slice(0, sentenceEnd + 1);
  return `${slice.slice(0, slice.lastIndexOf(" "))}…`;
};

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : `${startsWith}${stringToCheck}`;

export const validateEnvironmentVariables = () => {
  const requiredEnvironmentVariables = [
    "SHOPIFY_STORE_DOMAIN",
    "SHOPIFY_STOREFRONT_ACCESS_TOKEN",
  ];
  const missingEnvironmentVariables = [] as string[];

  requiredEnvironmentVariables.forEach((envVar) => {
    if (!process.env[envVar]) {
      missingEnvironmentVariables.push(envVar);
    }
  });

  if (missingEnvironmentVariables.length) {
    throw new Error(
      `The following environment variables are missing. Your site will not work without them. Read more: https://vercel.com/docs/integrations/shopify#configure-environment-variables\n\n${missingEnvironmentVariables.join(
        "\n",
      )}\n`,
    );
  }

  if (
    process.env.SHOPIFY_STORE_DOMAIN?.includes("[") ||
    process.env.SHOPIFY_STORE_DOMAIN?.includes("]")
  ) {
    throw new Error(
      "Your `SHOPIFY_STORE_DOMAIN` environment variable includes brackets (ie. `[` and / or `]`). Your site will not work with them there. Please remove them.",
    );
  }
};
