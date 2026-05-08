import type { Client } from '@/types'

/**
 * Mock client data — institutions served by Koperasi Eka Group.
 * RS Eka Hospital Cibubur (cli-001) maps to the existing mock packages/menus.
 */
export const MOCK_CLIENTS: Client[] = [
    {
        id: 'cli-001',
        name: 'RS Eka Hospital Cibubur',
        address: 'Jl. Transyogi No.168, Cibubur, Ciracas, Jakarta Timur 13720',
        kepalaSppiId: 'usr-002',
        akuntanClientId: 'usr-003',
        ahliGiziId: 'usr-004',
        activeMenuCount: 5,
        weeklyDeliveryProgress: 14,
        operationalStatus: 'active',
    },
    {
        id: 'cli-002',
        name: 'RS Hermina Depok',
        address: 'Jl. Raya Siliwangi No.50, Pancoran Mas, Depok, Jawa Barat 16436',
        kepalaSppiId: 'usr-005',
        akuntanClientId: 'usr-006',
        ahliGiziId: 'usr-007',
        activeMenuCount: 7,
        weeklyDeliveryProgress: 71,
        operationalStatus: 'active',
    },
    {
        id: 'cli-003',
        name: 'Panti Asuhan Pelita Harapan',
        address: 'Jl. Kebon Jeruk Raya No.11, Kebon Jeruk, Jakarta Barat 11530',
        kepalaSppiId: 'usr-008',
        akuntanClientId: 'usr-009',
        ahliGiziId: 'usr-010',
        activeMenuCount: 3,
        weeklyDeliveryProgress: 100,
        operationalStatus: 'active',
    },
    {
        id: 'cli-004',
        name: 'RSUD Kota Bekasi',
        address: 'Jl. Pramuka No.55, Margahayu, Bekasi Timur, Kota Bekasi 17113',
        kepalaSppiId: 'usr-011',
        akuntanClientId: 'usr-012',
        ahliGiziId: 'usr-013',
        activeMenuCount: 6,
        weeklyDeliveryProgress: 43,
        operationalStatus: 'active',
    },
    {
        id: 'cli-005',
        name: 'Pondok Pesantren Al-Hikmah',
        address: 'Jl. Raya Parung Km.42, Bogor, Jawa Barat 16330',
        kepalaSppiId: 'usr-014',
        akuntanClientId: 'usr-015',
        ahliGiziId: 'usr-015',
        activeMenuCount: 0,
        weeklyDeliveryProgress: 0,
        operationalStatus: 'inactive',
    },
]
