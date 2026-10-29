import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { PageHero } from "@/components/sections/Hero";
import { RubriqueToc } from "@/components/sections/RubriqueToc";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/icons";
import { SmartLink } from "@/components/ui/SmartLink";
import { photos } from "@/data/photos";
import { getRubrique, rubriques } from "@/data/rubriques";
import type { RubriqueSection } from "@/lib/types";
import { cn } from "@/lib/utils";
import { LinkArrow } from "@/components/ui/LinkArrow";

export function generateStaticParams() {
  return rubriques.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps<"/vivre-ici/[slug]">): Promise<Metadata> {
  const rubrique = getRubrique((await params).slug);
  return { title: rubrique?.title ?? "Vivre ici", description: rubrique?.lead };
}

const h2 = "font-display text-[30px] font-bold tracking-[-0.03em] md:text-[40px]";

function Section({ section }: { section: RubriqueSection }) {
  switch (section.kind) {
    case "facts":
      return (
        <section id={section.id} aria-labelledby={`h-${section.id}`} className="flex flex-col gap-5">
          <h2 id={`h-${section.id}`} className={h2}>
            {section.title}
          </h2>
          <p className="text-[17px] text-text md:text-[18px]">{section.text}</p>
          <dl className="mt-2 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] border-t border-line">
            {section.facts.map((f) => (
              <div key={f.label} className="border-b border-line py-[18px]">
                <dt className="text-[14px] text-muted">{f.label}</dt>
                <dd className="mt-1 font-semibold">{f.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      );
    case "tiles":
      return (
        <section id={section.id} aria-labelledby={`h-${section.id}`} className="flex flex-col gap-5">
          <h2 id={`h-${section.id}`} className={h2}>
            {section.title}
          </h2>
          <p className="text-[17px] text-text md:text-[18px]">{section.text}</p>
          <dl className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
            {section.tiles.map((t) => (
              <div key={t.label} className="flex flex-col gap-1.5 rounded-[18px] bg-surface p-6">
                <dt className="text-[14px] text-muted">{t.label}</dt>
                <dd className="font-display text-[22px] font-bold">{t.value}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap gap-3">
            {section.docs.map((d) => (
              <Button key={d.label} href={d.href} variant="outline-soft" size={46} className="px-5 text-[15px]">
                <Icon name="download" size={16} strokeWidth={2} />
                {d.label}
              </Button>
            ))}
          </div>
        </section>
      );
    case "cards": {
      const cards = (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-4">
          {section.cards.map((c) => (
            <SmartLink
              key={c.title}
              id={c.id}
              href={c.href}
              className="flex flex-col gap-2.5 rounded-[20px] border border-line p-7 text-ink no-underline hover:brightness-[.96]"
            >
              <strong className="font-display text-[22px]">{c.title}</strong>
              <span className="text-[16px] text-muted">{c.text}</span>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-2 font-semibold text-accent">
                {c.cta}
                <LinkArrow />
              </span>
            </SmartLink>
          ))}
        </div>
      );
      if (!section.title) return <section aria-label={section.label}>{cards}</section>;
      return (
        <section id={section.id} aria-labelledby={`h-${section.id}`} className="flex flex-col gap-5">
          <h2 id={`h-${section.id}`} className={h2}>
            {section.title}
          </h2>
          {cards}
        </section>
      );
    }
    case "feature":
      return (
        <section
          id={section.id}
          aria-labelledby={`h-${section.id}`}
          className="flex flex-wrap items-center gap-8 rounded-[24px] bg-surface p-6 md:p-8"
        >
          {section.img && (
            <div className="relative h-[220px] min-w-0 flex-[1_1_260px] overflow-hidden rounded-2xl">
              <Image
                src={photos[section.img].src}
                alt=""
                fill
                sizes="(min-width: 768px) 30vw, 100vw"
                className={cn("object-cover", section.img === "lac" && "grayscale")}
              />
            </div>
          )}
          <div className="flex flex-[1_1_320px] flex-col gap-3">
            <h2 id={`h-${section.id}`} className="font-display text-[26px] font-bold tracking-[-0.02em] md:text-[30px]">
              {section.title}
            </h2>
            <p className="text-text">{section.text}</p>
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {section.links.map((l) => (
                <li key={l.href}>
                  <SmartLink href={l.href} className="font-semibold link-hover">
                    {l.label}
                    <LinkArrow external={l.href.startsWith("http")} className="ml-1.5 align-[-3px]" />
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
        </section>
      );
  }
}

export default async function RubriquePage({ params }: PageProps<"/vivre-ici/[slug]">) {
  const { slug } = await params;
  const rubrique = getRubrique(slug);
  if (!rubrique) notFound();
  const photo = photos[rubrique.hero.img];
  const credit = `${photo.subject} · ${photo.credit === "domaine public" ? "domaine public" : `photo ${photo.credit}`}`;

  return (
    <SiteFrame header={{ variant: "overlay", current: "vivre" }}>
      <PageHero
        img={rubrique.hero.img}
        alt={rubrique.hero.alt}
        position={rubrique.hero.position}
        grayscale={rubrique.hero.grayscale}
        height="md:h-[720px]"
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Vivre ici" }, { label: rubrique.title }]}
        title={rubrique.titleLines.map((line, i) => (
          <span key={line}>
            {i > 0 && <br />}
            {line}
          </span>
        ))}
        lead={rubrique.lead}
        credit={credit}
      />

      <Container as="section" size="narrow" aria-label="Démarche principale" className="pt-8 md:pt-12">
        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-5 rounded-[24px] bg-accent px-6 py-7 text-white md:px-10 md:py-8">
          <div className="flex flex-[1_1_420px] flex-col gap-1.5">
            <Eyebrow as="span" tone="dark">
              Démarche
            </Eyebrow>
            <strong className="font-display text-[24px] tracking-[-0.02em] md:text-[30px]">{rubrique.action.title}</strong>
            <span className="text-on-accent">{rubrique.action.text}</span>
          </div>
          <Button href={rubrique.action.href} variant="white" size={52}>
            {rubrique.action.cta}
            <LinkArrow />
          </Button>
        </div>
      </Container>

      <Container size="narrow" className="flex flex-wrap gap-14 py-12 md:py-24">
        <RubriqueToc items={rubrique.toc} />
        <div className="flex min-w-0 flex-[999_1_640px] flex-col gap-14 md:gap-[72px]">
          {rubrique.sections.map((section, i) => (
            <Section key={i} section={section} />
          ))}
          <p className="text-[14px] text-muted">
            Page mise à jour le [date] · Une information est inexacte ?{" "}
            <Link href="/contact" className="link-hover">
              Signalez-la
            </Link>
          </p>
        </div>
      </Container>
    </SiteFrame>
  );
}
