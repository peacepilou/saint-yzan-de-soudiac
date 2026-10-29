"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { Icon } from "@/components/ui/icons";
import { site } from "@/data/site";

const round =
  "flex size-11 items-center justify-center rounded-full border border-line-strong text-ink no-underline hover:border-ink hover:bg-ink hover:text-white";

/** Partage par liens simples (aucun script tiers) et copie du lien. */
export function ShareButtons({ title, path }: { title: string; path: string }) {
  const [copied, setCopied] = useState(false);
  const url = `${site.url}${path}`;

  return (
    <div className="mt-3 flex flex-wrap gap-2.5 border-t border-line pt-7">
      <span className="mr-2 self-center text-[15px] text-muted">Partager</span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        aria-label="Partager sur Facebook (nouvelle fenêtre)"
        target="_blank"
        rel="noopener noreferrer"
        className={round}
      >
        <Icon name="facebook" size={18} strokeWidth={1.8} />
      </a>
      <a href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`} aria-label="Partager par e-mail" className={round}>
        <Icon name="mail" size={18} strokeWidth={1.8} />
      </a>
      <button
        type="button"
        aria-label="Copier le lien"
        onClick={async () => {
          await navigator.clipboard?.writeText(window.location.href);
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        }}
        className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-line-strong bg-white text-ink hover:bg-white-hover"
      >
        {copied ? <Check size={18} strokeWidth={1.8} aria-hidden="true" /> : <Icon name="link" size={18} strokeWidth={1.8} />}
      </button>
      <span role="status" className="sr-only">
        {copied ? "Lien copié dans le presse-papiers" : ""}
      </span>
    </div>
  );
}
