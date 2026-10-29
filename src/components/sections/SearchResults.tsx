"use client";

import { Search } from "lucide-react";
import Form from "next/form";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { search, type SearchHit } from "@/lib/search";
import { TopProcedures } from "./TopProcedures";

function Group({ id, title, hits }: { id: string; title: string; hits: SearchHit[] }) {
  if (!hits.length) return null;
  return (
    <section aria-labelledby={id} className="flex flex-col gap-3">
      <h2 id={id} className="font-display text-[24px] font-bold tracking-[-0.02em] md:text-[28px]">
        {title}
      </h2>
      <ul className="m-0 list-none border-t border-line p-0">
        {hits.map((h) => (
          <li key={h.href}>
            <Link href={h.href} className="group flex items-center gap-5 border-b border-line py-5 text-ink no-underline hover:bg-surface-hover">
              <span className="flex flex-1 flex-col">
                <strong className="text-[18px]">{h.title}</strong>
                {h.text && <span className="line-clamp-2 text-[15px] text-muted">{h.text}</span>}
              </span>
              <LinkArrow size={18} className="text-footer-muted transition-colors group-hover:text-accent" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Champ prérempli et résultats groupés de /recherche. */
export function SearchResults() {
  const q = useSearchParams().get("q")?.trim() ?? "";
  const results = search(q);

  return (
    <div className="flex flex-col gap-10">
      <Form
        key={q}
        action="/recherche"
        role="search"
        aria-label="Rechercher sur le site"
        className="flex items-center gap-2 rounded-full border border-line-strong py-1 pr-1 pl-5 focus-within:shadow-[0_0_0_3px_var(--color-focus)] md:py-2 md:pr-2"
      >
        <label htmlFor="q-page" className="sr-only">
          Rechercher sur le site
        </label>
        <Search size={20} strokeWidth={2} aria-hidden="true" className="flex-none text-muted" />
        <input
          id="q-page"
          name="q"
          type="search"
          defaultValue={q}
          placeholder="Cantine, salle, PLU…"
          className="h-12 min-w-0 flex-auto border-0 bg-transparent font-[inherit] outline-none focus-visible:outline-none"
        />
        <button
          type="submit"
          className="h-[46px] cursor-pointer rounded-full border-0 bg-accent px-5 font-[inherit] font-semibold text-white hover:bg-accent-hover md:h-[52px] md:px-[26px]"
        >
          Rechercher
        </button>
      </Form>

      <p role="status" className="text-text">
        {!q && "Saisissez un mot-clé : une démarche, un service, une actualité…"}
        {q && results.total > 0 && `${results.total} résultat${results.total > 1 ? "s" : ""} pour « ${q} »`}
        {q && results.total === 0 && `Aucun résultat pour « ${q} ». Vérifiez l'orthographe ou essayez un autre mot-clé.`}
      </p>

      {results.total > 0 ? (
        <>
          <Group id="r-demarches" title="Démarches" hits={results.demarches} />
          <Group id="r-actualites" title="Actualités" hits={results.actualites} />
          <Group id="r-pages" title="Pages" hits={results.pages} />
        </>
      ) : (
        <TopProcedures />
      )}
    </div>
  );
}
