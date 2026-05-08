import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export default function SupplierPage() {
  return (
    <PlaceholderPage
      title="Supplier Gudang"
      description="Daftar supplier yang mengirimkan bahan baku ke gudang koperasi beserta jadwal pengiriman reguler."
      iconName="building-2"
      stats={[
        { label: "Supplier Terdaftar", value: 0, iconName: "building-2" },
        { label: "Jadwal Hari Ini", value: 0, iconName: "truck" },
        { label: "Pengiriman Bulan Ini", value: 0, iconName: "truck" },
      ]}
    />
  );
}
