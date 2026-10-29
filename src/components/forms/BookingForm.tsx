"use client";

import { Button } from "@/components/ui/Button";
import { fieldClass, FormField, RequiredNote, textareaClass } from "@/components/ui/FormField";
import { rooms } from "@/data/rooms";
import { addRecord } from "@/lib/admin/store";
import { ErrorSummary, RgpdNotice, SuccessPanel } from "./FormParts";
import { email, required, useSimulatedForm } from "./useSimulatedForm";

const rules = {
  salle: required("Choisissez une salle."),
  date: required("Indiquez la date souhaitée."),
  debut: required("Indiquez l'heure de début."),
  fin: required("Indiquez l'heure de fin."),
  objet: required("Précisez l'objet de la réservation."),
  nom: required("Indiquez votre nom."),
  email: email(false),
  tel: required("Indiquez un numéro de téléphone."),
};

/** Demande de réservation de salle, succès simulé. */
export function BookingForm() {
  const { errors, sent, summary, successRef, onSubmit, reset } = useSimulatedForm(rules, (data) =>
    addRecord("bookings", {
      room: String(data.get("salle")),
      date: String(data.get("date")),
      start: String(data.get("debut")),
      end: String(data.get("fin")),
      purpose: String(data.get("objet")),
      name: String(data.get("nom")),
      email: String(data.get("email")),
      phone: String(data.get("tel")),
      status: "En attente",
    }),
  );

  if (sent) {
    return (
      <SuccessPanel
        title="Votre demande de réservation a bien été envoyée"
        text="La mairie vous répondra pour confirmer la disponibilité de la salle."
        successRef={successRef}
        onReset={reset}
        resetLabel="Faire une autre demande"
        adminHref="/admin/reservations"
      />
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-describedby="res-rgpd" className="grid grid-cols-1 gap-5 rounded-[28px] border border-line p-6 md:grid-cols-2 md:p-10">
      <RequiredNote className="col-span-full" />
      <ErrorSummary message={summary} />
      <FormField id="salle" label="Salle" required error={errors.salle} className="col-span-full">
        {(p) => (
          <select {...p} defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Choisir une salle…
            </option>
            {rooms.map((r) => (
              <option key={r.name}>{r.name}</option>
            ))}
          </select>
        )}
      </FormField>
      <FormField id="date" label="Date souhaitée" required error={errors.date} className="col-span-full">
        {(p) => <input {...p} type="date" className={fieldClass} />}
      </FormField>
      <FormField id="debut" label="Heure de début" required error={errors.debut}>
        {(p) => <input {...p} type="time" className={fieldClass} />}
      </FormField>
      <FormField id="fin" label="Heure de fin" required error={errors.fin}>
        {(p) => <input {...p} type="time" className={fieldClass} />}
      </FormField>
      <FormField id="objet" label="Objet de la réservation" required error={errors.objet} className="col-span-full">
        {(p) => <textarea {...p} rows={3} className={textareaClass} />}
      </FormField>
      <FormField id="nom" label="Nom et prénom" required error={errors.nom}>
        {(p) => <input {...p} type="text" autoComplete="name" className={fieldClass} />}
      </FormField>
      <FormField id="email" label="E-mail" required error={errors.email}>
        {(p) => <input {...p} type="email" autoComplete="email" className={fieldClass} />}
      </FormField>
      <FormField id="tel" label="Téléphone" required error={errors.tel}>
        {(p) => <input {...p} type="tel" autoComplete="tel" className={fieldClass} />}
      </FormField>
      <div className="col-span-full flex flex-wrap items-end justify-between gap-x-8 gap-y-5 border-t border-line pt-2">
        <RgpdNotice id="res-rgpd" purpose="traiter votre demande de réservation" className="flex-[1_1_360px] pt-4" />
        <Button type="submit" variant="primary" size={54} className="px-7">
          Envoyer la demande
        </Button>
      </div>
    </form>
  );
}
