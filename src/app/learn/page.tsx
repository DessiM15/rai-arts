import type { Metadata } from "next";
import { LEARN } from "@/lib/content";
import { Button, Container, PageHero, Section } from "@/components/ui";
import { Rise } from "@/components/Reveal";
import { SectionHead } from "@/components/editorial";
import LearnTiles, { EbookTile } from "@/components/LearnTiles";
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
        intro="You don't need a program to bring Rai Arts in to start learning. The ebook, the newsletter, and the essays cover the same ground the workshops do."
      />
      <Container className="pt-14 pb-14 sm:pt-20 sm:pb-20">
        <Rise delay={0.2}>
          <LearnTiles />
        </Rise>
      </Container>

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
          <Rise delay={0.1} className="mx-auto w-full max-w-[22rem] lg:max-w-none">
            <EbookTile href={LEARN.ebook.href} />
          </Rise>
        </div>
      </Container>

      {/* ── 02 newsletter ── */}
      <Section dark id="newsletter" className="scroll-mt-20 py-20 sm:py-28">
        <Container className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHead
              index="02"
              label="Newsletter"
              dark
              lines={["The newsletter."]}
              body={LEARN.newsletter.body}
            />
          </div>
          <Rise delay={0.1}>
            <div className="grain relative isolate rounded-sm border border-cream/15 bg-forest-mid p-8 sm:p-10">
              <h3 className="font-statement text-[length:var(--text-step-2)]">
                Get the next one.
              </h3>
              <p className="mt-4 max-w-[36ch] text-cream/70">
                Free, occasional, and easy to leave.
              </p>
              <NewsletterForm dark />
            </div>
          </Rise>
        </Container>
      </Section>

      {/* ── 03 substack ── */}
      <Container id="substack" className="scroll-mt-20 py-20 sm:py-28">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead
            index="03"
            label="Substack"
            lines={["Honest writing about", "dance, and the", "career around it."]}
            body={LEARN.substack.body}
          />
          <p className="font-mono text-[0.6rem] tracking-[0.2em] text-ink-soft uppercase lg:pb-2">
            Scroll sideways →
          </p>
        </div>
        <div className="mt-12">
          <SubstackRail articles={LEARN.substack.articles} />
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-4">
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
