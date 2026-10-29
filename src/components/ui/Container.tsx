import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils";

type ContainerProps<T extends ElementType> = {
  as?: T;
  size?: "wide" | "narrow";
} & ComponentPropsWithoutRef<T>;

/** Conteneur de 1360 px (ou 1240 px pour les pages « Découvrir » et rubriques). */
export function Container<T extends ElementType = "div">({ as, size = "wide", className, ...props }: ContainerProps<T>) {
  const Tag = as ?? "div";
  return (
    <Tag
      className={cn(
        "mx-auto w-full",
        size === "wide" ? "max-w-[1360px] px-5 md:px-10" : "max-w-[1240px] px-5 md:px-8",
        className,
      )}
      {...props}
    />
  );
}
