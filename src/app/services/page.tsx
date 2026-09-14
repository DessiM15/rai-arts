import type { Metadata } from "next";
import Link from "next/link";
import { Button, Container, PageHero, Section } from "@/components/ui";
import { Rise } from "@/components/Reveal";
import { SectionHead } from "@/components/editorial";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Two ways to work with Rai Arts: the Literacy Series, low-cost online workshops for dancers, and Consulting, customized career-readiness programming for schools, studios, companies, and universities.",
  alternates: { canonical: "/services" },
};

const DOORS = [
  {
    href: "/services/literacy-series",
    status: "For dancers",
    title: "Literacy Series",
    body: "Accessible, low-cost online workshops that teach the knowledge and skills dancers need to navigate their careers, and their lives, beyond the studio.",
    cta: "Explore the series",
    dark: true,
  },
  {
    href: "/services/consulting",
    status: "For schools, studios, companies, and universities",
    title: "Consulting",
    body: "Customized career-readiness programming built from the framework, from a single workshop to an ongoing series, shaped around your community.",
    cta: "Explore consulting",
    dark: false,
  },
];

export default function Services() {
  return (
    <>
      <PageHero
        label="Services"
        lines={["Two ways to work", "with Rai Arts."]}
        headingClassName="max-w-[15ch]"
        intro="Everything Rai Arts teaches is built from the Career Readiness Framework. Dancers can take it on directly through the Literacy Series. Institutions can bring it to their community through Consulting."
      />

      {/* ── two doors ── */}
      <Container className="pb-20 sm:pb-28">
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
                  <h2 className="font-statement mt-5 text-[length:var(--text-step-3)]">
                    {d.title}
                  </h2>
                  <p
                    className={`mt-5 max-w-[40ch] leading-relaxed ${
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

      <Section dark className="bg-forest-deep py-20 sm:py-24">
        <Container className="flex flex-col items-center text-center">
          <SectionHead
            label="Not sure which"
            align="center"
            dark
            lines={["Tell us what you're", "looking for."]}
            body="A sentence is enough to start. We'll come back with the right format, topics, and scope."
          >
            <Button href="/contact" variant="gold">
              Book a free consultation
            </Button>
            <Button href="/framework" variant="ghost-light">
              See the framework
            </Button>
          </SectionHead>
        </Container>
      </Section>
    </>
  );
}
