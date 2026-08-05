import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { PILLARS } from "@/lib/content";
import { Button, Container, Section } from "@/components/ui";
import { Rise } from "@/components/Reveal";
import { Quote, SectionHead } from "@/components/editorial";
import CurtainHero from "@/components/CurtainHero";
import LineWalk, { type Beat } from "@/components/LineWalk";
import Marquee from "@/components/Marquee";
import Statement from "@/components/Statement";
import ArtPanel from "@/components/ArtPanel";
import Wings from "@/components/Wings";
import LearnTiles from "@/components/LearnTiles";

export const metadata: Metadata = {
  title: "Career readiness for dancers",
  description: SITE.description,
  alternates: { canonical: "/" },
};

const BEATS: Beat[] = [
  {
    label: "The problem",
    lines: ["A career can hold", "more than one thing."],
    body: "Dancers spend years preparing their bodies for the stage. A lasting career asks for more: understanding the industry, managing your finances, and taking care of yourself through it all.",
  },
  {
    label: "The approach",
    lines: ["Keep dancing.", "Build the structure", "around it."],
    body: "This isn't about leaving dance, or asking dancers for a Plan B. Rai Arts prepares the whole person, not just the dancer, for the profession. The performing keeps going, with something solid underneath it.",
  },
  {
    label: "The curriculum",
    lines: ["Five pillars,", "one framework."],
    body: "The Rai Arts Career Readiness Framework™ covers everything from mapping a first year post-grad to reading a contract, budgeting freelance income, and lasting long enough to build a legacy.",
  },
  {
    label: "The delivery",
    lines: ["Wherever you're", "ready to learn."],
    body: "Bring Rai Arts to your program as a single workshop, a themed series, or a full capstone, or sign up for a live online session yourself. In person or online, the work translates.",
  },
];

export default function Home() {
  return (
    <>
      {/* ── hero: the curtain parts onto the stage ──
          The curtain rotates in pairs: left[i] and right[i] are on screen
          together, so these arrays are a running order, not two loose lists. */}
      <CurtainHero
        left={[
          { src: "/images/kira-barre.jpg", alt: "Kira at the barre in the studio" },
          { src: "/images/kira-steps.jpg", alt: "Kira on the steps at Columbia" },
          {
            src: "/images/kira-speaking.jpg",
            alt: `${SITE.founder} presenting a Rai Arts session`,
          },
        ]}
        right={[
          { src: "/images/kira-portrait.jpg", alt: `${SITE.founder}` },
          { src: "/images/kira-aerial.jpg", alt: "Kira inverted mid-movement" },
          {
            src: "/images/kira-teaching.jpg",
            alt: "Kira in conversation after a session",
          },
        ]}
        stage={{ src: "/images/kira-barre.jpg", alt: "" }}
      >
        <p className="label">Career readiness for dancers</p>
        <h1 className="font-statement text-[length:var(--text-step-4)] text-cream">
          Preparing dancers for the business of a dance career.
        </h1>
        <p className="max-w-[46ch] text-[length:var(--text-step-0)] text-cream/75">
          {SITE.intro}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/framework" variant="gold">
            Explore the framework
          </Button>
          <Button href="/contact" variant="ghost-light">
            Book a workshop
          </Button>
        </div>
      </CurtainHero>

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
        footnote="Art or business — most dancers are told to choose. The whole point of Rai Arts is that you don't have to."
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

          {/* ── the wings: one pillar downstage in the light ── */}
          <div className="mt-14">
            <Wings
              pillars={PILLARS}
              art={[
                { src: "/images/kira-steps.jpg", alt: "" },
                { src: "/images/kira-portrait.jpg", alt: "" },
                { src: "/images/kira-barre.jpg", alt: "" },
                { src: "/images/kira-teaching.jpg", alt: "" },
                { src: "/images/kira-aerial.jpg", alt: "" },
              ]}
            />
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <Button href="/framework" variant="gold">
              Explore all five pillars
            </Button>
          </div>
        </Container>
      </Section>

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
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <SectionHead
            index="03"
            label="Learn"
            lines={["Free to follow,", "wherever you are", "in the career."]}
            body="You don't need a program to bring Rai Arts in to start learning. The ebooks, podcast, and newsletter cover the same ground the workshops do."
          >
            <Button href="/learn">Watch and read</Button>
            <Button href="/shop" variant="ghost">
              Ebooks
            </Button>
          </SectionHead>

          <Rise delay={0.1}>
            <LearnTiles />
          </Rise>
        </div>
      </Container>

      {/* ── cta ── */}
      <Section dark className="py-24 sm:py-32">
        <Container className="flex flex-col items-center text-center">
          <SectionHead
            label="Get in touch"
            align="center"
            dark
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
