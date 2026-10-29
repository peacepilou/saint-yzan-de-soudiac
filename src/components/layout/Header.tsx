import Link from "next/link";
import type { NavKey } from "@/lib/types";
import { cn } from "@/lib/utils";
import { HeaderNav } from "./HeaderNav";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

export type HeaderProps = {
  /** `overlay` : posé sur la photo du hero ; `solid` : fond blanc (article, recherche, contact, pages légales). */
  variant: "overlay" | "solid";
  current?: NavKey;
};

export function Header({ variant, current }: HeaderProps) {
  const overlay = variant === "overlay";
  return (
    <header className={cn(overlay ? "absolute inset-x-0 top-0 z-30" : "relative z-30 border-b border-line bg-white")}>
      <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-x-10 gap-y-4 px-5 py-4 md:px-10 md:py-6">
        <Link href="/" className={cn("flex items-center gap-2.5 no-underline md:gap-3", overlay ? "text-white" : "text-ink")}>
          <Logo variant={overlay ? "white" : "color"} withPrefix />
          <span className="sr-only"> — accueil</span>
        </Link>
        <HeaderNav variant={variant} current={current} />
        <MobileMenu variant={variant} />
      </div>
    </header>
  );
}
