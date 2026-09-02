import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { Button, Container, Section } from "@/components/ui";
import { Lines, Rise, Words } from "@/components/Reveal";
import { Quote, SectionHead } from "@/components/editorial";
import CurtainHero from "@/components/CurtainHero";
import LineWalk, { type Service } from "@/components/LineWalk";
import Statement from "@/components/Statement";
import ArtPanel from "@/components/ArtPanel";

export const metadata: Metadata = {
  title: "Career readiness for dancers",
  description: SITE.description,
  alternates: { canonical: "/" },
};

const WHO_WE_ARE = [
  "Rai Arts is a dance career consulting agency helping dancers acquire the knowledge and skills they need to build sustainable careers in the arts.",
  "We want to see a dance industry where career preparation goes beyond artistic achievement and considers the artist as a whole person, equipping dancers with the knowledge and tools to support both their careers and their lives.",
];

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
        <h1 className="font-statement text-[length:var(--text-step-4)] text-cream">
          Helping dancers build sustainable careers
        </h1>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/workshops" variant="gold">
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
          <div className="max-w-[62ch]">
            <Lines
              as="h2"
              className="font-statement text-[length:var(--text-step-4)]"
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

      {/* ── the promise, set as artwork ── */}
      <Statement
        kicker="The promise"
        lines={["Your Art.", "Your Business."]}
        footnote="Art or business — most dancers are told to choose. The whole point of Rai Arts is that you don't have to."
      />

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
