import type { MenuTemplate } from '@/types'

/**
 * Seed templates per clientId.
 * In production, this would come from a database; here it's just starting data.
 */
export const MOCK_MENU_TEMPLATES: MenuTemplate[] = [
    // ── client-001 ───────────────────────────────────────────────────────────
    {
        id: 'tpl-001',
        clientId: 'client-001',
        name: 'Nasi Ayam Goreng',
        ingredients: [
            { id: 'mi-t001-1', ingredientId: 'ing-001', ingredientName: 'Beras Putih', unit: 'kg', quantity: 8, note: '' },
            { id: 'mi-t001-2', ingredientId: 'ing-006', ingredientName: 'Ayam Broiler', unit: 'kg', quantity: 5, note: 'potong 8' },
            { id: 'mi-t001-3', ingredientId: 'ing-018', ingredientName: 'Bawang Merah', unit: 'kg', quantity: 0.5, note: '' },
            { id: 'mi-t001-4', ingredientId: 'ing-019', ingredientName: 'Bawang Putih', unit: 'kg', quantity: 0.3, note: '' },
            { id: 'mi-t001-5', ingredientId: 'ing-041', ingredientName: 'Minyak Goreng', unit: 'liter', quantity: 2, note: '' },
        ],
    },
    {
        id: 'tpl-002',
        clientId: 'client-001',
        name: 'Sup Ayam Sayur',
        ingredients: [
            { id: 'mi-t002-1', ingredientId: 'ing-001', ingredientName: 'Beras Putih', unit: 'kg', quantity: 8, note: '' },
            { id: 'mi-t002-2', ingredientId: 'ing-006', ingredientName: 'Ayam Broiler', unit: 'kg', quantity: 4, note: '' },
            { id: 'mi-t002-3', ingredientId: 'ing-032', ingredientName: 'Kentang', unit: 'kg', quantity: 2, note: '' },
            { id: 'mi-t002-4', ingredientId: 'ing-033', ingredientName: 'Wortel', unit: 'kg', quantity: 1.5, note: '' },
            { id: 'mi-t002-5', ingredientId: 'ing-018', ingredientName: 'Bawang Merah', unit: 'kg', quantity: 0.4, note: '' },
        ],
    },
    {
        id: 'tpl-003',
        clientId: 'client-001',
        name: 'Nasi Tempe Orek',
        ingredients: [
            { id: 'mi-t003-1', ingredientId: 'ing-001', ingredientName: 'Beras Putih', unit: 'kg', quantity: 8, note: '' },
            { id: 'mi-t003-2', ingredientId: 'ing-017', ingredientName: 'Tempe', unit: 'potong', quantity: 50, note: '' },
            { id: 'mi-t003-3', ingredientId: 'ing-021', ingredientName: 'Cabai Merah Keriting', unit: 'kg', quantity: 0.3, note: '' },
            { id: 'mi-t003-4', ingredientId: 'ing-043', ingredientName: 'Kecap Manis', unit: 'botol', quantity: 1, note: '' },
        ],
    },

    // ── client-002 ───────────────────────────────────────────────────────────
    {
        id: 'tpl-004',
        clientId: 'client-002',
        name: 'Nasi Ikan Kakap',
        ingredients: [
            { id: 'mi-t004-1', ingredientId: 'ing-001', ingredientName: 'Beras Putih', unit: 'kg', quantity: 10, note: '' },
            { id: 'mi-t004-2', ingredientId: 'ing-013', ingredientName: 'Ikan Kakap Merah', unit: 'kg', quantity: 6, note: '' },
            { id: 'mi-t004-3', ingredientId: 'ing-031', ingredientName: 'Tomat Segar', unit: 'kg', quantity: 1, note: '' },
        ],
    },
]
