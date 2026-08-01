import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { Container, Section } from "@/components/ui";
import { Label, Lines, Rise, Words } from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Get in touch",
  description:
    "Book a Rai Arts career workshop for your dance program, ask a question, or get the career guide. We reply within a couple of days.",
  alternates: { canonical: "/contact" },
};

const ANSWERS = [
  ["Who it's for", "College and university dance programs, pre-professional schools, and companies with training arms."],
  ["Group size", "Ten to thirty and up. Larger lectures work; small cohorts get more workshop time."],
  ["Lead time", "A few weeks is usually plenty. Semester-long capstones need more planning."],
  ["Reply time", "Within a couple of days."],
];

export default function Contact() {
  return (
    <>
      <Container className="pt-32 pb-14 sm:pt-40 sm:pb-16">
        <Label>Get in touch</Label>
        <Lines
          as="h1"
          className="font-display mt-5 max-w-4xl text-[length:var(--text-step-3)]"
          lines={["Have a program,", "a question, or", "want the guide?"]}
        />
        <Words
          className="mt-7 max-w-[54ch] text-ink-soft"
          text="Whether it's booking a workshop for your dance program or grabbing the career guide, reach out and Kira will get back to you within a couple of days."
        />
      </Container>

      <Container className="grid gap-12 pb-20 sm:pb-28 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
        <Rise>
          <ContactForm />
        </Rise>

        <Rise delay={0.1}>
          <div className="rounded-sm bg-sand/60 p-7">
            <h2 className="font-display-sm text-[length:var(--text-step-1)]">
              Before you write
            </h2>
            <dl className="mt-6 flex flex-col gap-5">
              {ANSWERS.map(([q, a]) => (
                <div key={q}>
                  <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-gold-deep">
                    {q}
                  </dt>
                  <dd className="mt-1.5 text-[0.9rem] leading-relaxed text-ink-soft">
                    {a}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-7 border-t border-forest/12 pt-5 text-[0.88rem] text-ink-soft">
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
      </Container>

      <Section dark className="bg-forest-deep py-16 text-center sm:py-20">
        <Container>
          <p className="font-display-sm mx-auto max-w-[40ch] text-[length:var(--text-step-1)] text-gold">
            {SITE.tagline}
          </p>
        </Container>
      </Section>
    </>
  );
}
