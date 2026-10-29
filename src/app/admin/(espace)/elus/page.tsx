import type { Metadata } from "next";
import { ResourceTable } from "@/components/admin/ResourceTable";
import { getResource } from "@/lib/admin/resources";

export const metadata: Metadata = { title: getResource("elus")!.label };

export default function AdminElusPage() {
  return <ResourceTable slug="elus" />;
}
