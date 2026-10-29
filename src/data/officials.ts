import type { Official, OfficialGroup } from "@/lib/types";

export const officialFilters: { id: "tous" | OfficialGroup; label: string }[] = [
  { id: "tous", label: "Tous" },
  { id: "adjoints", label: "Adjoints" },
  { id: "delegues", label: "Conseillers délégués" },
  { id: "conseillers", label: "Conseillers municipaux" },
];

export const portraitTint: Record<OfficialGroup, string> = {
  adjoints: "bg-portrait",
  delegues: "bg-portrait-warm",
  conseillers: "bg-portrait-neutral",
};

const adjoint = (role: string): Official => ({ role, group: "adjoints", delegation: "[Délégation]" });
const delegue: Official = { role: "Conseiller délégué", group: "delegues", delegation: "[Délégation]" };
const conseiller: Official = { role: "Conseiller municipal", group: "conseillers", delegation: "[Commission]" };

export const officials: Official[] = [
  adjoint("1er adjoint"),
  adjoint("2e adjoint"),
  adjoint("3e adjoint"),
  adjoint("4e adjoint"),
  delegue,
  delegue,
  ...Array.from({ length: 6 }, () => conseiller),
];

export const committees = [
  { name: "[Commission]", chair: "Présidée par [Prénom Nom]" },
  { name: "[Commission]", chair: "Présidée par [Prénom Nom]" },
  { name: "[Commission]", chair: "Présidée par [Prénom Nom]" },
  { name: "Commission d'appel d'offres", chair: "Présidée par le maire" },
];

export const communityDelegates = [
  { name: "[Prénom Nom]", role: "Conseiller communautaire titulaire" },
  { name: "[Prénom Nom]", role: "Conseiller communautaire titulaire" },
  { name: "[Prénom Nom]", role: "Suppléant" },
];
