"use client";

import { ExternalLink, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Emblem } from "@/components/layout/Logo";
import { adminNav, pendingStatus } from "@/lib/admin/resources";
import { signOut, useCollection, useSession } from "@/lib/admin/store";
import type { CollectionKey } from "@/lib/admin/types";
import { cn } from "@/lib/utils";
import { ToastProvider } from "./Toast";

function PendingBadge({ collection }: { collection: CollectionKey }) {
  const count = useCollection(collection).filter((r) => r.status === pendingStatus[collection]).length;
  if (!count) return null;
  return (
    <span className="ml-auto rounded-full bg-focus px-2 py-0.5 text-[12px] font-bold text-ink">
      {count}
      <span className="sr-only"> à traiter</span>
    </span>
  );
}

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Administration" className="flex flex-col gap-6">
      {adminNav.map((group, i) => (
        <div key={group.title ?? i} className="flex flex-col gap-1">
          {group.title && <p className="mb-1 px-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-footer-muted">{group.title}</p>}
          {group.items.map((item) => {
            const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
            const ItemIcon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onNavigate={onNavigate}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-11 items-center gap-3 rounded-[12px] px-3 text-[15px] font-medium no-underline",
                  active ? "bg-white text-ink" : "text-on-dark hover:bg-white/10 hover:text-white",
                )}
              >
                <ItemIcon size={18} strokeWidth={1.8} aria-hidden="true" className="flex-none" />
                {item.label}
                {item.badge && <PendingBadge collection={item.badge} />}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

function Brand() {
  return (
    <Link href="/admin" className="flex items-center gap-3 text-white no-underline">
      <Emblem variant="white" size={40} />
      <span className="flex flex-col leading-tight">
        <span className="font-display text-[16px] font-bold">Saint-Yzan-de-Soudiac</span>
        <span className="text-[12px] uppercase tracking-[0.12em] text-eyebrow-dark">Administration</span>
      </span>
    </Link>
  );
}

/** Cadre de l'espace d'administration : menu latéral, barre du haut et garde de connexion (factice). */
export function AdminShell({ children }: { children: ReactNode }) {
  const session = useSession();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (session === null) router.replace("/admin/connexion");
  }, [session, router]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (menuOpen && !d.open) d.showModal();
    if (!menuOpen && d.open) d.close();
  }, [menuOpen]);

  if (!session) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-surface text-muted" role="status">
        {session === null ? "Redirection vers la connexion…" : "Chargement de l'espace d'administration…"}
      </div>
    );
  }

  return (
    <ToastProvider>
      <div className="min-h-dvh bg-surface lg:grid lg:grid-cols-[272px_1fr]">
        <div className="hidden bg-ink lg:block">
          <aside className="sticky top-0 flex h-dvh flex-col gap-8 overflow-y-auto px-4 py-6">
            <div className="px-2">
              <Brand />
            </div>
            <SidebarNav />
          </aside>
        </div>

        <dialog
          ref={dialog}
          onClose={() => setMenuOpen(false)}
          aria-label="Menu d'administration"
          className="m-0 h-dvh max-h-none w-[300px] max-w-[85vw] overflow-y-auto bg-ink px-4 py-5 backdrop:bg-ink/60 lg:hidden"
        >
          <div className="mb-8 flex items-center justify-between px-2">
            <Brand />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Fermer le menu"
              className="flex size-11 cursor-pointer items-center justify-center rounded-full border-0 bg-white/10 text-white hover:bg-white/20"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>
          <SidebarNav onNavigate={() => setMenuOpen(false)} />
        </dialog>

        <div className="flex min-w-0 flex-col">
          <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-line bg-white px-5 py-3 md:px-8">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Ouvrir le menu d'administration"
              aria-expanded={menuOpen}
              className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-line-strong bg-white text-ink hover:bg-surface lg:hidden"
            >
              <Menu size={20} aria-hidden="true" />
            </button>
            <p className="hidden text-[14px] text-muted md:block">
              Démo : les modifications sont enregistrées dans ce navigateur uniquement.
            </p>
            <div className="ml-auto flex items-center gap-2">
              <Link
                href="/"
                className="flex h-11 items-center gap-2 rounded-full px-4 text-[15px] font-semibold text-ink no-underline hover:bg-surface"
              >
                <ExternalLink size={16} aria-hidden="true" />
                <span>Voir le site</span>
              </Link>
              <span className="hidden items-center gap-2.5 border-l border-line pl-4 text-[14px] sm:flex">
                <span aria-hidden="true" className="flex size-9 items-center justify-center rounded-full bg-accent-soft font-semibold text-accent">
                  CD
                </span>
                <span className="flex flex-col leading-tight">
                  <strong className="text-ink">{session.name}</strong>
                  <span className="text-muted">{session.email}</span>
                </span>
              </span>
              <button
                type="button"
                onClick={() => {
                  signOut();
                  router.replace("/admin/connexion");
                }}
                aria-label="Se déconnecter"
                className="flex size-11 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent text-muted hover:bg-surface hover:text-ink"
              >
                <LogOut size={18} aria-hidden="true" />
              </button>
            </div>
          </header>
          <main id="contenu" tabIndex={-1} className="mx-auto w-full max-w-[1280px] min-w-0 flex-1 px-5 py-8 outline-none md:px-8 md:py-10">
            {children}
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
