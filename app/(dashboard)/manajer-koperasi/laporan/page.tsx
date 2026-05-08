import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export default function LaporanPage() {
  return (
    <PlaceholderPage
      title="Laporan"
      description="Laporan rekapitulasi pembelian, pengiriman, dan pengeluaran koperasi per periode."
      iconName="bar-chart-3"
      stats={[
        { label: "Laporan Bulan Ini", value: 0, iconName: "bar-chart-3" },
        { label: "Total Transaksi", value: 0, iconName: "file-text" },
        { label: "Nilai Pembelian", value: "Rp 0", iconName: "bar-chart-3" },
      ]}
    />
  );
}
