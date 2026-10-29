import type { ReactNode } from "react";
import { Breadcrumb, type Crumb } from "@/components/ui/Breadcrumb";
import { type } from "@/lib/styles";
import { cn } from "@/lib/utils";

/**
 * En-tête de page sous un header `solid`. `wide` l'aligne sur le conteneur de 1360 px,
 * pour les pages dont le contenu occupe toute la largeur (fiche démarche, contact).
 */
export function PageIntro({
  crumbs,
  title,
  lead,
  wide,
  children,
}: {
  crumbs: Crumb[];
  title: string;
  lead?: string;
  wide?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className={cn("mx-auto flex flex-col gap-5 px-5 pt-10 pb-8 md:gap-6 md:px-10 md:pt-[72px] md:pb-14", wide ? "max-w-[1360px] [&>*]:max-w-[880px]" : "max-w-[920px]")}>
      <Breadcrumb tone="light" items={crumbs} />
      <h1 className={type.h1Article}>{title}</h1>
      {lead && <p className="text-[19px] leading-normal text-text md:text-[22px]">{lead}</p>}
      {children}
    </div>
  );
}
