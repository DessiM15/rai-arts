"use client";

import { useEffect, useRef } from "react";
import { DANCER_PATH, DANCER_VIEWBOX } from "@/lib/brand";
import { SITE } from "@/lib/site";

/**
 * The hero panel — she draws herself once the stage is in view. A soft gold
 * "spotlight" resolves behind her first, so the figure lands into light rather
 * than appearing on a flat field.
 */
export default function DancerStage({ className = "" }: { className?: string }) {
  const ref = useRef<SVGPathElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);

  // The spotlight is toggled through a ref rather than state: it is pure
  // decoration, and re-rendering the whole stage to flip one class is waste.
  const light = () => sunRef.current?.setAttribute("data-lit", "");

  useEffect(() => {
    const stage = stageRef.current;
    const path = ref.current;
    if (!stage || !path) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      light();
      return;
    }

    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;

    let anim: Animation | undefined;

    const draw = () => {
      light();
      // WAAPI, not a CSS transition — setting the start and end values in the
      // same frame makes a transition a no-op. See Opening.tsx.
      anim = path.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], {
        duration: 2600,
        delay: 250,
        easing: "cubic-bezier(.36,.15,.2,1)",
        fill: "forwards",
      });
    };

    // The stage is above the fold on load. Waiting for an observer callback to
    // start would leave her dashed out — invisible — until one arrives.
    const r = stage.getBoundingClientRect();
    if (r.top < (window.innerHeight || 0) * 0.9 && r.bottom > 0) {
      draw();
      return () => anim?.cancel();
    }

    if (typeof IntersectionObserver === "undefined") {
      draw();
      return () => anim?.cancel();
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          draw();
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(stage);
    return () => {
      io.disconnect();
      anim?.cancel();
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className={`relative grid aspect-[4/4.6] place-items-center overflow-hidden rounded-sm bg-forest shadow-[0_30px_70px_-40px_rgba(22,33,15,.75)] ${className}`}
    >
      {/* spotlight */}
      <div
        ref={sunRef}
        className="absolute -top-[14%] -right-[12%] aspect-square w-[46%] scale-75 rounded-full bg-gold opacity-0 transition-[opacity,transform] duration-[1600ms] ease-[cubic-bezier(.16,.84,.28,1)] data-[lit]:scale-100 data-[lit]:opacity-100 motion-reduce:scale-100 motion-reduce:opacity-100"
        aria-hidden="true"
      />

      <svg
        viewBox={DANCER_VIEWBOX}
        className="relative z-10 block w-[74%] text-cream"
        fill="none"
        role="img"
        aria-label="The Rai Arts dancer, drawn as one continuous line"
      >
        <path
          d={DANCER_PATH}
          stroke="currentColor"
          strokeWidth={13}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gold opacity-30 blur-[4px]"
          vectorEffect="non-scaling-stroke"
        />
        <path
          ref={ref}
          d={DANCER_PATH}
          stroke="currentColor"
          strokeWidth={8}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <p className="absolute inset-x-0 bottom-5 text-center font-mono text-[0.58rem] uppercase tracking-[0.24em] text-cream/50 sm:text-[0.64rem]">
        {SITE.name} · {SITE.tagline}
      </p>
    </div>
  );
}
