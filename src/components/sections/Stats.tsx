import { type } from "@/lib/styles";
import { cn } from "@/lib/utils";

/** Chiffres clés : 4 colonnes, filet supérieur de 2 px. */
export function Stats({ items, className }: { items: { value: string; label: string }[]; className?: string }) {
  return (
    <section aria-label="La commune en chiffres" className={cn("mx-auto max-w-[1360px] px-5 pt-12 md:px-10 md:pt-24", className)}>
      <dl className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-8">
        {items.map((item) => (
          <div key={item.value} className="flex flex-col-reverse justify-end border-t-2 border-ink pt-[22px]">
            <dt className="mt-2.5 text-muted">{item.label}</dt>
            <dd className={type.figure}>{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
