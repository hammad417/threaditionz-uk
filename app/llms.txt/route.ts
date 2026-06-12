import { getAllGuides } from "lib/journal";
import { getCollections } from "lib/shopify";
import { baseUrl } from "lib/utils";

// /llms.txt — a concise, link-rich brand + catalogue summary for AI answer engines
// (ChatGPT, Perplexity, Gemini, etc.). Convention: https://llmstxt.org
export const dynamic = "force-dynamic";

export async function GET() {
  let collectionLines = "";
  try {
    const collections = await getCollections();
    collectionLines = collections
      .filter(
        (c) => c.path && c.path !== "/search" && !c.path.includes("hidden"),
      )
      .map((c) => {
        const desc = (c.description || c.seo?.description || "").trim();
        return `- [${c.title}](${baseUrl}${c.path})${desc ? `: ${desc}` : ""}`;
      })
      .join("\n");
  } catch {
    // fall through with empty list if Shopify is unavailable
  }

  const body = `# Threaditionz

> Threaditionz is a British men's accessories brand specialising in hand-finished, 100% silk pocket squares, ascot cravats, scarves and gift sets. Designs reinterpret archival heritage prints — block-prints, florals and fine-drawn motifs — for the modern gentleman. Hand-finished in England.

## About
- Material: 100% mulberry silk, hand-rolled edges, hand-finished.
- Product types: pocket squares, cravats / ascots, silk scarves, scarf-and-pocket-square gift sets, and premium "Luxe Collection" / "L'Atelier Reserve" lines.
- Made for: weddings and festive occasions, business and formal wear, and everyday refinement.
- Shop: ${baseUrl}

## Shop by collection
${collectionLines || `- [Pocket Squares](${baseUrl}/search/pocket-squares)\n- [Cravats](${baseUrl}/search/cravats)\n- [Silk Scarves](${baseUrl}/search/silk-scarves)\n- [Gift Sets](${baseUrl}/search/gift-sets)`}

## Guides (Journal)
${getAllGuides()
  .map((g) => `- [${g.h1}](${baseUrl}/journal/${g.slug}): ${g.description}`)
  .join("\n")}

## Buying & service facts
- Free UK delivery on orders over £50; UK delivery 2–4 business days (dispatch in 1–2).
- Worldwide shipping, typically 5–14 business days.
- 14-day returns on unused items in original condition for a refund or exchange.
- Every order is gift-boxed and ribbon-tied; free hand-written gift message at checkout.
- Pocket squares ≈ 30 × 30 cm; cravats are a generous self-tie; scarves are long-format.

## Information
- [Our Story](${baseUrl}/our-story)
- [Size Guide](${baseUrl}/size-guide)
- [Shipping & Returns](${baseUrl}/shipping-returns)
- [FAQs](${baseUrl}/faqs)
- [Contact](${baseUrl}/contact)
- [Sitemap](${baseUrl}/sitemap.xml)
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
