import Analytics from "components/analytics";
import CookieConsent from "components/cookie-consent";
import { CartProvider } from "components/cart/cart-context";
import { Navbar } from "components/layout/navbar";
import { getCart } from "lib/shopify";
import { Lato, Playfair_Display } from "next/font/google";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";
import { baseUrl } from "lib/utils";
import { organizationJsonLd } from "lib/brand";

const { SITE_NAME } = process.env;

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
  alternates: { canonical: "/" },
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
