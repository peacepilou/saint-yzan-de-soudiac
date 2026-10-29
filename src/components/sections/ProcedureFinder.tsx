"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { FilterChips } from "@/components/ui/FilterChips";
import { Icon } from "@/components/ui/icons";
import { procedures, procedureThemes } from "@/data/procedures";
import { type } from "@/lib/styles";
import type { ProcedureTheme } from "@/lib/types";
import { normalize } from "@/lib/utils";
import { ProcedureList } from "./ProcedureList";

type Ctx = { query: string; setQuery: (q: string) => void };
const QueryContext = createContext<Ctx>({ query: "", setQuery: () => {} });

/** Partage la recherche du hero avec la liste « Toutes les démarches ». */
export function ProcedureQueryProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  return <QueryContext.Provider value={{ query, setQuery }}>{children}</QueryContext.Provider>;
}

/** Grande recherche du hero Démarches : filtre la liste en direct. */
export function ProcedureSearch() {
  const { query, setQuery } = useContext(QueryContext);
  return (
    <form
      role="search"
      aria-label="Rechercher une démarche"
      onSubmit={(e) => {
        e.preventDefault();
        document.getElementById("toutes")?.scrollIntoView({ behavior: "smooth" });
      }}
      className="mt-8 flex max-w-[680px] items-center gap-1.5 rounded-full bg-white py-1 pr-1 pl-[18px] text-ink focus-within:shadow-[0_0_0_3px_var(--color-focus)] md:gap-2 md:py-2 md:pr-2 md:pl-6"
    >
      <label htmlFor="qd" className="sr-only">
        Rechercher une démarche
      </label>
      <Icon name="search" size={20} strokeWidth={2} className="hidden flex-none text-muted md:block" />
      <input
        id="qd"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Carte d'identité, permis de construire, salle…"
        aria-controls="liste-demarches"
        className="h-[46px] min-w-0 flex-auto border-0 bg-transparent font-[inherit] outline-none focus-visible:outline-none md:h-12"
      />
      <button
        type="submit"
        className="flex size-[46px] flex-none cursor-pointer items-center justify-center rounded-full border-0 bg-accent font-[inherit] font-semibold text-white hover:bg-accent-hover md:h-[52px] md:w-auto md:px-[26px]"
      >
        <Icon name="search" size={18} strokeWidth={2} className="md:hidden" />
        <span className="sr-only md:not-sr-only">Rechercher</span>
      </button>
    </form>
  );
}

/** « Toutes les démarches » : filtres par thème + recherche du hero. */
export function ProcedureBrowser() {
  const { query, setQuery } = useContext(QueryContext);
  const [theme, setTheme] = useState<ProcedureTheme | "Tout">("Tout");
  const q = normalize(query.trim());
  const shown = procedures.filter(
    (p) => p.listed && (theme === "Tout" || p.theme === theme) && (!q || normalize(`${p.title} ${p.where} ${p.theme}`).includes(q)),
  );

  return (
    <section id="toutes" aria-labelledby="h-all" className="mx-auto max-w-[1360px] px-5 pt-12 md:px-10 md:pt-28">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
        <h2 id="h-all" className={type.h2Section}>
          Toutes les démarches
        </h2>
        <FilterChips
          label="Filtrer par thème"
          options={(["Tout", ...procedureThemes] as const).map((t) => ({ id: t, label: t }))}
          value={theme}
          onChange={setTheme}
        />
      </div>
      <p role="status" className="sr-only">
        {shown.length} démarche{shown.length > 1 ? "s" : ""} affichée{shown.length > 1 ? "s" : ""}
        {q ? ` pour « ${query.trim()} »` : ""}
      </p>
      <div id="liste-demarches">
        {shown.length ? (
          <ProcedureList items={shown} />
        ) : (
          <div className="flex flex-wrap items-center gap-4 rounded-[20px] bg-surface p-6">
            <p className="text-muted">Aucune démarche ne correspond à votre recherche.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setTheme("Tout");
              }}
              className="cursor-pointer border-0 bg-transparent p-0 font-[inherit] font-semibold text-accent link-hover"
            >
              Afficher toutes les démarches
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
