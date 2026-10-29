import type { Metadata } from "next";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { PageHero } from "@/components/sections/Hero";
import { NewsBrowser } from "@/components/sections/NewsBrowser";
import { Container } from "@/components/ui/Container";
import { news } from "@/data/news";

export const metadata: Metadata = { title: "Actualités" };

export default function ActualitesPage() {
  return (
    <SiteFrame header={{ variant: "overlay", current: "decouvrir" }}>
      <PageHero
        img="mairie"
        alt="Façade de la mairie de Saint-Yzan-de-Soudiac"
        position="center 60%"
        height="md:h-[620px]"
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Actualités" }]}
        title="Actualités"
        lead="La vie de la commune : solidarité, animations, services et environnement."
        narrow
      />
      <Container as="section" aria-label="Liste des actualités" className="py-12 md:py-[104px]">
        <NewsBrowser articles={news} />
      </Container>
    </SiteFrame>
  );
}
