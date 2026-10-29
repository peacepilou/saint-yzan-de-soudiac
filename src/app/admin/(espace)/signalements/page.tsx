import type { Metadata } from "next";
import { ResourceTable } from "@/components/admin/ResourceTable";
import { getResource } from "@/lib/admin/resources";

export const metadata: Metadata = { title: getResource("signalements")!.label };

export default function AdminSignalementsPage() {
  return <ResourceTable slug="signalements" />;
}
