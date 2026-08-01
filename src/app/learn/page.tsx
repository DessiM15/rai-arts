import type { Metadata } from "next";
import { GUIDE, LEARN } from "@/lib/content";
import { Button, Container, Section } from "@/components/ui";
import { Label, Lines, Rise, Words } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "The Rai Arts podcast and newsletter: conversations and writing on building a sustainable career in dance. Both free to follow.",
  alternates: { canonical: "/learn" },
};

export default function Learn() {
  return (
    <>
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <Label>Learn</Label>
        <Lines
          as="h1"
          className="font-display mt-5 max-w-4xl text-[length:var(--text-step-3)]"
          lines={["Free to follow,", "wherever you are", "in the career."]}
        />
        <Words
          className="mt-7 max-w-[56ch] text-ink-soft"
          text="You don't need a program to bring Rai Arts in to start learning. The podcast and newsletter cover the same ground the workshops do: what the work pays, how to find it, and how to make it last."
        />
      </Container>

      <Container className="pb-20 sm:pb-28">
        <div className="grid gap-5 lg:grid-cols-2">
          <Rise>
            <article className="flex h-full flex-col justify-between gap-10 rounded-sm bg-forest p-8 text-cream sm:p-10">
              <div>
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-gold">
                  Podcast
                </span>
                <h2 className="font-display mt-4 text-[length:var(--text-step-2)]">
                  {LEARN.podcast.title}
                </h2>
                <p className="mt-4 max-w-[40ch] leading-relaxed text-cream/75">
                  {LEARN.podcast.body}
                </p>
              </div>
              <div className="flex items-end justify-between gap-6">
                <Button href={LEARN.podcast.href} variant="gold" external>
                  {LEARN.podcast.cta}
                </Button>
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 100 100"
                  fill="none"
                  aria-hidden="true"
                  className="hidden text-gold/70 sm:block"
                >
                  <path d="M28 18 L82 50 L28 82 Z" fill="currentColor" />
                </svg>
              </div>
            </article>
          </Rise>

          <Rise delay={0.08}>
            <article className="flex h-full flex-col justify-between gap-10 rounded-sm border border-forest/15 bg-white/55 p-8 sm:p-10">
              <div>
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-gold-deep">
                  Newsletter
                </span>
                <h2 className="font-display mt-4 text-[length:var(--text-step-2)]">
                  {LEARN.newsletter.title}
                </h2>
                <p className="mt-4 max-w-[40ch] leading-relaxed text-ink-soft">
                  {LEARN.newsletter.body}
                </p>
              </div>
              <Button href={LEARN.newsletter.href} external>
                {LEARN.newsletter.cta}
              </Button>
            </article>
          </Rise>
        </div>
      </Container>

      <Section dark className="py-20 sm:py-28">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <Label>Go deeper</Label>
            <Lines
              as="h2"
              className="font-display mt-5 text-[length:var(--text-step-2)]"
              lines={[GUIDE.title]}
            />
            <p className="mt-5 max-w-[48ch] text-cream/70">{GUIDE.body}</p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Button href="/shop" variant="gold">
                Get the guide for {GUIDE.price}
              </Button>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-cream/50">
                {GUIDE.format}
              </span>
            </div>
          </div>

          <ul className="flex flex-col gap-3 border-t border-cream/15 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            {GUIDE.includes.map((inc, i) => (
              <Rise key={i} delay={i * 0.05}>
                <li className="flex gap-3.5 text-[0.9rem] leading-relaxed text-cream/80">
                  <span
                    aria-hidden="true"
                    className="mt-[0.62em] h-[0.38em] w-[0.38em] flex-none rounded-full bg-gold"
                  />
                  <span>{inc}</span>
                </li>
              </Rise>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
