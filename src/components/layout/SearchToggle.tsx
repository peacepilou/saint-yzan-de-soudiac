"use client";

import { useRouter } from "next/navigation";
import { useLayoutEffect, useRef, useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/**
 * Recherche dépliante de l'en-tête (maquette SearchToggle) : bouton rond de 46 px
 * dont le champ s'étire vers la gauche jusqu'à 440 px, sans déplacer la barre.
 */
export function SearchToggle({ variant, onToggle }: { variant: "dark" | "light"; onToggle?: (open: boolean) => void }) {
  const router = useRouter();
  const [open, setOpenState] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const keepOpen = useRef(false);
  const dark = variant === "dark";

  const setOpen = (value: boolean) => {
    setOpenState(value);
    onToggle?.(value);
  };

  // Referme la recherche quand la page est masquée par la navigation (Activity).
  useLayoutEffect(() => () => setOpenState(false), []);

  const close = (refocus: boolean) => {
    if (input.current) input.current.value = "";
    keepOpen.current = false;
    setOpen(false);
    if (refocus) trigger.current?.focus();
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!open) return;
    const q = input.current?.value.trim() ?? "";
    close(false);
    router.push(q ? `/recherche?q=${encodeURIComponent(q)}` : "/recherche");
  };

  return (
    <div className="relative size-[46px] flex-none text-[16px] text-ink">
      <form
        role="search"
        aria-label="Recherche rapide"
        onSubmit={onSubmit}
        className={cn(
          "absolute top-0 right-0 z-20 box-border flex h-[46px] items-center overflow-hidden rounded-full border focus-within:shadow-[0_0_0_3px_var(--color-focus)]",
          open ? "w-[440px] border-white bg-white shadow-search" : cn("w-[46px] bg-transparent", dark ? "border-white" : "border-line-strong"),
        )}
        style={{ transition: "width .45s var(--ease-out-soft), background-color .2s ease, box-shadow .3s ease" }}
      >
        <button
          ref={trigger}
          type={open ? "submit" : "button"}
          aria-label={open ? "Lancer la recherche" : "Ouvrir la recherche"}
          aria-expanded={open}
          aria-controls="site-search"
          onClick={(e) => {
            if (open) return;
            e.preventDefault();
            setOpen(true);
            setTimeout(() => input.current?.focus(), 60);
          }}
          className={cn(
            "flex size-11 flex-none cursor-pointer items-center justify-center rounded-full border-0 bg-transparent hover:bg-[rgb(127_127_127/0.2)]",
            open || !dark ? "text-ink" : "text-white",
          )}
        >
          <Icon name="search" size={18} strokeWidth={2} />
        </button>
        <label htmlFor="site-search" className="sr-only">
          Rechercher sur le site
        </label>
        <input
          ref={input}
          id="site-search"
          name="q"
          type="search"
          placeholder="Cantine, salle, PLU…"
          tabIndex={open ? 0 : -1}
          onKeyDown={(e) => {
            if (e.key === "Escape") close(true);
          }}
          onBlur={(e) => {
            const value = e.target.value;
            setTimeout(() => {
              if (!value && !keepOpen.current) setOpen(false);
              keepOpen.current = false;
            }, 120);
          }}
          className="h-11 min-w-0 flex-auto border-0 bg-transparent px-1 font-[inherit] text-ink outline-none focus-visible:outline-none"
          style={{ opacity: open ? 1 : 0, transition: `opacity .25s ease ${open ? ".15s" : "0s"}` }}
        />
        <button
          type="button"
          aria-label="Fermer la recherche"
          tabIndex={open ? 0 : -1}
          onMouseDown={() => {
            keepOpen.current = true;
          }}
          onClick={() => close(true)}
          className="mr-1 flex size-9 flex-none cursor-pointer items-center justify-center rounded-full border-0 bg-surface text-ink hover:bg-[#E3E6E1]"
          style={{ opacity: open ? 1 : 0 }}
        >
          <Icon name="close" size={16} strokeWidth={2} />
        </button>
      </form>
    </div>
  );
}
