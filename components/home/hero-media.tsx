"use client";

import Image from "next/image";
import { useRef, useState } from "react";

// Three cinematic hero clips that crossfade into each other on loop.
// The modern gentleman, styled in our gold silk pocket squares, across three scenes:
// a London street walk, closing a deal in the office, and a beachside wedding toast.
const CLIPS = [
  {
    webm: "/hero/hero-street.webm",
    mp4: "/hero/hero-street.mp4",
    poster: "/hero/poster-street.jpg",
  },
  {
    webm: "/hero/hero-office.webm",
    mp4: "/hero/hero-office.mp4",
    poster: "/hero/poster-office.jpg",
  },
  {
    webm: "/hero/hero-wedding.webm",
    mp4: "/hero/hero-wedding.mp4",
    poster: "/hero/poster-wedding.jpg",
  },
];

export default function HeroMedia() {
  const [active, setActive] = useState(0);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);

  // When a clip ends, start the next one and crossfade to it (A → B → A …).
  const handleEnded = (i: number) => {
    const next = (i + 1) % CLIPS.length;
    const v = videos.current[next];
    if (v) {
      v.currentTime = 0;
      void v.play().catch(() => {});
    }
    setActive(next);
  };

  return (
    <div
      aria-hidden
      className="absolute inset-0 -z-20 overflow-hidden bg-midnight"
    >
      {/* Static poster — shown on mobile and when the user prefers reduced motion. */}
      <Image
        src={CLIPS[0].poster}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center md:hidden motion-reduce:!block"
      />

      {/* Alternating cinematic clips — desktop, motion-safe only. */}
      {CLIPS.map((c, i) => (
        <video
          key={c.mp4}
          ref={(el) => {
            videos.current[i] = el;
          }}
          muted
          playsInline
          preload="metadata"
          autoPlay={i === 0}
          poster={c.poster}
          onEnded={() => handleEnded(i)}
          className={`absolute inset-0 hidden h-full w-full object-cover object-center transition-opacity duration-[1200ms] ease-in-out md:block motion-reduce:!hidden ${
            active === i ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={c.webm} type="video/webm" />
          <source src={c.mp4} type="video/mp4" />
        </video>
      ))}
    </div>
  );
}
