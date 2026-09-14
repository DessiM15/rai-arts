import type { Metadata } from "next";
import { CONSULTING } from "@/lib/content";
import { SITE } from "@/lib/site";
import { Button, Container, PageHero, Section } from "@/components/ui";
import { Lines, Rise } from "@/components/Reveal";
import { SectionHead, Steps } from "@/components/editorial";
import TopicPicker from "@/components/TopicPicker";

export const metadata: Metadata = {
  title: "Consulting",
  description:
    "Rai Arts partners with schools, studios, companies, and universities to deliver career-readiness education for dancers: single workshops, multi-session programs, intensives, and ongoing series built from the Career Readiness Framework.",
  alternates: { canonical: "/services/consulting" },
};

const SERVICE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Rai Arts Consulting",
  serviceType: "Career readiness education for dancers",
  description: CONSULTING.intro,
  provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
  areaServed: "US",
  audience: {
    "@type": "Audience",
    audienceType: "Dance schools, studios, companies, and universities",
  },
};

export default function Consulting() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_JSONLD) }}
      />

      {/* ── hero ── */}
      <PageHero
        label="Services · Consulting"
        lines={["Consulting."]}
        intro={CONSULTING.intro}
        introClassName="max-w-[58ch]"
      >
        {CONSULTING.paragraphs.map((p, i) => (
          <Rise key={i} delay={0.2 + i * 0.08}>
            <p className="mt-5 max-w-[58ch] text-[length:var(--text-step-0)] leading-[1.7] text-cream/75">
              {p}
            </p>
          </Rise>
        ))}
      </PageHero>

      {/* ── flexible by design ── */}
      <Section dark className="py-16 sm:py-20">
        <Container className="flex flex-col items-center text-center">
          <Lines
            as="h2"
            className="font-statement text-[length:var(--text-step-3)]"
            lines={[CONSULTING.flexible.heading]}
          />
          <p className="mt-6 max-w-[48ch] text-[length:var(--text-step-1)] leading-snug text-cream/75">
            {CONSULTING.flexible.body}
          </p>
        </Container>
      </Section>

      {/* ── formats ── */}
      <Container className="py-20 sm:py-28">
        <SectionHead index="01" label="Hire Rai Arts for" lines={["Five ways", "to run it."]} />
        <div className="mt-12">
          <Steps items={CONSULTING.formats} />
        </div>
      </Container>

      {/* ── build your program ── */}
      <Section className="bg-sand py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <SectionHead
                index="02"
                label="Workshop topics"
                lines={[CONSULTING.build.heading]}
                body={CONSULTING.build.body}
              />
            </div>
            <Rise delay={0.1} className="lg:pt-24">
              <TopicPicker topics={CONSULTING.build.topics} more={CONSULTING.build.more} />
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
            lines={["Tell us what", "you're looking for."]}
            body={CONSULTING.close}
          >
            <Button href="/contact" variant="gold">
              Schedule a consultation
            </Button>
            <Button href="/framework" variant="ghost-light">
              See the framework
            </Button>
          </SectionHead>
        </Container>
      </Section>
    </>
  );
}
