import { DashboardShell } from "@/components/layouts/DashboardShell";

export default function ManajerKoperasiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell roleId="manajer_koperasi">{children}</DashboardShell>;
}
