import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { Container, Section } from "@/components/ui";
import { Label, Lines, Rise, Words } from "@/components/Reveal";
import { Stats } from "@/components/editorial";
import ContactForm from "@/components/ContactForm";
import Marquee from "@/components/Marquee";

export const metadata: Metadata = {
  title: "Get in touch",
  description:
    "Book a Rai Arts career workshop for your dance program, ask a question, or get the career guide. We reply within a couple of days.",
  alternates: { canonical: "/contact" },
};

const ANSWERS: [string, string][] = [
  [
    "Who it's for",
    "College and university dance programs, pre-professional schools, and companies with training arms.",
  ],
  [
    "Group size",
    "Ten to thirty and up. Larger lectures work; small cohorts get more workshop time.",
  ],
  [
    "Lead time",
    "A few weeks is usually plenty. Semester-long capstones need more planning.",
  ],
  ["Reply time", "Within a couple of days, from Kira directly."],
];

export default function Contact() {
  return (
    <>
      <Container className="pt-32 pb-14 sm:pt-40 sm:pb-16">
        <Label>Get in touch</Label>
        <Lines
          as="h1"
          className="font-statement mt-6 max-w-[13ch] text-[length:var(--text-step-5)]"
          lines={["Have a program,", "a question, or", "want the guide?"]}
        />
        <Words
          className="mt-8 max-w-[52ch] text-[length:var(--text-step-0)] text-ink-soft"
          text="Whether it's booking a workshop for your dance program or grabbing the career guide, reach out and Kira will get back to you within a couple of days."
        />
      </Container>

      <Marquee items={["Book a workshop", "Ask a question", "Get the guide"]} speed={30} />

      <Container className="py-16 sm:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_0.7fr] lg:gap-20">
          <Rise>
            <ContactForm />
          </Rise>

          <Rise delay={0.1}>
            <div className="grain relative isolate rounded-sm bg-sand/70 p-8">
              <h2 className="font-statement text-[length:var(--text-step-2)]">
                Before you write.
              </h2>
              <dl className="mt-8 flex flex-col">
                {ANSWERS.map(([q, a]) => (
                  <div key={q} className="border-t border-forest/15 py-5">
                    <dt className="font-mono text-[0.6rem] tracking-[0.16em] text-gold-deep uppercase">
                      {q}
                    </dt>
                    <dd className="mt-2 text-[0.92rem] leading-relaxed text-ink-soft">
                      {a}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 border-t border-forest/15 pt-5 text-[0.9rem] text-ink-soft">
                Prefer email?{" "}
                <a
                  href={`mailto:${SITE.email}`}
                  className="underline underline-offset-4"
                >
                  {SITE.email}
                </a>
              </p>
            </div>
          </Rise>
        </div>
      </Container>

      <Section dark className="py-20 sm:py-24">
        <Container>
          <Stats
            dark
            items={[
              ["5", "Pillars of readiness"],
              ["60–90", "Minutes per session"],
              ["2 days", "Typical reply time"],
            ]}
          />
          <p className="font-statement mt-16 text-center text-[length:var(--text-step-3)] text-gold">
            {SITE.tagline}
          </p>
        </Container>
      </Section>
    </>
  );
}
