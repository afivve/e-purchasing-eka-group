import type { DailyNeed } from '@/types'

/**
 * Daily needs for 2026-05-07 (H-1 from today May 8) and May 8.
 * Covers multiple clients for manajer monitoring view.
 */
export const MOCK_DAILY_NEEDS: DailyNeed[] = [
    // ─── RS Eka Hospital Cibubur — May 7 (selesai) ──────────────────────────────
    {
        id: 'dn-001',
        clientId: 'cli-001',
        clientName: 'RS Eka Hospital Cibubur',
        menuName: 'Ayam Goreng Kremes + Nasi Putih',
        deliveryDate: '2026-05-07',
        portionCount: 120,
        deliveryStatus: 'complete',
        paymentStatus: 'unpaid',
        ingredients: [
            { id: 'dni-001-1', ingredientId: 'ing-006', ingredientName: 'Ayam Broiler', unit: 'kg', quantity: 15, supplierId: 'sup-002', supplierName: 'CV Protein Segar', deliveryStatus: 'complete' },
            { id: 'dni-001-2', ingredientId: 'ing-001', ingredientName: 'Beras Putih', unit: 'kg', quantity: 12, supplierId: 'sup-001', supplierName: 'UD Maju Bersama', deliveryStatus: 'complete' },
            { id: 'dni-001-3', ingredientId: 'ing-041', ingredientName: 'Minyak Goreng', unit: 'liter', quantity: 3, supplierId: 'sup-007', supplierName: 'PT Indo Palm & Food', deliveryStatus: 'complete' },
            { id: 'dni-001-4', ingredientId: 'ing-019', ingredientName: 'Bawang Putih', unit: 'kg', quantity: 0.5, supplierId: 'sup-004', supplierName: 'PT Bumi Agro Nusantara', deliveryStatus: 'complete' },
        ],
    },

    // ─── RS Hermina Depok — May 7 ───────────────────────────────────────────────
    {
        id: 'dn-002',
        clientId: 'cli-002',
        clientName: 'RS Hermina Depok',
        menuName: 'Sop Iga Sapi + Nasi Merah',
        deliveryDate: '2026-05-07',
        portionCount: 180,
        deliveryStatus: 'partial',
        paymentStatus: 'unpaid',
        ingredients: [
            { id: 'dni-002-1', ingredientId: 'ing-010', ingredientName: 'Daging Iga Sapi', unit: 'kg', quantity: 22, supplierId: 'sup-003', supplierName: 'PT Prima Daging', deliveryStatus: 'partial' },
            { id: 'dni-002-2', ingredientId: 'ing-002', ingredientName: 'Beras Merah', unit: 'kg', quantity: 18, supplierId: 'sup-001', supplierName: 'UD Maju Bersama', deliveryStatus: 'complete' },
            { id: 'dni-002-3', ingredientId: 'ing-032', ingredientName: 'Kentang', unit: 'kg', quantity: 10, supplierId: 'sup-004', supplierName: 'PT Bumi Agro Nusantara', deliveryStatus: 'complete' },
            { id: 'dni-002-4', ingredientId: 'ing-033', ingredientName: 'Wortel', unit: 'kg', quantity: 8, supplierId: 'sup-004', supplierName: 'PT Bumi Agro Nusantara', deliveryStatus: 'complete' },
        ],
    },

    // ─── Panti Asuhan Pelita Harapan — May 7 ────────────────────────────────────
    {
        id: 'dn-003',
        clientId: 'cli-003',
        clientName: 'Panti Asuhan Pelita Harapan',
        menuName: 'Nasi Goreng Telur + Tempe Orek',
        deliveryDate: '2026-05-07',
        portionCount: 60,
        deliveryStatus: 'complete',
        paymentStatus: 'paid',
        ingredients: [
            { id: 'dni-003-1', ingredientId: 'ing-001', ingredientName: 'Beras Putih', unit: 'kg', quantity: 6, supplierId: 'sup-001', supplierName: 'UD Maju Bersama', deliveryStatus: 'complete' },
            { id: 'dni-003-2', ingredientId: 'ing-011', ingredientName: 'Telur Ayam', unit: 'kg', quantity: 4, supplierId: 'sup-002', supplierName: 'CV Protein Segar', deliveryStatus: 'complete' },
            { id: 'dni-003-3', ingredientId: 'ing-017', ingredientName: 'Tempe', unit: 'potong', quantity: 30, supplierId: 'sup-006', supplierName: 'UD Sari Tahu & Tempe Bogor', deliveryStatus: 'complete' },
            { id: 'dni-003-4', ingredientId: 'ing-043', ingredientName: 'Kecap Manis', unit: 'botol', quantity: 2, supplierId: 'sup-007', supplierName: 'PT Indo Palm & Food', deliveryStatus: 'complete' },
        ],
    },

    // ─── RSUD Kota Bekasi — May 7 (belum terjadwal) ─────────────────────────────
    {
        id: 'dn-004',
        clientId: 'cli-004',
        clientName: 'RSUD Kota Bekasi',
        menuName: 'Capcay Seafood + Nasi Putih',
        deliveryDate: '2026-05-07',
        portionCount: 200,
        deliveryStatus: 'in_process',
        paymentStatus: 'unpaid',
        ingredients: [
            { id: 'dni-004-1', ingredientId: 'ing-012', ingredientName: 'Udang Segar', unit: 'kg', quantity: 15, supplierId: null, supplierName: null, deliveryStatus: 'unscheduled' },
            { id: 'dni-004-2', ingredientId: 'ing-034', ingredientName: 'Kol / Kubis', unit: 'kg', quantity: 8, supplierId: 'sup-004', supplierName: 'PT Bumi Agro Nusantara', deliveryStatus: 'in_process' },
            { id: 'dni-004-3', ingredientId: 'ing-033', ingredientName: 'Wortel', unit: 'kg', quantity: 6, supplierId: 'sup-004', supplierName: 'PT Bumi Agro Nusantara', deliveryStatus: 'in_process' },
            { id: 'dni-004-4', ingredientId: 'ing-001', ingredientName: 'Beras Putih', unit: 'kg', quantity: 20, supplierId: 'sup-001', supplierName: 'UD Maju Bersama', deliveryStatus: 'complete' },
            { id: 'dni-004-5', ingredientId: 'ing-045', ingredientName: 'Saus Tiram', unit: 'botol', quantity: 4, supplierId: 'sup-007', supplierName: 'PT Indo Palm & Food', deliveryStatus: 'in_process' },
        ],
    },

    // ─── RS Eka Hospital Cibubur — May 8 (hari ini) ─────────────────────────────
    {
        id: 'dn-005',
        clientId: 'cli-001',
        clientName: 'RS Eka Hospital Cibubur',
        menuName: 'Opor Ayam + Nasi Putih',
        deliveryDate: '2026-05-08',
        portionCount: 120,
        deliveryStatus: 'in_process',
        paymentStatus: 'unpaid',
        ingredients: [
            { id: 'dni-005-1', ingredientId: 'ing-007', ingredientName: 'Ayam Kampung', unit: 'kg', quantity: 14, supplierId: 'sup-002', supplierName: 'CV Protein Segar', deliveryStatus: 'in_process' },
            { id: 'dni-005-2', ingredientId: 'ing-040', ingredientName: 'Santan Kelapa', unit: 'liter', quantity: 5, supplierId: 'sup-007', supplierName: 'PT Indo Palm & Food', deliveryStatus: 'in_process' },
            { id: 'dni-005-3', ingredientId: 'ing-001', ingredientName: 'Beras Putih', unit: 'kg', quantity: 12, supplierId: 'sup-001', supplierName: 'UD Maju Bersama', deliveryStatus: 'complete' },
            { id: 'dni-005-4', ingredientId: 'ing-018', ingredientName: 'Bawang Merah', unit: 'kg', quantity: 1, supplierId: 'sup-004', supplierName: 'PT Bumi Agro Nusantara', deliveryStatus: 'complete' },
        ],
    },

    // ─── RS Hermina Depok — May 8 ───────────────────────────────────────────────
    {
        id: 'dn-006',
        clientId: 'cli-002',
        clientName: 'RS Hermina Depok',
        menuName: 'Mie Goreng Spesial + Bakso',
        deliveryDate: '2026-05-08',
        portionCount: 180,
        deliveryStatus: 'unscheduled',
        paymentStatus: 'unpaid',
        ingredients: [
            { id: 'dni-006-1', ingredientId: 'ing-003', ingredientName: 'Mie Kuning', unit: 'kg', quantity: 18, supplierId: null, supplierName: null, deliveryStatus: 'unscheduled' },
            { id: 'dni-006-2', ingredientId: 'ing-006', ingredientName: 'Ayam Broiler', unit: 'kg', quantity: 10, supplierId: null, supplierName: null, deliveryStatus: 'unscheduled' },
            { id: 'dni-006-3', ingredientId: 'ing-034', ingredientName: 'Kol / Kubis', unit: 'kg', quantity: 5, supplierId: null, supplierName: null, deliveryStatus: 'unscheduled' },
            { id: 'dni-006-4', ingredientId: 'ing-041', ingredientName: 'Minyak Goreng', unit: 'liter', quantity: 3, supplierId: null, supplierName: null, deliveryStatus: 'unscheduled' },
        ],
    },

    // ─── RSUD Kota Bekasi — May 8 ───────────────────────────────────────────────
    {
        id: 'dn-007',
        clientId: 'cli-004',
        clientName: 'RSUD Kota Bekasi',
        menuName: 'Rendang Sapi + Nasi Putih + Sayur Bening',
        deliveryDate: '2026-05-08',
        portionCount: 200,
        deliveryStatus: 'unscheduled',
        paymentStatus: 'unpaid',
        ingredients: [
            { id: 'dni-007-1', ingredientId: 'ing-008', ingredientName: 'Daging Sapi Murni', unit: 'kg', quantity: 20, supplierId: null, supplierName: null, deliveryStatus: 'unscheduled' },
            { id: 'dni-007-2', ingredientId: 'ing-040', ingredientName: 'Santan Kelapa', unit: 'liter', quantity: 6, supplierId: null, supplierName: null, deliveryStatus: 'unscheduled' },
            { id: 'dni-007-3', ingredientId: 'ing-001', ingredientName: 'Beras Putih', unit: 'kg', quantity: 20, supplierId: null, supplierName: null, deliveryStatus: 'unscheduled' },
            { id: 'dni-007-4', ingredientId: 'ing-036', ingredientName: 'Bayam Segar', unit: 'ikat', quantity: 15, supplierId: null, supplierName: null, deliveryStatus: 'unscheduled' },
        ],
    },
]
