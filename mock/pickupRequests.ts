import type { PickupRequest } from '@/types'

export const MOCK_PICKUP_REQUESTS: PickupRequest[] = [
    {
        id: 'pkp-001',
        departureDateTime: '2026-05-15T07:00',
        destinations: [
            {
                id: 'pkp-001-d1',
                place: 'Pasar Induk Bekasi',
                items: 'Ayam broiler 30 kg, Telur ayam 5 kg',
            },
            {
                id: 'pkp-001-d2',
                place: 'UD Maju Bersama',
                items: 'Beras putih 50 kg, Tepung terigu 20 kg',
            },
        ],
        driverName: 'Budi Santoso',
        vehicleType: 'Pickup Engkel',
        vehicleNo: 'B 1234 KOP',
        status: 'confirmed',
        note: 'Ambil pagi sebelum jam 9',
    },
    {
        id: 'pkp-002',
        departureDateTime: '2026-05-15T13:00',
        destinations: [
            {
                id: 'pkp-002-d1',
                place: 'CV Protein Segar',
                items: 'Daging sapi 15 kg, Ikan kakap 10 kg',
            },
        ],
        driverName: 'Agus Wijaya',
        vehicleType: 'Motor Kurir',
        vehicleNo: 'B 5678 KOP',
        status: 'pending',
        note: '',
    },
    {
        id: 'pkp-003',
        departureDateTime: '2026-05-16T08:30',
        destinations: [
            {
                id: 'pkp-003-d1',
                place: 'Pasar Tambun',
                items: 'Sayuran segar (wortel, bayam, kangkung) 25 kg',
            },
            {
                id: 'pkp-003-d2',
                place: 'Toko Bumbu Nusantara',
                items: 'Bumbu dapur set 10 kg, Santan 5 liter',
            },
        ],
        driverName: '',
        vehicleType: 'Pickup Engkel',
        vehicleNo: '',
        status: 'pending',
        note: 'Jadwal pickup untuk RS Eka',
    },
]
