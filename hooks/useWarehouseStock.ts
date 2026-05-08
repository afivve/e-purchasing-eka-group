'use client'

import { useState, useMemo } from 'react'
import { MOCK_WAREHOUSE_STOCK, WAREHOUSE_CATEGORIES } from '@/mock/warehouseStock'
import type { WarehouseIngredient, WarehouseStockStatus } from '@/types'
import { generateId } from '@/lib/utils'

export interface StockAdjustmentForm {
    realStock: string
    note: string
}

export function useWarehouseStock() {
    const [stock, setStock] = useState<WarehouseIngredient[]>(MOCK_WAREHOUSE_STOCK)
    const [searchQuery, setSearchQuery] = useState('')
    const [categoryFilter, setCategoryFilter] = useState<string>('all')
    const [statusFilter, setStatusFilter] = useState<WarehouseStockStatus | 'all'>('all')
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [isAdjustmentOpen, setIsAdjustmentOpen] = useState(false)
    const [adjustmentForm, setAdjustmentForm] = useState<StockAdjustmentForm>({ realStock: '', note: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [toastMessage, setToastMessage] = useState<string | null>(null)

    const filteredStock = useMemo(() => {
        const q = searchQuery.toLowerCase()
        return stock.filter((s) => {
            const matchSearch = q === '' || s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)
            const matchCategory = categoryFilter === 'all' || s.category === categoryFilter
            const matchStatus = statusFilter === 'all' || s.stockStatus === statusFilter
            return matchSearch && matchCategory && matchStatus
        })
    }, [stock, searchQuery, categoryFilter, statusFilter])

    const stats = useMemo(() => ({
        total: stock.length,
        ok: stock.filter((s) => s.stockStatus === 'ok').length,
        low: stock.filter((s) => s.stockStatus === 'low').length,
        empty: stock.filter((s) => s.stockStatus === 'empty').length,
        discrepancy: stock.filter((s) => s.stockStatus === 'discrepancy').length,
    }), [stock])

    const selectedItem = stock.find((s) => s.id === selectedId) ?? null

    function openAdjustment(id: string) {
        const item = stock.find((s) => s.id === id)
        if (!item) return
        setSelectedId(id)
        setAdjustmentForm({ realStock: String(item.realStock), note: '' })
        setIsAdjustmentOpen(true)
    }

    function closeAdjustment() {
        setIsAdjustmentOpen(false)
        setSelectedId(null)
    }

    function computeStatus(item: WarehouseIngredient, newReal: number): WarehouseStockStatus {
        const diff = newReal - item.systemStock
        if (newReal === 0) return 'empty'
        if (Math.abs(diff) > 2) return 'discrepancy'
        // Determine low thresholds by category
        const LOW_THRESHOLDS: Record<string, number> = {
            'Daging & Protein': 20,
            'Seafood': 15,
            'Bumbu Segar': 5,
            'default': 10,
        }
        const threshold = LOW_THRESHOLDS[item.category] ?? LOW_THRESHOLDS.default
        if (newReal <= threshold) return 'low'
        return 'ok'
    }

    async function submitAdjustment() {
        if (!selectedId) return
        const newReal = parseFloat(adjustmentForm.realStock)
        if (isNaN(newReal) || newReal < 0) return
        setIsSubmitting(true)
        await new Promise((r) => setTimeout(r, 600))
        setStock((prev) =>
            prev.map((s) => {
                if (s.id !== selectedId) return s
                return {
                    ...s,
                    realStock: newReal,
                    stockStatus: computeStatus(s, newReal),
                    lastAdjustedAt: new Date().toISOString(),
                    lastNote: adjustmentForm.note || s.lastNote,
                }
            }),
        )
        setIsSubmitting(false)
        setIsAdjustmentOpen(false)
        setSelectedId(null)
        setToastMessage('Stok berhasil diperbarui.')
        setTimeout(() => setToastMessage(null), 3000)
    }

    const adjustmentDiscrepancy = useMemo(() => {
        if (!selectedItem) return 0
        const newReal = parseFloat(adjustmentForm.realStock)
        if (isNaN(newReal)) return 0
        return newReal - selectedItem.systemStock
    }, [selectedItem, adjustmentForm.realStock])

    const isAdjustmentValid =
        adjustmentForm.realStock !== '' &&
        !isNaN(parseFloat(adjustmentForm.realStock)) &&
        parseFloat(adjustmentForm.realStock) >= 0

    return {
        stock,
        filteredStock,
        searchQuery,
        setSearchQuery,
        categoryFilter,
        setCategoryFilter,
        statusFilter,
        setStatusFilter,
        stats,
        categories: WAREHOUSE_CATEGORIES,
        selectedId,
        selectedItem,
        isAdjustmentOpen,
        openAdjustment,
        closeAdjustment,
        adjustmentForm,
        setAdjustmentForm,
        adjustmentDiscrepancy,
        isAdjustmentValid,
        isSubmitting,
        submitAdjustment,
        toastMessage,
    }
}
