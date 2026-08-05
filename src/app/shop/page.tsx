import type { Metadata } from "next";
import { GUIDE } from "@/lib/content";
import { SITE } from "@/lib/site";
import { Button, Container, Section } from "@/components/ui";
import { Label, Lines, Rise, Words } from "@/components/Reveal";
import { SectionHead } from "@/components/editorial";
import { Dancer } from "@/components/Marks";
import Marquee from "@/components/Marquee";
import Statement from "@/components/Statement";

export const metadata: Metadata = {
  title: "Ebooks",
  description: `${GUIDE.title} is a ${GUIDE.price} digital career guide for dancers, covering the five pillars of the Rai Arts Career Readiness Framework™.`,
  alternates: { canonical: "/shop" },
};

const live = GUIDE.stripeLink.length > 0;

const PRODUCT_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: GUIDE.title,
  description: GUIDE.body,
  brand: { "@type": "Brand", name: SITE.name },
  category: "Digital guide",
  offers: {
    "@type": "Offer",
    price: GUIDE.price.replace("$", ""),
    priceCurrency: "USD",
    availability: live
      ? "https://schema.org/InStock"
      : "https://schema.org/PreOrder",
    url: `${SITE.url}/shop`,
  },
};

export default function Shop() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PRODUCT_JSONLD) }}
      />

      <Container className="pt-32 pb-14 sm:pt-40 sm:pb-16">
        <Label>Ebooks</Label>
        <Lines
          as="h1"
          className="font-statement mt-6 max-w-[12ch] text-[length:var(--text-step-5)]"
          lines={["The ebooks."]}
        />
        <Words
          className="mt-8 max-w-[50ch] text-[length:var(--text-step-0)] text-ink-soft"
          text="Everything the workshops cover, in a form you can keep and work through at your own pace. More titles are on the way."
        />
      </Container>

      <Marquee items={["Ebooks", GUIDE.title, GUIDE.price]} speed={32} />

      {/* ── the object ── */}
      <Container className="py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* cover, set like a programme */}
          <Rise className="lg:sticky lg:top-32 lg:self-start">
            <div className="grain relative isolate aspect-[3/4] overflow-hidden rounded-sm bg-forest p-8 shadow-[0_40px_90px_-60px_rgba(22,33,15,0.8)]">
              <div
                aria-hidden="true"
                className="absolute -top-[10%] -left-[20%] aspect-square w-[60%] rounded-full bg-gold/90"
              />
              <div className="relative z-[2] flex h-full w-full flex-col justify-between">
                <p className="font-mono text-[0.6rem] tracking-[0.24em] text-cream/70 uppercase">
                  {SITE.name}
                </p>
                <Dancer className="mx-auto w-[54%] text-cream/90" />
                <div>
                  <h2 className="font-statement text-[length:var(--text-step-2)] text-cream">
                    {GUIDE.title}
                  </h2>
                  <p className="mt-3 font-mono text-[0.6rem] tracking-[0.16em] text-gold uppercase">
                    {GUIDE.format}
                  </p>
                </div>
              </div>
            </div>
          </Rise>

          {/* detail */}
          <div>
            <div className="flex flex-wrap items-baseline gap-5 border-b border-forest/12 pb-6">
              <span className="font-statement text-[length:var(--text-step-4)] leading-none">
                {GUIDE.price}
              </span>
              <span className="font-mono text-[0.62rem] tracking-[0.16em] text-ink-soft uppercase">
                {GUIDE.format}
              </span>
            </div>

            <p className="mt-8 max-w-[54ch] text-[length:var(--text-step-1)] leading-snug">
              {GUIDE.body}
            </p>

            <h3 className="mt-12 font-mono text-[0.6rem] tracking-[0.2em] text-ink-soft uppercase">
              What&apos;s inside
            </h3>
            <ul className="mt-6 flex flex-col">
              {GUIDE.includes.map((inc, i) => (
                <li
                  key={i}
                  className="flex gap-5 border-t border-forest/12 py-4 text-[0.98rem] leading-relaxed"
                >
                  <span className="font-mono text-[0.6rem] text-gold-deep/70 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{inc}</span>
                </li>
              ))}
            </ul>

            <div className="mt-12">
              {live ? (
                <>
                  <Button href={GUIDE.stripeLink} variant="gold" external>
                    Buy for {GUIDE.price}
                  </Button>
                  <p className="mt-4 text-[0.8rem] text-ink-soft">
                    Secure checkout via Stripe. Delivered instantly by email.
                  </p>
                </>
              ) : (
                <>
                  <span
                    aria-disabled="true"
                    className="inline-flex min-h-[44px] cursor-not-allowed items-center rounded-sm border border-forest/20 bg-forest/8 px-6 py-3 text-[0.88rem] text-ink-soft"
                  >
                    Checkout opening soon
                  </span>
                  <p className="mt-4 max-w-[46ch] text-[0.8rem] text-ink-soft">
                    Want it before then? Email{" "}
                    <a
                      href={`mailto:${SITE.email}`}
                      className="underline underline-offset-4"
                    >
                      {SITE.email}
                    </a>{" "}
                    and we&apos;ll send it over.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>

      <Statement
        kicker="Who it's for"
        lines={["The dancer whose", "program hasn't", "booked us yet."]}
        footnote="Same frameworks, same worksheets, same plain language. Yours to keep and work through whenever you need it."
      />

      <Section dark className="bg-forest-deep py-24 sm:py-32">
        <Container className="flex flex-col items-center text-center">
          <SectionHead
            label="For a whole cohort"
            align="center"
            dark
            lines={["Teaching a", "whole cohort?"]}
            body="The guide works alongside the workshops. Bring Rai Arts to your program and every student leaves with the framework."
          >
            <Button href="/contact" variant="gold">
              Request a workshop
            </Button>
          </SectionHead>
        </Container>
      </Section>
    </>
  );
}
