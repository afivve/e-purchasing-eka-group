import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export default function InvoicePage() {
  return (
    <PlaceholderPage
      title="Invoice Pembelian"
      description="Buat, kelola, dan verifikasi invoice pembelian bahan baku dari supplier."
      iconName="file-text"
      stats={[
        { label: "Invoice Baru", value: 0, iconName: "file-text" },
        { label: "Menunggu Approval", value: 0, iconName: "file-text" },
        { label: "Disetujui", value: 0, iconName: "file-text" },
      ]}
    />
  );
}
