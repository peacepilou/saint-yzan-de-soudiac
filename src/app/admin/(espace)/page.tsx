import type { Metadata } from "next";
import { Dashboard } from "@/components/admin/Dashboard";

export const metadata: Metadata = { title: "Tableau de bord" };

export default function AdminHomePage() {
  return <Dashboard />;
}
