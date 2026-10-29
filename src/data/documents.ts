import type { DocumentType, MunicipalDocument } from "@/lib/types";

export const documentTypes: { id: DocumentType; label: string; meta: string }[] = [
  { id: "pv", label: "Procès-verbaux", meta: "Conseil municipal" },
  { id: "deliberation", label: "Délibérations", meta: "Délibérations" },
  { id: "arrete", label: "Arrêtés", meta: "Arrêté" },
  { id: "budget", label: "Budget", meta: "Budget" },
];

export const documentYears = ["2026", "2025", "2024"];

export const documents: MunicipalDocument[] = [
  { id: "2026-pv-1", title: "Procès-verbal de la séance du [date]", type: "pv", year: "2026" },
  { id: "2026-del-1", title: "Délibérations de la séance du [date]", type: "deliberation", year: "2026" },
  { id: "2026-pv-2", title: "Procès-verbal de la séance du [date]", type: "pv", year: "2026" },
  { id: "2026-arr-1", title: "Arrêté municipal n° [numéro]", type: "arrete", year: "2026" },
  { id: "2026-bud-1", title: "Budget primitif 2026", type: "budget", year: "2026" },
  { id: "2025-pv-1", title: "Procès-verbal de la séance du [date]", type: "pv", year: "2025" },
  { id: "2025-del-1", title: "Vote du budget primitif 2025", type: "deliberation", year: "2025" },
  { id: "2025-pv-2", title: "Procès-verbal de la séance du [date]", type: "pv", year: "2025" },
  { id: "2025-bud-1", title: "Compte administratif 2024", type: "budget", year: "2025" },
  { id: "2025-arr-1", title: "Arrêté municipal n° [numéro]", type: "arrete", year: "2025" },
  { id: "2024-pv-1", title: "Procès-verbal de la séance du [date]", type: "pv", year: "2024" },
  { id: "2024-del-1", title: "Délibérations de la séance du [date]", type: "deliberation", year: "2024" },
];

/** Documents affichés sur /mairie, dans l'ordre de la maquette. */
export const mairieDocuments = documents.filter((d) => d.type !== "budget" && d.id !== "2025-arr-1");

export function documentMeta(doc: MunicipalDocument) {
  const type = documentTypes.find((t) => t.id === doc.type)!;
  return `${type.meta} · PDF · [taille]`;
}
