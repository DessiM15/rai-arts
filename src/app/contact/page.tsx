import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { Container, PageHero } from "@/components/ui";
import { Rise } from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a free consultation with Rai Arts, bring a career-readiness workshop to your dancers, or ask a question. We reply within a couple of days.",
  alternates: { canonical: "/contact" },
};

const ANSWERS: [string, string][] = [
  [
    "Who it's for",
    "Individuals, companies, schools, studios, universities, and pre-professional programs.",
  ],
  [
    "Lead time",
    "A few weeks is usually plenty. Multi-day intensives and ongoing series need more planning.",
  ],
  ["Reply time", "Within a couple of days, from Kira directly."],
];

export default function Contact() {
  return (
    <>
      <PageHero
        label="Contact"
        lines={["Have a program,", "a question, or", "an idea?"]}
        headingClassName="max-w-[13ch]"
        intro="Whether it's booking a workshop for your dancers or scheduling a free consultation, reach out and Kira will get back to you within a couple of days."
        introClassName="max-w-[52ch]"
      />

      <Container className="pt-16 pb-24 sm:pt-20 sm:pb-32">
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
    </>
  );
}
