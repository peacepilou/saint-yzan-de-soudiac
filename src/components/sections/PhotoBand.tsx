import Image from "next/image";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SmartLink } from "@/components/ui/SmartLink";
import { photos } from "@/data/photos";
import { type } from "@/lib/styles";
import type { PhotoKey } from "@/lib/types";
import { cn } from "@/lib/utils";
import { PhotoCredit } from "./PhotoCredit";
import { LinkArrow } from "@/components/ui/LinkArrow";

type BandImage = { img: PhotoKey; alt: string; position?: string };

function BandPhoto({ img, alt, position, className }: BandImage & { className?: string }) {
  return (
    <Image
      src={photos[img].src}
      alt={alt}
      fill
      sizes="100vw"
      className={cn("object-cover", className)}
      style={position ? { objectPosition: position } : undefined}
    />
  );
}

/** Bandeau photo pleine largeur avec carte blanche en bas à gauche (« Une commune née en 1889 »). */
export function PhotoBand({
  id,
  eyebrow,
  title,
  text,
  cta,
  credit,
  ...image
}: BandImage & {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  cta: { label: string; href: string };
  credit?: string;
}) {
  return (
    <section aria-labelledby={id} className="relative mt-12 h-[520px] overflow-hidden md:mt-32 md:h-[720px]">
      <BandPhoto {...image} />
      <div className="absolute inset-x-4 bottom-4 md:relative md:inset-auto md:mx-auto md:flex md:h-full md:max-w-[1360px] md:items-end md:px-10 md:pb-14">
        <div className="flex max-w-[520px] flex-col gap-2.5 rounded-[20px] bg-white p-[22px] md:gap-4 md:rounded-[24px] md:p-10">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id={id} className="font-display text-[26px] leading-[1.05] font-bold tracking-[-0.02em] md:text-[40px] md:tracking-[-0.03em]">
            {title}
          </h2>
          <p className="hidden text-text md:block">{text}</p>
          <SmartLink href={cta.href} className="inline-flex items-center gap-1.5 font-semibold link-hover md:hidden">
            {cta.label}
            <LinkArrow />
          </SmartLink>
          <div className="hidden md:block">
            <Button href={cta.href} size={50}>
              {cta.label}
              <LinkArrow />
            </Button>
          </div>
        </div>
      </div>
      {credit && <PhotoCredit className="hidden md:block">{credit}</PhotoCredit>}
    </section>
  );
}

/** Bandeau photo assombri avec texte blanc et bouton (« Les séances du conseil… »). */
export function CalloutBand({
  eyebrow,
  title,
  cta,
  ...image
}: BandImage & { eyebrow: string; title: string; cta: { label: string; href: string } }) {
  return (
    <section aria-labelledby="h-callout" className="relative mt-12 h-[440px] overflow-hidden md:mt-32 md:h-[520px]">
      <BandPhoto {...image} className="brightness-[.55]" />
      <Container className="relative flex h-full items-center text-white">
        <div className="flex max-w-[760px] flex-col gap-5">
          <Eyebrow tone="photo">{eyebrow}</Eyebrow>
          <h2 id="h-callout" className={type.h2Band}>
            {title}
          </h2>
          <Button href={cta.href} variant="white" size={52} className="self-start">
            {cta.label}
            <LinkArrow />
          </Button>
        </div>
      </Container>
    </section>
  );
}

/** Bandeau sombre avec liste sur panneau `ink` (délégués communautaires). */
export function DarkBand({
  id,
  eyebrow,
  title,
  cta,
  credit,
  children,
  ...image
}: BandImage & {
  id: string;
  eyebrow: string;
  title: string;
  cta: { label: string; href: string };
  credit?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`h-${id}`} className="relative mt-12 min-h-[560px] overflow-hidden bg-ink md:mt-32">
      <BandPhoto {...image} className="brightness-[.42]" />
      <Container className="relative flex flex-wrap items-center gap-x-[72px] gap-y-10 py-16 pb-20 text-white md:py-24">
        <div className="flex flex-[1_1_420px] flex-col gap-[18px]">
          <Eyebrow tone="photo">{eyebrow}</Eyebrow>
          <h2 id={`h-${id}`} className="font-display text-[30px] leading-[1.02] font-bold tracking-[-0.035em] md:text-[48px]">
            {title}
          </h2>
          <Button href={cta.href} variant="white" size={50} className="self-start">
            {cta.label}
            <LinkArrow />
          </Button>
        </div>
        <div className="flex-[1_1_420px]">{children}</div>
      </Container>
      {credit && <PhotoCredit>{credit}</PhotoCredit>}
    </section>
  );
}

/** Bandeau photo sans assombrissement, avec légende sur carte blanche (modillons). */
export function CaptionBand({ caption, ...image }: BandImage & { caption: string }) {
  return (
    <figure className="relative m-0 mt-12 h-[420px] overflow-hidden md:mt-28 md:h-[620px]">
      <BandPhoto {...image} />
      <figcaption className="absolute inset-x-0 bottom-6 md:bottom-12">
        <Container size="narrow">
          <span className="inline-block rounded-[14px] bg-white px-5 py-3.5 font-semibold">{caption}</span>
        </Container>
      </figcaption>
    </figure>
  );
}
