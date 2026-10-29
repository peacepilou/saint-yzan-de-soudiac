"use client";

import { Button } from "@/components/ui/Button";
import { fieldClass, FormField, RequiredNote, textareaClass } from "@/components/ui/FormField";
import { addRecord } from "@/lib/admin/store";
import { ErrorSummary, RgpdNotice, SuccessPanel } from "./FormParts";
import { email, required, useSimulatedForm } from "./useSimulatedForm";

const rules = {
  type: required("Choisissez le type de problème."),
  lieu: required("Indiquez l'adresse ou le lieu du problème."),
  desc: required("Décrivez le problème en quelques mots."),
  mail: email(true),
};

/** Formulaire de signalement (maquette Démarches), succès simulé. */
export function ReportForm() {
  const { errors, sent, summary, successRef, onSubmit, reset } = useSimulatedForm(rules, (data) =>
    addRecord("reports", {
      type: String(data.get("type")),
      place: String(data.get("lieu")),
      description: String(data.get("desc")),
      email: String(data.get("mail") ?? ""),
      status: "Nouveau",
      assignee: "",
      notes: "",
    }),
  );

  if (sent) {
    return (
      <div className="flex-[999_1_600px]">
        <SuccessPanel
          title="Merci, votre signalement a bien été envoyé"
          text="Les services techniques sont prévenus. Si vous avez indiqué votre e-mail, vous serez informé du suivi."
          successRef={successRef}
          onReset={reset}
          resetLabel="Faire un autre signalement"
          adminHref="/admin/signalements"
        />
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-describedby="sig-rgpd"
      className="grid flex-[999_1_600px] grid-cols-1 gap-5 rounded-[28px] border border-line p-6 md:grid-cols-2 md:p-10"
    >
      <RequiredNote className="col-span-full" />
      <ErrorSummary message={summary} />
      <FormField id="type" label="Type de problème" required error={errors.type}>
        {(p) => (
          <select {...p} className={fieldClass}>
            <option>Voirie</option>
            <option>Éclairage public</option>
            <option>Dépôt sauvage</option>
            <option>Espaces verts</option>
            <option>Autre</option>
          </select>
        )}
      </FormField>
      <FormField id="lieu" label="Adresse ou lieu" required error={errors.lieu}>
        {(p) => <input {...p} type="text" autoComplete="street-address" placeholder="Ex. : rue Émile Gauthier" className={fieldClass} />}
      </FormField>
      <FormField id="desc" label="Description" required error={errors.desc} className="col-span-full">
        {(p) => <textarea {...p} rows={4} className={textareaClass} />}
      </FormField>
      <FormField
        id="photo"
        label="Photo (facultatif)"
        help="Évitez qu'on y reconnaisse des personnes ou des plaques d'immatriculation."
      >
        {(p) => <input {...p} type="file" accept="image/*" className="font-[inherit] text-[15px]" />}
      </FormField>
      <FormField id="mail" label="Votre e-mail (facultatif)" help="Uniquement pour vous informer du suivi de votre signalement." error={errors.mail}>
        {(p) => <input {...p} type="email" autoComplete="email" className={fieldClass} />}
      </FormField>
      <div className="col-span-full flex flex-wrap items-end justify-between gap-x-8 gap-y-5 border-t border-line pt-2">
        <RgpdNotice id="sig-rgpd" purpose="traiter votre signalement" className="flex-[1_1_360px] pt-4" />
        <Button type="submit" variant="primary" size={54} className="px-7">
          Envoyer le signalement
        </Button>
      </div>
    </form>
  );
}
