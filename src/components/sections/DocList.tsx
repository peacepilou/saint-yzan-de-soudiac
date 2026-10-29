import { Icon } from "@/components/ui/icons";
import { documentMeta } from "@/data/documents";
import { PDF_PLACEHOLDER } from "@/data/rubriques";
import type { MunicipalDocument } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Liste de documents téléchargeables : pictogramme, titre, méta « Type · PDF · poids », bouton PDF. */
export function DocList({ docs, className }: { docs: MunicipalDocument[]; className?: string }) {
  return (
    <ul className={cn("m-0 list-none border-t border-line p-0", className)}>
      {docs.map((d) => (
        <li key={d.id} className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-line py-[22px]">
          <span className="flex size-[52px] flex-none items-center justify-center rounded-[14px] bg-surface text-accent">
            <Icon name="file" size={22} strokeWidth={1.7} />
          </span>
          <span className="flex flex-[1_1_300px] flex-col">
            <strong className="text-[18px]">{d.title}</strong>
            <span className="text-[15px] text-muted">{documentMeta(d)}</span>
          </span>
          <a
            href={PDF_PLACEHOLDER}
            className="flex h-11 items-center gap-2 rounded-full border border-line-strong px-[18px] text-[15px] font-semibold text-ink no-underline hover:border-ink hover:bg-ink hover:text-white"
          >
            <Icon name="download" size={16} strokeWidth={2} />
            PDF<span className="sr-only"> : {d.title}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
