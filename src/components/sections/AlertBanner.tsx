"use client";

import { LinkArrow } from "@/components/ui/LinkArrow";
import { RichText } from "@/components/ui/RichText";
import { SmartLink } from "@/components/ui/SmartLink";
import { useSingleton } from "@/lib/admin/store";

/** Bandeau « À savoir » (accueil), réglé depuis l'administration (/admin/bandeau). */
export function AlertBanner() {
  const alert = useSingleton("alert");
  if (!alert.active) return null;

  return (
    <section aria-label={alert.label} className="mx-auto max-w-[1360px] px-5 pt-5 md:px-10 md:pt-12">
      <SmartLink
        href={alert.href || "/"}
        className="flex flex-col gap-1 rounded-2xl bg-warning-bg px-[18px] py-4 text-[15px] text-ink no-underline hover:brightness-[.97] md:flex-row md:flex-wrap md:items-center md:gap-x-6 md:gap-y-3 md:rounded-[18px] md:px-7 md:py-5 md:text-[17px]"
      >
        <span className="self-start rounded-full bg-warning px-2.5 py-0.5 text-[12px] font-semibold text-white md:self-auto md:px-3 md:py-1 md:text-[13px]">
          {alert.label}
        </span>
        <span className="md:hidden">
          <RichText text={alert.shortMessage} />
        </span>
        <span className="hidden md:inline md:flex-[1_1_420px]">
          <RichText text={alert.message} />
        </span>
        {alert.linkLabel && (
          <span className="inline-flex items-center gap-1.5 font-semibold text-warning">
            {alert.linkLabel}
            <LinkArrow />
          </span>
        )}
      </SmartLink>
    </section>
  );
}
