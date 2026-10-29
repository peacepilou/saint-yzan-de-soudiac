import { news } from "./news";
import { procedureHref, procedures } from "./procedures";
import { rubriques } from "./rubriques";

export type SitemapEntry = { label: string; href: string; description?: string; children?: SitemapEntry[] };

/** Arborescence complète, utilisée par le plan du site et la recherche (« Pages »). */
export const sitemap: SitemapEntry[] = [
  { label: "Accueil", href: "/", description: "Accès rapides, actualités, agenda et contact de la mairie." },
  {
    label: "La mairie",
    href: "/mairie",
    description: "Conseil municipal, comptes rendus, budget, marchés publics, intercommunalité.",
    children: [
      { label: "Les élus", href: "/mairie/elus", description: "Le maire, les adjoints, les conseillers et les commissions." },
      { label: "Comptes rendus et délibérations", href: "/mairie/comptes-rendus", description: "Procès-verbaux, délibérations, arrêtés, budget." },
    ],
  },
  {
    label: "Démarches",
    href: "/demarches",
    description: "Toutes les démarches : état civil, urbanisme, famille, vie quotidienne.",
    children: [
      { label: "Signaler un problème", href: "/demarches/signaler-un-probleme", description: "Voirie, éclairage, dépôt sauvage." },
      ...procedures.map((p) => ({ label: p.title, href: procedureHref(p), description: p.lead })),
    ],
  },
  {
    label: "Vivre ici",
    href: "/vivre-ici/enfance-jeunesse",
    children: rubriques.map((r) => ({ label: r.title, href: `/vivre-ici/${r.slug}`, description: r.lead })),
  },
  {
    label: "Découvrir",
    href: "/decouvrir/histoire-patrimoine",
    children: [
      {
        label: "Histoire & patrimoine",
        href: "/decouvrir/histoire-patrimoine",
        description: "Église Saint-Laurent, lieux de mémoire, cartes postales, jumelage, étang de la Baraque.",
      },
    ],
  },
  {
    label: "Actualités",
    href: "/actualites",
    description: "La vie de la commune.",
    children: news.map((n) => ({ label: n.title, href: `/actualites/${n.slug}` })),
  },
  { label: "Agenda", href: "/agenda", description: "Animations, marchés et séances du conseil municipal." },
  { label: "Contact", href: "/contact", description: "Adresse, téléphone, horaires et formulaire de contact." },
  { label: "Recherche", href: "/recherche" },
  {
    label: "Informations légales",
    href: "/mentions-legales",
    children: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Données personnelles", href: "/donnees-personnelles", description: "Politique de protection des données, RGPD, DPO." },
      { label: "Cookies", href: "/cookies", description: "Cookies techniques, contenus tiers chargés au clic." },
      { label: "Accessibilité : partiellement conforme", href: "/accessibilite", description: "Déclaration d'accessibilité RGAA." },
      { label: "Plan du site", href: "/plan-du-site" },
    ],
  },
];
