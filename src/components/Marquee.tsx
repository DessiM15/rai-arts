import { Dancer } from "./Marks";

/**
 * A running band of type between sections. The track is rendered twice and
 * translated by exactly -50%, so the loop is seamless with no JavaScript.
 * Pauses on hover, and stands still under reduced motion.
 */
export default function Marquee({
  items,
  dark = false,
  speed = 38,
  className = "",
}: {
  items: string[];
  dark?: boolean;
  speed?: number;
  className?: string;
}) {
  const run = (key: string) => (
    <div className="flex shrink-0 items-center" key={key} aria-hidden={key === "b"}>
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className="font-statement px-6 text-[length:var(--text-step-2)] whitespace-nowrap sm:px-9">
            {t}
          </span>
          <Dancer
            className={`h-[1.35em] w-auto shrink-0 ${dark ? "text-gold" : "text-gold-deep"}`}
            strokeWidth={11}
          />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`marquee grain relative overflow-hidden border-y py-5 sm:py-7 ${
        dark
          ? "on-dark border-cream/15 bg-forest text-cream"
          : "border-forest/12 bg-sand text-forest"
      } ${className}`}
      style={{ ["--marquee-duration" as string]: `${speed}s` }}
    >
      <div className="marquee-track">
        {run("a")}
        {run("b")}
      </div>
    </div>
  );
}
