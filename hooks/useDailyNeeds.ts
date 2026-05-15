'use client'

import { useState, useMemo } from 'react'
import { MOCK_DAILY_NEEDS } from '@/mock/dailyNeeds'
import { MOCK_SUPPLIERS } from '@/mock/suppliers'
import type { DailyNeed, DailyNeedDeliveryStatus, DailyNeedPaymentStatus } from '@/types'

export type DailyNeedDateFilter = 'yesterday' | 'today' | 'tomorrow' | 'all'

export function useDailyNeeds() {
    const [needs, setNeeds] = useState<DailyNeed[]>(MOCK_DAILY_NEEDS)
    const [dateFilter, setDateFilter] = useState<DailyNeedDateFilter>('today')
    const [clientFilter, setClientFilter] = useState<string>('all')
    const [statusFilter, setStatusFilter] = useState<DailyNeedDeliveryStatus | 'all'>('all')
    const [supplierPickerNeedId, setSupplierPickerNeedId] = useState<string | null>(null)
    const [supplierPickerIngId, setSupplierPickerIngId] = useState<string | null>(null)

    const TODAY = '2026-05-08'
    const YESTERDAY = '2026-05-07'
    const TOMORROW = '2026-05-09'

    const filteredNeeds = useMemo(() => {
        return needs.filter((n) => {
            const dateMatch =
                dateFilter === 'all' ||
                (dateFilter === 'yesterday' && n.deliveryDate === YESTERDAY) ||
                (dateFilter === 'today' && n.deliveryDate === TODAY) ||
                (dateFilter === 'tomorrow' && n.deliveryDate === TOMORROW)
            const clientMatch = clientFilter === 'all' || n.clientId === clientFilter
            const statusMatch = statusFilter === 'all' || n.deliveryStatus === statusFilter
            return dateMatch && clientMatch && statusMatch
        })
    }, [needs, dateFilter, clientFilter, statusFilter])

    const stats = useMemo(() => ({
        total: needs.filter((n) => n.deliveryDate === TODAY || n.deliveryDate === YESTERDAY).length,
        unscheduled: needs.filter((n) => n.deliveryStatus === 'unscheduled').length,
        inProcess: needs.filter((n) => n.deliveryStatus === 'in_process').length,
        complete: needs.filter((n) => n.deliveryStatus === 'complete').length,
    }), [needs])

    function openSupplierPicker(needId: string, ingredientId: string) {
        setSupplierPickerNeedId(needId)
        setSupplierPickerIngId(ingredientId)
    }

    function closeSupplierPicker() {
        setSupplierPickerNeedId(null)
        setSupplierPickerIngId(null)
    }

    function addSupplierSplit(needId: string, ingredientId: string, supplierId: string, qty: number) {
        const supplier = MOCK_SUPPLIERS.find((s) => s.id === supplierId)
        if (!supplier) return
        setNeeds((prev) =>
            prev.map((n) => {
                if (n.id !== needId) return n
                const updatedIngs = n.ingredients.map((i) => {
                    if (i.id !== ingredientId) return i
                    const alreadyExists = i.supplierSplits.some((s) => s.supplierId === supplierId)
                    const newSplits = alreadyExists
                        ? i.supplierSplits.map((s) =>
                            s.supplierId === supplierId ? { ...s, quantity: qty } : s
                        )
                        : [...i.supplierSplits, { supplierId, supplierName: supplier.name, quantity: qty }]
                    return {
                        ...i,
                        supplierSplits: newSplits,
                        deliveryStatus: 'in_process' as DailyNeedDeliveryStatus,
                    }
                })
                const allAssigned = updatedIngs.every((i) => i.supplierSplits.length > 0)
                return {
                    ...n,
                    ingredients: updatedIngs,
                    deliveryStatus: (allAssigned ? 'in_process' : n.deliveryStatus) as DailyNeedDeliveryStatus,
                }
            }),
        )
        closeSupplierPicker()
    }

    function removeSupplierSplit(needId: string, ingredientId: string, supplierId: string) {
        setNeeds((prev) =>
            prev.map((n) => {
                if (n.id !== needId) return n
                const updatedIngs = n.ingredients.map((i) => {
                    if (i.id !== ingredientId) return i
                    const newSplits = i.supplierSplits.filter((s) => s.supplierId !== supplierId)
                    return {
                        ...i,
                        supplierSplits: newSplits,
                        deliveryStatus: (newSplits.length === 0 ? 'unscheduled' : i.deliveryStatus) as DailyNeedDeliveryStatus,
                    }
                })
                return { ...n, ingredients: updatedIngs }
            }),
        )
    }

    const activePickerNeed = needs.find((n) => n.id === supplierPickerNeedId) ?? null
    const activePickerIng = activePickerNeed?.ingredients.find((i) => i.id === supplierPickerIngId) ?? null

    return {
        needs,
        filteredNeeds,
        dateFilter,
        setDateFilter,
        clientFilter,
        setClientFilter,
        statusFilter,
        setStatusFilter,
        stats,
        openSupplierPicker,
        closeSupplierPicker,
        addSupplierSplit,
        removeSupplierSplit,
        activePickerNeed,
        activePickerIng,
        isSupplierPickerOpen: supplierPickerNeedId !== null,
    }
}
