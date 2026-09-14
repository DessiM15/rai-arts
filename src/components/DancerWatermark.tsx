"use client";

import { useEffect, useRef } from "react";
import { DANCER_PATH, DANCER_VIEWBOX } from "@/lib/brand";

/**
 * The dancer at enormous size, faint, sitting behind a band's content and
 * drifting slowly against the scroll so the band has depth rather than sitting
 * flat. Drop it inside any `relative isolate overflow-hidden` section; it
 * measures its parent to pace the drift.
 */
export default function DancerWatermark({
  className = "text-cream/8",
}: {
  className?: string;
}) {
  const artRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const art = artRef.current;
    const wrap = art?.parentElement;
    if (!art || !wrap) return;
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
    <svg
      ref={artRef}
      viewBox={DANCER_VIEWBOX}
      aria-hidden="true"
      className={`pointer-events-none absolute -right-[14%] -bottom-[22%] h-[150%] w-auto will-change-transform ${className}`}
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
  );
}
