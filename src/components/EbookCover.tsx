import Image from "next/image";
import { LEARN } from "@/lib/content";

/** The real ebook cover, linked to the shop. */
export default function EbookCover() {
  return (
    <a
      href={LEARN.ebook.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${LEARN.ebook.title}, the ebook`}
      className="group block overflow-hidden rounded-sm shadow-[0_28px_60px_-28px_rgba(30,45,25,0.55)] transition-transform duration-500 ease-[cubic-bezier(.16,.84,.28,1)] hover:-translate-y-1 motion-reduce:hover:translate-y-0"
    >
      <Image
        src="/images/ebook-more-than-a-dancer.jpg"
        alt={`Cover of ${LEARN.ebook.title} by Kira Rai Daniel`}
        width={1200}
        height={1200}
        sizes="(min-width: 1024px) 480px, 90vw"
        className="h-auto w-full"
      />
    </a>
  );
}
