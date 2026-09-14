import type { Metadata } from "next";
import { LITERACY } from "@/lib/content";
import { Button, Container, PageHero, Section } from "@/components/ui";
import { Label, Lines, Rise } from "@/components/Reveal";
import WaitlistForm from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: "The Literacy Series",
  description:
    "Accessible, low-cost online workshops from Rai Arts that teach dancers the knowledge and skills to navigate their careers beyond the studio: money, contracts, self-advocacy, relationships, and the business behind the work.",
  alternates: { canonical: "/services/literacy-series" },
};

export default function LiteracySeries() {
  return (
    <>
      {/* ── hero ── */}
      <PageHero
        label="Services · Literacy Series"
        lines={["The Literacy", "Series."]}
        intro={LITERACY.intro}
        introClassName="max-w-[58ch]"
      />

      {/* ── what it means, as a reveal list ── */}
      <Container className="pb-20 sm:pb-28">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            {LITERACY.paragraphs.map((p, i) => (
              <Rise key={i} delay={i * 0.08}>
                <p className="mt-6 max-w-[46ch] text-[length:var(--text-step-0)] leading-[1.7] text-ink-soft first:mt-0">
                  {p}
                </p>
              </Rise>
            ))}
            <Rise delay={0.2} className="mt-10">
              <p className="font-display text-[length:var(--text-step-2)] leading-[1.1] text-forest">
                It means…
              </p>
            </Rise>
          </div>

          <ol className="flex flex-col">
            {LITERACY.skills.map((s, i) => (
              <Rise key={i} delay={i * 0.07} y={16}>
                <li className="flex items-baseline gap-6 border-t border-forest/12 py-6 sm:gap-9">
                  <span className="font-statement text-[length:var(--text-step-1)] leading-none text-gold-deep/50 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display-sm text-[length:var(--text-step-1)] leading-snug text-forest">
                    {s}
                  </span>
                </li>
              </Rise>
            ))}
            <li className="border-t border-forest/12" aria-hidden="true" />
          </ol>
        </div>
      </Container>

      {/* ── the goal ── */}
      <Section dark className="py-20 sm:py-28">
        <Container className="flex flex-col items-center text-center">
          <Label className="mb-7">The goal</Label>
          <Lines
            as="h2"
            className="font-statement max-w-[18ch] text-[length:var(--text-step-3)]"
            lines={LITERACY.close}
            stagger={0.12}
          />
        </Container>
      </Section>

      {/* ── waitlist ── */}
      <Container className="py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:items-center">
          <div>
            <Label>Workshops</Label>
            <Lines
              as="h2"
              className="font-statement mt-6 text-[length:var(--text-step-3)]"
              lines={["Built to work", "on your own time."]}
            />
            <p className="mt-6 max-w-[46ch] text-[length:var(--text-step-0)] text-ink-soft">
              Each workshop takes one area of the framework and makes it
              practical: online, low-cost, and yours to keep.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/framework" variant="ghost">
                See the five pillars
              </Button>
            </div>
          </div>

          <Rise delay={0.1}>
            <div className="grain relative isolate rounded-sm bg-sand/70 p-8 sm:p-10">
              <h3 className="font-statement text-[length:var(--text-step-2)]">
                Hear it first.
              </h3>
              <p className="mt-4 max-w-[38ch] text-ink-soft">
                One email when the next workshops open. Nothing else, ever.
              </p>
              <WaitlistForm />
            </div>
          </Rise>
        </div>
      </Container>
    </>
  );
}
