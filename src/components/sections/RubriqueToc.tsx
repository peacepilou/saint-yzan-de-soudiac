"use client";

import { useActiveSection } from "@/components/ui/SubNav";
import { cn } from "@/lib/utils";

/** Sommaire latéral collant des rubriques, qui suit la section visible. */
export function RubriqueToc({ items }: { items: { id: string; label: string }[] }) {
  const active = useActiveSection(items.map((i) => i.id));
  return (
    <nav aria-label="Dans cette rubrique" className="flex flex-[1_1_220px] flex-col gap-1 self-start text-[16px] md:sticky md:top-6">
      <span className="mb-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-muted">Sommaire</span>
      {items.map((item) => {
        const on = item.id === active;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={on ? "location" : undefined}
            className={cn(
              "border-l-2 py-2.5 pl-4 no-underline",
              on ? "border-accent font-semibold text-ink link-hover" : "border-line text-text hover:text-ink",
            )}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
