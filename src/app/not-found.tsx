import type { Metadata } from "next";
import Form from "next/form";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { TopProcedures } from "@/components/sections/TopProcedures";
import { Icon } from "@/components/ui/icons";
import { type } from "@/lib/styles";

export const metadata: Metadata = { title: "Page introuvable" };

export default function NotFound() {
  return (
    <SiteFrame header={{ variant: "solid" }}>
      <div className="mx-auto flex max-w-[920px] flex-col gap-8 px-5 py-12 md:px-10 md:py-[104px]">
        <h1 className={type.h1Article}>Page introuvable</h1>
        <p className="text-[19px] text-text md:text-[22px]">
          La page demandée n&apos;existe pas ou a été déplacée. Faites une recherche ou choisissez l&apos;une des démarches ci-dessous.
        </p>
        <Form
          action="/recherche"
          role="search"
          aria-label="Rechercher sur le site"
          className="flex max-w-[680px] items-center gap-2 rounded-full border border-line-strong py-1 pr-1 pl-5 focus-within:shadow-[0_0_0_3px_var(--color-focus)] md:py-2 md:pr-2"
        >
          <label htmlFor="q-404" className="sr-only">
            Rechercher sur le site
          </label>
          <Icon name="search" size={20} strokeWidth={2} className="flex-none text-muted" />
          <input
            id="q-404"
            name="q"
            type="search"
            placeholder="Cantine, salle, PLU…"
            className="h-12 min-w-0 flex-auto border-0 bg-transparent font-[inherit] outline-none focus-visible:outline-none"
          />
          <button
            type="submit"
            className="h-[46px] cursor-pointer rounded-full border-0 bg-accent px-5 font-[inherit] font-semibold text-white hover:bg-accent-hover md:h-[52px] md:px-[26px]"
          >
            Rechercher
          </button>
        </Form>
        <TopProcedures />
      </div>
    </SiteFrame>
  );
}
