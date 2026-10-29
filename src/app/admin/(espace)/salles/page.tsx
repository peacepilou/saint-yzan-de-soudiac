import type { Metadata } from "next";
import { ResourceTable } from "@/components/admin/ResourceTable";
import { getResource } from "@/lib/admin/resources";

export const metadata: Metadata = { title: getResource("salles")!.label };

export default function AdminSallesPage() {
  return <ResourceTable slug="salles" />;
}
