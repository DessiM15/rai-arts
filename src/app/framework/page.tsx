import type { Metadata } from "next";
import { FRAMEWORK, PILLARS } from "@/lib/content";
import { SITE } from "@/lib/site";
import { Button, Container, PageHero, Section } from "@/components/ui";
import { Label, Lines, Rise, Words } from "@/components/Reveal";
import Image from "next/image";
import PinnedPillars from "@/components/PinnedPillars";

export const metadata: Metadata = {
  title: "The Career Readiness Framework™",
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

      {/* ── hero: the headline, then the five-pillar graphic in the band ──
          The graphic is the artwork with its own title cropped off, since the
          headline above already says it. */}
      <PageHero
        label="Framework"
        lines={["The Rai Arts Career Readiness Framework™"]}
        headingClassName="!text-[length:var(--text-step-2)]"
        size="compact"
      >
        <Rise delay={0.15} className="mx-auto mt-10 w-full max-w-[880px] sm:mt-12">
          <Image
            src="/images/framework-pillars.png"
            alt="The five pillars, each with its guiding question. Career Foundations, Business Readiness, Financial Readiness, Professional Readiness, and Longevity Readiness."
            width={1800}
            height={430}
            sizes="(min-width: 960px) 880px, 92vw"
            className="mx-auto h-auto w-full"
            priority
          />
        </Rise>
      </PageHero>

      {/* ── the intro, on the cream band where the graphic used to be ── */}
      <Container className="py-14 sm:py-16">
        <Words
          className="mx-auto max-w-[62rem] text-center text-[length:var(--text-step-0)] leading-[1.7] text-ink-soft [text-wrap:pretty]"
          text={FRAMEWORK.intro}
        />
      </Container>

      {/* ── the five in full, pinned, on light tan ── */}
      <Section className="bg-tan py-20 sm:py-28 lg:py-36">
        <Container>
          <PinnedPillars pillars={PILLARS} />
        </Container>
      </Section>

      {/* ── from framework to education ── */}
      <Section className="bg-sand py-20 sm:py-28">
        <Container className="flex flex-col items-center text-center">
          <Label>{FRAMEWORK.education.heading}</Label>
          <Lines
            as="h2"
            className="font-statement mt-6 max-w-[18ch] text-[length:var(--text-step-3)]"
            lines={["The framework is", "the foundation of Rai Arts."]}
          />
          <Rise delay={0.2} className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href="/contact">Book a consultation</Button>
            <Button href="/learn" variant="ghost">
              Explore our resources
            </Button>
          </Rise>
        </Container>
      </Section>

    </>
  );
}
