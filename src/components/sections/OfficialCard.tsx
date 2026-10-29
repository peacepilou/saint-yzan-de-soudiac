import { portraitTint } from "@/data/officials";
import type { Official } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Carte d'élu : portrait 4:5 (placeholder teinté avec initiales), fonction, nom, délégation. */
export function OfficialCard({ official }: { official: Official }) {
  return (
    <li className="flex flex-col gap-3.5">
      <div
        role="img"
        aria-label="Emplacement de la photo de l'élu"
        className={cn(
          "flex aspect-[4/5] items-center justify-center rounded-[20px] font-display text-[44px] font-bold text-accent",
          portraitTint[official.group],
        )}
      >
        [NN]
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-accent">{official.role}</span>
        <strong className="font-display text-[22px] tracking-[-0.01em]">[Prénom Nom]</strong>
        <span className="text-[15px] text-muted">{official.delegation}</span>
      </div>
    </li>
  );
}
