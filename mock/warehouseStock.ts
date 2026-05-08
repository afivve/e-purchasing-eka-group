import type { WarehouseIngredient } from '@/types'

/**
 * Warehouse real-stock data as of 2026-05-08 (pagi).
 * systemStock = stok dari sistem (teori)
 * realStock   = hasil cek fisik gudang
 * Discrepancy items have realStock != systemStock.
 */
export const MOCK_WAREHOUSE_STOCK: WarehouseIngredient[] = [
    // ─── Bahan Pokok ──────────────────────────────────────────────────────────
    {
        id: 'wh-001', ingredientId: 'ing-001', name: 'Beras Putih', unit: 'kg',
        category: 'Bahan Pokok', systemStock: 320, realStock: 318,
        stockStatus: 'ok',
        primarySupplierId: 'sup-001', primarySupplierName: 'UD Maju Bersama',
        lastAdjustedAt: '2026-05-08T06:00:00', lastNote: 'Stok opname pagi',
    },
    {
        id: 'wh-002', ingredientId: 'ing-002', name: 'Beras Merah', unit: 'kg',
        category: 'Bahan Pokok', systemStock: 80, realStock: 80,
        stockStatus: 'ok',
        primarySupplierId: 'sup-001', primarySupplierName: 'UD Maju Bersama',
        lastAdjustedAt: null, lastNote: '',
    },
    {
        id: 'wh-003', ingredientId: 'ing-003', name: 'Mie Kuning', unit: 'kg',
        category: 'Bahan Pokok', systemStock: 45, realStock: 42,
        stockStatus: 'low',
        primarySupplierId: 'sup-008', primarySupplierName: 'CV Aneka Bumbu Nusantara',
        lastAdjustedAt: '2026-05-07T17:00:00', lastNote: '3 kg rusak kemasan',
    },
    {
        id: 'wh-004', ingredientId: 'ing-005', name: 'Tepung Terigu', unit: 'kg',
        category: 'Bahan Pokok', systemStock: 0, realStock: 0,
        stockStatus: 'empty',
        primarySupplierId: 'sup-008', primarySupplierName: 'CV Aneka Bumbu Nusantara',
        lastAdjustedAt: null, lastNote: 'Menunggu kiriman supplier',
    },

    // ─── Daging & Protein ─────────────────────────────────────────────────────
    {
        id: 'wh-005', ingredientId: 'ing-006', name: 'Ayam Broiler', unit: 'kg',
        category: 'Daging & Protein', systemStock: 65, realStock: 65,
        stockStatus: 'ok',
        primarySupplierId: 'sup-002', primarySupplierName: 'CV Protein Segar',
        lastAdjustedAt: null, lastNote: '',
    },
    {
        id: 'wh-006', ingredientId: 'ing-007', name: 'Ayam Kampung', unit: 'kg',
        category: 'Daging & Protein', systemStock: 20, realStock: 18,
        stockStatus: 'low',
        primarySupplierId: 'sup-002', primarySupplierName: 'CV Protein Segar',
        lastAdjustedAt: '2026-05-07T15:00:00', lastNote: '2 kg tidak layak pakai',
    },
    {
        id: 'wh-007', ingredientId: 'ing-008', name: 'Daging Sapi Murni', unit: 'kg',
        category: 'Daging & Protein', systemStock: 35, realStock: 35,
        stockStatus: 'ok',
        primarySupplierId: 'sup-003', primarySupplierName: 'PT Prima Daging',
        lastAdjustedAt: null, lastNote: '',
    },
    {
        id: 'wh-008', ingredientId: 'ing-011', name: 'Telur Ayam', unit: 'kg',
        category: 'Daging & Protein', systemStock: 90, realStock: 85,
        stockStatus: 'discrepancy',
        primarySupplierId: 'sup-002', primarySupplierName: 'CV Protein Segar',
        lastAdjustedAt: '2026-05-08T05:30:00', lastNote: '5 kg pecah saat bongkar muat',
    },

    // ─── Seafood ─────────────────────────────────────────────────────────────
    {
        id: 'wh-009', ingredientId: 'ing-012', name: 'Udang Segar', unit: 'kg',
        category: 'Seafood', systemStock: 0, realStock: 0,
        stockStatus: 'empty',
        primarySupplierId: 'sup-005', primarySupplierName: 'CV Bahari Segar',
        lastAdjustedAt: null, lastNote: 'Belum datang dari supplier',
    },
    {
        id: 'wh-010', ingredientId: 'ing-013', name: 'Ikan Kakap Merah', unit: 'kg',
        category: 'Seafood', systemStock: 12, realStock: 12,
        stockStatus: 'low',
        primarySupplierId: 'sup-005', primarySupplierName: 'CV Bahari Segar',
        lastAdjustedAt: null, lastNote: '',
    },
    {
        id: 'wh-011', ingredientId: 'ing-014', name: 'Ikan Bandeng Presto', unit: 'kg',
        category: 'Seafood', systemStock: 25, realStock: 25,
        stockStatus: 'ok',
        primarySupplierId: 'sup-005', primarySupplierName: 'CV Bahari Segar',
        lastAdjustedAt: null, lastNote: '',
    },

    // ─── Produk Olahan ────────────────────────────────────────────────────────
    {
        id: 'wh-012', ingredientId: 'ing-016', name: 'Tahu Putih', unit: 'pcs',
        category: 'Produk Olahan', systemStock: 120, realStock: 120,
        stockStatus: 'ok',
        primarySupplierId: 'sup-006', primarySupplierName: 'UD Sari Tahu & Tempe Bogor',
        lastAdjustedAt: null, lastNote: '',
    },
    {
        id: 'wh-013', ingredientId: 'ing-017', name: 'Tempe', unit: 'potong',
        category: 'Produk Olahan', systemStock: 85, realStock: 85,
        stockStatus: 'ok',
        primarySupplierId: 'sup-006', primarySupplierName: 'UD Sari Tahu & Tempe Bogor',
        lastAdjustedAt: null, lastNote: '',
    },

    // ─── Bumbu Segar ──────────────────────────────────────────────────────────
    {
        id: 'wh-014', ingredientId: 'ing-018', name: 'Bawang Merah', unit: 'kg',
        category: 'Bumbu Segar', systemStock: 28, realStock: 28,
        stockStatus: 'ok',
        primarySupplierId: 'sup-004', primarySupplierName: 'PT Bumi Agro Nusantara',
        lastAdjustedAt: null, lastNote: '',
    },
    {
        id: 'wh-015', ingredientId: 'ing-019', name: 'Bawang Putih', unit: 'kg',
        category: 'Bumbu Segar', systemStock: 15, realStock: 15,
        stockStatus: 'ok',
        primarySupplierId: 'sup-004', primarySupplierName: 'PT Bumi Agro Nusantara',
        lastAdjustedAt: null, lastNote: '',
    },
    {
        id: 'wh-016', ingredientId: 'ing-021', name: 'Cabai Merah Keriting', unit: 'kg',
        category: 'Bumbu Segar', systemStock: 8, realStock: 9,
        stockStatus: 'discrepancy',
        primarySupplierId: 'sup-004', primarySupplierName: 'PT Bumi Agro Nusantara',
        lastAdjustedAt: '2026-05-07T16:30:00', lastNote: '1 kg bonus dari supplier',
    },
    {
        id: 'wh-017', ingredientId: 'ing-022', name: 'Cabai Rawit Merah', unit: 'kg',
        category: 'Bumbu Segar', systemStock: 3, realStock: 3,
        stockStatus: 'low',
        primarySupplierId: 'sup-004', primarySupplierName: 'PT Bumi Agro Nusantara',
        lastAdjustedAt: null, lastNote: '',
    },

    // ─── Sayuran ──────────────────────────────────────────────────────────────
    {
        id: 'wh-018', ingredientId: 'ing-031', name: 'Tomat Segar', unit: 'kg',
        category: 'Sayuran', systemStock: 22, realStock: 22,
        stockStatus: 'ok',
        primarySupplierId: 'sup-004', primarySupplierName: 'PT Bumi Agro Nusantara',
        lastAdjustedAt: null, lastNote: '',
    },
    {
        id: 'wh-019', ingredientId: 'ing-032', name: 'Kentang', unit: 'kg',
        category: 'Sayuran', systemStock: 55, realStock: 55,
        stockStatus: 'ok',
        primarySupplierId: 'sup-004', primarySupplierName: 'PT Bumi Agro Nusantara',
        lastAdjustedAt: null, lastNote: '',
    },
    {
        id: 'wh-020', ingredientId: 'ing-033', name: 'Wortel', unit: 'kg',
        category: 'Sayuran', systemStock: 40, realStock: 38,
        stockStatus: 'ok',
        primarySupplierId: 'sup-004', primarySupplierName: 'PT Bumi Agro Nusantara',
        lastAdjustedAt: '2026-05-07T14:00:00', lastNote: '2 kg busuk',
    },
    {
        id: 'wh-021', ingredientId: 'ing-034', name: 'Kol / Kubis', unit: 'kg',
        category: 'Sayuran', systemStock: 18, realStock: 18,
        stockStatus: 'ok',
        primarySupplierId: 'sup-004', primarySupplierName: 'PT Bumi Agro Nusantara',
        lastAdjustedAt: null, lastNote: '',
    },
    {
        id: 'wh-022', ingredientId: 'ing-035', name: 'Sawi Hijau', unit: 'kg',
        category: 'Sayuran', systemStock: 0, realStock: 0,
        stockStatus: 'empty',
        primarySupplierId: 'sup-004', primarySupplierName: 'PT Bumi Agro Nusantara',
        lastAdjustedAt: null, lastNote: 'Belum tersedia',
    },

    // ─── Minyak & Lemak ───────────────────────────────────────────────────────
    {
        id: 'wh-023', ingredientId: 'ing-040', name: 'Santan Kelapa', unit: 'liter',
        category: 'Minyak & Lemak', systemStock: 35, realStock: 35,
        stockStatus: 'ok',
        primarySupplierId: 'sup-007', primarySupplierName: 'PT Indo Palm & Food',
        lastAdjustedAt: null, lastNote: '',
    },
    {
        id: 'wh-024', ingredientId: 'ing-041', name: 'Minyak Goreng', unit: 'liter',
        category: 'Minyak & Lemak', systemStock: 60, realStock: 60,
        stockStatus: 'ok',
        primarySupplierId: 'sup-007', primarySupplierName: 'PT Indo Palm & Food',
        lastAdjustedAt: null, lastNote: '',
    },

    // ─── Bumbu Kemasan ────────────────────────────────────────────────────────
    {
        id: 'wh-025', ingredientId: 'ing-043', name: 'Kecap Manis', unit: 'botol',
        category: 'Bumbu Kemasan', systemStock: 12, realStock: 12,
        stockStatus: 'ok',
        primarySupplierId: 'sup-007', primarySupplierName: 'PT Indo Palm & Food',
        lastAdjustedAt: null, lastNote: '',
    },
    {
        id: 'wh-026', ingredientId: 'ing-045', name: 'Saus Tiram', unit: 'botol',
        category: 'Bumbu Kemasan', systemStock: 4, realStock: 4,
        stockStatus: 'low',
        primarySupplierId: 'sup-007', primarySupplierName: 'PT Indo Palm & Food',
        lastAdjustedAt: null, lastNote: '',
    },

    // ─── Bumbu Dasar ─────────────────────────────────────────────────────────
    {
        id: 'wh-027', ingredientId: 'ing-051', name: 'Garam Halus', unit: 'kg',
        category: 'Bumbu Dasar', systemStock: 25, realStock: 25,
        stockStatus: 'ok',
        primarySupplierId: 'sup-001', primarySupplierName: 'UD Maju Bersama',
        lastAdjustedAt: null, lastNote: '',
    },
    {
        id: 'wh-028', ingredientId: 'ing-052', name: 'Gula Pasir', unit: 'kg',
        category: 'Bumbu Dasar', systemStock: 30, realStock: 30,
        stockStatus: 'ok',
        primarySupplierId: 'sup-001', primarySupplierName: 'UD Maju Bersama',
        lastAdjustedAt: null, lastNote: '',
    },
    {
        id: 'wh-029', ingredientId: 'ing-054', name: 'Merica Bubuk', unit: 'kg',
        category: 'Bumbu Dasar', systemStock: 6, realStock: 6,
        stockStatus: 'low',
        primarySupplierId: 'sup-008', primarySupplierName: 'CV Aneka Bumbu Nusantara',
        lastAdjustedAt: null, lastNote: '',
    },
]

export const WAREHOUSE_CATEGORIES = [
    'Bahan Pokok',
    'Daging & Protein',
    'Seafood',
    'Produk Olahan',
    'Bumbu Segar',
    'Sayuran',
    'Minyak & Lemak',
    'Bumbu Kemasan',
    'Bumbu Dasar',
]
