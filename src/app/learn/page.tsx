import type { Metadata } from "next";
import { LEARN } from "@/lib/content";
import { Button, Container, PageHero, Section } from "@/components/ui";
import { Label, Lines, Rise } from "@/components/Reveal";
import { SectionHead } from "@/components/editorial";
import EbookCover from "@/components/EbookCover";
import NewsletterForm from "@/components/NewsletterForm";
import SubstackRail from "@/components/SubstackRail";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Free to follow, three ways to learn: the Rai Arts ebook, the newsletter, and Kira's essays on Substack. Writing on money, work, identity, and the career around the art.",
  alternates: { canonical: "/learn" },
};

export default function Learn() {
  return (
    <>
      {/* ── hero ── */}
      <PageHero
        label="Learn"
        lines={["Free to follow,", "three ways to learn."]}
        headingClassName="max-w-[14ch]"
        intro={[
          "You don't need a program to bring Rai Arts in to start learning.",
          "The ebook, the newsletter, and the essays cover the same ground the workshops do.",
        ]}
        introClassName="max-w-none"
      />

      {/* ── 01 ebook ── */}
      <Container id="ebook" className="scroll-mt-20 py-20 sm:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <SectionHead
              index="01"
              label="Ebook"
              lines={[LEARN.ebook.title]}
              body={LEARN.ebook.body}
            >
              <Button href={LEARN.ebook.href} variant="gold" external>
                {LEARN.ebook.cta}
              </Button>
            </SectionHead>
          </div>
          <Rise delay={0.1} className="mx-auto w-full max-w-[22rem] lg:max-w-[30rem]">
            <EbookCover />
          </Rise>
        </div>
      </Container>

      {/* ── 02 newsletter ── */}
      <Section id="newsletter" className="scroll-mt-20 bg-tan py-20 sm:py-28">
        <Container className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHead
              index="02"
              label="Newsletter"
              lines={["The newsletter."]}
              body={LEARN.newsletter.body}
            />
          </div>
          <Rise delay={0.1}>
            <div className="grain relative isolate rounded-sm border border-forest/15 bg-cream/70 p-8 sm:p-10">
              <h3 className="font-statement text-[length:var(--text-step-2)]">
                Get the next one.
              </h3>
              <p className="mt-4 max-w-[36ch] text-ink-soft">
                Free, occasional, and easy to leave.
              </p>
              <NewsletterForm dark={false} />
            </div>
          </Rise>
        </Container>
      </Section>

      {/* ── 03 substack ── */}
      {/* Kept tight on purpose: the heading, the rail, and the button are
          meant to fit in one screen on a laptop. */}
      <Container id="substack" className="scroll-mt-20 py-12 sm:py-14">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-baseline justify-center gap-5">
            <span
              aria-hidden="true"
              className="font-statement text-[length:var(--text-step-2)] leading-none text-gold-deep/40"
            >
              03
            </span>
            <Label>Substack</Label>
          </div>
          <Lines
            as="h2"
            className="font-statement mt-4 text-[length:var(--text-step-2)]"
            lines={["Honest writing about dance,", "and the career around it."]}
          />
          <p className="mt-3 text-[length:var(--text-step-0)] text-ink-soft">
            {LEARN.substack.body}
          </p>
        </div>
        <p className="mt-5 text-right font-mono text-[0.6rem] tracking-[0.2em] text-ink-soft uppercase">
          Scroll sideways →
        </p>
        <div className="mt-2">
          <SubstackRail articles={LEARN.substack.articles} />
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          <Button href={LEARN.substack.href} external>
            {LEARN.substack.cta}
          </Button>
        </div>
      </Container>

      {/* ── eventually ── */}
      <Container className="pb-20 sm:pb-28">
        <div className="flex flex-col gap-3 border-t border-forest/12 pt-6 sm:flex-row sm:items-baseline sm:gap-8">
          <span className="font-mono text-[0.6rem] tracking-[0.2em] text-gold-deep uppercase">
            {LEARN.toolkit.label}
          </span>
          <p className="text-[0.95rem] text-ink-soft">{LEARN.toolkit.text}</p>
        </div>
      </Container>
    </>
  );
}
