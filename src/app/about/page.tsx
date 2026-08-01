import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { PILLARS } from "@/lib/content";
import { Button, Container, Section } from "@/components/ui";
import { Label, Lines, Rise, Words } from "@/components/Reveal";
import { Dancer } from "@/components/Marks";

export const metadata: Metadata = {
  title: "About",
  description:
    "Rai Arts fills the gap between dance training and the business of a dance career, with a signature curriculum delivered as workshops for college and university dance programs.",
  alternates: { canonical: "/about" },
};

const STATS = [
  ["5", "Pillars of readiness"],
  ["60–90", "Minutes per session"],
  ["10–30+", "Students per workshop"],
];

export default function About() {
  return (
    <>
      <Container className="pt-32 pb-6 sm:pt-40 sm:pb-10">
        <Label>About</Label>
        <Lines
          as="h1"
          className="font-display mt-5 text-[length:var(--text-step-3)]"
          lines={["From the studio", "to the front of the room."]}
        />
      </Container>

      <Container className="grid gap-10 pb-20 sm:pb-28 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Rise>
          <div className="relative grid aspect-square place-items-center overflow-hidden rounded-sm bg-forest">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.14]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(115deg, #efb93b 0 1px, transparent 1px 26px)",
              }}
            />
            <Dancer className="relative w-[64%] text-cream/85" strokeWidth={7} />
          </div>
        </Rise>

        <div className="flex flex-col gap-6">
          <Words
            className="text-[1.02rem] leading-relaxed text-ink-soft"
            text="Rai Arts equips aspiring dancers with the essential business knowledge and skills needed to navigate a successful and sustainable career in dance. Dance programs train exceptional performers, but most graduates leave without a roadmap for the business side of a dance career."
          />
          <p className="max-w-[62ch] leading-relaxed text-ink-soft">
            Rai Arts fills that gap. Its signature curriculum, the Rai Arts
            Career Readiness Framework™, prepares dancers across five pillars,
            from mapping a first year post-grad to understanding contracts,
            budgeting freelance income, building professional relationships, and
            sustaining a long career in the arts. Schools can bring Rai Arts in
            for a single workshop, a themed series, or the full framework as a
            capstone program.
          </p>
          <p className="max-w-[62ch] leading-relaxed text-ink-soft">
            This isn&apos;t about leaving dance. Dancers keep performing. Rai
            Arts prepares them for the whole profession, not an exit from it.
          </p>

          <dl className="mt-4 grid gap-6 border-t border-forest/12 pt-8 sm:grid-cols-3">
            {STATS.map(([n, l]) => (
              <div key={l}>
                <dt className="font-display text-[length:var(--text-step-2)] text-forest">
                  {n}
                </dt>
                <dd className="mt-1 text-[0.82rem] text-ink-soft">{l}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-4 flex flex-wrap gap-3">
            <Button href="/framework">Explore the framework</Button>
            <Button href="/founders" variant="ghost">
              Meet the founder
            </Button>
          </div>
        </div>
      </Container>

      <Section dark className="py-20 sm:py-28">
        <Container>
          <div className="max-w-2xl">
            <Label>What we teach</Label>
            <Lines
              as="h2"
              className="font-display mt-5 text-[length:var(--text-step-2)]"
              lines={["Five questions every", "dancer should be able", "to answer."]}
            />
          </div>
          <ul className="mt-12 flex flex-col">
            {PILLARS.map((p, i) => (
              <li key={p.n}>
                <Rise
                  delay={i * 0.05}
                  className="flex flex-col gap-2 border-t border-cream/15 py-7 sm:flex-row sm:items-baseline sm:gap-10"
                >
                  <span className="font-mono text-[0.68rem] text-gold sm:w-12">
                    {p.n}
                  </span>
                  <h3 className="font-display-sm text-[1.2rem] sm:w-64">
                    {p.title}
                  </h3>
                  <p className="max-w-[46ch] text-[0.92rem] italic text-cream/70">
                    {p.question}
                  </p>
                </Rise>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section dark className="bg-forest-deep py-20 text-center sm:py-24">
        <Container className="flex flex-col items-center">
          <Lines
            as="h2"
            className="font-display text-[length:var(--text-step-2)]"
            lines={["Bring Rai Arts to your program."]}
          />
          <p className="mt-5 max-w-[46ch] text-cream/70">
            Tell us your department, class year, and timeframe, and we&apos;ll come
            back with a session that fits.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="gold">
              Request a workshop
            </Button>
            <Button href={`mailto:${SITE.email}`} variant="ghost-light" external>
              {SITE.email}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
