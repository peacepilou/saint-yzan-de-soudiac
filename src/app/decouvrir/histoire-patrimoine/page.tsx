import type { Metadata } from "next";
import Image from "next/image";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { PageHero } from "@/components/sections/Hero";
import { CaptionBand } from "@/components/sections/PhotoBand";
import { Timeline } from "@/components/sections/Timeline";
import { VideoConsent } from "@/components/sections/VideoConsent";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { history } from "@/data/history";
import { photos } from "@/data/photos";
import { figures } from "@/data/site";
import { type } from "@/lib/styles";
import type { PhotoKey } from "@/lib/types";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Histoire et patrimoine" };

const places: { img: PhotoKey; alt: string; title: string; text: string }[] = [
  {
    img: "gare",
    alt: "Bâtiment voyageurs de la gare",
    title: "Gare de Saint-Mariens – Saint-Yzan",
    text: "Partagée avec Saint-Mariens, elle relie la commune au réseau ferroviaire régional.",
  },
  {
    img: "monument",
    alt: "Monument aux morts surmonté d'une statue de poilu",
    title: "Monument aux morts",
    text: "Il honore les Soudiacais morts pour la France pendant la Grande Guerre.",
  },
  { img: "mairie", alt: "Façade de la mairie", title: "La mairie", text: "Rue Émile Gauthier, au cœur de la vie municipale." },
];

function Photo({ img, alt, className, grayscale, position }: { img: PhotoKey; alt: string; className: string; grayscale?: boolean; position?: string }) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={photos[img].src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className={cn("object-cover", grayscale && "grayscale")}
        style={position ? { objectPosition: position } : undefined}
      />
    </div>
  );
}

export default function DecouvrirPage() {
  return (
    <SiteFrame
      header={{ variant: "overlay", current: "decouvrir" }}
    >
      <PageHero
        img="eglise"
        alt="Façade romane de l'église Saint-Laurent et son clocher-mur"
        position="center 35%"
        height="md:h-[760px]"
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Découvrir" }, { label: "Histoire & patrimoine" }]}
        title={
          <>
            Histoire &amp;
            <br />
            patrimoine
          </>
        }
        lead="Des origines médiévales à la commune d'aujourd'hui : l'histoire d'un bourg du Blayais, à la frontière de la Saintonge."
        credit="Église Saint-Laurent · photo William Ellison, CC BY-SA 4.0"
      />

      <Container as="section" size="narrow" aria-labelledby="h-sit" className="flex flex-wrap gap-x-[72px] gap-y-10 pt-12 md:pt-[104px]">
        <div className="flex-[1_1_380px]">
          <Eyebrow className="mb-4">Le territoire</Eyebrow>
          <h2 id="h-sit" className={type.h2Large}>
            Aux confins de la Gironde
          </h2>
        </div>
        <div className="flex flex-[1_1_520px] flex-col gap-5 text-[17px] text-text md:text-[18px]">
          <p>
            Saint-Yzan-de-Soudiac s&apos;étend dans le Blayais, entre l&apos;autoroute A10 et la RN10. Au nord-est, la Saye, affluent de l&apos;Isle,
            borde la commune et trace la limite avec la Charente-Maritime.
          </p>
          <p>
            Ses voisines sont Bussac-Forêt, Saint-Savin, Laruscade et Saint-Mariens. La forêt couvre près d&apos;un quart du territoire, les terres
            agricoles une part équivalente.
          </p>
          <dl className="mt-3 grid grid-cols-3 gap-5">
            {[
              { label: "Forêts", value: figures.forest },
              { label: "Zones agricoles", value: figures.farmland },
              { label: "Point culminant", value: figures.altitudeMax },
            ].map((f) => (
              <div key={f.label} className="border-t border-ink pt-3.5">
                <dt className="text-[14px] text-muted">{f.label}</dt>
                <dd className="mt-1 font-display text-[24px] font-semibold text-ink md:text-[32px]">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>

      <section aria-labelledby="h-frise" className="mt-12 bg-surface md:mt-[104px]">
        <Container size="narrow" className="py-12 md:py-24">
          <h2 id="h-frise" className={cn(type.h2Large, "mb-8 md:mb-12")}>
            Quelques dates
          </h2>
          <Timeline entries={history} />
        </Container>
      </section>

      <CaptionBand
        img="modillons"
        alt="Modillons sculptés sous la corniche de l'église Saint-Laurent"
        caption="Les modillons sculptés de l'église Saint-Laurent · photo William Ellison, CC BY-SA 4.0"
      />

      <Container as="section" size="narrow" id="eglise" aria-labelledby="h-eg" className="pt-12 md:pt-28">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] gap-6">
          <Photo
            img="eglise"
            alt="Façade occidentale de l'église Saint-Laurent, avec son portail et son clocher-mur"
            className="h-[420px] rounded-[24px] md:h-[640px]"
          />
          <div className="flex flex-col gap-6">
            <Photo
              img="hero"
              alt="L'église Saint-Laurent vue de côté, entourée de pelouse et d'ifs taillés"
              className="h-[240px] rounded-[24px] md:h-[300px]"
            />
            <div className="flex flex-1 flex-col justify-center gap-[18px] px-2 pt-2">
              <Eyebrow>Patrimoine religieux</Eyebrow>
              <h2 id="h-eg" className={type.h2Medium}>
                L&apos;église Saint-Laurent
              </h2>
              <p className="text-[17px] text-text md:text-[18px]">
                Église paroissiale de style roman, elle reste le repère du bourg. Sa façade est surmontée d&apos;un clocher-mur à deux baies ; ses
                modillons sculptés et son cadran canonial témoignent de son ancienneté.
              </p>
            </div>
          </div>
        </div>
      </Container>

      <Container as="section" size="narrow" aria-labelledby="h-lieux" className="pt-12 md:pt-28">
        <h2 id="h-lieux" className={cn(type.h2Large, "mb-8")}>
          Lieux de mémoire
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-x-6 gap-y-8">
          {places.map((p) => (
            <article key={p.title} className="flex flex-col gap-3.5">
              <Photo img={p.img} alt={p.alt} className="h-[300px] rounded-[20px]" />
              <h3 className="font-display text-[22px] font-bold">{p.title}</h3>
              <p className="text-[16px] text-muted">{p.text}</p>
            </article>
          ))}
        </div>
      </Container>

      <Container as="section" size="narrow" aria-labelledby="h-cp" className="pt-12 md:pt-28">
        <div className="flex flex-wrap items-center gap-x-[72px] gap-y-10 rounded-[28px] bg-ink p-6 text-white md:p-12">
          <div className="flex flex-[1_1_320px] flex-col gap-4">
            <Eyebrow tone="dark">Archives</Eyebrow>
            <h2 id="h-cp" className={type.h2Medium}>
              Saint-Yzan en cartes postales
            </h2>
            <p className="text-on-dark">
              Le bourg, l&apos;église, l&apos;école et l&apos;étang tels qu&apos;on les voyait au début du siècle dernier. Vous avez des photos anciennes de
              la commune ? Partagez-les avec la mairie.
            </p>
            <Button href="/contact" variant="white" size={48} className="self-start">
              Partager une photo
            </Button>
          </div>
          <div className="grid flex-[1_1_520px] grid-cols-2 gap-4">
            {[
              { img: "lac" as const, alt: "Carte postale : l'étang avec une barque", caption: "L'étang" },
              { img: "bourg" as const, alt: "Carte postale : la rue principale du bourg", caption: "La rue principale", position: "left" },
            ].map((c) => (
              <figure key={c.img} className="m-0">
                <Photo img={c.img} alt={c.alt} grayscale position={c.position} className="h-[200px] rounded-2xl md:h-[280px]" />
                <figcaption className="mt-2 text-[14px] text-on-dark">{c.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Container>

      <Container size="narrow" className="grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] gap-6 py-12 md:py-28">
        <article id="jumelage" aria-labelledby="h-jum" className="flex flex-col gap-3.5 rounded-[24px] bg-accent-soft p-7 md:p-10">
          <Eyebrow>Jumelage</Eyebrow>
          <h2 id="h-jum" className={type.h2Card}>
            Mendavia, Espagne
          </h2>
          <p className="text-text">
            Saint-Yzan-de-Soudiac est jumelée avec Mendavia, en Navarre. [Historique du jumelage et prochaines rencontres à compléter par le comité.]
          </p>
        </article>
        <article id="etang" aria-labelledby="h-etang" className="flex flex-col gap-3.5 rounded-[24px] bg-surface p-7 md:p-10">
          <Eyebrow>Projet communal</Eyebrow>
          <h2 id="h-etang" className={type.h2Card}>
            Réhabilitation de l&apos;étang de la Baraque
          </h2>
          <VideoConsent />
        </article>
      </Container>
    </SiteFrame>
  );
}
