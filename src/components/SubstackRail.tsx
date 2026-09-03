import { Rise } from "./Reveal";

type Article = {
  n: string;
  title: string;
  excerpt: string;
  date: string;
  href: string;
};

/**
 * The essays as a row of dark cards that scrolls sideways, bleeding off the
 * right edge so it's clear there is more. Each card: a numeral, the title,
 * the opening lines, and the date pinned to the foot.
 */
export default function SubstackRail({ articles }: { articles: Article[] }) {
  return (
    // Breaks out of the container to the viewport edge, so the last card is
    // cut by the screen rather than by an invisible column boundary. The left
    // padding re-aligns the first card with the container's content edge.
    <div className="relative left-1/2 w-screen -translate-x-1/2">
      <ul
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pr-5 pb-4 pl-5 sm:gap-5 sm:pr-8 sm:pl-8 lg:pr-14 lg:pl-[max(3.5rem,calc((100vw-1180px)/2+3.5rem))]"
        style={{ scrollbarWidth: "thin" }}
      >
        {articles.map((a, i) => (
          <li
            key={a.href}
            className="w-[min(82vw,26rem)] shrink-0 snap-start sm:w-[24rem] lg:w-[26rem]"
          >
            <Rise delay={i * 0.08} className="h-full">
              <a
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grain on-dark relative isolate flex h-full min-h-[24rem] flex-col justify-between gap-10 rounded-sm bg-forest-deep p-7 text-cream transition-colors duration-500 hover:bg-forest sm:p-8"
              >
                <span className="relative z-[2]">
                  <span className="font-mono text-[0.58rem] tracking-[0.22em] text-cream/50 uppercase">
                    Essay
                  </span>
                  <span className="font-statement mt-6 block text-[length:var(--text-step-3)] leading-none text-cream/45 transition-colors duration-500 group-hover:text-gold">
                    {a.n}
                  </span>
                  <span className="font-display-sm mt-4 block text-[length:var(--text-step-1)] leading-[1.15] text-cream">
                    {a.title}
                  </span>
                  <span className="mt-4 block max-w-[38ch] text-[0.95rem] leading-relaxed text-cream/70">
                    {a.excerpt}
                  </span>
                </span>
                <span className="relative z-[2] flex items-center justify-between font-mono text-[0.6rem] tracking-[0.18em] uppercase">
                  <span className="text-cream/55">{a.date}</span>
                  <span className="inline-flex items-center gap-2 text-gold">
                    Read
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-500 group-hover:translate-x-1.5"
                    >
                      ↗
                    </span>
                  </span>
                </span>
              </a>
            </Rise>
          </li>
        ))}
      </ul>
    </div>
  );
}
