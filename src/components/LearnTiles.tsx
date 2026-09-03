import Link from "next/link";
import { LEARN } from "@/lib/content";
import { SITE } from "@/lib/site";
import { Dancer } from "./Marks";

/**
 * Three ways to learn, drawn rather than photographed: an ebook cover on its
 * edge, a letter sliding out of its envelope, and a stack of essays. Built
 * from the brand so they stay crisp at any size and can be swapped for real
 * artwork later without touching the layout.
 *
 * Each tile is a link to its section further down the page.
 */

const TILE =
  "group grain relative isolate block aspect-[4/3] overflow-hidden sm:aspect-square rounded-sm transition-transform duration-500 ease-[cubic-bezier(.16,.84,.28,1)] hover:-translate-y-1 motion-reduce:hover:translate-y-0";
const TAG =
  "absolute top-5 left-5 z-[3] font-mono text-[0.56rem] tracking-[0.22em] uppercase";
const NUM =
  "absolute top-5 right-5 z-[3] font-mono text-[0.56rem] tracking-[0.18em]";

export function EbookTile({ href = "#ebook" }: { href?: string }) {
  return (
    <Link href={href} className={`${TILE} bg-forest`} aria-label="The ebook">
      <span className={`${TAG} text-gold`}>Ebook</span>
      <span className={`${NUM} text-cream/60`}>01</span>
      <span className="absolute inset-x-0 bottom-0 flex justify-center px-4 pb-0">
        <span className="relative block w-[70%] -rotate-2 rounded-t-[2px] bg-cream px-4 pt-5 pb-6 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.7)] transition-transform duration-700 ease-[cubic-bezier(.16,.84,.28,1)] group-hover:-translate-y-2 group-hover:rotate-0 motion-reduce:group-hover:translate-y-0">
          <span className="block h-px w-8 bg-gold-deep" />
          <span className="font-statement mt-3 block text-[0.95rem] leading-[1.12] text-forest">
            {LEARN.ebook.title}
          </span>
          <Dancer className="mx-auto mt-3 h-10 w-auto text-gold-deep" />
          <span className="mt-3 block text-center font-mono text-[0.46rem] tracking-[0.2em] text-ink-soft uppercase">
            {SITE.name}
          </span>
        </span>
      </span>
    </Link>
  );
}

export function NewsletterTile({ href = "#newsletter" }: { href?: string }) {
  return (
    <Link href={href} className={`${TILE} bg-forest-mid`} aria-label="The newsletter">
      <span className={`${TAG} text-gold`}>Newsletter</span>
      <span className={`${NUM} text-cream/60`}>02</span>
      <span
        aria-hidden="true"
        className="absolute -top-[18%] -left-[14%] aspect-square w-[54%] rounded-full bg-gold/20"
      />
      {/* the envelope, letter rising out of it on hover */}
      <span className="absolute inset-x-[16%] bottom-[16%] block aspect-[4/3]">
        {/* letter */}
        <span className="absolute inset-x-[10%] top-0 block h-[78%] rounded-t-[2px] bg-cream px-[9%] pt-[9%] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] transition-transform duration-700 ease-[cubic-bezier(.16,.84,.28,1)] group-hover:-translate-y-[14%] motion-reduce:group-hover:translate-y-0">
          <span className="block h-px w-[30%] bg-gold-deep" />
          <span className="mt-[7%] block h-[3px] w-[80%] rounded-full bg-forest/25" />
          <span className="mt-[5%] block h-[3px] w-[62%] rounded-full bg-forest/25" />
          <span className="mt-[5%] block h-[3px] w-[70%] rounded-full bg-forest/25" />
        </span>
        {/* envelope body */}
        <span className="absolute inset-x-0 bottom-0 block h-[62%] rounded-[3px] border border-gold/80 bg-forest-deep" />
        {/* the flap seam */}
        <svg
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 h-[62%] w-full text-gold/80"
          aria-hidden="true"
        >
          <path d="M0 0 L50 30 L100 0" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>
        {/* the seal */}
        <span className="absolute bottom-[26%] left-1/2 block h-[14%] w-[14%] -translate-x-1/2 rounded-full bg-gold shadow-[0_4px_12px_-4px_rgba(0,0,0,0.6)]" />
      </span>
    </Link>
  );
}

export function SubstackTile({ href = "#substack" }: { href?: string }) {
  return (
    <Link href={href} className={`${TILE} bg-sand`} aria-label="Substack essays">
      <span className={`${TAG} text-gold-deep`}>Substack</span>
      <span className={`${NUM} text-ink-soft/70`}>03</span>
      {/* a stack of essays, fanned; the top one lifts on hover */}
      <span className="absolute inset-x-[28%] bottom-[12%] block aspect-[3/4]">
        {[2, 1, 0].map((d) => (
          <span
            key={d}
            style={{
              transform: `translate(${d * 9}%, ${-d * 7}%) rotate(${d * -3}deg)`,
              zIndex: 3 - d,
            }}
            className={`absolute inset-0 block rounded-[3px] bg-forest-deep px-[10%] pt-[10%] shadow-[0_14px_30px_-14px_rgba(0,0,0,0.6)] transition-transform duration-700 ease-[cubic-bezier(.16,.84,.28,1)] ${
              d === 0
                ? "group-hover:-translate-y-[6%] group-hover:rotate-[1.5deg] motion-reduce:group-hover:translate-y-0"
                : "opacity-80"
            }`}
          >
            <span className="block font-mono text-[0.44rem] tracking-[0.2em] text-cream/45 uppercase">
              Essay
            </span>
            <span className="font-statement mt-[8%] block text-[1.3rem] leading-none text-cream/55">
              0{3 - d}
            </span>
            <span className="mt-[9%] block h-[3px] w-[85%] rounded-full bg-cream/60" />
            <span className="mt-[5%] block h-[3px] w-[70%] rounded-full bg-cream/35" />
            <span className="mt-[5%] block h-[3px] w-[78%] rounded-full bg-cream/35" />
            <span className="mt-[5%] block h-[3px] w-[50%] rounded-full bg-cream/35" />
          </span>
        ))}
      </span>
    </Link>
  );
}

export default function LearnTiles() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-5">
      <EbookTile />
      <NewsletterTile />
      <SubstackTile />
    </div>
  );
}
