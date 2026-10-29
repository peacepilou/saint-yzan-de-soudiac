import Link from "next/link";
import { Fragment } from "react";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

export function Breadcrumb({ items, tone = "photo" }: { items: Crumb[]; tone?: "photo" | "light" }) {
  const onPhoto = tone === "photo";
  return (
    <nav aria-label="Fil d'Ariane" className={cn("text-[14px]", onPhoto ? "text-on-photo" : "text-muted")}>
      {items.map((item, i) => (
        <Fragment key={item.label}>
          {i > 0 && <span aria-hidden="true"> / </span>}
          {item.href ? (
            <Link
              href={item.href}
              className={cn("link-hover", onPhoto ? "text-white" : "text-muted")}
            >
              {item.label}
            </Link>
          ) : i === items.length - 1 ? (
            <span aria-current="page" className={onPhoto ? undefined : "text-ink"}>
              {item.label}
            </span>
          ) : (
            <span className={onPhoto ? "text-white" : undefined}>{item.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
