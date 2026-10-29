"use client";

import { cn } from "@/lib/utils";

export type ChipOption<T extends string> = { id: T; label: string; count?: number };

/** Filtres en pilule (`aria-pressed`). Le nombre de résultats est annoncé par `role="status"` dans la page. */
export function FilterChips<T extends string>({
  label,
  options,
  value,
  onChange,
  size = "sm",
  className,
}: {
  label: string;
  options: ChipOption<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <div role="group" aria-label={label} className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => {
        const on = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(option.id)}
            className={cn(
              "min-h-11 cursor-pointer rounded-full border font-semibold",
              size === "sm" ? "px-[18px] text-[15px]" : "px-5",
              on
                ? "border-ink bg-ink text-white"
                : "border-line-strong bg-white text-ink hover:border-ink hover:bg-surface",
            )}
          >
            {option.label}
            {option.count !== undefined && <span className="opacity-70"> · {option.count}</span>}
          </button>
        );
      })}
    </div>
  );
}
