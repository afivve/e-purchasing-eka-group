import { DashboardShell } from "@/components/layouts/DashboardShell";

export default function TransporterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell roleId="transporter">{children}</DashboardShell>;
}
