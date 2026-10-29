import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/sections/LegalPage";
import { sitemap, type SitemapEntry } from "@/data/sitemap";

export const metadata: Metadata = { title: "Plan du site" };

function Tree({ entries }: { entries: SitemapEntry[] }) {
  return (
    <ul>
      {entries.map((e) => (
        <li key={`${e.href}-${e.label}`}>
          <Link href={e.href}>{e.label}</Link>
          {e.children && <Tree entries={e.children} />}
        </li>
      ))}
    </ul>
  );
}

export default function PlanDuSitePage() {
  return (
    <LegalPage title="Plan du site" lead="Toutes les pages du site, organisées par rubrique.">
      <Tree entries={sitemap} />
    </LegalPage>
  );
}
