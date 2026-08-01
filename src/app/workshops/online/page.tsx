import type { Metadata } from "next";
import { ONLINE_DRAFT } from "@/lib/content";
import { Button, Container, Section } from "@/components/ui";
import { Label, Lines, Rise, Words } from "@/components/Reveal";
import { SectionHead } from "@/components/editorial";
import WaitlistForm from "@/components/WaitlistForm";
import Marquee from "@/components/Marquee";
import Statement from "@/components/Statement";
import ArtPanel from "@/components/ArtPanel";

export const metadata: Metadata = {
  title: "Online workshops",
  description:
    "The Rai Arts Career Readiness Framework is coming online, with self-paced modules and live sessions for dancers. Join the list to hear when enrolment opens.",
  alternates: { canonical: "/workshops/online" },
};

export default function Online() {
  return (
    <>
      <Container className="grid items-end gap-10 pt-32 pb-14 sm:pt-40 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-20">
        <div>
          <Label>Workshops · Online</Label>
          <Lines
            as="h1"
            className="font-statement mt-6 text-[length:var(--text-step-5)]"
            lines={["Rai Arts,", "online."]}
          />
          <Words
            className="mt-8 max-w-[50ch] text-[length:var(--text-step-0)] text-ink-soft"
            text={ONLINE_DRAFT.body}
          />
        </div>
        <Rise delay={0.15}>
          <ArtPanel
            ratio="4/5"
            src="/images/studio-interior.jpg"
            alt="An empty dance studio"
            caption="Opening soon"
          />
        </Rise>
      </Container>

      <Marquee items={["Opening soon", "Join the list"]} speed={26} />

      {/* what's coming + waitlist */}
      <Container className="py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <SectionHead
              index="01"
              label="What's coming"
              lines={["Built to work", "on your own time."]}
            />
            <ul className="mt-10 flex flex-col">
              {ONLINE_DRAFT.bullets.map((b, i) => (
                <li
                  key={i}
                  className="flex gap-5 border-t border-forest/12 py-5 sm:gap-8"
                >
                  <span className="font-mono text-[0.62rem] text-gold-deep/70 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[1rem] leading-relaxed text-ink-soft">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <Rise delay={0.1}>
            <div className="grain relative isolate rounded-sm bg-sand/70 p-8 sm:p-10">
              <h2 className="font-statement text-[length:var(--text-step-2)]">
                Hear it first.
              </h2>
              <p className="mt-4 max-w-[38ch] text-ink-soft">
                One email when enrolment opens. Nothing else, ever.
              </p>
              <WaitlistForm />
            </div>
          </Rise>
        </div>
      </Container>

      <Statement
        kicker="In the meantime"
        lines={["The framework", "already travels."]}
        footnote="The full curriculum runs today as an in-person workshop for college and university programs, and the career guide covers the same ground at your own pace."
      />

      <Section dark className="bg-forest-deep py-20 sm:py-24">
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-[44ch] text-cream/70">
            Not waiting? Bring the framework to your program now, or take the
            guide with you today.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/workshops/college" variant="gold">
              College workshops
            </Button>
            <Button href="/shop" variant="ghost-light">
              The career guide
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
