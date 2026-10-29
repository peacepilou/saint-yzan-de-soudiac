import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Crédit photo en pilule `ink`, en bas à droite d'une image pleine largeur. */
export function PhotoCredit({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "absolute right-5 bottom-4 m-0 max-w-[calc(100%-40px)] rounded-full bg-ink px-3 py-1 text-[12px] text-white md:right-10 md:bottom-5 md:text-[13px]",
        className,
      )}
    >
      {children}
    </p>
  );
}
