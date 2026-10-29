"use client";

import { Check, Pencil, Plus, Search } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { FilterChips } from "@/components/ui/FilterChips";
import { getResource } from "@/lib/admin/resources";
import { useCollection } from "@/lib/admin/store";
import type { AdminRecord } from "@/lib/admin/types";
import { normalize } from "@/lib/utils";
import { PageHeader } from "./PageHeader";
import { RecordDialog } from "./RecordDialog";
import { formatDay, StatusBadge } from "./StatusBadge";

/** Liste d'un module (actualités, signalements…) : recherche, filtre par statut, tableau et panneau d'édition. */
export function ResourceTable({ slug }: { slug: string }) {
  const resource = getResource(slug)!;
  const records = useCollection(resource.collection);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("tous");
  const [editing, setEditing] = useState<AdminRecord | "new" | null>(null);

  const q = normalize(query.trim());
  const matching = records.filter((r) => !q || normalize(resource.searchFields.map((f) => String(r[f] ?? "")).join(" ")).includes(q));
  const shown = matching.filter((r) => status === "tous" || r.status === status);
  const toneOf = (value: string) => resource.statuses?.find((s) => s.value === value)?.tone;

  return (
    <>
      <PageHeader
        title={resource.label}
        description={resource.description}
        actions={
          resource.canCreate && (
            <Button variant="primary" size={46} onClick={() => setEditing("new")}>
              <Plus size={18} aria-hidden="true" />
              Ajouter
            </Button>
          )
        }
      />

      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex h-12 w-full max-w-[360px] items-center gap-2 rounded-full border border-line-strong bg-white px-4 focus-within:shadow-[0_0_0_3px_var(--color-focus)]">
          <Search size={18} aria-hidden="true" className="flex-none text-muted" />
          <label htmlFor="admin-search" className="sr-only">
            Rechercher dans {resource.label.toLowerCase()}
          </label>
          <input
            id="admin-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher…"
            className="h-full min-w-0 flex-auto border-0 bg-transparent font-[inherit] outline-none focus-visible:outline-none"
          />
        </div>
        {resource.statuses && (
          <FilterChips
            label="Filtrer par statut"
            options={[
              { id: "tous", label: "Tous", count: matching.length },
              ...resource.statuses.map((s) => ({ id: s.value, label: s.value, count: matching.filter((r) => r.status === s.value).length })),
            ]}
            value={status}
            onChange={setStatus}
          />
        )}
      </div>

      <p role="status" className="sr-only">
        {shown.length} élément{shown.length > 1 ? "s" : ""} affiché{shown.length > 1 ? "s" : ""}
      </p>

      <div className="overflow-x-auto rounded-[20px] border border-line bg-white">
        <table className="w-full min-w-[720px] border-collapse text-left text-[15px]">
          <thead>
            <tr className="border-b border-line bg-surface-hover text-[13px] uppercase tracking-[0.06em] text-muted">
              {resource.columns.map((c) => (
                <th key={c.key} scope="col" className="px-5 py-3 font-semibold">
                  {c.label}
                </th>
              ))}
              <th scope="col" className="px-5 py-3 text-right font-semibold">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {shown.map((r) => (
              <tr key={r.id} className="border-b border-line last:border-b-0 hover:bg-surface-hover">
                {resource.columns.map((c, i) => {
                  const value = r[c.key];
                  let content: ReactNode = String(value || "—");
                  if (c.kind === "status") content = <StatusBadge label={String(value)} tone={toneOf(String(value))} />;
                  if (c.kind === "date") content = formatDay(String(value ?? ""));
                  if (c.kind === "bool")
                    content = value ? <Check size={18} aria-label="Oui" className="text-accent" /> : <span className="text-muted">—</span>;
                  if (i === 0)
                    return (
                      <th key={c.key} scope="row" className="max-w-[360px] px-5 py-4 font-semibold">
                        <button
                          type="button"
                          onClick={() => setEditing(r)}
                          className="cursor-pointer border-0 bg-transparent p-0 text-left font-[inherit] font-semibold text-ink link-hover"
                        >
                          {content}
                        </button>
                      </th>
                    );
                  return (
                    <td key={c.key} className="px-5 py-4 text-text">
                      {content}
                    </td>
                  );
                })}
                <td className="px-5 py-4 text-right">
                  <button
                    type="button"
                    onClick={() => setEditing(r)}
                    aria-label={`Modifier : ${String(r[resource.titleField])}`}
                    className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-line-strong bg-white text-ink hover:border-ink hover:bg-ink hover:text-white"
                  >
                    <Pencil size={16} aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {shown.length === 0 && <p className="px-5 py-10 text-center text-muted">Aucun élément ne correspond à votre recherche.</p>}
      </div>

      <RecordDialog resource={resource} record={editing} onClose={() => setEditing(null)} />
    </>
  );
}
