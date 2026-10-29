import type { Metadata } from "next";
import { ResourceTable } from "@/components/admin/ResourceTable";
import { getResource } from "@/lib/admin/resources";

export const metadata: Metadata = { title: getResource("documents")!.label };

export default function AdminDocumentsPage() {
  return <ResourceTable slug="documents" />;
}
