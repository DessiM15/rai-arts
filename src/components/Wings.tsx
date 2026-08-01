"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Pillar } from "@/lib/content";

/**
 * The wings — five pillars queued up like performers, one downstage in the
 * light and the rest waiting in the dark.
 *
 * The active card widens and lifts into a warm glow; the others recede,
 * dim and soften. Selecting is done by click or focus rather than hover
 * alone, so it works on a phone and from a keyboard, and the row of names
 * underneath doubles as a tablist.
 *
 * The expansion is driven by flex-grow rather than absolute positioning, so
 * nothing can overlap or z-fight at any width.
 */
export default function Wings({
  pillars,
  art,
}: {
  pillars: Pillar[];
  /** One image per pillar, in order. */
  art: { src: string; alt: string }[];
}) {
  const [active, setActive] = useState(1);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const back = e.key === "ArrowLeft";
    const fwd = e.key === "ArrowRight";
    if (!back && !fwd) return;
    e.preventDefault();
    const next = (i + (fwd ? 1 : -1) + pillars.length) % pillars.length;
    setActive(next);
    cardRefs.current[next]?.focus();
  };

  return (
    <div className="flex flex-col gap-8">
      {/* ── the cards ── */}
      <div
        role="tablist"
        aria-label="The five pillars"
        className="flex gap-3 overflow-x-auto pb-2 sm:gap-4 lg:overflow-visible"
      >
        {pillars.map((p, i) => {
          const on = i === active;
          const image = art[i];
          return (
            <button
              key={p.n}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              role="tab"
              aria-selected={on}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              onFocus={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={[
                "group relative aspect-[3/4] shrink-0 basis-[68vw] overflow-hidden rounded-sm text-left",
                "transition-[flex-grow,opacity,transform,box-shadow,border-color] duration-[700ms] ease-[cubic-bezier(.16,.84,.28,1)]",
                "sm:basis-0 sm:shrink lg:aspect-[3/4.4]",
                on
                  ? "border border-gold opacity-100 shadow-[0_28px_80px_-30px_rgba(239,185,59,0.45)] sm:grow-[2.1]"
                  : "border border-cream/15 opacity-75 hover:opacity-95 sm:grow-[1]",
              ].join(" ")}
            >
              <Image
                src={image.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 30vw, 68vw"
                className={`object-cover transition-[filter,transform] duration-[900ms] ease-[cubic-bezier(.16,.84,.28,1)] ${
                  on ? "scale-100 blur-0" : "scale-105 blur-[2px] grayscale-[0.25]"
                }`}
              />

              {/* the light: warm on the active card, cold shadow on the rest */}
              <span
                aria-hidden="true"
                className={`absolute inset-0 transition-opacity duration-700 ${
                  on
                    ? "bg-gradient-to-t from-forest-deep/95 via-forest-deep/45 to-transparent"
                    : "bg-gradient-to-t from-forest-deep/95 via-forest-deep/75 to-forest-deep/45"
                }`}
              />

              <span
                aria-hidden="true"
                className={`absolute inset-0 transition-opacity duration-700 ${
                  on ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  background:
                    "radial-gradient(120% 70% at 50% 0%, rgba(239,185,59,0.22) 0%, rgba(239,185,59,0) 60%)",
                }}
              />

              <span className="absolute top-5 left-5 z-[2] font-mono text-[0.66rem] tracking-[0.2em] text-gold">
                {p.n}
              </span>

              {/* copy sits at the foot of the card */}
              <span className="absolute inset-x-0 bottom-0 z-[2] flex flex-col gap-3 p-5 sm:p-6">
                <span
                  className={`font-statement leading-[1.05] text-cream transition-[font-size] duration-700 ${
                    on
                      ? "text-[length:var(--text-step-2)]"
                      : "text-[length:var(--text-step-1)]"
                  }`}
                >
                  {p.title}
                </span>

                <span
                  className={`grid transition-[grid-template-rows,opacity] duration-700 ${
                    on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <span className="overflow-hidden">
                    <span className="mb-4 block h-px w-14 bg-gold" />
                    <span className="block max-w-[34ch] text-[0.92rem] leading-relaxed text-cream/80">
                      {p.body}
                    </span>
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* ── the names, doubling as the tab row ── */}
      <div className="flex flex-wrap items-center gap-x-7 gap-y-2 border-t border-cream/15 pt-5">
        {pillars.map((p, i) => (
          <button
            key={p.n}
            onClick={() => setActive(i)}
            tabIndex={-1}
            aria-hidden="true"
            className={`font-mono text-[0.6rem] tracking-[0.18em] uppercase transition-colors duration-500 ${
              i === active ? "text-gold" : "text-cream/40 hover:text-cream/70"
            }`}
          >
            {p.title}
          </button>
        ))}

        <Link
          href={`/framework#pillar-${pillars[active]?.n}`}
          className="ml-auto inline-flex min-h-[44px] items-center gap-2 font-mono text-[0.62rem] tracking-[0.16em] text-gold uppercase"
        >
          Read pillar {pillars[active]?.n}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
