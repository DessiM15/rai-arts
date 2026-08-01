import type { Metadata } from "next";
import { FLAGSHIP } from "@/lib/content";
import { SITE } from "@/lib/site";
import { Button, Container, Section } from "@/components/ui";
import { Label, Lines, Rise, Words } from "@/components/Reveal";

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

      {/* the session */}
      <Container className="pb-20 sm:pb-28">
        <div className="grid overflow-hidden rounded-sm border border-forest/12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="bg-white/55 p-7 sm:p-10">
            <span className="inline-block rounded-sm bg-sand px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-forest">
              {FLAGSHIP.flag}
            </span>
            <h2 className="font-display mt-5 text-[length:var(--text-step-2)]">
              {FLAGSHIP.title}
            </h2>
            <p className="mt-2 italic text-ink-soft">{FLAGSHIP.subtitle}</p>
            <p className="mt-5 max-w-[58ch] text-[0.95rem] leading-relaxed text-ink-soft">
              {FLAGSHIP.summary}
            </p>

            <h3 className="mt-9 font-medium">By the end, students can:</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {FLAGSHIP.outcomes.map((o, i) => (
                <li key={i} className="flex gap-3.5 text-[0.92rem] leading-relaxed">
                  <span
                    aria-hidden="true"
                    className="mt-[0.62em] h-[0.38em] w-[0.38em] flex-none rounded-full bg-gold"
                  />
                  <span>{o}</span>
                </li>
              ))}
            </ul>

            <dl className="mt-9 grid gap-5 border-t border-forest/12 pt-6 sm:grid-cols-3">
              {[
                ["Length", FLAGSHIP.length],
                ["For", FLAGSHIP.audience],
                ["Format", FLAGSHIP.format],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink-soft">
                    {k}
                  </dt>
                  <dd className="mt-1.5 text-[0.88rem]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="on-dark bg-forest p-7 text-cream sm:p-10">
            <p className="label">Inside the session</p>
            <ol className="mt-6 flex flex-col gap-5">
              {FLAGSHIP.agenda.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="mt-0.5 grid h-7 w-7 flex-none place-items-center rounded-full bg-gold/20 font-mono text-[0.66rem] text-gold">
                    {i + 1}
                  </span>
                  <span className="text-[0.9rem] leading-relaxed text-cream/85">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
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
