"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV } from "@/lib/site";
import { Wordmark } from "./Marks";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false); // mobile sheet
  const [menu, setMenu] = useState<string | null>(null); // desktop dropdown
  const [onDark, setOnDark] = useState(false);
  const [lifted, setLifted] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close everything on route change. Adjusting state during render (rather
  // than in an effect) is React's documented pattern for reacting to a changed
  // prop — it avoids the extra render pass an effect would cost.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
    setMenu(null);
  }

  // Lock the page when the mobile sheet is open
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setMenu(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /**
   * Invert the bar when it is sitting over a dark band. Sections opt in with
   * data-nav="dark", so this keeps working as pages get rearranged.
   */
  useEffect(() => {
    let ticking = false;
    const check = () => {
      const y = 34; // roughly the vertical centre of the bar
      const darks = document.querySelectorAll<HTMLElement>('[data-nav="dark"]');
      let hit = false;
      darks.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= y && r.bottom >= y) hit = true;
      });
      setOnDark(hit);
      setLifted(window.scrollY > 12);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const openMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenu(label);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenu(null), 160);
  };

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-[100] transition-colors duration-500",
        onDark ? "text-cream on-dark" : "text-ink",
        lifted && !onDark ? "bg-cream/85 backdrop-blur-md" : "",
        lifted && onDark ? "bg-forest/80 backdrop-blur-md" : "",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 px-5 py-3 sm:px-8 lg:px-14">
        <Link
          href="/"
          className="shrink-0 py-2"
          aria-label="Rai Arts — home"
          onClick={() => setOpen(false)}
        >
          <Wordmark className="h-auto w-[104px] sm:w-[128px]" />
        </Link>

        {/* ── desktop ── */}
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && openMenu(item.label)}
                onMouseLeave={() => item.children && scheduleClose()}
              >
                <span className="flex items-center">
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={[
                      "relative px-3 py-3 text-[0.9rem] transition-opacity",
                      isActive(item.href) ? "opacity-100" : "opacity-70 hover:opacity-100",
                    ].join(" ")}
                  >
                    {item.label}
                    <span
                      className={[
                        "absolute inset-x-3 bottom-1.5 block h-px origin-left bg-gold transition-transform duration-500 ease-[cubic-bezier(.16,.84,.28,1)]",
                        isActive(item.href) ? "scale-x-100" : "scale-x-0",
                      ].join(" ")}
                    />
                  </Link>
                  {item.children && (
                    <button
                      type="button"
                      aria-expanded={menu === item.label}
                      aria-haspopup="true"
                      aria-label={`${item.label} submenu`}
                      onClick={() =>
                        setMenu(menu === item.label ? null : item.label)
                      }
                      className="-ml-2 p-2 opacity-60 transition-opacity hover:opacity-100"
                    >
                      <svg width="9" height="6" viewBox="0 0 9 6" fill="none" aria-hidden="true">
                        <path
                          d="M1 1L4.5 4.5L8 1"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                          className={`origin-center transition-transform duration-300 ${menu === item.label ? "rotate-180" : ""}`}
                        />
                      </svg>
                    </button>
                  )}
                </span>

                {item.children && (
                  <div
                    className={[
                      "absolute left-0 top-full w-[19rem] origin-top-left pt-2 transition-[opacity,transform] duration-300 ease-[cubic-bezier(.16,.84,.28,1)]",
                      menu === item.label
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-1 opacity-0",
                    ].join(" ")}
                  >
                    <ul className="overflow-hidden rounded-sm border border-forest/12 bg-cream shadow-[0_24px_60px_-32px_rgba(30,45,25,.5)]">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            className="block border-b border-forest/8 px-5 py-4 text-ink transition-colors last:border-b-0 hover:bg-sand/60"
                          >
                            <span className="font-display-sm block text-[1.02rem]">
                              {c.label}
                            </span>
                            <span className="mt-0.5 block text-[0.78rem] leading-snug text-ink-soft">
                              {c.blurb}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* ── mobile trigger ── */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="-mr-2 grid h-11 w-11 place-items-center lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="relative block h-3.5 w-6">
            <span
              className={`absolute left-0 block h-px w-full bg-current transition-all duration-400 ease-[cubic-bezier(.16,.84,.28,1)] ${open ? "top-1.5 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 block h-px w-full bg-current transition-all duration-400 ease-[cubic-bezier(.16,.84,.28,1)] ${open ? "top-1.5 -rotate-45" : "top-3"}`}
            />
          </span>
        </button>
      </div>

      {/* ── mobile sheet ── */}
      <div
        id="mobile-menu"
        className={[
          "on-dark fixed inset-0 top-0 -z-10 bg-forest text-cream transition-[opacity,transform] duration-500 ease-[cubic-bezier(.16,.84,.28,1)] lg:hidden",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0",
        ].join(" ")}
      >
        <nav
          aria-label="Mobile"
          className="flex h-full flex-col justify-center gap-1 overflow-y-auto px-6 pt-24 pb-16"
        >
          {NAV.map((item, i) => (
            <div
              key={item.href}
              style={{ transitionDelay: open ? `${120 + i * 45}ms` : "0ms" }}
              className={`transition-[opacity,transform] duration-500 ease-[cubic-bezier(.16,.84,.28,1)] ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
            >
              <Link
                href={item.href}
                className="font-display block py-2.5 text-[length:var(--text-step-2)]"
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="mb-2 flex flex-col gap-1 border-l border-cream/20 pl-4">
                  {item.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="inline-flex min-h-[44px] items-center text-[0.95rem] text-cream/75"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
