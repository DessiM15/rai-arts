import Link from "next/link";
import type { ReactNode } from "react";
import { Label, Lines, Words } from "./Reveal";

type ButtonVariant = "solid" | "gold" | "ghost" | "ghost-light";

const VARIANTS: Record<ButtonVariant, string> = {
  solid:
    "bg-forest text-cream border-forest hover:bg-forest-deep hover:border-forest-deep",
  gold: "bg-gold text-forest-deep border-gold hover:bg-[#e0a92c] hover:border-[#e0a92c]",
  ghost: "bg-transparent text-forest border-forest/45 hover:bg-forest hover:text-cream hover:border-forest",
  "ghost-light":
    "bg-transparent text-cream border-cream/40 hover:bg-cream hover:text-forest hover:border-cream",
};

/** Minimum 44px tall everywhere — these get tapped on phones constantly. */
const BASE =
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-sm border px-6 py-3 text-[0.88rem] font-medium tracking-[0.01em] transition-all duration-400 ease-[cubic-bezier(.16,.84,.28,1)] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0";

export function Button({
  href,
  children,
  variant = "solid",
  external,
  className = "",
  type,
  ...rest
}: {
  href?: string;
  children: ReactNode;
  variant?: ButtonVariant;
  external?: boolean;
  className?: string;
  type?: "button" | "submit";
} & Record<string, unknown>) {
  const cls = `${BASE} ${VARIANTS[variant]} ${className}`;

  if (href && external) {
    return (
      <a
        href={href}
        className={cls}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type ?? "button"} className={cls} {...rest}>
      {children}
    </button>
  );
}

export function Container({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={`mx-auto w-full max-w-[1180px] px-5 sm:px-8 lg:px-14 ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * `dark` opts the band into the nav's colour inversion via data-nav.
 */
export function Section({
  children,
  className = "",
  dark = false,
  id,
  as: Tag = "section",
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
  id?: string;
  as?: "section" | "div" | "footer";
}) {
  return (
    <Tag
      id={id}
      data-nav={dark ? "dark" : undefined}
      className={`grain relative isolate ${dark ? "on-dark bg-forest text-cream" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}

/**
 * Page header shared by every inner route: a full-bleed band in the brand
 * green that runs straight on from the navbar, everything centred. Anything
 * passed as children sits inside the band under the intro.
 */
export function PageHero({
  label,
  lines,
  intro,
  headingClassName = "",
  introClassName = "",
  size = "default",
  children,
}: {
  label: string;
  lines: string[];
  /** One paragraph, or several lines each set on its own row. */
  intro?: string | string[];
  headingClassName?: string;
  introClassName?: string;
  /** `compact` trims the band's height and tucks the intro up under the headline. */
  size?: "default" | "compact";
  children?: ReactNode;
}) {
  const compact = size === "compact";
  return (
    <Section
      dark
      className={compact ? "pt-28 pb-12 sm:pt-32 sm:pb-14" : "pt-32 pb-16 sm:pt-40 sm:pb-20"}
    >
      <Container className="flex flex-col items-center text-center">
        <Label>{label}</Label>
        <Lines
          as="h1"
          className={`font-statement mt-6 text-[length:var(--text-step-3)] ${headingClassName}`}
          lines={lines}
        />
        {intro &&
          (Array.isArray(intro) ? intro : [intro]).map((line, i) => (
            <Words
              key={i}
              delay={0.1 + i * 0.12}
              className={`${i === 0 ? (compact ? "mt-5" : "mt-8") : "mt-1"} max-w-[54ch] text-[length:var(--text-step-0)] text-cream/75 ${introClassName}`}
              text={line}
            />
          ))}
        {children}
      </Container>
    </Section>
  );
}
