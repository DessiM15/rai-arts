"use client";

import { useEffect, useRef } from "react";
import { DANCER_PATH, DANCER_VIEWBOX } from "@/lib/brand";

/**
 * A dark band carrying a single passage, set in full and centred. The dancer
 * sits behind it at enormous size, drifting slowly against the scroll so the
 * band has depth rather than sitting flat.
 */
export default function QuoteBand({ text }: { text: string }) {
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
      data-nav="dark"
      className="on-dark grain relative isolate overflow-hidden bg-forest-deep py-24 text-cream sm:py-32 lg:py-40"
    >
      <svg
        ref={artRef}
        viewBox={DANCER_VIEWBOX}
        aria-hidden="true"
        className="pointer-events-none absolute -right-[14%] -bottom-[22%] h-[150%] w-auto text-cream/8 will-change-transform"
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
        <p className="font-statement mx-auto max-w-[34ch] text-center text-[length:var(--text-step-2)] leading-[1.35] text-cream">
          {text}
        </p>
      </div>
    </section>
  );
}
