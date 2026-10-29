import type { ReactNode } from "react";
import { type } from "@/lib/styles";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";

/** Sur-titre + H2 de section, avec un élément optionnel aligné à droite (bouton, filtres, texte). */
export function SectionHeader({
  id,
  eyebrow,
  title,
  aside,
  className,
}: {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-6 flex flex-wrap items-end justify-between gap-4 md:mb-10", className)}>
      <div>
        {eyebrow && <Eyebrow className="mb-2.5">{eyebrow}</Eyebrow>}
        <h2 id={id} className={type.h2Section}>
          {title}
        </h2>
      </div>
      {aside}
    </div>
  );
}
