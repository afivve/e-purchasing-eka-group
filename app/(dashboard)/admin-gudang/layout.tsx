import { DashboardShell } from "@/components/layouts/DashboardShell";

export default function AdminGudangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell roleId="admin_gudang">{children}</DashboardShell>;
}
