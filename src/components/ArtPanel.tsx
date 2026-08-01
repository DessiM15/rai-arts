import Image from "next/image";
import { DANCER_PATH, DANCER_VIEWBOX } from "@/lib/brand";

type Variant = "figure" | "sun" | "rule" | "grid";

/**
 * A composed brand panel used wherever a photograph would normally sit.
 *
 * This is deliberately *not* a placeholder: with no image it is a finished
 * graphic in its own right, built from the mark, the palette and the grain.
 * Pass `src` and it becomes a photograph in the same frame, so real pictures
 * can drop in later without any layout changing.
 */
export default function ArtPanel({
  variant = "figure",
  ratio = "4/5",
  caption,
  src,
  alt,
  priority,
  className = "",
}: {
  variant?: Variant;
  ratio?: string;
  caption?: string;
  src?: string;
  alt?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={`relative ${className}`}>
      <div
        className="grain relative isolate w-full overflow-hidden rounded-sm bg-forest"
        style={{ aspectRatio: ratio }}
      >
        {src ? (
          <Image
            src={src}
            alt={alt ?? ""}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 45vw, 92vw"
            className="object-cover"
          />
        ) : (
          <Composition variant={variant} />
        )}
      </div>

      {caption && (
        <figcaption className="mt-3 font-mono text-[0.58rem] tracking-[0.2em] text-ink-soft uppercase">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function Composition({ variant }: { variant: Variant }) {
  return (
    <>
      {variant === "sun" && (
        <div
          aria-hidden="true"
          className="absolute -top-[16%] -right-[14%] aspect-square w-[58%] rounded-full bg-gold"
        />
      )}

      {variant === "rule" && (
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(115deg, #efb93b 0 1px, transparent 1px 30px)",
          }}
        />
      )}

      {variant === "grid" && (
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "linear-gradient(#efb93b 1px, transparent 1px), linear-gradient(90deg, #efb93b 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      )}

      <svg
        viewBox={DANCER_VIEWBOX}
        aria-hidden="true"
        fill="none"
        className={
          variant === "figure"
            ? "absolute inset-0 m-auto h-[72%] w-auto text-cream/90"
            : "absolute -bottom-[14%] left-1/2 h-[112%] w-auto -translate-x-1/2 text-cream/20"
        }
      >
        <path
          d={DANCER_PATH}
          stroke="currentColor"
          strokeWidth={9}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}
