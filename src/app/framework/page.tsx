import type { Metadata } from "next";
import { PILLARS } from "@/lib/content";
import { SITE } from "@/lib/site";
import { Button, Container, Section } from "@/components/ui";
import { Label, Lines, Rise, Words } from "@/components/Reveal";
import { SectionHead, Steps } from "@/components/editorial";
import PinnedPillars from "@/components/PinnedPillars";
import Marquee from "@/components/Marquee";
import Statement from "@/components/Statement";
import ArtPanel from "@/components/ArtPanel";

export const metadata: Metadata = {
  title: "The Career Readiness Framework",
  description:
    "The Rai Arts Career Readiness Framework™ is the signature curriculum, built on five pillars: career foundations, business, financial, professional, and longevity readiness.",
  alternates: { canonical: "/framework" },
};

const COURSE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "The Rai Arts Career Readiness Framework™",
  description:
    "A five-pillar curriculum preparing dancers for the business of a dance career: career foundations, business readiness, financial readiness, professional readiness, and longevity readiness.",
  provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
  educationalLevel: "Undergraduate",
  audience: { "@type": "EducationalAudience", educationalRole: "student" },
  teaches: PILLARS.map((p) => p.title),
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "onsite",
    courseWorkload: "PT90M",
  },
};

const FORMATS = [
  {
    title: "A single workshop",
    body: "One pillar, 60 to 90 minutes, delivered as a guest lecture or class visit. The most common way a program starts.",
  },
  {
    title: "A pillar series",
    body: "Three to five linked sessions built around the pillars your students need most, usually spread across a semester.",
  },
  {
    title: "The full capstone",
    body: "All five pillars as a semester-long capstone for a graduating cohort, with worksheets and take-home frameworks.",
  },
];

export default function Framework() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(COURSE_JSONLD) }}
      />

      {/* ── hero ── */}
      <Container className="grid items-end gap-10 pt-32 pb-16 sm:pt-40 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pb-24">
        <div>
          <Label>The framework</Label>
          <Lines
            as="h1"
            className="font-statement mt-6 text-[length:var(--text-step-5)]"
            lines={["The Rai Arts", "Career Readiness", "Framework™"]}
          />
          <Words
            className="mt-8 max-w-[52ch] text-[length:var(--text-step-0)] text-ink-soft"
            text="Our signature curriculum covers everything a dancer needs to enter and navigate the profession with confidence, built on five pillars of readiness."
          />
          <Rise delay={0.4} className="mt-9 flex flex-wrap gap-3">
            <Button href="/contact">Bring it to your program</Button>
            <Button href="/workshops" variant="ghost">
              See workshop formats
            </Button>
          </Rise>
        </div>
        <Rise delay={0.2}>
          <ArtPanel variant="grid" ratio="4/5" caption="Five pillars of readiness" />
        </Rise>
      </Container>

      <Marquee items={PILLARS.map((p) => p.title)} speed={42} />

      {/* ── the pillars, pinned ── */}
      <Section dark className="py-20 sm:py-28 lg:py-36">
        <Container>
          <PinnedPillars pillars={PILLARS} />
        </Container>
      </Section>

      <Statement
        dark={false}
        kicker="Why it's built this way"
        lines={["Technique is taught.", "The profession", "is not."]}
        footnote="Every pillar exists because it is something dancers are expected to already know, and are almost never actually taught."
      />

      {/* ── formats ── */}
      <Container className="py-20 sm:py-28">
        <SectionHead
          index="02"
          label="Formats"
          lines={["Three ways", "to run it."]}
          body="Take one pillar on its own, a themed series, or the whole framework as a capstone. Every version is built around your students, not a fixed script."
        />
        <div className="mt-12">
          <Steps items={FORMATS} />
        </div>
      </Container>

      {/* ── cta ── */}
      <Section dark className="bg-forest-deep py-24 sm:py-32">
        <Container className="flex flex-col items-center text-center">
          <SectionHead
            label="Next step"
            align="center"
            dark
            lines={["One workshop, a series,", "or the full capstone."]}
            body="Tell us your department, class year, and timeframe, and we'll put together the shape that fits your program."
          >
            <Button href="/contact" variant="gold">
              Request a workshop
            </Button>
            <Button href="/shop" variant="ghost-light">
              Get the career guide
            </Button>
          </SectionHead>
        </Container>
      </Section>
    </>
  );
}
