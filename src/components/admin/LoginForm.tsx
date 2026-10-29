"use client";

import { ArrowLeft, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { Emblem } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { fieldClass, FormField } from "@/components/ui/FormField";
import { signIn, useSession } from "@/lib/admin/store";

const DEMO_EMAIL = "demo@mairie.exemple";

/** Connexion factice : identifiants de démonstration préremplis, aucune vérification réelle. */
export function LoginForm() {
  const router = useRouter();
  const session = useSession();
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (session) router.replace("/admin");
  }, [session, router]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const next: Record<string, string> = {};
    if (!email) next.email = "Indiquez votre identifiant.";
    if (!String(data.get("password") ?? "")) next.password = "Indiquez votre mot de passe.";
    setErrors(next);
    if (Object.keys(next).length) return;
    signIn(email);
  };

  return (
    <div className="grid min-h-dvh grid-cols-1 bg-white lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-accent p-12 text-white lg:flex">
        <Link href="/" className="inline-flex items-center gap-2 self-start font-semibold text-white link-hover">
          <ArrowLeft size={18} aria-hidden="true" />
          Retour au site
        </Link>
        <div className="flex flex-col gap-6">
          <Emblem variant="white" size={96} />
          <p className="font-display text-[48px] leading-[1.02] font-bold tracking-[-0.035em]">
            Espace
            <br />
            d&apos;administration
          </p>
          <p className="max-w-[440px] text-[18px] text-on-accent">
            Publiez les actualités, tenez l&apos;agenda à jour et traitez les demandes des habitants.
          </p>
        </div>
        <p className="text-[14px] text-on-accent-muted">Mairie de Saint-Yzan-de-Soudiac</p>
      </div>

      <main id="contenu" tabIndex={-1} className="flex items-center justify-center px-5 py-12 outline-none">
        <div className="flex w-full max-w-[420px] flex-col gap-8">
          <Link href="/" className="inline-flex items-center gap-2 self-start font-semibold link-hover lg:hidden">
            <ArrowLeft size={18} aria-hidden="true" />
            Retour au site
          </Link>
          <div className="flex flex-col gap-2">
            <span className="flex size-12 items-center justify-center rounded-[14px] bg-accent-soft text-accent">
              <LockKeyhole size={22} aria-hidden="true" />
            </span>
            <h1 className="mt-3 font-display text-[34px] leading-tight font-bold tracking-[-0.03em]">Connexion</h1>
            <p className="text-muted">Réservé aux agents et aux élus de la mairie.</p>
          </div>
          <form noValidate onSubmit={onSubmit} className="flex flex-col gap-5">
            <FormField id="email" label="Identifiant (e-mail)" required error={errors.email}>
              {(p) => <input {...p} type="email" autoComplete="username" defaultValue={DEMO_EMAIL} className={fieldClass} />}
            </FormField>
            <FormField id="password" label="Mot de passe" required error={errors.password}>
              {(p) => <input {...p} type="password" autoComplete="current-password" defaultValue="demo" className={fieldClass} />}
            </FormField>
            <Button type="submit" variant="primary" size={52} className="w-full">
              Se connecter
            </Button>
          </form>
          <p className="rounded-[14px] bg-surface px-4 py-3 text-[14px] text-text">
            <strong>Démonstration :</strong> les identifiants sont préremplis et aucune donnée n&apos;est envoyée. Les modifications restent dans ce
            navigateur.
          </p>
        </div>
      </main>
    </div>
  );
}
