import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const items: { label: string; short: string; href: string; icon: IconName; alert?: boolean }[] = [
  { label: "École & cantine", short: "École", href: "/vivre-ici/enfance-jeunesse", icon: "school" },
  { label: "Réserver une salle", short: "Salles", href: "/demarches/reserver-une-salle", icon: "hall" },
  { label: "Collecte des déchets", short: "Déchets", href: "/vivre-ici/environnement", icon: "trash" },
  { label: "Urbanisme & PLU", short: "Urbanisme", href: "/demarches/consulter-le-plu", icon: "building" },
  { label: "Comptes rendus", short: "Conseil", href: "/mairie/comptes-rendus", icon: "document" },
  { label: "Signaler un problème", short: "Signaler", href: "/demarches/signaler-un-probleme", icon: "warning", alert: true },
];

/** Accès rapides : carte qui chevauche le hero en bureau, grille 3 × 2 en mobile. */
export function QuickAccess() {
  return (
    <section aria-labelledby="h-acces" className="relative z-[3] mx-auto max-w-[1360px] px-5 pt-6 md:-mt-16 md:px-10 md:pt-0">
      <h2 id="h-acces" className="sr-only">
        Accès rapides
      </h2>
      <div className="grid grid-cols-3 gap-2 md:grid-cols-[repeat(auto-fit,minmax(190px,1fr))] md:gap-0 md:overflow-hidden md:rounded-[24px] md:bg-white md:shadow-quick">
        {items.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-2 rounded-2xl px-1.5 py-4 text-center text-[13px] font-semibold text-ink no-underline hover:brightness-[.96]",
              "md:items-start md:gap-3.5 md:rounded-none md:px-6 md:py-7 md:text-left md:text-[17px] md:hover:bg-quick-hover md:hover:brightness-100",
              item.alert ? "bg-warning-bg md:bg-white" : "bg-surface md:bg-white",
              i < items.length - 1 && "md:border-r md:border-line-soft",
            )}
          >
            <Icon
              name={item.icon}
              className={cn("size-6 md:size-7", item.alert ? "text-warning md:text-warning-icon" : "text-accent")}
            />
            <span className="md:hidden">{item.short}</span>
            <span className="hidden md:inline">{item.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
