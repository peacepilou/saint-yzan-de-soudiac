import type { Metadata } from "next";
import { ResourceTable } from "@/components/admin/ResourceTable";
import { getResource } from "@/lib/admin/resources";

export const metadata: Metadata = { title: getResource("actualites")!.label };

export default function AdminActualitesPage() {
  return <ResourceTable slug="actualites" />;
}
