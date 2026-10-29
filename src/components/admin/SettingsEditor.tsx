"use client";

import { RotateCcw } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { fieldClass, FormField } from "@/components/ui/FormField";
import { resetDemo, saveSingleton, useSingleton } from "@/lib/admin/store";
import type { Settings } from "@/lib/admin/types";
import { PageHeader, Panel } from "./PageHeader";
import { useToast } from "./Toast";

const fields: { name: keyof Settings; label: string; type?: string; autoComplete?: string }[] = [
  { name: "address", label: "Adresse", autoComplete: "street-address" },
  { name: "phone", label: "Téléphone", type: "tel" },
  { name: "email", label: "E-mail", type: "email" },
  { name: "hoursMonTueThu", label: "Horaires lundi, mardi, jeudi" },
  { name: "hoursWed", label: "Horaires mercredi" },
  { name: "hoursFri", label: "Horaires vendredi" },
];

/** Coordonnées et horaires de la mairie, et réinitialisation des données de démonstration. */
export function SettingsEditor() {
  const saved = useSingleton("settings");
  const toast = useToast();
  const [confirmReset, setConfirmReset] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    saveSingleton("settings", Object.fromEntries(fields.map((f) => [f.name, String(data.get(f.name) ?? "").trim()])) as Settings);
    toast("Réglages enregistrés");
  };

  return (
    <>
      <PageHeader title="Mairie & démo" description="Coordonnées, horaires d'accueil et données de la démonstration." />
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_420px]">
        <Panel title="Coordonnées et horaires">
          <form key={JSON.stringify(saved)} onSubmit={onSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {fields.map((f) => (
              <FormField key={f.name} id={`s-${f.name}`} label={f.label} className={f.name === "address" ? "col-span-full" : undefined}>
                {(p) => <input {...p} name={f.name} type={f.type ?? "text"} autoComplete={f.autoComplete} defaultValue={saved[f.name]} className={fieldClass} />}
              </FormField>
            ))}
            <p className="col-span-full text-[14px] text-muted">
              Dans le prototype, ces réglages ne sont pas encore répercutés sur les pages publiques.
            </p>
            <div className="col-span-full flex justify-end border-t border-line pt-5">
              <Button type="submit" variant="primary" size={46}>
                Enregistrer
              </Button>
            </div>
          </form>
        </Panel>

        <Panel title="Données de démonstration" className="self-start">
          <p className="text-text">
            Les modifications sont enregistrées dans ce navigateur. Réinitialisez la démo pour retrouver les contenus d&apos;origine avant une
            présentation.
          </p>
          {confirmReset ? (
            <div className="flex flex-wrap items-center gap-2" role="alert">
              <span className="font-semibold text-health">Effacer toutes les modifications ?</span>
              <Button
                size={44}
                className="bg-health text-white hover:bg-[#7E2F49]"
                onClick={() => {
                  resetDemo();
                  setConfirmReset(false);
                  toast("Démo réinitialisée");
                }}
              >
                Réinitialiser
              </Button>
              <Button size={44} variant="outline-soft" onClick={() => setConfirmReset(false)}>
                Annuler
              </Button>
            </div>
          ) : (
            <Button variant="outline-soft" size={46} className="self-start" onClick={() => setConfirmReset(true)}>
              <RotateCcw size={16} aria-hidden="true" />
              Réinitialiser la démo
            </Button>
          )}
        </Panel>
      </div>
    </>
  );
}
