import Link from "next/link";
import type { RefObject } from "react";
import { Button } from "@/components/ui/Button";
import { rgpdDefaults } from "@/data/site";
import { cn } from "@/lib/utils";

/** Mention d'information RGPD placée sous chaque formulaire. */
export function RgpdNotice({ id, purpose, className }: { id: string; purpose: string; className?: string }) {
  return (
    <p id={id} className={cn("m-0 text-[14px] leading-[1.55] text-text", className)}>
      Les informations recueillies sont traitées par la mairie de Saint-Yzan-de-Soudiac pour {purpose}, dans le cadre de sa
      mission d&apos;intérêt public. Elles sont conservées {rgpdDefaults.duration} puis supprimées, et ne sont transmises
      qu&apos;aux services concernés. Vous pouvez exercer vos droits d&apos;accès, de rectification et d&apos;effacement auprès
      du délégué à la protection des données : {rgpdDefaults.dpo}.{" "}
      <Link href="/donnees-personnelles" className="font-semibold link-hover">
        Vos données personnelles
      </Link>
    </p>
  );
}

/** Résumé des erreurs annoncé aux lecteurs d'écran. */
export function ErrorSummary({ message }: { message: string }) {
  return (
    <p aria-live="assertive" className={cn("col-span-full m-0 font-semibold text-[#B42318]", !message && "sr-only")}>
      {message}
    </p>
  );
}

/** Écran de succès simulé, qui reçoit le focus après l'envoi. */
export function SuccessPanel({
  title,
  text,
  successRef,
  onReset,
  resetLabel,
}: {
  title: string;
  text: string;
  successRef: RefObject<HTMLHeadingElement | null>;
  onReset: () => void;
  resetLabel: string;
}) {
  return (
    <div role="status" className="flex flex-col items-start gap-4 rounded-[28px] bg-accent-soft p-6 md:p-10">
      <h3 ref={successRef} tabIndex={-1} className="font-display text-[26px] font-bold tracking-[-0.02em] text-accent outline-none md:text-[32px]">
        {title}
      </h3>
      <p className="text-text">{text}</p>
      <p className="text-[14px] text-muted">Prototype : aucune donnée n&apos;a été transmise.</p>
      <Button variant="outline" size={48} onClick={onReset}>
        {resetLabel}
      </Button>
    </div>
  );
}
