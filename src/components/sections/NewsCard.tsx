import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/icons";
import { toneText } from "@/components/ui/Tag";
import { categoryTone } from "@/data/news";
import { photos } from "@/data/photos";
import type { NewsArticle } from "@/lib/types";
import { cn } from "@/lib/utils";

const placeholderStyles = {
  accent: "bg-accent-soft text-accent",
  warning: "bg-warning-bg text-warning",
  health: "bg-health-bg text-health",
};

/**
 * Carte d'actualité. `feature` : image de 340 px et sous-catégorie (accueil, liste) ;
 * `related` : image de 280 px (« À lire aussi ») ; `compact` : carrousel mobile.
 */
export function NewsCard({
  article,
  variant = "feature",
  headingLevel = 3,
}: {
  article: NewsArticle;
  variant?: "feature" | "related" | "compact";
  headingLevel?: 2 | 3;
}) {
  const tone = categoryTone[article.category];
  const href = `/actualites/${article.slug}`;
  const H = `h${headingLevel}` as const;
  const media = {
    feature: "h-[220px] rounded-[18px] md:h-[340px] md:rounded-[20px]",
    related: "h-[220px] rounded-[18px] md:h-[280px] md:rounded-[20px]",
    compact: "h-[220px] rounded-[18px]",
  }[variant];
  const title = variant === "feature" ? article.title : (article.shortTitle ?? article.title);

  return (
    <article className={cn("flex flex-col", variant === "compact" ? "w-[290px] flex-none gap-2.5" : "gap-3.5 md:gap-4")}>
      <Link href={href} tabIndex={-1} aria-hidden="true" className={cn("hover-media relative block overflow-hidden", media)}>
        {article.image ? (
          <Image
            src={photos[article.image.key].src}
            alt=""
            fill
            sizes="(min-width: 768px) 33vw, 290px"
            className={cn("object-cover", article.image.key === "bourg" && "grayscale")}
          />
        ) : (
          <span className={cn("flex size-full items-center justify-center", placeholderStyles[tone])}>
            <Icon name={article.placeholderIcon === "heart" ? "heart" : "trash"} size={56} strokeWidth={1.3} />
          </span>
        )}
      </Link>
      <span className={cn("flex gap-2.5", variant === "compact" ? "text-[13px]" : "text-[14px]")}>
        <span className={cn("font-semibold", toneText[tone])}>{article.category}</span>
        {variant === "feature" && <span className="text-muted">· {article.subcategory}</span>}
      </span>
      <H
        className={cn(
          "font-display font-bold",
          variant === "feature" && "text-[20px] leading-[1.2] tracking-[-0.02em] md:text-[26px] md:leading-[1.15]",
          variant === "related" && "text-[20px] leading-[1.2] md:text-[24px]",
          variant === "compact" && "text-[20px] leading-[1.2]",
        )}
      >
        <Link href={href} className="text-ink link-hover">
          {title}
        </Link>
      </H>
    </article>
  );
}
