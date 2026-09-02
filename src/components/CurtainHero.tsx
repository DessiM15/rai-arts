"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DANCER_PATH, DANCER_VIEWBOX } from "@/lib/brand";
import { lockScroll } from "@/lib/scroll";
import { Word } from "./Marks";

type Frame = { src: string; alt: string };

const SEEN_KEY = "rai-arts:opening-seen";

/**
 * Set true to replay the title sequence on every page load while reviewing it.
 * Leave false in production: it plays once per browser session, so returning
 * visitors and anyone clicking back to Home don't sit through it again — they
 * get the finished lockup, closed, waiting for their scroll.
 *
 * (Reduced-motion visitors skip it, and start with the curtain open.)
 */
const PLAY_EVERY_VISIT = false;

type Phase = "idle" | "playing" | "ready";

/**
 * The title curtain.
 *
 * The loading screen and the hero are one thing. The dark house curtain fills
 * the viewport with the large lockup on it — RAI, the dancer, ARTS — and on
 * first visit the dancer draws herself before the words resolve. Then the page
 * unlocks and the curtain waits. As you scroll it parts down the middle: RAI
 * rides off with the left panel, ARTS with the right, the dancer fades at the
 * seam, and the stage behind resolves with the headline centred on it.
 *
 * Everything after the drawing is scroll-linked, not timed, so the reveal
 * happens at the pace the visitor sets.
 *
 * The phase decision and the drawing setup are deliberately separate effects:
 * the decision depends on sessionStorage and a media query, neither of which
 * exists during server rendering, and the path can only be measured after the
 * "playing" render has committed.
 */
export default function CurtainHero({
  stage,
  children,
}: {
  stage: Frame;
  children: React.ReactNode;
}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const wrapRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // 1. Decide whether the drawing plays at all.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = !PLAY_EVERY_VISIT && sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      // Private mode or storage blocked — treat as unseen, harmless either way.
    }

    if (reduce || seen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPhase("ready");
      return;
    }

    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      // ignore
    }
    setPhase("playing");
  }, []);

  // 2. Draw the dancer. Runs after the "playing" render has committed.
  useEffect(() => {
    if (phase !== "playing") return;
    lockScroll(true);

    const p = pathRef.current;
    let anim: Animation | undefined;
    if (p) {
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
      p.style.opacity = "1";
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

    const t = setTimeout(() => setPhase("ready"), 3300);
    return () => {
      // Leave her fully drawn whether the sequence finished or was skipped.
      if (p) p.style.strokeDashoffset = "0";
      anim?.cancel();
      clearTimeout(t);
      lockScroll(false);
    };
  }, [phase]);

  // 3. The scroll-linked parting.
  useEffect(() => {
    const wrap = wrapRef.current;
    const l = leftRef.current;
    const r = rightRef.current;
    const mark = markRef.current;
    const stageEl = stageRef.current;
    if (!wrap || !l || !r || !mark || !stageEl) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      l.style.transform = "translate3d(-100%,0,0)";
      r.style.transform = "translate3d(100%,0,0)";
      mark.style.opacity = "0";
      stageEl.style.opacity = "1";
      return;
    }

    let raf = 0;
    let ticking = false;

    const frame = () => {
      const rect = wrap.getBoundingClientRect();
      // 0 while pinned at the top, 1 once the section has been scrolled through
      const travel = rect.height - window.innerHeight;
      const p = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0;

      // the curtain does its work in the first 70% of the travel
      const open = Math.min(1, p / 0.7);
      const eased = open * open * (3 - 2 * open); // smoothstep

      l.style.transform = `translate3d(${-eased * 100}%,0,0)`;
      r.style.transform = `translate3d(${eased * 100}%,0,0)`;

      // the dancer fades at the seam as the words part
      mark.style.opacity = String(Math.max(0, 1 - eased * 1.6));
      mark.style.transform = `scale(${1 + eased * 0.22})`;

      // the stage resolves as the curtain clears
      stageEl.style.opacity = String(Math.min(1, Math.max(0, (eased - 0.25) / 0.5)));
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(frame);
    };

    frame();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const playing = phase === "playing";
  const ready = phase === "ready";

  // The words fade up once the dancer is mostly drawn; after that (and for
  // anyone who has already seen it) they are simply there.
  const wordStyle: React.CSSProperties = playing
    ? { animation: "raiFadeUp 900ms cubic-bezier(.16,.84,.28,1) 2150ms both" }
    : { opacity: ready ? 1 : 0 };

  // data-nav-plain keeps the header fully transparent over the hero: inverted
  // to cream, but never filled, so the curtain reads edge to edge.
  return (
    <div
      ref={wrapRef}
      data-nav="dark"
      data-nav-plain=""
      className="curtain relative h-[210svh]"
    >
      <div
        className={`sticky top-0 grain isolate h-svh overflow-hidden bg-[#0b0a09] ${
          // sits above the header while the title sequence plays
          playing ? "z-[120]" : ""
        }`}
      >
        {/* ── the stage behind the curtain ── */}
        <div ref={stageRef} className="absolute inset-0 z-[1] opacity-0">
          <Image
            src={stage.src}
            alt={stage.alt}
            fill
            priority
            sizes="100vw"
            // A landscape frame in a portrait viewport crops to the middle,
            // which on this photo is the empty gap between the two figures.
            // Biasing right keeps Kira in shot on a phone.
            className="object-cover object-[70%_center] sm:object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65"
          />
          <div className="relative z-[2] flex h-full items-center justify-center px-5 text-center sm:px-8">
            <div className="on-dark flex max-w-[46rem] flex-col items-center gap-7">
              {children}
            </div>
          </div>
        </div>

        {/* ── the two halves of the house curtain ── */}
        <div
          ref={leftRef}
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-0 z-[3] w-1/2 bg-forest-deep will-change-transform"
        >
          <Word word="rai" className="curtain-word curtain-word-rai text-cream" style={wordStyle} />
        </div>
        <div
          ref={rightRef}
          aria-hidden="true"
          className="absolute top-0 right-0 bottom-0 z-[3] w-1/2 bg-forest-deep will-change-transform"
        >
          <Word word="arts" className="curtain-word curtain-word-arts text-cream" style={wordStyle} />
        </div>

        {/* ── the dancer, straddling the seam ── */}
        <div
          ref={markRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[4] flex items-center justify-center will-change-[opacity,transform]"
        >
          <svg
            viewBox={DANCER_VIEWBOX}
            fill="none"
            className="curtain-dancer text-gold drop-shadow-[0_14px_40px_rgba(0,0,0,0.45)]"
          >
            <path
              ref={pathRef}
              d={DANCER_PATH}
              stroke="currentColor"
              strokeWidth={7}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              // Hidden until the phase is known, so a first-time visitor never
              // glimpses the finished figure before she starts to draw.
              style={{ opacity: ready ? 1 : 0 }}
            />
          </svg>
        </div>

        {/* ── skip, while the drawing plays ── */}
        {playing && (
          <button
            type="button"
            onClick={() => setPhase("ready")}
            className="absolute right-6 bottom-8 z-[6] inline-flex min-h-[44px] items-center rounded-sm border border-cream/25 px-5 py-3 font-mono text-[0.62rem] tracking-[0.18em] text-cream/70 uppercase transition-colors hover:bg-cream/10 hover:text-cream focus-visible:outline-gold"
          >
            Skip intro
          </button>
        )}

        {/* ── scroll cue, once the curtain is waiting ── */}
        <div
          aria-hidden="true"
          className={`absolute inset-x-0 bottom-8 z-[5] flex justify-center transition-opacity duration-700 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="font-mono text-[0.6rem] tracking-[0.24em] text-cream/60 uppercase">
            Scroll
          </span>
        </div>
      </div>
    </div>
  );
}
