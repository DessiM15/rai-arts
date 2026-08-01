import type { Metadata } from "next";
import { GUIDE } from "@/lib/content";
import { SITE } from "@/lib/site";
import { Button, Container, Section } from "@/components/ui";
import { Label, Lines, Rise, Words } from "@/components/Reveal";
import { Dancer } from "@/components/Marks";

export const metadata: Metadata = {
  title: "Shop",
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

      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <Label>Shop</Label>
        <Lines
          as="h1"
          className="font-display mt-5 max-w-4xl text-[length:var(--text-step-3)]"
          lines={["The career guide."]}
        />
        <Words
          className="mt-7 max-w-[54ch] text-ink-soft"
          text="Everything the workshops cover, in a form you can keep and work through at your own pace."
        />
      </Container>

      <Container className="pb-20 sm:pb-28">
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          {/* cover */}
          <Rise>
            <div className="relative grid aspect-[3/4] place-items-center overflow-hidden rounded-sm bg-forest p-8">
              <div
                aria-hidden="true"
                className="absolute -left-[20%] -top-[10%] aspect-square w-[60%] rounded-full bg-gold/90"
              />
              <div className="relative flex h-full w-full flex-col justify-between">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-cream/60">
                  {SITE.name}
                </p>
                <Dancer
                  className="mx-auto w-[52%] text-cream/90"
                  strokeWidth={7}
                />
                <div>
                  <h2 className="font-display text-[length:var(--text-step-1)] text-cream">
                    {GUIDE.title}
                  </h2>
                  <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-gold">
                    Digital guide
                  </p>
                </div>
              </div>
            </div>
          </Rise>

          {/* detail */}
          <Rise delay={0.08}>
            <div className="flex h-full flex-col rounded-sm border border-forest/12 bg-white/55 p-8 sm:p-10">
              <div className="flex flex-wrap items-baseline gap-4">
                <span className="font-display text-[length:var(--text-step-2)]">
                  {GUIDE.price}
                </span>
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-soft">
                  {GUIDE.format}
                </span>
              </div>

              <p className="mt-6 max-w-[54ch] leading-relaxed text-ink-soft">
                {GUIDE.body}
              </p>

              <h3 className="mt-9 font-medium">What&apos;s inside</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {GUIDE.includes.map((inc, i) => (
                  <li
                    key={i}
                    className="flex gap-3.5 text-[0.92rem] leading-relaxed"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.62em] h-[0.38em] w-[0.38em] flex-none rounded-full bg-gold-deep"
                    />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-9">
                {live ? (
                  <>
                    <Button href={GUIDE.stripeLink} variant="gold" external>
                      Buy the guide for {GUIDE.price}
                    </Button>
                    <p className="mt-3 text-[0.78rem] text-ink-soft">
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
                    <p className="mt-3 max-w-[46ch] text-[0.78rem] text-ink-soft">
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
          </Rise>
        </div>
      </Container>

      <Section dark className="bg-forest-deep py-20 sm:py-24">
        <Container className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-[length:var(--text-step-2)]">
              Teaching a whole cohort?
            </h2>
            <p className="mt-3 max-w-[46ch] text-cream/70">
              The guide works alongside the workshops. Bring Rai Arts to your
              program and every student leaves with the framework.
            </p>
          </div>
          <Button href="/contact" variant="gold">
            Request a workshop
          </Button>
        </Container>
      </Section>
    </>
  );
}
