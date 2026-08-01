import type { Metadata } from "next";
import { FLAGSHIP } from "@/lib/content";
import { SITE } from "@/lib/site";
import { Button, Container, Section } from "@/components/ui";
import { Label, Lines, Rise, Words } from "@/components/Reveal";
import { SectionHead, Steps } from "@/components/editorial";
import Playbill from "@/components/Playbill";
import Marquee from "@/components/Marquee";
import Statement from "@/components/Statement";

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

const HOW = [
  {
    title: "Tell us the room",
    body: "Department, class year, group size, and roughly when. A sentence is enough to start.",
  },
  {
    title: "We shape the session",
    body: "The flagship as it stands, a pillar chosen for your cohort, or a series across the semester.",
  },
  {
    title: "Rai Arts comes to campus",
    body: "Delivered as a guest lecture or class visit, with worksheets students keep afterwards.",
  },
];

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
          className="font-statement mt-6 max-w-[14ch] text-[length:var(--text-step-5)]"
          lines={["For college and", "university programs."]}
        />
        <Words
          className="mt-8 max-w-[54ch] text-[length:var(--text-step-0)] text-ink-soft"
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

      <Statement
        kicker="Why this session first"
        lines={["Most students picture", "the same three jobs."]}
        footnote="More Than a Dancer exists to widen that picture before graduation, not after it."
      />

      {/* how booking works */}
      <Container className="py-20 sm:py-28">
        <SectionHead
          index="01"
          label="How it works"
          lines={["Three steps", "to a booking."]}
        />
        <div className="mt-12">
          <Steps items={HOW} />
        </div>
      </Container>

      <Section dark className="bg-forest-deep py-24 sm:py-32">
        <Container className="flex flex-col items-center text-center">
          <SectionHead
            label="Bring it in"
            align="center"
            dark
            lines={["Bringing Rai Arts", "to your program?"]}
            body={`Tell us your department, class year, and timeframe. ${FLAGSHIP.title} runs as a single session, and more workshops are on the way.`}
          >
            <Button href="/contact" variant="gold">
              Request a workshop
            </Button>
            <Button href="/framework" variant="ghost-light">
              See all five pillars
            </Button>
          </SectionHead>
        </Container>
      </Section>
    </>
  );
}
