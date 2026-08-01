import type { Metadata } from "next";
import Image from "next/image";
import { SITE } from "@/lib/site";
import { Button, Container, Section } from "@/components/ui";
import { Label, Lines, Rise, Words } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Founders",
  description: `${SITE.founder} founded Rai Arts to give dancers the language, tools, and confidence to build a sustainable career in the arts.`,
  alternates: { canonical: "/founders" },
};

const PERSON_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.founder,
  jobTitle: "Founder",
  worksFor: { "@type": "Organization", name: SITE.name, url: SITE.url },
  description:
    "Dancer, educator, and advocate. Founder of Rai Arts, preparing dancers for the business of a dance career.",
  url: `${SITE.url}/founders`,
};

export default function Founders() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSONLD) }}
      />

      <Container className="pt-32 pb-12 sm:pt-40 sm:pb-16">
        <Label>Founders</Label>
        <Lines
          as="h1"
          className="font-display mt-5 max-w-4xl text-[length:var(--text-step-3)]"
          lines={["The dancer who", "went looking for", "the roadmap."]}
        />
      </Container>

      <Container className="grid gap-12 pb-20 sm:pb-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Rise>
          <figure className="relative isolate">
            {/* The same gold thread as everywhere else, passing behind her —
                it emerges top-left, disappears behind the portrait, and comes
                back out along the bottom to underline her name. */}
            <svg
              className="pointer-events-none absolute -top-6 -left-5 -z-10 h-[calc(100%+5rem)] w-[calc(100%+2.5rem)] text-gold sm:-top-10 sm:-left-12 sm:h-[calc(100%+7rem)] sm:w-[calc(100%+7rem)]"
              viewBox="0 0 100 120"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M2 44 C2 14, 26 2, 58 4 C86 6, 99 24, 97 52 C95 82, 84 104, 56 110 C30 116, 8 104, 4 84"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            <div className="relative overflow-hidden rounded-sm bg-forest">
              <Image
                src="/images/kira.jpg"
                alt={`${SITE.founder}, founder of Rai Arts`}
                width={1600}
                height={2400}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 60vw, 90vw"
                priority
                className="h-auto w-full object-cover"
              />
            </div>

            <figcaption className="mt-5">
              <p className="font-display-sm text-[length:var(--text-step-1)]">
                {SITE.founder}
              </p>
              <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-gold-deep">
                Founder — Rai Arts
              </p>
            </figcaption>
          </figure>
        </Rise>

        <div className="flex flex-col gap-6">
          <Words
            className="text-[1.02rem] leading-relaxed text-ink-soft"
            text="Kira Rai Daniel is a dancer, educator, and advocate. She founded Rai Arts to equip aspiring dancers with the essential business knowledge and skills needed to navigate a successful and sustainable career in dance."
          />

          {/* DRAFT — written in the brand voice, awaiting Kira's own words. */}
          <p className="max-w-[62ch] leading-relaxed text-ink-soft">
            Like most dancers, she trained for years in technique, artistry, and
            performance — and graduated into a profession nobody had explained
            the business of. What a contract actually says. What the work pays.
            How to build income across a season. Which of her skills transferred,
            and where.
          </p>
          <p className="max-w-[62ch] leading-relaxed text-ink-soft">
            She built the roadmap she went looking for, then turned it into a
            curriculum. The Rai Arts Career Readiness Framework™ is the result:
            five pillars covering the whole profession, delivered to dance
            programs as workshops so students graduate with the language, tools,
            and confidence to understand their options, create income, and make
            informed decisions.
          </p>
          <p className="max-w-[62ch] leading-relaxed text-ink-soft">
            The point was never to talk anyone out of dancing. It was to make
            staying possible.
          </p>

          <blockquote className="mt-4 border-l-2 border-gold pl-6">
            <p className="font-display-sm text-[length:var(--text-step-1)] text-forest">
              &ldquo;Dancers shouldn&apos;t have to choose between the art and a
              living. The whole point is to build a career that holds both.&rdquo;
            </p>
            <footer className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-soft">
              {SITE.founder}
            </footer>
          </blockquote>

          <div className="mt-4 flex flex-wrap gap-3">
            <Button href="/framework">Explore the framework</Button>
            <Button href="/contact" variant="ghost">
              Book a workshop
            </Button>
          </div>
        </div>
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
