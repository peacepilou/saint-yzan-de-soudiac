"use client";

import { Button } from "@/components/ui/Button";
import { fieldClass, FormField, RequiredNote, textareaClass } from "@/components/ui/FormField";
import { ErrorSummary, RgpdNotice, SuccessPanel } from "./FormParts";
import { email, required, useSimulatedForm } from "./useSimulatedForm";

const rules = {
  nom: required("Indiquez votre nom."),
  email: email(false),
  objet: required("Précisez l'objet de votre message."),
  message: required("Écrivez votre message."),
};

/** Formulaire de contact, succès simulé. */
export function ContactForm() {
  const { errors, sent, summary, successRef, onSubmit, reset } = useSimulatedForm(rules);

  if (sent) {
    return (
      <SuccessPanel
        title="Votre message a bien été envoyé"
        text="L'accueil de la mairie vous répondra dans les meilleurs délais."
        successRef={successRef}
        onReset={reset}
        resetLabel="Écrire un autre message"
      />
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-describedby="contact-rgpd" className="grid grid-cols-1 gap-5 rounded-[28px] border border-line p-6 md:grid-cols-2 md:p-10">
      <RequiredNote className="col-span-full" />
      <ErrorSummary message={summary} />
      <FormField id="nom" label="Nom et prénom" required error={errors.nom}>
        {(p) => <input {...p} type="text" autoComplete="name" className={fieldClass} />}
      </FormField>
      <FormField id="email" label="E-mail" required error={errors.email}>
        {(p) => <input {...p} type="email" autoComplete="email" className={fieldClass} />}
      </FormField>
      <FormField id="objet" label="Objet" required error={errors.objet} className="col-span-full">
        {(p) => <input {...p} type="text" className={fieldClass} />}
      </FormField>
      <FormField id="message" label="Message" required error={errors.message} className="col-span-full">
        {(p) => <textarea {...p} rows={6} className={textareaClass} />}
      </FormField>
      <div className="col-span-full flex flex-wrap items-end justify-between gap-x-8 gap-y-5 border-t border-line pt-2">
        <RgpdNotice id="contact-rgpd" purpose="répondre à votre message" className="flex-[1_1_360px] pt-4" />
        <Button type="submit" variant="primary" size={54} className="px-7">
          Envoyer le message
        </Button>
      </div>
    </form>
  );
}
