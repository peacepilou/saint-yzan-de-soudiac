"use client";

import { useSearchParams } from "next/navigation";
import { useState, type ReactNode } from "react";
import { FilterChips } from "@/components/ui/FilterChips";
import { documentTypes, documentYears } from "@/data/documents";
import type { DocumentType, MunicipalDocument } from "@/lib/types";
import { DocList } from "./DocList";

const plural = (n: number) => `${n} document${n > 1 ? "s" : ""} affiché${n > 1 ? "s" : ""}`;

/** Comptes rendus de /mairie : filtre par année seulement, sans compteur (maquette). */
export function DocumentsByYear({ docs, intro }: { docs: MunicipalDocument[]; intro: ReactNode }) {
  const [year, setYear] = useState(documentYears[0]);
  const shown = docs.filter((d) => d.year === year);
  return (
    <div className="flex flex-wrap gap-12">
      <div className="flex flex-[1_1_320px] flex-col gap-[18px]">
        {intro}
        <FilterChips label="Filtrer par année" size="md" options={documentYears.map((y) => ({ id: y, label: y }))} value={year} onChange={setYear} />
      </div>
      <p role="status" className="sr-only">
        {plural(shown.length)}
      </p>
      <DocList docs={shown} className="flex-[999_1_640px]" />
    </div>
  );
}

/** Page des comptes rendus : filtres par année et par type, avec compteurs. `?type=budget` présélectionne un type. */
export function DocumentBrowser({ docs }: { docs: MunicipalDocument[] }) {
  const requested = useSearchParams().get("type");
  const initialKind = documentTypes.find((t) => t.id === requested)?.id ?? "tous";
  const [year, setYear] = useState<string>("tous");
  const [kind, setKind] = useState<DocumentType | "tous">(initialKind);
  const byYear = (y: string) => docs.filter((d) => y === "tous" || d.year === y);
  const shown = byYear(year).filter((d) => kind === "tous" || d.type === kind);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <FilterChips
          label="Filtrer par année"
          options={[{ id: "tous", label: "Toutes les années", count: docs.length }, ...documentYears.map((y) => ({ id: y, label: y, count: byYear(y).length }))]}
          value={year}
          onChange={setYear}
        />
        <FilterChips<DocumentType | "tous">
          label="Filtrer par type de document"
          options={[
            { id: "tous", label: "Tous les types", count: byYear(year).length },
            ...documentTypes.map((t) => ({ id: t.id, label: t.label, count: byYear(year).filter((d) => d.type === t.id).length })),
          ]}
          value={kind}
          onChange={setKind}
        />
      </div>
      <p role="status" className="sr-only">
        {plural(shown.length)}
      </p>
      {shown.length ? (
        <DocList docs={shown} />
      ) : (
        <p className="rounded-[20px] bg-surface p-6 text-muted">Aucun document ne correspond à ces filtres.</p>
      )}
    </div>
  );
}
