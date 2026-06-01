"use client";

import CartModal from "components/cart/modal";
import BrandWordmark from "components/brand-wordmark";
import clsx from "clsx";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  MEGA_GROUPS,
  SIMPLE_LINKS,
  collectionHref,
  type MegaGroup,
} from "./menu-data";
import MobileMegaMenu from "./mobile-mega-menu";

const CLOSE_DELAY = 200;

function FeaturedTile({
  group,
  featuredImages,
}: {
  group: MegaGroup;
  featuredImages: Record<string, string>;
}) {
  if (!group.featured) return null;
  const { eyebrow, heading, handle, image } = group.featured;
  const src = image || featuredImages[handle];
  return (
    <Link
      href={collectionHref(handle)}
      className="group/tile relative block aspect-[4/5] w-72 flex-none overflow-hidden rounded-md bg-charcoal"
      data-mega-link
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={heading}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover/tile:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-midnight" />
      )}
      {/* Legibility gradient + gold frame on hover */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/20 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 rounded-md border border-gold/0 transition-colors duration-500 group-hover/tile:border-gold/40"
      />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5">
        <span className="eyebrow text-gold">{eyebrow}</span>
        <span className="font-heading text-xl text-cream">{heading}</span>
        <span className="tracked-label mt-1 inline-flex items-center gap-1 text-xs text-gold">
          Shop now
          <span className="transition-transform duration-300 group-hover/tile:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

function LinksRegion({ group }: { group: MegaGroup }) {
  if (group.layout === "swatches") {
    return (
      <div className="grid grid-cols-2 gap-x-8 gap-y-3.5 sm:grid-cols-3">
        {group.links.map((link) => (
          <Link
            key={link.handle}
            href={collectionHref(link.handle)}
            className="group/link flex items-center gap-3 text-cream/80 transition-colors hover:text-cream"
            data-mega-link
          >
            <span
              aria-hidden
              className={clsx(
                "h-4 w-4 flex-none rounded-full ring-1 transition-transform duration-300 group-hover/link:scale-110",
                link.swatchBorder ? "ring-cream/40" : "ring-transparent",
              )}
              style={{ backgroundColor: link.swatch }}
            />
            <span className="text-sm">{link.label}</span>
          </Link>
        ))}
      </div>
    );
  }

  // "links" and "two-col" share a clean multi-column link list with a
  // hover gold dash marker.
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-3.5">
      {group.links.map((link) => (
        <Link
          key={link.handle}
          href={collectionHref(link.handle)}
          className="group/link inline-flex items-center gap-2 text-sm text-cream/80 transition-colors hover:text-gold"
          data-mega-link
        >
          <span
            aria-hidden
            className="h-px w-0 flex-none bg-gold transition-all duration-300 group-hover/link:w-3"
          />
          <span>{link.label}</span>
        </Link>
      ))}
    </div>
  );
}

function PanelBody({
  group,
  featuredImages,
}: {
  group: MegaGroup;
  featuredImages: Record<string, string>;
}) {
  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
      <div className="flex-1">
        <LinksRegion group={group} />
      </div>
      <FeaturedTile group={group} featuredImages={featuredImages} />
    </div>
  );
}

export default function MegaHeader({
  featuredImages = {},
}: {
  featuredImages?: Record<string, string>;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpenIndex(null), CLOSE_DELAY);
  }, [clearCloseTimer]);

  const openAt = useCallback(
    (i: number) => {
      clearCloseTimer();
      setOpenIndex(i);
    },
    [clearCloseTimer],
  );

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  // Close on Escape (global) and restore focus to the active trigger.
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const idx = openIndex;
        setOpenIndex(null);
        triggerRefs.current[idx ?? 0]?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openIndex]);

  const focusPanelLinks = (index: number) =>
    Array.from(
      navRef.current?.querySelectorAll<HTMLElement>(
        `[data-panel="${index}"] [data-mega-link]`,
      ) ?? [],
    );

  const onTriggerKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = (i + 1) % MEGA_GROUPS.length;
      triggerRefs.current[next]?.focus();
      setOpenIndex(next);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = (i - 1 + MEGA_GROUPS.length) % MEGA_GROUPS.length;
      triggerRefs.current[prev]?.focus();
      setOpenIndex(prev);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      openAt(i);
      // focus first link after the panel becomes visible
      requestAnimationFrame(() => focusPanelLinks(i)[0]?.focus());
    }
  };

  const onPanelKeyDown = (e: React.KeyboardEvent, i: number) => {
    const links = focusPanelLinks(i);
    const current = links.indexOf(document.activeElement as HTMLElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      links[Math.min(current + 1, links.length - 1)]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (current <= 0) {
        triggerRefs.current[i]?.focus();
      } else {
        links[current - 1]?.focus();
      }
    }
  };

  // Close when focus leaves the whole nav region.
  const onNavBlur = (e: React.FocusEvent) => {
    if (!navRef.current?.contains(e.relatedTarget as Node)) {
      setOpenIndex(null);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gold/10 bg-midnight/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-(--breakpoint-2xl) items-center justify-between gap-4 px-4 py-4 lg:px-8">
        {/* Mobile: hamburger drawer */}
        <div className="lg:hidden">
          <MobileMegaMenu />
        </div>

        {/* Logo */}
        <div className="flex flex-1 justify-center lg:flex-none lg:justify-start">
          <BrandWordmark />
        </div>

        {/* Desktop nav */}
        <nav
          ref={navRef}
          onBlur={onNavBlur}
          onMouseLeave={scheduleClose}
          onMouseEnter={clearCloseTimer}
          aria-label="Primary"
          className="hidden flex-1 items-center justify-center lg:flex"
        >
          <ul className="flex items-center gap-8">
            {MEGA_GROUPS.map((group, i) => {
              const isOpen = openIndex === i;
              return (
                <li key={group.title} className="static">
                  <button
                    ref={(el) => {
                      triggerRefs.current[i] = el;
                    }}
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    onMouseEnter={() => openAt(i)}
                    onFocus={() => openAt(i)}
                    onKeyDown={(e) => onTriggerKeyDown(e, i)}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className={clsx(
                      "tracked-label py-1 text-xs transition-colors",
                      isOpen ? "text-gold" : "text-cream/80 hover:text-cream",
                    )}
                  >
                    <span className="relative">
                      {group.title.replace("Shop by ", "")}
                      <span
                        aria-hidden
                        className={clsx(
                          "absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-300",
                          isOpen ? "w-full" : "w-0",
                        )}
                      />
                    </span>
                  </button>
                </li>
              );
            })}
            {SIMPLE_LINKS.map((link) => (
              <li key={link.handle}>
                <Link
                  href={collectionHref(link.handle)}
                  className="tracked-label py-1 text-xs text-cream/80 transition-colors hover:text-cream"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mega panels — always in the DOM (so links are server-rendered),
              visibility toggled by state. */}
          {MEGA_GROUPS.map((group, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={group.title}
                data-panel={i}
                role="region"
                aria-label={group.title}
                onMouseEnter={clearCloseTimer}
                onKeyDown={(e) => onPanelKeyDown(e, i)}
                className={clsx(
                  "absolute left-0 right-0 top-full border-t border-gold/10 bg-midnight shadow-2xl transition-[opacity,visibility,transform] duration-200 ease-out",
                  isOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-2 opacity-0",
                )}
              >
                <div className="mx-auto max-w-5xl px-8 py-12">
                  <div className="mb-8">
                    <span className="eyebrow">{group.title}</span>
                    <div className="gold-divider mt-3" />
                  </div>
                  <PanelBody group={group} featuredImages={featuredImages} />
                </div>
              </div>
            );
          })}
        </nav>

        {/* Right-side actions */}
        <div className="flex flex-1 items-center justify-end gap-2 lg:flex-none lg:gap-4">
          <Link
            href="/search"
            aria-label="Search"
            className="flex h-10 w-10 items-center justify-center text-cream/80 transition-colors hover:text-gold"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </Link>
          <Link
            href="/account"
            aria-label="Account"
            className="hidden h-10 w-10 items-center justify-center text-cream/80 transition-colors hover:text-gold sm:flex"
          >
            <UserIcon className="h-5 w-5" />
          </Link>
          <CartModal />
        </div>
      </div>
    </header>
  );
}
