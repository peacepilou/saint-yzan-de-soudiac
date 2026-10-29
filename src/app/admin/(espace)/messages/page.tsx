import type { Metadata } from "next";
import { ResourceTable } from "@/components/admin/ResourceTable";
import { getResource } from "@/lib/admin/resources";

export const metadata: Metadata = { title: getResource("messages")!.label };

export default function AdminMessagesPage() {
  return <ResourceTable slug="messages" />;
}
