"use client";

import { useEffect, useRef, useState } from "react";
import { DANCER_PATH, DANCER_VIEWBOX } from "@/lib/brand";
import { Wordmark } from "./Marks";

const SEEN_KEY = "rai-arts:opening-seen";

type Phase = "idle" | "playing" | "lifting" | "gone";

/**
 * The title sequence: she draws herself, the wordmark resolves, the curtain
 * lifts. Plays once per browser session, and never for anyone who has asked
 * their OS for reduced motion. The page beneath is always in the DOM, so this
 * costs nothing in crawlability.
 *
 * The phase decision and the animation setup are deliberately separate effects:
 * the overlay does not exist in the DOM until the phase is "playing", so the
 * path can only be measured after that render has committed.
 */
export default function Opening() {
  const [phase, setPhase] = useState<Phase>("idle");
  const pathRef = useRef<SVGPathElement>(null);

  // 1. Decide whether to play at all.
  //
  // This has to be a state update inside an effect: the answer depends on
  // sessionStorage and a media query, neither of which exists during server
  // rendering, so deciding any earlier would desync hydration. The one extra
  // render is the correct trade here.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      // Private mode or storage blocked — treat as unseen, harmless either way.
    }

    if (reduce || seen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPhase("gone");
      return;
    }

    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      // ignore
    }
    setPhase("playing");
  }, []);

  // 2. Drive the sequence. Runs after the overlay has actually rendered.
  useEffect(() => {
    if (phase === "playing") {
      document.documentElement.style.overflow = "hidden";

      const p = pathRef.current;
      let anim: Animation | undefined;
      if (p) {
        const len = p.getTotalLength();
        p.style.strokeDasharray = `${len}`;
        // The Web Animations API rather than a CSS transition: setting the
        // start value and the target across a rAF does not reliably commit a
        // starting style, so the browser collapses both into one recalc and
        // skips the animation entirely. WAAPI states both keyframes up front.
        anim = p.animate(
          [{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
          {
            duration: 2400,
            easing: "cubic-bezier(.36,.15,.2,1)",
            fill: "forwards",
          },
        );
      }

      const t = setTimeout(() => setPhase("lifting"), 3300);
      return () => {
        anim?.cancel();
        clearTimeout(t);
      };
    }

    if (phase === "lifting") {
      const t = setTimeout(() => setPhase("gone"), 900);
      return () => clearTimeout(t);
    }

    if (phase === "gone") {
      document.documentElement.style.overflow = "";
    }
  }, [phase]);

  // Never leave the page locked if this unmounts mid-sequence.
  useEffect(
    () => () => {
      document.documentElement.style.overflow = "";
    },
    [],
  );

  if (phase === "idle" || phase === "gone") return null;

  return (
    <div
      className="fixed inset-0 z-[120] grid place-items-center bg-forest-deep transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(.7,0,.2,1)]"
      style={{
        transform: phase === "lifting" ? "translateY(-100%)" : "none",
        opacity: phase === "lifting" ? 0.4 : 1,
      }}
    >
      <div className="flex w-full flex-col items-center gap-8 px-6" aria-hidden="true">
        <svg
          viewBox={DANCER_VIEWBOX}
          className="h-[46vh] max-h-[420px] w-auto text-gold"
          fill="none"
        >
          <path
            ref={pathRef}
            d={DANCER_PATH}
            stroke="currentColor"
            strokeWidth={7}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <Wordmark
          className="h-auto w-[min(240px,52vw)] text-cream"
          title="Rai Arts"
          style={{
            animation: "raiFadeUp 900ms cubic-bezier(.16,.84,.28,1) 2150ms both",
          }}
        />
      </div>

      <button
        type="button"
        onClick={() => setPhase("lifting")}
        className="absolute right-6 bottom-8 inline-flex min-h-[44px] items-center rounded-sm border border-cream/25 px-5 py-3 font-mono text-[0.62rem] tracking-[0.18em] text-cream/70 uppercase transition-colors hover:bg-cream/10 hover:text-cream focus-visible:outline-gold"
      >
        Skip intro
      </button>

      <style>{`
        @keyframes raiFadeUp {
          from { opacity: 0; transform: translateY(14px) }
          to   { opacity: 1; transform: none }
        }
      `}</style>
    </div>
  );
}
