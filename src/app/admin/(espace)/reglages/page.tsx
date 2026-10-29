import type { Metadata } from "next";
import { SettingsEditor } from "@/components/admin/SettingsEditor";

export const metadata: Metadata = { title: "Mairie & démo" };

export default function ReglagesPage() {
  return <SettingsEditor />;
}
