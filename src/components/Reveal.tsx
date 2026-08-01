"use client";

import { Fragment, useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

/**
 * A small literal union, deliberately NOT React's `ElementType`.
 *
 * Using `ElementType` as a JSX tag forces TypeScript to resolve the props of
 * every intrinsic element at each call site. With this many nested reveals per
 * page that compounds until `tsc` stops responding altogether, so the tag stays
 * narrow and only `Lines` is polymorphic at all.
 */
type HeadingTag = "h1" | "h2" | "h3" | "p" | "div";

/**
 * Elements opt in with [data-rv], [data-rv-words] or [data-rv-label]; when they
 * cross into view they get [data-in] and the CSS in globals.css does the rest.
 * The hidden states live behind `.js`, so nothing is ever hidden from a visitor
 * whose JavaScript didn't run.
 *
 * Two things matter here:
 *
 * 1. A single shared observer serves the whole page. Pages carry 30+ revealing
 *    elements, and one observer per element was both wasteful and unreliable.
 * 2. Anything already on screen at mount is revealed synchronously rather than
 *    waiting for the observer's first callback. Above-the-fold copy must never
 *    depend on an async round-trip to become visible.
 */
let sharedObserver: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === "undefined") return null;
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-in", "");
          sharedObserver?.unobserve(e.target);
        }
      },
      // threshold 0 + a shrunk root, rather than a fraction of the element:
      // a fractional threshold can never be met by an element taller than the
      // viewport, which would leave it hidden forever.
      { threshold: 0, rootMargin: "0px 0px -12% 0px" },
    );
  }
  return sharedObserver;
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Already visible? Reveal immediately — don't wait on the observer.
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || 0;
    if (r.top < vh * 0.95 && r.bottom > 0) {
      el.setAttribute("data-in", "");
      return;
    }

    const io = getObserver();
    if (!io) {
      // No IntersectionObserver (very old browser) — just show everything.
      el.setAttribute("data-in", "");
      return;
    }
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  return ref;
}

type Style = CSSProperties & Record<string, string | number | undefined>;

/** Generic rise-into-view for blocks, cards, and images. */
export function Rise({
  children,
  className = "",
  delay = 0,
  y = 26,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      data-rv=""
      className={className}
      style={{ "--rv-d": `${delay}s`, "--rv-y": `${y}px` } as Style}
    >
      {children}
    </div>
  );
}

/**
 * Line-mask reveal. Lines are passed explicitly rather than left to wrap, so
 * the typographic break is a decision instead of an accident of viewport width.
 */
export function Lines({
  lines,
  as: Tag = "h2",
  className = "",
  delay = 0,
  stagger = 0.11,
}: {
  lines: string[];
  as?: HeadingTag;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const ref = useReveal<HTMLHeadingElement>();
  return (
    <Tag ref={ref} data-rv-lines="" className={className}>
      {lines.map((line, i) => (
        <span key={i} className="rv-line">
          <span style={{ "--rv-d": `${delay + i * stagger}s` } as Style}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/** Body copy, revealed word by word with a soft defocus. */
export function Words({
  text,
  className = "",
  delay = 0.1,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useReveal<HTMLParagraphElement>();
  const words = text.split(/\s+/);
  return (
    <p ref={ref} data-rv-words="" className={className}>
      {words.map((w, i) => (
        // The space must be a text node *between* the spans. Put it inside an
        // inline-block and the browser trims it, running every word together.
        <Fragment key={i}>
          <span className="w" style={{ "--wd": `${delay + i * 0.016}s` } as Style}>
            {w}
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </p>
  );
}

/** The eyebrow label, whose letterspacing collapses as it settles. */
export function Label({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useReveal<HTMLParagraphElement>();
  return (
    <p
      ref={ref}
      data-rv-label=""
      className={`label ${className}`}
      style={{ "--rv-d": `${delay}s` } as Style}
    >
      {children}
    </p>
  );
}
