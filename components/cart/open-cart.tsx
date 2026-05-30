import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center text-cream/80 transition-colors hover:text-gold">
      <ShoppingBagIcon className={clsx("h-5 w-5", className)} />

      {quantity ? (
        <div className="absolute right-0 top-0 -mr-1 -mt-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-midnight">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
