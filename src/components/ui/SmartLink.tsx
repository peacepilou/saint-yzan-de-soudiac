import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type SmartLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & { href: string };

/** `next/link` pour les routes internes, `<a>` pour les fichiers, liens externes, tel: et mailto:. */
export function SmartLink({ href, ...props }: SmartLinkProps) {
  if (href.startsWith("/") && !href.endsWith(".pdf")) {
    return <Link href={href} {...props} />;
  }
  return <a href={href} {...props} />;
}
