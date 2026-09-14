import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { Button, Container, Section } from "@/components/ui";
import { Lines, Words } from "@/components/Reveal";
import { SectionHead } from "@/components/editorial";
import CurtainHero from "@/components/CurtainHero";
import LineWalk, { type Service } from "@/components/LineWalk";
import QuoteBand from "@/components/QuoteBand";

export const metadata: Metadata = {
  title: "Career readiness for dancers",
  description: SITE.description,
  alternates: { canonical: "/" },
};

const WHO_WE_ARE = [
  "Rai Arts is a dance career consulting agency helping dancers acquire the knowledge and skills they need to build sustainable careers in the arts.",
  "We want to see a dance industry where career preparation goes beyond artistic achievement and considers the artist as a whole person, equipping dancers with the knowledge and tools to support both their careers and their lives.",
];

const THE_GAP =
  "Dancers are exceptionally prepared for the artistic demands of their careers \u2014 and significantly less prepared for everything that comes after. Rai Arts exists to close that gap: to make practical career education available to dancers before they need it, not after they\u2019ve already struggled without it.";

const SERVICES: Service[] = [
  {
    title: "Literacy Series",
    body: "Accessible workshops that introduce dancers to the practical knowledge and skills that support a professional career.",
  },
  {
    title: "Consulting",
    body: "Individual and organizational consulting focused on career development, professional strategy, and the systems that help artists navigate the industry.",
  },
  {
    title: "Resources",
    body: "Practical tools from ebooks and guides to templates and other educational resources designed to help dancers navigate the realities of building a career in the arts.",
  },
];

export default function Home() {
  return (
    <>
      {/* ── hero: the house curtain, with the lockup on it, parts onto the stage ──
          The stage uses a landscape crop of the speaking photo: the source is
          portrait, and object-cover on a full-bleed band would have cut both
          heads off. */}
      <CurtainHero stage={{ src: "/images/kira-speaking-wide.jpg", alt: "" }}>
        <p className="label">Career readiness for dancers</p>
        <h1 className="font-statement text-[length:var(--text-step-3)] text-cream">
          Helping dancers build sustainable careers
        </h1>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/services" variant="gold">
            Services
          </Button>
          <Button href="/contact" variant="ghost-light">
            Book Free Consultation
          </Button>
        </div>
      </CurtainHero>

      {/* ── who we are, then the walk ── */}
      <Section className="py-20 sm:py-28 lg:py-32">
        <Container>
          <div className="mx-auto max-w-[62ch] text-center">
            <Lines
              as="h2"
              className="font-statement text-[length:var(--text-step-3)]"
              lines={["Who We Are"]}
            />
            {WHO_WE_ARE.map((p, i) => (
              <Words
                key={i}
                text={p}
                delay={0.15 + i * 0.1}
                className="mt-6 text-[length:var(--text-step-0)] leading-[1.65] text-ink-soft first-of-type:mt-8"
              />
            ))}
          </div>

          <div className="mt-24 sm:mt-28 lg:mt-36">
            <LineWalk heading="What We Do" items={SERVICES} />
          </div>
        </Container>
      </Section>

      {/* ── the gap ── */}
      <QuoteBand text={THE_GAP} />

      {/* ── inquire ── */}
      <Section className="bg-sand py-24 sm:py-32">
        <Container className="flex flex-col items-center text-center">
          <SectionHead
            label="Get in touch"
            align="center"
            lines={["Have a question", "or ready to begin?"]}
            body="Whether you're booking a workshop for your dance program or signing up for a session yourself, reach out and Kira will get back to you within a couple of days."
          >
            <Button href={`mailto:${SITE.email}`} variant="gold" external>
              Email Me
            </Button>
          </SectionHead>
        </Container>
      </Section>
    </>
  );
}
