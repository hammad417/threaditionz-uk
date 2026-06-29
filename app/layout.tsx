import Analytics from "components/analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import CookieConsent from "components/cookie-consent";
import PushOwl from "components/pushowl";
import { CartProvider } from "components/cart/cart-context";
import { Navbar } from "components/layout/navbar";
import { getCart } from "lib/shopify";
import { Lato, Playfair_Display } from "next/font/google";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";
import { baseUrl, seoAlternates } from "lib/utils";
import { organizationJsonLd } from "lib/brand";

const { SITE_NAME } = process.env;

// Site-verification tokens for Google Merchant Center / Search Console and Meta
// domain verification. Set via env (no real tokens committed); each tag is emitted
// only when its token is present. See launch/feed/SETUP-CHECKLIST.md.
const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const FB_DOMAIN_VERIFICATION = process.env.NEXT_PUBLIC_FB_DOMAIN_VERIFICATION;

const verification =
  GOOGLE_SITE_VERIFICATION || FB_DOMAIN_VERIFICATION
    ? {
        ...(GOOGLE_SITE_VERIFICATION
          ? { google: GOOGLE_SITE_VERIFICATION }
          : {}),
        ...(FB_DOMAIN_VERIFICATION
          ? {
              other: { "facebook-domain-verification": FB_DOMAIN_VERIFICATION },
            }
          : {}),
      }
    : undefined;

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Hand-finished 100% silk pocket squares, cravats and scarves, crafted in England for the modern gentleman.",
  alternates: seoAlternates("/"),
  robots: {
    follow: true,
    index: true,
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME!,
    locale: "en_GB",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  ...(verification ? { verification } : {}),
};

export const viewport = {
  themeColor: "#151d32",
};

// Sitewide structured data: brand identity (see lib/brand.ts) + site search box
// (sitelinks searchbox). WebSite references the Organization via publisher @id so
// the two nodes form one entity graph for search/answer engines.
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${baseUrl}/#website`,
  name: SITE_NAME,
  url: baseUrl,
  publisher: { "@id": organizationJsonLd["@id"] },
  potentialAction: {
    "@type": "SearchAction",
    target: `${baseUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart();

  return (
    <html lang="en-GB" className={`${playfair.variable} ${lato.variable}`}>
      <body className="bg-warm-white text-foreground antialiased selection:bg-gold/30">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Analytics />
        <PushOwl />
        <VercelAnalytics />
        <SpeedInsights />
        <CookieConsent />
        <CartProvider cartPromise={cart}>
          <Navbar />
          <main>
            {children}
            <Toaster closeButton />
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
