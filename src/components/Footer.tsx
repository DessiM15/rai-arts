import Link from "next/link";
import { NAV, SITE } from "@/lib/site";
import { Wordmark } from "./Marks";
import { Container } from "./ui";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer data-nav="dark" className="on-dark bg-forest-deep text-cream">
      <Container className="py-14 sm:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-20">
          <div className="max-w-sm">
            <Wordmark className="h-auto w-[150px] text-cream" />
            <p className="font-display-sm mt-6 text-[length:var(--text-step-1)] text-gold">
              {SITE.tagline}
            </p>
            <p className="mt-3 text-[0.86rem] leading-relaxed text-cream/65">
              Career readiness for dancers, preparing artists for the business
              of a dance career.
            </p>
          </div>

          <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
            <nav aria-label="Footer">
              <h2 className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-cream/50">
                Explore
              </h2>
              <ul className="mt-4 flex flex-col gap-1">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-[44px] items-center text-[0.92rem] text-cream/80 transition-colors hover:text-gold"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-cream/50">
                Get in touch
              </h2>
              <ul className="mt-4 flex flex-col gap-1">
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="inline-flex min-h-[44px] items-center text-[0.92rem] text-cream/80 transition-colors hover:text-gold"
                  >
                    {SITE.email}
                  </a>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="inline-flex min-h-[44px] items-center text-[0.92rem] text-cream/80 transition-colors hover:text-gold"
                  >
                    Book a workshop
                  </Link>
                </li>
                <li>
                  <Link
                    href="/founders"
                    className="inline-flex min-h-[44px] items-center text-[0.92rem] text-cream/80 transition-colors hover:text-gold"
                  >
                    Founders
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-cream/15 pt-6 text-[0.76rem] text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p className="font-mono tracking-[0.12em] uppercase text-[0.62rem]">
            For dancers, by a dancer
          </p>
        </div>
      </Container>
    </footer>
  );
}
