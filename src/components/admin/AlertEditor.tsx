"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { fieldClass, FormField, RequiredNote, textareaClass } from "@/components/ui/FormField";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { RichText } from "@/components/ui/RichText";
import { saveSingleton, useSingleton } from "@/lib/admin/store";
import type { Alert } from "@/lib/admin/types";
import { PageHeader, Panel } from "./PageHeader";
import { useToast } from "./Toast";

/** Édition du bandeau « À savoir » de l'accueil, avec aperçu en direct. */
export function AlertEditor() {
  const saved = useSingleton("alert");
  const toast = useToast();
  const [draft, setDraft] = useState<Alert | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const alert = draft ?? saved;
  const set = (patch: Partial<Alert>) => setDraft({ ...alert, ...patch });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!alert.message.trim()) next.message = "Renseignez le message.";
    if (!alert.shortMessage.trim()) next.shortMessage = "Renseignez le message court.";
    setErrors(next);
    if (Object.keys(next).length) return;
    saveSingleton("alert", alert);
    setDraft(null);
    toast("Bandeau mis à jour sur l'accueil");
  };

  return (
    <>
      <PageHeader title="Bandeau « À savoir »" description="Message d'information affiché en haut de l'accueil, sous les accès rapides." />
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_420px]">
        <Panel>
          <form noValidate onSubmit={onSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <RequiredNote className="col-span-full" />
            <label className="col-span-full flex min-h-11 cursor-pointer items-center gap-3 font-semibold">
              <input type="checkbox" checked={alert.active} onChange={(e) => set({ active: e.target.checked })} className="size-5 accent-accent" />
              Afficher le bandeau sur l&apos;accueil
            </label>
            <FormField id="a-label" label="Étiquette" required>
              {(p) => <input {...p} value={alert.label} onChange={(e) => set({ label: e.target.value })} className={fieldClass} />}
            </FormField>
            <FormField id="a-link-label" label="Texte du lien">
              {(p) => <input {...p} value={alert.linkLabel} onChange={(e) => set({ linkLabel: e.target.value })} className={fieldClass} />}
            </FormField>
            <FormField
              id="a-message"
              label="Message"
              required
              help="Mettez un passage en gras entre **deux astérisques**."
              error={errors.message}
              className="col-span-full"
            >
              {(p) => <textarea {...p} rows={3} value={alert.message} onChange={(e) => set({ message: e.target.value })} className={textareaClass} />}
            </FormField>
            <FormField id="a-short" label="Message court (mobile)" required error={errors.shortMessage} className="col-span-full">
              {(p) => <input {...p} value={alert.shortMessage} onChange={(e) => set({ shortMessage: e.target.value })} className={fieldClass} />}
            </FormField>
            <FormField id="a-href" label="Adresse du lien" help="Page du site, par exemple /actualites/…" className="col-span-full">
              {(p) => <input {...p} value={alert.href} onChange={(e) => set({ href: e.target.value })} className={fieldClass} />}
            </FormField>
            <div className="col-span-full flex flex-wrap justify-end gap-3 border-t border-line pt-5">
              {draft && (
                <Button variant="outline-soft" size={46} onClick={() => setDraft(null)}>
                  Annuler les modifications
                </Button>
              )}
              <Button type="submit" variant="primary" size={46}>
                Enregistrer
              </Button>
            </div>
          </form>
        </Panel>

        <Panel title="Aperçu" className="self-start">
          {alert.active ? (
            <div className="flex flex-col gap-2 rounded-[18px] bg-warning-bg px-5 py-4 text-[15px]">
              <span className="self-start rounded-full bg-warning px-3 py-1 text-[13px] font-semibold text-white">{alert.label}</span>
              <span>
                <RichText text={alert.message} />
              </span>
              {alert.linkLabel && (
                <span className="inline-flex items-center gap-1.5 font-semibold text-warning">
                  {alert.linkLabel}
                  <LinkArrow />
                </span>
              )}
            </div>
          ) : (
            <p className="text-muted">Le bandeau est masqué sur l&apos;accueil.</p>
          )}
          {draft && <p className="text-[14px] text-warning">Modifications non enregistrées.</p>}
        </Panel>
      </div>
    </>
  );
}
