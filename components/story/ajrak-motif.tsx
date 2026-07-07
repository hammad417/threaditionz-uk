// components/story/ajrak-motif.tsx
// The signature element of the page: an Ajrak-inspired trefoil-and-lattice
// motif rendered as gold line-work that draws itself in as the visitor
// scrolls. Pure SVG — zero credits, crisp at any DPI, ~3KB.
//
// Geometry is a faithful *inspiration*, not a scan — an eight-pointed star
// lattice with the central trefoil (kakar) form common to Sindhi Ajrak.

export default function AjrakMotif({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      className={className}
      aria-hidden="true"
      data-ajrak-motif
    >
      <g stroke="#C0974F" strokeWidth="1.5" strokeLinecap="round">
        {/* Outer eight-pointed star */}
        <path
          data-draw
          d="M200 30 L240 120 L330 100 L280 175 L370 200 L280 225 L330 300 L240 280 L200 370 L160 280 L70 300 L120 225 L30 200 L120 175 L70 100 L160 120 Z"
        />
        {/* Inner rotated square lattice */}
        <path data-draw d="M200 90 L310 200 L200 310 L90 200 Z" />
        <path data-draw d="M140 140 H260 V260 H140 Z" />
        {/* Central trefoil (kakar) */}
        <path
          data-draw
          d="M200 160 C 220 160 232 176 232 192 C 232 214 212 224 200 240 C 188 224 168 214 168 192 C 168 176 180 160 200 160 Z"
        />
        <circle data-draw cx="200" cy="196" r="14" />
        {/* Corner buds */}
        <circle data-draw cx="200" cy="60" r="8" />
        <circle data-draw cx="200" cy="340" r="8" />
        <circle data-draw cx="60" cy="200" r="8" />
        <circle data-draw cx="340" cy="200" r="8" />
      </g>
    </svg>
  );
}
