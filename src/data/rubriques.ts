import type { Rubrique } from "@/lib/types";

export const PDF_PLACEHOLDER = "/documents/document-a-venir.pdf";

export const rubriques: Rubrique[] = [
  {
    slug: "enfance-jeunesse",
    title: "Enfance & jeunesse",
    titleLines: ["Enfance &", "jeunesse"],
    lead: "Des tout-petits au collège : école, accueil périscolaire, loisirs et transport scolaire.",
    hero: { img: "ecole", alt: "Entrée du groupe scolaire de la commune", position: "center 50%" },
    action: {
      title: "Inscrire mon enfant à l'école",
      text: "Préinscription en mairie, puis admission auprès de la direction de l'école.",
      cta: "Commencer",
      href: "/demarches/inscription-ecole",
    },
    toc: [
      { id: "ecole", label: "L'école" },
      { id: "periscolaire", label: "Périscolaire & cantine" },
      { id: "loisirs", label: "Loisirs & sport" },
      { id: "petite-enfance", label: "Petite enfance" },
      { id: "transport", label: "Transport scolaire" },
      { id: "college", label: "Collège & lycées" },
    ],
    sections: [
      {
        kind: "facts",
        id: "ecole",
        title: "L'école",
        text: "Le groupe scolaire accueille les enfants de la commune dans des locaux entretenus par la mairie, qui gère aussi la restauration et l'accueil périscolaire.",
        facts: [
          { label: "Horaires de classe", value: "[À compléter]" },
          { label: "Téléphone de l'école", value: "[À compléter]" },
          { label: "Inscriptions", value: "En mairie" },
        ],
      },
      {
        kind: "tiles",
        id: "periscolaire",
        title: "Périscolaire & cantine",
        text: "Accueil du matin et du soir, restauration le midi : réservations et facturation passent par le service périscolaire de la mairie.",
        tiles: [
          { label: "Accueil du matin", value: "[horaires]" },
          { label: "Restauration", value: "[tarif / repas]" },
          { label: "Accueil du soir", value: "[horaires]" },
        ],
        docs: [
          { label: "Menus du mois · PDF", href: PDF_PLACEHOLDER },
          { label: "Règlement intérieur · PDF", href: PDF_PLACEHOLDER },
        ],
      },
      {
        kind: "cards",
        label: "Autres services",
        cards: [
          { id: "loisirs", title: "Centre de loisirs", text: "Mercredis et vacances scolaires.", cta: "Nous contacter", href: "/contact" },
          { title: "École multisports", text: "Découverte de plusieurs disciplines sportives.", cta: "Nous contacter", href: "/contact" },
          {
            id: "petite-enfance",
            title: "Assistantes maternelles",
            text: "La liste des assistantes maternelles agréées de la commune.",
            cta: "Demander la liste",
            href: "/contact",
          },
          { id: "transport", title: "Transport scolaire", text: "Lignes, arrêts et inscriptions.", cta: "Voir l'intercommunalité", href: "/mairie#interco" },
        ],
      },
      {
        kind: "feature",
        id: "college",
        title: "Après l'école primaire",
        text: "Collège, lycées et transport vers Blaye : les liens utiles pour la suite de la scolarité.",
        img: "college",
        links: [
          { label: "Collège du Val de Saye", href: "http://www.valdesaye.fr/" },
          { label: "Syndicat intercommunal des lycées de Blaye", href: "http://www.transport-scolaire-blaye.fr/" },
        ],
      },
    ],
  },
  {
    slug: "sante-solidarite",
    title: "Santé & solidarité",
    titleLines: ["Santé &", "solidarité"],
    lead: "Action sociale du CCAS, services aux aînés et professionnels de santé de la commune.",
    hero: { img: "mairie", alt: "Façade de la mairie, siège du CCAS", position: "center 60%" },
    action: {
      title: "Demander le portage de repas",
      text: "Un service du CCAS pour les personnes âgées.",
      cta: "Commencer",
      href: "/demarches/portage-de-repas",
    },
    toc: [
      { id: "ccas", label: "Le CCAS" },
      { id: "services", label: "Services" },
      { id: "aide", label: "Aide aux démarches" },
    ],
    sections: [
      {
        kind: "facts",
        id: "ccas",
        title: "Le CCAS",
        text: "Le Centre communal d'action sociale anime l'action sociale de la commune : aide aux personnes âgées et aux familles, accompagnement des personnes en difficulté, portage de repas.",
        facts: [
          { label: "Présidence", value: "Le maire" },
          { label: "Permanences", value: "[À compléter]" },
          { label: "Contact", value: "En mairie" },
        ],
      },
      {
        kind: "cards",
        id: "services",
        title: "Services",
        label: "Services",
        cards: [
          { title: "Portage de repas", text: "Un service du CCAS pour les personnes âgées.", cta: "En savoir plus", href: "/demarches/portage-de-repas" },
          { title: "Centre médical", text: "[Coordonnées et horaires à compléter.]", cta: "Nous contacter", href: "/contact" },
          { title: "Octobre Rose", text: "La commune se mobilise pour le dépistage.", cta: "Lire l'actualité", href: "/actualites/octobre-rose" },
          { title: "Candidater au CCAS", text: "Le CCAS recherche des habitants volontaires.", cta: "Lire l'actualité", href: "/actualites/appel-candidature-ccas" },
        ],
      },
      {
        kind: "feature",
        id: "aide",
        title: "Aide aux démarches",
        text: "Impôts, CAF, retraite, carte grise, santé : des agents formés vous aident dans vos démarches administratives en ligne, gratuitement.",
        img: "poste",
        links: [
          { label: "France Services : un accompagnement", href: "/actualites/france-services" },
          { label: "Service-Public.fr", href: "https://www.service-public.fr" },
        ],
      },
    ],
  },
  {
    slug: "environnement",
    title: "Environnement",
    titleLines: ["Environnement"],
    lead: "Collecte des déchets, déchets verts, la Saye et les espaces naturels de la commune.",
    hero: { img: "lac", alt: "Carte postale ancienne de l'étang", position: "center 50%", grayscale: true },
    action: {
      title: "Consulter le calendrier de collecte",
      text: "La collecte des déchets passe désormais toutes les 3 semaines.",
      cta: "Voir le calendrier",
      href: "/actualites/calendrier-collecte-smicval-2025-2026",
    },
    toc: [
      { id: "collecte", label: "Collecte des déchets" },
      { id: "services", label: "Services" },
      { id: "saye", label: "La Saye" },
    ],
    sections: [
      {
        kind: "facts",
        id: "collecte",
        title: "Collecte des déchets",
        text: "La collecte est assurée par le SMICVAL. Le calendrier 2025-2026 indique les jours de passage.",
        facts: [
          { label: "Fréquence", value: "Toutes les 3 semaines" },
          { label: "Calendrier", value: "SMICVAL 2025-2026" },
          { label: "Déchèterie la plus proche", value: "[À compléter]" },
        ],
      },
      {
        kind: "cards",
        id: "services",
        title: "Services",
        label: "Services",
        cards: [
          { title: "Broyage des déchets verts", text: "Un service à domicile, sur demande.", cta: "En savoir plus", href: "/demarches/broyage-dechets-verts" },
          { title: "Dépôt sauvage", text: "Signalez-le aux services techniques.", cta: "Signaler", href: "/demarches/signaler-un-probleme" },
          { title: "Bruits de voisinage", text: "Horaires et règles.", cta: "En savoir plus", href: "/demarches/bruits-de-voisinage" },
        ],
      },
      {
        kind: "feature",
        id: "saye",
        title: "La Saye",
        text: "Au nord-est, la Saye, affluent de l'Isle, borde la commune et trace la limite avec la Charente-Maritime.",
        img: "lac",
        links: [{ label: "S.I.A. de la Saye, du Galostre et du Lary", href: "http://www.syndicat-saye.fr/" }],
      },
    ],
  },
  {
    slug: "associations-culture",
    title: "Associations & culture",
    titleLines: ["Associations &", "culture"],
    lead: "Associations, bibliothèque, salles municipales, commerces et artisans de la commune.",
    hero: { img: "modillons", alt: "Modillons sculptés de l'église Saint-Laurent", position: "center 50%" },
    action: {
      title: "Réserver une salle municipale",
      text: "Fêtes, réunions, associations.",
      cta: "Commencer",
      href: "/demarches/reserver-une-salle",
    },
    toc: [
      { id: "associations", label: "Associations" },
      { id: "bibliotheque", label: "Bibliothèque" },
      { id: "services", label: "Salles, commerces & jumelage" },
    ],
    sections: [
      {
        kind: "facts",
        id: "associations",
        title: "Associations",
        text: "Sport, culture, loisirs : la liste des associations de la commune et leurs contacts.",
        facts: [
          { label: "Annuaire", value: "[À compléter]" },
          { label: "Subventions", value: "[À compléter]" },
          { label: "Forum des associations", value: "[date]" },
        ],
      },
      {
        kind: "facts",
        id: "bibliotheque",
        title: "Bibliothèque",
        text: "Prêt de livres et animations pour tous les âges.",
        facts: [
          { label: "Horaires", value: "[horaires]" },
          { label: "Adresse", value: "[À compléter]" },
          { label: "Inscription", value: "[tarif]" },
        ],
      },
      {
        kind: "cards",
        id: "services",
        title: "Salles, commerces & jumelage",
        label: "Salles, commerces & jumelage",
        cards: [
          { title: "Salles municipales", text: "Fêtes, réunions, associations.", cta: "Réserver", href: "/demarches/reserver-une-salle" },
          { id: "commerces", title: "Commerces & artisans", text: "[Annuaire local à compléter.]", cta: "Nous contacter", href: "/contact" },
          { title: "Jumelage", text: "Mendavia, Espagne.", cta: "En savoir plus", href: "/decouvrir/histoire-patrimoine#jumelage" },
        ],
      },
    ],
  },
];

export function getRubrique(slug: string) {
  return rubriques.find((r) => r.slug === slug);
}
