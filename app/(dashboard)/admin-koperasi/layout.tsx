import { DashboardShell } from "@/components/layouts/DashboardShell";

export default function AdminKoperasiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell roleId="admin_koperasi">{children}</DashboardShell>;
}
