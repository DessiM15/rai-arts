import type { Metadata } from "next";
import { GUIDE, LEARN } from "@/lib/content";
import { Button, Container, Section } from "@/components/ui";
import { Label, Lines, Rise, Words } from "@/components/Reveal";
import { SectionHead } from "@/components/editorial";
import Marquee from "@/components/Marquee";
import Statement from "@/components/Statement";
import ArtPanel from "@/components/ArtPanel";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "The Rai Arts podcast and newsletter: conversations and writing on building a sustainable career in dance. Both free to follow.",
  alternates: { canonical: "/learn" },
};

export default function Learn() {
  return (
    <>
      <Container className="pt-32 pb-14 sm:pt-40 sm:pb-20">
        <Label>Learn</Label>
        <Lines
          as="h1"
          className="font-statement mt-6 max-w-[13ch] text-[length:var(--text-step-5)]"
          lines={["Free to follow,", "wherever you are", "in the career."]}
        />
        <Words
          className="mt-8 max-w-[54ch] text-[length:var(--text-step-0)] text-ink-soft"
          text="You don't need a program to bring Rai Arts in to start learning. The ebooks, podcast, and newsletter cover the same ground the workshops do: what the work pays, how to find it, and how to make it last."
        />
      </Container>

      <Marquee items={["The podcast", "The newsletter", "The ebooks"]} />

      {/* ── podcast ── */}
      <Section dark className="py-20 sm:py-28 lg:py-32">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <SectionHead
              index="01"
              label="Podcast"
              dark
              lines={["The Rai Arts", "podcast."]}
              body={LEARN.podcast.body}
            >
              <Button href={LEARN.podcast.href} variant="gold" external>
                {LEARN.podcast.cta}
              </Button>
            </SectionHead>
          </div>
          <Rise delay={0.1}>
            <div className="grain relative isolate grid aspect-[4/3] place-items-center overflow-hidden rounded-sm bg-forest-mid">
              <svg
                width="120"
                height="120"
                viewBox="0 0 100 100"
                fill="none"
                aria-hidden="true"
                className="relative z-[2] text-gold"
              >
                <path d="M28 18 L82 50 L28 82 Z" fill="currentColor" />
              </svg>
            </div>
          </Rise>
        </Container>
      </Section>

      {/* ── newsletter ── */}
      <Container className="py-20 sm:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Rise>
            <ArtPanel
              ratio="1/1"
              src="/images/nyc-street.jpg"
              alt="A New York street"
              caption="Free on Substack"
            />
          </Rise>
          <div>
            <SectionHead
              index="02"
              label="Newsletter"
              lines={["The newsletter."]}
              body={LEARN.newsletter.body}
            >
              <Button href={LEARN.newsletter.href} external>
                {LEARN.newsletter.cta}
              </Button>
            </SectionHead>
          </div>
        </div>
      </Container>

      <Statement
        kicker="Why it's free"
        lines={["Not every dancer", "has a department", "behind them."]}
        footnote="The workshops reach the students whose programs book them. The podcast and newsletter reach everyone else."
      />

      {/* ── the guide ── */}
      <Container className="py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <SectionHead
              index="03"
              label="Go deeper"
              lines={[GUIDE.title]}
              body={GUIDE.body}
            >
              <Button href="/shop" variant="gold">
                Ebooks — {GUIDE.price}
              </Button>
            </SectionHead>
          </div>

          <ul className="flex flex-col">
            {GUIDE.includes.map((inc, i) => (
              <li
                key={i}
                className="flex gap-5 border-t border-forest/12 py-4 text-[0.95rem] leading-relaxed text-ink-soft"
              >
                <span className="font-mono text-[0.6rem] text-gold-deep/70 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{inc}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </>
  );
}
