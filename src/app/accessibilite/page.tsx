import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/sections/LegalPage";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Accessibilité" };

export default function AccessibilitePage() {
  return (
    <LegalPage title="Déclaration d'accessibilité" lead="La mairie de Saint-Yzan-de-Soudiac s'engage à rendre son site internet accessible, conformément à l'article 47 de la loi n° 2005-102 du 11 février 2005.">
      <h2>État de conformité</h2>
      <p>
        Le site est <strong>partiellement conforme</strong> avec le référentiel général d&apos;amélioration de l&apos;accessibilité (RGAA), version
        4.1, en raison des non-conformités énumérées ci-dessous.
      </p>
      <h2>Résultats des tests</h2>
      <p>L&apos;audit de conformité réalisé par [organisme] le [date] révèle que [taux] % des critères du RGAA sont respectés.</p>
      <h2>Contenus non accessibles</h2>
      <ul>
        <li>[Liste des non-conformités relevées lors de l&apos;audit]</li>
        <li>[Documents PDF anciens non accessibles, le cas échéant]</li>
      </ul>
      <h2>Établissement de cette déclaration</h2>
      <p>Cette déclaration a été établie le [date].</p>
      <ul>
        <li>Technologies utilisées : HTML, CSS, JavaScript</li>
        <li>Outils de vérification : [outils]</li>
        <li>Pages du site ayant fait l&apos;objet de la vérification : [échantillon]</li>
      </ul>
      <h2>Schéma pluriannuel</h2>
      <p>[Lien vers le schéma pluriannuel de mise en accessibilité et le plan d&apos;action de l&apos;année.]</p>
      <h2>Retour d&apos;information et contact</h2>
      <p>
        Si vous n&apos;arrivez pas à accéder à un contenu ou à un service, contactez la mairie : {site.phone}, {site.email} ou via la page{" "}
        <Link href="/contact">Contact</Link>.
      </p>
      <h2>Voies de recours</h2>
      <p>
        Si vous constatez un défaut d&apos;accessibilité vous empêchant d&apos;accéder à un contenu ou une fonctionnalité du site, que vous nous le
        signalez et que vous ne parvenez pas à obtenir une réponse de notre part, vous pouvez écrire au Défenseur des droits, contacter le délégué du
        Défenseur des droits dans votre région ou envoyer un courrier par la poste (gratuit, ne pas mettre de timbre) : Défenseur des droits, Libre
        réponse 71120, 75342 Paris CEDEX 07.
      </p>
    </LegalPage>
  );
}
