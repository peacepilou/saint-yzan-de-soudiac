import type { Metadata } from "next";
import { AlertEditor } from "@/components/admin/AlertEditor";

export const metadata: Metadata = { title: "Bandeau « À savoir »" };

export default function BandeauPage() {
  return <AlertEditor />;
}
