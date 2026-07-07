// app/story/page.tsx
// Server component. All copy renders in initial HTML; motion is layered on
// by the client component. Drop into your vercel/commerce app directory.

import type { Metadata } from "next";
import { acts, storyLinks, storyMeta } from "lib/story-copy";
import StoryExperience from "components/story/story-experience";

export const metadata: Metadata = {
  title: storyMeta.title,
  description: storyMeta.description,
  openGraph: {
    title: storyMeta.title,
    description: storyMeta.description,
    type: "article",
    images: [{ url: "/story/og-story.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "/story" },
};

export default function StoryPage() {
  return (
    <main className="bg-[#151D32] text-[#F7F4EE]">
      {/* Server-rendered narrative for crawlers — visually enhanced by the
          client layer, but complete and readable without JavaScript. */}
      <StoryExperience acts={acts} links={storyLinks} />

      {/* Structured data: article about the brand's craft heritage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: storyMeta.title,
            description: storyMeta.description,
            publisher: {
              "@type": "Organization",
              name: "Threaditionz",
              url: "https://threaditionz.co.uk",
            },
          }),
        }}
      />
    </main>
  );
}
