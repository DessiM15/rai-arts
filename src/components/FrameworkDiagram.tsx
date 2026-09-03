import type { Pillar } from "@/lib/content";

/**
 * The framework graphic, redrawn in the site's own type and colour so it
 * stays crisp at any size and can be edited as text.
 *
 * Five numbered rings on a dotted line, each with its pillar and guiding
 * question beneath. On a phone the line turns vertical and the pillars stack
 * down the left edge.
 */
export default function FrameworkDiagram({ pillars }: { pillars: Pillar[] }) {
  return (
    <figure
      aria-label="The Rai Arts Career Readiness Framework: five pillars"
      className="grain relative isolate overflow-hidden rounded-sm border border-forest/12 bg-white/55 px-6 py-12 sm:px-10 sm:py-16"
    >
      <div className="relative z-[2] text-center">
        <p className="font-mono text-[0.66rem] font-medium tracking-[0.3em] text-gold-deep uppercase">
          The Rai Arts
        </p>
        <p className="font-display mt-3 text-[length:var(--text-step-2)] font-semibold text-forest">
          Career Readiness Framework™
        </p>
      </div>

      <ol className="relative z-[2] mx-auto mt-12 flex max-w-[64rem] flex-col gap-8 sm:mt-14 sm:grid sm:grid-cols-5 sm:gap-4">
        {pillars.map((p, i) => (
          <li
            key={p.n}
            className="relative flex items-start gap-5 sm:flex-col sm:items-center sm:gap-0 sm:text-center"
          >
            {/* the line: vertical on phones, horizontal from sm up */}
            {i < pillars.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute top-14 left-7 h-[calc(100%+2rem)] w-px border-l border-dashed border-gold/70 sm:top-7 sm:left-[calc(50%+2rem)] sm:h-px sm:w-[calc(100%-4rem)] sm:border-t sm:border-l-0"
              />
            )}

            <span className="font-display grid h-14 w-14 shrink-0 place-items-center rounded-full border-[2.5px] border-gold bg-cream text-[1.35rem] font-semibold text-forest">
              {i + 1}
            </span>

            <span className="flex flex-col gap-2 pt-1 sm:mt-5 sm:pt-0">
              <span className="font-display-sm text-[1.15rem] leading-[1.15] font-semibold text-forest">
                {p.title}
              </span>
              <span className="font-display-sm max-w-[20ch] text-[0.95rem] leading-snug text-[#a4553a] italic sm:mx-auto sm:max-w-[16ch]">
                {p.question}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
