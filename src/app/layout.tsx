import type { Metadata } from "next";
import localFont from "next/font/local";
import { SkipLink } from "@/components/layout/SkipLink";
import "./globals.css";

// Polices auto-hébergées (variables, sous-ensemble latin, licence SIL OFL) : aucun appel à Google au build ni au chargement.
const schibsted = localFont({
  src: "./fonts/schibsted-grotesk-latin.woff2",
  variable: "--font-schibsted",
  weight: "400 900",
  display: "swap",
});

const hanken = localFont({
  src: "./fonts/hanken-grotesk-latin.woff2",
  variable: "--font-hanken",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Accueil — Saint-Yzan-de-Soudiac",
    template: "%s — Saint-Yzan-de-Soudiac",
  },
  description:
    "Site officiel de la mairie de Saint-Yzan-de-Soudiac (Gironde) : démarches, actualités, agenda, vie municipale.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${schibsted.variable} ${hanken.variable} antialiased`}>
      <body>
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
