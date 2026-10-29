import type { OpeningHours } from "@/lib/types";

export const site = {
  name: "Saint-Yzan-de-Soudiac",
  /** Domaine actuel de la mairie, à confirmer pour la mise en ligne. */
  url: "https://www.saint-yzan-de-soudiac.com",
  street: "10 rue Émile Gauthier",
  city: "33920 Saint-Yzan-de-Soudiac",
  address: "10 rue Émile Gauthier, 33920 Saint-Yzan-de-Soudiac",
  phone: "05 57 58 91 10",
  phoneHref: "tel:+33557589110",
  email: "mairie@saintyzandesoudiac.fr",
  emailHref: "mailto:mairie@saintyzandesoudiac.fr",
  facebook: "https://www.facebook.com/mairiesaintyzandesoudiac",
  intercommunality: "Communauté de communes Latitude Nord Gironde",
  twinTown: "Mendavia (Espagne)",
  demonym: "Soudiacais",
};

export const hours: OpeningHours[] = [
  { days: "Lundi, mardi, jeudi", shortDays: "Lun., mar., jeu.", weekdays: [1, 2, 4], slots: ["8h30–12h", "14h–17h30"] },
  { days: "Mercredi", shortDays: "Mer.", weekdays: [3], slots: ["9h–12h"] },
  { days: "Vendredi", shortDays: "Ven.", weekdays: [5], slots: ["14h–17h30"] },
];

export const figures = {
  population: "2 527",
  populationSource: "Insee 2021",
  growth: "+7,81 %",
  growthSince: 2015,
  forest: "24,1 %",
  farmland: "21,9 %",
  altitudeMax: "92 m",
  neighbours: ["Bussac-Forêt", "Saint-Savin", "Laruscade", "Saint-Mariens"],
};

export const rgpdDefaults = {
  duration: "[durée]",
  dpo: "[contact DPO]",
};
