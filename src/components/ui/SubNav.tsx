"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Renvoie l'identifiant de la section visible, suivi par IntersectionObserver. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join("|");

  useEffect(() => {
    const targets = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [key]);

  return active;
}

/** Sous-navigation d'ancres sous le hero des pages intérieures. */
export function SubNav({ items }: { items: { id: string; label: string }[] }) {
  const active = useActiveSection(items.map((i) => i.id));
  return (
    <nav aria-label="Dans cette page" className="sticky top-0 z-20 border-b border-line bg-white">
      <div className="mx-auto flex max-w-[1360px] gap-x-8 gap-y-1 overflow-x-auto px-5 font-medium md:flex-wrap md:px-10">
        {items.map((item) => {
          const on = item.id === active;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={on ? "location" : undefined}
              className={cn(
                "shrink-0 border-b-2 py-5 no-underline",
                on ? "border-ink text-ink" : "border-transparent text-muted hover:text-ink",
              )}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
