import type { Workshop } from "@/lib/content";
import { SITE } from "@/lib/site";
import { Dancer } from "./Marks";
import { Button } from "./ui";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

/**
 * The workshop set as a theatre programme.
 *
 * A playbill is native to both New York and to dance, which makes it an honest
 * device rather than decoration: it frames a workshop as an event with a
 * running time and a running order, and it scales straight into the conference
 * programme Rai Arts is growing towards.
 */
export default function Playbill({ workshop }: { workshop: Workshop }) {
  return (
    <div className="playbill grain relative overflow-hidden rounded-sm bg-cream text-forest shadow-[0_40px_90px_-60px_rgba(22,33,15,0.7)] ring-1 ring-forest/15">
      {/* deckle edge */}
      <div aria-hidden="true" className="h-2 w-full bg-gold" />

      <div className="relative z-[2] px-6 py-10 sm:px-12 sm:py-14 lg:px-20">
        {/* ── titles ── */}
        <div className="text-center">
          <p className="font-mono text-[0.6rem] tracking-[0.34em] uppercase opacity-85">
            {SITE.name}
          </p>
          <p className="font-display-sm mt-4 text-[0.95rem] italic opacity-85">
            presents
          </p>

          <h2 className="font-statement mt-4 text-[length:var(--text-step-4)] uppercase">
            {workshop.title}
          </h2>
          <p className="font-display-sm mx-auto mt-3 max-w-[30ch] text-[length:var(--text-step-1)] italic opacity-85">
            {workshop.subtitle}
          </p>

          <Dancer
            className="mx-auto mt-8 h-24 w-auto text-gold-deep sm:h-28"
            strokeWidth={9}
          />
        </div>

        {/* ── the specs, set like a programme's front matter ── */}
        <dl className="playbill-rule mx-auto mt-10 grid max-w-3xl gap-x-10 gap-y-5 pt-8 sm:grid-cols-3">
          {[
            ["Running time", workshop.length],
            ["House", workshop.format.replace("Guest lecture or class visit, ", "")],
            ["For", workshop.audience],
          ].map(([k, v]) => (
            <div key={k} className="text-center sm:text-left">
              <dt className="font-mono text-[0.58rem] tracking-[0.2em] uppercase opacity-75">
                {k}
              </dt>
              <dd className="mt-1.5 text-[0.9rem]">{v}</dd>
            </div>
          ))}
        </dl>

        {/* ── the running order ── */}
        <div className="playbill-rule mx-auto mt-10 max-w-3xl pt-8">
          <p className="text-center font-mono text-[0.58rem] tracking-[0.28em] uppercase opacity-75">
            The programme
          </p>

          <ol className="mt-8 flex flex-col">
            {workshop.agenda.map((step, i) => (
              <li
                key={i}
                className="flex gap-5 border-b border-forest/12 py-5 last:border-b-0 sm:gap-8"
              >
                <span className="font-display-sm w-10 shrink-0 text-[1.05rem] tabular-nums opacity-70 sm:w-14">
                  {ROMAN[i] ?? i + 1}.
                </span>
                <span className="text-[0.98rem] leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* ── what students leave with ── */}
        <div className="playbill-rule mx-auto mt-10 max-w-3xl pt-8">
          <p className="text-center font-mono text-[0.58rem] tracking-[0.28em] uppercase opacity-75">
            On leaving, the house can
          </p>
          <ul className="mt-7 flex flex-col gap-3.5">
            {workshop.outcomes.map((o, i) => (
              <li key={i} className="flex gap-3.5 text-[0.95rem] leading-relaxed">
                <span
                  aria-hidden="true"
                  className="mt-[0.62em] h-[0.36em] w-[0.36em] flex-none rounded-full bg-gold-deep"
                />
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Button href="/contact">Book this session</Button>
          <Button href="/framework" variant="ghost">
            See all five pillars
          </Button>
        </div>

        <p className="mt-10 text-center font-mono text-[0.56rem] tracking-[0.26em] uppercase opacity-60">
          {SITE.tagline}
        </p>
      </div>
    </div>
  );
}
