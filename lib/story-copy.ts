// lib/story-copy.ts
// All narrative copy for /story lives here so it is server-rendered
// (crawlable by Googlebot, GPTBot, PerplexityBot, ClaudeBot) and easy to edit
// without touching motion code.
//
// PROVENANCE NOTE: Act 3 uses "Designed in England. Handcrafted in Pakistan."
// This resolves the "crafted in England" vs custom_made_in conflict honestly —
// but it is a brand decision. Confirm before launch.

export const storyMeta = {
  title: "Our Story — The Thread Between Two Worlds | Threaditionz",
  description:
    "How Ajrak block-printing, Mughal patternwork and the poetry of Ghalib became pocket squares, cravats and scarves in 100% silk. Designed in England, handcrafted in Pakistan.",
};

export interface StoryAct {
  id: string;
  eyebrow: string;
  heading: string;
  body: string[];
}

export const acts: StoryAct[] = [
  {
    id: "thread",
    eyebrow: "Threaditionz",
    heading: "Every tradition begins with a thread.",
    body: [
      "Silk holds light the way memory holds a moment — never quite still. This is the story of how patterns five centuries old found their way into a gentleman\u2019s breast pocket.",
    ],
  },
  {
    id: "motif",
    eyebrow: "The Motif",
    heading: "Geometry that outlived empires.",
    body: [
      "Ajrak is not printed so much as built — resist, dye, wash, repeat — each pass of the carved block laying another layer of indigo and madder into the cloth. The trefoil at its centre has been traced from the Indus Valley to the courts of the Mughals.",
      "We redraw these motifs by hand before they ever touch silk, keeping the mathematics intact and the imperfections deliberate.",
    ],
  },
  {
    id: "craft",
    eyebrow: "The Craft",
    heading: "Designed in England. Handcrafted in Pakistan.",
    body: [
      "Each piece begins as a drawing in our English studio and becomes cloth in workshops along the Indus, where block-carvers and dyers still work the way their grandfathers did.",
      "The block is carved. The vat is stirred. The silk goes in white and comes out carrying five hundred years. No two runs are identical — that is the point.",
    ],
  },
  {
    id: "word",
    eyebrow: "The Word",
    heading: "\u201CThere are other worlds beyond the stars.\u201D",
    body: [
      "Mirza Ghalib wrote of longing in a script that moves like water. Our calligraphy pieces set his couplets in silk — worn close to the chest, where a poem belongs.",
    ],
  },
  {
    id: "gentleman",
    eyebrow: "The Gentleman",
    heading: "Heritage, folded to a point.",
    body: [
      "A pocket square is the smallest canvas a man carries. Ours arrive pressed, hand-rolled at the edges, and ready for a morning at the races or a signature at the registry office.",
    ],
  },
  {
    id: "invitation",
    eyebrow: "Begin",
    heading: "Wear the story.",
    body: [
      "Explore the patterns, the folds, and the poems. Every piece is 100% silk, cut and finished by hand.",
    ],
  },
];

// Collection handles verified against the live Storefront API (2026-07-07).
// patternPillar points at the journal index because no heritage-patterns
// pillar guide exists yet — retarget when that guide is written.
export const storyLinks = {
  ajrakCollection: "/search/heritage-ajrak-silk-accessories",
  patternPillar: "/journal",
  giftSets: "/search/gift-sets",
};
