// The catalogue is organised in design families that share a handle prefix
// (e.g. x-silk-cravat / x-silk-pocket-square / x-silk-scarf / x-…-set), so the
// same design's other formats are derivable from the handle alone. Shared by the
// product page's "Complete the Set" rail and the related-products ranking (so the
// rail doesn't repeat the same-design siblings the set module already surfaces).

export const FAMILY_SUFFIXES: Record<string, string[]> = {
  cravat: ["-silk-cravat", "-cravat"],
  pocketSquare: ["-silk-pocket-square", "-pocket-square"],
  scarf: ["-silk-scarf", "-scarf"],
  set: ["-silk-scarf-pocket-square-set", "-scarf-pocket-square-set"],
};

export type ProductFamily = { kind: string; base: string };

export function parseFamily(handle: string): ProductFamily | null {
  const all = Object.entries(FAMILY_SUFFIXES)
    .flatMap(([kind, sufs]) => sufs.map((s) => ({ kind, suffix: s })))
    .sort((a, b) => b.suffix.length - a.suffix.length);
  for (const { kind, suffix } of all) {
    if (handle.endsWith(suffix)) {
      return { kind, base: handle.slice(0, -suffix.length) };
    }
  }
  return null;
}
