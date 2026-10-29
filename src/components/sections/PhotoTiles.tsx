import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { photos } from "@/data/photos";
import { type } from "@/lib/styles";
import type { PhotoKey } from "@/lib/types";
import { cn } from "@/lib/utils";

const tiles: { title: string; text: string; href: string; img: PhotoKey; filter: string; mobileFilter: string }[] = [
  {
    title: "Enfance & jeunesse",
    text: "École, périscolaire, centre de loisirs, transport",
    href: "/vivre-ici/enfance-jeunesse",
    img: "ecole",
    filter: "md:brightness-[.62]",
    mobileFilter: "brightness-[.58]",
  },
  {
    title: "Services publics",
    text: "La Poste, France Services, état civil",
    href: "/demarches",
    img: "poste",
    filter: "md:brightness-[.62]",
    mobileFilter: "brightness-[.58]",
  },
  {
    title: "Associations & culture",
    text: "Bibliothèque, salles municipales, associations",
    href: "/vivre-ici/associations-culture",
    img: "modillons",
    filter: "md:brightness-[.6]",
    mobileFilter: "brightness-[.55]",
  },
  {
    title: "Environnement",
    text: "Collecte, déchets verts, la Saye, Natura 2000",
    href: "/vivre-ici/environnement",
    img: "lac",
    filter: "md:brightness-[.6]",
    mobileFilter: "grayscale brightness-[.55]",
  },
];

/** « Au quotidien à Saint-Yzan » : mosaïque pleine largeur, légendes sur panneau `ink`. */
export function PhotoTiles() {
  return (
    <section aria-labelledby="h-vivre" className="px-5 pt-11 md:px-0 md:pt-32">
      <div className="mb-4 md:mx-auto md:mb-10 md:max-w-[1360px] md:px-10">
        <Eyebrow className="mb-2.5 hidden md:block">Vivre ici</Eyebrow>
        <h2 id="h-vivre" className={cn(type.h2Section, "max-md:text-[30px] max-md:tracking-[-0.03em]")}>
          <span className="md:hidden">Vivre ici</span>
          <span className="hidden md:inline">Au quotidien à Saint-Yzan</span>
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] md:px-2">
        {tiles.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="hover-media relative block h-[200px] overflow-hidden rounded-2xl text-white no-underline md:h-[560px] md:rounded-[18px]"
          >
            <Image
              src={photos[t.img].src}
              alt=""
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className={cn("object-cover", t.mobileFilter, t.filter, t.img === "lac" && "md:grayscale")}
            />
            <span className="absolute inset-x-2 bottom-2 flex flex-col gap-1.5 rounded-[10px] bg-ink px-2.5 py-2 md:inset-x-4 md:bottom-4 md:rounded-[14px] md:px-[22px] md:py-5">
              <strong className="font-display text-[17px] leading-[1.15] md:text-[30px] md:tracking-[-0.02em]">{t.title}</strong>
              <span className="hidden text-on-dark md:block">{t.text}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
