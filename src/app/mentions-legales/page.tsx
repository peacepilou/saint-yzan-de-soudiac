import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/sections/LegalPage";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Mentions légales" };

export default function MentionsLegalesPage() {
  return (
    <LegalPage title="Mentions légales">
      <h2>Éditeur du site</h2>
      <p>
        Mairie de Saint-Yzan-de-Soudiac, {site.address}. Téléphone : {site.phone}. E-mail : {site.email}.
      </p>
      <p>Directeur de la publication : [Prénom Nom], maire de Saint-Yzan-de-Soudiac.</p>
      <h2>Hébergement</h2>
      <p>[Nom de l&apos;hébergeur], [adresse de l&apos;hébergeur], [téléphone]. Hébergement des données en France.</p>
      <h2>Conception et réalisation</h2>
      <p>[Prestataire]</p>
      <h2>Crédits photographiques</h2>
      <ul>
        <li>Église Saint-Laurent (vues latérales) : Renhour48, CC0</li>
        <li>Église Saint-Laurent (façade, modillons) : William Ellison, CC BY-SA 4.0</li>
        <li>Mairie, école, collège, poste, monument aux morts : Jack ma, CC BY-SA 3.0</li>
        <li>Gare de Saint-Mariens – Saint-Yzan : Cramos, CC BY-SA 4.0</li>
        <li>Bourg et étang (cartes postales anciennes) : domaine public</li>
      </ul>
      <p>Toutes ces photos proviennent de Wikimedia Commons.</p>
      <h2>Données personnelles</h2>
      <p>
        Consultez la page <Link href="/donnees-personnelles">Données personnelles</Link>.
      </p>
    </LegalPage>
  );
}
