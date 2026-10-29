import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { DocumentBrowser } from "@/components/sections/DocumentBrowser";
import { PageHero } from "@/components/sections/Hero";
import { Container } from "@/components/ui/Container";
import { documents } from "@/data/documents";

export const metadata: Metadata = { title: "Comptes rendus et délibérations" };

export default function ComptesRendusPage() {
  return (
    <SiteFrame header={{ variant: "overlay", current: "mairie" }}>
      <PageHero
        img="mairie"
        alt="Façade de la mairie de Saint-Yzan-de-Soudiac"
        position="center 60%"
        height="md:h-[620px]"
        crumbs={[{ label: "Accueil", href: "/" }, { label: "La mairie", href: "/mairie" }, { label: "Comptes rendus" }]}
        title="Comptes rendus"
        lead="Procès-verbaux des séances, délibérations, arrêtés et documents budgétaires, téléchargeables en PDF."
        narrow
      />
      <Container as="section" aria-label="Documents du conseil municipal" className="py-12 md:py-[104px]">
        <Suspense fallback={<p className="text-muted">Chargement des documents…</p>}>
          <DocumentBrowser docs={documents} />
        </Suspense>
      </Container>
    </SiteFrame>
  );
}
