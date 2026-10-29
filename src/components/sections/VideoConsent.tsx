"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

/** Vidéo chargée au clic seulement, après information sur les cookies de YouTube (aucun iframe dans le prototype). */
export function VideoConsent() {
  const [step, setStep] = useState<"idle" | "consent" | "loaded">("idle");

  return (
    <>
      <p className="text-text">
        Retour en vidéo sur l&apos;opération de réhabilitation. La vidéo est hébergée par YouTube : elle n&apos;est chargée qu&apos;à votre clic,
        ce qui permet à YouTube de déposer des cookies.{" "}
        <Link href="/cookies" className="font-semibold link-hover">
          En savoir plus
        </Link>
      </p>
      <div aria-live="polite" className="flex flex-col items-start gap-3.5">
        {step === "idle" && (
          <Button size={48} onClick={() => setStep("consent")}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M7 4v16l13-8z" />
            </svg>
            Voir la vidéo
          </Button>
        )}
        {step === "consent" && (
          <>
            <p className="rounded-[14px] bg-white px-5 py-4 text-[15px]">
              Contenu YouTube : en cliquant, vous acceptez les cookies de YouTube.
            </p>
            <Button size={48} onClick={() => setStep("loaded")}>
              Charger la vidéo
            </Button>
          </>
        )}
        {step === "loaded" && (
          <div className="flex aspect-video w-full items-center justify-center rounded-[18px] bg-ink px-5 text-center text-[15px] text-on-dark">
            [Lecteur vidéo YouTube : non chargé dans le prototype]
          </div>
        )}
      </div>
    </>
  );
}
