"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { Pillar } from "@/lib/content";

/**
 * The Ascent — the five pillars as slabs climbing a raked stage floor,
 * 01 nearest and lowest, 05 furthest and highest. Hovering or focusing a slab
 * lifts it toward the viewer and cross-fades the copy panel beside it.
 *
 * Pure CSS 3D: no library. `transform-style: preserve-3d` on both the plane
 * and each slab is what keeps 05 cleanly in front of 04 with no z-fighting.
 *
 * Accessibility: each slab is a real link, so it is reachable and clickable
 * without JavaScript, and arrow keys move between them. The copy panel is a
 * visual duplicate of text already carried by the links, so it is hidden from
 * assistive tech rather than announced on every hover.
 */
export default function Ascent({ pillars }: { pillars: Pillar[] }) {
  const [active, setActive] = useState(0);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const current = pillars[active];

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    const back = e.key === "ArrowLeft" || e.key === "ArrowDown";
    const fwd = e.key === "ArrowRight" || e.key === "ArrowUp";
    if (!back && !fwd) return;
    e.preventDefault();
    const next = Math.min(pillars.length - 1, Math.max(0, i + (fwd ? 1 : -1)));
    setActive(next);
    linkRefs.current[next]?.focus();
  }

  return (
    <section className="ascent grain" data-nav="dark">
      <div className="ascent-key" aria-hidden="true" />

      <div className="ascent-stage">
        {/* ── the scene (desktop) ── */}
        <div className="ascent-scene hidden lg:block">
          <div className="ascent-plane">
            {pillars.map((p, i) => {
              const on = i === active;
              return (
                <Link
                  key={p.n}
                  href={`/framework#pillar-${p.n}`}
                  ref={(el) => {
                    linkRefs.current[i] = el;
                  }}
                  data-active={on}
                  className="ascent-slab focus-visible:outline-gold"
                  style={{
                    transform: `translate3d(${i * 26}px, ${-i * 118}px, ${
                      i * 58 + (on ? 46 : 0)
                    }px)`,
                    // The shadow grows with the climb; uniform shadows kill the depth.
                    boxShadow: `0 ${28 + i * 10}px ${44 + i * 16}px rgba(10,16,8,${
                      0.42 + i * 0.05
                    }), inset 0 1px 0 rgba(247,240,230,.14)`,
                    zIndex: i,
                  }}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                >
                  <span className="ascent-under" aria-hidden="true" />
                  <span className="ascent-label">
                    <span
                      className={`font-display-sm text-[30px] leading-none transition-colors duration-300 ${
                        on ? "text-gold" : "text-gold/75"
                      }`}
                    >
                      {p.n}
                    </span>
                    <span
                      className={`font-display-sm text-[34px] leading-none transition-colors duration-300 ${
                        on ? "text-cream" : "text-cream/75"
                      }`}
                    >
                      {p.title}
                    </span>
                  </span>
                  <span className="sr-only">
                    {p.question} {p.body}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* ── copy panel ── */}
          <div className="ascent-copy" aria-hidden="true" key={current?.n}>
            <p className="font-mono text-[0.62rem] tracking-[0.18em] text-gold uppercase">
              Pillar {current?.n} of 05
            </p>
            <h3 className="font-statement mt-5 text-[clamp(2.2rem,2.6vw,3.25rem)] leading-[1.02] text-cream">
              {current?.title}
            </h3>
            <div className="my-7 h-px w-16 bg-gold" />
            <p className="text-[17px] leading-[1.62] text-cream/75 [text-wrap:pretty]">
              {current?.body}
            </p>
          </div>

          <p className="absolute bottom-[34px] left-[56px] font-mono text-[0.62rem] tracking-[0.18em] text-cream/60 uppercase">
            Hover or arrow through the pillars
          </p>
        </div>

        {/* ── stacked fallback (below lg) ── */}
        <div className="flex flex-col gap-5 px-5 py-16 sm:px-8 lg:hidden">
          {pillars.map((p, i) => (
            <Link
              key={p.n}
              href={`/framework#pillar-${p.n}`}
              className="relative block rounded-[7px] border border-gold/28 p-6 transition-colors hover:border-gold"
              style={{
                background:
                  "linear-gradient(160deg, rgba(58,85,48,.94) 0%, rgba(44,64,35,.94) 100%)",
                boxShadow: `0 ${16 + i * 6}px ${28 + i * 10}px rgba(10,16,8,${
                  0.38 + i * 0.04
                }), inset 0 1px 0 rgba(247,240,230,.14)`,
              }}
            >
              {/* the same underside, just flattened */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-2 h-3 rounded-b-[7px] bg-forest-deep"
              />
              <span className="relative flex items-baseline gap-4">
                <span className="font-display-sm text-[1.5rem] text-gold">
                  {p.n}
                </span>
                <span className="font-display-sm text-[1.35rem] text-cream">
                  {p.title}
                </span>
              </span>
              <p className="relative mt-3 text-[0.95rem] leading-relaxed text-cream/75">
                {p.body}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
