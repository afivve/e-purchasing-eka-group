import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export default function AdminGudangClientDashboardPage() {
  return (
    <PlaceholderPage
      title="Dashboard Gudang Client"
      description="Ringkasan aktivitas penerimaan dan stok bahan baku di gudang client."
      iconName="layout-dashboard"
      stats={[
        { label: "Pengiriman Aktif", value: 0, iconName: "truck" },
        { label: "Bahan Baku", value: 0, iconName: "package" },
        { label: "Selesai Hari Ini", value: 0, iconName: "layout-dashboard" },
      ]}
    />
  );
}
