"use client";

import clsx from "clsx";
import type { SortFilterItem } from "lib/constants";
import { createUrl } from "lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { ListItem, PathFilterItem } from ".";

function PathFilterItem({ item }: { item: PathFilterItem }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = pathname === item.path;
  const newParams = new URLSearchParams(searchParams.toString());
  const DynamicTag = active ? "p" : Link;

  newParams.delete("q");

  return (
    <li className="flex" key={item.title}>
      <DynamicTag
        href={createUrl(item.path, newParams)}
        className={clsx(
          "group flex w-full items-center gap-2 py-1.5 text-sm leading-snug transition-colors",
          active ? "text-gold" : "text-charcoal/70 hover:text-gold",
        )}
      >
        <span
          aria-hidden
          className={clsx(
            "h-px flex-none bg-gold transition-all duration-300",
            active ? "w-3" : "w-0 group-hover:w-3",
          )}
        />
        <span>{item.title}</span>
      </DynamicTag>
    </li>
  );
}

function SortFilterItem({ item }: { item: SortFilterItem }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get("sort") === item.slug;
  const q = searchParams.get("q");
  const href = createUrl(
    pathname,
    new URLSearchParams({
      ...(q && { q }),
      ...(item.slug && item.slug.length && { sort: item.slug }),
    }),
  );
  const DynamicTag = active ? "p" : Link;

  return (
    <li className="flex" key={item.title}>
      <DynamicTag
        prefetch={!active ? false : undefined}
        href={href}
        className={clsx(
          "group flex w-full items-center gap-2 py-1.5 text-sm leading-snug transition-colors",
          active ? "text-gold" : "text-charcoal/70 hover:text-gold",
        )}
      >
        <span
          aria-hidden
          className={clsx(
            "h-px flex-none bg-gold transition-all duration-300",
            active ? "w-3" : "w-0 group-hover:w-3",
          )}
        />
        <span>{item.title}</span>
      </DynamicTag>
    </li>
  );
}

export function FilterItem({ item }: { item: ListItem }) {
  return "path" in item ? (
    <PathFilterItem item={item} />
  ) : (
    <SortFilterItem item={item} />
  );
}
