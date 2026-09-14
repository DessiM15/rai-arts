import DancerWatermark from "./DancerWatermark";

/**
 * A dark band carrying a short passage, set in full and centred, one or two
 * paragraphs with a clear break between them. The measure is kept wide so the
 * passage runs to a handful of lines rather than a wall of them.
 */
export default function QuoteBand({ paragraphs }: { paragraphs: string[] }) {
  return (
    <section
      data-nav="dark"
      className="on-dark grain relative isolate overflow-hidden bg-forest-deep py-24 text-cream sm:py-32 lg:py-40"
    >
      <DancerWatermark />

      <div className="relative z-[2] mx-auto w-full max-w-[1180px] px-5 sm:px-8 lg:px-14">
        <div className="flex flex-col items-center gap-8 text-center sm:gap-10">
          {paragraphs.map((p, i) => (
            // `pretty`, not the headline default of `balance`: balance shortens
            // every line to even them out, which is exactly the tall narrow
            // block this band is meant to avoid.
            <p
              key={i}
              className="font-statement max-w-[44ch] text-[length:var(--text-step-2)] leading-[1.35] text-cream [text-wrap:pretty]"
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
