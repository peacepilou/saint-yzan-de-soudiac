import type { Metadata } from "next";
import { Hanken_Grotesk, Schibsted_Grotesk } from "next/font/google";
import { SkipLink } from "@/components/layout/SkipLink";
import "./globals.css";

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
