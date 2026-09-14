"use client";

import { useEffect, useRef } from "react";
import { DANCER_PATH } from "@/lib/brand";

export type Service = {
  title: string;
  body: string;
};

/**
 * "What We Do": the numbered services stack down the left; a single gold
 * path runs down the column beside them and the dancer travels it as you
 * scroll. The copy is set in full from the start: the only things that move
 * are the line drawing in and the dancer travelling it.
 *
 * Everything is measured in real pixels (1 SVG unit === 1 CSS pixel) and
 * rebuilt on resize, so the dash pattern never distorts.
 */
export default function LineWalk({
  heading,
  items,
}: {
  /** Omit when the section supplies its own heading above the walk. */
  heading?: string;
  items: Service[];
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const laneRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const trackRef = useRef<SVGPathElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const haloRef = useRef<SVGCircleElement>(null);
  const figRef = useRef<SVGGElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const stopRefs = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const lane = laneRef.current;
    const svg = svgRef.current;
    const track = trackRef.current;
    const line = lineRef.current;
    const halo = haloRef.current;
    const fig = figRef.current;
    if (!wrap || !lane || !svg || !track || !line || !halo || !fig) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let LEN = 0;
    let anchors: number[] = [];
    let small = false;
    let raf = 0;

    function build() {
      if (!wrap || !lane || !svg || !track || !line) return;
      const rect = wrap.getBoundingClientRect();
      const W = rect.width;
      const H = wrap.offsetHeight;
      small = W < 1024;

      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      svg.setAttribute("width", String(W));
      svg.setAttribute("height", String(H));

      const wrapTop = rect.top + window.scrollY;

      // The path lives in the lane beside the copy: the right-hand column on
      // wide screens, the gutter the list leaves free on narrow ones.
      const laneRect = lane.getBoundingClientRect();
      const midX = laneRect.left - rect.left + laneRect.width / 2;
      const swing = Math.min(laneRect.width * 0.22, small ? 14 : 70);

      const pts: { x: number; y: number }[] = [{ x: midX, y: 0 }];
      itemRefs.current.forEach((b, i) => {
        if (!b) return;
        const br = b.getBoundingClientRect();
        const cy = br.top + window.scrollY - wrapTop + br.height / 2;
        // a gentle S so she still banks into something on the way down
        pts.push({ x: i % 2 === 0 ? midX - swing : midX + swing, y: cy });
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

      // binary-search where each item sits along the curve
      anchors = itemRefs.current.map((b) => {
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

      // Pin a station marker to the line where each item sits.
      anchors.forEach((at, i) => {
        const c = stopRefs.current[i];
        if (!c || !line) return;
        const pt = line.getPointAtLength(at);
        c.setAttribute("cx", String(pt.x));
        c.setAttribute("cy", String(pt.y));
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
      const scale = (small ? 62 : 110) / 1000;

      halo.setAttribute("cx", String(pt.x));
      halo.setAttribute("cy", String(pt.y + bob));
      halo.setAttribute("r", String(small ? 22 : 40));
      fig.setAttribute(
        "transform",
        `translate(${pt.x},${pt.y + bob}) rotate(${lean}) scale(${scale}) translate(-500,-500)`,
      );

      // The copy is always fully present; only the station marker on the line
      // swells as she reaches it.
      anchors.forEach((anchor, i) => {
        const reached = at >= anchor - (small ? 40 : 70);
        const c = stopRefs.current[i];
        if (c) {
          c.setAttribute("r", String(reached ? (small ? 6 : 8) : small ? 3 : 4));
          c.style.fillOpacity = reached ? "1" : "0.28";
        }
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
    // fonts change line heights, which changes where the items sit
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
  }, [items.length]);

  return (
    <div ref={wrapRef} className="relative">
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
        {items.map((_, i) => (
          <circle
            key={i}
            ref={(el) => {
              stopRefs.current[i] = el;
            }}
            className="fill-gold-deep"
            r={4}
          />
        ))}
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

      {/* Copy on the left, the lane she walks on the right. Below lg the lane
          collapses to a narrow gutter beside the list so the path still runs
          alongside the words on a phone. */}
      {heading && (
        <h2 className="font-statement relative z-[2] text-center text-[length:var(--text-step-3)]">
          {heading}
        </h2>
      )}

      <div className="relative z-[2] mt-14 grid grid-cols-[1fr_3.5rem] gap-x-4 sm:mt-16 sm:grid-cols-[1fr_5rem] lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.55fr)] lg:gap-x-16">
        <div className="min-w-0">
          <ol className="flex flex-col gap-16 sm:gap-20 lg:gap-24">
            {items.map((item, i) => (
              <li
                key={i}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
              >
                <div>
                  {/* The stop number, set large enough to be a graphic element */}
                  <span
                    aria-hidden="true"
                    className="font-statement block text-[length:var(--text-step-3)] leading-none text-gold-deep/30"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <h3 className="font-statement mt-4 mb-5 text-[length:var(--text-step-2)]">
                    {item.title}
                  </h3>

                  <p className="max-w-[46ch] text-[length:var(--text-step-0)] leading-[1.65] text-ink-soft">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* the lane: empty on purpose, the SVG draws into it */}
        <div ref={laneRef} aria-hidden="true" />
      </div>
    </div>
  );
}
