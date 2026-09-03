import type { Pillar } from "@/lib/content";
import { Section } from "./ui";

/**
 * The five guiding questions as a single narrow band. It replaces the full
 * "What we teach" section on the About page: the questions are the point,
 * so they get a row, not a room.
 *
 * On a phone the row scrolls sideways rather than stacking, which keeps the
 * strip a strip.
 */
export default function QuestionStrip({ pillars }: { pillars: Pillar[] }) {
  return (
    <Section dark className="py-10 sm:py-12">
      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8 lg:px-14">
        <p className="label mb-6">Five questions every dancer should be able to answer</p>
        <ol className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible">
          {pillars.map((p) => (
            <li
              key={p.n}
              className="flex min-w-[15rem] shrink-0 flex-col gap-2 border-l border-cream/20 pl-4 lg:min-w-0"
            >
              <span className="flex items-baseline gap-2">
                <span className="font-mono text-[0.6rem] text-gold tabular-nums">{p.n}</span>
                <span className="font-mono text-[0.58rem] tracking-[0.16em] text-cream/55 uppercase">
                  {p.title}
                </span>
              </span>
              <span className="font-display-sm text-[0.98rem] leading-snug text-cream italic">
                {p.question}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
