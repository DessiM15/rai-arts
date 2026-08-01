import type Lenis from "lenis";

/**
 * Lenis owns the scroll position, so anything that wants to move the page has
 * to go through it — `window.scrollTo` alone gets overridden on the next frame.
 * SmoothScroll registers the instance here; everything else asks for it.
 *
 * On touch devices and under reduced motion Lenis never starts, so the
 * registry stays empty and we fall back to the native call.
 */
let lenis: Lenis | null = null;

export function registerLenis(instance: Lenis | null) {
  lenis = instance;
}

export function scrollToTop({ immediate = false } = {}) {
  if (lenis) {
    lenis.scrollTo(0, { immediate });
    return;
  }
  window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
}
