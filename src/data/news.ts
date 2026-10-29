import type { NewsArticle, NewsCategory, Tone } from "@/lib/types";

export const categoryTone: Record<NewsCategory, Tone> = {
  Solidarité: "accent",
  Animation: "warning",
  Services: "accent",
  Environnement: "accent",
  Santé: "health",
};

export const news: NewsArticle[] = [
  {
    slug: "appel-candidature-ccas",
    title: "Appel à candidature pour le Centre communal d'action sociale",
    shortTitle: "Appel à candidature pour le CCAS",
    category: "Solidarité",
    subcategory: "CCAS",
    tags: ["Appel à candidature"],
    lead: "Habitants engagés dans la vie sociale de la commune, le CCAS recherche des personnes volontaires pour siéger à son conseil d'administration.",
    date: "[date]",
    readingTime: "2 min",
    image: {
      key: "mairie",
      alt: "La façade de la mairie, siège du CCAS",
      caption: "La mairie, rue Émile Gauthier · photo Jack ma, CC BY-SA 3.0",
    },
    body: [
      { type: "h2", text: "Le rôle du CCAS" },
      {
        type: "p",
        text: "Le Centre communal d'action sociale anime l'action sociale de la commune : aide aux personnes âgées et aux familles, accompagnement des personnes en difficulté, portage de repas. Il est administré par un conseil d'administration présidé par le maire.",
      },
      {
        type: "p",
        text: "Ce conseil réunit des élus municipaux et des membres nommés parmi les habitants qui participent à des actions de prévention, d'animation ou de développement social dans la commune.",
      },
      { type: "quote", text: "[Citation de l'élu en charge de l'action sociale]" },
      { type: "h2", text: "Comment candidater" },
      {
        type: "steps",
        items: [
          { text: "Rédigez une courte lettre présentant votre engagement et vos motivations." },
          { text: "Déposez-la à l'accueil de la mairie ou envoyez-la à mairie@saintyzandesoudiac.fr." },
          { text: "Date limite de dépôt : ", strong: "[date]", after: "." },
        ],
      },
    ],
    brief: [
      { label: "Qui ?", value: "Habitants engagés dans l'action sociale" },
      { label: "Date limite", value: "[date]" },
      { label: "Où déposer ?", value: "Mairie, 10 rue Émile Gauthier" },
    ],
    aside: {
      title: "Portage de repas",
      text: "Un service du CCAS pour les personnes âgées",
      href: "/demarches/portage-de-repas",
    },
  },
  {
    slug: "village-de-noel",
    title: "1er Village de Noël",
    category: "Animation",
    subcategory: "Noël",
    tags: ["Événement"],
    lead: "La commune organise son premier Village de Noël, avec un marché des artisans. Programme et horaires à venir.",
    date: "[date]",
    readingTime: "1 min",
    image: {
      key: "eglise",
      alt: "Façade de l'église Saint-Laurent",
      caption: "L'église Saint-Laurent · photo William Ellison, CC BY-SA 4.0",
    },
    body: [
      { type: "h2", text: "Au programme" },
      { type: "p", text: "[Programme du Village de Noël à compléter par la mairie : animations, horaires, lieu.]" },
      { type: "h2", text: "Exposer au marché" },
      {
        type: "steps",
        items: [
          { text: "Artisans et créateurs, faites-vous connaître auprès de la mairie." },
          { text: "Écrivez à mairie@saintyzandesoudiac.fr en présentant votre activité." },
          { text: "Date limite d'inscription : ", strong: "[date]", after: "." },
        ],
      },
    ],
    brief: [
      { label: "Quand ?", value: "Décembre · [date]" },
      { label: "Où ?", value: "[lieu]" },
      { label: "Entrée", value: "[tarif]" },
    ],
  },
  {
    slug: "marche-de-noel-et-des-artisans",
    title: "Marché de Noël et des artisans",
    category: "Animation",
    subcategory: "Marché",
    tags: ["Marché"],
    lead: "Créateurs et producteurs se retrouvent pour le marché de Noël de la commune.",
    date: "[date]",
    readingTime: "1 min",
    image: {
      key: "bourg",
      alt: "Carte postale ancienne de la rue principale du bourg",
      caption: "La rue principale, carte postale ancienne · domaine public",
    },
    body: [
      { type: "h2", text: "Informations pratiques" },
      { type: "p", text: "[Date, horaires, lieu et liste des exposants à compléter par la mairie.]" },
    ],
    brief: [
      { label: "Quand ?", value: "Décembre · [date]" },
      { label: "Où ?", value: "[lieu]" },
    ],
  },
  {
    slug: "calendrier-collecte-smicval-2025-2026",
    title: "Nouveau calendrier de collecte SMICVAL 2025-2026",
    category: "Environnement",
    subcategory: "Déchets",
    tags: ["Collecte"],
    lead: "La collecte des déchets passe désormais toutes les 3 semaines. Le calendrier SMICVAL 2025-2026 est disponible.",
    date: "[date]",
    readingTime: "1 min",
    placeholderIcon: "trash",
    body: [
      { type: "h2", text: "Ce qui change" },
      {
        type: "p",
        text: "La collecte des déchets passe désormais toutes les 3 semaines. Consultez le calendrier pour connaître les jours de passage dans votre rue.",
      },
      { type: "p", text: "[Lien vers le calendrier SMICVAL 2025-2026 à ajouter.]" },
    ],
    brief: [
      { label: "Fréquence", value: "Toutes les 3 semaines" },
      { label: "Calendrier", value: "SMICVAL 2025-2026" },
    ],
    aside: {
      title: "Broyage des déchets verts",
      text: "Un service sur demande",
      href: "/demarches/broyage-dechets-verts",
    },
  },
  {
    slug: "octobre-rose",
    title: "Octobre Rose : la commune se mobilise",
    category: "Santé",
    subcategory: "Prévention",
    tags: ["Prévention"],
    lead: "La commune participe à Octobre Rose, le mois de sensibilisation au dépistage du cancer du sein.",
    date: "[date]",
    readingTime: "1 min",
    placeholderIcon: "heart",
    body: [
      { type: "h2", text: "Les actions dans la commune" },
      { type: "p", text: "[Actions et rendez-vous organisés dans la commune à compléter par la mairie.]" },
    ],
    brief: [
      { label: "Quand ?", value: "Octobre" },
      { label: "Contact", value: "Mairie, 05 57 58 91 10" },
    ],
  },
  {
    slug: "france-services",
    title: "France Services : un accompagnement pour vos démarches en ligne",
    category: "Services",
    subcategory: "France Services",
    tags: ["Démarches"],
    lead: "Impôts, CAF, retraite, carte grise, santé : des agents formés vous aident dans vos démarches administratives en ligne, gratuitement.",
    date: "[date]",
    readingTime: "2 min",
    image: {
      key: "poste",
      alt: "Bureau de poste de la commune",
      caption: "Le bureau de poste · photo Jack ma, CC BY-SA 3.0",
    },
    body: [
      { type: "h2", text: "Un accompagnement gratuit" },
      {
        type: "p",
        text: "Impôts, CAF, retraite, carte grise, santé : des agents formés vous aident dans vos démarches administratives en ligne, gratuitement.",
      },
      { type: "p", text: "[Adresse et horaires de l'espace France Services le plus proche à compléter.]" },
    ],
    brief: [
      { label: "Pour qui ?", value: "Tous les habitants" },
      { label: "Coût", value: "Gratuit" },
      { label: "Où ?", value: "[adresse]" },
    ],
  },
];

export const homeNews = ["appel-candidature-ccas", "village-de-noel", "france-services"];

export function getArticle(slug: string) {
  return news.find((n) => n.slug === slug);
}

export function relatedArticles(slug: string) {
  const preferred = ["village-de-noel", "calendrier-collecte-smicval-2025-2026", "octobre-rose", "appel-candidature-ccas"];
  return preferred
    .filter((s) => s !== slug)
    .slice(0, 3)
    .map((s) => getArticle(s)!);
}
