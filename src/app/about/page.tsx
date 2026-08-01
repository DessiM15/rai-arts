import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { PILLARS } from "@/lib/content";
import { Button, Container, Section } from "@/components/ui";
import { Label, Lines, Rise, Words } from "@/components/Reveal";
import { Quote, SectionHead, Stats } from "@/components/editorial";
import Marquee from "@/components/Marquee";
import Statement from "@/components/Statement";
import ArtPanel from "@/components/ArtPanel";

export const metadata: Metadata = {
  title: "About",
  description:
    "Rai Arts fills the gap between dance training and the business of a dance career, with a signature curriculum delivered as workshops for college and university dance programs.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <>
      {/* ── hero ── */}
      <Container className="pt-32 pb-14 sm:pt-40 sm:pb-20">
        <Label>About</Label>
        <Lines
          as="h1"
          className="font-statement mt-6 max-w-[16ch] text-[length:var(--text-step-5)]"
          lines={["From the studio", "to the front", "of the room."]}
        />
      </Container>

      {/* ── the case, as an asymmetric spread ── */}
      <Container className="grid gap-10 pb-20 sm:pb-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Rise className="lg:sticky lg:top-32 lg:self-start">
          <ArtPanel variant="rule" ratio="3/4" caption="For dancers, by a dancer" />
        </Rise>

        <div className="flex flex-col gap-6">
          <Words
            className="text-[length:var(--text-step-1)] leading-snug"
            text="Rai Arts equips aspiring dancers with the essential business knowledge and skills needed to navigate a successful and sustainable career in dance."
          />
          <p className="max-w-[60ch] leading-relaxed text-ink-soft">
            Dance programs train exceptional performers, but most graduates
            leave without a roadmap for the business side of a dance career.
            Rai Arts fills that gap. Its signature curriculum, the Rai Arts
            Career Readiness Framework™, prepares dancers across five pillars,
            from mapping a first year post-grad to understanding contracts,
            budgeting freelance income, building professional relationships,
            and sustaining a long career in the arts.
          </p>
          <p className="max-w-[60ch] leading-relaxed text-ink-soft">
            Schools can bring Rai Arts in for a single workshop, a themed
            series, or the full framework as a capstone program. This
            isn&apos;t about leaving dance. Dancers keep performing. Rai Arts
            prepares them for the whole profession, not an exit from it.
          </p>

          <Rise className="mt-6 border-t border-forest/12 pt-10">
            <Stats
              items={[
                ["5", "Pillars of readiness"],
                ["60–90", "Minutes per session"],
                ["10–30+", "Students per workshop"],
              ]}
            />
          </Rise>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/framework">Explore the framework</Button>
            <Button href="/founders" variant="ghost">
              Meet the founder
            </Button>
          </div>
        </div>
      </Container>

      <Marquee items={["For dancers, by a dancer", "Your Art. Your Business."]} />

      <Statement
        kicker="The gap"
        lines={["Trained for the stage.", "Sent out into", "a profession."]}
        footnote="Nobody hands a graduating dancer a contract explainer, a tax guide, or a map of the roles that exist. That is the gap Rai Arts was built to close."
      />

      {/* ── the five questions ── */}
      <Section dark className="py-20 sm:py-28 lg:py-32">
        <Container>
          <SectionHead
            index="01"
            label="What we teach"
            dark
            lines={["Five questions every", "dancer should be able", "to answer."]}
          />
          <ul className="mt-14 flex flex-col">
            {PILLARS.map((p, i) => (
              <li key={p.n}>
                <Rise
                  delay={i * 0.05}
                  className="grid gap-3 border-t border-cream/15 py-8 sm:grid-cols-[4.5rem_18rem_1fr] sm:items-baseline sm:gap-8"
                >
                  <span className="font-statement text-[length:var(--text-step-2)] leading-none text-gold/70">
                    {p.n}
                  </span>
                  <h3 className="font-statement text-[length:var(--text-step-1)]">
                    {p.title}
                  </h3>
                  <p className="max-w-[46ch] text-[1rem] italic text-cream/70">
                    {p.question}
                  </p>
                </Rise>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ── quote ── */}
      <Container className="py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <Rise>
            <Quote attribution={SITE.founder} role="Founder">
              The point was never to talk anyone out of dancing. It was to make
              staying possible.
            </Quote>
          </Rise>
          <Rise delay={0.1}>
            <ArtPanel variant="sun" ratio="1/1" />
          </Rise>
        </div>
      </Container>

      {/* ── cta ── */}
      <Section dark className="bg-forest-deep py-24 sm:py-32">
        <Container className="flex flex-col items-center text-center">
          <SectionHead
            label="Bring it in"
            align="center"
            dark
            lines={["Bring Rai Arts", "to your program."]}
            body="Tell us your department, class year, and timeframe, and we'll come back with a session that fits."
          >
            <Button href="/contact" variant="gold">
              Request a workshop
            </Button>
            <Button href={`mailto:${SITE.email}`} variant="ghost-light" external>
              {SITE.email}
            </Button>
          </SectionHead>
        </Container>
      </Section>
    </>
  );
}
