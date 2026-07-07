// lib/story-copy.ts
// All narrative copy for /our-story lives here so it is server-rendered
// (crawlable by Googlebot, GPTBot, PerplexityBot, ClaudeBot) and easy to edit
// without touching motion code.
//
// PROVENANCE NOTE: Act 3 uses "Designed in England. Handcrafted in Pakistan."
// This resolves the "crafted in England" vs custom_made_in conflict honestly —
// but it is a brand decision. Confirm before launch.

export const storyMeta = {
  title: "Our Story — Heritage Silk, Woven Between Two Worlds | Threaditionz",
  description:
    "The Threaditionz story: how archival block-prints, Mughal florals, paisley, damask and nastaliq calligraphy become hand-finished 100% mulberry silk pocket squares, cravats and scarves for the modern gentleman.",
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
      "Silk holds light the way memory holds a moment — never quite still. This is the story of how patterns centuries old found their way into the modern gentleman’s wardrobe: the smallest details that finish the look.",
    ],
  },
  {
    id: "motif",
    eyebrow: "The Motifs",
    heading: "Geometry that outlived empires.",
    body: [
      "Take Ajrak, the oldest pattern in our archive: not printed so much as built — resist, dye, wash, repeat — each pass of the carved block laying another layer of indigo and madder into the cloth. The trefoil at its centre has been traced from the Indus Valley to the courts of the Mughals.",
      "It keeps company with Mughal florals, paisley, damask and brocade, polka dots and fine-drawn geometrics — every print in the collection chosen to carry meaning, not just colour. We redraw each motif by hand before it ever touches silk, keeping the mathematics intact and the imperfections deliberate.",
    ],
  },
  {
    id: "craft",
    eyebrow: "The Craft",
    heading: "Designed in England. Handcrafted in Pakistan.",
    body: [
      "Each piece begins as a drawing in our English studio and becomes cloth in workshops along the Indus, where block-carvers, dyers and weavers still work the way their grandfathers did.",
      "The block is carved. The vat is stirred. The pure mulberry silk goes in white and comes out carrying five hundred years. No two runs are identical — that is the point.",
    ],
  },
  {
    id: "word",
    eyebrow: "The Word",
    heading: "“There are other worlds beyond the stars.”",
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
      "The same hands finish our cravats and scarves — cut for weddings, celebrations and everyday refinement, made to be worn, gifted and kept.",
    ],
  },
  {
    id: "invitation",
    eyebrow: "Begin",
    heading: "Wear the story.",
    body: [
      "Explore the patterns, the folds, and the poems. Every piece is 100% mulberry silk, cut and finished by hand.",
    ],
  },
];

export interface StoryLink {
  label: string;
  href: string;
  primary?: boolean;
}

// Collection handles verified against the live Storefront API (2026-07-07).
// Type hubs first so the page invites the whole range, not one pattern.
export const storyLinks: StoryLink[] = [
  { label: "Explore the collection", href: "/search", primary: true },
  { label: "Pocket squares", href: "/search/pocket-squares" },
  { label: "Cravats", href: "/search/cravats" },
  { label: "Silk scarves", href: "/search/silk-scarves" },
  { label: "Gift sets", href: "/search/gift-sets" },
  { label: "Read the Journal", href: "/journal" },
];
