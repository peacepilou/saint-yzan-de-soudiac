"use client";

import { useState } from "react";
import { FilterChips } from "@/components/ui/FilterChips";
import type { AgendaEvent, EventCategory } from "@/lib/types";
import { AgendaList } from "./AgendaList";

/** Agenda complet, filtrable par catégorie. */
export function AgendaBrowser({ events }: { events: AgendaEvent[] }) {
  const categories = [...new Set(events.map((e) => e.category))];
  const [category, setCategory] = useState<EventCategory | "Toutes">("Toutes");
  const shown = events.filter((e) => category === "Toutes" || e.category === category);

  return (
    <div className="flex min-w-0 flex-[999_1_640px] flex-col gap-6">
      <FilterChips<EventCategory | "Toutes">
        label="Filtrer par catégorie"
        options={[
          { id: "Toutes", label: "Tous les événements", count: events.length },
          ...categories.map((c) => ({ id: c, label: c, count: events.filter((e) => e.category === c).length })),
        ]}
        value={category}
        onChange={setCategory}
      />
      <p role="status" className="sr-only">
        {shown.length} événement{shown.length > 1 ? "s" : ""} affiché{shown.length > 1 ? "s" : ""}
      </p>
      <AgendaList events={shown} />
    </div>
  );
}
