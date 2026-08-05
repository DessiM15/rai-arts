import { GUIDE } from "@/lib/content";
import { SITE } from "@/lib/site";
import { Dancer } from "./Marks";

/**
 * A podcast tile and an ebook cover, built from the brand rather than from
 * artwork we don't have. They sit beside the Learn copy to fill what was a
 * large stretch of empty ground.
 *
 * Both are drawn, not photographed, so they stay crisp at any size and can be
 * swapped for real cover art later without touching the layout.
 */
export default function LearnTiles() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5">
      {/* ── the podcast ── */}
      <div className="grain relative isolate flex aspect-square flex-col justify-between overflow-hidden rounded-sm bg-forest-mid p-5">
        <span
          aria-hidden="true"
          className="absolute -top-[22%] -right-[18%] aspect-square w-[62%] rounded-full bg-gold/25"
        />
        <p className="relative z-[2] font-mono text-[0.56rem] tracking-[0.22em] text-gold uppercase">
          Podcast
        </p>

        {/* waveform */}
        <div
          aria-hidden="true"
          className="relative z-[2] flex h-14 items-center justify-center gap-[3px]"
        >
          {[38, 62, 100, 74, 46, 88, 58, 96, 44, 70, 34].map((h, i) => (
            <span
              key={i}
              className="w-[3px] rounded-full bg-cream/85"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>

        <p className="font-display-sm relative z-[2] text-[0.95rem] leading-tight text-cream">
          The Rai Arts podcast
        </p>
      </div>

      {/* ── the ebook ── */}
      <div className="grain relative isolate flex aspect-square items-end justify-center overflow-hidden rounded-sm bg-forest p-4">
        {/* the cover, standing on its edge */}
        <div className="relative w-[78%] -rotate-2 rounded-[2px] bg-cream px-4 pt-5 pb-4 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.7)]">
          <span className="block h-px w-8 bg-gold-deep" />
          <p className="font-statement mt-3 text-[0.92rem] leading-[1.12] text-forest">
            Building a Sustainable Career in Dance
          </p>
          <Dancer className="mx-auto mt-3 h-10 w-auto text-gold-deep" />
          <p className="mt-3 text-center font-mono text-[0.46rem] tracking-[0.2em] text-ink-soft uppercase">
            {SITE.name}
          </p>
        </div>

        <span className="absolute top-5 left-5 z-[2] font-mono text-[0.56rem] tracking-[0.22em] text-gold uppercase">
          Ebook
        </span>
        <span className="absolute top-5 right-5 z-[2] font-mono text-[0.56rem] tracking-[0.18em] text-cream/70">
          {GUIDE.price}
        </span>
      </div>
    </div>
  );
}
