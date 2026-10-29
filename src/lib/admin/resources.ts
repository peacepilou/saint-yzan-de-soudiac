import {
  Building2,
  CalendarDays,
  FileText,
  Inbox,
  LayoutDashboard,
  ListChecks,
  Mail,
  Megaphone,
  Newspaper,
  Settings,
  TriangleAlert,
  Users,
  type LucideIcon,
} from "lucide-react";
import { rooms } from "@/data/rooms";
import type { CollectionKey, Column, Field, StatusTone } from "./types";

export type Resource = {
  /** Segment d'URL : /admin/{slug}. */
  slug: string;
  collection: CollectionKey;
  label: string;
  singular: string;
  /** Accord des libellés (« une actualité », « un signalement »). */
  feminine: boolean;
  description: string;
  icon: LucideIcon;
  fields: Field[];
  columns: Column[];
  /** Champ affiché comme titre dans la liste et le panneau. */
  titleField: string;
  searchFields: string[];
  statuses?: { value: string; tone: StatusTone }[];
  /** Les demandes arrivent du site public : pas de bouton « Ajouter ». */
  canCreate: boolean;
};

const publish = [
  { value: "Publié", tone: "done" as const },
  { value: "Programmé", tone: "progress" as const },
  { value: "Brouillon", tone: "neutral" as const },
];

export const resources: Resource[] = [
  {
    slug: "actualites",
    collection: "news",
    label: "Actualités",
    singular: "actualité",
    feminine: true,
    description: "Articles publiés sur le site et sur l'accueil.",
    icon: Newspaper,
    titleField: "title",
    searchFields: ["title", "category", "lead"],
    statuses: publish,
    canCreate: true,
    columns: [
      { key: "title", label: "Titre" },
      { key: "category", label: "Catégorie" },
      { key: "publishedAt", label: "Publication", kind: "date" },
      { key: "featured", label: "À la une", kind: "bool" },
      { key: "status", label: "Statut", kind: "status" },
    ],
    fields: [
      { name: "title", label: "Titre", type: "text", required: true, full: true },
      { name: "category", label: "Catégorie", type: "select", options: ["Solidarité", "Animation", "Services", "Environnement", "Santé"], required: true },
      { name: "publishedAt", label: "Date de publication", type: "date", required: true },
      { name: "lead", label: "Chapô", type: "textarea", required: true, full: true, help: "Une ou deux phrases affichées sous le titre." },
      { name: "image", label: "Image", type: "file", help: "Texte alternatif obligatoire à la mise en ligne." },
      { name: "status", label: "Statut", type: "select", options: ["Brouillon", "Programmé", "Publié"], required: true },
      { name: "featured", label: "Afficher à la une de l'accueil", type: "checkbox", full: true },
    ],
  },
  {
    slug: "evenements",
    collection: "events",
    label: "Événements",
    singular: "événement",
    feminine: false,
    description: "Agenda des animations, marchés et séances du conseil.",
    icon: CalendarDays,
    titleField: "title",
    searchFields: ["title", "category", "place"],
    statuses: publish,
    canCreate: true,
    columns: [
      { key: "title", label: "Événement" },
      { key: "category", label: "Catégorie" },
      { key: "when", label: "Quand" },
      { key: "status", label: "Statut", kind: "status" },
    ],
    fields: [
      { name: "title", label: "Titre", type: "text", required: true, full: true },
      { name: "category", label: "Catégorie", type: "select", options: ["Animation", "Marché", "Vie municipale"], required: true },
      { name: "date", label: "Date", type: "date", help: "Laisser vide si la date n'est pas encore fixée." },
      { name: "when", label: "Texte affiché", type: "text", required: true, help: "Ex. : « Décembre · date à venir »." },
      { name: "place", label: "Lieu", type: "text" },
      { name: "status", label: "Statut", type: "select", options: ["Brouillon", "Publié"], required: true },
    ],
  },
  {
    slug: "elus",
    collection: "officials",
    label: "Élus",
    singular: "élu",
    feminine: false,
    description: "Maire, adjoints et conseillers affichés sur la page « Les élus ».",
    icon: Users,
    titleField: "name",
    searchFields: ["name", "role", "delegation"],
    canCreate: true,
    columns: [
      { key: "name", label: "Nom" },
      { key: "role", label: "Fonction" },
      { key: "delegation", label: "Délégation" },
      { key: "community", label: "Délégué CdC", kind: "bool" },
    ],
    fields: [
      { name: "name", label: "Prénom et nom", type: "text", required: true },
      { name: "role", label: "Fonction", type: "text", required: true, help: "Ex. : « 1er adjoint »." },
      { name: "group", label: "Groupe", type: "select", options: ["Maire", "Adjoint", "Conseiller délégué", "Conseiller municipal"], required: true },
      { name: "delegation", label: "Délégation ou commission", type: "text" },
      { name: "photo", label: "Photo officielle", type: "file" },
      { name: "community", label: "Délégué à la Communauté de communes", type: "checkbox", full: true },
    ],
  },
  {
    slug: "documents",
    collection: "documents",
    label: "Documents",
    singular: "document",
    feminine: false,
    description: "Procès-verbaux, délibérations, arrêtés et budget.",
    icon: FileText,
    titleField: "title",
    searchFields: ["title", "type", "year"],
    statuses: publish,
    canCreate: true,
    columns: [
      { key: "title", label: "Titre" },
      { key: "type", label: "Type" },
      { key: "year", label: "Année" },
      { key: "status", label: "Statut", kind: "status" },
    ],
    fields: [
      { name: "title", label: "Titre", type: "text", required: true, full: true },
      { name: "type", label: "Type", type: "select", options: ["Procès-verbaux", "Délibérations", "Arrêtés", "Budget"], required: true },
      { name: "year", label: "Année", type: "select", options: ["2026", "2025", "2024"], required: true },
      { name: "file", label: "Fichier PDF", type: "file", help: "Fournir une version accessible du document." },
      { name: "status", label: "Statut", type: "select", options: ["Brouillon", "Publié"], required: true },
    ],
  },
  {
    slug: "demarches",
    collection: "procedures",
    label: "Démarches",
    singular: "démarche",
    feminine: true,
    description: "Fiches démarches et mise en avant sur la page Démarches.",
    icon: ListChecks,
    titleField: "title",
    searchFields: ["title", "theme", "where"],
    canCreate: true,
    columns: [
      { key: "title", label: "Démarche" },
      { key: "theme", label: "Thème" },
      { key: "where", label: "Canal" },
      { key: "featured", label: "Mise en avant", kind: "bool" },
    ],
    fields: [
      { name: "title", label: "Titre", type: "text", required: true, full: true },
      { name: "theme", label: "Thème", type: "select", options: ["État civil", "Urbanisme", "Famille", "Vie quotidienne"], required: true },
      { name: "where", label: "Lieu ou canal", type: "text", required: true, help: "Ex. : « En ligne ou en mairie »." },
      { name: "lead", label: "Description", type: "textarea", full: true },
      { name: "featured", label: "Mettre en avant dans « Les plus demandées »", type: "checkbox", full: true },
    ],
  },
  {
    slug: "salles",
    collection: "rooms",
    label: "Salles",
    singular: "salle",
    feminine: true,
    description: "Salles municipales proposées à la réservation.",
    icon: Building2,
    titleField: "name",
    searchFields: ["name", "equipment"],
    canCreate: true,
    columns: [
      { key: "name", label: "Salle" },
      { key: "capacity", label: "Capacité" },
      { key: "price", label: "Tarif" },
    ],
    fields: [
      { name: "name", label: "Nom", type: "text", required: true, full: true },
      { name: "capacity", label: "Capacité", type: "text" },
      { name: "price", label: "Tarif", type: "text" },
      { name: "equipment", label: "Équipements", type: "textarea", full: true },
      { name: "photo", label: "Photo", type: "file" },
    ],
  },
  {
    slug: "signalements",
    collection: "reports",
    label: "Signalements",
    singular: "signalement",
    feminine: false,
    description: "Problèmes signalés par les habitants depuis le site.",
    icon: TriangleAlert,
    titleField: "type",
    searchFields: ["type", "place", "description"],
    statuses: [
      { value: "Nouveau", tone: "new" },
      { value: "En cours", tone: "progress" },
      { value: "Traité", tone: "done" },
    ],
    canCreate: false,
    columns: [
      { key: "type", label: "Type" },
      { key: "place", label: "Lieu" },
      { key: "createdAt", label: "Reçu le", kind: "date" },
      { key: "assignee", label: "Assigné à" },
      { key: "status", label: "Statut", kind: "status" },
    ],
    fields: [
      { name: "type", label: "Type de problème", type: "select", options: ["Voirie", "Éclairage public", "Dépôt sauvage", "Espaces verts", "Autre"], required: true },
      { name: "place", label: "Adresse ou lieu", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true, full: true },
      { name: "email", label: "E-mail de l'habitant", type: "email", help: "Facultatif : l'habitant est prévenu des changements de statut." },
      { name: "status", label: "Statut", type: "select", options: ["Nouveau", "En cours", "Traité"], required: true },
      { name: "assignee", label: "Assigné à", type: "select", options: ["", "Services techniques", "Accueil de la mairie", "Élu de permanence"] },
      { name: "notes", label: "Notes internes", type: "textarea", full: true, help: "Non visibles par l'habitant." },
    ],
  },
  {
    slug: "reservations",
    collection: "bookings",
    label: "Réservations",
    singular: "réservation",
    feminine: true,
    description: "Demandes de réservation des salles municipales.",
    icon: Inbox,
    titleField: "purpose",
    searchFields: ["purpose", "room", "name", "email"],
    statuses: [
      { value: "En attente", tone: "new" },
      { value: "Validée", tone: "done" },
      { value: "Refusée", tone: "refused" },
    ],
    canCreate: false,
    columns: [
      { key: "purpose", label: "Objet" },
      { key: "room", label: "Salle" },
      { key: "date", label: "Date souhaitée", kind: "date" },
      { key: "name", label: "Demandeur" },
      { key: "status", label: "Statut", kind: "status" },
    ],
    fields: [
      { name: "room", label: "Salle", type: "select", options: rooms.map((r) => r.name), required: true, full: true },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "start", label: "Début", type: "time" },
      { name: "end", label: "Fin", type: "time" },
      { name: "purpose", label: "Objet", type: "textarea", required: true, full: true },
      { name: "name", label: "Demandeur", type: "text", required: true },
      { name: "email", label: "E-mail", type: "email" },
      { name: "phone", label: "Téléphone", type: "tel" },
      { name: "status", label: "Statut", type: "select", options: ["En attente", "Validée", "Refusée"], required: true },
    ],
  },
  {
    slug: "messages",
    collection: "messages",
    label: "Messages",
    singular: "message",
    feminine: false,
    description: "Messages envoyés depuis le formulaire de contact.",
    icon: Mail,
    titleField: "subject",
    searchFields: ["subject", "name", "message", "email"],
    statuses: [
      { value: "Nouveau", tone: "new" },
      { value: "Lu", tone: "neutral" },
      { value: "Répondu", tone: "done" },
    ],
    canCreate: false,
    columns: [
      { key: "subject", label: "Objet" },
      { key: "name", label: "Expéditeur" },
      { key: "createdAt", label: "Reçu le", kind: "date" },
      { key: "status", label: "Statut", kind: "status" },
    ],
    fields: [
      { name: "subject", label: "Objet", type: "text", required: true, full: true },
      { name: "name", label: "Nom", type: "text" },
      { name: "email", label: "E-mail", type: "email" },
      { name: "message", label: "Message", type: "textarea", required: true, full: true },
      { name: "status", label: "Statut", type: "select", options: ["Nouveau", "Lu", "Répondu"], required: true },
    ],
  },
];

export function getResource(slug: string) {
  return resources.find((r) => r.slug === slug);
}

export function resourceFor(collection: CollectionKey) {
  return resources.find((r) => r.collection === collection)!;
}

/** Menu latéral, groupé comme dans le cahier des charges (§8.1). */
export const adminNav: { title?: string; items: { href: string; label: string; icon: LucideIcon; badge?: CollectionKey }[] }[] = [
  { items: [{ href: "/admin", label: "Tableau de bord", icon: LayoutDashboard }] },
  {
    title: "Contenus",
    items: [
      { href: "/admin/actualites", label: "Actualités", icon: Newspaper },
      { href: "/admin/evenements", label: "Événements", icon: CalendarDays },
      { href: "/admin/bandeau", label: "Bandeau « À savoir »", icon: Megaphone },
    ],
  },
  {
    title: "Vie municipale",
    items: [
      { href: "/admin/elus", label: "Élus", icon: Users },
      { href: "/admin/documents", label: "Documents", icon: FileText },
    ],
  },
  {
    title: "Services",
    items: [
      { href: "/admin/demarches", label: "Démarches", icon: ListChecks },
      { href: "/admin/salles", label: "Salles", icon: Building2 },
    ],
  },
  {
    title: "Demandes",
    items: [
      { href: "/admin/signalements", label: "Signalements", icon: TriangleAlert, badge: "reports" },
      { href: "/admin/reservations", label: "Réservations", icon: Inbox, badge: "bookings" },
      { href: "/admin/messages", label: "Messages", icon: Mail, badge: "messages" },
    ],
  },
  { title: "Réglages", items: [{ href: "/admin/reglages", label: "Mairie & démo", icon: Settings }] },
];

/** Statut « à traiter » de chaque collection de demandes (badges du menu, tableau de bord). */
export const pendingStatus: Partial<Record<CollectionKey, string>> = {
  reports: "Nouveau",
  bookings: "En attente",
  messages: "Nouveau",
};
