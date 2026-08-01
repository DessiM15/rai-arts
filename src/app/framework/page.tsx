import type { Metadata } from "next";
import { PILLARS } from "@/lib/content";
import { SITE } from "@/lib/site";
import { Button, Container, Section } from "@/components/ui";
import { Label, Lines, Rise, Words } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "The Career Readiness Framework",
  description:
    "The Rai Arts Career Readiness Framework™ — the signature curriculum built on five pillars: career foundations, business, financial, professional, and longevity readiness.",
  alternates: { canonical: "/framework" },
};

const COURSE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "The Rai Arts Career Readiness Framework™",
  description:
    "A five-pillar curriculum preparing dancers for the business of a dance career: career foundations, business readiness, financial readiness, professional readiness, and longevity readiness.",
  provider: {
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
  },
  educationalLevel: "Undergraduate",
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
  },
  teaches: PILLARS.map((p) => p.title),
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "onsite",
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

      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <Label>The framework</Label>
        <Lines
          as="h1"
          className="font-display mt-5 max-w-4xl text-[length:var(--text-step-3)]"
          lines={["The Rai Arts Career", "Readiness Framework™"]}
        />
        <Words
          className="mt-7 max-w-[58ch] text-ink-soft"
          text="Our signature curriculum — everything a dancer needs to enter and navigate the profession with confidence, built on five pillars of readiness. Take one pillar as a standalone workshop, a themed series, or the whole framework as a semester-long capstone."
        />
        <Rise delay={0.4} className="mt-9 flex flex-wrap gap-3">
          <Button href="/contact">Bring it to your program</Button>
          <Button href="/workshops" variant="ghost">
            See workshop formats
          </Button>
        </Rise>
      </Container>

      {/* Each pillar gets the full width of the screen in turn */}
      {PILLARS.map((p, i) => {
        const dark = i % 2 === 1;
        return (
          <Section
            key={p.n}
            dark={dark}
            className={dark ? "py-16 sm:py-24" : "bg-sand/45 py-16 sm:py-24"}
          >
            <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <div>
                <span
                  className={`font-display text-[length:var(--text-step-3)] ${dark ? "text-gold" : "text-gold-deep"}`}
                >
                  {p.n}
                </span>
                <Lines
                  as="h2"
                  className="font-display mt-2 text-[length:var(--text-step-2)]"
                  lines={[p.title]}
                />
                <p
                  className={`mt-4 max-w-[38ch] text-[1.02rem] italic ${dark ? "text-cream/70" : "text-ink-soft"}`}
                >
                  {p.question}
                </p>
              </div>

              <div>
                <p
                  className={`text-[0.98rem] leading-relaxed ${dark ? "text-cream/80" : "text-ink-soft"}`}
                >
                  {p.body}
                </p>
                <ul className="mt-7 flex flex-col gap-3">
                  {p.covers.map((c, j) => (
                    <Rise key={j} delay={j * 0.05}>
                      <li className="flex gap-3.5 text-[0.92rem] leading-relaxed">
                        <span
                          aria-hidden="true"
                          className={`mt-[0.62em] h-[0.38em] w-[0.38em] flex-none rounded-full ${dark ? "bg-gold" : "bg-gold-deep"}`}
                        />
                        <span className={dark ? "text-cream/80" : "text-ink"}>
                          {c}
                        </span>
                      </li>
                    </Rise>
                  ))}
                </ul>
              </div>
            </Container>
          </Section>
        );
      })}

      <Section dark className="bg-forest-deep py-24 text-center sm:py-32">
        <Container className="flex flex-col items-center">
          <Label>Next step</Label>
          <Lines
            as="h2"
            className="font-display mt-6 text-[length:var(--text-step-2)]"
            lines={["One workshop, a series,", "or the full capstone."]}
          />
          <p className="mt-6 max-w-[48ch] text-cream/70">
            Tell us your department, class year, and timeframe, and we&apos;ll
            put together the shape that fits your program.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="gold">
              Request a workshop
            </Button>
            <Button href="/shop" variant="ghost-light">
              Get the career guide
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
