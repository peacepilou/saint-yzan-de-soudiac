import Image from "next/image";
import Link from "next/link";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { AgendaList } from "@/components/sections/AgendaList";
import { AlertBanner } from "@/components/sections/AlertBanner";
import { ContactSplit, HoursList } from "@/components/sections/ContactSplit";
import { HomeHero } from "@/components/sections/Hero";
import { NewsGrid } from "@/components/sections/NewsGrid";
import { PhotoBand } from "@/components/sections/PhotoBand";
import { PhotoTiles } from "@/components/sections/PhotoTiles";
import { QuickAccess } from "@/components/sections/QuickAccess";
import { Stats } from "@/components/sections/Stats";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { homeEvents } from "@/data/events";
import { getArticle, homeNews } from "@/data/news";
import { photos } from "@/data/photos";
import { hours, site } from "@/data/site";
import { type } from "@/lib/styles";

export default function HomePage() {
  return (
    <SiteFrame header={{ variant: "overlay" }}>
      <HomeHero />
      <QuickAccess />
      <AlertBanner />
      <NewsGrid articles={homeNews.map((slug) => getArticle(slug)!)} />

      <PhotoBand
        id="h-dec"
        img="gareHD"
        alt="Le bâtiment voyageurs de la gare de Saint-Mariens – Saint-Yzan, sous un ciel bleu"
        eyebrow="Découvrir"
        title="Une commune née en 1889"
        text="Détachée de Saint-Mariens et de Saint-Savin, Saint-Yzan doit son nom à saint Dicentius, évêque de Saintes au VIIIe siècle. Son village et sa gare ont même servi de décor à un téléfilm de France 3."
        cta={{ label: "Histoire & patrimoine", href: "/decouvrir/histoire-patrimoine" }}
        credit="Gare de Saint-Mariens – Saint-Yzan · photo Cramos, CC BY-SA 4.0"
      />

      <Stats
        className="hidden md:block"
        items={[
          { value: "2 527", label: "habitants, les Soudiacais (Insee 2021)" },
          { value: "+7,8 %", label: "d'habitants entre 2015 et 2021" },
          { value: "24 %", label: "du territoire couvert de forêts" },
          { value: "4", label: "communes voisines : Bussac-Forêt, Saint-Savin, Laruscade, Saint-Mariens" },
        ]}
      />

      <section id="agenda" aria-labelledby="h-ag" className="mx-auto hidden max-w-[1360px] px-10 pt-[120px] md:block">
        <div className="flex flex-wrap gap-12">
          <div className="flex flex-[1_1_320px] flex-col gap-4">
            <Eyebrow>Agenda</Eyebrow>
            <h2 id="h-ag" className={type.h2Section}>
              À venir
            </h2>
            <p className="text-muted">Animations, marchés et séances du conseil municipal.</p>
            <Link href="/agenda" className="inline-flex items-center gap-1.5 self-start font-semibold link-hover">
              Tout l&apos;agenda
              <LinkArrow />
            </Link>
          </div>
          <AgendaList events={homeEvents} className="flex-[999_1_640px]" />
        </div>
      </section>

      <PhotoTiles />

      <ContactSplit id="contact" labelledBy="h-contact" media={{ img: "mairie", alt: "Entrée de la mairie, rue Émile Gauthier" }} desktopOnly>
        <Eyebrow tone="dark">Nous rencontrer</Eyebrow>
        <h2 id="h-contact" className="font-display text-[52px] leading-none font-bold tracking-[-0.035em]">
          Mairie de
          <br />
          Saint-Yzan-de-Soudiac
        </h2>
        <p className="text-[19px] text-on-accent">
          {site.street}
          <br />
          {site.city}
        </p>
        <HoursList ruled />
        <div className="flex flex-wrap gap-3">
          <Button href={site.phoneHref} variant="white" size={54}>
            {site.phone}
          </Button>
          <Button href={site.emailHref} variant="outline-inverse" size={54}>
            {site.email}
          </Button>
        </div>
      </ContactSplit>

      <section aria-labelledby="hm-contact" className="mt-12 bg-accent text-white md:hidden">
        <div className="relative h-[220px]">
          <Image src={photos.mairie.src} alt="Entrée de la mairie" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="flex flex-col gap-3.5 px-5 pt-7 pb-8">
          <h2 id="hm-contact" className="font-display text-[28px] font-bold tracking-[-0.02em]">
            Mairie
          </h2>
          <p className="text-[15px] text-on-accent">{site.address}</p>
          <p className="text-[15px]">
            {hours[0].shortDays} {hours[0].slots.join(" · ")}
            <br />
            {hours[1].shortDays} {hours[1].slots[0]} · {hours[2].shortDays} {hours[2].slots[0]}
          </p>
          <Button href={site.phoneHref} variant="white" size={52}>
            Appeler le {site.phone}
          </Button>
          <Button href={site.emailHref} variant="outline-inverse" size={52}>
            Écrire à la mairie
          </Button>
        </div>
      </section>
    </SiteFrame>
  );
}
