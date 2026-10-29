import type { Metadata } from "next";
import { ResourceTable } from "@/components/admin/ResourceTable";
import { getResource } from "@/lib/admin/resources";

export const metadata: Metadata = { title: getResource("demarches")!.label };

export default function AdminDemarchesPage() {
  return <ResourceTable slug="demarches" />;
}
