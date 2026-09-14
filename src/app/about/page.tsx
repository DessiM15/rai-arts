import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { PILLARS, STORY } from "@/lib/content";
import { Button, Container, PageHero, Section } from "@/components/ui";
import { Label } from "@/components/Reveal";
import { SectionHead } from "@/components/editorial";
import OurStory from "@/components/OurStory";
import QuestionStrip from "@/components/QuestionStrip";

export const metadata: Metadata = {
  title: "About",
  description:
    "Rai Arts was founded by Kira Rai Daniel to close the gap between dance training and the business of a dance career. Our story, and why the work exists.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <>
      {/* ── hero ── */}
      <PageHero
        label="About"
        lines={["From the studio", "to the front of the room."]}
        headingClassName="max-w-[24ch]"
      />

      {/* ── our story ── */}
      <Container id="our-story" className="scroll-mt-24 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <Label className="mb-10">Our story</Label>
        <OurStory
          intro={STORY.intro}
          chapters={STORY.chapters}
          photo={{ src: "/images/kira.jpg", alt: `${SITE.founder}, founder of Rai Arts` }}
          caption={`${SITE.founder} · Founder`}
        />
      </Container>

      {/* ── the five questions, as a strip ── */}
      <QuestionStrip pillars={PILLARS} />

      {/* ── cta ── */}
      <Section className="py-24 sm:py-32">
        <Container className="flex flex-col items-center text-center">
          <SectionHead
            label="Work with us"
            align="center"
            lines={["Bring Rai Arts", "to your community."]}
            body="Tell us who you're serving and what you want them to walk away knowing, and we'll come back with a program that fits."
          >
            <Button href="/contact" variant="gold">
              Book a consultation
            </Button>
            <Button href={`mailto:${SITE.email}`} variant="ghost" external>
              {SITE.email}
            </Button>
          </SectionHead>
        </Container>
      </Section>
    </>
  );
}
