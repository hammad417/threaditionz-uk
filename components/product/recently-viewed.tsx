"use client";

import Price from "components/price";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export type ViewedItem = {
  handle: string;
  title: string;
  image: string;
  amount: string;
  currencyCode: string;
};

const KEY = "recently-viewed";
const MAX = 8;

// Records the current product and shows the rest of the visitor's recent history.
export default function RecentlyViewed({ current }: { current?: ViewedItem }) {
  const [items, setItems] = useState<ViewedItem[]>([]);

  useEffect(() => {
    let list: ViewedItem[] = [];
    try {
      list = JSON.parse(localStorage.getItem(KEY) || "[]");
    } catch {
      list = [];
    }
    if (current) {
      list = [
        current,
        ...list.filter((i) => i.handle !== current.handle),
      ].slice(0, MAX);
      try {
        localStorage.setItem(KEY, JSON.stringify(list));
      } catch {
        // ignore
      }
    }
    setItems(list.filter((i) => i.handle !== current?.handle));
  }, [current?.handle]);

  if (!items.length) return null;

  return (
    <div className="py-16">
      <div className="mb-8">
        <span className="eyebrow">Recently Viewed</span>
        <div className="gold-divider mt-3" />
      </div>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {items.map((p) => (
          <li
            key={p.handle}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link
              href={`/product/${p.handle}`}
              className="group relative block h-full w-full overflow-hidden border border-gold/10"
            >
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-midnight/80 to-transparent p-3">
                <p className="truncate text-xs text-cream">{p.title}</p>
                <Price
                  className="text-xs text-gold"
                  amount={p.amount}
                  currencyCode={p.currencyCode}
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
