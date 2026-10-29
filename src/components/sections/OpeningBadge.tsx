"use client";

import { useSyncExternalStore } from "react";
import { cn, isOpenToday, parisWeekday } from "@/lib/utils";

const subscribe = () => () => {};
const getWeekday = () => parisWeekday(new Date());
const getServerWeekday = () => -1;

/** Pastille « Mairie ouverte aujourd'hui », calculée côté navigateur (fuseau Europe/Paris). */
export function OpeningBadge({ compact = false, className }: { compact?: boolean; className?: string }) {
  const weekday = useSyncExternalStore(subscribe, getWeekday, getServerWeekday);
  const known = weekday !== -1;
  const slots = known ? isOpenToday() : null;

  let label = "Horaires de la mairie";
  if (known && slots) label = compact ? `Mairie ouverte · ${slots[0]}` : `Mairie ouverte aujourd'hui · ${slots.join(", ")}`;
  if (known && !slots) label = "Mairie fermée aujourd'hui";

  return (
    <p
      className={cn(
        "m-0 inline-flex items-center rounded-full border border-white bg-ink font-medium text-white",
        compact ? "gap-2 px-3 py-1.5 text-[13px]" : "gap-2.5 px-4 py-2 text-[14px]",
        !known && "invisible",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("rounded-full", compact ? "size-[7px]" : "size-2", slots ? "bg-focus" : "bg-footer-muted")}
      />
      {label}
    </p>
  );
}
