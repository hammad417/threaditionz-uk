"use client";

// components/story/story-experience.tsx
// The motion layer. Copy arrives as props (already server-rendered by the
// parent), so this component enhances rather than owns the content.
//
// deps: npm i gsap lenis
// assets expected in /public/story/ — see STORY-README.md for the
// Higgsfield generation prompts and ffmpeg pipeline.

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import AjrakMotif from "./ajrak-motif";
import type { StoryAct } from "lib/story-copy";

interface Props {
  acts: StoryAct[];
  links: { ajrakCollection: string; patternPillar: string; giftSets: string };
}

const VIDEOS: Record<string, { src: string; poster: string }> = {
  thread: {
    src: "/story/hero-silk.webm",
    poster: "/story/hero-silk-poster.webp",
  },
  craft1: {
    src: "/story/craft-block.webm",
    poster: "/story/craft-block-poster.webp",
  },
  craft2: {
    src: "/story/craft-indigo.webm",
    poster: "/story/craft-indigo-poster.webp",
  },
  craft3: {
    src: "/story/craft-loom.webm",
    poster: "/story/craft-loom-poster.webp",
  },
  word: {
    src: "/story/calligraphy.webm",
    poster: "/story/calligraphy-poster.webp",
  },
};

export default function StoryExperience({ acts, links }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const byId = (id: string) => acts.find((a) => a.id === id)!;

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return; // static, poster-first page — fully readable

    gsap.registerPlugin(ScrollTrigger);

    // Unhurried, premium pacing — tuned, not default.
    const lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 0.9 });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // ACT 1 — hero headline rises as silk loop dims and scales
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '[data-act="thread"]',
            start: "top top",
            end: "+=90%",
            scrub: true,
            pin: true,
          },
        })
        .to(
          "[data-hero-video]",
          { scale: 1.12, filter: "brightness(0.45)", ease: "none" },
          0,
        )
        .fromTo(
          "[data-hero-copy]",
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, ease: "none" },
          0.15,
        );

      // ACT 2 — the signature: Ajrak line-work draws itself in
      const paths = gsap.utils.toArray<SVGGeometryElement>(
        "[data-ajrak-motif] [data-draw]",
      );
      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '[data-act="motif"]',
            start: "top top",
            end: "+=140%",
            scrub: 0.5,
            pin: true,
          },
        })
        .to(paths, { strokeDashoffset: 0, stagger: 0.08, ease: "none" })
        .fromTo(
          "[data-motif-copy]",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0 },
          "<40%",
        );

      // ACT 3 — craft panels wipe upward in sequence
      gsap.utils.toArray<HTMLElement>("[data-craft-panel]").forEach((panel) => {
        gsap.fromTo(
          panel,
          { clipPath: "inset(12% 6% 12% 6% round 4px)", opacity: 0.4 },
          {
            clipPath: "inset(0% 0% 0% 0% round 4px)",
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "top 85%",
              end: "top 35%",
              scrub: true,
            },
          },
        );
      });

      // ACT 4 — calligraphy clip fades through black like ink through water
      gsap.fromTo(
        "[data-word-inner]",
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: '[data-act="word"]',
            start: "top 70%",
            end: "top 20%",
            scrub: true,
          },
        },
      );

      // ACT 5 — real product photo parallaxes over generated scene
      gsap.to("[data-product-real]", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: '[data-act="gentleman"]',
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // ACT 6 — midnight lifts to ivory
      gsap.to(root.current, {
        backgroundColor: "#F7F4EE",
        color: "#151D32",
        ease: "none",
        scrollTrigger: {
          trigger: '[data-act="invitation"]',
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        },
      });
    }, root);

    return () => {
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  const glass =
    "rounded border border-[#C0974F]/30 bg-[#151D32]/55 backdrop-blur-md px-8 py-10 md:px-12 md:py-14 shadow-[0_8px_40px_rgba(0,0,0,0.35)]";

  return (
    <div
      ref={root}
      className="relative bg-[#151D32] text-[#F7F4EE] transition-colors"
    >
      {/* Film grain + vignette overlays (pure CSS, no assets) */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-40 opacity-[0.05] mix-blend-overlay [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22/></filter><rect width=%22160%22 height=%22160%22 filter=%22url(%23n)%22/></svg>')]"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-40 [background:radial-gradient(ellipse_at_center,transparent_58%,rgba(10,13,24,0.5)_100%)]"
      />

      {/* ACT 1 — THE THREAD */}
      <section
        data-act="thread"
        className="relative flex h-screen items-center justify-center overflow-hidden"
      >
        <video
          data-hero-video
          className="absolute inset-0 h-full w-full object-cover"
          src={VIDEOS.thread!.src}
          poster={VIDEOS.thread!.poster}
          autoPlay
          muted
          loop
          playsInline
        />
        <div
          data-hero-copy
          className="relative z-10 max-w-3xl px-6 text-center"
        >
          <Eyebrow>{byId("thread").eyebrow}</Eyebrow>
          <h1 className="font-[family-name:var(--font-playfair,Playfair_Display)] text-4xl leading-tight md:text-6xl">
            {byId("thread").heading}
          </h1>
          <BodyCopy act={byId("thread")} className="mx-auto mt-6 max-w-xl" />
        </div>
      </section>

      {/* ACT 2 — THE MOTIF */}
      <section
        data-act="motif"
        className="relative flex h-screen items-center justify-center px-6"
      >
        <AjrakMotif className="absolute h-[76vmin] w-[76vmin] opacity-90" />
        <div
          data-motif-copy
          className={`relative z-10 max-w-lg text-center ${glass}`}
        >
          <Eyebrow>{byId("motif").eyebrow}</Eyebrow>
          <h2 className="font-[family-name:var(--font-playfair,Playfair_Display)] text-3xl md:text-4xl">
            {byId("motif").heading}
          </h2>
          <BodyCopy act={byId("motif")} className="mt-5" />
        </div>
      </section>

      {/* ACT 3 — THE CRAFT */}
      <section data-act="craft" className="mx-auto max-w-5xl px-6 py-28">
        <header className="mx-auto mb-16 max-w-2xl text-center">
          <Eyebrow>{byId("craft").eyebrow}</Eyebrow>
          <h2 className="font-[family-name:var(--font-playfair,Playfair_Display)] text-3xl md:text-4xl">
            {byId("craft").heading}
          </h2>
          <BodyCopy act={byId("craft")} className="mt-5" />
        </header>
        <div className="grid gap-10 md:grid-cols-3">
          {(["craft1", "craft2", "craft3"] as const).map((k, i) => (
            <figure key={k} data-craft-panel className="overflow-hidden">
              <video
                className="aspect-[3/4] w-full rounded object-cover"
                src={VIDEOS[k]!.src}
                poster={VIDEOS[k]!.poster}
                autoPlay
                muted
                loop
                playsInline
              />
              <figcaption className="mt-3 text-sm tracking-wide text-[#F7F4EE]/70">
                {
                  [
                    "The block is carved.",
                    "The vat is stirred.",
                    "The silk is woven.",
                  ][i]
                }
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ACT 4 — THE WORD */}
      <section
        data-act="word"
        className="relative flex min-h-screen items-center justify-center px-6 py-24"
      >
        <div
          data-word-inner
          className="grid max-w-4xl items-center gap-10 md:grid-cols-2"
        >
          <video
            className="aspect-square w-full rounded object-cover"
            src={VIDEOS.word!.src}
            poster={VIDEOS.word!.poster}
            autoPlay
            muted
            loop
            playsInline
          />
          <div>
            <Eyebrow>{byId("word").eyebrow}</Eyebrow>
            <h2 className="font-[family-name:var(--font-playfair,Playfair_Display)] text-3xl italic md:text-4xl">
              {byId("word").heading}
            </h2>
            <BodyCopy act={byId("word")} className="mt-5" />
          </div>
        </div>
      </section>

      {/* ACT 5 — THE GENTLEMAN (real product over generated scene) */}
      <section data-act="gentleman" className="relative overflow-hidden py-28">
        <img
          src="/story/scene-racecourse.webp"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="relative mx-auto grid max-w-5xl items-center gap-12 px-6 md:grid-cols-2">
          {/* REAL PRODUCT PHOTOGRAPHY ONLY — trust constraint. Never an AI render. */}
          <img
            data-product-real
            src="/story/product-ajrak-square.webp"
            alt="Threaditionz Ajrak silk pocket square, hand-rolled edges"
            className="mx-auto w-72 rounded shadow-2xl md:w-96"
          />
          <div className={glass}>
            <Eyebrow>{byId("gentleman").eyebrow}</Eyebrow>
            <h2 className="font-[family-name:var(--font-playfair,Playfair_Display)] text-3xl md:text-4xl">
              {byId("gentleman").heading}
            </h2>
            <BodyCopy act={byId("gentleman")} className="mt-5" />
          </div>
        </div>
      </section>

      {/* ACT 6 — THE INVITATION */}
      <section
        data-act="invitation"
        className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center"
      >
        <Eyebrow>{byId("invitation").eyebrow}</Eyebrow>
        <h2 className="font-[family-name:var(--font-playfair,Playfair_Display)] text-4xl md:text-5xl">
          {byId("invitation").heading}
        </h2>
        <BodyCopy act={byId("invitation")} className="mt-5 max-w-md" />
        <nav className="mt-10 flex flex-wrap justify-center gap-4">
          <Cta href={links.ajrakCollection}>Shop Ajrak silk</Cta>
          <Cta href={links.patternPillar} secondary>
            Read the pattern guide
          </Cta>
          <Cta href={links.giftSets} secondary>
            Explore gift sets
          </Cta>
        </nav>
      </section>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#C0974F]">
      {children}
    </p>
  );
}

function BodyCopy({
  act,
  className = "",
}: {
  act: StoryAct;
  className?: string;
}) {
  return (
    <div
      className={`space-y-4 font-[family-name:var(--font-lato,Lato)] text-base leading-relaxed opacity-85 md:text-lg ${className}`}
    >
      {act.body.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

function Cta({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        secondary
          ? "rounded border border-current px-6 py-3 text-sm tracking-wide transition-opacity hover:opacity-70"
          : "rounded bg-[#C0974F] px-6 py-3 text-sm font-semibold tracking-wide text-[#151D32] transition-opacity hover:opacity-90"
      }
    >
      {children}
    </Link>
  );
}
