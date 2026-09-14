import type { Metadata } from "next";
import { FRAMEWORK, PILLARS } from "@/lib/content";
import { SITE } from "@/lib/site";
import { Button, Container, PageHero, Section } from "@/components/ui";
import { Label, Lines, Rise } from "@/components/Reveal";
import { SectionHead } from "@/components/editorial";
import FrameworkDiagram from "@/components/FrameworkDiagram";
import PinnedPillars from "@/components/PinnedPillars";

export const metadata: Metadata = {
  title: "The Career Readiness Framework",
  description:
    "The Rai Arts Career Readiness Framework™ is made up of five pillars, each centered on a guiding question: career foundations, business, financial, professional, and longevity readiness.",
  alternates: { canonical: "/framework" },
};

const COURSE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "The Rai Arts Career Readiness Framework™",
  description: FRAMEWORK.intro,
  provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
  audience: { "@type": "EducationalAudience", educationalRole: "student" },
  teaches: PILLARS.map((p) => p.title),
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: ["onsite", "online"],
    courseWorkload: "PT90M",
  },
};

export default function Framework() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(COURSE_JSONLD) }}
      />

      {/* ── hero ── */}
      <PageHero
        label="Framework"
        lines={["The Rai Arts Career", "Readiness Framework™"]}
        headingClassName="max-w-[20ch] !text-[length:var(--text-step-2)]"
        intro={FRAMEWORK.intro}
        introClassName="max-w-[64ch]"
      />

      {/* ── the graphic ── */}
      <Container className="pb-20 sm:pb-28">
        <Rise delay={0.15}>
          <FrameworkDiagram pillars={PILLARS} />
        </Rise>
      </Container>

      {/* ── the five in full, pinned ── */}
      <Section dark className="py-20 sm:py-28 lg:py-36">
        <Container>
          <PinnedPillars pillars={PILLARS} />
        </Container>
      </Section>

      {/* ── from framework to education ── */}
      <Section className="bg-sand py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <Label>{FRAMEWORK.education.heading}</Label>
            <Lines
              as="h2"
              className="font-statement mt-6 max-w-[14ch] text-[length:var(--text-step-2)]"
              lines={["The framework is", "the foundation", "of Rai Arts."]}
            />
          </div>
          <div className="flex flex-col gap-5 lg:pt-2">
            {FRAMEWORK.education.paragraphs.map((p, i) => (
              <Rise key={i} delay={i * 0.08}>
                <p className="max-w-[56ch] text-[length:var(--text-step-0)] leading-[1.7] text-ink-soft">
                  {p}
                </p>
              </Rise>
            ))}
            <Rise delay={0.2} className="mt-4 flex flex-wrap gap-3">
              <Button href="/contact">Book a consultation</Button>
              <Button href="/learn" variant="ghost">
                Explore our resources
              </Button>
            </Rise>
          </div>
        </Container>
      </Section>

      {/* ── cta ── */}
      <Section dark className="bg-forest-deep py-24 sm:py-32">
        <Container className="flex flex-col items-center text-center">
          <SectionHead
            label="Next step"
            align="center"
            dark
            lines={["Want to bring the", "Framework to you?"]}
          >
            <Button href="/contact" variant="gold">
              Free consultation
            </Button>
            <Button href="/learn" variant="ghost-light">
              Explore resources
            </Button>
          </SectionHead>
        </Container>
      </Section>
    </>
  );
}
