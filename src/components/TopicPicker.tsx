"use client";

import { useState } from "react";
import { Button } from "./ui";

/**
 * "Build your program": the workshop topics as tags you can select. Picking
 * some and pressing the button carries them to the contact form, where they
 * are dropped into the message so Kira sees the shortlist without anyone
 * having to type it twice.
 */
export default function TopicPicker({
  topics,
  more,
}: {
  topics: string[];
  more: string;
}) {
  const [picked, setPicked] = useState<string[]>([]);

  const toggle = (t: string) =>
    setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  const href =
    picked.length > 0
      ? `/contact?topics=${encodeURIComponent(picked.join(", "))}`
      : "/contact";

  return (
    <div>
      <ul className="flex flex-wrap gap-2.5" aria-label="Workshop topics">
        {topics.map((t) => {
          const on = picked.includes(t);
          return (
            <li key={t}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => toggle(t)}
                className={[
                  "inline-flex min-h-[44px] items-center gap-2 rounded-full border px-5 py-2 text-[0.9rem] transition-all duration-400 ease-[cubic-bezier(.16,.84,.28,1)]",
                  on
                    ? "border-gold bg-gold text-forest-deep"
                    : "border-forest/30 bg-transparent text-forest hover:border-forest hover:bg-forest/5",
                ].join(" ")}
              >
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 rounded-full transition-colors duration-400 ${
                    on ? "bg-forest-deep" : "bg-gold"
                  }`}
                />
                {t}
              </button>
            </li>
          );
        })}
        <li className="inline-flex min-h-[44px] items-center px-2 font-mono text-[0.62rem] tracking-[0.16em] text-ink-soft uppercase">
          {more}
        </li>
      </ul>

      <div className="mt-10 flex flex-wrap items-center gap-5">
        <Button href={href} variant="gold">
          Schedule a consultation
        </Button>
        <p className="text-[0.86rem] text-ink-soft" aria-live="polite">
          {picked.length === 0
            ? "Pick a few topics and we'll bring them along."
            : `${picked.length} topic${picked.length === 1 ? "" : "s"} selected.`}
        </p>
      </div>
    </div>
  );
}
