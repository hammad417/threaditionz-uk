import clsx from "clsx";
import Link from "next/link";

/**
 * Threaditionz text logo: a gold "T" followed by "HREADITIONZ" in Playfair.
 */
export default function BrandWordmark({
  className,
  href = "/",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      prefetch={true}
      aria-label="Threaditionz — home"
      className={clsx(
        "font-heading text-xl tracking-wider text-cream sm:text-2xl",
        className,
      )}
    >
      <span className="text-gold">T</span>
      <span>HREADITIONZ</span>
    </Link>
  );
}
