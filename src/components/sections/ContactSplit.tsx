import Image from "next/image";
import type { ReactNode } from "react";
import { hours } from "@/data/site";
import { photos } from "@/data/photos";
import type { PhotoKey } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Bloc pleine largeur moitié photo (ou carte), moitié texte sur fond `accent` ou `surface`. */
export function ContactSplit({
  id,
  labelledBy,
  tone = "accent",
  media,
  mediaHeight = "md:h-[640px]",
  mediaSide = "left",
  desktopOnly,
  flush,
  className,
  children,
}: {
  id?: string;
  labelledBy: string;
  tone?: "accent" | "surface";
  media: { img: PhotoKey; alt: string } | { map: true };
  mediaHeight?: string;
  mediaSide?: "left" | "right";
  desktopOnly?: boolean;
  /** Collé à la section précédente (sans marge haute). */
  flush?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const mediaNode =
    "map" in media ? (
      <div className="flex min-h-[320px] flex-[1_1_520px] items-center justify-center bg-accent-deep px-5 text-center text-[15px] text-on-accent md:min-h-[480px]">
        [Carte OpenStreetMap de la mairie]
      </div>
    ) : (
      <div className={cn("relative h-[260px] min-w-0 flex-[1_1_520px]", mediaHeight)}>
        <Image src={photos[media.img].src} alt={media.alt} fill sizes="(min-width: 1040px) 50vw, 100vw" className="object-cover" />
      </div>
    );

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("flex-wrap", !flush && "mt-12 md:mt-32", desktopOnly ? "hidden md:flex" : "flex", tone === "accent" ? "bg-accent text-white" : "bg-surface text-ink", className)}
    >
      {mediaSide === "left" && mediaNode}
      <div className="box-border flex flex-[1_1_520px] flex-col justify-center gap-6 px-5 py-10 md:gap-7 md:px-16 md:py-20">{children}</div>
      {mediaSide === "right" && mediaNode}
    </section>
  );
}

/** Horaires d'accueil en liste de définitions, éventuellement entre deux filets. */
export function HoursList({ ruled = false }: { ruled?: boolean }) {
  return (
    <dl
      className={cn(
        "grid grid-cols-[auto_1fr] gap-x-8 gap-y-3",
        ruled && "border-y border-accent-rule py-6",
      )}
    >
      {hours.map((h) => (
        <div key={h.days} className="contents">
          <dt className="text-on-accent-muted">{h.days}</dt>
          <dd className="font-semibold">{h.slots.join(" · ")}</dd>
        </div>
      ))}
    </dl>
  );
}
