import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Flèche de lien : vers la droite pour un lien interne, en diagonale (+ mention masquée) pour un site externe. */
export function LinkArrow({ external = false, size = 16, className }: { external?: boolean; size?: number; className?: string }) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  return (
    <>
      <Icon size={size} strokeWidth={2} aria-hidden="true" className={cn("inline-block flex-none", className)} />
      {external && <span className="sr-only"> (site externe)</span>}
    </>
  );
}
