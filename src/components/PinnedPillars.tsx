"use client";

import { useEffect, useRef, useState } from "react";
import type { Pillar } from "@/lib/content";

/**
 * The five pillars as a pinned sequence: the left column holds while the right
 * advances. This is what stops the framework reading as five identical cards
 * in a row, and it lets each pillar claim the screen in turn.
 *
 * Below the large breakpoint the sticky column is dropped entirely and the
 * pillars stack, because a pinned two-column layout on a phone is just a tall
 * column with a wasted half.
 */
export default function PinnedPillars({ pillars }: { pillars: Pillar[] }) {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        // whichever pillar occupies the middle band of the screen wins
        let best: { i: number; ratio: number } | null = null;
        entries.forEach((e) => {
          const i = Number((e.target as HTMLElement).dataset.i);
          if (e.isIntersecting && (!best || e.intersectionRatio > best.ratio)) {
            best = { i, ratio: e.intersectionRatio };
          }
        });
        if (best) setActive((best as { i: number }).i);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.5, 1] },
    );
    itemRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [pillars.length]);

  return (
    <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
      {/* sticky side */}
      <div className="hidden lg:block">
        <div className="sticky top-32">
          <p className="label">The framework</p>
          <p className="font-statement mt-6 text-[length:var(--text-step-6)] leading-none text-gold">
            {String(active + 1).padStart(2, "0")}
          </p>
          <h3 className="font-statement mt-4 text-[length:var(--text-step-2)]">
            {pillars[active]?.title}
          </h3>
          <p className="mt-4 max-w-[30ch] text-[0.98rem] italic text-cream/70">
            {pillars[active]?.question}
          </p>

          <ol className="mt-10 flex flex-col gap-2.5" aria-hidden="true">
            {pillars.map((p, i) => (
              <li
                key={p.n}
                className={`flex items-center gap-3 font-mono text-[0.62rem] tracking-[0.18em] uppercase transition-colors duration-500 ${
                  i === active ? "text-gold" : "text-cream/35"
                }`}
              >
                <span
                  className={`h-px transition-all duration-500 ${
                    i === active ? "w-9 bg-gold" : "w-4 bg-cream/30"
                  }`}
                />
                {p.title}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* scrolling side */}
      <div className="flex flex-col gap-16 sm:gap-24 lg:gap-32">
        {pillars.map((p, i) => (
          <div
            key={p.n}
            // Anchor target for The Ascent on the home page. scroll-mt keeps
            // the heading clear of the fixed header on arrival.
            id={`pillar-${p.n}`}
            className="scroll-mt-28"
            data-i={i}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
          >
            <div className="flex items-baseline gap-5 lg:hidden">
              <span className="font-statement text-[length:var(--text-step-3)] leading-none text-gold">
                {p.n}
              </span>
              <h3 className="font-statement text-[length:var(--text-step-2)]">
                {p.title}
              </h3>
            </div>
            <p className="mt-4 text-[0.98rem] italic text-cream/70 lg:hidden">
              {p.question}
            </p>

            <p className="mt-6 max-w-[52ch] text-[length:var(--text-step-1)] leading-snug text-cream lg:mt-0">
              {p.body}
            </p>

            <ul className="mt-8 flex flex-col">
              {p.covers.map((c, j) => (
                <li
                  key={j}
                  className="flex gap-5 border-t border-cream/15 py-4 text-[0.95rem] leading-relaxed text-cream/75"
                >
                  <span className="font-mono text-[0.6rem] text-gold/70 tabular-nums">
                    {String(j + 1).padStart(2, "0")}
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
