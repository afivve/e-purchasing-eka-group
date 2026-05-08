import type { IncomingShipment } from '@/types'

export const MOCK_INCOMING_SHIPMENTS: IncomingShipment[] = [
    // ─── Diterima 7 Mei — UD Maju Bersama (beras + bumbu dasar) ──────────────
    {
        id: 'inc-001',
        code: 'DO/UD-MB/2026/05/047',
        supplierId: 'sup-001',
        supplierName: 'UD Maju Bersama',
        deliveryDate: '2026-05-07',
        status: 'received',
        receivedBy: 'Pak Doni',
        note: 'Semua barang diterima dalam kondisi baik.',
        createdAt: '2026-05-07T07:30:00',
        items: [
            { id: 'inc-001-1', ingredientId: 'ing-001', ingredientName: 'Beras Putih', unit: 'kg', orderedQty: 100, receivedQty: 100, isChecked: true, note: '' },
            { id: 'inc-001-2', ingredientId: 'ing-002', ingredientName: 'Beras Merah', unit: 'kg', orderedQty: 50, receivedQty: 50, isChecked: true, note: '' },
            { id: 'inc-001-3', ingredientId: 'ing-051', ingredientName: 'Garam Halus', unit: 'kg', orderedQty: 10, receivedQty: 10, isChecked: true, note: '' },
            { id: 'inc-001-4', ingredientId: 'ing-052', ingredientName: 'Gula Pasir', unit: 'kg', orderedQty: 20, receivedQty: 20, isChecked: true, note: '' },
        ],
    },

    // ─── Diterima sebagian 7 Mei — CV Protein Segar (ayam + telur) ───────────
    {
        id: 'inc-002',
        code: 'DO/CV-PS/2026/05/033',
        supplierId: 'sup-002',
        supplierName: 'CV Protein Segar',
        deliveryDate: '2026-05-07',
        status: 'partial',
        receivedBy: 'Pak Doni',
        note: 'Telur ada yang pecah, sudah dicatat selisih.',
        createdAt: '2026-05-07T08:15:00',
        items: [
            { id: 'inc-002-1', ingredientId: 'ing-006', ingredientName: 'Ayam Broiler', unit: 'kg', orderedQty: 40, receivedQty: 40, isChecked: true, note: '' },
            { id: 'inc-002-2', ingredientId: 'ing-007', ingredientName: 'Ayam Kampung', unit: 'kg', orderedQty: 20, receivedQty: 18, isChecked: true, note: '2 kg tidak layak, kembalikan ke supplier' },
            { id: 'inc-002-3', ingredientId: 'ing-011', ingredientName: 'Telur Ayam', unit: 'kg', orderedQty: 60, receivedQty: 55, isChecked: true, note: '5 kg pecah saat pengiriman' },
        ],
    },

    // ─── Sedang diperiksa 8 Mei — PT Bumi Agro (sayuran + bumbu segar) ───────
    {
        id: 'inc-003',
        code: 'DO/PT-BA/2026/05/019',
        supplierId: 'sup-004',
        supplierName: 'PT Bumi Agro Nusantara',
        deliveryDate: '2026-05-08',
        status: 'inspecting',
        receivedBy: null,
        note: '',
        createdAt: '2026-05-08T06:45:00',
        items: [
            { id: 'inc-003-1', ingredientId: 'ing-018', ingredientName: 'Bawang Merah', unit: 'kg', orderedQty: 15, receivedQty: 15, isChecked: true, note: '' },
            { id: 'inc-003-2', ingredientId: 'ing-019', ingredientName: 'Bawang Putih', unit: 'kg', orderedQty: 10, receivedQty: 10, isChecked: true, note: '' },
            { id: 'inc-003-3', ingredientId: 'ing-021', ingredientName: 'Cabai Merah Keriting', unit: 'kg', orderedQty: 8, receivedQty: 0, isChecked: false, note: '' },
            { id: 'inc-003-4', ingredientId: 'ing-031', ingredientName: 'Tomat Segar', unit: 'kg', orderedQty: 20, receivedQty: 0, isChecked: false, note: '' },
            { id: 'inc-003-5', ingredientId: 'ing-032', ingredientName: 'Kentang', unit: 'kg', orderedQty: 30, receivedQty: 0, isChecked: false, note: '' },
        ],
    },

    // ─── Menunggu pemeriksaan 8 Mei — PT Prima Daging ────────────────────────
    {
        id: 'inc-004',
        code: 'DO/PT-PD/2026/05/011',
        supplierId: 'sup-003',
        supplierName: 'PT Prima Daging',
        deliveryDate: '2026-05-08',
        status: 'pending',
        receivedBy: null,
        note: '',
        createdAt: '2026-05-08T07:00:00',
        items: [
            { id: 'inc-004-1', ingredientId: 'ing-008', ingredientName: 'Daging Sapi Murni', unit: 'kg', orderedQty: 25, receivedQty: 0, isChecked: false, note: '' },
        ],
    },

    // ─── Menunggu pemeriksaan 8 Mei — UD Sari Tahu & Tempe (tahu + tempe) ────
    {
        id: 'inc-005',
        code: 'DO/UD-ST/2026/05/022',
        supplierId: 'sup-006',
        supplierName: 'UD Sari Tahu & Tempe Bogor',
        deliveryDate: '2026-05-08',
        status: 'pending',
        receivedBy: null,
        note: '',
        createdAt: '2026-05-08T07:30:00',
        items: [
            { id: 'inc-005-1', ingredientId: 'ing-016', ingredientName: 'Tahu Putih', unit: 'pcs', orderedQty: 100, receivedQty: 0, isChecked: false, note: '' },
            { id: 'inc-005-2', ingredientId: 'ing-017', ingredientName: 'Tempe', unit: 'potong', orderedQty: 60, receivedQty: 0, isChecked: false, note: '' },
        ],
    },

    // ─── Menunggu pemeriksaan 8 Mei — PT Indo Palm & Food ────────────────────
    {
        id: 'inc-006',
        code: 'DO/PT-IPF/2026/05/008',
        supplierId: 'sup-007',
        supplierName: 'PT Indo Palm & Food',
        deliveryDate: '2026-05-08',
        status: 'pending',
        receivedBy: null,
        note: '',
        createdAt: '2026-05-08T08:00:00',
        items: [
            { id: 'inc-006-1', ingredientId: 'ing-040', ingredientName: 'Santan Kelapa', unit: 'liter', orderedQty: 20, receivedQty: 0, isChecked: false, note: '' },
            { id: 'inc-006-2', ingredientId: 'ing-041', ingredientName: 'Minyak Goreng', unit: 'liter', orderedQty: 30, receivedQty: 0, isChecked: false, note: '' },
            { id: 'inc-006-3', ingredientId: 'ing-043', ingredientName: 'Kecap Manis', unit: 'botol', orderedQty: 10, receivedQty: 0, isChecked: false, note: '' },
            { id: 'inc-006-4', ingredientId: 'ing-045', ingredientName: 'Saus Tiram', unit: 'botol', orderedQty: 8, receivedQty: 0, isChecked: false, note: '' },
        ],
    },
]
