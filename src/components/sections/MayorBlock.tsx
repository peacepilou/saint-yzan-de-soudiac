import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { site } from "@/data/site";
import { type } from "@/lib/styles";

/** Bloc « Le maire » : portrait 4:5, mot du maire, mandat, permanence et boutons. */
export function MayorBlock() {
  return (
    <section id="maire" aria-labelledby="h-maire" className="mx-auto max-w-[1360px] px-5 pt-12 md:px-10 md:pt-[104px]">
      <div className="flex flex-wrap items-center gap-x-[72px] gap-y-12">
        <figure className="m-0 max-w-[520px] flex-[1_1_380px]">
          <div
            role="img"
            aria-label="Emplacement de la photo officielle du maire"
            className="flex aspect-[4/5] items-center justify-center rounded-[28px] bg-portrait font-display text-[80px] font-bold tracking-[-0.04em] text-accent md:text-[120px]"
          >
            [NN]
          </div>
          <figcaption className="mt-3 text-[14px] text-muted">[Photo officielle du maire]</figcaption>
        </figure>
        <div className="flex flex-[1_1_460px] flex-col gap-[22px]">
          <Eyebrow>Maire de Saint-Yzan-de-Soudiac</Eyebrow>
          <h2 id="h-maire" className={type.figure}>
            [Prénom Nom]
          </h2>
          <p className="text-[18px] leading-[1.55] text-text md:text-[20px]">
            [Mot du maire : quelques lignes de présentation, à rédiger par l&apos;élu.]
          </p>
          <dl className="mt-2 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] border-t border-line">
            <div className="border-b border-line py-[18px]">
              <dt className="text-[14px] text-muted">Mandat</dt>
              <dd className="mt-1 font-semibold">Depuis [année]</dd>
            </div>
            <div className="border-b border-line py-[18px]">
              <dt className="text-[14px] text-muted">Permanence</dt>
              <dd className="mt-1 font-semibold">Sur rendez-vous en mairie</dd>
            </div>
          </dl>
          <div className="flex flex-wrap gap-3">
            <Button href={site.phoneHref} size={52}>
              Prendre rendez-vous
            </Button>
            <Button href="/mairie/comptes-rendus" variant="outline" size={52}>
              Les décisions du conseil
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
