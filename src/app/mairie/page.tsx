import type { Metadata } from "next";
import Link from "next/link";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { ContactSplit, HoursList } from "@/components/sections/ContactSplit";
import { DocumentsByYear } from "@/components/sections/DocumentBrowser";
import { PageHero } from "@/components/sections/Hero";
import { CalloutBand } from "@/components/sections/PhotoBand";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/icons";
import { SubNav } from "@/components/ui/SubNav";
import { mairieDocuments } from "@/data/documents";
import { site } from "@/data/site";
import { type } from "@/lib/styles";
import { LinkArrow } from "@/components/ui/LinkArrow";

export const metadata: Metadata = { title: "La mairie" };

const adjoints = ["1er adjoint", "2e adjoint", "3e adjoint", "4e adjoint"];

const syndicates = [
  { name: "S.I.A. de la Saye, du Galostre et du Lary", text: "Aménagement des cours d'eau", href: "http://www.syndicat-saye.fr/" },
  { name: "SMICVAL", text: "Collecte et valorisation des déchets", href: "https://www.smicval.fr/" },
  { name: "S.I. des lycées de Blaye", text: "Transport scolaire", href: "http://www.transport-scolaire-blaye.fr/" },
];

export default function MairiePage() {
  return (
    <SiteFrame header={{ variant: "overlay", current: "mairie" }}>
      <PageHero
        img="mairie"
        alt="Façade de la mairie de Saint-Yzan-de-Soudiac"
        position="center 60%"
        crumbs={[{ label: "Accueil", href: "/" }, { label: "La mairie" }]}
        title="La mairie"
        lead="Vos élus, les décisions du conseil municipal et le fonctionnement de la commune."
        narrow
      />
      <SubNav
        items={[
          { id: "conseil", label: "Conseil municipal" },
          { id: "comptes-rendus", label: "Comptes rendus" },
          { id: "budget", label: "Budget & marchés" },
          { id: "interco", label: "Intercommunalité" },
          { id: "contact", label: "Contact & horaires" },
        ]}
      />

      <section id="conseil" aria-labelledby="h-conseil" className="mx-auto max-w-[1360px] px-5 pt-12 md:px-10 md:pt-[104px]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-x-16 gap-y-6 md:mb-12">
          <h2 id="h-conseil" className={`${type.h2Section} flex-[1_1_480px]`}>
            Le conseil municipal
          </h2>
          <p className="max-w-[480px] flex-[1_1_380px] text-muted">
            Élu pour six ans, le conseil municipal règle par ses délibérations les affaires de la commune. Ses séances sont publiques.
          </p>
        </div>
        <div className="flex flex-wrap gap-6">
          <article className="flex flex-[1_1_420px] flex-wrap items-center gap-7 rounded-[24px] bg-accent p-6 text-white md:p-8">
            <div aria-hidden="true" className="flex size-[132px] flex-none items-center justify-center rounded-full bg-accent-deep font-display text-[40px] font-bold">
              [NN]
            </div>
            <div className="flex flex-col gap-1.5">
              <Eyebrow as="span" tone="dark">
                Maire
              </Eyebrow>
              <strong className="font-display text-[28px] tracking-[-0.02em] md:text-[32px]">[Prénom Nom]</strong>
              <span className="text-on-accent">Reçoit sur rendez-vous en mairie</span>
            </div>
          </article>
          <div className="grid min-w-0 flex-[999_1_640px] grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
            {adjoints.map((role, i) => (
              <article key={role} className="flex items-center gap-4 rounded-[20px] bg-surface p-5">
                <div aria-hidden="true" className="flex size-16 flex-none items-center justify-center rounded-full bg-portrait font-bold">
                  {i + 1}
                </div>
                <div className="flex flex-col">
                  <strong>[Prénom Nom]</strong>
                  <span className="text-[15px] text-muted">{role} · [délégation]</span>
                </div>
              </article>
            ))}
          </div>
        </div>
        <Link href="/mairie/elus" className="mt-7 inline-flex items-center gap-1.5 font-semibold link-hover">
          Voir tous les élus et les commissions
          <LinkArrow />
        </Link>
      </section>

      <section id="comptes-rendus" aria-labelledby="h-cr" className="mx-auto max-w-[1360px] px-5 pt-12 md:px-10 md:pt-[120px]">
        <DocumentsByYear
          docs={mairieDocuments}
          intro={
            <>
              <h2 id="h-cr" className={type.h2Section}>
                Comptes rendus
              </h2>
              <p className="text-muted">Procès-verbaux des séances, délibérations et arrêtés, téléchargeables en PDF.</p>
              <Link href="/mairie/comptes-rendus" className="inline-flex items-center gap-1.5 self-start font-semibold link-hover">
                Tous les documents
                <LinkArrow />
              </Link>
            </>
          }
        />
      </section>

      <CalloutBand
        img="eglise11"
        alt="L'église Saint-Laurent au centre du bourg"
        eyebrow="Participer"
        title="Les séances du conseil sont ouvertes au public"
        cta={{ label: "Prochaine séance dans l'agenda", href: "/agenda" }}
      />

      <section
        id="budget"
        aria-label="Budget et marchés publics"
        className="mx-auto grid max-w-[1360px] grid-cols-[repeat(auto-fit,minmax(min(360px,100%),1fr))] gap-6 px-5 pt-12 md:px-10 md:pt-[120px]"
      >
        <article className="flex flex-col gap-4 rounded-[28px] bg-surface p-7 md:p-11">
          <Icon name="chart" size={36} className="text-accent" />
          <h2 className={type.h2Card}>Budget communal</h2>
          <p className="text-text">Budget primitif, compte administratif et présentation synthétique des finances de la commune.</p>
          <Link href="/mairie/comptes-rendus?type=budget" className="inline-flex items-center gap-1.5 self-start font-semibold link-hover">
            Consulter les documents budgétaires
            <LinkArrow />
          </Link>
        </article>
        <article id="marches" className="flex flex-col gap-4 rounded-[28px] bg-surface p-7 md:p-11">
          <Icon name="briefcase" size={36} className="text-accent" />
          <h2 className={type.h2Card}>Marchés publics</h2>
          <p className="text-text">Consultations en cours, avis d&apos;attribution et accès au profil acheteur de la commune.</p>
          <Link href="/contact" className="inline-flex items-center gap-1.5 self-start font-semibold link-hover">
            Contacter la mairie
            <LinkArrow />
          </Link>
        </article>
      </section>

      <section id="interco" aria-labelledby="h-interco" className="mx-auto max-w-[1360px] px-5 pt-12 md:px-10 md:pt-[120px]">
        <div className="flex flex-wrap gap-12">
          <div className="flex flex-[1_1_380px] flex-col gap-[18px]">
            <h2 id="h-interco" className={type.h2Section}>
              Intercommunalité
            </h2>
            <p className="text-muted">
              Saint-Yzan-de-Soudiac travaille avec ses voisines au sein de la Communauté de communes et de plusieurs syndicats.
            </p>
          </div>
          <div className="flex min-w-0 flex-[999_1_640px] flex-col gap-4">
            <article className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 rounded-[24px] border border-line p-6 md:p-8">
              <div className="flex flex-col gap-1">
                <strong className="font-display text-[22px] tracking-[-0.01em] md:text-[26px]">Communauté de communes Latitude Nord Gironde</strong>
                <span className="text-muted">Maison de la CdC · 2 rue de la Ganne, 33920 Saint-Savin</span>
              </div>
              <Button href="https://www.latitude-nord-gironde.fr" size={46} className="px-5">
                Site de la CdC
                <LinkArrow external />
              </Button>
            </article>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
              {syndicates.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  className="flex flex-col gap-1.5 rounded-[20px] bg-surface p-6 text-ink no-underline hover:brightness-[.96]"
                >
                  <strong>{s.name}</strong>
                  <span className="text-[15px] text-muted">
                    {s.text}
                    <LinkArrow external size={14} className="ml-1 align-[-2px]" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactSplit id="contact" labelledBy="h-contact" media={{ map: true }} mediaSide="right">
        <h2 id="h-contact" className={type.h2Contact}>
          Contact &amp; horaires
        </h2>
        <p className="text-[17px] text-on-accent md:text-[19px]">
          {site.address}
          <br />
          {site.phone} · {site.email}
        </p>
        <HoursList />
      </ContactSplit>
    </SiteFrame>
  );
}
