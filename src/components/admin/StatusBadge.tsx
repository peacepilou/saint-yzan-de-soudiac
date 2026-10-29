import type { StatusTone } from "@/lib/admin/types";
import { cn } from "@/lib/utils";

const tones: Record<StatusTone, string> = {
  new: "bg-ink text-white",
  progress: "bg-warning-bg text-warning",
  done: "bg-accent-soft text-accent",
  neutral: "bg-surface text-text",
  refused: "bg-health-bg text-health",
};

export function StatusBadge({ label, tone = "neutral" }: { label: string; tone?: StatusTone }) {
  return <span className={cn("inline-flex rounded-full px-3 py-1 text-[13px] font-semibold whitespace-nowrap", tones[tone])}>{label}</span>;
}

/** Date ISO (aaaa-mm-jj) au format court français. */
export function formatDay(iso: string) {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}
