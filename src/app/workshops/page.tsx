import type { Metadata } from "next";
import Link from "next/link";
import { FLAGSHIP } from "@/lib/content";
import { Button, Container, Section } from "@/components/ui";
import { Label, Lines, Rise, Words } from "@/components/Reveal";
import { SectionHead, Steps } from "@/components/editorial";
import Marquee from "@/components/Marquee";
import Statement from "@/components/Statement";
import ArtPanel from "@/components/ArtPanel";

export const metadata: Metadata = {
  title: "Workshops",
  description:
    "Career workshops for dance programs: guest lectures and class visits for college and university students, plus online sessions opening soon.",
  alternates: { canonical: "/workshops" },
};

const FORMATS = [
  {
    title: "Single session",
    body: "One workshop, 60 to 90 minutes, delivered as a guest lecture or class visit. The most common way programs start.",
  },
  {
    title: "Pillar series",
    body: "Three to five linked sessions built around the pillars your students need most, often run across a semester.",
  },
  {
    title: "Full capstone",
    body: "The complete Career Readiness Framework™ as a semester-long capstone for graduating cohorts.",
  },
];

const DOORS = [
  {
    href: "/workshops/college",
    status: "Available now",
    title: "College",
    body: "Guest lectures and class visits for degree programs. Book the flagship session, a pillar series, or the full framework as a capstone.",
    cta: "See the programme",
    variant: "sun" as const,
    dark: true,
  },
  {
    href: "/workshops/online",
    status: "Opening soon",
    title: "Online",
    body: "Self-paced modules and live sessions, so dancers can work through the framework whether or not their program brings Rai Arts in.",
    cta: "Join the list",
    variant: "grid" as const,
    dark: false,
  },
];

export default function Workshops() {
  return (
    <>
      <Container className="pt-32 pb-14 sm:pt-40 sm:pb-20">
        <Label>Workshops</Label>
        <Lines
          as="h1"
          className="font-statement mt-6 max-w-[15ch] text-[length:var(--text-step-5)]"
          lines={["Career workshops", "for dance programs."]}
        />
        <Words
          className="mt-8 max-w-[54ch] text-[length:var(--text-step-0)] text-ink-soft"
          text="Rai Arts comes to your department and gives students the language, tools, and confidence to understand their options: what the work pays, how to find it, and how to build a career that lasts."
        />
      </Container>

      <Marquee items={["Guest lectures", "Class visits", "Semester capstones"]} />

      {/* ── two doors ── */}
      <Container className="py-16 sm:py-24">
        <div className="grid gap-5 lg:grid-cols-2">
          {DOORS.map((d, i) => (
            <Rise key={d.href} delay={i * 0.08}>
              <Link
                href={d.href}
                className={`group grain relative isolate flex h-full flex-col justify-between gap-12 overflow-hidden rounded-sm p-8 transition-colors duration-500 sm:p-10 ${
                  d.dark
                    ? "on-dark bg-forest text-cream hover:bg-forest-mid"
                    : "border border-forest/15 bg-white/60 hover:bg-white"
                }`}
              >
                <div className="relative z-[2]">
                  <span
                    className={`font-mono text-[0.62rem] tracking-[0.18em] uppercase ${
                      d.dark ? "text-gold" : "text-gold-deep"
                    }`}
                  >
                    {d.status}
                  </span>
                  <h2 className="font-statement mt-5 text-[length:var(--text-step-4)]">
                    {d.title}
                  </h2>
                  <p
                    className={`mt-5 max-w-[38ch] leading-relaxed ${
                      d.dark ? "text-cream/75" : "text-ink-soft"
                    }`}
                  >
                    {d.body}
                  </p>
                </div>
                <span
                  className={`relative z-[2] inline-flex items-center gap-2 font-mono text-[0.66rem] tracking-[0.16em] uppercase ${
                    d.dark ? "text-gold" : "text-gold-deep"
                  }`}
                >
                  {d.cta}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-500 group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </span>
              </Link>
            </Rise>
          ))}
        </div>
      </Container>

      <Statement
        kicker="What a session does"
        lines={["One room.", "Ninety minutes.", "A different plan."]}
        footnote="Students walk in picturing two or three jobs. They walk out with a map of the profession and one concrete move to make next."
      />

      {/* ── formats ── */}
      <Container className="py-20 sm:py-28">
        <SectionHead
          index="01"
          label="Formats"
          lines={["Three ways", "to run it."]}
        />
        <div className="mt-12">
          <Steps items={FORMATS} />
        </div>
      </Container>

      {/* ── flagship teaser ── */}
      <Section dark className="py-20 sm:py-28 lg:py-32">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <div>
            <SectionHead
              index="02"
              label={FLAGSHIP.flag}
              dark
              lines={["More Than", "a Dancer."]}
              body={FLAGSHIP.summary}
            >
              <Button href="/workshops/college" variant="gold">
                Full programme
              </Button>
              <Button href="/contact" variant="ghost-light">
                Request this workshop
              </Button>
            </SectionHead>
          </div>
          <Rise delay={0.1}>
            <ArtPanel ratio="4/5" src="/images/empty-house.jpg" alt="An empty auditorium" />
          </Rise>
        </Container>
      </Section>
    </>
  );
}
