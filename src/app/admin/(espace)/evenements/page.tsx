import type { Metadata } from "next";
import { ResourceTable } from "@/components/admin/ResourceTable";
import { getResource } from "@/lib/admin/resources";

export const metadata: Metadata = { title: getResource("evenements")!.label };

export default function AdminEvenementsPage() {
  return <ResourceTable slug="evenements" />;
}
