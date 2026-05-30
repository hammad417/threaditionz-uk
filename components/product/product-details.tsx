import Link from "next/link";
import type { Product } from "lib/shopify/types";
import {
  metafieldMap,
  parseCareInstructions,
  parseFaq,
  parseHandleList,
  parseJsonStringList,
  prettifyHandle,
} from "lib/shopify/metafields";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-gold/20 py-6">
      <div className="mb-4">
        <span className="eyebrow">{title}</span>
        <div className="gold-divider mt-3" />
      </div>
      {children}
    </section>
  );
}

const SPEC_FIELDS: { key: string; label: string }[] = [
  { key: "custom_material", label: "Material" },
  { key: "custom_size", label: "Size" },
  { key: "custom_dimensions", label: "Dimensions" },
  { key: "custom_made_in", label: "Made In" },
];

export function ProductDetails({ product }: { product: Product }) {
  const mf = metafieldMap(product.metafields);

  const specs = SPEC_FIELDS.filter((f) => mf[f.key]);
  const occasions = (mf.for_occasion || "")
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
  const care = parseCareInstructions(mf.custom_care_instructions);
  const folds = parseJsonStringList(mf.custom_fold_styles);
  const pairWith = parseHandleList(mf.custom_pair_with);
  const faqs = parseFaq(mf.faq);

  if (
    !specs.length &&
    !occasions.length &&
    !care.length &&
    !folds.length &&
    !pairWith.length &&
    !faqs.length
  ) {
    return null;
  }

  return (
    <div className="mt-2">
      {specs.length ? (
        <Section title="Details & Specifications">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
            {specs.map((f) => (
              <div key={f.key} className="flex flex-col">
                <dt className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  {f.label}
                </dt>
                <dd className="font-heading text-base text-foreground">
                  {mf[f.key]}
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      ) : null}

      {occasions.length ? (
        <Section title="Ideal Occasions">
          <div className="flex flex-col gap-2 text-sm leading-relaxed text-charcoal">
            {occasions.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </Section>
      ) : null}

      {care.length ? (
        <Section title="Care Instructions">
          <ul className="flex list-disc flex-col gap-2 pl-5 text-sm text-charcoal">
            {care.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </Section>
      ) : null}

      {folds.length ? (
        <Section title="Recommended Fold Styles">
          <ul className="flex flex-wrap gap-2">
            {folds.map((fold, i) => (
              <li
                key={i}
                className="border border-gold/30 px-3 py-1 text-xs uppercase tracking-[0.15em] text-charcoal"
              >
                {fold}
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {pairWith.length ? (
        <Section title="Complete the Look">
          <ul className="flex flex-col gap-2">
            {pairWith.map((handle) => (
              <li key={handle}>
                <Link
                  href={`/product/${handle}`}
                  prefetch={true}
                  className="group inline-flex items-center gap-2 text-sm text-charcoal transition-colors hover:text-gold"
                >
                  <span>{prettifyHandle(handle)}</span>
                  <span className="text-gold transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {faqs.length ? (
        <Section title="Frequently Asked Questions">
          <div className="flex flex-col">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group border-b border-gold/20 py-3"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-foreground marker:hidden">
                  <span className="font-heading text-base">
                    {faq.question}
                  </span>
                  <span className="ml-4 text-gold transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-charcoal">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </Section>
      ) : null}
    </div>
  );
}
