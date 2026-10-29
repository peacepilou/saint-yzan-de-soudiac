"use client";

import { useLayoutEffect, useRef, useState, type FormEvent } from "react";

type Rules = Record<string, (value: string) => string | null>;

export const required = (message: string) => (value: string) => (value.trim() ? null : message);
export const email = (optional: boolean) => (value: string) => {
  if (!value.trim()) return optional ? null : "Indiquez votre adresse e-mail.";
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? null : "L'adresse e-mail doit être au format nom@exemple.fr.";
};

/**
 * Validation côté client et succès simulé (aucune donnée n'est envoyée).
 * Le focus va au premier champ en erreur, puis au message de succès.
 */
export function useSimulatedForm(rules: Rules) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const successRef = useRef<HTMLHeadingElement>(null);

  // Repart d'un formulaire vierge si la page est masquée puis réaffichée (Activity).
  useLayoutEffect(
    () => () => {
      setSent(false);
      setErrors({});
    },
    [],
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const next: Record<string, string> = {};
    for (const [name, rule] of Object.entries(rules)) {
      const message = rule(String(data.get(name) ?? ""));
      if (message) next[name] = message;
    }
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    setSent(true);
    requestAnimationFrame(() => successRef.current?.focus());
  };

  const errorCount = Object.keys(errors).length;
  const summary = errorCount
    ? `Le formulaire contient ${errorCount} erreur${errorCount > 1 ? "s" : ""}. Corrigez ${errorCount > 1 ? "les champs signalés" : "le champ signalé"}.`
    : "";

  return { errors, sent, summary, successRef, onSubmit, reset: () => setSent(false) };
}
