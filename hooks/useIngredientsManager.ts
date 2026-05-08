'use client'

import { useState, useMemo } from 'react'
import { MOCK_INGREDIENTS_WITH_STOCK } from '@/mock/ingredientsWithStock'
import { MOCK_SUPPLIERS } from '@/mock/suppliers'
import type { IngredientWithStock, StockStatus } from '@/types'
import { generateId } from '@/lib/utils'

export interface IngredientFormData {
    name: string
    unit: string
    category: string
    stock: string
    primarySupplierId: string
    supplierIds: string[]
}

const EMPTY_FORM: IngredientFormData = {
    name: '',
    unit: 'kg',
    category: 'Bahan Pokok',
    stock: '0',
    primarySupplierId: '',
    supplierIds: [],
}

export const INGREDIENT_CATEGORIES = [
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

function getStockStatus(stock: number): StockStatus {
    if (stock === 0) return 'empty'
    if (stock < 10) return 'low'
    return 'ok'
}

export function useIngredientsManager() {
    const [ingredients, setIngredients] = useState<IngredientWithStock[]>(
        MOCK_INGREDIENTS_WITH_STOCK,
    )
    const [searchQuery, setSearchQuery] = useState('')
    const [categoryFilter, setCategoryFilter] = useState<string>('all')
    const [stockFilter, setStockFilter] = useState<StockStatus | 'all'>('all')
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [form, setForm] = useState<IngredientFormData>(EMPTY_FORM)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [toastMessage, setToastMessage] = useState<string | null>(null)
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

    const suppliers = MOCK_SUPPLIERS

    const filteredIngredients = useMemo(() => {
        const q = searchQuery.toLowerCase()
        return ingredients.filter((i) => {
            const matchSearch = q === '' || i.name.toLowerCase().includes(q)
            const matchCategory = categoryFilter === 'all' || i.category === categoryFilter
            const matchStock = stockFilter === 'all' || i.stockStatus === stockFilter
            return matchSearch && matchCategory && matchStock
        })
    }, [ingredients, searchQuery, categoryFilter, stockFilter])

    const stats = useMemo(() => ({
        total: ingredients.length,
        ok: ingredients.filter((i) => i.stockStatus === 'ok').length,
        low: ingredients.filter((i) => i.stockStatus === 'low').length,
        empty: ingredients.filter((i) => i.stockStatus === 'empty').length,
    }), [ingredients])

    function openAddForm() {
        setForm(EMPTY_FORM)
        setEditingId(null)
        setIsFormOpen(true)
    }

    function openEditForm(id: string) {
        const ing = ingredients.find((i) => i.id === id)
        if (!ing) return
        setForm({
            name: ing.name,
            unit: ing.unit,
            category: ing.category,
            stock: String(ing.stock),
            primarySupplierId: ing.primarySupplierId ?? '',
            supplierIds: [...ing.supplierIds],
        })
        setEditingId(id)
        setIsFormOpen(true)
    }

    function closeForm() {
        setIsFormOpen(false)
        setEditingId(null)
    }

    function setField<K extends keyof IngredientFormData>(key: K, value: IngredientFormData[K]) {
        setForm((prev) => ({ ...prev, [key]: value }))
    }

    function toggleSupplier(id: string) {
        setForm((prev) => ({
            ...prev,
            supplierIds: prev.supplierIds.includes(id)
                ? prev.supplierIds.filter((s) => s !== id)
                : [...prev.supplierIds, id],
        }))
    }

    const isValid = form.name.trim().length > 0 && form.unit.trim().length > 0

    async function saveIngredient() {
        if (!isValid) return
        setIsSubmitting(true)
        await new Promise((r) => setTimeout(r, 700))

        const stockNum = Math.max(0, Number(form.stock) || 0)

        if (editingId) {
            setIngredients((prev) =>
                prev.map((i) =>
                    i.id === editingId
                        ? {
                            ...i,
                            name: form.name.trim(),
                            unit: form.unit.trim(),
                            category: form.category,
                            stock: stockNum,
                            stockStatus: getStockStatus(stockNum),
                            primarySupplierId: form.primarySupplierId || null,
                            supplierIds: form.supplierIds,
                        }
                        : i,
                ),
            )
            setToastMessage(`Bahan baku "${form.name}" berhasil diperbarui.`)
        } else {
            const newIng: IngredientWithStock = {
                id: generateId('ing'),
                name: form.name.trim(),
                unit: form.unit.trim(),
                category: form.category,
                stock: stockNum,
                stockStatus: getStockStatus(stockNum),
                primarySupplierId: form.primarySupplierId || null,
                supplierIds: form.supplierIds,
            }
            setIngredients((prev) => [...prev, newIng])
            setToastMessage(`Bahan baku "${newIng.name}" berhasil ditambahkan.`)
        }

        setIsSubmitting(false)
        setIsFormOpen(false)
        setEditingId(null)
        setTimeout(() => setToastMessage(null), 3000)
    }

    function deleteIngredient(id: string) {
        const ing = ingredients.find((i) => i.id === id)
        setIngredients((prev) => prev.filter((i) => i.id !== id))
        setDeleteConfirmId(null)
        setToastMessage(`Bahan baku "${ing?.name}" dihapus.`)
        setTimeout(() => setToastMessage(null), 3000)
    }

    function getSupplierName(id: string): string {
        return suppliers.find((s) => s.id === id)?.name ?? id
    }

    return {
        ingredients,
        filteredIngredients,
        searchQuery,
        setSearchQuery,
        categoryFilter,
        setCategoryFilter,
        stockFilter,
        setStockFilter,
        stats,
        isFormOpen,
        editingId,
        openAddForm,
        openEditForm,
        closeForm,
        form,
        setField,
        toggleSupplier,
        isValid,
        isSubmitting,
        saveIngredient,
        deleteIngredient,
        deleteConfirmId,
        setDeleteConfirmId,
        toastMessage,
        suppliers,
        getSupplierName,
        INGREDIENT_CATEGORIES,
    }
}
