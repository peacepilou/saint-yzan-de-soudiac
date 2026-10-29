import { Container } from "@/components/ui/Container";
import type { NewsArticle } from "@/lib/types";
import { NewsCard } from "./NewsCard";

/** « À lire aussi » : 3 cartes. */
export function RelatedNews({ articles }: { articles: NewsArticle[] }) {
  return (
    <Container as="section" aria-labelledby="h-also" className="py-12 md:py-[120px]">
      <h2 id="h-also" className="mb-6 font-display text-[30px] font-bold tracking-[-0.03em] md:mb-9 md:text-[44px]">
        À lire aussi
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-7">
        {articles.map((a) => (
          <NewsCard key={a.slug} article={a} variant="related" />
        ))}
      </div>
    </Container>
  );
}
