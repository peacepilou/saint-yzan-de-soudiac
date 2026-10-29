import Form from "next/form";
import Image, { getImageProps } from "next/image";
import type { ReactNode } from "react";
import { preload } from "react-dom";
import { Breadcrumb, type Crumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/icons";
import { photos } from "@/data/photos";
import { type } from "@/lib/styles";
import type { PhotoKey } from "@/lib/types";
import { cn } from "@/lib/utils";
import { OpeningBadge } from "./OpeningBadge";
import { PhotoCredit } from "./PhotoCredit";

/** Hero pleine largeur des pages intérieures : photo assombrie, fil d'Ariane, H1 et chapô en bas à gauche. */
export function PageHero({
  img,
  alt,
  position = "center",
  grayscale,
  height = "md:h-[640px]",
  crumbs,
  title,
  lead,
  credit,
  narrow,
  children,
}: {
  img: PhotoKey;
  alt: string;
  position?: string;
  grayscale?: boolean;
  height?: string;
  crumbs: Crumb[];
  title: ReactNode;
  lead?: string;
  credit?: string;
  narrow?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className={cn("relative h-[560px] overflow-hidden bg-ink", height)}>
      <Image
        src={photos[img].src}
        alt={alt}
        fill
        preload
        sizes="100vw"
        className={cn("object-cover brightness-[.42]", grayscale && "grayscale")}
        style={{ objectPosition: position }}
      />
      <div className={cn("absolute inset-x-0", credit ? "bottom-14 md:bottom-16" : "bottom-10 md:bottom-16")}>
        <Container className="text-white">
          <Breadcrumb items={crumbs} />
          <h1 className={cn(type.h1Page, "mt-4")}>{title}</h1>
          {lead && <p className={cn(type.lead, "mt-5 text-on-photo", narrow ? "max-w-[560px]" : "max-w-[600px]")}>{lead}</p>}
          {children}
        </Container>
      </div>
      {credit && <PhotoCredit>{credit}</PhotoCredit>}
    </div>
  );
}

/** Grande barre de recherche blanche du hero (accueil, démarches). */
export function HeroSearch({
  id,
  label,
  placeholder,
  action = "/recherche",
  className,
}: {
  id: string;
  label: string;
  placeholder: string;
  action?: string;
  className?: string;
}) {
  return (
    <Form
      action={action}
      role="search"
      aria-label={label}
      className={cn(
        "flex max-w-[640px] items-center gap-1.5 rounded-full bg-white py-1 pr-1 pl-[18px] focus-within:shadow-[0_0_0_3px_var(--color-focus)] md:gap-2 md:py-2 md:pr-2 md:pl-6",
        className,
      )}
    >
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <Icon name="search" size={20} strokeWidth={2} className="hidden flex-none text-muted md:block" />
      <input
        id={id}
        name="q"
        type="search"
        placeholder={placeholder}
        className="h-[46px] min-w-0 flex-auto border-0 bg-transparent font-[inherit] text-ink outline-none focus-visible:outline-none md:h-12 md:text-[17px]"
      />
      <button
        type="submit"
        className="flex size-[46px] flex-none cursor-pointer items-center justify-center rounded-full border-0 bg-accent font-[inherit] font-semibold text-white hover:bg-accent-hover md:h-[52px] md:w-auto md:px-[26px]"
      >
        <Icon name="search" size={18} strokeWidth={2} className="md:hidden" />
        <span className="sr-only md:not-sr-only">Rechercher</span>
      </button>
    </Form>
  );
}

/** Hero de l'accueil : photo différente en mobile (art direction), pastille d'ouverture et recherche. */
export function HomeHero() {
  const common = { alt: "L'église romane Saint-Laurent, vue latérale, entourée de pelouse et d'ifs taillés", sizes: "100vw", preload: true };
  const desktop = photos.eglise11;
  const mobile = photos.hero;
  const {
    props: { srcSet: desktopSet },
  } = getImageProps({ ...common, src: desktop.src, width: desktop.width, height: desktop.height });
  const {
    props: { srcSet: mobileSet, ...rest },
  } = getImageProps({ ...common, src: mobile.src, width: mobile.width, height: mobile.height });

  // Avec <picture>, Next ne précharge pas l'image : on précharge la bonne variante selon l'écran (LCP).
  preload(mobile.src, { as: "image", imageSrcSet: mobileSet, imageSizes: "100vw", fetchPriority: "high", media: "(max-width: 767px)" });
  preload(desktop.src, { as: "image", imageSrcSet: desktopSet, imageSizes: "100vw", fetchPriority: "high", media: "(min-width: 768px)" });

  return (
    <div className="relative h-[640px] overflow-hidden bg-ink md:h-[860px] md:overflow-visible">
      <picture>
        <source media="(min-width: 768px)" srcSet={desktopSet} />
        <source srcSet={mobileSet} />
        <img
          {...rest}
          alt={common.alt}
          className="absolute inset-0 size-full object-cover object-[40%_center] brightness-[.42] md:object-[center_55%]"
        />
      </picture>
      <div className="absolute inset-x-5 bottom-8 text-white md:relative md:inset-auto md:mx-auto md:max-w-[1360px] md:px-10 md:pt-[250px]">
        <div className="mb-3.5 md:hidden">
          <OpeningBadge compact />
        </div>
        <div className="mb-[22px] hidden md:block">
          <OpeningBadge />
        </div>
        <h1 className={cn(type.h1Home, "max-w-[1000px]")}>
          Saint-Yzan-
          <br className="hidden md:inline" />
          de-Soudiac
        </h1>
        <p className="mt-7 hidden max-w-[560px] text-[20px] leading-normal text-on-photo md:block">
          Une commune du Blayais, entre forêts et terres agricoles, aux portes de la Charente-Maritime.
        </p>
        <HeroSearch
          id="q"
          label="Rechercher sur le site"
          placeholder="Cantine, salle des fêtes, PLU…"
          className="mt-[22px] md:mt-9"
        />
      </div>
      <PhotoCredit className="hidden md:right-10 md:bottom-24 md:block">Église Saint-Laurent · photo Renhour48, CC0</PhotoCredit>
    </div>
  );
}
