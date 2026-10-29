import { hours } from "@/data/site";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Jour de la semaine (0 = dimanche) dans le fuseau de la mairie. */
export function parisWeekday(date: Date) {
  const day = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "Europe/Paris" }).format(date);
  return WEEKDAYS.indexOf(day);
}

/** Horaires du jour, ou null si la mairie est fermée ce jour-là. */
export function isOpenToday(date: Date = new Date()) {
  const weekday = parisWeekday(date);
  return hours.find((h) => h.weekdays.includes(weekday))?.slots ?? null;
}

export function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[’']/g, " ");
}
