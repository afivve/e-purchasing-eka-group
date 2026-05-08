import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export default function UsersPage() {
  return (
    <PlaceholderPage
      title="Manajemen Pengguna"
      description="Kelola akun pengguna sistem purchasing — role, akses, dan status aktif akun."
      iconName="users"
      stats={[
        { label: "Total Pengguna", value: 0, iconName: "users" },
        { label: "Pengguna Aktif", value: 0, iconName: "users" },
        { label: "Pending Verifikasi", value: 0, iconName: "users" },
      ]}
    />
  );
}
