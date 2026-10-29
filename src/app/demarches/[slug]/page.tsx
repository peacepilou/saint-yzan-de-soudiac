import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { PageIntro } from "@/components/sections/PageIntro";
import { ProcedureList } from "@/components/sections/ProcedureList";
import { Tag } from "@/components/ui/Tag";
import { getProcedure, procedures } from "@/data/procedures";
import { site } from "@/data/site";

export function generateStaticParams() {
  return procedures.filter((p) => !p.href).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/demarches/[slug]">): Promise<Metadata> {
  const procedure = getProcedure((await params).slug);
  return { title: procedure?.title ?? "Démarche", description: procedure?.lead };
}

const h2 = "font-display text-[26px] font-bold tracking-[-0.02em] md:text-[32px]";

export default async function ProcedurePage({ params }: PageProps<"/demarches/[slug]">) {
  const { slug } = await params;
  const procedure = getProcedure(slug);
  if (!procedure || procedure.href) notFound();
  const related = procedure.related.map((s) => getProcedure(s)!).filter(Boolean);

  return (
    <SiteFrame header={{ variant: "solid", current: "demarches" }}>
      <PageIntro
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Démarches", href: "/demarches" }, { label: procedure.title }]}
        title={procedure.title}
        lead={procedure.lead}
        wide
      >
        <div className="flex flex-wrap gap-2.5">
          <Tag tone="accent">{procedure.theme}</Tag>
          <Tag>{procedure.where}</Tag>
        </div>
      </PageIntro>

      <div className="mx-auto flex max-w-[1360px] flex-wrap gap-14 px-5 pb-12 text-[17px] leading-[1.7] md:px-10 md:pb-[120px] md:text-[18px]">
        <div className="flex max-w-[720px] min-w-0 flex-[999_1_640px] flex-col gap-[22px]">
          <h2 className={h2}>Où et comment</h2>
          <ul className="m-0 flex list-disc flex-col gap-2 pl-6 marker:text-accent">
            {procedure.how.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <h2 className={`${h2} mt-4`}>Pièces à fournir</h2>
          <ul className="m-0 flex list-disc flex-col gap-2 pl-6 marker:text-accent">
            {procedure.pieces.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <h2 className={`${h2} mt-4`}>Délais</h2>
          <p>{procedure.delay}</p>
        </div>

        <aside aria-label="En bref" className="flex max-w-[380px] flex-[1_1_300px] flex-col gap-3.5 self-start rounded-[22px] bg-accent p-7 text-[16px] leading-normal text-white">
          <strong className="font-display text-[22px]">En bref</strong>
          <dl className="flex flex-col gap-3">
            <div>
              <dt className="text-[14px] text-on-accent-muted">Où ?</dt>
              <dd>{procedure.where}</dd>
            </div>
            <div>
              <dt className="text-[14px] text-on-accent-muted">Thème</dt>
              <dd>{procedure.theme}</dd>
            </div>
            <div>
              <dt className="text-[14px] text-on-accent-muted">Délai</dt>
              <dd>{procedure.delay}</dd>
            </div>
          </dl>
          <a
            href={site.phoneHref}
            className="mt-1.5 flex h-12 items-center justify-center rounded-full bg-white font-semibold text-ink no-underline hover:bg-white-hover"
          >
            {site.phone}
          </a>
        </aside>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="h-liees" className="mx-auto max-w-[1360px] px-5 pb-16 md:px-10 md:pb-[120px]">
          <h2 id="h-liees" className="mb-6 font-display text-[30px] font-bold tracking-[-0.03em] md:mb-9 md:text-[44px]">
            Démarches liées
          </h2>
          <ProcedureList items={related} />
        </section>
      )}
    </SiteFrame>
  );
}
