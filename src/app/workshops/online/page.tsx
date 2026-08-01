import type { Metadata } from "next";
import { ONLINE_DRAFT } from "@/lib/content";
import { Container, Section } from "@/components/ui";
import { Label, Lines, Rise, Words } from "@/components/Reveal";
import { Dancer } from "@/components/Marks";
import WaitlistForm from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: "Online workshops",
  description:
    "The Rai Arts Career Readiness Framework is coming online, with self-paced modules and live sessions for dancers. Join the list to hear when enrolment opens.",
  alternates: { canonical: "/workshops/online" },
};

export default function Online() {
  return (
    <>
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <Label>Workshops · Online</Label>
        <Lines
          as="h1"
          className="font-display mt-5 max-w-4xl text-[length:var(--text-step-3)]"
          lines={[ONLINE_DRAFT.heading]}
        />
        <Words
          className="mt-7 max-w-[56ch] text-ink-soft"
          text={ONLINE_DRAFT.body}
        />
      </Container>

      <Container className="pb-20 sm:pb-28">
        <div className="grid items-stretch gap-5 lg:grid-cols-[1fr_0.85fr]">
          <Rise className="rounded-sm border border-forest/12 bg-white/55 p-8 sm:p-10">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-gold-deep">
              Opening soon
            </span>
            <h2 className="font-display-sm mt-4 text-[length:var(--text-step-1)]">
              What&apos;s coming
            </h2>
            <ul className="mt-6 flex flex-col gap-3.5">
              {ONLINE_DRAFT.bullets.map((b, i) => (
                <li key={i} className="flex gap-3.5 leading-relaxed">
                  <span
                    aria-hidden="true"
                    className="mt-[0.62em] h-[0.38em] w-[0.38em] flex-none rounded-full bg-gold-deep"
                  />
                  <span className="text-[0.94rem] text-ink-soft">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9 border-t border-forest/12 pt-8">
              <h3 className="font-display-sm text-[1.1rem]">
                Hear it first
              </h3>
              <p className="mt-2 max-w-[44ch] text-[0.9rem] text-ink-soft">
                One email when enrolment opens. Nothing else.
              </p>
              <WaitlistForm />
            </div>
          </Rise>

          <Rise
            delay={0.1}
            className="relative grid min-h-[320px] place-items-center overflow-hidden rounded-sm bg-forest"
          >
            <div
              aria-hidden="true"
              className="absolute -right-[18%] -top-[18%] aspect-square w-[55%] rounded-full bg-gold/85"
            />
            <Dancer
              className="relative w-[58%] text-cream/90"
              strokeWidth={9}
            />
          </Rise>
        </div>
      </Container>

      <Section dark className="bg-forest-deep py-16 sm:py-20">
        <Container>
          <p className="max-w-[62ch] text-cream/70">
            In the meantime, the full framework is available as an in-person
            workshop for college and university programs, and the career guide
            covers the same ground at your own pace.
          </p>
          <div className="mt-7 flex flex-wrap gap-6">
            <a
              href="/workshops/college"
              className="inline-flex min-h-[44px] items-center font-mono text-[0.66rem] uppercase tracking-[0.16em] text-gold underline underline-offset-4"
            >
              College workshops
            </a>
            <a
              href="/shop"
              className="inline-flex min-h-[44px] items-center font-mono text-[0.66rem] uppercase tracking-[0.16em] text-gold underline underline-offset-4"
            >
              The career guide
            </a>
          </div>
        </Container>
      </Section>
    </>
  );
}
