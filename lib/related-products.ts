import { parseFamily } from "lib/product-family";
import type { Product } from "lib/shopify/types";

// Contextual "You may also like" ranking (audit L1). Replaces Shopify's static
// "newest products" feed with a data-driven rank over the whole catalogue, using
// the priority order from the audit:
//
//   matching set/components → same colour → same pattern →
//   complete-the-look (cross-type) → same occasion → fill with new arrivals
//
// Collection membership is the engine: every product carries colour, pattern,
// occasion and curated-edit collections, so shared-collection overlap captures
// colour/pattern/occasion in one signal. Rarer shared collections (e.g.
// `heritage-ajrak-silk-accessories`) carry more weight than ubiquitous ones
// (`new-arrivals`, `gifts-for-him`) via an IDF weighting — so a navy solid
// square and an Ajrak cravat surface genuinely different rails.

// Broad occasion/utility collections that almost everything belongs to. They
// still count (low IDF weight), but they are NOT treated as "coordinating"
// colour/pattern signals for the complete-the-look cross-type bonus.
const BROAD_COLLECTIONS = new Set([
  "new-arrivals",
  "gifts-for-him",
  "wedding-silk-accessories",
  "festive-eid-silk-accessories",
  "business-formal-silk-accessories",
  "casual-daytime-silk-accessories",
]);

type Scored = { product: Product; score: number };

function collectionIdf(catalogue: Product[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const p of catalogue) {
    for (const c of p.collections) {
      counts.set(c.handle, (counts.get(c.handle) ?? 0) + 1);
    }
  }
  const total = catalogue.length || 1;
  const idf = new Map<string, number>();
  for (const [handle, count] of counts) {
    // ln(N / df): ~0 for collections that contain (almost) everything, high for
    // the specific colour/pattern/edit collections that signal real similarity.
    idf.set(handle, Math.log(total / count));
  }
  return idf;
}

export function rankRelatedProducts(
  current: Product,
  catalogue: Product[],
  limit = 12,
): Product[] {
  const idf = collectionIdf(catalogue);
  const currentCollections = new Set(current.collections.map((c) => c.handle));
  const currentFamily = parseFamily(current.handle);

  const scored: Scored[] = [];

  for (const candidate of catalogue) {
    if (candidate.handle === current.handle) continue;

    // The exact same-design siblings (other formats of this design) are already
    // shown in the "Complete the Set" module — don't repeat them in the rail.
    const candidateFamily = parseFamily(candidate.handle);
    if (
      currentFamily &&
      candidateFamily &&
      candidateFamily.base === currentFamily.base
    ) {
      continue;
    }

    let score = 0;
    let sharesCoordinating = false;
    for (const c of candidate.collections) {
      if (!currentCollections.has(c.handle)) continue;
      score += idf.get(c.handle) ?? 0;
      if (!BROAD_COLLECTIONS.has(c.handle)) sharesCoordinating = true;
    }

    // Surface items of the same kind a little more strongly...
    if (
      candidate.productType &&
      candidate.productType === current.productType
    ) {
      score += 0.5;
    }
    // ...but reward "complete the look" — a different type (cravat ↔ square ↔
    // scarf) that shares a colour or pattern — so the rail cross-sells.
    if (
      candidate.productType &&
      current.productType &&
      candidate.productType !== current.productType &&
      sharesCoordinating
    ) {
      score += 2;
    }

    if (score > 0) scored.push({ product: candidate, score });
  }

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    // Tie-break: in-stock first, then catalogue order (newest).
    const aOut = a.product.availableForSale === false ? 1 : 0;
    const bOut = b.product.availableForSale === false ? 1 : 0;
    return aOut - bOut;
  });

  const ranked = scored.slice(0, limit).map((s) => s.product);

  // Guarantee a full rail even for sparsely-tagged products: pad with the newest
  // in-stock items that aren't already included or part of this design family.
  if (ranked.length < limit) {
    const used = new Set(ranked.map((p) => p.handle));
    used.add(current.handle);
    for (const p of catalogue) {
      if (ranked.length >= limit) break;
      if (used.has(p.handle)) continue;
      if (p.availableForSale === false) continue;
      const fam = parseFamily(p.handle);
      if (currentFamily && fam && fam.base === currentFamily.base) continue;
      ranked.push(p);
      used.add(p.handle);
    }
  }

  return ranked;
}
