import Image from "next/image";
import { toneText } from "@/components/ui/Tag";
import { photos } from "@/data/photos";
import type { AgendaEvent } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Lignes d'agenda : vignette, date ou statut (couleur de catégorie), titre et étiquette. */
export function AgendaList({ events, className }: { events: AgendaEvent[]; className?: string }) {
  return (
    <ol className={cn("m-0 flex list-none flex-col gap-3 p-0", className)}>
      {events.map((e) => (
        <li key={e.slug} className="flex flex-wrap items-center gap-x-7 gap-y-4 rounded-[20px] bg-surface p-5">
          <span className="relative block h-24 w-[120px] overflow-hidden rounded-[14px]">
            <Image src={photos[e.img].src} alt="" fill sizes="120px" className={cn("object-cover", e.grayscale && "grayscale")} />
          </span>
          <span className="flex flex-[1_1_300px] flex-col">
            <span className={cn("text-[14px] font-semibold", toneText[e.tone])}>{e.when}</span>
            <strong className="font-display text-[22px] tracking-[-0.01em] md:text-[24px]">{e.title}</strong>
          </span>
          <span className="rounded-full bg-white px-3.5 py-1.5 text-[14px] font-semibold">{e.category}</span>
        </li>
      ))}
    </ol>
  );
}
