import type { MegaMenuEntry } from "@/lib/types";

export const megaMenus: MegaMenuEntry[] = [
  {
    id: "mairie",
    label: "Mairie",
    title: "Votre mairie",
    img: "mairie",
    href: "/mairie",
    cta: "Découvrir la mairie",
    links: [
      { label: "Les élus", desc: "Maire, adjoints, conseillers, commissions", href: "/mairie/elus" },
      { label: "Comptes rendus & délibérations", desc: "Séances et actes publiés", href: "/mairie/comptes-rendus" },
      { label: "Budget communal", desc: "Budget primitif et comptes", href: "/mairie#budget" },
      { label: "Marchés publics", desc: "Consultations en cours", href: "/mairie#marches" },
      { label: "Intercommunalité", desc: "CdC Latitude Nord Gironde", href: "/mairie#interco" },
      { label: "Contact & horaires", desc: "10 rue Émile Gauthier", href: "/contact" },
    ],
  },
  {
    id: "demarches",
    label: "Démarches",
    title: "Vos démarches",
    img: "poste",
    href: "/demarches",
    cta: "Toutes les démarches",
    links: [
      { label: "État civil", desc: "Naissance, mariage, décès, PACS", href: "/demarches/acte-etat-civil" },
      { label: "Urbanisme & PLU", desc: "Permis, déclarations préalables", href: "/demarches/consulter-le-plu" },
      { label: "Réserver une salle", desc: "Salles municipales", href: "/demarches/reserver-une-salle" },
      { label: "Signaler un problème", desc: "Voirie, éclairage, dépôts sauvages", href: "/demarches/signaler-un-probleme" },
      { label: "France Services", desc: "Aide aux démarches en ligne", href: "/demarches#france-services" },
      { label: "Bruits de voisinage", desc: "Horaires et règles", href: "/demarches/bruits-de-voisinage" },
    ],
  },
  {
    id: "vivre",
    label: "Vivre ici",
    title: "Vivre à Saint-Yzan",
    img: "ecole",
    href: "/vivre-ici/enfance-jeunesse",
    cta: "Enfance & jeunesse",
    links: [
      { label: "Enfance & jeunesse", desc: "École, périscolaire, loisirs", href: "/vivre-ici/enfance-jeunesse" },
      { label: "Santé & solidarité", desc: "Centre médical, CCAS, portage de repas", href: "/vivre-ici/sante-solidarite" },
      { label: "Environnement & déchets", desc: "Collecte SMICVAL, broyage", href: "/vivre-ici/environnement" },
      { label: "Associations", desc: "Sport, culture, loisirs", href: "/vivre-ici/associations-culture" },
      { label: "Commerces & artisans", desc: "Annuaire local", href: "/vivre-ici/associations-culture#commerces" },
      { label: "Bibliothèque", desc: "Horaires et animations", href: "/vivre-ici/associations-culture#bibliotheque" },
    ],
  },
  {
    id: "decouvrir",
    label: "Découvrir",
    title: "Découvrir la commune",
    img: "eglise",
    href: "/decouvrir/histoire-patrimoine",
    cta: "Histoire & patrimoine",
    links: [
      { label: "Histoire & patrimoine", desc: "De saint Dicentius à aujourd’hui", href: "/decouvrir/histoire-patrimoine" },
      { label: "L’église Saint-Laurent", desc: "Église romane du bourg", href: "/decouvrir/histoire-patrimoine#eglise" },
      { label: "Étang de la Baraque", desc: "Un site réhabilité", href: "/decouvrir/histoire-patrimoine#etang" },
      { label: "Jumelage", desc: "Mendavia, Espagne", href: "/decouvrir/histoire-patrimoine#jumelage" },
      { label: "Actualités", desc: "La vie de la commune", href: "/actualites" },
      { label: "Agenda", desc: "Événements à venir", href: "/agenda" },
    ],
  },
];

export const footerColumns = [
  {
    title: "Mairie",
    links: [
      { label: "Les élus", href: "/mairie/elus" },
      { label: "Comptes rendus", href: "/mairie/comptes-rendus" },
      { label: "Marchés publics", href: "/mairie#marches" },
      { label: "Intercommunalité", href: "/mairie#interco" },
    ],
  },
  {
    title: "Démarches",
    links: [
      { label: "État civil", href: "/demarches/acte-etat-civil" },
      { label: "Urbanisme", href: "/demarches/permis-de-construire" },
      { label: "Salles municipales", href: "/demarches/reserver-une-salle" },
      { label: "France Services", href: "/demarches#france-services" },
    ],
  },
  {
    title: "Partenaires",
    links: [
      { label: "Département de la Gironde", href: "https://www.gironde.fr" },
      { label: "Région Nouvelle-Aquitaine", href: "https://www.nouvelle-aquitaine.fr" },
      { label: "Préfecture de la Gironde", href: "https://www.gironde.gouv.fr" },
      { label: "Service-Public.fr", href: "https://www.service-public.fr" },
    ],
  },
];

export const legalLinks = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Données personnelles", href: "/donnees-personnelles" },
  { label: "Cookies", href: "/cookies" },
  { label: "Accessibilité : partiellement conforme", href: "/accessibilite" },
  { label: "Plan du site", href: "/plan-du-site" },
];
