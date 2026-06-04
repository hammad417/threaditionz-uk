import clsx from "clsx";

// Pure-presentational star row. Renders five stars with a partial fill for the
// fractional remainder (e.g. 4.6 → four full + one 60%-filled star) using an
// overlaid clipped layer, so the displayed stars always match the numeric value.
export function StarRating({
  value,
  className,
  starClassName = "h-4 w-4",
}: {
  value: number;
  className?: string;
  starClassName?: string;
}) {
  const clamped = Math.max(0, Math.min(5, value));
  const percent = (clamped / 5) * 100;

  return (
    <span
      className={clsx("relative inline-flex", className)}
      aria-hidden="true"
    >
      {/* Empty track */}
      <span className="inline-flex text-gold/25">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className={starClassName} />
        ))}
      </span>
      {/* Filled overlay, clipped to the rating percentage */}
      <span
        className="absolute inset-0 inline-flex overflow-hidden text-gold"
        style={{ width: `${percent}%` }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className={clsx(starClassName, "shrink-0")} />
        ))}
      </span>
    </span>
  );
}

function Star({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      role="presentation"
    >
      <path d="M10 1.5l2.47 5.18 5.71.78-4.16 3.94 1.04 5.65L10 14.98l-5.06 2.07 1.04-5.65L1.82 7.46l5.71-.78L10 1.5z" />
    </svg>
  );
}
