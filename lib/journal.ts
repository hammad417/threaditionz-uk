// Cornerstone editorial content (journal/guides) — the primary GEO lever. These
// answer the high-intent questions generative engines surface for this brand
// ("how to tie a cravat", "how to fold a pocket square", "cravat vs ascot"), with
// HowTo / Article structured data and dense internal links to collections.
//
// Content lives in code because the Shopify Basic plan blocks CMS-page/blog
// creation (same pattern as /faqs, /our-story). Add a guide by appending here.

export type HowToStep = { name: string; text: string };

/** Comparison table — the extractable format answer engines lift for
 *  "X vs Y" and "best X for Y" queries. */
export type GuideTable = {
  caption?: string;
  headers: string[];
  rows: string[][];
};

export type GuideFaq = { question: string; answer: string };

export type GuideSection = {
  heading: string;
  body: string[];
  table?: GuideTable;
};

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
  /** Embedded Q&As — rendered on-page and emitted as FAQPage JSON-LD. */
  faqs?: GuideFaq[];
  /** Cross-links to specific products and shoppable collections — guides
   *  should hard-link the exact pieces they discuss, not just categories. */
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
    dateModified: "2026-06-12",
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
        table: {
          caption: "How to wear a cravat, by occasion",
          headers: ["Occasion", "How to wear it", "Ground & pattern"],
          rows: [
            [
              "Wedding (groom or guest)",
              "Tucked into an open collar, fuller knot",
              "Deeper grounds — navy, burgundy, forest — or the party's palette",
            ],
            [
              "Races & garden parties",
              "Tucked, with a waistcoat if the dress code allows",
              "Lighter grounds, confident pattern",
            ],
            [
              "Smart-casual daywear",
              "Over an open shirt, against the chest",
              "Smaller prints, softer colours",
            ],
            [
              "Black tie",
              "Don't — black tie calls for a bow tie; bring silk in at the pocket instead",
              "—",
            ],
          ],
        },
      },
      {
        heading: "The most common mistakes",
        body: [
          "Tying it too tight. A cravat is meant to drape, not grip — if it looks like a bandage, loosen the knot and let the top blade puff slightly. The silk should sit full at the throat with soft, irregular folds.",
          "Wearing it with the wrong collar. A cravat needs room: an open spread or cutaway collar works; a buttoned-down collar fights it. Leave the top one or two shirt buttons undone and let the collar frame the silk.",
          "Polyester. A cravat is nothing but drape and sheen, which is why the fabric is the whole game — synthetic versions spring flat and shine harshly in photographs. Real mulberry silk folds softly and catches light with depth rather than glare.",
        ],
      },
      {
        heading: "Where the cravat comes from",
        body: [
          "The cravat is the ancestor of every modern necktie. Croatian mercenaries serving in France during the Thirty Years' War wore knotted neck-cloths that caught the eye of the Parisian court, and the style — and the word, from 'Croate' — spread through fashionable Europe in the seventeenth century. Charles II brought the fashion to England with the Restoration in 1660, and the English have been refining it ever since.",
          "The day cravat you'll tie with this guide is the relaxed descendant of that court style: less architecture than the pleated, pinned ascot of Edwardian morning dress, more presence than a necktie.",
        ],
      },
      {
        heading: "Matching a cravat to the occasion",
        body: [
          "For formal events, choose deeper grounds — navy, burgundy, forest — and let a heritage motif carry the detail. For daywear, lighter grounds and smaller prints keep the look easy.",
          "For a wedding party, pick a single design in multiples so the groom and groomsmen coordinate without matching exactly.",
        ],
      },
      {
        heading: "Looking after the knot (and the silk)",
        body: [
          "Untie a cravat fully after wearing — never leave it knotted, which sets creases into the bias. Hang it overnight so the folds relax, then store it flat or loosely rolled, away from direct sunlight. Light steam revives the drape; a hot iron flattens the hand-rolled edges and kills it. For anything more, dry clean only.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long does it take to tie a cravat?",
        answer:
          "About three minutes once you've practised the knot two or three times. The five steps above cover the classic day-cravat knot — drape, cross, loop, fold, adjust.",
      },
      {
        question: "What shirt do you wear with a cravat?",
        answer:
          "An open spread or cutaway collar with the top one or two buttons undone. The cravat either tucks inside the open collar (formal) or sits against the chest under it (relaxed). Avoid button-down collars.",
      },
      {
        question: "Can you wear a cravat casually?",
        answer:
          "Yes — worn loose against the chest under an open shirt, a day cravat is smart-casual rather than formal. It pairs naturally with a blazer or unstructured jacket.",
      },
      {
        question: "Is a cravat the same as an ascot?",
        answer:
          "An ascot is the formal, pleated style of cravat traditionally pinned and worn with morning dress. The day cravat in this guide is the softer, unpinned style — in Britain, 'cravat' usually means this one.",
      },
      {
        question: "Should the cravat match the pocket square?",
        answer:
          "Coordinate rather than match: let the pocket square pick up one colour from the cravat in a different pattern. Identical fabric at throat and pocket looks bought-as-a-set.",
      },
    ],
    related: [
      {
        label: "The Anchored Navy Pride Cravat",
        href: "/product/anchored-navy-pride-silk-cravat",
      },
      {
        label: "The Maroon Eclipse Cravat",
        href: "/product/maroon-eclipse-silk-cravat",
      },
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
    dateModified: "2026-06-12",
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
        heading: "Which fold should you use?",
        body: [
          "The straight (presidential) fold is the most formal and works with any pattern — only a clean line shows. The one-point fold reveals a single triangle for a touch more flourish. The puff fold gathers the silk loosely for a soft, relaxed finish that suits print-heavy squares.",
          "With a hand-rolled silk square, the puff fold shows off the rolled edge beautifully — let the fabric fall naturally rather than pressing it.",
        ],
        table: {
          caption: "Pocket square folds compared",
          headers: ["Fold", "Formality", "Best for", "Shows"],
          rows: [
            [
              "Straight (presidential)",
              "Most formal",
              "Business, black tie, morning dress",
              "A clean horizontal band",
            ],
            [
              "One-point",
              "Formal–smart",
              "Weddings, formal lounge suits",
              "A single crisp triangle",
            ],
            [
              "Two-point",
              "Smart",
              "Weddings and occasions with more flourish",
              "Two offset peaks",
            ],
            [
              "Puff",
              "Relaxed",
              "Patterned silk, smart-casual jackets",
              "A soft cloud of silk and the rolled edge",
            ],
            [
              "Reverse puff",
              "Relaxed–smart",
              "Showing a contrast border or corner detail",
              "Petal-like points around a puff",
            ],
          ],
        },
      },
      {
        heading: "The two-point and reverse puff, briefly",
        body: [
          "For the two-point: start as a diamond, fold the bottom corner up to sit just beside the top corner (not behind it), then fold the sides in and tuck. The offset corners give you two peaks instead of one.",
          "For the reverse puff: pinch the centre of the square and lift, as for a puff, but slide it into the pocket points-up so the corners fan around the gathered silk like petals. It's the best fold for squares with a contrast border.",
        ],
      },
      {
        heading: "Silk, linen or cotton — does the fabric change the fold?",
        body: [
          "Yes, more than the instructions do. Silk holds soft, rounded shapes, which is why it puffs so well and why a silk straight fold shows a gentle swell rather than a knife edge. Linen and cotton crease crisply, suiting pointed folds, but sit flat and matte. For the puff and reverse puff, silk isn't just better — it's the point.",
          "Size matters too: at around 30 × 30 cm, a silk square has enough body to stay put in most breast pockets without ballooning. Much smaller and it slips down; much larger and the fold bulks the pocket.",
        ],
      },
      {
        heading: "How to keep it from sinking into the pocket",
        body: [
          "If your square keeps disappearing, the pocket is likely deeper than the fold. Fold the bottom up once more before inserting so the square sits on a thicker base, or fold it around a strip of card for very deep pockets. Reveal about a centimetre of silk above the pocket line — enough to read as deliberate, not enough to flop.",
        ],
      },
      {
        heading: "Should the pocket square match the tie?",
        body: [
          "Coordinate, don't match. Pick up one colour from your tie or cravat in the pocket square rather than using the identical fabric — it looks considered instead of bought-as-a-set.",
          "No tie at all? Then the square coordinates with the shirt or jacket instead, and a softer fold like the puff suits the relaxed register.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the most formal pocket square fold?",
        answer:
          "The straight (presidential) fold — a clean horizontal band of fabric showing about a centimetre above the pocket. It's correct for business, black tie and morning dress alike.",
      },
      {
        question: "How much of the pocket square should show?",
        answer:
          "Around one centimetre for a straight fold; a little more for pointed and puff folds. If more than a third of the pocket's height is showing, fold deeper.",
      },
      {
        question: "Do you iron a silk pocket square?",
        answer:
          "Avoid it. A hot iron flattens the hand-rolled edges and kills the silk's natural body. If a square has been stored badly, light steam from a distance relaxes the creases.",
      },
      {
        question: "What size should a pocket square be?",
        answer:
          "Roughly 30 × 30 cm (12 × 12 inches) for silk — enough body to hold a fold and stay put in the pocket without adding bulk.",
      },
      {
        question: "Can you wear a pocket square without a tie?",
        answer:
          "Absolutely — it's the easiest way to finish an open-collar look. Coordinate the square with the shirt or jacket and use a relaxed fold such as the puff.",
      },
    ],
    related: [
      {
        label: "The Solid Navy Blue Pocket Square",
        href: "/product/the-solid-navy-blue-silk-pocket-square",
      },
      {
        label: "The Diamond Maze Pocket Square",
        href: "/product/diamond-maze-silk-pocket-square",
      },
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
      {
        label: "The Double Dotted Maroon Cravat",
        href: "/product/double-dotted-maroon-silk-cravat",
      },
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
      "How to choose and coordinate silk pocket squares, cravats and scarves for the groom and groomsmen — colour, coordination and finishing touches for a wedding day.",
    category: "Occasion Guide",
    datePublished: "2026-06-02",
    dateModified: "2026-06-12",
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
          "Anchor the palette to the season and the bridal party: deep jewel tones for autumn and winter, lighter grounds for spring and summer. A distinctive print — a block-print, floral or fine-drawn motif — adds character and photographs beautifully up close.",
          "For festive and winter weddings, richer grounds and gold-toned detailing feel right for the occasion.",
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
        label: "The Navy Valour Anchor Cravat",
        href: "/product/navy-valour-anchor-silk-cravat",
      },
      {
        label: "Maroon White Tartan Gift Set",
        href: "/product/maroon-white-tartan-silk-scarf-pocket-square-set",
      },
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
        table: {
          caption: "Cravat vs tie for the groom, at a glance",
          headers: ["Factor", "Cravat", "Tie"],
          rows: [
            [
              "Suit",
              "Morning suit, tailcoat, waistcoat-led three-piece",
              "Slim two-piece lounge suit",
            ],
            [
              "Venue",
              "Church, country house, marquee",
              "City venue, registry office, restaurant",
            ],
            [
              "Register",
              "Traditional, formal, romantic",
              "Modern, understated",
            ],
            [
              "Photographs",
              "Fuller at the throat; fills an open waistcoat",
              "Cleaner vertical line",
            ],
            [
              "Ushers",
              "Scrunchie cravats keep the line-up uniform",
              "Matching ties — simplest to coordinate",
            ],
            [
              "Risk to avoid",
              "Costume-like at a casual wedding",
              "Anonymous against morning dress",
            ],
          ],
        },
      },
      {
        heading: "Will I look overdressed in a cravat?",
        body: [
          "Only if the rest of the wedding isn't dressed to meet it. At a morning-dress or three-piece wedding, a cravat is exactly right; at a relaxed two-piece wedding it can read as fancy dress. The honest test: if your venue, your suit and your wedding party all lean traditional, the cravat belongs. If you're hesitating because nobody you know has worn one — that's not a reason. If you're hesitating because the wedding is jeans-and-blazer casual — that is.",
          "Grooms also worry the cravat will feel fussy on the day. A properly tied day cravat in real silk is no more restrictive than a tie, and unlike a tie it can be loosened into an open-collar evening look without coming off.",
        ],
      },
      {
        heading: "Timing and logistics",
        body: [
          "Decide the neckwear before the final suit fitting — the collar shape and waistcoat cut should be chosen around it. Order the party's silks together, from one maker, at least six weeks out: colours vary subtly between batches, and you want time to see the silk against the actual suits and swap a colourway if needed.",
          "On the morning, allow ten unhurried minutes for the groom's self-tied knot — and have the best man practise it once too, as insurance.",
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
    faqs: [
      {
        question: "Is a cravat or a tie more formal for a wedding?",
        answer:
          "A cravat — it belongs with morning dress and waistcoat-led tailoring, the most formal daytime wedding registers. A tie is the standard for modern lounge suits.",
      },
      {
        question: "Can the groom wear a cravat if the ushers wear ties?",
        answer:
          "It's better not to mix: keep the whole party in one garment and differentiate the groom by design or colourway instead. Mixed neckwear in a line-up reads as accidental.",
      },
      {
        question: "What is a scrunchie cravat?",
        answer:
          "A pre-gathered (ruche) cravat on an adjustable band. It sits identically on every wearer all day, which is why hire companies use them for ushers; the groom usually self-ties for a softer, more natural drape.",
      },
      {
        question: "What colour cravat should a groom wear?",
        answer:
          "Anchor it to the season and the bridal party's palette: deep jewel tones for autumn and winter, lighter grounds for spring and summer, complementing — not copying — the bridesmaids' colour.",
      },
      {
        question: "Can you wear a cravat with a two-piece suit?",
        answer:
          "You can, but it works best when the wedding leans traditional. With a slim modern two-piece and no waistcoat, a tie with a strong pocket square usually sits more naturally.",
      },
    ],
    related: [
      {
        label: "The Maroon Eclipse Cravat",
        href: "/product/maroon-eclipse-silk-cravat",
      },
      {
        label: "The Solid Navy Blue Pocket Square",
        href: "/product/the-solid-navy-blue-silk-pocket-square",
      },
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
        table: {
          caption: "Men's dress code and silk accessories by enclosure (check the official Style Guide each season)",
          headers: ["Enclosure", "Dress code", "Cravat?", "Pocket square?"],
          rows: [
            [
              "Royal Enclosure",
              "Black or grey morning coat, waistcoat, tie, top hat",
              "No — explicitly not permitted",
              "Yes",
            ],
            [
              "Queen Anne Enclosure",
              "Full-length trousers, jacket, collared shirt and tie",
              "No — a tie is stated",
              "Yes",
            ],
            [
              "Village Enclosure",
              "Jacket and tie with full-length trousers",
              "No — a tie is stated",
              "Yes",
            ],
            [
              "Windsor Enclosure",
              "No formal dress code; smart dress encouraged",
              "Yes — a day cravat sits naturally here",
              "Yes",
            ],
          ],
        },
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
        heading: "A race-day checklist",
        body: [
          "For the Royal Enclosure: morning coat, waistcoat, silk tie, pocket square, top hat — hat worn whenever you're in the open. For the Queen Anne and Village Enclosures: a well-cut suit, silk tie and pocket square; a waistcoat lifts it further. For Windsor: blazer or suit, day cravat or open collar, pocket square. Everywhere: comfortable shoes you can stand in for six hours, and silk that won't wilt — a hand-rolled square keeps its body through a long, warm day in a way cheaper fabric doesn't.",
        ],
      },
      {
        heading: "After Ascot: the same pieces, year round",
        body: [
          "The accessories that work at Ascot work all season — garden parties, summer weddings, Henley. A silk tie, a pocket square and a day cravat for less formal days cover virtually every summer occasion between them.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can you wear a cravat in the Royal Enclosure at Ascot?",
        answer:
          "No. The Royal Enclosure dress code requires a tie with morning dress and explicitly rules out cravats. Save the day cravat for the Windsor Enclosure or less formal race days.",
      },
      {
        question: "Are pocket squares allowed at Royal Ascot?",
        answer:
          "Yes — no enclosure restricts them. A silk pocket square is the one point of personal expression every Royal Ascot dress code allows.",
      },
      {
        question: "What colour tie should you wear to Royal Ascot?",
        answer:
          "June racing rewards lighter, confident colour — sky and cornflower blues, sage, soft golds — set against the grey or black of morning dress. Save the deepest grounds for the winter calendar.",
      },
      {
        question: "Do you have to wear a top hat at Royal Ascot?",
        answer:
          "In the Royal Enclosure, yes — a black or grey top hat is part of the dress code, worn whenever you're in the open air. Other enclosures don't require one.",
      },
      {
        question: "What should men wear to the Windsor Enclosure?",
        answer:
          "There's no formal dress code, but smart dress is encouraged — a blazer or suit with an open collar or day cravat and a pocket square strikes the right note.",
      },
    ],
    related: [
      {
        label: "The Solid Antique Gold Pocket Square",
        href: "/product/the-solid-antique-gold-silk-pocket-square",
      },
      {
        label: "Blue with White Polka Cravat",
        href: "/product/blue-with-white-polka-cravat",
      },
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
      {
        label: "The Solid Navy Blue Pocket Square",
        href: "/product/the-solid-navy-blue-silk-pocket-square",
      },
      {
        label: "The Gold Vintage Pocket Square",
        href: "/product/the-gold-vintage-silk-pocket-square",
      },
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
        label: "Navy Valour Anchor Gift Set",
        href: "/product/navy-valour-anchor-silk-scarf-pocket-square-set",
      },
      {
        label: "The Red Classic Plaid Cravat",
        href: "/product/the-red-classic-plaid-silk-cravat",
      },
      {
        label: "Wedding silk accessories",
        href: "/search/wedding-silk-accessories",
      },
      { label: "Silk gift sets", href: "/search/gift-sets" },
      { label: "Shop silk cravats", href: "/search/cravats" },
    ],
  },
  {
    slug: "best-pocket-squares-navy-suit",
    kind: "article",
    title:
      "The Best Silk Pocket Squares for a Navy Suit | Threaditionz",
    h1: "The Best Silk Pocket Squares for a Navy Suit",
    description:
      "Which pocket square colours work with a navy suit — gold, burgundy, ice blue and more — with specific hand-finished silk picks for business, weddings and summer.",
    category: "Buying Guide",
    datePublished: "2026-06-12",
    dateModified: "2026-06-12",
    lede: "Navy is the easiest suit to dress with silk: warm golds and burgundies complement it, soft blues tone with it, and almost nothing clashes. Here are the combinations that work hardest — with a specific hand-finished pick for each — chosen from our own 100% mulberry silk collection.",
    sections: [
      {
        heading: "The short answer: six colours that always work",
        body: [
          "Gold and antique gold sit opposite navy on the colour wheel and bring instant warmth — the single most reliable pairing. Burgundy and maroon read traditional and rich, ideal for business and autumn weddings. Ice blue and soft tonal blues keep everything quiet and modern. Blush, peach and pink lift navy for summer. White is the universal safe hand. And patterned squares that contain a thread of navy tie themselves to the suit automatically.",
        ],
        table: {
          caption: "Navy suit pairings at a glance",
          headers: ["Square colour", "Effect with navy", "Best for", "Our pick"],
          rows: [
            [
              "Antique gold",
              "Warm, complementary contrast",
              "Weddings, the races, evening",
              "The Solid Antique Gold",
            ],
            [
              "Burgundy / maroon",
              "Rich, traditional depth",
              "Business, autumn & winter",
              "Double Dotted Maroon",
            ],
            [
              "Ice blue",
              "Quiet, tonal, modern",
              "Business, minimalist dressing",
              "Pastel Ice Blue",
            ],
            [
              "Tonal blue pattern",
              "Self-coordinating",
              "Any occasion, zero effort",
              "Sapphire Blossom",
            ],
            [
              "Peach / blush",
              "Soft summer lift",
              "Summer weddings, garden parties",
              "Peach with White Polka",
            ],
            [
              "Vintage gold pattern",
              "Character and warmth",
              "Smart-casual, occasions",
              "The Gold Vintage",
            ],
          ],
        },
      },
      {
        heading: "For weddings and occasions: antique gold",
        body: [
          "If you buy one square for a navy suit, make it gold. The contrast is warm rather than loud, it photographs beautifully against navy wool, and it works from a morning suit to a dinner jacket. A solid antique gold in silk — puffed or folded straight — is the closest thing menswear has to a guaranteed result.",
        ],
      },
      {
        heading: "For business: burgundy or ice blue",
        body: [
          "Burgundy against navy is the classic City pairing — rich, serious and impossible to get wrong with a white or pale blue shirt. If your taste runs quieter, an ice-blue square keeps the whole outfit in one cool register; the straight fold suits both.",
        ],
      },
      {
        heading: "For summer: peach, blush and botanical prints",
        body: [
          "Navy can feel heavy in June. A peach or blush square — or a light botanical print on a pale ground — lifts it instantly for summer weddings and garden parties. Pair with a puff fold and let the silk sit soft.",
        ],
      },
      {
        heading: "The one rule that makes any choice work",
        body: [
          "Echo, don't match. If you're wearing a tie or cravat, let the square pick up one of its secondary colours in a different pattern. If you're open-collared, coordinate the square with the shirt or the jacket's undertone instead. And whatever the colour: real silk drapes and catches light in a way polyester never will — on a navy ground, that difference is exactly what the eye notices.",
        ],
      },
    ],
    faqs: [
      {
        question: "What colour pocket square goes best with a navy suit?",
        answer:
          "Gold is the most reliable choice — warm, complementary and right for almost any occasion. Burgundy (business, winter), ice blue (quiet and modern) and blush or peach (summer) are the other staples.",
      },
      {
        question: "Can you wear a navy pocket square with a navy suit?",
        answer:
          "Only if the square carries another colour or a clear pattern — a solid navy square vanishes into the suit. A navy-ground square with gold, blush or white in the print works well.",
      },
      {
        question: "What pocket square suits a navy suit at a wedding?",
        answer:
          "Antique gold for a classic wedding; blush, peach or a light botanical print for a summer one. Coordinate with the wedding party's palette rather than matching the tie exactly.",
      },
      {
        question: "Silk or linen pocket square for a navy suit?",
        answer:
          "Silk for occasions and anything after dark — it drapes softly and catches light against navy wool. Linen suits crisp, casual summer daywear but sits flat and matte.",
      },
    ],
    related: [
      {
        label: "The Solid Antique Gold Pocket Square",
        href: "/product/the-solid-antique-gold-silk-pocket-square",
      },
      {
        label: "Double Dotted Maroon Pocket Square",
        href: "/product/double-dotted-maroon-silk-pocket-square",
      },
      {
        label: "Pastel Ice Blue Pocket Square",
        href: "/product/four-in-one-pastel-ice-blue-silk-pocket-square",
      },
      {
        label: "Sapphire Blossom Pocket Square",
        href: "/product/sapphire-blossom-silk-pocket-square",
      },
      {
        label: "Peach with White Polka Pocket Square",
        href: "/product/peach-with-white-polka-silk-pocket-square",
      },
      {
        label: "The Gold Vintage Pocket Square",
        href: "/product/the-gold-vintage-silk-pocket-square",
      },
      { label: "Shop all pocket squares", href: "/search/pocket-squares" },
    ],
  },
  {
    slug: "best-cravats-summer-wedding",
    kind: "article",
    title: "The Best Cravats for a Summer Wedding | Threaditionz",
    h1: "The Best Cravats for a Summer Wedding",
    description:
      "Which cravat colours and patterns work for a summer wedding — for grooms, ushers and guests — with hand-finished silk picks in peach, aqua, turquoise and blush.",
    category: "Buying Guide",
    datePublished: "2026-06-12",
    dateModified: "2026-06-12",
    lede: "A summer wedding cravat should be lighter in colour and softer in pattern than its winter counterpart: peach, aqua, blush and sky tones against light grey, stone or airforce-blue tailoring. Here's how to choose for the groom, the ushers and guests — with specific picks from our hand-finished mulberry silk collection.",
    sections: [
      {
        heading: "The summer palette, and why it matters",
        body: [
          "Summer light is bright and unforgiving of heavy colour. The deep burgundies and forests that anchor a winter wedding can look severe against a light suit at midsummer; what photographs beautifully from May to September is the softer register — peach, blush pink, aqua, turquoise, sky blue — set against pale tailoring. The silk itself matters more in summer too: a long warm day wilts cheap fabric, while hand-rolled mulberry silk keeps its body from ceremony to last dance.",
        ],
        table: {
          caption: "Summer wedding cravats by suit and role",
          headers: ["Suit colour", "Cravat", "Who it suits"],
          rows: [
            [
              "Light grey",
              "Peach with white polka, or blush pink",
              "Groom or ushers — warm against cool grey",
            ],
            [
              "Stone / beige",
              "Aqua botanical, or turquoise (ferozi)",
              "Groom — fresh, garden-party register",
            ],
            [
              "Airforce / light blue",
              "Festive pink, or sunny botanical prints",
              "Ushers and guests — soft contrast",
            ],
            [
              "Navy (summer-weight)",
              "Blue with white polka, tonal and crisp",
              "Guests — quietly correct",
            ],
            [
              "Cream / ivory",
              "Spring botanical on a light ground",
              "Groom at a destination or garden wedding",
            ],
          ],
        },
      },
      {
        heading: "For the groom: lead with one clear colour",
        body: [
          "The groom's cravat should be the most distinct silk in the party — one clear colour the photographs can anchor on. Peach against light grey is the modern classic; aqua or turquoise against stone reads fresher and suits outdoor ceremonies. Self-tie it for a natural drape, and echo one of its colours in the pocket square rather than repeating the fabric.",
        ],
      },
      {
        heading: "For the ushers: one design, worn identically",
        body: [
          "Put the ushers in a single complementary design — or the groom's design in a quieter colourway — and use scrunchie-style cravats so the line-up sits identically through the day. Polka dots are the safest usher pattern in summer: enough interest up close, clean at a distance.",
        ],
      },
      {
        heading: "For guests: lighter, not louder",
        body: [
          "A guest's cravat should defer to the party: tonal blues, soft botanicals or muted pinks rather than anything that competes with the groom. With a summer-weight navy suit, a blue-and-white polka cravat is quietly correct; with stone or cream, a light botanical print earns its place.",
        ],
      },
      {
        heading: "What about the heat?",
        body: [
          "A silk day cravat is cooler to wear than it looks — silk is light, breathable and worn looser than a tie. Tuck it into an open collar for the ceremony, and as the evening relaxes it can be loosened against the chest rather than removed: the look softens with the day instead of falling apart.",
        ],
      },
    ],
    faqs: [
      {
        question: "What colour cravat is best for a summer wedding?",
        answer:
          "Soft, light colours: peach, blush, aqua, turquoise and sky blue, set against light grey, stone or summer-weight blue tailoring. Save deep burgundy and forest for autumn and winter.",
      },
      {
        question: "Should the groom and ushers wear the same cravat?",
        answer:
          "Coordinate rather than match: the groom in a distinct design, the ushers sharing one complementary design from the same palette. Keep everyone in cravats — mixing cravats and ties looks accidental.",
      },
      {
        question: "Is a cravat too hot to wear in summer?",
        answer:
          "No — real silk is light and breathable, and a day cravat is worn looser than a tie. It can also be relaxed into an open-collar look as the evening goes on.",
      },
      {
        question: "Can a wedding guest wear a cravat?",
        answer:
          "Yes, if the wedding leans traditional — choose a quieter colour and pattern than the wedding party's so you complement rather than compete.",
      },
      {
        question: "What do you wear with a summer wedding cravat?",
        answer:
          "An open spread-collar shirt, a light-coloured suit or morning dress, and a pocket square that echoes one colour from the cravat in a different pattern.",
      },
    ],
    related: [
      {
        label: "Peach with White Polka Cravat",
        href: "/product/peach-with-white-polka-silk-cravat",
      },
      {
        label: "Aqua Botanical Bliss Cravat",
        href: "/product/aqua-botanical-bliss-silk-cravat",
      },
      {
        label: "Ferozi (Turquoise) Cravat",
        href: "/product/ferozi-silk-cravat",
      },
      {
        label: "The Festive Pink Cravat",
        href: "/product/the-festive-pink-silk-cravat",
      },
      {
        label: "Spring Soul Cravat",
        href: "/product/spring-soul-silk-cravat",
      },
      {
        label: "Blue with White Polka Cravat",
        href: "/product/blue-with-white-polka-cravat",
      },
      { label: "Shop all cravats", href: "/search/cravats" },
      {
        label: "Wedding silk accessories",
        href: "/search/wedding-silk-accessories",
      },
    ],
  },
];

export function getAllGuides(): Guide[] {
  return ORDERED_GUIDES;
}

export function getGuide(slug: string): Guide | undefined {
  return ORDERED_GUIDES.find((g) => g.slug === slug);
}
