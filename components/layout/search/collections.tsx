import clsx from "clsx";
import { Suspense } from "react";

import { getCollections } from "lib/shopify";
import FilterList from "./filter";

async function CollectionList() {
  const collections = await getCollections();
  return <FilterList list={collections} title="Collections" />;
}

const skeleton = "mb-3 h-3.5 animate-pulse rounded-sm";
const activeAndTitles = "w-2/3 bg-gold/25";
const items = "w-5/6 bg-charcoal/10";

export default function Collections() {
  return (
    <Suspense
      fallback={
        <div className="hidden w-full flex-none md:block">
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
        </div>
      }
    >
      <CollectionList />
    </Suspense>
  );
}
