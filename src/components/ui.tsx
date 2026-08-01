import Link from "next/link";
import type { ReactNode } from "react";

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
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
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
      className={`${dark ? "on-dark bg-forest text-cream" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}

/** Page header shared by every inner route. */
export function PageHead({
  label,
  lines,
  body,
  children,
}: {
  label: string;
  lines: string[];
  body?: string;
  children?: ReactNode;
}) {
  return (
    <Container className="pt-32 pb-14 sm:pt-40 sm:pb-20">
      <p className="label">{label}</p>
      <h1 className="font-display mt-5 text-[length:var(--text-step-3)]">
        {lines.map((l, i) => (
          <span key={i} className="block">
            {l}
          </span>
        ))}
      </h1>
      {body && (
        <p className="mt-6 max-w-[58ch] text-ink-soft">{body}</p>
      )}
      {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
    </Container>
  );
}
