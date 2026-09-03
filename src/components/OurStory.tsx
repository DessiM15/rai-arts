"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { StoryChapter } from "@/lib/content";
import { Rise, Words } from "./Reveal";
import { Button } from "./ui";

/**
 * Our Story as three chapters with a reading index that holds still.
 *
 * The left column is sticky: the founder's portrait, then the chapter list,
 * which lights up as each chapter crosses the middle of the screen. The right
 * column is the story itself, revealed paragraph by paragraph so the eye is
 * only ever asked to take in one thought at a time.
 *
 * Below the large breakpoint the sticky column is dropped and everything
 * stacks, portrait first.
 */
export default function OurStory({
  intro,
  chapters,
  photo,
  caption,
}: {
  intro: string;
  chapters: StoryChapter[];
  photo: { src: string; alt: string };
  caption: string;
}) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        let best: { i: number; ratio: number } | null = null;
        entries.forEach((e) => {
          const i = Number((e.target as HTMLElement).dataset.i);
          if (e.isIntersecting && (!best || e.intersectionRatio > best.ratio)) {
            best = { i, ratio: e.intersectionRatio };
          }
        });
        if (best) setActive((best as { i: number }).i);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [chapters.length]);

  const jump = (i: number) => {
    refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
      {/* ── sticky side ── */}
      <div>
        <div className="lg:sticky lg:top-28">
          <Rise>
            <figure className="mx-auto w-full max-w-[17rem] lg:mx-0">
              <div className="grain relative isolate aspect-[4/5] overflow-hidden rounded-sm bg-forest">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 24vw, 70vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 font-mono text-[0.6rem] tracking-[0.16em] text-gold-deep uppercase">
                {caption}
              </figcaption>
            </figure>
          </Rise>

          <ol className="mt-10 hidden flex-col gap-1 lg:flex" aria-label="Chapters">
            {chapters.map((c, i) => {
              const on = i === active;
              return (
                <li key={c.n}>
                  <button
                    type="button"
                    onClick={() => jump(i)}
                    aria-current={on ? "true" : undefined}
                    className={`group flex w-full items-baseline gap-4 py-2 text-left transition-colors duration-500 ${
                      on ? "text-forest" : "text-ink-soft/60 hover:text-ink-soft"
                    }`}
                  >
                    <span
                      className={`h-px shrink-0 transition-all duration-500 ${
                        on ? "w-8 bg-gold" : "w-3 bg-forest/25 group-hover:bg-forest/45"
                      }`}
                    />
                    <span className="font-mono text-[0.6rem] tracking-[0.18em] uppercase">
                      {c.n}
                    </span>
                    <span className="font-display-sm text-[1rem] leading-snug">
                      {c.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* ── the story ── */}
      <div>
        <Words
          className="max-w-[30ch] text-[length:var(--text-step-2)] leading-[1.15] text-forest font-display"
          text={intro}
        />

        <div className="mt-16 flex flex-col gap-16 sm:mt-20 sm:gap-20 lg:gap-28">
          {chapters.map((c, i) => (
            <section
              key={c.n}
              id={`story-${c.n}`}
              data-i={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="scroll-mt-28"
            >
              <Rise className="flex items-baseline gap-5">
                <span className="font-statement text-[length:var(--text-step-2)] leading-none text-gold-deep/50">
                  {c.n}
                </span>
                <h2 className="font-statement text-[length:var(--text-step-2)]">
                  {c.title}
                </h2>
              </Rise>

              <div className="mt-8 flex flex-col gap-6">
                {c.blocks.map((b, j) => {
                  if (b.kind === "p") {
                    return (
                      <Rise key={j} delay={0.05}>
                        <p className="max-w-[58ch] text-[length:var(--text-step-0)] leading-[1.7] text-ink-soft">
                          {b.text}
                        </p>
                      </Rise>
                    );
                  }
                  if (b.kind === "questions") {
                    return (
                      <ul key={j} className="my-4 flex flex-col">
                        {b.items.map((q, k) => (
                          <Rise key={k} delay={k * 0.08} y={14}>
                            <li className="flex items-baseline gap-5 border-t border-forest/12 py-4 sm:gap-7">
                              <span className="font-mono text-[0.6rem] text-gold-deep/70 tabular-nums">
                                {String(k + 1).padStart(2, "0")}
                              </span>
                              <span className="font-display-sm text-[length:var(--text-step-1)] leading-snug text-forest">
                                {q}
                              </span>
                            </li>
                          </Rise>
                        ))}
                        <li className="border-t border-forest/12" aria-hidden="true" />
                      </ul>
                    );
                  }
                  return (
                    <Rise key={j} className="mt-4">
                      <p className="max-w-[26ch] border-l-2 border-gold pl-6 font-display text-[length:var(--text-step-2)] leading-[1.12] text-forest">
                        {b.text}
                      </p>
                    </Rise>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <Rise className="mt-16 sm:mt-20">
          <Button href="/services" variant="gold">
            Explore Our Services
          </Button>
        </Rise>
      </div>
    </div>
  );
}
