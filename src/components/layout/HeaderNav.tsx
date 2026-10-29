"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/icons";
import { megaMenus } from "@/data/navigation";
import { photos } from "@/data/photos";
import type { MegaMenuEntry, NavKey } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SearchToggle } from "./SearchToggle";
import { LinkArrow } from "@/components/ui/LinkArrow";

type Props = {
  variant: "overlay" | "solid";
  current?: NavKey;
};

/** Barre de navigation bureau, identique sur toutes les pages : méga-menu, Agenda, recherche dépliante, Contact. */
export function HeaderNav({ variant, current }: Props) {
  const overlay = variant === "overlay";
  const [searchOpen, setSearchOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MegaMenuEntry["id"] | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const menu = megaMenus.find((m) => m.id === openMenu);

  // Referme menus et recherche quand la page est masquée par la navigation (Activity).
  useLayoutEffect(
    () => () => {
      setOpenMenu(null);
      setSearchOpen(false);
    },
    [],
  );

  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      document.querySelector<HTMLButtonElement>(`[data-mega="${openMenu}"]`)?.focus();
      setOpenMenu(null);
    };
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!navRef.current?.contains(target) && !panelRef.current?.contains(target)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [openMenu]);

  const item = "flex h-[46px] items-center gap-1.5 rounded-full px-4 font-medium no-underline";
  const idle = overlay ? "text-white hover:bg-white/16" : "text-ink hover:bg-surface";
  const active = overlay ? "bg-white text-ink" : "bg-ink text-white";

  return (
    <>
      <nav ref={navRef} aria-label="Navigation principale" className="hidden items-center text-[16px] nav:flex">
        <span
          className={cn("flex items-center gap-1", searchOpen ? "invisible -translate-x-3 opacity-0" : "visible opacity-100")}
          style={{ transition: `opacity .25s ease, transform .3s ease, visibility 0s linear ${searchOpen ? ".25s" : "0s"}` }}
        >
          {megaMenus.map((m) => {
            const expanded = openMenu === m.id;
            const isCurrent = current === m.id;
            return (
              <button
                key={m.id}
                type="button"
                data-mega={m.id}
                aria-expanded={expanded}
                aria-controls="mega-menu"
                onClick={() => setOpenMenu(expanded ? null : m.id)}
                className={cn(item, "cursor-pointer border-0 font-[inherit]", expanded || isCurrent ? active : cn("bg-transparent", idle))}
              >
                {m.label}
                {isCurrent && <span className="sr-only"> (rubrique en cours)</span>}
                <Icon
                  name="chevron"
                  size={14}
                  strokeWidth={2.2}
                  className={cn("transition-transform duration-200", expanded && "rotate-180")}
                />
              </button>
            );
          })}
          <Link href="/agenda" aria-current={current === "agenda" ? "page" : undefined} className={cn(item, current === "agenda" ? active : idle)}>
            Agenda
          </Link>
        </span>
        <span className="ml-3 flex gap-2">
          <SearchToggle
            variant={overlay ? "dark" : "light"}
            onToggle={(v) => {
              setSearchOpen(v);
              setOpenMenu(null);
            }}
          />
          <Link
            href="/contact"
            aria-current={current === "contact" ? "page" : undefined}
            className={cn(
              "flex h-[46px] items-center rounded-full px-[22px] font-semibold no-underline aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-4",
              overlay ? "bg-white text-ink hover:bg-white-hover" : "bg-ink text-white hover:bg-ink-hover",
            )}
          >
            Contact
          </Link>
        </span>
      </nav>

      <div id="mega-menu" ref={panelRef} className="absolute inset-x-0 top-full z-40 hidden px-6 nav:block">
        {menu && (
          <div className="mx-auto flex max-w-[1312px] flex-wrap gap-8 rounded-[24px] bg-white p-9 text-ink shadow-menu">
            <div className="min-w-0 flex-[999_1_560px]">
              <p className="mb-[18px] text-[13px] font-semibold uppercase tracking-[0.12em] text-accent">{menu.title}</p>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-x-6 gap-y-1">
                {menu.links.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    onNavigate={() => setOpenMenu(null)}
                    className="group flex flex-col rounded-[14px] px-4 py-3.5 text-ink no-underline hover:bg-surface"
                  >
                    <span className="text-[17px] font-semibold transition-colors group-hover:text-accent">{l.label}</span>
                    <span className="text-[14px] text-muted">{l.desc}</span>
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href={menu.href}
              onNavigate={() => setOpenMenu(null)}
              className="hover-media relative block min-h-[260px] flex-[1_1_300px] overflow-hidden rounded-[18px] text-white no-underline"
            >
              <Image src={photos[menu.img].src} alt="" fill sizes="400px" className="object-cover" />
              <span className="absolute inset-x-3 bottom-3 rounded-[12px] bg-ink px-4 py-3.5 font-semibold">
                {menu.cta}
                <LinkArrow className="ml-1.5 align-[-3px]" />
              </span>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
