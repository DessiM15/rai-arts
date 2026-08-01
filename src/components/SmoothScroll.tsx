"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis drives the whole page. It is skipped entirely under reduced motion, and
 * on touch devices we leave native scrolling alone — momentum scrolling on iOS
 * fights interpolation and ends up feeling worse, not better.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let id = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);

    // in-page anchors should ride Lenis too
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute("href");
      if (!hash || hash === "#") return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -80 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  return null;
}
