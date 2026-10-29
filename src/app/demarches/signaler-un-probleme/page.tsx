import type { Metadata } from "next";
import { ReportForm } from "@/components/forms/ReportForm";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { PageHero } from "@/components/sections/Hero";
import { type } from "@/lib/styles";

export const metadata: Metadata = { title: "Signaler un problème" };

export default function SignalerPage() {
  return (
    <SiteFrame header={{ variant: "overlay", current: "demarches" }}>
      <PageHero
        img="mairie"
        alt="Façade de la mairie de Saint-Yzan-de-Soudiac"
        position="center 60%"
        height="md:h-[620px]"
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Démarches", href: "/demarches" }, { label: "Signaler un problème" }]}
        title="Signaler un problème"
        lead="Nid-de-poule, lampadaire en panne, dépôt sauvage… Les services techniques sont prévenus directement."
        narrow
      />
      <section aria-labelledby="h-sig" className="mx-auto max-w-[1360px] px-5 py-12 md:px-10 md:py-[120px]">
        <div className="flex flex-wrap gap-14">
          <div className="flex flex-[1_1_360px] flex-col gap-[18px]">
            <h2 id="h-sig" className={type.h2Section}>
              Votre signalement
            </h2>
            <p className="text-muted">Décrivez le problème et indiquez le lieu le plus précisément possible. Une photo aide les services à intervenir.</p>
            <p className="rounded-[14px] bg-warning-bg px-5 py-4 text-[15px]">
              En cas d&apos;urgence ou de danger immédiat, appelez le <strong>112</strong>.
            </p>
          </div>
          <ReportForm />
        </div>
      </section>
    </SiteFrame>
  );
}
