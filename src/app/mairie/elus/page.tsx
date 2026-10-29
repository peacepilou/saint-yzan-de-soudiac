import type { Metadata } from "next";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { CommitteeCards } from "@/components/sections/CommitteeCards";
import { ContactSplit } from "@/components/sections/ContactSplit";
import { PageHero } from "@/components/sections/Hero";
import { MayorBlock } from "@/components/sections/MayorBlock";
import { OfficialsGrid } from "@/components/sections/OfficialsGrid";
import { DarkBand } from "@/components/sections/PhotoBand";
import { Button } from "@/components/ui/Button";
import { SubNav } from "@/components/ui/SubNav";
import { communityDelegates } from "@/data/officials";
import { site } from "@/data/site";
import { type } from "@/lib/styles";

export const metadata: Metadata = { title: "Les élus" };

export default function ElusPage() {
  return (
    <SiteFrame
      header={{ variant: "overlay", current: "mairie" }}
    >
      <PageHero
        img="eglise11"
        alt="L'église Saint-Laurent au cœur du bourg"
        position="center 60%"
        crumbs={[{ label: "Accueil", href: "/" }, { label: "La mairie", href: "/mairie" }, { label: "Les élus" }]}
        title="Les élus"
        lead="Le maire, les adjoints et les conseillers municipaux élus pour représenter les habitants de Saint-Yzan-de-Soudiac."
        narrow
      />
      <SubNav
        items={[
          { id: "maire", label: "Le maire" },
          { id: "conseil", label: "Le conseil municipal" },
          { id: "commissions", label: "Commissions" },
          { id: "cdc", label: "Délégués communautaires" },
          { id: "contact", label: "Rencontrer un élu" },
        ]}
      />

      <MayorBlock />
      <OfficialsGrid />

      <section id="commissions" aria-labelledby="h-com" className="mx-auto max-w-[1360px] px-5 pt-12 md:px-10 md:pt-32">
        <div className="flex flex-wrap gap-12">
          <div className="flex flex-[1_1_340px] flex-col gap-4">
            <h2 id="h-com" className={type.h2Section}>
              Commissions
            </h2>
            <p className="text-muted">Les commissions municipales préparent les dossiers soumis au vote du conseil.</p>
          </div>
          <CommitteeCards />
        </div>
      </section>

      <DarkBand
        id="cdc"
        img="gareHD"
        alt=""
        eyebrow="Intercommunalité"
        title="Nos délégués à la Communauté de communes Latitude Nord Gironde"
        cta={{ label: "L'intercommunalité", href: "/mairie#interco" }}
        credit="Gare de Saint-Mariens – Saint-Yzan · photo Cramos, CC BY-SA 4.0"
      >
        <ul className="m-0 flex list-none flex-col rounded-[24px] bg-ink px-7 py-2">
          {communityDelegates.map((d, i) => (
            <li
              key={i}
              className="flex flex-wrap justify-between gap-x-4 gap-y-1 border-b border-ink-hover py-[18px] last:border-b-0"
            >
              <strong>{d.name}</strong>
              <span className="text-on-dark">{d.role}</span>
            </li>
          ))}
        </ul>
      </DarkBand>

      <ContactSplit
        id="contact"
        labelledBy="h-contact"
        flush
        media={{ img: "mairie", alt: "Entrée de la mairie, rue Émile Gauthier" }}
        mediaHeight="md:h-[560px]"
      >
        <h2 id="h-contact" className={type.h2Contact}>
          Rencontrer un élu
        </h2>
        <p className="text-[17px] text-on-accent md:text-[19px]">
          Le maire et les adjoints reçoivent sur rendez-vous. Contactez l&apos;accueil de la mairie pour convenir d&apos;un créneau.
        </p>
        <p>{site.address}</p>
        <div className="flex flex-wrap gap-3">
          <Button href={site.phoneHref} variant="white" size={54}>
            {site.phone}
          </Button>
          <Button href={site.emailHref} variant="outline-inverse" size={54}>
            Écrire à la mairie
          </Button>
        </div>
      </ContactSplit>
    </SiteFrame>
  );
}
