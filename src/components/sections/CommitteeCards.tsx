import { committees } from "@/data/officials";

export function CommitteeCards() {
  return (
    <div className="grid min-w-0 flex-[999_1_640px] grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
      {committees.map((c, i) => (
        <article key={i} className="flex flex-col gap-2.5 rounded-[22px] bg-surface p-7">
          <h3 className="font-display text-[22px] font-bold">{c.name}</h3>
          <p className="text-[15px] text-muted">
            {c.chair}
            <br />
            [N] membres
          </p>
        </article>
      ))}
    </div>
  );
}
