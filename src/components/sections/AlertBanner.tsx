import Link from "next/link";
import { LinkArrow } from "@/components/ui/LinkArrow";

/** Bandeau « À savoir » (accueil). */
export function AlertBanner() {
  return (
    <section aria-label="À savoir" className="mx-auto max-w-[1360px] px-5 pt-5 md:px-10 md:pt-12">
      <Link
        href="/actualites/calendrier-collecte-smicval-2025-2026"
        className="flex flex-col gap-1 rounded-2xl bg-warning-bg px-[18px] py-4 text-[15px] text-ink no-underline hover:brightness-[.97] md:flex-row md:flex-wrap md:items-center md:gap-x-6 md:gap-y-3 md:rounded-[18px] md:px-7 md:py-5 md:text-[17px]"
      >
        <span className="self-start rounded-full bg-warning px-2.5 py-0.5 text-[12px] font-semibold text-white md:self-auto md:px-3 md:py-1 md:text-[13px]">
          À savoir
        </span>
        <span className="md:hidden">
          Collecte des déchets <strong>toutes les 3 semaines</strong>.
        </span>
        <span className="hidden md:inline md:flex-[1_1_420px]">
          La collecte des déchets passe désormais <strong>toutes les 3 semaines</strong>. Le calendrier SMICVAL 2025-2026 est disponible.
        </span>
        <span className="inline-flex items-center gap-1.5 font-semibold text-warning">
          Voir le calendrier
          <LinkArrow />
        </span>
      </Link>
    </section>
  );
}
