"use client";

import { useState } from "react";
import { FilterChips } from "@/components/ui/FilterChips";
import { officialFilters, officials } from "@/data/officials";
import { type } from "@/lib/styles";
import type { OfficialGroup } from "@/lib/types";
import { OfficialCard } from "./OfficialCard";

/** « Le conseil municipal » de la page Élus : filtres par groupe et grille de portraits. */
export function OfficialsGrid() {
  const [filter, setFilter] = useState<"tous" | OfficialGroup>("tous");
  const shown = officials.filter((o) => filter === "tous" || o.group === filter);
  const count = (id: string) => (id === "tous" ? officials.length : officials.filter((o) => o.group === id).length);

  return (
    <section id="conseil" aria-labelledby="h-conseil" className="mx-auto max-w-[1360px] px-5 pt-12 md:px-10 md:pt-32">
      <div className="mb-9 flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
        <div className="flex flex-[1_1_480px] flex-col gap-3.5">
          <h2 id="h-conseil" className={type.h2Section}>
            Le conseil municipal
          </h2>
          <p className="max-w-[560px] text-muted">Élu pour six ans, il règle par ses délibérations les affaires de la commune. Ses séances sont publiques.</p>
        </div>
        <FilterChips
          label="Filtrer les élus"
          options={officialFilters.map((f) => ({ ...f, count: count(f.id) }))}
          value={filter}
          onChange={setFilter}
        />
      </div>
      <p role="status" className="sr-only">
        {shown.length} {shown.length > 1 ? "élus affichés" : "élu affiché"}
      </p>
      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(250px,100%),1fr))] gap-x-6 gap-y-8 p-0">
        {shown.map((o, i) => (
          <OfficialCard key={`${o.role}-${i}`} official={o} />
        ))}
      </ul>
      <p className="mt-8 text-[14px] text-muted">
        Liste indicative : la composition et les délégations seront saisies par la mairie dans l&apos;administration du site.
      </p>
    </section>
  );
}
