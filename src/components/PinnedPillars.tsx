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
          <p className="label">The five pillars</p>
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
            // scroll-mt keeps the heading clear of the fixed header on arrival.
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

            <p className="mt-6 max-w-[40ch] text-[length:var(--text-step-1)] leading-snug text-cream lg:mt-0">
              {p.lead}
            </p>

            {p.body.map((b, j) => (
              <p key={j} className="mt-5 max-w-[56ch] leading-[1.7] text-cream/75">
                {b}
              </p>
            ))}

            <p className="mt-6 max-w-[48ch] border-l-2 border-gold pl-5 font-display-sm text-[1.08rem] leading-snug text-cream">
              {p.close}
            </p>

            <p className="mt-8 font-mono text-[0.6rem] tracking-[0.18em] text-gold uppercase">
              Key areas
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {p.areas.map((a) => (
                <li
                  key={a}
                  className="rounded-full border border-cream/25 px-3.5 py-1.5 text-[0.82rem] text-cream/85"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
