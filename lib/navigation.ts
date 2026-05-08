import type { RoleId, RoleConfig } from '@/types/navigation'

export const ROLE_CONFIGS: Record<RoleId, RoleConfig> = {
    admin_client: {
        id: 'admin_client',
        label: 'Admin Client',
        shortLabel: 'Admin Client',
        homeHref: '/admin-client',
        accentClass: 'bg-blue-600',
        navItems: [
            {
                id: 'dashboard',
                label: 'Paket Mingguan',
                href: '/admin-client',
                iconName: 'calendar-days',
                description: 'Kelola paket mingguan dan menu harian',
            },
        ],
    },

    admin_gudang_client: {
        id: 'admin_gudang_client',
        label: 'Admin Gudang Client',
        shortLabel: 'Gudang Client',
        homeHref: '/admin-gudang-client',
        accentClass: 'bg-teal-600',
        navItems: [
            {
                id: 'dashboard',
                label: 'Dashboard',
                href: '/admin-gudang-client',
                iconName: 'layout-dashboard',
                description: 'Ringkasan aktivitas gudang',
            },
            {
                id: 'pengiriman',
                label: 'Pengiriman',
                href: '/admin-gudang-client/pengiriman',
                iconName: 'truck',
                description: 'Monitor pengiriman bahan baku',
            },
            {
                id: 'bahan-baku',
                label: 'Bahan Baku',
                href: '/admin-gudang-client/bahan-baku',
                iconName: 'package',
                description: 'Kelola stok bahan baku',
            },
        ],
    },

    manajer_koperasi: {
        id: 'manajer_koperasi',
        label: 'Manajer Koperasi',
        shortLabel: 'Manajer',
        homeHref: '/manajer-koperasi',
        accentClass: 'bg-violet-600',
        navItems: [
            {
                id: 'dashboard',
                label: 'Dashboard',
                href: '/manajer-koperasi',
                iconName: 'layout-dashboard',
                description: 'Ringkasan operasional koperasi',
            },
            {
                id: 'client',
                label: 'Client',
                href: '/manajer-koperasi/client',
                iconName: 'store',
                description: 'Daftar dan monitoring client',
            },
            {
                id: 'kebutuhan-harian',
                label: 'Kebutuhan Harian',
                href: '/manajer-koperasi/kebutuhan-harian',
                iconName: 'clipboard-list',
                description: 'Kebutuhan bahan baku harian seluruh client',
            },
            {
                id: 'supplier',
                label: 'Supplier',
                href: '/manajer-koperasi/supplier',
                iconName: 'building-2',
                description: 'Manajemen data supplier',
            },
            {
                id: 'bahan-baku',
                label: 'Bahan Baku',
                href: '/manajer-koperasi/bahan-baku',
                iconName: 'package',
                description: 'Manajemen bahan baku',
            },
            {
                id: 'user-management',
                label: 'Pengguna',
                href: '/manajer-koperasi/user-management',
                iconName: 'user-cog',
                description: 'Manajemen pengguna sistem',
            },
        ],
    },

    admin_koperasi: {
        id: 'admin_koperasi',
        label: 'Admin Koperasi',
        shortLabel: 'Admin Koperasi',
        homeHref: '/admin-koperasi',
        accentClass: 'bg-orange-600',
        navItems: [
            {
                id: 'dashboard',
                label: 'Dashboard',
                href: '/admin-koperasi',
                iconName: 'layout-dashboard',
                description: 'Ringkasan operasional distribusi',
            },
            {
                id: 'kebutuhan-harian',
                label: 'Kebutuhan Harian',
                href: '/admin-koperasi/kebutuhan-harian',
                iconName: 'clipboard-list',
                description: 'Kebutuhan bahan baku harian',
            },
            {
                id: 'surat-jalan',
                label: 'Surat Jalan',
                href: '/admin-koperasi/surat-jalan',
                iconName: 'scroll-text',
                description: 'Buat dan kelola surat jalan',
            },
            {
                id: 'pengiriman',
                label: 'Pengiriman',
                href: '/admin-koperasi/pengiriman',
                iconName: 'truck',
                description: 'Monitor status pengiriman',
            },
            {
                id: 'export-kebutuhan',
                label: 'Export',
                href: '/admin-koperasi/export-kebutuhan',
                iconName: 'file-down',
                description: 'Export kebutuhan bahan baku',
            },
            {
                id: 'transportasi',
                label: 'Transportasi',
                href: '/admin-koperasi/transportasi',
                iconName: 'car',
                description: 'Permintaan dan jadwal kendaraan',
            },
        ],
    },

    admin_gudang: {
        id: 'admin_gudang',
        label: 'Admin Gudang',
        shortLabel: 'Admin Gudang',
        homeHref: '/admin-gudang',
        accentClass: 'bg-emerald-700',
        navItems: [
            {
                id: 'dashboard',
                label: 'Dashboard',
                href: '/admin-gudang',
                iconName: 'layout-dashboard',
                description: 'Ringkasan aktivitas gudang',
            },
            {
                id: 'stok-bahan-baku',
                label: 'Stok Bahan Baku',
                href: '/admin-gudang/stok-bahan-baku',
                iconName: 'package',
                description: 'Monitor stok real gudang',
            },
            {
                id: 'barang-datang',
                label: 'Barang Datang',
                href: '/admin-gudang/barang-datang',
                iconName: 'package-check',
                description: 'Checklist penerimaan barang dari supplier',
            },
            {
                id: 'pengiriman',
                label: 'Pengiriman',
                href: '/admin-gudang/pengiriman',
                iconName: 'truck',
                description: 'Monitor status pengiriman ke client',
            },
        ],
    },
}

export const ALL_ROLES: RoleId[] = [
    'admin_client',
    'admin_gudang_client',
    'manajer_koperasi',
    'admin_koperasi',
    'admin_gudang',
]

export function getRoleFromPathname(pathname: string): RoleId {
    if (pathname.startsWith('/admin-gudang-client')) return 'admin_gudang_client'
    if (pathname.startsWith('/manajer-koperasi')) return 'manajer_koperasi'
    if (pathname.startsWith('/admin-koperasi')) return 'admin_koperasi'
    if (pathname.startsWith('/admin-gudang')) return 'admin_gudang'
    return 'admin_client'
}
