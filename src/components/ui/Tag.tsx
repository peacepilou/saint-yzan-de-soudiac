import type { ReactNode } from "react";
import type { Tone } from "@/lib/types";
import { cn } from "@/lib/utils";

const tones: Record<Tone | "neutral" | "white", string> = {
  accent: "bg-accent-soft text-accent",
  warning: "bg-warning-bg text-warning",
  health: "bg-health-bg text-health",
  neutral: "bg-surface text-ink",
  white: "bg-white text-ink",
};

export function Tag({ children, tone = "neutral", className }: { children: ReactNode; tone?: keyof typeof tones; className?: string }) {
  return (
    <span className={cn("inline-flex rounded-full px-3.5 py-1.5 text-[14px] font-semibold leading-snug", tones[tone], className)}>
      {children}
    </span>
  );
}

export const toneText: Record<Tone, string> = {
  accent: "text-accent",
  warning: "text-warning",
  health: "text-health",
};
