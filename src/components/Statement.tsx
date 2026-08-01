"use client";

import { useEffect, useRef } from "react";
import { DANCER_PATH, DANCER_VIEWBOX } from "@/lib/brand";
import { Label, Lines } from "./Reveal";

/**
 * A full-bleed section where a single sentence *is* the artwork. Type at this
 * scale does the job photography would otherwise do, which is what keeps the
 * page from reading as a stack of tidy text blocks.
 *
 * The dancer sits behind it at enormous size, drifting slowly against the
 * scroll so the band has depth rather than sitting flat.
 */
export default function Statement({
  lines,
  kicker,
  footnote,
  dark = true,
}: {
  lines: string[];
  kicker?: string;
  footnote?: string;
  dark?: boolean;
}) {
  const wrapRef = useRef<HTMLElement>(null);
  const artRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const art = artRef.current;
    if (!wrap || !art) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let ticking = false;

    const frame = () => {
      const r = wrap.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // -1 well below the fold, 1 well above it
      const p = (vh / 2 - (r.top + r.height / 2)) / (vh / 2 + r.height / 2);
      const clamped = Math.max(-1, Math.min(1, p));
      art.style.transform = `translate3d(0, ${(-clamped * 9).toFixed(2)}%, 0)`;
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(frame);
    };

    frame();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={wrapRef}
      data-nav={dark ? "dark" : undefined}
      className={`grain relative isolate overflow-hidden py-24 sm:py-32 lg:py-40 ${
        dark ? "on-dark bg-forest-deep text-cream" : "bg-sand text-forest"
      }`}
    >
      <svg
        ref={artRef}
        viewBox={DANCER_VIEWBOX}
        aria-hidden="true"
        className={`pointer-events-none absolute -right-[14%] -bottom-[22%] h-[150%] w-auto will-change-transform ${
          dark ? "text-cream/8" : "text-forest/8"
        }`}
        fill="none"
      >
        <path
          d={DANCER_PATH}
          stroke="currentColor"
          strokeWidth={11}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="relative z-[2] mx-auto w-full max-w-[1180px] px-5 sm:px-8 lg:px-14">
        {kicker && <Label className="mb-7">{kicker}</Label>}
        <Lines
          as="h2"
          className="font-statement text-[length:var(--text-step-5)]"
          lines={lines}
          stagger={0.1}
        />
        {footnote && (
          <p
            className={`mt-9 max-w-[46ch] text-[length:var(--text-step-0)] ${
              dark ? "text-cream/65" : "text-ink-soft"
            }`}
          >
            {footnote}
          </p>
        )}
      </div>
    </section>
  );
}
