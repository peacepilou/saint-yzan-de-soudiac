"use client";

import { useState } from "react";
import { FilterChips } from "@/components/ui/FilterChips";
import type { NewsArticle, NewsCategory } from "@/lib/types";
import { NewsCard } from "./NewsCard";

const CATEGORIES: NewsCategory[] = ["Solidarité", "Animation", "Services", "Environnement", "Santé"];

/** Liste des actualités filtrable par catégorie, avec pagination factice. */
export function NewsBrowser({ articles }: { articles: NewsArticle[] }) {
  const [category, setCategory] = useState<NewsCategory | "Toutes">("Toutes");
  const shown = articles.filter((a) => category === "Toutes" || a.category === category);

  return (
    <>
      <FilterChips
        label="Filtrer par catégorie"
        options={[
          { id: "Toutes" as const, label: "Toutes", count: articles.length },
          ...CATEGORIES.map((c) => ({ id: c, label: c, count: articles.filter((a) => a.category === c).length })),
        ]}
        value={category}
        onChange={setCategory}
        className="mb-10"
      />
      <p role="status" className="sr-only">
        {shown.length} actualité{shown.length > 1 ? "s" : ""} affichée{shown.length > 1 ? "s" : ""}
      </p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] gap-x-7 gap-y-12">
        {shown.map((a) => (
          <NewsCard key={a.slug} article={a} headingLevel={2} />
        ))}
      </div>
    </>
  );
}
