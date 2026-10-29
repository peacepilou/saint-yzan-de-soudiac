import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { sitemap as entries, type SitemapEntry } from "@/data/sitemap";

function flatten(list: SitemapEntry[]): string[] {
  return list.flatMap((e) => [e.href, ...flatten(e.children ?? [])]);
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [...new Set(flatten(entries))].map((href) => ({ url: `${site.url}${href}` }));
}
