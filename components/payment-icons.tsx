// Lightweight, dependency-free payment-method marks shown near the CTA as a
// checkout trust signal. Rendered as small bordered cards with recognisable
// wordmarks (kept simple rather than pixel-exact brand SVGs).
const METHODS: { label: string; node: React.ReactNode }[] = [
  {
    label: "Visa",
    node: (
      <span className="font-bold italic tracking-tight text-[#1434CB]">
        VISA
      </span>
    ),
  },
  {
    label: "Mastercard",
    node: (
      <span className="relative inline-flex items-center">
        <span className="h-3.5 w-3.5 rounded-full bg-[#EB001B]" />
        <span className="-ml-1.5 h-3.5 w-3.5 rounded-full bg-[#F79E1B] opacity-90" />
      </span>
    ),
  },
  {
    label: "American Express",
    node: (
      <span className="rounded-[2px] bg-[#1F72CD] px-1 text-[0.5rem] font-bold uppercase text-white">
        Amex
      </span>
    ),
  },
  {
    label: "PayPal",
    node: (
      <span className="text-[0.7rem] font-bold tracking-tight">
        <span className="text-[#003087]">Pay</span>
        <span className="text-[#009CDE]">Pal</span>
      </span>
    ),
  },
  {
    label: "Apple Pay",
    node: (
      <span className="text-[0.7rem] font-semibold text-foreground"> Pay</span>
    ),
  },
  {
    label: "Shop Pay",
    node: (
      <span className="rounded-[2px] bg-[#5A31F4] px-1 text-[0.55rem] font-semibold uppercase tracking-wide text-white">
        shop&nbsp;pay
      </span>
    ),
  },
];

export function PaymentIcons({ className }: { className?: string }) {
  return (
    <ul className={className} aria-label="Accepted payment methods">
      {METHODS.map((m) => (
        <li
          key={m.label}
          title={m.label}
          className="flex h-7 min-w-[2.75rem] items-center justify-center rounded-[3px] border border-border bg-white px-1.5"
        >
          <span className="sr-only">{m.label}</span>
          <span aria-hidden="true" className="flex items-center">
            {m.node}
          </span>
        </li>
      ))}
    </ul>
  );
}
