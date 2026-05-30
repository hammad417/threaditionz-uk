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

function FeaturedTile({ group }: { group: MegaGroup }) {
  if (!group.featured) return null;
  const { eyebrow, heading, handle, image } = group.featured;
  return (
    <Link
      href={collectionHref(handle)}
      className="group/tile flex w-72 flex-none flex-col gap-3"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-charcoal">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={heading}
            className="h-full w-full object-cover transition-transform duration-700 group-hover/tile:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-midnight" />
        )}
      </div>
      <span className="eyebrow">{eyebrow}</span>
      <span className="font-heading text-xl text-cream">{heading}</span>
      <span className="tracked-label text-xs text-gold transition-colors group-hover/tile:text-gold-light">
        Shop now →
      </span>
    </Link>
  );
}

function PanelBody({ group }: { group: MegaGroup }) {
  if (group.layout === "swatches") {
    return (
      <div className="grid grid-cols-2 gap-x-10 gap-y-3">
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
                "h-4 w-4 flex-none rounded-full",
                link.swatchBorder && "ring-1 ring-cream/40",
              )}
              style={{ backgroundColor: link.swatch }}
            />
            <span className="text-sm">{link.label}</span>
          </Link>
        ))}
      </div>
    );
  }

  if (group.layout === "two-col") {
    return (
      <div className="grid grid-cols-2 gap-x-10 gap-y-3">
        {group.links.map((link) => (
          <Link
            key={link.handle}
            href={collectionHref(link.handle)}
            className="text-sm text-cream/80 transition-colors hover:text-gold"
            data-mega-link
          >
            {link.label}
          </Link>
        ))}
      </div>
    );
  }

  // "links" layout — single column + featured tile on the right
  return (
    <div className="flex gap-12">
      <div className="flex flex-1 flex-col gap-3">
        {group.links.map((link) => (
          <Link
            key={link.handle}
            href={collectionHref(link.handle)}
            className="text-sm text-cream/80 transition-colors hover:text-gold"
            data-mega-link
          >
            {link.label}
          </Link>
        ))}
      </div>
      <FeaturedTile group={group} />
    </div>
  );
}

export default function MegaHeader() {
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
                    {group.title.replace("Shop by ", "")}
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
                  "absolute left-0 right-0 top-full border-t border-gold/10 bg-midnight shadow-2xl transition-[opacity,visibility] duration-200",
                  isOpen
                    ? "visible opacity-100"
                    : "invisible opacity-0",
                )}
              >
                <div className="mx-auto max-w-(--breakpoint-2xl) px-8 py-10">
                  <div className="mb-6">
                    <span className="eyebrow">{group.title}</span>
                    <div className="gold-divider mt-3" />
                  </div>
                  <PanelBody group={group} />
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
