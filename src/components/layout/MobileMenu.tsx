"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/icons";
import { megaMenus } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { Emblem } from "./Logo";

/** Menu plein écran des écrans < 1200 px : focus piégé, fermeture par ✕ ou Échap. */
export function MobileMenu({ variant }: { variant: "overlay" | "solid" }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const trigger = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => () => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const root = dialog.current!;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    root.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = root.querySelectorAll<HTMLElement>("a[href], button, input");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        aria-label="Ouvrir le menu"
        aria-expanded={open}
        aria-controls="menu-mobile"
        onClick={() => setOpen(true)}
        className={cn(
          "flex size-[46px] cursor-pointer items-center justify-center rounded-full border-0 nav:hidden",
          variant === "overlay" ? "bg-white text-ink hover:bg-white-hover" : "bg-ink text-white hover:bg-ink-hover",
        )}
      >
        <Icon name="menu" size={20} strokeWidth={2} />
      </button>

      <div
        id="menu-mobile"
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-label="Menu principal"
        className={cn("fixed inset-0 z-50 overflow-y-auto bg-white text-ink nav:hidden", open ? "block" : "hidden")}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <Link href="/" onNavigate={close} className="flex items-center gap-2.5 text-ink no-underline">
            <Emblem variant="color" size={44} />
            <span className="font-display text-[16px] font-bold">Saint-Yzan-de-Soudiac</span>
          </Link>
          <button
            type="button"
            aria-label="Fermer le menu"
            data-autofocus
            onClick={() => {
              close();
              trigger.current?.focus();
            }}
            className="flex size-[46px] cursor-pointer items-center justify-center rounded-full border-0 bg-surface text-ink hover:bg-[#E3E6E1]"
          >
            <Icon name="close" size={18} strokeWidth={2} />
          </button>
        </div>

        <form
          role="search"
          aria-label="Recherche rapide"
          className="mx-5 mt-2 flex items-center gap-1.5 rounded-full border border-line-strong py-1 pr-1 pl-[18px] focus-within:shadow-[0_0_0_3px_var(--color-focus)]"
          onSubmit={(e) => {
            e.preventDefault();
            const q = String(new FormData(e.currentTarget).get("q") ?? "").trim();
            close();
            router.push(q ? `/recherche?q=${encodeURIComponent(q)}` : "/recherche");
          }}
        >
          <label htmlFor="q-menu" className="sr-only">
            Rechercher sur le site
          </label>
          <input
            id="q-menu"
            name="q"
            type="search"
            placeholder="Que cherchez-vous ?"
            className="h-[46px] min-w-0 flex-auto border-0 bg-transparent font-[inherit] outline-none focus-visible:outline-none"
          />
          <button
            type="submit"
            aria-label="Lancer la recherche"
            className="flex size-[46px] cursor-pointer items-center justify-center rounded-full border-0 bg-accent text-white hover:bg-accent-hover"
          >
            <Icon name="search" size={18} strokeWidth={2} />
          </button>
        </form>

        <nav aria-label="Menu principal" className="flex flex-col gap-8 px-5 pt-8 pb-12">
          {megaMenus.map((m) => (
            <div key={m.id}>
              <Link
                href={m.href}
                onNavigate={close}
                className="font-display text-[28px] font-bold tracking-[-0.02em] text-ink no-underline hover:text-accent"
              >
                {m.label}
              </Link>
              <ul className="mt-2 flex flex-col">
                {m.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} onNavigate={close} className="flex min-h-11 items-center text-[17px] text-text no-underline hover:text-accent">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="flex flex-col gap-3 border-t border-line pt-6">
            <Link href="/agenda" onNavigate={close} className="font-display text-[28px] font-bold tracking-[-0.02em] text-ink no-underline hover:text-accent">
              Agenda
            </Link>
            <Link
              href="/contact"
              onNavigate={close}
              className="flex h-[52px] items-center justify-center rounded-full bg-ink font-semibold text-white no-underline hover:bg-ink-hover"
            >
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
