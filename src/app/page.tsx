import Link from "next/link";
import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { FLAGSHIP, PILLARS } from "@/lib/content";
import { Button, Container, Section } from "@/components/ui";
import { Label, Lines, Rise, Words } from "@/components/Reveal";
import DancerStage from "@/components/DancerStage";
import LineWalk, { type Beat } from "@/components/LineWalk";
import Marquee from "@/components/Marquee";
import Statement from "@/components/Statement";

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
  },
  {
    label: "The approach",
    lines: ["Keep dancing.", "Build the structure", "around it."],
    body: "This isn't about leaving dance. Rai Arts prepares dancers for the whole profession, not an exit from it. The performing keeps going, with something solid underneath it.",
  },
  {
    label: "The curriculum",
    lines: ["Five pillars,", "one framework."],
    body: "The Rai Arts Career Readiness Framework™ covers everything from mapping a first year post-grad to reading a contract, budgeting freelance income, and lasting long enough to build a legacy.",
  },
  {
    label: "The delivery",
    lines: ["Brought into", "your program."],
    body: "Book a single workshop, a themed series, or the full framework as a semester-long capstone. Sessions run as guest lectures or class visits for groups of ten to thirty and up.",
  },
];

export default function Home() {
  return (
    <>
      {/* ── hero ── */}
      <Container className="grid items-center gap-10 pt-28 pb-16 sm:pt-36 sm:pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-44">
        <div className="flex flex-col items-start gap-7">
          <Label>Career readiness for dancers</Label>
          <Lines
            as="h1"
            className="font-display text-[length:var(--text-step-4)]"
            lines={["Preparing dancers", "for the business", "of a dance career."]}
            delay={0.1}
          />
          <Words
            className="max-w-[52ch] text-ink-soft"
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

        <Rise delay={0.2}>
          <DancerStage />
        </Rise>
      </Container>

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
      <Section dark className="py-20 sm:py-28">
        <Container>
          <div className="max-w-3xl">
            <Label>The framework</Label>
            <Lines
              as="h2"
              className="font-display mt-5 text-[length:var(--text-step-3)]"
              lines={["The Rai Arts Career", "Readiness Framework™"]}
            />
            <Words
              className="mt-6 text-cream/70"
              text="Our signature curriculum covers everything a dancer needs to enter and navigate the profession with confidence, built on five pillars of readiness."
            />
          </div>

          <ul className="mt-12 grid gap-px border border-cream/15 bg-cream/15 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p, i) => (
              <li key={p.n} className="flex">
                <Rise
                  delay={i * 0.06}
                  className="flex w-full flex-col gap-2 bg-forest p-6 transition-colors duration-500 hover:bg-forest-mid"
                >
                  <span className="font-display-sm text-gold">{p.n}</span>
                  <h3 className="font-display-sm text-[1.1rem]">{p.title}</h3>
                  <p className="text-[0.86rem] italic text-cream/60">
                    {p.question}
                  </p>
                  <p className="mt-1 text-[0.86rem] leading-relaxed text-cream/70">
                    {p.body}
                  </p>
                </Rise>
              </li>
            ))}
            <li className="flex">
              <Rise
                delay={PILLARS.length * 0.06}
                className="flex w-full flex-col justify-center gap-4 bg-gold p-6 text-forest-deep"
              >
                <h3 className="font-display-sm text-[1.15rem]">
                  Bring it to your program
                </h3>
                <p className="text-[0.86rem] leading-relaxed">
                  A single workshop, a pillar series, or the full framework as a
                  semester-long capstone.
                </p>
                <Link
                  href="/workshops"
                  className="mt-1 inline-flex min-h-[44px] items-center gap-2 self-start font-mono text-[0.66rem] uppercase tracking-[0.16em] underline underline-offset-4 transition-opacity hover:opacity-70"
                >
                  See workshop options
                  <span aria-hidden="true">→</span>
                </Link>
              </Rise>
            </li>
          </ul>
        </Container>
      </Section>

      {/* ── flagship ── */}
      <Container className="py-20 sm:py-28">
        <div className="grid overflow-hidden rounded-sm border border-forest/10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="bg-white/55 p-7 sm:p-10">
            <span className="inline-block rounded-sm bg-sand px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-forest">
              {FLAGSHIP.flag}
            </span>
            <h2 className="font-display mt-5 text-[length:var(--text-step-2)]">
              {FLAGSHIP.title}
            </h2>
            <p className="mt-2 italic text-ink-soft">{FLAGSHIP.subtitle}</p>
            <p className="mt-5 max-w-[56ch] text-[0.95rem] leading-relaxed text-ink-soft">
              {FLAGSHIP.summary}
            </p>

            <dl className="mt-8 grid gap-5 border-t border-forest/10 pt-6 sm:grid-cols-3">
              {[
                ["Length", FLAGSHIP.length],
                ["For", FLAGSHIP.audience],
                ["Format", FLAGSHIP.format],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink-soft">
                    {k}
                  </dt>
                  <dd className="mt-1.5 text-[0.88rem]">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8">
              <Button href="/workshops/college">See the full session</Button>
            </div>
          </div>

          <div className="on-dark bg-forest p-7 text-cream sm:p-10">
            <p className="label">Inside the session</p>
            <ol className="mt-6 flex flex-col gap-5">
              {FLAGSHIP.agenda.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="mt-0.5 grid h-7 w-7 flex-none place-items-center rounded-full bg-gold/20 font-mono text-[0.66rem] text-gold">
                    {i + 1}
                  </span>
                  <span className="text-[0.9rem] leading-relaxed text-cream/85">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>

      {/* ── learn ── */}
      <Container className="pb-20 sm:pb-28">
        <Section
          dark
          as="div"
          className="grid items-center gap-8 rounded-sm p-8 sm:p-12 lg:grid-cols-[1.2fr_0.8fr]"
        >
          <div>
            <Label>Learn</Label>
            <Lines
              as="h2"
              className="font-display mt-5 text-[length:var(--text-step-2)]"
              lines={["The Rai Arts podcast", "and newsletter."]}
            />
            <p className="mt-5 max-w-[48ch] text-cream/70">
              Conversations on building a life in dance, and writing on the
              business of a dance career. Both are free to follow.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/learn" variant="gold">
                Watch and read
              </Button>
              <Button href="/shop" variant="ghost-light">
                Get the guide
              </Button>
            </div>
          </div>
          <div
            className="hidden justify-self-end text-gold lg:block"
            aria-hidden="true"
          >
            <svg width="150" height="150" viewBox="0 0 100 100" fill="none">
              <path d="M28 18 L82 50 L28 82 Z" fill="currentColor" />
            </svg>
          </div>
        </Section>
      </Container>

      {/* ── cta ── */}
      <Section dark className="py-24 text-center sm:py-32">
        <Container className="flex flex-col items-center">
          <Label>Get in touch</Label>
          <Lines
            as="h2"
            className="font-display mt-6 text-[length:var(--text-step-3)]"
            lines={["Have a program,", "a question,", "or want the guide?"]}
          />
          <p className="mt-7 max-w-[46ch] text-cream/70">
            Whether it&apos;s booking a workshop for your dance program or
            grabbing the career guide, reach out and Kira will get back to you
            within a couple of days.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="gold">
              Book a workshop
            </Button>
            <Button href={`mailto:${SITE.email}`} variant="ghost-light" external>
              Email {SITE.email}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
