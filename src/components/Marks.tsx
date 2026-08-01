import {
  DANCER_PATH,
  DANCER_VIEWBOX,
  LOCKUP_DANCER,
  LOCKUP_LETTERS,
  LOCKUP_STROKE,
  LOCKUP_VIEWBOX,
} from "@/lib/brand";

/**
 * The full RAI ARTS lockup. Letterforms are the genuine vector outlines from
 * Kira's original file; the dancer is the re-traced continuous path. Colour
 * comes from `currentColor`, so it inverts anywhere.
 */
export function Wordmark({
  className,
  title = "Rai Arts",
  style,
}: {
  className?: string;
  title?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox={LOCKUP_VIEWBOX}
      className={className}
      style={style}
      role="img"
      aria-label={title}
      fill="none"
    >
      <g fill="currentColor">
        {LOCKUP_LETTERS.map((l, i) => (
          <g key={i} transform={`translate(${l.t[0]},${l.t[1]})`}>
            <path d={l.d} />
          </g>
        ))}
      </g>
      <path
        d={LOCKUP_DANCER}
        fill="none"
        stroke="currentColor"
        strokeWidth={LOCKUP_STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The dancer alone — one unbroken stroke, normalised to 0 0 1000 1000. */
export function Dancer({
  className,
  strokeWidth = 8,
  decorative = true,
}: {
  className?: string;
  strokeWidth?: number;
  decorative?: boolean;
}) {
  return (
    <svg
      viewBox={DANCER_VIEWBOX}
      className={className}
      fill="none"
      {...(decorative
        ? { "aria-hidden": true }
        : { role: "img", "aria-label": "The Rai Arts dancer" })}
    >
      <path
        d={DANCER_PATH}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
