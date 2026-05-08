import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export default function BahanBakuPage() {
  return (
    <PlaceholderPage
      title="Bahan Baku"
      description="Kelola daftar dan stok bahan baku yang tersedia di gudang client. Pantau ketersediaan per item."
      iconName="package"
      stats={[
        { label: "Total Item", value: 0, iconName: "package" },
        { label: "Stok Menipis", value: 0, iconName: "package" },
        { label: "Habis", value: 0, iconName: "package" },
      ]}
    />
  );
}
