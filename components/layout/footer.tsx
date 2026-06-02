import Link from "next/link";

import BrandWordmark from "components/brand-wordmark";
import FooterMenu from "components/layout/footer-menu";
import { getMenu } from "lib/shopify";
import { Suspense } from "react";

const { COMPANY_NAME, SITE_NAME } = process.env;

const shopLinks = [
  { label: "Pocket Squares", href: "/search/pocket-squares" },
  { label: "Cravats", href: "/search/cravats" },
  { label: "Scarves", href: "/search/silk-scarves" },
  { label: "Gift Sets", href: "/search/gift-sets" },
  { label: "New In", href: "/search/new-arrivals" },
];

const helpLinks = [
  { label: "Shipping & Returns", href: "/shipping-returns" },
  { label: "Size Guide", href: "/size-guide" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faqs" },
];

const companyLinks = [
  { label: "Our Story", href: "/our-story" },
  { label: "Journal", href: "/journal" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "My Account", href: "/account" },
  { label: "Wishlist", href: "/wishlist" },
];

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-9 w-9 items-center justify-center border border-gold/40 text-gold transition-colors hover:border-gold hover:bg-gold hover:text-midnight"
    >
      {children}
    </a>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="tracked-label mb-4 text-xs text-cream">{title}</h3>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              prefetch={true}
              className="text-sm text-cream/60 transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : "");
  const menu = await getMenu("next-js-frontend-footer-menu");
  const copyrightName = COMPANY_NAME || SITE_NAME || "Threaditionz";

  return (
    <footer className="bg-midnight text-cream/60">
      <div className="mx-auto grid w-full max-w-(--breakpoint-2xl) grid-cols-2 gap-10 px-6 py-16 md:grid-cols-3 lg:grid-cols-5 lg:px-8">
        {/* Brand block */}
        <div className="col-span-2 flex flex-col gap-5 lg:col-span-2">
          <BrandWordmark />
          <p className="max-w-xs text-sm leading-relaxed text-cream/50">
            Hand-finished 100% silk accessories for the modern gentleman.
            Heritage craftsmanship, made to be remembered.
          </p>
          <div className="flex gap-3">
            <SocialIcon href="https://instagram.com" label="Instagram">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.87s0 3.6-.07 4.87c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.87.07s-3.6 0-4.87-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.6 2.2 15.22 2.2 12s0-3.6.07-4.87c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.21 8.78 2.2 12 2.2Zm0 1.8c-3.16 0-3.53.01-4.78.07-.9.04-1.38.19-1.71.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.33-.28.81-.32 1.71C3.21 8.87 3.2 9.24 3.2 12s.01 3.13.07 4.38c.04.9.19 1.38.32 1.71.17.43.37.74.69 1.06.32.32.63.52 1.06.69.33.13.81.28 1.71.32 1.25.06 1.62.07 4.78.07s3.53-.01 4.78-.07c.9-.04 1.38-.19 1.71-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.33.28-.81.32-1.71.06-1.25.07-1.62.07-4.38s-.01-3.13-.07-4.38c-.04-.9-.19-1.38-.32-1.71a2.85 2.85 0 0 0-.69-1.06 2.85 2.85 0 0 0-1.06-.69c-.33-.13-.81-.28-1.71-.32C15.53 4.01 15.16 4 12 4Zm0 3.06A4.94 4.94 0 1 1 7.06 12 4.94 4.94 0 0 1 12 7.06Zm0 8.14A3.2 3.2 0 1 0 8.8 12 3.2 3.2 0 0 0 12 15.2Zm5.14-8.34a1.15 1.15 0 1 1-1.15-1.15 1.15 1.15 0 0 1 1.15 1.15Z" />
              </svg>
            </SocialIcon>
            <SocialIcon href="https://facebook.com" label="Facebook">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.29-.04-1.27-.12-2.41-.12-2.39 0-4.03 1.46-4.03 4.14V9.9H7.5V13h2.76v8h3.24Z" />
              </svg>
            </SocialIcon>
            <SocialIcon href="https://pinterest.com" label="Pinterest">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M12 2a10 10 0 0 0-3.65 19.31c-.05-.78-.1-1.98.02-2.83.11-.77.72-4.92.72-4.92s-.18-.37-.18-.92c0-.86.5-1.5 1.12-1.5.53 0 .79.4.79.88 0 .53-.34 1.33-.52 2.07-.15.62.31 1.13.92 1.13 1.1 0 1.95-1.16 1.95-2.84 0-1.48-1.06-2.52-2.58-2.52-1.76 0-2.79 1.32-2.79 2.68 0 .53.2 1.1.46 1.41.05.06.06.12.04.18-.05.2-.16.62-.18.7-.03.12-.1.15-.22.09-.83-.39-1.35-1.6-1.35-2.58 0-2.1 1.53-4.03 4.4-4.03 2.31 0 4.11 1.65 4.11 3.85 0 2.3-1.45 4.15-3.46 4.15-.68 0-1.31-.35-1.53-.77l-.42 1.58c-.15.58-.55 1.32-.83 1.76A10 10 0 1 0 12 2Z" />
              </svg>
            </SocialIcon>
          </div>
        </div>

        <FooterColumn title="Shop" links={shopLinks} />
        <FooterColumn title="Help" links={helpLinks} />
        <FooterColumn title="Company" links={companyLinks} />
      </div>

      {/* Shopify-pages-driven menu (kept working if present) */}
      {menu.length ? (
        <div className="mx-auto w-full max-w-(--breakpoint-2xl) border-t border-gold/10 px-6 py-6 lg:px-8">
          <Suspense fallback={null}>
            <div className="text-cream/50 [&_a]:text-cream/50 [&_a:hover]:text-gold">
              <FooterMenu menu={menu} />
            </div>
          </Suspense>
        </div>
      ) : null}

      {/* Bottom bar */}
      <div className="border-t border-gold/10">
        <div className="mx-auto flex w-full max-w-(--breakpoint-2xl) flex-col items-center gap-2 px-6 py-6 text-xs text-cream/40 md:flex-row md:gap-0 lg:px-8">
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith(".")
              ? "."
              : ""}{" "}
            All rights reserved.
          </p>
          <div className="flex gap-4 md:ml-auto">
            <Link href="/privacy-policy" className="hover:text-gold">
              Privacy
            </Link>
            <Link href="/terms-conditions" className="hover:text-gold">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
