import Link from "next/link";
import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { FLAGSHIP, PILLARS } from "@/lib/content";
import { Button, Container, Section } from "@/components/ui";
import { Label, Lines, Rise, Words } from "@/components/Reveal";
import { Quote, SectionHead } from "@/components/editorial";
import DancerStage from "@/components/DancerStage";
import LineWalk, { type Beat } from "@/components/LineWalk";
import Marquee from "@/components/Marquee";
import Statement from "@/components/Statement";
import ArtPanel from "@/components/ArtPanel";

export const metadata: Metadata = {
  title: "Career readiness for dancers",
  description: SITE.description,
  alternates: { canonical: "/" },
};

const BEATS: Beat[] = [
  {
    label: "The problem",
    lines: ["A career can hold", "more than one thing."],
    body: "Dance programs train exceptional performers. Most graduates still leave without a roadmap for the business side of the work: how to find it, price it, contract it, or sustain it.",
    art: { variant: "grid" },
  },
  {
    label: "The approach",
    lines: ["Keep dancing.", "Build the structure", "around it."],
    body: "This isn't about leaving dance. Rai Arts prepares dancers for the whole profession, not an exit from it. The performing keeps going, with something solid underneath it.",
    art: { variant: "figure" },
  },
  {
    label: "The curriculum",
    lines: ["Five pillars,", "one framework."],
    body: "The Rai Arts Career Readiness Framework™ covers everything from mapping a first year post-grad to reading a contract, budgeting freelance income, and lasting long enough to build a legacy.",
    art: { variant: "rule" },
  },
  {
    label: "The delivery",
    lines: ["Brought into", "your program."],
    body: "Book a single workshop, a themed series, or the full framework as a semester-long capstone. Sessions run as guest lectures or class visits for groups of ten to thirty and up.",
    // The one stop we have a real photograph for — and it is the one about
    // her actually being in the room.
    art: {
      src: "/images/kira-speaking.jpg",
      alt: `${SITE.founder} presenting a Rai Arts session`,
      caption: "In the room",
    },
  },
];

export default function Home() {
  return (
    <>
      {/* ── hero: split screen, the mark bleeding off the right edge ── */}
      {/* The panel bleeds off the right and bottom, but starts below the header:
          the nav spans both halves, so a panel running under it would put dark
          links on a dark ground with no single colour that works for both. */}
      <section className="grid items-stretch pt-[4.75rem] sm:pt-[5.25rem] lg:min-h-[92svh] lg:grid-cols-2">
        <div
          className="flex flex-col items-start justify-center gap-7 px-5 pt-10 pb-16 sm:px-8 sm:pt-14 lg:py-20 lg:pr-12"
          // Aligns the copy with the site's container gutter at every width,
          // even though this section itself runs edge to edge.
          style={{
            paddingLeft: "max(1.25rem, calc((100vw - 1180px) / 2 + 3.5rem))",
          }}
        >
          <Label>Career readiness for dancers</Label>
          <Lines
            as="h1"
            className="font-statement text-[length:var(--text-step-3)]"
            lines={["Preparing dancers", "for the business", "of a dance career."]}
            delay={0.1}
          />
          <Words
            className="max-w-[42ch] text-[length:var(--text-step-0)] text-ink-soft"
            text={SITE.description}
            delay={0.55}
          />
          <Rise delay={0.75} className="flex flex-wrap gap-3">
            <Button href="/framework">Explore the framework</Button>
            <Button href="/contact" variant="ghost">
              Book a workshop
            </Button>
          </Rise>
        </div>

        <DancerStage bleed />
      </section>

      <Marquee
        items={[
          "Career Foundations",
          "Business Readiness",
          "Financial Readiness",
          "Professional Readiness",
          "Longevity Readiness",
        ]}
      />

      {/* ── the walk ── */}
      <LineWalk beats={BEATS} />

      {/* ── the promise, set as artwork ── */}
      <Statement
        kicker="The promise"
        lines={["Your Art.", "Your Business."]}
        footnote="Two things most dancers are told to choose between. The whole point of Rai Arts is that you should not have to."
      />

      {/* ── framework ── */}
      <Section dark className="py-20 sm:py-28 lg:py-32">
        <Container>
          <SectionHead
            index="01"
            label="The framework"
            dark
            lines={["The Rai Arts Career", "Readiness Framework™"]}
            body="Our signature curriculum covers everything a dancer needs to enter and navigate the profession with confidence, built on five pillars of readiness."
          />

          <ul className="mt-14 flex flex-col">
            {PILLARS.map((p, i) => (
              <li key={p.n}>
                <Rise delay={i * 0.05}>
                  <Link
                    href="/framework"
                    className="group grid items-baseline gap-3 border-t border-cream/15 py-7 transition-colors hover:bg-cream/[0.04] sm:grid-cols-[4.5rem_1fr_auto] sm:gap-8"
                  >
                    <span className="font-statement text-[length:var(--text-step-2)] leading-none text-gold/70">
                      {p.n}
                    </span>
                    <div>
                      <h3 className="font-statement text-[length:var(--text-step-2)]">
                        {p.title}
                      </h3>
                      <p className="mt-2 max-w-[48ch] text-[0.95rem] text-cream/65">
                        {p.body}
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="hidden font-mono text-[0.62rem] tracking-[0.16em] text-gold uppercase transition-transform duration-500 group-hover:translate-x-1 sm:block"
                    >
                      →
                    </span>
                  </Link>
                </Rise>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ── flagship as an editorial spread ── */}
      <Container className="py-20 sm:py-28 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Rise className="lg:sticky lg:top-32 lg:self-start">
            <ArtPanel variant="sun" ratio="4/5" caption="The flagship session" />
          </Rise>

          <div>
            <SectionHead
              index="02"
              label="Flagship workshop"
              lines={["More Than", "a Dancer."]}
              body={FLAGSHIP.summary}
            />

            <ol className="mt-12 flex flex-col">
              {FLAGSHIP.agenda.map((step, i) => (
                <li
                  key={i}
                  className="flex gap-5 border-t border-forest/12 py-5 sm:gap-8"
                >
                  <span className="font-display-sm w-8 shrink-0 text-[1rem] text-gold-deep/70 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.98rem] leading-relaxed text-ink-soft">
                    {step}
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/workshops/college">See the full programme</Button>
              <Button href="/contact" variant="ghost">
                Request this workshop
              </Button>
            </div>
          </div>
        </div>
      </Container>

      {/* ── quote ── */}
      <Section dark className="bg-forest-deep py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <Rise>
            <Quote attribution={SITE.founder} role="Founder" dark>
              Dancers shouldn&apos;t have to choose between the art and a
              living. The whole point is to build a career that holds both.
            </Quote>
          </Rise>
          <Rise delay={0.1}>
            <ArtPanel
              ratio="4/5"
              src="/images/kira-speaking-portrait.jpg"
              alt={`${SITE.founder} delivering a Rai Arts session`}
              caption="Kira Rai Daniel, presenting"
            />
          </Rise>
        </Container>
      </Section>

      <Marquee
        dark
        speed={44}
        items={["Your Art. Your Business.", "For dancers, by a dancer"]}
      />

      {/* ── learn ── */}
      <Container className="py-20 sm:py-28">
        <SectionHead
          index="03"
          label="Learn"
          lines={["Free to follow,", "wherever you are", "in the career."]}
          body="You don't need a program to bring Rai Arts in to start learning. The podcast and newsletter cover the same ground the workshops do."
        >
          <Button href="/learn">Watch and read</Button>
          <Button href="/shop" variant="ghost">
            Get the guide
          </Button>
        </SectionHead>
      </Container>

      {/* ── cta ── */}
      <Section dark className="py-24 sm:py-32">
        <Container className="flex flex-col items-center text-center">
          <SectionHead
            label="Get in touch"
            align="center"
            dark
            lines={["Have a program,", "a question, or", "want the guide?"]}
            body="Whether it's booking a workshop for your dance program or grabbing the career guide, reach out and Kira will get back to you within a couple of days."
          >
            <Button href="/contact" variant="gold">
              Book a workshop
            </Button>
            <Button href={`mailto:${SITE.email}`} variant="ghost-light" external>
              Email {SITE.email}
            </Button>
          </SectionHead>
        </Container>
      </Section>
    </>
  );
}
