export type PhotoKey =
  | "eglise11"
  | "hero"
  | "eglise"
  | "modillons"
  | "mairie"
  | "ecole"
  | "college"
  | "poste"
  | "monument"
  | "gareHD"
  | "gare"
  | "bourg"
  | "lac";

export type Photo = {
  src: string;
  width: number;
  height: number;
  subject: string;
  credit: string;
};

export type OpeningHours = {
  days: string;
  shortDays: string;
  weekdays: number[];
  slots: string[];
};

export type NavKey = "mairie" | "demarches" | "vivre" | "decouvrir" | "agenda" | "contact";

export type NavLink = { label: string; desc: string; href: string };

export type MegaMenuEntry = {
  id: Exclude<NavKey, "agenda" | "contact">;
  label: string;
  title: string;
  href: string;
  img: PhotoKey;
  cta: string;
  links: NavLink[];
};

export type Tone = "accent" | "warning" | "health";

export type NewsCategory = "Solidarité" | "Animation" | "Services" | "Environnement" | "Santé";

export type RichText = { text: string; strong?: string; after?: string };

export type ArticleBlock =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "quote"; text: string }
  | { type: "steps"; items: RichText[] };

export type NewsArticle = {
  slug: string;
  title: string;
  shortTitle?: string;
  category: NewsCategory;
  subcategory: string;
  tags: string[];
  lead: string;
  date: string;
  readingTime: string;
  image?: { key: PhotoKey; alt: string; caption: string };
  placeholderIcon?: "trash" | "heart" | "calendar" | "info";
  body: ArticleBlock[];
  brief: { label: string; value: string }[];
  aside?: { title: string; text: string; href: string };
};

export type EventCategory = "Animation" | "Marché" | "Vie municipale";

export type AgendaEvent = {
  slug: string;
  title: string;
  when: string;
  category: EventCategory;
  tone: Tone;
  img: PhotoKey;
  grayscale?: boolean;
};

export type ProcedureTheme = "État civil" | "Urbanisme" | "Famille" | "Vie quotidienne";

export type Procedure = {
  slug: string;
  title: string;
  where: string;
  theme: ProcedureTheme;
  href?: string;
  listed: boolean;
  lead: string;
  how: string[];
  pieces: string[];
  delay: string;
  related: string[];
};

export type DocumentType = "pv" | "deliberation" | "arrete" | "budget";

export type MunicipalDocument = {
  id: string;
  title: string;
  type: DocumentType;
  year: string;
};

export type OfficialGroup = "adjoints" | "delegues" | "conseillers";

export type Official = { role: string; group: OfficialGroup; delegation: string };

export type Room = { name: string; capacity: string; equipment: string; price: string };

export type HistoryEntry = { date: string; text: string };

export type FactItem = { label: string; value: string };

export type ServiceCard = { id?: string; title: string; text: string; cta: string; href: string };

export type RubriqueSection =
  | { kind: "facts"; id: string; title: string; text: string; facts: FactItem[] }
  | {
      kind: "tiles";
      id: string;
      title: string;
      text: string;
      tiles: FactItem[];
      docs: { label: string; href: string }[];
    }
  | { kind: "cards"; id?: string; title?: string; label: string; cards: ServiceCard[] }
  | {
      kind: "feature";
      id: string;
      title: string;
      text: string;
      img?: PhotoKey;
      links: { label: string; href: string }[];
    };

export type Rubrique = {
  slug: string;
  title: string;
  titleLines: string[];
  lead: string;
  hero: { img: PhotoKey; alt: string; position: string; grayscale?: boolean };
  action: { title: string; text: string; cta: string; href: string };
  toc: { id: string; label: string }[];
  sections: RubriqueSection[];
};
