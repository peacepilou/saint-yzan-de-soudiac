import type { Metadata } from "next";
import { ResourceTable } from "@/components/admin/ResourceTable";
import { getResource } from "@/lib/admin/resources";

export const metadata: Metadata = { title: getResource("reservations")!.label };

export default function AdminReservationsPage() {
  return <ResourceTable slug="reservations" />;
}
