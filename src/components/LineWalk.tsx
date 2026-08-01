"use client";

import { Fragment, useEffect, useRef } from "react";
import { DANCER_PATH } from "@/lib/brand";

export type Beat = {
  label: string;
  lines: string[];
  body: string;
};

/**
 * The spine of the site. A single gold path runs down the section; the dancer
 * travels it as you scroll, banking into the curves, and each beat's copy fires
 * when *she reaches it* — not when the element happens to enter the viewport.
 * That's the difference between a scroll effect and something choreographed.
 *
 * Everything is measured in real pixels (1 SVG unit === 1 CSS pixel) and
 * rebuilt on resize, so the dash pattern never distorts.
 */
export default function LineWalk({ beats }: { beats: Beat[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const trackRef = useRef<SVGPathElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const haloRef = useRef<SVGCircleElement>(null);
  const figRef = useRef<SVGGElement>(null);
  const beatRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const svg = svgRef.current;
    const track = trackRef.current;
    const line = lineRef.current;
    const halo = haloRef.current;
    const fig = figRef.current;
    if (!wrap || !svg || !track || !line || !halo || !fig) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let LEN = 0;
    let anchors: number[] = [];
    let small = false;
    let raf = 0;

    function build() {
      if (!wrap || !svg || !track || !line) return;
      const rect = wrap.getBoundingClientRect();
      const W = rect.width;
      const H = wrap.offsetHeight;
      small = W < 700;

      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      svg.setAttribute("width", String(W));
      svg.setAttribute("height", String(H));

      const wrapTop = rect.top + window.scrollY;
      const midX = small ? W * 0.62 : W * 0.5;
      const swing = W * (small ? 0.2 : 0.17);

      const pts: { x: number; y: number }[] = [{ x: midX, y: 0 }];
      beatRefs.current.forEach((b, i) => {
        if (!b) return;
        const br = b.getBoundingClientRect();
        const cy = br.top + window.scrollY - wrapTop + br.height / 2;
        // swing toward whichever side the copy isn't using
        const right = i % 2 === 1;
        pts.push({ x: right ? midX - swing : midX + swing, y: cy });
      });
      pts.push({ x: midX, y: H });

      let d = `M${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[Math.max(i - 1, 0)];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[Math.min(i + 2, pts.length - 1)];
        const c1x = p1.x + (p2.x - p0.x) / 6;
        const c1y = p1.y + (p2.y - p0.y) / 6;
        const c2x = p2.x - (p3.x - p1.x) / 6;
        const c2y = p2.y - (p3.y - p1.y) / 6;
        d += `C${c1x.toFixed(1)} ${c1y.toFixed(1)},${c2x.toFixed(1)} ${c2y.toFixed(1)},${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
      }

      track.setAttribute("d", d);
      line.setAttribute("d", d);
      LEN = line.getTotalLength();
      line.style.strokeDasharray = String(LEN);

      // binary-search where each beat sits along the curve
      anchors = beatRefs.current.map((b) => {
        if (!b) return 0;
        const br = b.getBoundingClientRect();
        const cy = br.top + window.scrollY - wrapTop + br.height / 2;
        let lo = 0;
        let hi = LEN;
        for (let k = 0; k < 22; k++) {
          const mid = (lo + hi) / 2;
          if (line.getPointAtLength(mid).y < cy) lo = mid;
          else hi = mid;
        }
        return (lo + hi) / 2;
      });

      frame();
    }

    function frame() {
      if (!LEN || !wrap || !line || !halo || !fig) return;
      const r = wrap.getBoundingClientRect();
      const vh = window.innerHeight;

      let prog = (vh * 0.72 - r.top) / (r.height + vh * 0.44);
      prog = Math.max(0, Math.min(1, prog));

      const at = LEN * prog;
      line.style.strokeDashoffset = reduce ? "0" : String(LEN - at);

      const pt = line.getPointAtLength(at);
      const ahead = line.getPointAtLength(Math.min(LEN, at + 14));
      const behind = line.getPointAtLength(Math.max(0, at - 14));
      const ang =
        (Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180) / Math.PI;
      // she leans into the curve, but never tips over
      const lean = Math.max(-14, Math.min(14, (ang - 90) * 0.55));
      const bob = Math.sin(prog * Math.PI * 14) * (small ? 3 : 5);
      const scale = (small ? 62 : 92) / 1000;

      halo.setAttribute("cx", String(pt.x));
      halo.setAttribute("cy", String(pt.y + bob));
      halo.setAttribute("r", String(small ? 22 : 34));
      fig.setAttribute(
        "transform",
        `translate(${pt.x},${pt.y + bob}) rotate(${lean}) scale(${scale}) translate(-500,-500)`,
      );

      beatRefs.current.forEach((b, i) => {
        if (!b) return;
        // `data-in` is the same hook the CSS reveals use everywhere else, so a
        // beat lighting up releases its label, heading, and body together.
        if (at >= anchors[i] - (small ? 40 : 70)) b.setAttribute("data-in", "");
        else b.removeAttribute("data-in");
      });
    }

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(() => {
        frame();
        ticking = false;
      });
    }

    let resizeTimer: ReturnType<typeof setTimeout>;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 140);
    }

    build();
    // fonts change line heights, which changes where the beats sit
    document.fonts?.ready.then(build).catch(() => {});
    const settle = setTimeout(build, 400);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      clearTimeout(settle);
    };
  }, [beats.length]);

  return (
    <div ref={wrapRef} className="relative py-20 sm:py-28 lg:py-36">
      <svg
        ref={svgRef}
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
      >
        <path
          ref={trackRef}
          fill="none"
          stroke="currentColor"
          className="text-forest/10"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        <path
          ref={lineRef}
          fill="none"
          stroke="currentColor"
          className="text-gold"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
        <circle ref={haloRef} className="fill-gold opacity-15" r={34} />
        <g ref={figRef} className="text-gold-deep">
          <path
            d={DANCER_PATH}
            fill="none"
            stroke="currentColor"
            strokeWidth={15}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>

      <div className="relative z-10 mx-auto flex max-w-[1180px] flex-col gap-24 px-5 sm:gap-32 sm:px-8 lg:gap-44 lg:px-14">
        {beats.map((beat, i) => (
          <div
            key={i}
            ref={(el) => {
              beatRefs.current[i] = el;
            }}
            className={[
              "walk-beat w-full sm:w-[min(30rem,72%)]",
              i % 2 === 1 ? "sm:ml-auto sm:text-right" : "",
            ].join(" ")}
          >
            <p
              data-rv-label=""
              className={`label ${i % 2 === 1 ? "sm:flex-row-reverse" : ""}`}
            >
              {beat.label}
            </p>

            <h2 className="font-display mt-3 mb-3 text-[length:var(--text-step-2)]">
              {beat.lines.map((line, j) => (
                <span key={j} className="rv-line">
                  <span style={{ ["--rv-d" as string]: `${j * 0.11}s` }}>
                    {line}
                  </span>
                </span>
              ))}
            </h2>

            <p
              data-rv-words=""
              className={[
                "max-w-[60ch] text-[length:var(--text-step--1)] leading-[1.7] text-ink-soft",
                i % 2 === 1 ? "sm:ml-auto" : "",
              ].join(" ")}
            >
              {beat.body.split(/\s+/).map((w, k, arr) => (
                // Space goes between the spans, never inside one — an
                // inline-block swallows its own trailing whitespace.
                <Fragment key={k}>
                  <span
                    className="w"
                    style={{ ["--wd" as string]: `${0.2 + k * 0.016}s` }}
                  >
                    {w}
                  </span>
                  {k < arr.length - 1 ? " " : null}
                </Fragment>
              ))}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
