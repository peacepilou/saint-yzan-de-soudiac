import Link from "next/link";
import { procedureHref } from "@/data/procedures";
import type { Procedure } from "@/lib/types";
import { cn } from "@/lib/utils";
import { LinkArrow } from "@/components/ui/LinkArrow";

/** Lignes de démarches en 2 colonnes : titre, canal, étiquette de thème et flèche. */
export function ProcedureList({ items, className }: { items: Procedure[]; className?: string }) {
  return (
    <ul className={cn("m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(380px,100%),1fr))] gap-x-10 border-t border-line p-0", className)}>
      {items.map((p) => (
        <li key={p.slug}>
          <Link
            href={procedureHref(p)}
            className="group flex items-center gap-5 border-b border-line py-[22px] text-ink no-underline hover:bg-surface-hover"
          >
            <span className="flex flex-1 flex-col">
              <strong className="text-[18px]">{p.title}</strong>
              <span className="text-[15px] text-muted">{p.where}</span>
            </span>
            <span className="rounded-full bg-surface px-3 py-1 text-[13px] font-semibold whitespace-nowrap text-text">{p.theme}</span>
            <LinkArrow size={18} className="text-footer-muted transition-colors group-hover:text-accent" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
