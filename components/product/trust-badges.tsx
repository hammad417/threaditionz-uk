import {
  ArrowPathIcon,
  LockClosedIcon,
  SparklesIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { COMMERCE } from "lib/brand";
import { PaymentIcons } from "components/payment-icons";

// Reassurance strip directly under the CTA: the four objections most shoppers
// have at the point of decision (delivery, returns, security, quality), backed
// by the brand's real commerce facts, plus accepted payment methods.
const ITEMS = [
  {
    Icon: TruckIcon,
    title: "Free UK delivery",
    detail: `On orders over £${COMMERCE.freeShippingThreshold}`,
  },
  {
    Icon: ArrowPathIcon,
    title: `${COMMERCE.returnDays}-day returns`,
    detail: "Easy & hassle-free",
  },
  {
    Icon: LockClosedIcon,
    title: "Secure checkout",
    detail: "Encrypted payment",
  },
  {
    Icon: SparklesIcon,
    title: "100% mulberry silk",
    detail: "Hand-finished in England",
  },
];

export function TrustBadges() {
  return (
    <div className="mt-6 border-t border-gold/20 pt-6">
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {ITEMS.map(({ Icon, title, detail }) => (
          <li key={title} className="flex flex-col items-center text-center">
            <Icon className="mb-2 h-6 w-6 text-gold" strokeWidth={1.25} />
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-foreground">
              {title}
            </span>
            <span className="mt-0.5 text-[0.7rem] leading-tight text-muted-foreground">
              {detail}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col items-center gap-2 border-t border-gold/10 pt-5">
        <span className="text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
          Guaranteed safe checkout
        </span>
        <PaymentIcons className="flex flex-wrap items-center justify-center gap-1.5" />
      </div>
    </div>
  );
}
