"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DANCER_PATH, DANCER_VIEWBOX } from "@/lib/brand";

type Frame = { src: string; alt: string };

/**
 * The curtain.
 *
 * Two panels of rotating imagery meet at the centre with the mark straddling
 * the seam. As you scroll they part like a theatre curtain and slide off the
 * sides, revealing a full-bleed stage behind with the headline centred on it.
 *
 * A parting curtain is the right device for this brand twice over: it is the
 * theatre language the Playbill already uses, and it literally performs the
 * promise — the house opens and you are in the room.
 *
 * Everything is scroll-linked, not timed, so the reveal happens at the pace
 * the visitor sets. Under reduced motion the curtain starts open.
 */
export default function CurtainHero({
  left,
  right,
  stage,
  children,
}: {
  left: Frame[];
  right: Frame[];
  stage: Frame;
  children: React.ReactNode;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);

  // rotate the panel imagery while the curtain is closed
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const n = Math.max(left.length, right.length);
    if (n < 2) return;
    const id = setInterval(() => setI((v) => (v + 1) % n), 3800);
    return () => clearInterval(id);
  }, [left.length, right.length]);

  // scroll-linked parting
  useEffect(() => {
    const wrap = wrapRef.current;
    const l = leftRef.current;
    const r = rightRef.current;
    const mark = markRef.current;
    const stageEl = stageRef.current;
    if (!wrap || !l || !r || !mark || !stageEl) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      l.style.transform = "translate3d(-100%,0,0)";
      r.style.transform = "translate3d(100%,0,0)";
      mark.style.opacity = "0";
      stageEl.style.opacity = "1";
      return;
    }

    let raf = 0;
    let ticking = false;

    const frame = () => {
      const rect = wrap.getBoundingClientRect();
      // 0 while pinned at the top, 1 once the section has been scrolled through
      const travel = rect.height - window.innerHeight;
      const p = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0;

      // the curtain does its work in the first 70% of the travel
      const open = Math.min(1, p / 0.7);
      const eased = open * open * (3 - 2 * open); // smoothstep

      l.style.transform = `translate3d(${-eased * 100}%,0,0)`;
      r.style.transform = `translate3d(${eased * 100}%,0,0)`;

      mark.style.opacity = String(Math.max(0, 1 - eased * 1.6));
      mark.style.transform = `scale(${1 + eased * 0.22})`;

      // the stage resolves as the curtain clears
      stageEl.style.opacity = String(Math.min(1, Math.max(0, (eased - 0.25) / 0.5)));
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

  const panel = (frames: Frame[], side: "left" | "right") => (
    <div
      ref={side === "left" ? leftRef : rightRef}
      className={`absolute top-0 bottom-0 z-[3] w-1/2 overflow-hidden will-change-transform ${
        side === "left" ? "left-0" : "right-0"
      }`}
    >
      {frames.map((f, k) => (
        <Image
          key={f.src}
          src={f.src}
          alt={k === 0 ? f.alt : ""}
          fill
          priority={k === 0}
          sizes="50vw"
          className="object-cover transition-opacity duration-[1400ms] ease-[cubic-bezier(.16,.84,.28,1)]"
          style={{ opacity: k === i % frames.length ? 1 : 0 }}
        />
      ))}
      {/* keeps the mark and the seam readable over any photograph */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-forest-deep/55 ${
          side === "left"
            ? "bg-gradient-to-r from-forest-deep/70 to-forest-deep/40"
            : "bg-gradient-to-l from-forest-deep/70 to-forest-deep/40"
        }`}
      />
    </div>
  );

  return (
    <div ref={wrapRef} data-nav="dark" className="relative h-[210svh]">
      <div className="sticky top-0 grain isolate h-svh overflow-hidden bg-forest-deep">
        {/* ── the stage behind the curtain ── */}
        <div ref={stageRef} className="absolute inset-0 z-[1] opacity-0">
          <Image
            src={stage.src}
            alt={stage.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-forest-deep/75 via-forest-deep/55 to-forest-deep/85"
          />
          <div className="relative z-[2] flex h-full items-center justify-center px-5 text-center sm:px-8">
            <div className="on-dark flex max-w-[46rem] flex-col items-center gap-7">
              {children}
            </div>
          </div>
        </div>

        {/* ── the two halves ── */}
        {panel(left, "left")}
        {panel(right, "right")}

        {/* ── the mark, straddling the seam ── */}
        <div
          ref={markRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[4] flex items-center justify-center will-change-[opacity,transform]"
        >
          <svg
            viewBox={DANCER_VIEWBOX}
            fill="none"
            className="h-[46svh] max-h-[440px] w-auto text-cream drop-shadow-[0_14px_40px_rgba(0,0,0,0.45)]"
          >
            <path
              d={DANCER_PATH}
              stroke="currentColor"
              strokeWidth={8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* ── scroll cue ── */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-8 z-[5] flex justify-center"
        >
          <span className="font-mono text-[0.6rem] tracking-[0.24em] text-cream/60 uppercase">
            Scroll
          </span>
        </div>
      </div>
    </div>
  );
}
