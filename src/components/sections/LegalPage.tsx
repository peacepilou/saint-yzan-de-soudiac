import type { ReactNode } from "react";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { PageIntro } from "./PageIntro";

/** Gabarit texte de 720 px des pages légales, avec header `solid`. */
export function LegalPage({ title, lead, children }: { title: string; lead?: string; children: ReactNode }) {
  return (
    <SiteFrame header={{ variant: "solid" }}>
      <PageIntro crumbs={[{ label: "Accueil", href: "/" }, { label: title }]} title={title} lead={lead} />
      <div className="mx-auto max-w-[920px] px-5 pb-16 md:px-10 md:pb-[120px]">
        <div className="flex max-w-[720px] flex-col gap-5 text-[17px] leading-[1.7] text-text md:text-[18px] [&_a]:font-semibold [&_a]:underline [&_a]:decoration-[1.5px] [&_a]:underline-offset-4 [&_a:hover]:text-accent-hover [&_h2]:mt-6 [&_h2]:font-display [&_h2]:text-[26px] [&_h2]:font-bold [&_h2]:tracking-[-0.02em] [&_h2]:text-ink md:[&_h2]:text-[32px] [&_li]:ml-5 [&_li]:list-disc [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2">
          {children}
        </div>
      </div>
    </SiteFrame>
  );
}
