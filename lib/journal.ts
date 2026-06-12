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
  {
    slug: "cravat-or-tie-wedding",
    kind: "article",
    title:
      "Cravat or Tie for Your Wedding? A Groom's Decision Guide | Threaditionz",
    h1: "Cravat or Tie for Your Wedding?",
    description:
      "Cravat or tie for the groom? How to decide by suit, venue and formality — plus scrunchie vs self-tied cravats, and what the ushers should wear.",
    category: "Occasion Guide",
    datePublished: "2026-06-12",
    dateModified: "2026-06-12",
    lede: "The short answer: a cravat suits a morning suit, a waistcoat-led three-piece or a traditional venue; a tie suits a slim modern lounge suit and a city wedding. Here's how to make the call with confidence — and how to dress the ushers either way.",
    sections: [
      {
        heading: "When a cravat is the right choice",
        body: [
          "Choose a cravat if you're wearing a morning suit, a tailcoat or a three-piece with a prominent waistcoat — the wider blade of silk fills an open waistcoat the way a narrow tie can't. Cravats also photograph beautifully at traditional venues: churches, country houses, marquee weddings. If your wedding leans classic or formal, the cravat is the stronger choice.",
          "A cravat in hand-finished mulberry silk drapes softly and holds its shape through a long day — the fabric, as much as the style, is what reads as luxurious in photographs.",
        ],
      },
      {
        heading: "When a tie wins",
        body: [
          "Choose a tie if you're in a slim-cut two-piece lounge suit, a contemporary city venue, or a relaxed wedding where a cravat would feel costume-like. A silk tie with a coordinated pocket square gives a modern suit plenty of character without the formality of a cravat.",
          "If you're torn, the waistcoat usually decides it: waistcoat on show suggests cravat; no waistcoat suggests tie.",
        ],
      },
      {
        heading: "Scrunchie cravat or self-tied?",
        body: [
          "A scrunchie (ruche) cravat is pre-gathered on an adjustable band — it sits identically on every usher all day, which is exactly why hire companies use them. A self-tied day cravat looks softer and more natural, but takes practice and varies from wearer to wearer.",
          "A sensible split: the groom self-ties for a natural drape in close-up photographs, while the ushers wear matching scrunchie cravats so the line-up stays uniform.",
        ],
      },
      {
        heading: "What should the ushers wear?",
        body: [
          "Whichever you choose, keep the whole party in one camp — mixing cravats and ties in a line-up looks accidental. Differentiate the groom by design or colourway rather than by garment: the groom in a distinct silk, the ushers in a complementary one from the same palette.",
        ],
      },
      {
        heading: "Can you wear both a cravat and a pocket square?",
        body: [
          "Yes — and most grooms should. Let the pocket square pick up one colour from the cravat rather than repeating the same fabric, so the look reads considered rather than bought as a set.",
        ],
      },
    ],
    related: [
      { label: "Shop silk cravats", href: "/search/cravats" },
      {
        label: "Wedding silk accessories",
        href: "/search/wedding-silk-accessories",
      },
      { label: "Shop pocket squares", href: "/search/pocket-squares" },
    ],
  },
  {
    slug: "royal-ascot-mens-accessories",
    kind: "article",
    title:
      "Royal Ascot 2026 — Men's Accessories by Enclosure | Threaditionz",
    h1: "Royal Ascot 2026: Men's Accessories by Enclosure",
    description:
      "What men can wear to Royal Ascot 2026, enclosure by enclosure — where a cravat is and isn't permitted, morning dress accessories, and pocket square rules.",
    category: "Occasion Guide",
    datePublished: "2026-06-12",
    dateModified: "2026-06-12",
    lede: "Royal Ascot's dress code is set per enclosure, and the detail trips people up: in the Royal Enclosure a tie is compulsory and cravats are not permitted, while elsewhere the rules relax by degrees. Here's where each silk accessory belongs — always check the official Royal Ascot Style Guide for the season's exact wording.",
    sections: [
      {
        heading: "Can you wear a cravat to Royal Ascot?",
        body: [
          "Not in the Royal Enclosure — morning dress there requires a black or grey morning coat, a waistcoat and a tie, and the Style Guide explicitly rules out cravats. In the Queen Anne and Village Enclosures a tie is likewise the stated requirement with a jacket and full-length trousers. The Windsor Enclosure has no formal dress code, so a day cravat with a blazer is at home there — and it's a natural choice for the many race days elsewhere in the calendar that ask for 'smart' rather than morning dress.",
        ],
      },
      {
        heading: "Morning dress, done properly",
        body: [
          "If you're in the Royal Enclosure, the accessories carry the outfit: a silk tie in a deep ground, a waistcoat that complements rather than matches, and a top hat. This is where a hand-finished silk pocket square earns its place — it's the one point of personal expression morning dress allows.",
        ],
      },
      {
        heading: "The pocket square: permitted everywhere",
        body: [
          "No enclosure restricts the pocket square, which makes it the safest way to bring colour and pattern to race day. With morning dress, keep the fold clean — a straight (presidential) fold in silk, showing a centimetre above the pocket line. With a lounge suit in the Queen Anne Enclosure, a one-point or puff fold adds flourish.",
          "Coordinate the square with your tie rather than matching it exactly — pick up one colour and let the patterns differ.",
        ],
      },
      {
        heading: "Race-day colour",
        body: [
          "Royal Ascot in June rewards lighter grounds and confident colour: sky and cornflower blues, sage, soft golds. Save the deepest grounds — navy, burgundy, forest — for the autumn and winter race calendar.",
        ],
      },
      {
        heading: "After Ascot: the same pieces, year round",
        body: [
          "The accessories that work at Ascot work all season — garden parties, summer weddings, Henley. A silk tie, a pocket square and a day cravat for less formal days cover virtually every summer occasion between them.",
        ],
      },
    ],
    related: [
      {
        label: "Business & formal silk",
        href: "/search/business-formal-silk-accessories",
      },
      { label: "Shop pocket squares", href: "/search/pocket-squares" },
      { label: "Shop silk cravats", href: "/search/cravats" },
    ],
  },
  {
    slug: "pocket-square-tie-matching",
    kind: "article",
    title:
      "Should Your Pocket Square Match Your Tie? | Threaditionz",
    h1: "Should Your Pocket Square Match Your Tie?",
    description:
      "No — coordinate, don't match. The simple rules for pairing a pocket square with a tie or cravat: colour echo, pattern contrast, and when plain white is right.",
    category: "Style Guide",
    datePublished: "2026-06-12",
    dateModified: "2026-06-12",
    lede: "No — a pocket square should coordinate with your tie, not match it. An identical fabric in pocket and collar looks bought-as-a-set; an echoed colour in a different pattern looks considered. Here are the rules that make it easy.",
    sections: [
      {
        heading: "The one rule: echo a colour, change the pattern",
        body: [
          "Pick one secondary colour from your tie or cravat and let the pocket square carry it — ideally as that square's dominant colour. Then make sure the two patterns differ: a striped tie with a floral or paisley square, a patterned cravat with a plainer square. Shared colour ties the look together; contrasting pattern keeps it from looking uniform.",
        ],
      },
      {
        heading: "Why matched sets fall flat",
        body: [
          "When tie and square are cut from the same cloth, the eye reads them as one decision repeated twice — and the effect is closer to hire-shop packaging than personal style. Two pieces chosen to complement each other signal exactly the opposite: that each was picked deliberately.",
        ],
      },
      {
        heading: "When in doubt: white",
        body: [
          "A plain white square in silk or linen works with every tie, every suit and every occasion, from a board meeting to black tie. If you're unsure, a white square in a straight fold is never wrong — it's the menswear equivalent of a safe pair of hands.",
        ],
      },
      {
        heading: "What if you're not wearing a tie?",
        body: [
          "Then the pocket square works alone, and the rules relax. With an open collar, coordinate the square with your shirt or jacket instead — a print square against a plain jacket is the easiest win — and use a softer fold, like the puff, to match the relaxed register.",
        ],
      },
      {
        heading: "Does the same rule apply to cravats?",
        body: [
          "Yes. A cravat-and-square pairing follows the identical logic: echo one colour, vary the pattern, and never wear the same design at throat and pocket. Because a cravat shows more silk than a tie, it should lead — choose it first and let the square answer it.",
        ],
      },
    ],
    related: [
      { label: "Shop pocket squares", href: "/search/pocket-squares" },
      { label: "Shop silk cravats", href: "/search/cravats" },
      { label: "Silk gift sets", href: "/search/gift-sets" },
    ],
  },
  {
    slug: "groom-vs-groomsmen-accessories",
    kind: "article",
    title:
      "Groom vs Ushers — Coordinating Wedding Accessories | Threaditionz",
    h1: "Groom vs Ushers: Coordinating Wedding Accessories",
    description:
      "Who wears what in a wedding party — how to set the groom apart from the ushers with silk cravats and pocket squares, coordinate with the bridal party, and buy in multiples.",
    category: "Occasion Guide",
    datePublished: "2026-06-12",
    dateModified: "2026-06-12",
    lede: "The principle is simple: the groom stands apart, the ushers stand together, and everyone shares one palette. Get those three things right and the party photographs as a group with the groom unmistakably at its centre.",
    sections: [
      {
        heading: "How should the groom stand out?",
        body: [
          "Differentiate by design, not by garment. Put the groom in a distinct silk — a different pattern or a richer colourway — while the ushers share a complementary design from the same palette. Keeping everyone in the same garment (all cravats, or all ties) is what makes the difference read as intentional rather than mismatched.",
          "A second lever: give the groom a self-tied cravat for a soft, natural drape in close-ups, and the ushers matching scrunchie cravats so the line-up stays identical all day.",
        ],
      },
      {
        heading: "Build the palette from the bridal party",
        body: [
          "Take the bridesmaids' colour as your anchor and choose silks that complement it rather than copy it — a sage bridesmaid dress beside dusty-pink and cream silks, burgundy beside blush and navy. The accessories shouldn't replicate the dress colour exactly; close-but-distinct photographs better.",
          "Anchor depth to the season: deep jewel tones for autumn and winter weddings, lighter grounds for spring and summer.",
        ],
      },
      {
        heading: "Fathers and other principals",
        body: [
          "Fathers of the couple sit between groom and guests: same palette, quieter design. A pocket square alone — picking up the party's accent colour — is often enough, and it lets them coordinate without looking like an extra usher.",
        ],
      },
      {
        heading: "Buying for a party",
        body: [
          "Order everything from one place at one time — silk colours vary subtly between makers and batches, and a line-up shows it. Count the full party (groom, ushers, fathers, page boys if dressed alike), and order early enough to swap a colourway after seeing it against the suits in person.",
        ],
      },
      {
        heading: "The accessories as thank-you gifts",
        body: [
          "Silk accessories double as the groomsmen's thank-you — gift-boxed on the morning of the wedding and kept long after it. Our gift sets pair a scarf with a pocket square for exactly this.",
        ],
      },
    ],
    related: [
      {
        label: "Wedding silk accessories",
        href: "/search/wedding-silk-accessories",
      },
      { label: "Silk gift sets", href: "/search/gift-sets" },
      { label: "Shop silk cravats", href: "/search/cravats" },
    ],
  },
];

export function getAllGuides(): Guide[] {
  return ORDERED_GUIDES;
}

export function getGuide(slug: string): Guide | undefined {
  return ORDERED_GUIDES.find((g) => g.slug === slug);
}
