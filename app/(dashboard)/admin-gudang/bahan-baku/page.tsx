import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export default function BahanBakuPage() {
  return (
    <PlaceholderPage
      title="Stok Bahan Baku"
      description="Manajemen stok bahan baku di gudang koperasi — saldo masuk, keluar, dan posisi stok terkini."
      iconName="package"
      stats={[
        { label: "Total Item", value: 0, iconName: "package" },
        { label: "Stok Menipis", value: 0, iconName: "package" },
        { label: "Mutasi Hari Ini", value: 0, iconName: "package" },
      ]}
    />
  );
}
