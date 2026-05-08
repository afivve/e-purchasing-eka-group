import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export default function SupplierPage() {
  return (
    <PlaceholderPage
      title="Manajemen Supplier"
      description="Tambah, edit, dan kelola data supplier — nama, kontak, jenis bahan baku, dan syarat pembayaran."
      iconName="building-2"
      stats={[
        { label: "Total Supplier", value: 0, iconName: "building-2" },
        { label: "Supplier Aktif", value: 0, iconName: "building-2" },
        { label: "Supplier Baru", value: 0, iconName: "building-2" },
      ]}
    />
  );
}
