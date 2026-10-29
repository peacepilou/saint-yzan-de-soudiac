import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header, type HeaderProps } from "./Header";

/** En-tête + `<main id="contenu">` + pied de page, communs à toutes les pages. */
export function SiteFrame({ header, children }: { header: HeaderProps; children: ReactNode }) {
  return (
    <div className="relative">
      <Header {...header} />
      <main id="contenu" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
    </div>
  );
}
