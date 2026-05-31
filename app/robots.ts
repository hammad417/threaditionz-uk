import { baseUrl } from "lib/utils";
import type { MetadataRoute } from "next";

// AI answer-engine / search crawlers we explicitly welcome (so the brand is
// discoverable and cite-able in ChatGPT, Perplexity, Gemini, Apple, etc.).
const AI_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-Web",
  "Anthropic-AI",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/cart"] },
      { userAgent: AI_AGENTS, allow: "/" },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
