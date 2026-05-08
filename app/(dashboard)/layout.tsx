/**
 * (dashboard) route group layout.
 * This is intentionally a passthrough — visual layout is handled
 * per-role via nested layouts (DashboardShell) or the existing
 * DashboardView (admin-client).
 */
export default function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
