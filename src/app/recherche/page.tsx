import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { PageIntro } from "@/components/sections/PageIntro";
import { SearchResults } from "@/components/sections/SearchResults";

export const metadata: Metadata = { title: "Recherche" };

export default function RecherchePage() {
  return (
    <SiteFrame header={{ variant: "solid" }}>
      <PageIntro crumbs={[{ label: "Accueil", href: "/" }, { label: "Recherche" }]} title="Recherche" />
      <div className="mx-auto max-w-[920px] px-5 pb-16 md:px-10 md:pb-[120px]">
        <Suspense fallback={<p className="text-muted">Chargement des résultats…</p>}>
          <SearchResults />
        </Suspense>
      </div>
    </SiteFrame>
  );
}
