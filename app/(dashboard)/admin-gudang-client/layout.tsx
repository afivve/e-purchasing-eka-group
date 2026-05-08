import { DashboardShell } from "@/components/layouts/DashboardShell";

export default function AdminGudangClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell roleId="admin_gudang_client">{children}</DashboardShell>
  );
}
