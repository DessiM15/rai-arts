"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Lenis from "lenis";
import { registerLenis, scrollToTop } from "@/lib/scroll";

/**
 * Lenis drives the whole page. It is skipped entirely under reduced motion, and
 * on touch devices we leave native scrolling alone — momentum scrolling on iOS
 * fights interpolation and ends up feeling worse, not better.
 */
export default function SmoothScroll() {
  const pathname = usePathname();
  const router = useRouter();

  /**
   * A refresh returns to the home page hero, from wherever you were.
   *
   * This checks for a genuine reload rather than simply "not a client-side
   * navigation". The Navigation Timing API reports "reload" only when the
   * visitor actually refreshed; arriving from a search result, a shared link
   * or a bookmark reports "navigate", and the back button reports
   * "back_forward". Those all stay where they point, so deep links keep
   * working — only a refresh goes home.
   *
   * Runs once per full page load: this component lives in the root layout, so
   * client-side navigation never remounts it and can never trigger a bounce.
   */
  useEffect(() => {
    if (window.location.pathname === "/") return;
    const nav = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    if (nav?.type !== "reload") return;
    router.replace("/");
  }, [router]);

  /**
   * Start every page at the top.
   *
   * Browsers restore the previous scroll position on reload, which lands you
   * mid-page with the scroll-linked hero already half open and the walk
   * partway through. Turning restoration off makes a refresh behave like a
   * fresh arrival, and the same reset runs on every route change so navigating
   * never drops you into the middle of a page.
   */
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    scrollToTop({ immediate: true });
  }, [pathname]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;


    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    registerLenis(lenis);

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
      registerLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
