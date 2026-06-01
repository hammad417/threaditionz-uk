// Collection-level FAQs. Shopify collections carry no FAQ metafield, so we
// assemble brand-accurate questions per category (keyed off the handle/title)
// and append the universal ones every shopper asks. Used for both the on-page
// accordion and FAQPage structured data.

export type Faq = { question: string; answer: string };

const UNIVERSAL: Faq[] = [
  {
    question: "How are the pieces packaged for gifting?",
    answer:
      "Every order arrives boxed and finished with a hand-tied ribbon as standard. A hand-written gift note can be added free of charge at checkout, so it's ready to give the moment it lands.",
  },
  {
    question: "How should I care for my silk?",
    answer:
      "Each piece is 100% mulberry silk with hand-rolled edges. We recommend dry cleaning only, and storing it flat or loosely rolled away from direct sunlight to preserve the depth of colour and natural lustre.",
  },
  {
    question: "What are your shipping and returns options?",
    answer:
      "We dispatch within 1–2 business days, with free UK delivery on orders over £50 and tracked options at checkout. Unworn pieces can be returned within 14 days in their original gift packaging for a full refund.",
  },
  {
    question: "Where are your accessories made?",
    answer:
      "Designed and hand-finished in England from pure mulberry silk. Heritage motifs such as Ajrak and calligraphy are drawn from authentic patterns and printed onto real silk — never artificially generated.",
  },
];

type Rule = { match: RegExp; faqs: Faq[] };

const CATEGORY_RULES: Rule[] = [
  {
    match: /pocket.?square|four-in-one|solid/i,
    faqs: [
      {
        question: "What size are the pocket squares?",
        answer:
          "Our silk pocket squares measure approximately 30 × 30 cm — the ideal proportion for a crisp presidential fold or a relaxed puff in any breast pocket.",
      },
      {
        question: "How do I fold a pocket square?",
        answer:
          "The presidential (flat) fold suits business and formal looks, while a puff or two-point fold adds character for weddings and evenings out. Each product page suggests the folds that flatter its print.",
      },
    ],
  },
  {
    match: /cravat|ascot/i,
    faqs: [
      {
        question: "How do I tie a cravat?",
        answer:
          "Drape the cravat around the collar, cross the wider end over the narrower, bring it up through the neck loop and arrange the folds to sit softly inside an open collar or beneath a waistcoat.",
      },
      {
        question: "When is a cravat appropriate?",
        answer:
          "Cravats are a refined choice for weddings, garden parties, race days and formal daytime events — a distinctive alternative to the necktie.",
      },
    ],
  },
  {
    match: /scarf|scarves/i,
    faqs: [
      {
        question: "How should I wear a silk scarf?",
        answer:
          "Worn loose under a coat, knotted at the throat, or draped over tailoring, our lightweight silk scarves add warmth and polish across the seasons without bulk.",
      },
    ],
  },
  {
    match: /gift|set/i,
    faqs: [
      {
        question: "What's included in a gift set?",
        answer:
          "Each set pairs complementary silk pieces — typically a scarf and pocket square, or coordinating accessories — presented together in our signature gift box, ready to give.",
      },
      {
        question: "Can I add a personal message?",
        answer:
          "Yes. Add a hand-written note free of charge at checkout and we'll include it inside the box.",
      },
    ],
  },
  {
    match: /wedding|groom/i,
    faqs: [
      {
        question: "Can you match accessories for a wedding party?",
        answer:
          "Many designs are available in multiples so the groom and groomsmen can coordinate beautifully. For larger parties, contact us and we'll help you reserve matching pieces.",
      },
    ],
  },
  {
    match: /luxe|heritage|ajrak|calligraphy|damask/i,
    faqs: [
      {
        question: "What makes this collection special?",
        answer:
          "These are our finest weaves and rarest motifs — limited runs on premium mulberry silk, with heritage prints faithfully reproduced from authentic patterns for collectors of fine menswear.",
      },
    ],
  },
];

export function getCollectionFaqs(handle: string, title: string): Faq[] {
  const key = `${handle} ${title}`;
  const categoryFaqs = CATEGORY_RULES.filter((r) => r.match.test(key)).flatMap(
    (r) => r.faqs,
  );

  // De-dupe by question, lead with the category-specific FAQs, then universals.
  const seen = new Set<string>();
  const ordered = [...categoryFaqs, ...UNIVERSAL].filter((f) => {
    if (seen.has(f.question)) return false;
    seen.add(f.question);
    return true;
  });

  return ordered.slice(0, 6);
}
