import { NextResponse, type NextRequest } from "next/server";
import { news } from "@/data/news";
import { procedures } from "@/data/procedures";
import { rubriques } from "@/data/rubriques";

const known: Record<string, Set<string>> = {
  actualites: new Set(news.map((n) => n.slug)),
  demarches: new Set([...procedures.map((p) => p.slug), "signaler-un-probleme"]),
  "vivre-ici": new Set(rubriques.map((r) => r.slug)),
};

/**
 * Les pages à slug sont rendues à la demande : sans ce filtre, un slug inconnu afficherait la page
 * « introuvable » avec un code 200. On réécrit vers une route inexistante pour obtenir un vrai 404.
 */
export function proxy(request: NextRequest) {
  const [, section, slug] = request.nextUrl.pathname.split("/");
  if (slug && known[section] && !known[section].has(slug)) {
    return NextResponse.rewrite(new URL("/page-introuvable", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/actualites/:slug", "/demarches/:slug", "/vivre-ici/:slug"],
};
