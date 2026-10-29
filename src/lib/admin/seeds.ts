import { documents, documentTypes } from "@/data/documents";
import { events } from "@/data/events";
import { news } from "@/data/news";
import { officials } from "@/data/officials";
import { procedures } from "@/data/procedures";
import { rooms } from "@/data/rooms";
import { hours, site } from "@/data/site";
import type { AdminRecord, CollectionKey, Singletons } from "./types";

/** Données initiales de la démo, reprises du site public. Dates fixes pour un rendu stable. */
const record = (id: string, createdAt: string, data: Record<string, string | boolean>): AdminRecord => ({ id, createdAt, ...data });

const collections: Record<CollectionKey, AdminRecord[]> = {
  news: news.map((n, i) =>
    record(n.slug, `2026-10-${String(24 - i * 3).padStart(2, "0")}`, {
      title: n.title,
      category: n.category,
      lead: n.lead,
      publishedAt: `2026-10-${String(24 - i * 3).padStart(2, "0")}`,
      status: i === 4 ? "Brouillon" : "Publié",
      featured: i < 3,
    }),
  ),
  events: events.map((e, i) =>
    record(e.slug, "2026-10-15", {
      title: e.title,
      category: e.category,
      date: "",
      when: e.when,
      place: "[lieu]",
      status: i === 2 ? "Brouillon" : "Publié",
    }),
  ),
  officials: [
    record("maire", "2026-01-10", { name: "[Prénom Nom]", role: "Maire", group: "Maire", delegation: "—", community: true }),
    ...officials.map((o, i) =>
      record(`elu-${i + 1}`, "2026-01-10", {
        name: "[Prénom Nom]",
        role: o.role,
        group: { adjoints: "Adjoint", delegues: "Conseiller délégué", conseillers: "Conseiller municipal" }[o.group],
        delegation: o.delegation,
        community: i < 2,
      }),
    ),
  ],
  documents: documents.map((d) =>
    record(d.id, `${d.year}-03-01`, {
      title: d.title,
      type: documentTypes.find((t) => t.id === d.type)!.label,
      year: d.year,
      status: "Publié",
    }),
  ),
  procedures: procedures.map((p) =>
    record(p.slug, "2026-09-01", {
      title: p.title,
      theme: p.theme,
      where: p.where,
      lead: p.lead,
      featured: ["reserver-une-salle", "carte-identite-passeport", "permis-de-construire"].includes(p.slug),
    }),
  ),
  rooms: rooms.map((r, i) =>
    record(`salle-${i + 1}`, "2026-09-01", { name: r.name, capacity: r.capacity, equipment: r.equipment, price: r.price }),
  ),
  reports: [
    record("sig-1", "2026-10-28", {
      type: "Éclairage public",
      place: "Rue Émile Gauthier",
      description: "Lampadaire éteint depuis plusieurs soirs.",
      email: "habitant@exemple.fr",
      status: "Nouveau",
      assignee: "",
      notes: "",
    }),
    record("sig-2", "2026-10-27", {
      type: "Voirie",
      place: "Abords de la gare",
      description: "Nid-de-poule sur la chaussée.",
      email: "",
      status: "Nouveau",
      assignee: "",
      notes: "",
    }),
    record("sig-3", "2026-10-22", {
      type: "Dépôt sauvage",
      place: "Chemin près de l'étang",
      description: "Sacs et encombrants déposés au bord du chemin.",
      email: "",
      status: "En cours",
      assignee: "Services techniques",
      notes: "Passage prévu cette semaine.",
    }),
    record("sig-4", "2026-10-14", {
      type: "Espaces verts",
      place: "Bourg, près de l'église",
      description: "Branche tombée sur le trottoir.",
      email: "habitant@exemple.fr",
      status: "Traité",
      assignee: "Services techniques",
      notes: "Branche évacuée.",
    }),
  ],
  bookings: [
    record("res-1", "2026-10-26", {
      room: rooms[0].name,
      date: "2026-12-12",
      start: "14:00",
      end: "19:00",
      purpose: "Assemblée générale d'association",
      name: "[Prénom Nom]",
      email: "association@exemple.fr",
      phone: "[téléphone]",
      status: "En attente",
    }),
    record("res-2", "2026-10-20", {
      room: rooms[1].name,
      date: "2026-11-21",
      start: "18:00",
      end: "23:00",
      purpose: "Repas de famille",
      name: "[Prénom Nom]",
      email: "habitant@exemple.fr",
      phone: "[téléphone]",
      status: "Validée",
    }),
  ],
  messages: [
    record("msg-1", "2026-10-28", {
      name: "[Prénom Nom]",
      email: "habitant@exemple.fr",
      subject: "Inscription à l'école",
      message: "Bonjour, quels documents faut-il apporter pour la préinscription ?",
      status: "Nouveau",
    }),
    record("msg-2", "2026-10-25", {
      name: "[Prénom Nom]",
      email: "habitant@exemple.fr",
      subject: "Horaires de la mairie",
      message: "La mairie est-elle ouverte le mercredi après-midi ?",
      status: "Répondu",
    }),
  ],
};

const singletons: Singletons = {
  alert: {
    active: true,
    label: "À savoir",
    message: "La collecte des déchets passe désormais **toutes les 3 semaines**. Le calendrier SMICVAL 2025-2026 est disponible.",
    shortMessage: "Collecte des déchets **toutes les 3 semaines**.",
    linkLabel: "Voir le calendrier",
    href: "/actualites/calendrier-collecte-smicval-2025-2026",
  },
  settings: {
    address: site.address,
    phone: site.phone,
    email: site.email,
    hoursMonTueThu: hours[0].slots.join(" · "),
    hoursWed: hours[1].slots.join(" · "),
    hoursFri: hours[2].slots.join(" · "),
  },
};

export const seeds = { collections, singletons };
