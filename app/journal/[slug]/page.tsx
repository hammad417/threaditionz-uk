import Footer from "components/layout/footer";
import { AUTHOR, BRAND, contentAuthorJsonLd, ORG_ID } from "lib/brand";
import { getAllGuides, getGuide } from "lib/journal";
import { buildBreadcrumbJsonLd } from "lib/structured-data";
import { baseUrl } from "lib/utils";
import type { Metadata } from "next";
import Image from "next/image";
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

// Visible freshness label (schema alone isn't enough — engines and readers
// both look for an on-page date).
function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
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

  // HowTo for step guides, Article for editorial — authored by the named
  // founder (Person) when AUTHOR is filled in, else the brand Organization.
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
          author: contentAuthorJsonLd,
          publisher: { "@id": ORG_ID },
          mainEntityOfPage: url,
        };

  const videoJsonLd = guide.video
    ? {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: guide.h1,
        description: guide.video.caption,
        thumbnailUrl: guide.heroImage ? [`${baseUrl}${guide.heroImage}`] : [],
        contentUrl: `${baseUrl}${guide.video.src}`,
        uploadDate: guide.video.uploadDate,
        duration: guide.video.duration,
        publisher: { "@id": ORG_ID },
      }
    : null;

  const faqJsonLd = guide.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: guide.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

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
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
      {videoJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
        />
      ) : null}

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
          <p className="mt-5 text-xs tracking-wide text-muted-foreground/80">
            {AUTHOR.name ? <>By {AUTHOR.name} · </> : null}
            Published{" "}
            <time dateTime={guide.datePublished}>
              {formatDate(guide.datePublished)}
            </time>
            {guide.dateModified !== guide.datePublished ? (
              <>
                {" "}
                · Updated{" "}
                <time dateTime={guide.dateModified}>
                  {formatDate(guide.dateModified)}
                </time>
              </>
            ) : null}
          </p>
        </header>

        {/* Hero film (poster = hero image) or hero image alone */}
        {guide.video ? (
          <figure className="mt-10">
            <video
              controls
              muted
              playsInline
              preload="none"
              poster={guide.heroImage}
              className="aspect-video w-full object-cover"
            >
              <source src={guide.video.src} type="video/mp4" />
            </video>
            <figcaption className="mt-2 text-xs tracking-wide text-muted-foreground">
              {guide.video.caption}
            </figcaption>
          </figure>
        ) : guide.heroImage ? (
          <div className="mt-10">
            <Image
              src={guide.heroImage}
              alt={guide.heroAlt || guide.h1}
              width={1600}
              height={900}
              priority
              className="aspect-video w-full object-cover"
            />
          </div>
        ) : null}

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
              {sec.table ? (
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full border-collapse text-left text-sm">
                    {sec.table.caption ? (
                      <caption className="mb-2 text-left text-xs uppercase tracking-[0.15em] text-muted-foreground">
                        {sec.table.caption}
                      </caption>
                    ) : null}
                    <thead>
                      <tr className="border-b border-gold/30">
                        {sec.table.headers.map((h) => (
                          <th
                            key={h}
                            scope="col"
                            className="py-2 pr-4 font-heading text-foreground"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sec.table.rows.map((row, ri) => (
                        <tr key={ri} className="border-b border-gold/10">
                          {row.map((cell, ci) => (
                            <td
                              key={ci}
                              className="py-2.5 pr-4 align-top leading-relaxed text-muted-foreground"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </section>
          ))}
        </div>

        {/* Embedded FAQs (also emitted as FAQPage JSON-LD above) */}
        {guide.faqs?.length ? (
          <div className="mt-14 border-t border-gold/15 pt-10">
            <h2 className="font-heading text-xl text-foreground lg:text-2xl">
              Frequently asked questions
            </h2>
            <dl className="mt-6 space-y-6">
              {guide.faqs.map((f) => (
                <div key={f.question}>
                  <dt className="font-heading text-base text-foreground">
                    {f.question}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {f.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}

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
