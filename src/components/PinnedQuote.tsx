"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { DANCER_PATH, DANCER_VIEWBOX } from "@/lib/brand";

/**
 * A dark band that pins in the viewport while a single passage lights up word
 * by word as the visitor keeps scrolling. Once the last word is bright the
 * page releases and carries on.
 *
 * Desktop (lg and up): the band is `position: sticky` inside a taller wrapper;
 * the wrapper's extra height is the scroll distance the effect plays over.
 * Phones: no pin. The words simply brighten as the band travels up the screen.
 *
 * Words start dim only under `.js` (see globals.css), so a visitor whose
 * JavaScript didn't run sees the passage fully lit.
 */

/** Scroll distance the pinned effect plays over, in viewport heights. */
const TRAVEL_VH = 100;
/** Visible height of the pinned band, in viewport heights. */
const BAND_VH = 72;
/** Where the band sits while pinned, centred in the viewport. */
const TOP_VH = (100 - BAND_VH) / 2;

const DIM = 0.22;

export default function PinnedQuote({ text }: { text: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLElement>(null);
  const artRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const words = text.split(/\s+/).filter(Boolean);

  useEffect(() => {
    const wrap = wrapRef.current;
    const band = bandRef.current;
    const art = artRef.current;
    const para = textRef.current;
    if (!wrap || !band || !art || !para) return;

    const spans = Array.from(
      para.querySelectorAll<HTMLSpanElement>("[data-pq-word]"),
    );
    const n = spans.length;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pinned = window.matchMedia("(min-width: 1024px)");

    const lightAll = () => {
      for (const s of spans) s.style.opacity = "1";
      art.style.transform = "";
    };

    let raf = 0;
    let ticking = false;

    const frame = () => {
      ticking = false;
      if (reduced.matches) {
        lightAll();
        return;
      }

      const vh = window.innerHeight || 1;
      let p: number;

      if (pinned.matches) {
        // Sticks when the wrapper's top reaches TOP_VH, releases when its
        // bottom reaches the band's bottom. Progress runs over that range.
        const w = wrap.getBoundingClientRect();
        const stickyTop = (vh * TOP_VH) / 100;
        const range = Math.max(1, w.height - band.offsetHeight);
        p = (stickyTop - w.top) / range;
      } else {
        // No pin: play the effect while the band climbs from the bottom of the
        // screen to roughly its upper third.
        const b = band.getBoundingClientRect();
        const start = vh * 0.92;
        const end = Math.max(vh * 0.28, vh - b.height);
        p = (start - b.top) / Math.max(1, start - end);
      }
      p = Math.max(0, Math.min(1, p));

      // Leave a beat at either end so the pin doesn't start or finish mid-word.
      const t = Math.max(0, Math.min(1, (p - 0.06) / 0.8));

      // Each word fades over a window about 2.5 words wide so the edge is soft.
      // head = 0 at t = 0 (nothing lit); head = n + 1.5 at t = 1 (last word full).
      const head = t * (n + 1.5);
      for (let i = 0; i < n; i++) {
        const lit = Math.max(0, Math.min(1, (head - i) / 2.5));
        spans[i].style.opacity = (DIM + (1 - DIM) * lit).toFixed(3);
      }

      art.style.transform = `translate3d(0, ${(4 - p * 12).toFixed(2)}%, 0)`;
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
    <div
      ref={wrapRef}
      className="lg:h-[calc(var(--pq-band)+var(--pq-travel))]"
      style={
        {
          "--pq-band": `${BAND_VH}vh`,
          "--pq-travel": `${TRAVEL_VH}vh`,
          "--pq-top": `${TOP_VH}vh`,
        } as CSSProperties
      }
    >
      <section
        ref={bandRef}
        data-nav="dark"
        className="on-dark grain relative isolate flex items-center overflow-hidden bg-forest-deep py-20 text-cream sm:py-24 lg:sticky lg:top-[var(--pq-top)] lg:h-[var(--pq-band)] lg:py-0"
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
          <p
            ref={textRef}
            className="font-statement mx-auto max-w-[34ch] text-center text-[length:var(--text-step-2)] leading-[1.3] text-cream"
          >
            {words.map((w, i) => (
              <span key={i}>
                {i > 0 ? " " : ""}
                <span data-pq-word>{w}</span>
              </span>
            ))}
          </p>
        </div>
      </section>
    </div>
  );
}
