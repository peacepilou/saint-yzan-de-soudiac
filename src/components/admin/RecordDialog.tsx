"use client";

import { Trash2, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { fieldClass, FormField, RequiredNote, textareaClass } from "@/components/ui/FormField";
import type { Resource } from "@/lib/admin/resources";
import { addRecord, removeRecord, updateRecord } from "@/lib/admin/store";
import type { AdminRecord, Field } from "@/lib/admin/types";
import { cn } from "@/lib/utils";
import { formatDay } from "./StatusBadge";
import { useToast } from "./Toast";

function Control({ field, value, error }: { field: Field; value: string | boolean | undefined; error?: string }) {
  if (field.type === "checkbox") {
    return (
      <label className="flex min-h-11 cursor-pointer items-center gap-3 font-semibold">
        <input type="checkbox" name={field.name} defaultChecked={value === true} className="size-5 accent-accent" />
        {field.label}
      </label>
    );
  }
  return (
    <FormField id={`f-${field.name}`} label={field.label} required={field.required} help={field.help} error={error}>
      {(p) => {
        const common = { ...p, name: field.name };
        if (field.type === "textarea") return <textarea {...common} rows={4} defaultValue={String(value ?? "")} className={textareaClass} />;
        if (field.type === "select")
          return (
            <select {...common} defaultValue={String(value ?? field.options?.[0] ?? "")} className={fieldClass}>
              {field.options?.map((o) => (
                <option key={o} value={o}>
                  {o || "—"}
                </option>
              ))}
            </select>
          );
        if (field.type === "file")
          return <input {...common} type="file" accept={field.name === "file" ? "application/pdf" : "image/*"} className="font-[inherit] text-[15px]" />;
        return <input {...common} type={field.type} defaultValue={String(value ?? "")} className={fieldClass} />;
      }}
    </FormField>
  );
}

/**
 * Panneau latéral d'ajout / modification d'un enregistrement (dialogue modal natif :
 * focus piégé, fermeture par Échap). Les champs sont décrits dans `resources.ts`.
 */
export function RecordDialog({ resource, record, onClose }: { resource: Resource; record: AdminRecord | "new" | null; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const toast = useToast();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmDelete, setConfirmDelete] = useState(false);
  const isNew = record === "new";
  const current = record && record !== "new" ? record : undefined;

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (record && !d.open) d.showModal();
    if (!record && d.open) d.close();
  }, [record]);

  const close = () => {
    setErrors({});
    setConfirmDelete(false);
    onClose();
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const values: Record<string, string | boolean> = {};
    const next: Record<string, string> = {};
    for (const f of resource.fields) {
      if (f.type === "file") continue;
      if (f.type === "checkbox") {
        values[f.name] = data.get(f.name) === "on";
        continue;
      }
      const v = String(data.get(f.name) ?? "").trim();
      if (f.required && !v) next[f.name] = `Renseignez le champ « ${f.label} ».`;
      values[f.name] = v;
    }
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    if (current) updateRecord(resource.collection, current.id, values);
    else addRecord(resource.collection, values);
    toast(current ? "Modifications enregistrées" : `${resource.feminine ? "Nouvelle" : /^[aeéiou]/.test(resource.singular) ? "Nouvel" : "Nouveau"} ${resource.singular} ajouté${resource.feminine ? "e" : ""}`);
    close();
  };

  const title = isNew ? `Ajouter ${resource.feminine ? "une" : "un"} ${resource.singular}` : String(current?.[resource.titleField] ?? "");

  return (
    <dialog
      ref={dialog}
      onClose={close}
      aria-labelledby="record-title"
      className="m-0 ml-auto h-dvh max-h-none w-full max-w-[640px] bg-white p-0 text-ink backdrop:bg-ink/50"
    >
      {record && (
        <form
          key={current?.id ?? "new"}
          noValidate
          onSubmit={onSubmit}
          onChange={(e) => {
            const target: EventTarget = e.target;
            const name = target instanceof HTMLElement ? (target.getAttribute("name") ?? "") : "";
            if (!errors[name]) return;
            const rest = { ...errors };
            delete rest[name];
            setErrors(rest);
          }}
          className="flex h-full flex-col"
        >
          <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5">
            <div className="flex flex-col gap-1">
              <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-accent">{resource.label}</p>
              <h2 id="record-title" className="font-display text-[24px] leading-tight font-bold tracking-[-0.02em]">
                {title}
              </h2>
              {current && <p className="text-[14px] text-muted">Créé le {formatDay(current.createdAt)}</p>}
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Fermer"
              className="flex size-11 flex-none cursor-pointer items-center justify-center rounded-full border-0 bg-surface text-ink hover:bg-[#E3E6E1]"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <div className="grid flex-1 grid-cols-1 content-start gap-5 overflow-y-auto px-6 py-6 sm:grid-cols-2">
            <RequiredNote className="col-span-full" />
            {resource.fields.map((f) => (
              <div key={f.name} className={cn(f.full || f.type === "textarea" ? "col-span-full" : undefined)}>
                <Control field={f} value={current?.[f.name]} error={errors[f.name]} />
              </div>
            ))}
            {resource.fields.some((f) => f.type === "file") && (
              <p className="col-span-full rounded-[14px] bg-surface px-4 py-3 text-[14px] text-muted">
                Démo : les fichiers ne sont pas envoyés.
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-6 py-4">
            {current &&
              (confirmDelete ? (
                <span className="flex flex-wrap items-center gap-2" role="alert">
                  <span className="text-[15px] font-semibold text-health">Supprimer définitivement ?</span>
                  <Button
                    size={44}
                    className="bg-health text-white hover:bg-[#7E2F49]"
                    onClick={() => {
                      removeRecord(resource.collection, current.id);
                      toast("Suppression effectuée");
                      close();
                    }}
                  >
                    Supprimer
                  </Button>
                  <Button size={44} variant="outline-soft" onClick={() => setConfirmDelete(false)}>
                    Annuler
                  </Button>
                </span>
              ) : (
                <Button size={44} variant="outline-soft" onClick={() => setConfirmDelete(true)}>
                  <Trash2 size={16} aria-hidden="true" />
                  Supprimer
                </Button>
              ))}
            <span className="ml-auto flex gap-2">
              <Button size={46} variant="outline-soft" onClick={close}>
                Annuler
              </Button>
              <Button type="submit" size={46} variant="primary">
                Enregistrer
              </Button>
            </span>
          </div>
        </form>
      )}
    </dialog>
  );
}
