import type { IngredientWithStock } from '@/types'

/**
 * Subset of the 55 master ingredients with stock and supplier mapping.
 * Stocked as of 2026-05-08.
 */
export const MOCK_INGREDIENTS_WITH_STOCK: IngredientWithStock[] = [
    // Bahan Pokok
    { id: 'ing-001', name: 'Beras Putih', unit: 'kg', category: 'Bahan Pokok', stock: 320, stockStatus: 'ok', primarySupplierId: 'sup-001', supplierIds: ['sup-001'] },
    { id: 'ing-002', name: 'Beras Merah', unit: 'kg', category: 'Bahan Pokok', stock: 80, stockStatus: 'ok', primarySupplierId: 'sup-001', supplierIds: ['sup-001'] },
    { id: 'ing-003', name: 'Mie Kuning', unit: 'kg', category: 'Bahan Pokok', stock: 45, stockStatus: 'low', primarySupplierId: 'sup-008', supplierIds: ['sup-008'] },
    { id: 'ing-005', name: 'Tepung Terigu', unit: 'kg', category: 'Bahan Pokok', stock: 0, stockStatus: 'empty', primarySupplierId: 'sup-008', supplierIds: ['sup-001', 'sup-008'] },

    // Daging & Protein
    { id: 'ing-006', name: 'Ayam Broiler', unit: 'kg', category: 'Daging & Protein', stock: 65, stockStatus: 'ok', primarySupplierId: 'sup-002', supplierIds: ['sup-002'] },
    { id: 'ing-007', name: 'Ayam Kampung', unit: 'kg', category: 'Daging & Protein', stock: 20, stockStatus: 'low', primarySupplierId: 'sup-002', supplierIds: ['sup-002'] },
    { id: 'ing-008', name: 'Daging Sapi Murni', unit: 'kg', category: 'Daging & Protein', stock: 35, stockStatus: 'ok', primarySupplierId: 'sup-003', supplierIds: ['sup-003'] },
    { id: 'ing-011', name: 'Telur Ayam', unit: 'kg', category: 'Daging & Protein', stock: 90, stockStatus: 'ok', primarySupplierId: 'sup-002', supplierIds: ['sup-002'] },

    // Seafood
    { id: 'ing-012', name: 'Udang Segar', unit: 'kg', category: 'Seafood', stock: 0, stockStatus: 'empty', primarySupplierId: 'sup-005', supplierIds: ['sup-005'] },
    { id: 'ing-013', name: 'Ikan Kakap Merah', unit: 'kg', category: 'Seafood', stock: 12, stockStatus: 'low', primarySupplierId: 'sup-005', supplierIds: ['sup-005'] },
    { id: 'ing-014', name: 'Ikan Bandeng Presto', unit: 'kg', category: 'Seafood', stock: 25, stockStatus: 'ok', primarySupplierId: 'sup-005', supplierIds: ['sup-005'] },

    // Produk Olahan
    { id: 'ing-016', name: 'Tahu Putih', unit: 'pcs', category: 'Produk Olahan', stock: 120, stockStatus: 'ok', primarySupplierId: 'sup-006', supplierIds: ['sup-006'] },
    { id: 'ing-017', name: 'Tempe', unit: 'potong', category: 'Produk Olahan', stock: 85, stockStatus: 'ok', primarySupplierId: 'sup-006', supplierIds: ['sup-006'] },

    // Bumbu Segar
    { id: 'ing-018', name: 'Bawang Merah', unit: 'kg', category: 'Bumbu Segar', stock: 28, stockStatus: 'ok', primarySupplierId: 'sup-004', supplierIds: ['sup-004'] },
    { id: 'ing-019', name: 'Bawang Putih', unit: 'kg', category: 'Bumbu Segar', stock: 15, stockStatus: 'ok', primarySupplierId: 'sup-004', supplierIds: ['sup-004'] },
    { id: 'ing-021', name: 'Cabai Merah Keriting', unit: 'kg', category: 'Bumbu Segar', stock: 8, stockStatus: 'low', primarySupplierId: 'sup-004', supplierIds: ['sup-004'] },
    { id: 'ing-022', name: 'Cabai Rawit Merah', unit: 'kg', category: 'Bumbu Segar', stock: 3, stockStatus: 'low', primarySupplierId: 'sup-004', supplierIds: ['sup-004'] },

    // Sayuran
    { id: 'ing-031', name: 'Tomat Segar', unit: 'kg', category: 'Sayuran', stock: 22, stockStatus: 'ok', primarySupplierId: 'sup-004', supplierIds: ['sup-004'] },
    { id: 'ing-032', name: 'Kentang', unit: 'kg', category: 'Sayuran', stock: 55, stockStatus: 'ok', primarySupplierId: 'sup-004', supplierIds: ['sup-004'] },
    { id: 'ing-033', name: 'Wortel', unit: 'kg', category: 'Sayuran', stock: 40, stockStatus: 'ok', primarySupplierId: 'sup-004', supplierIds: ['sup-004'] },
    { id: 'ing-034', name: 'Kol / Kubis', unit: 'kg', category: 'Sayuran', stock: 18, stockStatus: 'ok', primarySupplierId: 'sup-004', supplierIds: ['sup-004'] },
    { id: 'ing-035', name: 'Sawi Hijau', unit: 'kg', category: 'Sayuran', stock: 0, stockStatus: 'empty', primarySupplierId: 'sup-004', supplierIds: ['sup-004'] },

    // Minyak & Lemak
    { id: 'ing-040', name: 'Santan Kelapa', unit: 'liter', category: 'Minyak & Lemak', stock: 35, stockStatus: 'ok', primarySupplierId: 'sup-007', supplierIds: ['sup-007'] },
    { id: 'ing-041', name: 'Minyak Goreng', unit: 'liter', category: 'Minyak & Lemak', stock: 60, stockStatus: 'ok', primarySupplierId: 'sup-007', supplierIds: ['sup-007'] },

    // Bumbu Kemasan
    { id: 'ing-043', name: 'Kecap Manis', unit: 'botol', category: 'Bumbu Kemasan', stock: 12, stockStatus: 'ok', primarySupplierId: 'sup-007', supplierIds: ['sup-007'] },
    { id: 'ing-045', name: 'Saus Tiram', unit: 'botol', category: 'Bumbu Kemasan', stock: 4, stockStatus: 'low', primarySupplierId: 'sup-007', supplierIds: ['sup-007'] },

    // Bumbu Dasar
    { id: 'ing-051', name: 'Garam Halus', unit: 'kg', category: 'Bumbu Dasar', stock: 25, stockStatus: 'ok', primarySupplierId: 'sup-001', supplierIds: ['sup-001', 'sup-008'] },
    { id: 'ing-052', name: 'Gula Pasir', unit: 'kg', category: 'Bumbu Dasar', stock: 30, stockStatus: 'ok', primarySupplierId: 'sup-001', supplierIds: ['sup-001', 'sup-008'] },
    { id: 'ing-054', name: 'Merica Bubuk', unit: 'kg', category: 'Bumbu Dasar', stock: 6, stockStatus: 'low', primarySupplierId: 'sup-008', supplierIds: ['sup-008'] },
]
