import type { AgendaEvent } from "@/lib/types";

export const events: AgendaEvent[] = [
  {
    slug: "village-de-noel",
    title: "1er Village de Noël",
    when: "Décembre · date à venir",
    category: "Animation",
    tone: "warning",
    img: "eglise",
  },
  {
    slug: "marche-de-noel",
    title: "Marché de Noël et des artisans",
    when: "Décembre · date à venir",
    category: "Marché",
    tone: "warning",
    img: "bourg",
    grayscale: true,
  },
  {
    slug: "conseil-municipal",
    title: "Conseil municipal",
    when: "Prochaine séance · date à venir",
    category: "Vie municipale",
    tone: "accent",
    img: "mairie",
  },
];

export const homeEvents = events.slice(0, 3);
