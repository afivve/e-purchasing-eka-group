import type { AppUser } from '@/types'

export const MOCK_APP_USERS: AppUser[] = [
    // Manajer Koperasi
    {
        id: 'usr-001',
        name: 'Bambang Supriyadi',
        email: 'bambang.s@eka-koperasi.co.id',
        phone: '0812-8800-1001',
        role: 'manajer_koperasi',
        clientId: null,
        isActive: true,
    },

    // Admin Client — RS Eka Hospital Cibubur
    {
        id: 'usr-002',
        name: 'Siti Rahayu Widodo',
        email: 'siti.r@eka-cibubur.co.id',
        phone: '0813-7701-2002',
        role: 'admin_client',
        clientId: 'cli-001',
        isActive: true,
    },
    // Akuntan — RS Eka Hospital Cibubur
    {
        id: 'usr-003',
        name: 'Hendra Gunawan',
        email: 'hendra.g@eka-cibubur.co.id',
        phone: '0856-5500-3003',
        role: 'admin_client',
        clientId: 'cli-001',
        isActive: true,
    },
    // Ahli Gizi — RS Eka Hospital Cibubur
    {
        id: 'usr-004',
        name: 'drg. Nita Kusumawati',
        email: 'nita.k@eka-cibubur.co.id',
        phone: '0878-6600-4004',
        role: 'admin_client',
        clientId: 'cli-001',
        isActive: true,
    },

    // Admin Client — RS Hermina Depok
    {
        id: 'usr-005',
        name: 'Agus Prasetyo',
        email: 'agus.p@hermina-depok.co.id',
        phone: '0812-1100-5005',
        role: 'admin_client',
        clientId: 'cli-002',
        isActive: true,
    },
    {
        id: 'usr-006',
        name: 'Dewi Lestari Santoso',
        email: 'dewi.l@hermina-depok.co.id',
        phone: '0821-3300-6006',
        role: 'admin_client',
        clientId: 'cli-002',
        isActive: true,
    },
    {
        id: 'usr-007',
        name: 'dr. Yusuf Hakim, M.Gz',
        email: 'yusuf.h@hermina-depok.co.id',
        phone: '0857-4400-7007',
        role: 'admin_client',
        clientId: 'cli-002',
        isActive: true,
    },

    // Admin Client — Panti Asuhan Pelita Harapan
    {
        id: 'usr-008',
        name: 'Maria Yulianty',
        email: 'maria.y@pelitaharapan.org',
        phone: '0815-2200-8008',
        role: 'admin_client',
        clientId: 'cli-003',
        isActive: true,
    },
    {
        id: 'usr-009',
        name: 'Johanes Kristian',
        email: 'johanes.k@pelitaharapan.org',
        phone: '0819-9900-9009',
        role: 'admin_client',
        clientId: 'cli-003',
        isActive: true,
    },
    {
        id: 'usr-010',
        name: 'Susanti Wulandari, S.Gz',
        email: 'susanti.w@pelitaharapan.org',
        phone: '0822-7700-1010',
        role: 'admin_client',
        clientId: 'cli-003',
        isActive: true,
    },

    // Admin Client — RSUD Kota Bekasi
    {
        id: 'usr-011',
        name: 'Budi Santoso',
        email: 'budi.s@rsud-bekasi.go.id',
        phone: '0812-5500-1011',
        role: 'admin_client',
        clientId: 'cli-004',
        isActive: true,
    },
    {
        id: 'usr-012',
        name: 'Sri Wahyuni',
        email: 'sri.w@rsud-bekasi.go.id',
        phone: '0856-4400-1012',
        role: 'admin_client',
        clientId: 'cli-004',
        isActive: true,
    },
    {
        id: 'usr-013',
        name: 'Rini Astuti, M.Gz',
        email: 'rini.a@rsud-bekasi.go.id',
        phone: '0878-3300-1013',
        role: 'admin_client',
        clientId: 'cli-004',
        isActive: true,
    },

    // Admin Client — Ponpes Al-Hikmah
    {
        id: 'usr-014',
        name: 'H. Fauzi Ridwan',
        email: 'fauzi.r@alhikmah.sch.id',
        phone: '0813-1100-1014',
        role: 'admin_client',
        clientId: 'cli-005',
        isActive: false,
    },
    {
        id: 'usr-015',
        name: 'Nurul Hidayah',
        email: 'nurul.h@alhikmah.sch.id',
        phone: '0812-0000-1015',
        role: 'admin_client',
        clientId: 'cli-005',
        isActive: false,
    },

    // Admin Koperasi
    {
        id: 'usr-016',
        name: 'Putri Andriani',
        email: 'putri.a@eka-koperasi.co.id',
        phone: '0821-8800-1016',
        role: 'admin_koperasi',
        clientId: null,
        isActive: true,
    },

    // Admin Gudang
    {
        id: 'usr-017',
        name: 'Wahyu Setiawan',
        email: 'wahyu.s@eka-koperasi.co.id',
        phone: '0812-2200-1017',
        role: 'admin_gudang',
        clientId: null,
        isActive: true,
    },

    // Admin Gudang Client — RS Eka Hospital Cibubur
    {
        id: 'usr-018',
        name: 'Supardi',
        email: 'supardi@eka-cibubur.co.id',
        phone: '0856-3300-1018',
        role: 'admin_gudang_client',
        clientId: 'cli-001',
        isActive: true,
    },
]
