import type { Metadata } from "next";
import { BookingForm } from "@/components/forms/BookingForm";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { PageHero } from "@/components/sections/Hero";
import { Container } from "@/components/ui/Container";
import { rooms } from "@/data/rooms";
import { type } from "@/lib/styles";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Réserver une salle municipale" };

export default function ReserverPage() {
  return (
    <SiteFrame header={{ variant: "overlay", current: "demarches" }}>
      <PageHero
        img="bourg"
        alt="Carte postale ancienne de la rue principale du bourg"
        grayscale
        height="md:h-[620px]"
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Démarches", href: "/demarches" }, { label: "Réserver une salle" }]}
        title="Réserver une salle"
        lead="Fêtes, réunions, associations : découvrez les salles municipales et envoyez votre demande en ligne."
        narrow
      />

      <Container as="section" aria-labelledby="h-salles" className="pt-12 md:pt-24">
        <h2 id="h-salles" className={cn(type.h2Medium, "mb-6 md:mb-8")}>
          Les salles municipales
        </h2>
        <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-6 p-0">
          {rooms.map((r) => (
            <li key={r.name} className="flex flex-col gap-4">
              <div
                role="img"
                aria-label={`Emplacement de la photo : ${r.name}`}
                className="flex h-[220px] items-center justify-center rounded-[20px] bg-surface text-[15px] text-muted"
              >
                [Photo de la salle]
              </div>
              <h3 className="font-display text-[22px] font-bold">{r.name}</h3>
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-[15px]">
                <dt className="text-muted">Capacité</dt>
                <dd className="font-semibold">{r.capacity}</dd>
                <dt className="text-muted">Équipements</dt>
                <dd className="font-semibold">{r.equipment}</dd>
                <dt className="text-muted">Tarif</dt>
                <dd className="font-semibold">{r.price}</dd>
              </dl>
            </li>
          ))}
        </ul>
      </Container>

      <section aria-labelledby="h-res" className="mx-auto max-w-[1360px] px-5 py-12 md:px-10 md:py-[120px]">
        <div className="flex flex-wrap gap-14">
          <div className="flex flex-[1_1_360px] flex-col gap-[18px]">
            <h2 id="h-res" className={type.h2Section}>
              Demande de réservation
            </h2>
            <p className="text-muted">La mairie vous répond pour confirmer la disponibilité de la salle et les conditions de location.</p>
            <p className="rounded-[14px] bg-surface px-5 py-4 text-[15px]">Délai de réponse : [délai] · Caution : [tarif]</p>
          </div>
          <div className="min-w-0 flex-[999_1_600px]">
            <BookingForm />
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
