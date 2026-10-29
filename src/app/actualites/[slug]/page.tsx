import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { RelatedNews } from "@/components/sections/RelatedNews";
import { ShareButtons } from "@/components/sections/ShareButtons";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Icon } from "@/components/ui/icons";
import { Tag } from "@/components/ui/Tag";
import { categoryTone, getArticle, news, relatedArticles } from "@/data/news";
import { photos } from "@/data/photos";
import { site } from "@/data/site";
import { type } from "@/lib/styles";
import type { ArticleBlock } from "@/lib/types";
import { cn } from "@/lib/utils";
import { LinkArrow } from "@/components/ui/LinkArrow";

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps<"/actualites/[slug]">): Promise<Metadata> {
  const article = getArticle((await params).slug);
  return { title: article?.shortTitle ?? article?.title ?? "Actualité", description: article?.lead };
}

const h2 = "font-display text-[26px] font-bold tracking-[-0.02em] md:text-[32px]";

function Block({ block, first }: { block: ArticleBlock; first: boolean }) {
  switch (block.type) {
    case "h2":
      return <h2 className={cn(h2, !first && "mt-4")}>{block.text}</h2>;
    case "p":
      return <p>{block.text}</p>;
    case "quote":
      return (
        <blockquote className="my-4 border-l-[3px] border-accent py-2 pl-7 font-display text-[22px] leading-[1.3] tracking-[-0.01em] md:text-[28px]">
          {block.text}
        </blockquote>
      );
    case "steps":
      return (
        <ol className="m-0 flex list-none flex-col gap-3.5 p-0">
          {block.items.map((item, i) => (
            <li key={item.text} className="flex items-start gap-[18px]">
              <span aria-hidden="true" className="flex size-9 flex-none items-center justify-center rounded-full bg-ink text-[15px] font-semibold text-white">
                {i + 1}
              </span>
              <span>
                {item.text}
                {item.strong && <strong>{item.strong}</strong>}
                {item.after}
              </span>
            </li>
          ))}
        </ol>
      );
  }
}

export default async function ArticlePage({ params }: PageProps<"/actualites/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const tone = categoryTone[article.category];

  return (
    <SiteFrame header={{ variant: "solid" }}>
      <article className="text-[17px] leading-[1.7] md:text-[18px]">
        <header className="mx-auto flex max-w-[920px] flex-col gap-5 px-5 pt-10 pb-10 md:gap-6 md:px-10 md:pt-[72px] md:pb-14">
          <Breadcrumb
            tone="light"
            items={[{ label: "Accueil", href: "/" }, { label: "Actualités", href: "/actualites" }, { label: article.subcategory }]}
          />
          <div className="flex flex-wrap gap-2.5">
            <Tag tone={tone}>{article.category}</Tag>
            {article.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          <h1 className={type.h1Article}>{article.title}</h1>
          <p className="text-[19px] leading-normal text-text md:text-[22px]">{article.lead}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px] text-muted">
            <span>Publié le {article.date}</span>
            <span aria-hidden="true">·</span>
            <span>Lecture {article.readingTime}</span>
          </div>
        </header>

        {article.image ? (
          <figure className="m-0">
            <div className="relative h-[320px] md:h-[680px]">
              <Image
                src={photos[article.image.key].src}
                alt={article.image.alt}
                fill
                preload
                sizes="100vw"
                className={cn("object-cover", article.image.key === "bourg" && "grayscale")}
              />
            </div>
            <figcaption className="mx-auto mt-3 max-w-[1360px] px-5 text-[14px] text-muted md:px-10">{article.image.caption}</figcaption>
          </figure>
        ) : (
          <div
            aria-hidden="true"
            className={cn(
              "flex h-[240px] items-center justify-center md:h-[420px]",
              tone === "health" ? "bg-health-bg text-health" : "bg-accent-soft text-accent",
            )}
          >
            <Icon name={article.placeholderIcon === "heart" ? "heart" : "trash"} size={96} strokeWidth={1.1} />
          </div>
        )}

        <div className="mx-auto flex max-w-[1360px] flex-wrap justify-center gap-14 px-5 pt-10 md:px-10 md:pt-[72px]">
          <div className="flex max-w-[720px] min-w-0 flex-[999_1_640px] flex-col gap-[22px]">
            {article.body.map((block, i) => (
              <Fragment key={i}>
                <Block block={block} first={i === 0} />
              </Fragment>
            ))}
            <ShareButtons title={article.title} path={`/actualites/${article.slug}`} />
          </div>

          <aside aria-label="En bref" className="flex max-w-[380px] flex-[1_1_300px] flex-col gap-4 text-[16px] leading-normal">
            <div className="flex flex-col gap-3.5 rounded-[22px] bg-accent p-7 text-white">
              <strong className="font-display text-[22px]">En bref</strong>
              <dl className="flex flex-col gap-3">
                {article.brief.map((b) => (
                  <div key={b.label}>
                    <dt className="text-[14px] text-on-accent-muted">{b.label}</dt>
                    <dd>{b.value}</dd>
                  </div>
                ))}
              </dl>
              <a
                href={site.phoneHref}
                className="mt-1.5 flex h-12 items-center justify-center rounded-full bg-white font-semibold text-ink no-underline hover:bg-white-hover"
              >
                {site.phone}
              </a>
            </div>
            {article.aside && (
              <Link
                href={article.aside.href}
                className="flex flex-col gap-1 rounded-[22px] bg-surface p-6 text-ink no-underline hover:brightness-[.96]"
              >
                <strong>{article.aside.title}</strong>
                <span className="inline-flex items-center gap-1.5 text-muted">
                  {article.aside.text}
                  <LinkArrow />
                </span>
              </Link>
            )}
          </aside>
        </div>
      </article>

      <RelatedNews articles={relatedArticles(article.slug)} />
    </SiteFrame>
  );
}
