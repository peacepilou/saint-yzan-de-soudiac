import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const tones = {
  accent: "text-accent",
  dark: "text-eyebrow-dark",
  photo: "text-eyebrow-photo",
  muted: "text-muted",
};

export function Eyebrow({
  children,
  tone = "accent",
  as: Tag = "p",
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  as?: "p" | "span";
  className?: string;
}) {
  return (
    <Tag className={cn("m-0 text-[12px] font-semibold uppercase tracking-[0.12em] md:text-[14px]", tones[tone], className)}>
      {children}
    </Tag>
  );
}
