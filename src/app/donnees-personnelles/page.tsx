import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/sections/LegalPage";
import { rgpdDefaults } from "@/data/site";

export const metadata: Metadata = { title: "Données personnelles" };

export default function DonneesPersonnellesPage() {
  return (
    <LegalPage title="Données personnelles" lead="Comment la mairie traite les informations que vous lui transmettez par ce site.">
      <h2>Responsable de traitement</h2>
      <p>La commune de Saint-Yzan-de-Soudiac, représentée par son maire.</p>
      <h2>Délégué à la protection des données</h2>
      <p>Contact : {rgpdDefaults.dpo}</p>
      <h2>Traitements réalisés</h2>
      <ul>
        <li>Signalements : traiter votre signalement et vous informer de son suivi. Durée de conservation : {rgpdDefaults.duration}.</li>
        <li>Réservations de salle : traiter votre demande de réservation. Durée de conservation : {rgpdDefaults.duration}.</li>
        <li>Messages de contact : répondre à votre message. Durée de conservation : {rgpdDefaults.duration}.</li>
      </ul>
      <p>
        Base légale : mission d&apos;intérêt public. Les données ne sont transmises qu&apos;aux services concernés de la mairie et ne sont jamais
        cédées à des tiers.
      </p>
      <h2>Vos droits</h2>
      <p>
        Vous pouvez exercer vos droits d&apos;accès, de rectification, d&apos;effacement, de limitation et d&apos;opposition auprès du délégué à la
        protection des données. Vous pouvez aussi adresser une réclamation à la CNIL.
      </p>
      <h2>Cookies</h2>
      <p>
        Voir la page <Link href="/cookies">Cookies</Link>.
      </p>
    </LegalPage>
  );
}
