import type { Metadata } from "next";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { AgendaBrowser } from "@/components/sections/AgendaBrowser";
import { PageHero } from "@/components/sections/Hero";
import { Container } from "@/components/ui/Container";
import { events } from "@/data/events";
import { type } from "@/lib/styles";

export const metadata: Metadata = { title: "Agenda" };

export default function AgendaPage() {
  return (
    <SiteFrame header={{ variant: "overlay", current: "agenda" }}>
      <PageHero
        img="eglise"
        alt="Façade de l'église Saint-Laurent"
        position="center 35%"
        height="md:h-[620px]"
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Agenda" }]}
        title="Agenda"
        lead="Animations, marchés et séances du conseil municipal."
        narrow
      />
      <Container as="section" aria-labelledby="h-venir" className="flex flex-wrap gap-12 py-12 md:py-[104px]">
        <div className="flex flex-[1_1_320px] flex-col gap-4">
          <h2 id="h-venir" className={type.h2Section}>
            À venir
          </h2>
          <p className="text-muted">Les dates précises seront publiées dès qu&apos;elles seront fixées par la mairie et les associations.</p>
        </div>
        <AgendaBrowser events={events} />
      </Container>
    </SiteFrame>
  );
}
