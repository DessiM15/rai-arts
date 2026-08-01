import type { Metadata } from "next";
import { FLAGSHIP } from "@/lib/content";
import { SITE } from "@/lib/site";
import { Button, Container, Section } from "@/components/ui";
import { Label, Lines, Rise, Words } from "@/components/Reveal";
import Playbill from "@/components/Playbill";
import Marquee from "@/components/Marquee";

export const metadata: Metadata = {
  title: "College workshops",
  description:
    "More Than a Dancer: Careers and Income Streams in the Arts. A 60–90 minute guest lecture for college and university dance programs, from the Rai Arts Career Readiness Framework™.",
  alternates: { canonical: "/workshops/college" },
};

const COURSE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: `${FLAGSHIP.title}: ${FLAGSHIP.subtitle}`,
  description: FLAGSHIP.summary,
  provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
  educationalLevel: "Undergraduate",
  audience: { "@type": "EducationalAudience", educationalRole: "student" },
  teaches: FLAGSHIP.outcomes,
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "onsite",
    courseWorkload: "PT90M",
    location: { "@type": "Place", name: "Your campus" },
  },
};

export default function College() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(COURSE_JSONLD) }}
      />

      <Container className="pt-32 pb-14 sm:pt-40 sm:pb-16">
        <Label>Workshops · College</Label>
        <Lines
          as="h1"
          className="font-display mt-5 max-w-4xl text-[length:var(--text-step-3)]"
          lines={["For college and", "university programs."]}
        />
        <Words
          className="mt-7 max-w-[58ch] text-ink-soft"
          text="Sessions built for degree programs and delivered on your campus, as a guest lecture, a class visit, or a semester-long capstone for graduating cohorts."
        />
      </Container>

      <Marquee
        items={["More Than a Dancer", "Careers & Income Streams in the Arts"]}
        speed={30}
      />

      {/* the session, set as a theatre programme */}
      <Container className="py-16 sm:py-24">
        <Rise>
          <Playbill workshop={FLAGSHIP} />
        </Rise>
      </Container>

      <Section dark className="bg-forest-deep py-20 sm:py-24">
        <Container>
          <Lines
            as="h2"
            className="font-display text-[length:var(--text-step-2)]"
            lines={["Bringing Rai Arts", "to your program?"]}
          />
          <p className="mt-5 max-w-[54ch] text-cream/70">
            Tell us your department, class year, and timeframe.{" "}
            {FLAGSHIP.title} runs as a single session, and more workshops are on
            the way.
          </p>
          <Rise delay={0.2} className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact" variant="gold">
              Request a workshop
            </Button>
            <Button href="/framework" variant="ghost-light">
              See all five pillars
            </Button>
          </Rise>
        </Container>
      </Section>
    </>
  );
}
