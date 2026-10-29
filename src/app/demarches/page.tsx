import type { Metadata } from "next";
import Link from "next/link";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { ContactSplit } from "@/components/sections/ContactSplit";
import { PageHero } from "@/components/sections/Hero";
import { ProcedureBrowser, ProcedureQueryProvider, ProcedureSearch } from "@/components/sections/ProcedureFinder";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon, type IconName } from "@/components/ui/icons";
import { type } from "@/lib/styles";
import { cn } from "@/lib/utils";
import { LinkArrow } from "@/components/ui/LinkArrow";

export const metadata: Metadata = { title: "Démarches" };

const topProcedures: { title: string; text: string; href: string; icon: IconName; tone: "accent" | "surface" | "warning" }[] = [
  { title: "Réserver une salle municipale", text: "Fêtes, réunions, associations", href: "/demarches/reserver-une-salle", icon: "hall", tone: "accent" },
  { title: "Carte d'identité & passeport", text: "Prise de rendez-vous en mairie équipée", href: "/demarches/carte-identite-passeport", icon: "idCard", tone: "surface" },
  { title: "Permis & déclaration de travaux", text: "Dépôt dématérialisé, consultation du PLU", href: "/demarches/permis-de-construire", icon: "building", tone: "surface" },
  { title: "Signaler un problème", text: "Voirie, éclairage, dépôt sauvage", href: "/demarches/signaler-un-probleme", icon: "warning", tone: "warning" },
];

const toneClass = {
  accent: { card: "bg-accent text-white", icon: "text-white", text: "text-on-accent" },
  surface: { card: "bg-surface text-ink", icon: "text-accent", text: "text-muted" },
  warning: { card: "bg-warning-bg text-ink", icon: "text-warning", text: "text-muted" },
};

export default function DemarchesPage() {
  return (
    <SiteFrame header={{ variant: "overlay", current: "demarches" }}>
      <ProcedureQueryProvider>
        <PageHero
          img="poste"
          alt="Le bureau de poste de la commune"
          position="center 40%"
          height="md:h-[620px]"
          crumbs={[{ label: "Accueil", href: "/" }, { label: "Démarches" }]}
          title="Démarches"
        >
          <ProcedureSearch />
        </PageHero>

        <section aria-labelledby="h-top" className="mx-auto max-w-[1360px] px-5 pt-12 md:px-10 md:pt-24">
          <h2 id="h-top" className={cn(type.h2Medium, "mb-6 md:mb-8")}>
            Les plus demandées
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-4">
            {topProcedures.map((p) => {
              const t = toneClass[p.tone];
              return (
                <Link
                  key={p.title}
                  href={p.href}
                  className={cn("flex flex-col gap-[18px] rounded-[22px] p-7 no-underline hover:brightness-[.96]", t.card)}
                >
                  <Icon name={p.icon} size={30} className={t.icon} />
                  <strong className="font-display text-[22px] md:text-[24px]">{p.title}</strong>
                  <span className={t.text}>{p.text}</span>
                </Link>
              );
            })}
          </div>
        </section>

        <ProcedureBrowser />
      </ProcedureQueryProvider>

      <ContactSplit
        id="france-services"
        labelledBy="h-fs"
        tone="surface"
        media={{ img: "gareHD", alt: "La gare de Saint-Mariens – Saint-Yzan" }}
        mediaHeight="md:h-[560px]"
      >
        <Eyebrow>Besoin d&apos;aide ?</Eyebrow>
        <h2 id="h-fs" className="font-display text-[30px] leading-[1.02] font-bold tracking-[-0.035em] md:text-[48px]">
          France Services vous accompagne
        </h2>
        <p className="text-[17px] text-text md:text-[18px]">
          Impôts, CAF, retraite, carte grise, santé : des agents formés vous aident dans vos démarches administratives en ligne, gratuitement.
        </p>
        <Button href="/actualites/france-services" size={52} className="self-start">
          En savoir plus
          <LinkArrow />
        </Button>
      </ContactSplit>

      <section id="signaler" aria-labelledby="h-sig" className="mx-auto max-w-[1360px] px-5 py-12 md:px-10 md:py-[120px]">
        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-6 rounded-[24px] bg-warning-bg p-7 md:p-10">
          <div className="flex max-w-[640px] flex-[1_1_420px] flex-col gap-3">
            <h2 id="h-sig" className={type.h2Medium}>
              Signaler un problème
            </h2>
            <p className="text-text">
              Nid-de-poule, lampadaire en panne, dépôt sauvage… Les services techniques sont prévenus directement. En cas d&apos;urgence ou de
              danger immédiat, appelez le <strong>112</strong>.
            </p>
          </div>
          <Button href="/demarches/signaler-un-probleme" size={52}>
            Faire un signalement
            <LinkArrow />
          </Button>
        </div>
      </section>
    </SiteFrame>
  );
}
