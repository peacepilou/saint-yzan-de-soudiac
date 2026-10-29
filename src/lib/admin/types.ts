export type CollectionKey =
  | "news"
  | "events"
  | "officials"
  | "documents"
  | "procedures"
  | "rooms"
  | "reports"
  | "bookings"
  | "messages";

/** Enregistrement générique d'une collection : valeurs texte ou cases à cocher. */
export type AdminRecord = { id: string; createdAt: string } & Record<string, string | boolean>;

export type Alert = {
  active: boolean;
  label: string;
  message: string;
  shortMessage: string;
  linkLabel: string;
  href: string;
};

export type Settings = {
  address: string;
  phone: string;
  email: string;
  hoursMonTueThu: string;
  hoursWed: string;
  hoursFri: string;
};

export type Singletons = { alert: Alert; settings: Settings };

export type FieldType = "text" | "textarea" | "select" | "date" | "time" | "email" | "tel" | "number" | "checkbox" | "file";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  required?: boolean;
  help?: string;
  /** Occupe toute la largeur du formulaire. */
  full?: boolean;
};

export type StatusTone = "new" | "progress" | "done" | "neutral" | "refused";

export type Column = { key: string; label: string; kind?: "status" | "date" | "bool" };
