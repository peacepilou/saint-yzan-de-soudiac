import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { NewsArticle } from "@/lib/types";
import { NewsCard } from "./NewsCard";

/** « La vie de la commune » : grille de 3 cartes en bureau, carrousel horizontal en mobile. */
export function NewsGrid({ articles }: { articles: NewsArticle[] }) {
  return (
    <section aria-labelledby="h-actu" className="pt-11 md:mx-auto md:max-w-[1360px] md:px-10 md:pt-28">
      <div className="hidden md:block">
        <SectionHeader
          id="h-actu"
          eyebrow="Actualités"
          title="La vie de la commune"
          aside={
            <Button href="/actualites" variant="outline" size={48}>
              Toutes les actualités
            </Button>
          }
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-7">
          {articles.map((a) => (
            <NewsCard key={a.slug} article={a} />
          ))}
        </div>
      </div>

      <div className="md:hidden">
        <div className="mb-4 flex items-baseline justify-between px-5">
          <h2 className="font-display text-[30px] font-bold tracking-[-0.03em]">Actualités</h2>
          <Link href="/actualites" className="text-[15px] font-semibold link-hover">
            Tout voir
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto px-5 pb-2" role="list" aria-label="Actualités">
          {articles.map((a) => (
            <div role="listitem" key={a.slug}>
              <NewsCard article={a} variant="compact" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
