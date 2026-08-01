import type { Metadata } from "next";
import Link from "next/link";
import { FLAGSHIP } from "@/lib/content";
import { Button, Container, Section } from "@/components/ui";
import { Label, Lines, Rise, Words } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Workshops",
  description:
    "Career workshops for dance programs — guest lectures and class visits for college and university students, plus online sessions opening soon.",
  alternates: { canonical: "/workshops" },
};

const FORMATS = [
  {
    n: "Single session",
    body: "One workshop, 60–90 minutes, delivered as a guest lecture or class visit. The most common way programs start.",
  },
  {
    n: "Pillar series",
    body: "Three to five linked sessions built around the pillars your students need most — often run across a semester.",
  },
  {
    n: "Full capstone",
    body: "The complete Career Readiness Framework™ as a semester-long capstone for graduating cohorts.",
  },
];

export default function Workshops() {
  return (
    <>
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <Label>Workshops</Label>
        <Lines
          as="h1"
          className="font-display mt-5 max-w-4xl text-[length:var(--text-step-3)]"
          lines={["Career workshops", "for dance programs."]}
        />
        <Words
          className="mt-7 max-w-[58ch] text-ink-soft"
          text="Rai Arts comes to your department and gives students the language, tools, and confidence to understand their options — what the work pays, how to find it, and how to build a career that lasts."
        />
      </Container>

      {/* two doors */}
      <Container className="pb-20 sm:pb-28">
        <div className="grid gap-5 lg:grid-cols-2">
          <Rise>
            <Link
              href="/workshops/college"
              className="group flex h-full flex-col justify-between gap-10 rounded-sm bg-forest p-8 text-cream transition-colors duration-500 hover:bg-forest-mid sm:p-10"
            >
              <div>
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-gold">
                  Available now
                </span>
                <h2 className="font-display mt-4 text-[length:var(--text-step-2)]">
                  College
                </h2>
                <p className="mt-4 max-w-[38ch] text-[0.95rem] leading-relaxed text-cream/75">
                  Guest lectures and class visits for degree programs. Book the
                  flagship session, a pillar series, or the full framework as a
                  capstone.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-gold">
                See the session
                <span
                  aria-hidden="true"
                  className="transition-transform duration-400 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          </Rise>

          <Rise delay={0.08}>
            <Link
              href="/workshops/online"
              className="group flex h-full flex-col justify-between gap-10 rounded-sm border border-forest/15 bg-white/55 p-8 transition-colors duration-500 hover:bg-white sm:p-10"
            >
              <div>
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-gold-deep">
                  Opening soon
                </span>
                <h2 className="font-display mt-4 text-[length:var(--text-step-2)]">
                  Online
                </h2>
                <p className="mt-4 max-w-[38ch] text-[0.95rem] leading-relaxed text-ink-soft">
                  Self-paced modules and live sessions, so dancers can work
                  through the framework whether or not their program brings Rai
                  Arts in.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-gold-deep">
                Join the list
                <span
                  aria-hidden="true"
                  className="transition-transform duration-400 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          </Rise>
        </div>
      </Container>

      {/* formats */}
      <Section dark className="py-20 sm:py-28">
        <Container>
          <div className="max-w-2xl">
            <Label>Formats</Label>
            <Lines
              as="h2"
              className="font-display mt-5 text-[length:var(--text-step-2)]"
              lines={["Three ways to run it."]}
            />
          </div>
          <ul className="mt-12 grid gap-px border border-cream/15 bg-cream/15 md:grid-cols-3">
            {FORMATS.map((f, i) => (
              <li key={f.n} className="flex">
                <Rise delay={i * 0.07} className="w-full bg-forest p-7">
                  <h3 className="font-display-sm text-[1.15rem]">{f.n}</h3>
                  <p className="mt-3 text-[0.88rem] leading-relaxed text-cream/70">
                    {f.body}
                  </p>
                </Rise>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* flagship teaser */}
      <Container className="py-20 sm:py-28">
        <Rise className="rounded-sm border border-forest/12 bg-white/55 p-8 sm:p-12">
          <span className="inline-block rounded-sm bg-sand px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-forest">
            {FLAGSHIP.flag}
          </span>
          <h2 className="font-display mt-5 text-[length:var(--text-step-2)]">
            {FLAGSHIP.title}
          </h2>
          <p className="mt-2 italic text-ink-soft">{FLAGSHIP.subtitle}</p>
          <p className="mt-5 max-w-[62ch] leading-relaxed text-ink-soft">
            {FLAGSHIP.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/workshops/college">Full session details</Button>
            <Button href="/contact" variant="ghost">
              Request this workshop
            </Button>
          </div>
        </Rise>
      </Container>
    </>
  );
}
