import { SmartLink } from "@/components/ui/SmartLink";
import { footerColumns, legalLinks } from "@/data/navigation";
import { creditsLine } from "@/data/photos";
import { site } from "@/data/site";
import { Emblem } from "./Logo";
import { LinkArrow } from "@/components/ui/LinkArrow";

const footLink = "text-on-dark link-hover hover:text-white";

/** Pied de page commun à toutes les pages : identité, 3 colonnes de liens, mentions et crédits. */
export function Footer() {
  return (
    <footer className="bg-ink text-on-dark">
      <div className="mx-auto grid max-w-[1360px] grid-cols-2 gap-x-6 gap-y-10 px-5 pt-12 pb-10 text-[15px] md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] md:gap-10 md:px-10 md:pt-20 md:pb-12">
        <div className="col-span-2 flex flex-col gap-3 md:col-span-1">
          <Emblem variant="white" size={72} />
          <strong className="font-display text-[22px] text-white">{site.name}</strong>
          <span>Commune de la Communauté de communes Latitude Nord Gironde. Jumelée avec Mendavia (Espagne).</span>
          <a href={site.facebook} className="self-start font-semibold text-white link-hover">
            Suivre la mairie sur Facebook
            <LinkArrow external size={14} className="ml-1 align-[-2px]" />
          </a>
        </div>
        {footerColumns.map((col) => (
          <nav key={col.title} aria-label={col.title} className="flex flex-col items-start gap-2.5">
            <strong className="text-white">{col.title}</strong>
            {col.links.map((l) => (
              <SmartLink key={l.label} href={l.href} className={footLink}>
                {l.label}
                {l.href.startsWith("http") && <LinkArrow external size={14} className="ml-1 align-[-2px]" />}
              </SmartLink>
            ))}
          </nav>
        ))}
      </div>

      <div className="mx-auto max-w-[1360px] px-5 pb-10 text-[13px] md:px-10">
        <div className="flex flex-col gap-4 border-t border-footer-rule pt-6">
          <div className="flex flex-col justify-between gap-x-6 gap-y-3 md:flex-row md:flex-wrap md:items-center">
            <nav aria-label="Informations légales" className="flex flex-wrap gap-x-5 gap-y-2">
              {legalLinks.map((l) => (
                <SmartLink key={l.href} href={l.href} className={footLink}>
                  {l.label}
                </SmartLink>
              ))}
              <SmartLink href="/admin/connexion" className={footLink}>
                Espace agents
              </SmartLink>
            </nav>
            <p className="text-footer-muted">
              Site conçu et réalisé par{" "}
              <a href="https://noemarchand.com" className="font-semibold text-white link-hover">
                noemarchand.com
              </a>
            </p>
          </div>
          <p className="text-footer-muted">
            {creditsLine}
          </p>
        </div>
      </div>
    </footer>
  );
}
