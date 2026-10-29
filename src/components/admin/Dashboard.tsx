"use client";

import { Inbox, Mail, Megaphone, Newspaper, TriangleAlert, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { RichText } from "@/components/ui/RichText";
import { resourceFor } from "@/lib/admin/resources";
import { cn } from "@/lib/utils";
import { updateRecord, useCollection, useSingleton } from "@/lib/admin/store";
import { PageHeader, Panel } from "./PageHeader";
import { formatDay, StatusBadge } from "./StatusBadge";
import { useToast } from "./Toast";

function StatCard({ label, value, href, icon: StatIcon, highlight }: { label: string; value: number; href: string; icon: LucideIcon; highlight?: boolean }) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-4 rounded-[20px] border border-line bg-white p-5 text-ink no-underline hover:border-line-strong hover:bg-surface-hover md:p-6"
    >
      <span className={cn("flex size-11 items-center justify-center rounded-[12px]", highlight ? "bg-ink text-white" : "bg-accent-soft text-accent")}>
        <StatIcon size={20} strokeWidth={1.8} aria-hidden="true" />
      </span>
      <span className="font-display text-[40px] leading-none font-bold tracking-[-0.04em]">{value}</span>
      <span className="text-[15px] text-muted">{label}</span>
    </Link>
  );
}

/** Tableau de bord : demandes à traiter, derniers signalements, réservations à valider, contenus. */
export function Dashboard() {
  const toast = useToast();
  const reports = useCollection("reports");
  const bookings = useCollection("bookings");
  const messages = useCollection("messages");
  const news = useCollection("news");
  const alert = useSingleton("alert");

  const openReports = reports.filter((r) => r.status !== "Traité");
  const pendingBookings = bookings.filter((b) => b.status === "En attente");
  const newMessages = messages.filter((m) => m.status === "Nouveau");
  const drafts = news.filter((n) => n.status === "Brouillon");
  const reportTone = (s: string) => resourceFor("reports").statuses?.find((x) => x.value === s)?.tone;

  return (
    <>
      <PageHeader title="Tableau de bord" description="L'activité du site et les demandes des habitants à traiter." />

      <div className="mb-8 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        <StatCard label="Signalements à traiter" value={openReports.length} href="/admin/signalements" icon={TriangleAlert} highlight={openReports.length > 0} />
        <StatCard label="Réservations à valider" value={pendingBookings.length} href="/admin/reservations" icon={Inbox} highlight={pendingBookings.length > 0} />
        <StatCard label="Nouveaux messages" value={newMessages.length} href="/admin/messages" icon={Mail} highlight={newMessages.length > 0} />
        <StatCard label="Actualités publiées" value={news.filter((n) => n.status === "Publié").length} href="/admin/actualites" icon={Newspaper} />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Panel
          title="Derniers signalements"
          action={
            <Link href="/admin/signalements" className="inline-flex items-center gap-1.5 text-[15px] font-semibold link-hover">
              Tous les signalements
              <LinkArrow />
            </Link>
          }
        >
          <ul className="m-0 flex list-none flex-col p-0">
            {reports.slice(0, 5).map((r) => (
              <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-line py-3 last:border-b-0">
                <span className="flex min-w-0 flex-col">
                  <strong>{String(r.type)}</strong>
                  <span className="text-[14px] text-muted">
                    {String(r.place)} · {formatDay(r.createdAt)}
                  </span>
                </span>
                <StatusBadge label={String(r.status)} tone={reportTone(String(r.status))} />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel
          title="Réservations à valider"
          action={
            <Link href="/admin/reservations" className="inline-flex items-center gap-1.5 text-[15px] font-semibold link-hover">
              Toutes les réservations
              <LinkArrow />
            </Link>
          }
        >
          {pendingBookings.length === 0 ? (
            <p className="text-muted">Aucune demande en attente.</p>
          ) : (
            <ul className="m-0 flex list-none flex-col p-0">
              {pendingBookings.map((b) => (
                <li key={b.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-line py-3 last:border-b-0">
                  <span className="flex min-w-0 flex-col">
                    <strong>{String(b.purpose)}</strong>
                    <span className="text-[14px] text-muted">
                      {String(b.room)} · {formatDay(String(b.date))}
                    </span>
                  </span>
                  <span className="flex gap-2">
                    <Button
                      size={44}
                      variant="primary"
                      onClick={() => {
                        updateRecord("bookings", b.id, { status: "Validée" });
                        toast("Réservation validée");
                      }}
                    >
                      Valider<span className="sr-only"> : {String(b.purpose)}</span>
                    </Button>
                    <Button
                      size={44}
                      variant="outline-soft"
                      onClick={() => {
                        updateRecord("bookings", b.id, { status: "Refusée" });
                        toast("Réservation refusée");
                      }}
                    >
                      Refuser<span className="sr-only"> : {String(b.purpose)}</span>
                    </Button>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel
          title="Bandeau « À savoir »"
          action={
            <Link href="/admin/bandeau" className="inline-flex items-center gap-1.5 text-[15px] font-semibold link-hover">
              Modifier
              <LinkArrow />
            </Link>
          }
        >
          <div className="flex items-start gap-3">
            <Megaphone size={20} aria-hidden="true" className="mt-0.5 flex-none text-warning" />
            <div className="flex flex-col gap-2">
              <StatusBadge label={alert.active ? "Affiché sur l'accueil" : "Masqué"} tone={alert.active ? "done" : "neutral"} />
              <p className="text-text">
                <RichText text={alert.message} />
              </p>
            </div>
          </div>
        </Panel>

        <Panel title="Contenus">
          <p className="text-text">
            {drafts.length} actualité{drafts.length > 1 ? "s" : ""} en brouillon · {news.length} au total
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/admin/actualites" variant="outline-soft" size={44}>
              Gérer les actualités
            </Button>
            <Button href="/admin/evenements" variant="outline-soft" size={44}>
              Gérer l&apos;agenda
            </Button>
          </div>
        </Panel>
      </div>

      <section aria-labelledby="h-demo" className="mt-8 rounded-[20px] bg-accent p-6 text-white md:p-8">
        <h2 id="h-demo" className="font-display text-[22px] font-bold">
          Tester la démo
        </h2>
        <p className="mt-2 max-w-[720px] text-on-accent">
          Envoyez un signalement, une demande de réservation ou un message depuis le site : il apparaît ici. Modifiez le bandeau « À savoir » : il
          change sur l&apos;accueil.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button href="/demarches/signaler-un-probleme" variant="white" size={46}>
            Faire un signalement
            <LinkArrow />
          </Button>
          <Button href="/" variant="outline-inverse" size={46}>
            Voir l&apos;accueil
            <LinkArrow />
          </Button>
        </div>
      </section>
    </>
  );
}
