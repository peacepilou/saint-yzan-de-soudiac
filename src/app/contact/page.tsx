import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { HoursList } from "@/components/sections/ContactSplit";
import { PageIntro } from "@/components/sections/PageIntro";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <SiteFrame header={{ variant: "solid", current: "contact" }}>
      <PageIntro
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Contact" }]}
        title="Contacter la mairie"
        lead="L'accueil de la mairie vous reçoit, vous répond par téléphone ou par écrit."
        wide
      />
      <div className="mx-auto flex max-w-[1360px] flex-wrap gap-10 px-5 pb-16 md:px-10 md:pb-[120px]">
        <section aria-labelledby="h-coord" className="flex flex-[1_1_420px] flex-col gap-6 self-start rounded-[24px] bg-accent p-7 text-white md:p-10">
          <h2 id="h-coord" className="font-display text-[28px] leading-[1.1] font-bold tracking-[-0.02em] md:text-[34px]">
            Coordonnées &amp; horaires
          </h2>
          <p className="text-[17px] text-on-accent md:text-[19px]">
            {site.street}
            <br />
            {site.city}
          </p>
          <HoursList ruled />
          <div className="flex flex-wrap gap-3">
            <Button href={site.phoneHref} variant="white" size={52}>
              {site.phone}
            </Button>
            <Button href={site.emailHref} variant="outline-inverse" size={52}>
              {site.email}
            </Button>
          </div>
        </section>
        <section aria-labelledby="h-form" className="flex min-w-0 flex-[999_1_600px] flex-col gap-6">
          <h2 id="h-form" className="font-display text-[28px] font-bold tracking-[-0.02em] md:text-[34px]">
            Écrire à la mairie
          </h2>
          <ContactForm />
        </section>
      </div>
    </SiteFrame>
  );
}
