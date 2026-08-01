"use client";

import { useEffect, useRef } from "react";
import { DANCER_PATH, DANCER_VIEWBOX } from "@/lib/brand";

/**
 * The hero mark, drawn across the full viewport rather than boxed into a card.
 *
 * She sits behind the headline at ~90vh, offset to the right so the copy reads
 * over open cream, and draws herself once on load. This is the site's single
 * strongest asset used at its real scale — the previous version shrank it into
 * a panel, where it read as a logo in a box rather than as artwork.
 */
export default function HeroDancer() {
  const ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = ref.current;
    if (!path) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    // WAAPI rather than a CSS transition: setting the start and end values in
    // the same frame makes a transition a no-op.
    const anim = path.animate(
      [{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
      {
        duration: 3000,
        delay: 200,
        easing: "cubic-bezier(.36,.15,.2,1)",
        fill: "forwards",
      },
    );
    return () => anim.cancel();
  }, []);

  // The wrapper pads past the fixed header so her raised arm never sits behind
  // the nav, and the reduced height keeps her inside the section's overflow.
  return (
    <div
      className="pointer-events-none absolute inset-0 right-[-14%] z-0 flex items-center pt-[5.5rem] sm:right-[-6%] lg:right-[2%]"
      aria-hidden="true"
    >
      <svg
        viewBox={DANCER_VIEWBOX}
        fill="none"
        className="ml-auto h-[62vh] max-h-[760px] w-auto opacity-[0.16] sm:opacity-[0.22] lg:h-[72vh] lg:opacity-100"
      >
        {/* soft halo so she reads against the cream without a hard edge */}
        <path
          d={DANCER_PATH}
          stroke="currentColor"
          strokeWidth={16}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gold/25 blur-[6px]"
        />
        <path
          ref={ref}
          d={DANCER_PATH}
          stroke="currentColor"
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gold-deep/70"
        />
      </svg>
    </div>
  );
}
