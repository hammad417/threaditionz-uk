// Cornerstone editorial content (journal/guides) — the primary GEO lever. These
// answer the high-intent questions generative engines surface for this brand
// ("how to tie a cravat", "how to fold a pocket square", "cravat vs ascot"), with
// HowTo / Article structured data and dense internal links to collections.
//
// Content lives in code because the Shopify Basic plan blocks CMS-page/blog
// creation (same pattern as /faqs, /our-story). Add a guide by appending here.

export type HowToStep = { name: string; text: string };

export type GuideSection = { heading: string; body: string[] };

export type Guide = {
  slug: string;
  kind: "howto" | "article";
  /** SEO/meta title (absolute — already brand-suffixed where wanted). */
  title: string;
  h1: string;
  /** Meta description + Article/HowTo description. */
  description: string;
  /** Short eyebrow/category label. */
  category: string;
  datePublished: string;
  dateModified: string;
  /** Public-path hero image (optional). */
  heroImage?: string;
  heroAlt?: string;
  /** One-paragraph lede shown under the H1. */
  lede: string;
  /** HowTo only. */
  totalTime?: string; // ISO-8601 duration, e.g. "PT3M"
  tools?: string[];
  steps?: HowToStep[];
  /** Prose sections (both kinds). */
  sections: GuideSection[];
  /** Cross-links to shoppable collections. */
  related: { label: string; href: string }[];
};

const ORDERED_GUIDES: Guide[] = [
  {
    slug: "how-to-tie-a-cravat",
    kind: "howto",
    title: "How to Tie a Cravat — A Simple Step-by-Step Guide | Threaditionz",
    h1: "How to Tie a Cravat",
    description:
      "Learn how to tie a day cravat (ascot) in five simple steps — the classic knot for weddings, formal wear and everyday refinement, using a 100% silk cravat.",
    category: "How-To",
    datePublished: "2026-06-02",
    dateModified: "2026-06-02",
    lede: "The day cravat — worn open-necked or tucked into the collar — is the most elegant way to finish a jacket without a tie. Here's the classic knot, step by step.",
    totalTime: "PT3M",
    tools: ["A silk cravat", "A shirt with an open collar", "A mirror"],
    steps: [
      {
        name: "Drape the cravat",
        text: "Place the cravat around your neck under the collar, with both ends hanging evenly down the front of your chest.",
      },
      {
        name: "Cross and loop",
        text: "Cross the right end over the left, then bring it up and through the loop at your neck, the same first move as a simple scarf knot.",
      },
      {
        name: "Form the front fold",
        text: "Let the top layer fall forward over the bottom layer. Smooth the silk so the wider blade sits flat and slightly puffed, not pulled tight.",
      },
      {
        name: "Tuck or leave open",
        text: "For a formal look, tuck both ends inside an open shirt collar. For a relaxed day look, leave the collar over the cravat and let it sit against the chest.",
      },
      {
        name: "Adjust the drape",
        text: "Arrange the folds so the silk drapes softly and the pattern faces forward. The cravat should look full and natural, never stiff.",
      },
    ],
    sections: [
      {
        heading: "Open-necked or tucked?",
        body: [
          "A cravat tucked into an open collar reads as more formal — ideal for weddings, the races, or a morning suit. Worn over the collar against the chest, the same cravat becomes relaxed daywear that lifts a blazer and open shirt.",
          "Because our cravats are hand-finished in 100% mulberry silk, they hold a soft fold and drape naturally rather than springing flat — which is exactly what makes the knot sit well.",
        ],
      },
      {
        heading: "Matching a cravat to the occasion",
        body: [
          "For formal events, choose deeper grounds — navy, burgundy, forest — and let a heritage motif carry the detail. For daywear, lighter grounds and smaller prints keep the look easy.",
          "For a wedding party, pick a single design in multiples so the groom and groomsmen coordinate without matching exactly.",
        ],
      },
    ],
    related: [
      { label: "Shop silk cravats", href: "/search/cravats" },
      {
        label: "Wedding silk accessories",
        href: "/search/wedding-silk-accessories",
      },
    ],
  },
  {
    slug: "how-to-fold-a-pocket-square",
    kind: "howto",
    title:
      "How to Fold a Pocket Square — The Classic Straight Fold | Threaditionz",
    h1: "How to Fold a Pocket Square",
    description:
      "A step-by-step guide to folding a silk pocket square — the classic straight (presidential) fold, plus the one-point and puff folds, for a sharp jacket pocket.",
    category: "How-To",
    datePublished: "2026-06-02",
    dateModified: "2026-06-02",
    lede: "A pocket square finishes a jacket the way nothing else can. Start with the straight fold — the cleanest, most versatile look — then branch out.",
    totalTime: "PT2M",
    tools: ["A silk pocket square", "A jacket with a breast pocket"],
    steps: [
      {
        name: "Lay it flat",
        text: "Place the pocket square face-down on a flat surface as a diamond or square, smoothing out any creases.",
      },
      {
        name: "Fold in half",
        text: "Fold the square in half left to right to make a rectangle, then in half again to make a smaller rectangle roughly the width of your breast pocket.",
      },
      {
        name: "Adjust the height",
        text: "Fold the bottom up so the folded square is a little taller than your pocket is deep, leaving a clean straight edge at the top.",
      },
      {
        name: "Place in the pocket",
        text: "Slide the square into the breast pocket with the straight edge showing. Reveal about a centimetre of silk above the pocket line — neat and understated.",
      },
    ],
    sections: [
      {
        heading: "Three folds to know",
        body: [
          "The straight (presidential) fold is the most formal and works with any pattern — only a clean line shows. The one-point fold reveals a single triangle for a touch more flourish. The puff fold gathers the silk loosely for a soft, relaxed finish that suits print-heavy squares.",
          "With a hand-rolled silk square, the puff fold shows off the rolled edge beautifully — let the fabric fall naturally rather than pressing it.",
        ],
      },
      {
        heading: "Should the pocket square match the tie?",
        body: [
          "Coordinate, don't match. Pick up one colour from your tie or cravat in the pocket square rather than using the identical fabric — it looks considered instead of bought-as-a-set.",
        ],
      },
    ],
    related: [
      { label: "Shop pocket squares", href: "/search/pocket-squares" },
      { label: "Silk gift sets", href: "/search/gift-sets" },
    ],
  },
  {
    slug: "cravat-vs-ascot-vs-tie",
    kind: "article",
    title: "Cravat vs Ascot vs Tie — What's the Difference? | Threaditionz",
    h1: "Cravat vs Ascot vs Tie: What's the Difference?",
    description:
      "Cravat, ascot and tie explained — the history, how each is worn, and when to choose which for weddings, formal events and everyday style.",
    category: "Style Guide",
    datePublished: "2026-06-02",
    dateModified: "2026-06-02",
    lede: "The words are often used interchangeably, but cravat, ascot and necktie are distinct pieces with different histories and occasions. Here's how to tell them apart.",
    sections: [
      {
        heading: "The cravat",
        body: [
          "The cravat is the ancestor of them all, descending from the knotted neck-cloths worn by 17th-century Croatian soldiers. Today 'cravat' usually means a wide, soft neck-cloth worn looped at the throat — either tucked into an open collar or worn against the chest. It's the most versatile of the three, moving from formal to relaxed depending on how it's worn.",
        ],
      },
      {
        heading: "The ascot",
        body: [
          "An ascot is a formal style of cravat, traditionally worn with morning dress and named after the Royal Ascot races. It's pleated at the neck, with the wide blades crossed and pinned, sitting inside the collar. In practice 'ascot' and 'day cravat' are often the same garment — the difference is in the formality of how it's tied and what it's worn with.",
        ],
      },
      {
        heading: "The necktie",
        body: [
          "The modern necktie is the narrow, long tie knotted at the collar — the everyday business and formal default. It's the most structured and the least expressive of the three, which is exactly why a silk cravat or pocket square is such an easy way to stand apart.",
        ],
      },
      {
        heading: "Which should you choose?",
        body: [
          "For a wedding, the races or a morning suit, a cravat or ascot in silk is the elegant choice. For business, a necktie remains the standard — finished with a pocket square for character. For everyday refinement, an open-collar cravat or a well-folded pocket square does the most with the least.",
          "Whatever you choose, the material matters: hand-finished mulberry silk drapes and holds a knot in a way that synthetic blends never quite manage.",
        ],
      },
    ],
    related: [
      { label: "Shop silk cravats", href: "/search/cravats" },
      { label: "Shop pocket squares", href: "/search/pocket-squares" },
      { label: "Shop silk scarves", href: "/search/silk-scarves" },
    ],
  },
  {
    slug: "silk-accessories-for-weddings",
    kind: "article",
    title:
      "Silk Accessories for Weddings — Groom & Groomsmen Guide | Threaditionz",
    h1: "Silk Accessories for Weddings: A Groom's Guide",
    description:
      "How to choose and coordinate silk pocket squares, cravats and scarves for the groom and groomsmen — colour, occasion and heritage motifs for a wedding day.",
    category: "Occasion Guide",
    datePublished: "2026-06-02",
    dateModified: "2026-06-02",
    lede: "The right silk accessory ties a wedding party together. Here's how to choose colours, coordinate the groomsmen and pick pieces worth keeping.",
    sections: [
      {
        heading: "Start with the cravat or pocket square",
        body: [
          "For a morning suit or formal lounge suit, a silk cravat at the throat is the classic wedding choice. For a sharper, modern suit, a folded pocket square in the breast pocket does the same job with less formality. Many grooms wear both — a cravat with the pocket square picking up one of its colours.",
        ],
      },
      {
        heading: "Coordinating the groomsmen",
        body: [
          "Coordinate rather than match exactly. Put the groom in a distinct design and the groomsmen in a complementary one from the same palette — or the same design in a different colourway. Because our pieces are available in multiples, a whole party can share one design without it looking uniform.",
        ],
      },
      {
        heading: "Choosing colour and motif",
        body: [
          "Anchor the palette to the season and the bridal party: deep jewel tones for autumn and winter, lighter grounds for spring and summer. A heritage motif — Ajrak block-print, Mughal floral or calligraphy — adds meaning and photographs beautifully up close.",
          "For Eid and festive weddings, richer grounds and gold-toned detailing feel right for the occasion.",
        ],
      },
      {
        heading: "A gift that lasts",
        body: [
          "Silk accessories make a considered thank-you for groomsmen — gift-boxed and kept long after the day. Our gift sets pair a scarf and pocket square for exactly this.",
        ],
      },
    ],
    related: [
      {
        label: "Wedding silk accessories",
        href: "/search/wedding-silk-accessories",
      },
      { label: "Silk gift sets", href: "/search/gift-sets" },
      { label: "Shop cravats", href: "/search/cravats" },
    ],
  },
];

export function getAllGuides(): Guide[] {
  return ORDERED_GUIDES;
}

export function getGuide(slug: string): Guide | undefined {
  return ORDERED_GUIDES.find((g) => g.slug === slug);
}
