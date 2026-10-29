import type { HistoryEntry } from "@/lib/types";

/** Frise « Quelques dates » : cartes avec filet supérieur `accent`. */
export function Timeline({ entries }: { entries: HistoryEntry[] }) {
  return (
    <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-x-8 gap-y-10 p-0">
      {entries.map((e) => (
        <li key={e.date} className="flex flex-col gap-2.5 border-t-2 border-accent pt-5">
          <span className="font-display text-[26px] font-bold text-accent md:text-[30px]">{e.date}</span>
          <span className="text-text">{e.text}</span>
        </li>
      ))}
    </ol>
  );
}
