import type { Faq } from "lib/collection-faqs";

// Premium FAQ accordion. Uses native <details>/<summary> so it works without
// client JS and stays a server component; styling animates the chevron + reveal.
export default function CollectionFaqs({
  faqs,
  title,
}: {
  faqs: Faq[];
  title: string;
}) {
  if (!faqs.length) return null;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <section className="mt-20 border-t border-gold/15 pt-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="text-center">
        <span className="eyebrow">Questions, Answered</span>
        <div className="gold-divider gold-divider-center mt-4" />
        <h2 className="mt-5 font-heading text-2xl text-foreground lg:text-3xl">
          {title} — FAQs
        </h2>
      </div>

      <div className="mx-auto mt-10 max-w-3xl divide-y divide-gold/15 border-y border-gold/15">
        {faqs.map((f) => (
          <details key={f.question} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left transition-colors hover:text-gold [&::-webkit-details-marker]:hidden">
              <span className="font-heading text-base text-foreground group-open:text-gold lg:text-lg">
                {f.question}
              </span>
              <span
                aria-hidden
                className="flex h-7 w-7 flex-none items-center justify-center border border-gold/40 text-gold transition-all duration-300 group-open:rotate-45 group-open:border-gold group-open:bg-gold group-open:text-midnight"
              >
                +
              </span>
            </summary>
            <p className="pb-6 pr-11 text-sm leading-relaxed text-muted-foreground">
              {f.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
