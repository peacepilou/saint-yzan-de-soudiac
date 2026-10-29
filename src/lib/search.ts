import { news } from "@/data/news";
import { procedureHref, procedures } from "@/data/procedures";
import { sitemap, type SitemapEntry } from "@/data/sitemap";
import { normalize } from "./utils";

export type SearchHit = { title: string; text: string; href: string; meta?: string };
export type SearchResults = { demarches: SearchHit[]; actualites: SearchHit[]; pages: SearchHit[]; total: number };

function flatten(entries: SitemapEntry[]): SitemapEntry[] {
  return entries.flatMap((e) => [e, ...flatten(e.children ?? [])]);
}

const pages = flatten(sitemap).filter(
  (p, i, all) =>
    !p.href.startsWith("/demarches/") && !p.href.startsWith("/actualites/") && all.findIndex((o) => o.href === p.href) === i,
);

/** Recherche plein texte simple, côté client, dans les données locales. */
export function search(query: string): SearchResults {
  const terms = searchTerms(query);
  const match = (...fields: string[]) => {
    const haystack = normalize(fields.join(" "));
    return terms.length > 0 && terms.every((t) => haystack.includes(t));
  };

  const demarches = procedures
    .filter((p) => match(p.title, p.where, p.theme, p.lead))
    .map((p) => ({ title: p.title, text: p.where, href: procedureHref(p), meta: p.theme }));
  const actualites = news
    .filter((n) => match(n.title, n.lead, n.category, n.subcategory))
    .map((n) => ({ title: n.title, text: n.lead, href: `/actualites/${n.slug}`, meta: n.category }));
  const pageHits = pages
    .filter((p) => match(p.label, p.description ?? ""))
    .map((p) => ({ title: p.label, text: p.description ?? "", href: p.href }));

  return { demarches, actualites, pages: pageHits, total: demarches.length + actualites.length + pageHits.length };
}

export function searchTerms(query: string) {
  return normalize(query).split(/\s+/).filter((t) => t.length > 1);
}

