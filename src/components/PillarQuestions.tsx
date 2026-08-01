"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Pillar } from "@/lib/content";

/**
 * The five questions, set against a polaroid.
 *
 * The list is the moving part: selecting a pillar opens its question in a lit
 * panel while the rest stay as quiet ruled rows. The photograph holds still,
 * which is what keeps the section calm rather than busy.
 *
 * Opening is by click or focus rather than hover, so it works on a phone and
 * from a keyboard; arrow keys move between rows.
 */
export default function PillarQuestions({
  pillars,
  photo,
  caption,
}: {
  pillars: Pillar[];
  photo: { src: string; alt: string };
  caption: string;
}) {
  const [active, setActive] = useState(0);
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const back = e.key === "ArrowUp";
    const fwd = e.key === "ArrowDown";
    if (!back && !fwd) return;
    e.preventDefault();
    const next = (i + (fwd ? 1 : -1) + pillars.length) % pillars.length;
    setActive(next);
    rowRefs.current[next]?.focus();
  };

  return (
    <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
      {/* ── the polaroid ── */}
      <figure className="mx-auto w-full max-w-[24rem] -rotate-[3deg] bg-cream p-4 pb-5 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.65)] lg:mx-0">
        <div className="relative aspect-[4/5] overflow-hidden bg-forest-deep">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 32vw, 88vw"
            className="object-cover"
          />
        </div>
        <figcaption className="font-display-sm mt-5 mb-2 text-center text-[1.02rem] text-ink italic">
          {caption}
        </figcaption>
      </figure>

      {/* ── the questions ── */}
      <ul className="flex flex-col">
        {pillars.map((p, i) => {
          const on = i === active;
          return (
            <li key={p.n}>
              <button
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
                onClick={() => setActive(i)}
                onFocus={() => setActive(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                aria-expanded={on}
                className={[
                  "group block w-full rounded-sm px-5 py-5 text-left transition-colors duration-500 sm:px-7 sm:py-6",
                  on
                    ? "bg-forest-mid"
                    : "border-t border-cream/15 hover:bg-cream/[0.04]",
                ].join(" ")}
              >
                <span className="flex items-baseline gap-6 sm:gap-9">
                  <span
                    className={`font-display-sm shrink-0 text-[length:var(--text-step-1)] tabular-nums transition-colors duration-500 ${
                      on ? "text-gold" : "text-gold/55"
                    }`}
                  >
                    {p.n}
                  </span>

                  <span className="flex-1">
                    <span
                      className={`font-statement block text-[length:var(--text-step-2)] leading-[1.1] transition-colors duration-500 ${
                        on ? "text-cream" : "text-cream/55"
                      }`}
                    >
                      {p.title}
                    </span>

                    {/* the question unfolds only for the open row */}
                    <span
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(.16,.84,.28,1)] ${
                        on
                          ? "mt-3 grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <span className="overflow-hidden">
                        <span className="block max-w-[46ch] text-[0.98rem] leading-relaxed text-cream/80">
                          {p.question}
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
