import Footer from "components/layout/footer";
import { BRAND, ORG_ID } from "lib/brand";
import { getAllGuides, getGuide } from "lib/journal";
import { buildBreadcrumbJsonLd } from "lib/structured-data";
import { baseUrl } from "lib/utils";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const guide = getGuide(slug);
  if (!guide) return notFound();

  return {
    title: { absolute: guide.title },
    description: guide.description,
    alternates: { canonical: `/journal/${guide.slug}` },
    openGraph: {
      type: "article",
      title: guide.title,
      description: guide.description,
      url: `${baseUrl}/journal/${guide.slug}`,
      publishedTime: guide.datePublished,
      modifiedTime: guide.dateModified,
      ...(guide.heroImage ? { images: [{ url: guide.heroImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
    },
  };
}

export default async function GuidePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const guide = getGuide(slug);
  if (!guide) return notFound();

  const url = `${baseUrl}/journal/${guide.slug}`;
  const image = guide.heroImage ? `${baseUrl}${guide.heroImage}` : BRAND.logo;

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "" },
    { name: "Journal", path: "/journal" },
    { name: guide.h1, path: `/journal/${guide.slug}` },
  ]);

  // HowTo for step guides, Article for editorial — both authored/published by the
  // brand Organization so the byline ties back to the entity graph.
  const contentJsonLd =
    guide.kind === "howto" && guide.steps?.length
      ? {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: guide.h1,
          description: guide.description,
          image,
          ...(guide.totalTime ? { totalTime: guide.totalTime } : {}),
          ...(guide.tools?.length
            ? {
                tool: guide.tools.map((t) => ({
                  "@type": "HowToTool",
                  name: t,
                })),
              }
            : {}),
          step: guide.steps.map((s, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: s.name,
            text: s.text,
            url: `${url}#step-${i + 1}`,
          })),
          publisher: { "@id": ORG_ID },
        }
      : {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guide.h1,
          description: guide.description,
          image,
          datePublished: guide.datePublished,
          dateModified: guide.dateModified,
          author: { "@type": "Organization", "@id": ORG_ID, name: BRAND.name },
          publisher: { "@id": ORG_ID },
          mainEntityOfPage: url,
        };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contentJsonLd) }}
      />

      <article className="mx-auto max-w-3xl px-6 py-16">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          <Link href="/" className="hover:text-gold">
            Home
          </Link>
          <span className="mx-2 text-gold/50">/</span>
          <Link href="/journal" className="hover:text-gold">
            Journal
          </Link>
          <span className="mx-2 text-gold/50">/</span>
          <span className="text-charcoal">{guide.h1}</span>
        </nav>

        <header className="text-center">
          <span className="eyebrow">{guide.category}</span>
          <h1 className="mt-3 font-heading text-3xl text-foreground lg:text-4xl">
            {guide.h1}
          </h1>
          <div className="gold-divider gold-divider-center mt-4" />
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {guide.lede}
          </p>
        </header>

        {/* Steps (HowTo) */}
        {guide.steps?.length ? (
          <ol className="mt-12 space-y-8">
            {guide.steps.map((s, i) => (
              <li
                key={s.name}
                id={`step-${i + 1}`}
                className="flex gap-5 scroll-mt-24"
              >
                <span className="flex h-9 w-9 flex-none items-center justify-center border border-gold/40 font-heading text-gold">
                  {i + 1}
                </span>
                <div>
                  <h2 className="font-heading text-lg text-foreground">
                    {s.name}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {s.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        ) : null}

        {/* Prose sections */}
        <div className="mt-14 space-y-10">
          {guide.sections.map((sec) => (
            <section key={sec.heading}>
              <h2 className="font-heading text-xl text-foreground lg:text-2xl">
                {sec.heading}
              </h2>
              <div className="mt-3 space-y-4">
                {sec.body.map((p, i) => (
                  <p
                    key={i}
                    className="text-sm leading-relaxed text-muted-foreground"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Shoppable cross-links */}
        {guide.related.length ? (
          <div className="mt-16 border-t border-gold/15 pt-12 text-center">
            <h2 className="eyebrow !text-charcoal/70">Shop the look</h2>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {guide.related.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="inline-flex items-center justify-center border border-gold/40 px-6 py-3 text-xs uppercase tracking-[0.2em] text-charcoal transition-colors hover:border-gold hover:bg-gold hover:text-white"
                >
                  {r.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </article>
      <Footer />
    </>
  );
}
