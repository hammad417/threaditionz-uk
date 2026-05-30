"use client";

import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import BrandWordmark from "components/brand-wordmark";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import {
  MEGA_GROUPS,
  SIMPLE_LINKS,
  collectionHref,
} from "./menu-data";

export default function MobileMegaMenu() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const close = () => setIsOpen(false);

  // Close the drawer on navigation.
  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="flex h-10 w-10 items-center justify-center text-cream transition-colors hover:text-gold"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={close} className="relative z-[60]">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <Dialog.Panel className="fixed bottom-0 left-0 top-0 flex w-[85%] max-w-sm flex-col overflow-y-auto bg-midnight">
              <div className="flex items-center justify-between border-b border-gold/10 px-5 py-4">
                <BrandWordmark className="text-lg" />
                <button
                  onClick={close}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center text-cream transition-colors hover:text-gold"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex flex-col px-2 py-4" aria-label="Mobile">
                {MEGA_GROUPS.map((group) => {
                  const expanded = openGroup === group.title;
                  return (
                    <div
                      key={group.title}
                      className="border-b border-gold/10"
                    >
                      <button
                        onClick={() =>
                          setOpenGroup(expanded ? null : group.title)
                        }
                        aria-expanded={expanded}
                        className="flex w-full items-center justify-between px-3 py-3 text-left"
                      >
                        <span className="tracked-label text-xs text-cream">
                          {group.title}
                        </span>
                        <ChevronDownIcon
                          className={clsx(
                            "h-4 w-4 text-gold transition-transform",
                            expanded && "rotate-180",
                          )}
                        />
                      </button>
                      {expanded ? (
                        <ul className="flex flex-col gap-1 pb-3">
                          {group.links.map((link) => (
                            <li key={link.handle}>
                              <Link
                                href={collectionHref(link.handle)}
                                onClick={close}
                                className="flex items-center gap-3 px-3 py-2 text-sm text-cream/75 transition-colors hover:text-gold"
                              >
                                {link.swatch ? (
                                  <span
                                    aria-hidden
                                    className={clsx(
                                      "h-3.5 w-3.5 flex-none rounded-full",
                                      link.swatchBorder &&
                                        "ring-1 ring-cream/40",
                                    )}
                                    style={{ backgroundColor: link.swatch }}
                                  />
                                ) : null}
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  );
                })}

                <div className="mt-2 flex flex-col">
                  {SIMPLE_LINKS.map((link) => (
                    <Link
                      key={link.handle}
                      href={collectionHref(link.handle)}
                      onClick={close}
                      className="tracked-label border-b border-gold/10 px-3 py-3 text-xs text-cream transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="/account"
                    onClick={close}
                    className="tracked-label px-3 py-3 text-xs text-cream transition-colors hover:text-gold"
                  >
                    Account
                  </Link>
                </div>
              </nav>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
