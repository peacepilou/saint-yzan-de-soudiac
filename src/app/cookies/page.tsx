import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata: Metadata = { title: "Cookies" };

export default function CookiesPage() {
  return (
    <LegalPage title="Cookies" lead="Ce site n'utilise que des cookies techniques : il n'affiche donc pas de bandeau de consentement.">
      <h2>Cookies techniques</h2>
      <p>Ils sont nécessaires au fonctionnement du site et ne demandent pas votre consentement.</p>
      <h2>Mesure d&apos;audience</h2>
      <p>[Outil de mesure d&apos;audience exempté de consentement, à préciser.]</p>
      <h2>Contenus tiers</h2>
      <p>
        Les vidéos (YouTube) et les cartes ne sont chargées qu&apos;après un clic de votre part, avec une information préalable. Ces services peuvent
        alors déposer leurs propres cookies.
      </p>
      <h2>Polices et ressources</h2>
      <p>Les polices de caractères et les images sont hébergées par le site : aucune requête n&apos;est envoyée à un service tiers au chargement des pages.</p>
    </LegalPage>
  );
}
