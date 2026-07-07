// app/our-story/page.tsx
// The brand story as a cinematic scroll page. Server component: all copy
// renders in initial HTML (SEO/GEO-safe); motion is layered on by the client
// component. Replaced the earlier editorial page — /story 301s here.

import Footer from "components/layout/footer";
import StoryExperience from "components/story/story-experience";
import { acts, storyLinks, storyMeta } from "lib/story-copy";
import { baseUrl, seoAlternates } from "lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: storyMeta.title },
  description: storyMeta.description,
  keywords: [
    "Threaditionz story",
    "heritage silk accessories",
    "hand-finished pocket squares",
    "English silk accessories",
    "luxury menswear accessories UK",
    "British silk brand",
  ],
  alternates: seoAlternates("/our-story"),
  openGraph: {
    type: "article",
    title: storyMeta.title,
    description: storyMeta.description,
    url: `${baseUrl}/our-story`,
    images: [{ url: "/story/og-story.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: storyMeta.title,
    description: storyMeta.description,
    images: ["/story/og-story.jpg"],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    {
      "@type": "ListItem",
      position: 2,
      name: "Our Story",
      item: `${baseUrl}/our-story`,
    },
  ],
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Our Story",
  url: `${baseUrl}/our-story`,
  description: storyMeta.description,
  about: {
    "@type": "Brand",
    name: "Threaditionz",
    description:
      "Hand-finished 100% silk accessories carrying heritage motifs into modern menswear.",
  },
};

export default function OurStoryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      {/* Server-rendered narrative for crawlers — visually enhanced by the
          client layer, but complete and readable without JavaScript. */}
      <StoryExperience acts={acts} links={storyLinks} />
      <Footer />
    </>
  );
}
