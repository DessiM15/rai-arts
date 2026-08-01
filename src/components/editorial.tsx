import type { ReactNode } from "react";
import { Label, Lines } from "./Reveal";

/**
 * Shared editorial furniture: the devices that give every page the same voice
 * without every page looking identical.
 */

/** Section opener with an oversized index numeral set against the heading. */
export function SectionHead({
  index,
  label,
  lines,
  body,
  align = "left",
  dark = false,
  children,
}: {
  index?: string;
  label: string;
  lines: string[];
  body?: string;
  align?: "left" | "center";
  dark?: boolean;
  children?: ReactNode;
}) {
  const center = align === "center";
  return (
    <div
      className={`flex flex-col ${center ? "items-center text-center" : "items-start"}`}
    >
      <div
        className={`flex items-baseline gap-5 ${center ? "justify-center" : ""}`}
      >
        {index && (
          <span
            aria-hidden="true"
            className={`font-statement text-[length:var(--text-step-2)] leading-none ${
              dark ? "text-gold/45" : "text-gold-deep/40"
            }`}
          >
            {index}
          </span>
        )}
        <Label>{label}</Label>
      </div>

      <Lines
        as="h2"
        className="font-statement mt-6 text-[length:var(--text-step-3)]"
        lines={lines}
      />

      {body && (
        <p
          className={`mt-6 max-w-[54ch] text-[length:var(--text-step-0)] ${
            dark ? "text-cream/70" : "text-ink-soft"
          }`}
        >
          {body}
        </p>
      )}

      {children && (
        <div className={`mt-9 flex flex-wrap gap-3 ${center ? "justify-center" : ""}`}>
          {children}
        </div>
      )}
    </div>
  );
}

/** A pull quote set large enough to function as a section in its own right. */
export function Quote({
  children,
  attribution,
  role,
  dark = false,
}: {
  children: ReactNode;
  attribution: string;
  role?: string;
  dark?: boolean;
}) {
  return (
    <figure className="relative">
      <span
        aria-hidden="true"
        className={`font-statement absolute -top-8 -left-2 text-[7rem] leading-none select-none ${
          dark ? "text-gold/25" : "text-gold-deep/25"
        }`}
      >
        &ldquo;
      </span>
      <blockquote
        className={`font-statement relative max-w-[24ch] text-[length:var(--text-step-2)] ${
          dark ? "text-cream" : "text-forest"
        }`}
      >
        {children}
      </blockquote>
      <figcaption
        className={`mt-6 font-mono text-[0.62rem] tracking-[0.18em] uppercase ${
          dark ? "text-cream/55" : "text-ink-soft"
        }`}
      >
        {attribution}
        {role && <span className="opacity-60"> · {role}</span>}
      </figcaption>
    </figure>
  );
}

/** Oversized figures used as a graphic band. */
export function Stats({
  items,
  dark = false,
}: {
  items: [string, string][];
  dark?: boolean;
}) {
  return (
    <dl className="grid gap-10 sm:grid-cols-3">
      {items.map(([n, l]) => (
        <div key={l} className="flex flex-col">
          <dt
            className={`font-statement text-[length:var(--text-step-4)] leading-none ${
              dark ? "text-gold" : "text-forest"
            }`}
          >
            {n}
          </dt>
          <dd
            className={`mt-3 border-t pt-3 font-mono text-[0.6rem] tracking-[0.18em] uppercase ${
              dark
                ? "border-cream/20 text-cream/60"
                : "border-forest/15 text-ink-soft"
            }`}
          >
            {l}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Numbered editorial list — used where a sequence actually is a sequence. */
export function Steps({
  items,
  dark = false,
}: {
  items: { title: string; body: string }[];
  dark?: boolean;
}) {
  return (
    <ol className="flex flex-col">
      {items.map((s, i) => (
        <li
          key={i}
          className={`grid gap-3 border-t py-8 sm:grid-cols-[5rem_1fr] sm:gap-8 ${
            dark ? "border-cream/15" : "border-forest/12"
          }`}
        >
          <span
            className={`font-statement text-[length:var(--text-step-2)] leading-none ${
              dark ? "text-gold/70" : "text-gold-deep/60"
            }`}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="font-display-sm text-[length:var(--text-step-1)]">
              {s.title}
            </h3>
            <p
              className={`mt-2 max-w-[52ch] leading-relaxed ${
                dark ? "text-cream/70" : "text-ink-soft"
              }`}
            >
              {s.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
