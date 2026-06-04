import type { Maybe, Metafield } from "./types";

/** Collapse the metafields array into a { key: value } map. */
export function metafieldMap(
  metafields?: Maybe<Metafield>[],
): Record<string, string> {
  const map: Record<string, string> = {};
  for (const mf of metafields ?? []) {
    if (mf?.key && mf.value) map[mf.key] = mf.value;
  }
  return map;
}

/** Prettify a Shopify handle, e.g. "the-solid-navy" -> "The Solid Navy". */
export function prettifyHandle(handle: string): string {
  return handle
    .trim()
    .split(/[-_]/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/** Split care instructions on newlines into bullet strings. */
export function parseCareInstructions(value?: string): string[] {
  if (!value) return [];
  return value
    .split(/\r?\n/)
    .map((s) => s.replace(/^[-•*]\s*/, "").trim())
    .filter(Boolean);
}

/** Parse a JSON array metafield (e.g. custom.fold_styles) into strings. */
export function parseJsonStringList(value?: string): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed.map((v) => String(v)).filter(Boolean);
    }
  } catch {
    // not JSON — fall back to comma/newline split
  }
  return value
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Parse comma-separated product handles (custom.pair_with). */
export function parseHandleList(value?: string): string[] {
  if (!value) return [];
  // Support either a JSON list (list.product_reference style) or CSV handles.
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed
        .map((v) => String(v).split("/").pop() || "")
        .map((s) => s.trim())
        .filter(Boolean);
    }
  } catch {
    // not JSON
  }
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Parse the review-app rating metafields (reviews.rating / reviews.rating_count)
 * into a { value, count } pair. Returns null until a reviews app populates them —
 * so a rating is never faked. The `rating` value may be a bare float or a JSON
 * `{ value, scale_min, scale_max }` object (Shopify Product Reviews format).
 */
export function parseReviewRating(
  map: Record<string, string>,
): { value: number; count: number } | null {
  const ratingRaw = map["rating"];
  const countRaw = map["rating_count"];
  if (!ratingRaw || !countRaw) return null;

  let value: number;
  try {
    const parsed = JSON.parse(ratingRaw);
    value =
      parsed && typeof parsed === "object"
        ? Number(parsed.value)
        : Number(parsed);
  } catch {
    value = Number(ratingRaw);
  }
  const count = parseInt(countRaw, 10);
  if (!value || Number.isNaN(value) || !count || count < 1) return null;
  return { value, count };
}

export type FaqItem = { question: string; answer: string };

/**
 * Parse a FAQ metafield into Q/A pairs.
 * Primary format: JSON array of { question, answer }.
 * Falls back to Shopify rich-text JSON (extracting heading/paragraph pairs).
 * Returns [] when nothing structured can be extracted.
 */
export function parseFaq(value?: string): FaqItem[] {
  if (!value) return [];

  let parsed: unknown;
  try {
    parsed = JSON.parse(value);
  } catch {
    return [];
  }

  // Format 1: [{ question, answer }, ...]
  if (Array.isArray(parsed)) {
    const items = parsed
      .filter(
        (it): it is FaqItem =>
          !!it &&
          typeof it === "object" &&
          "question" in it &&
          "answer" in it,
      )
      .map((it) => ({
        question: String(it.question),
        answer: String(it.answer),
      }));
    if (items.length) return items;
  }

  // Format 2: Shopify rich_text JSON { type: "root", children: [...] }
  // Questions are emphasised blocks (a `heading` node, or a paragraph whose
  // text runs are bold); the answer is the following non-emphasised
  // paragraph(s) up to the next question.
  type RichNode = {
    type?: string;
    children?: { value?: string; bold?: boolean }[];
  };
  const richText = parsed as { children?: RichNode[] };
  if (Array.isArray(richText?.children)) {
    const flatText = (node: RichNode) =>
      (node.children ?? [])
        .map((c) => c.value ?? "")
        .join("")
        .trim();
    const isQuestion = (node: RichNode) => {
      const runs = node.children ?? [];
      const hasText = runs.some((c) => (c.value ?? "").trim());
      return (
        node.type === "heading" ||
        (hasText && runs.every((c) => !(c.value ?? "").trim() || c.bold))
      );
    };

    const items: FaqItem[] = [];
    let pendingQ: string | null = null;
    let answer: string[] = [];
    const flush = () => {
      if (pendingQ && answer.length) {
        items.push({ question: pendingQ, answer: answer.join(" ").trim() });
      }
      answer = [];
    };
    for (const node of richText.children) {
      const text = flatText(node);
      if (!text) continue;
      if (isQuestion(node)) {
        flush();
        pendingQ = text;
      } else if (pendingQ) {
        answer.push(text);
      }
    }
    flush();
    if (items.length) return items;
  }

  return [];
}
