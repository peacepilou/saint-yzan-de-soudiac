import Link from "next/link";
import { LinkArrow } from "@/components/ui/LinkArrow";

const top = [
  { label: "Réserver une salle municipale", href: "/demarches/reserver-une-salle" },
  { label: "Carte d'identité & passeport", href: "/demarches/carte-identite-passeport" },
  { label: "Permis & déclaration de travaux", href: "/demarches/permis-de-construire" },
  { label: "Signaler un problème", href: "/demarches/signaler-un-probleme" },
];

/** Raccourcis vers les démarches les plus demandées (recherche vide, page 404). */
export function TopProcedures({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as const;
  return (
    <div className="flex flex-col gap-4">
      <H className="font-display text-[24px] font-bold tracking-[-0.02em] md:text-[28px]">Les démarches les plus demandées</H>
      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-3 p-0">
        {top.map((t) => (
          <li key={t.href}>
            <Link
              href={t.href}
              className="flex h-full items-center justify-between gap-4 rounded-[20px] bg-surface p-5 font-semibold text-ink no-underline hover:bg-surface-hover"
            >
              {t.label}
              <LinkArrow size={18} className="text-accent" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
