'use client'

import { useState, useMemo, useEffect } from 'react'
import { MOCK_SHIPMENTS } from '@/mock/shipments'
import type { Shipment, ShipmentStatus, ItemReceivingStatus } from '@/types'

export type StatusFilter = ShipmentStatus | 'all'

export interface ReceivingItemUpdate {
    receivedQty?: number
    receivingStatus?: ItemReceivingStatus
    receivingNote?: string
}

export function useShipments() {
    const [shipments, setShipments] = useState<Shipment[]>(MOCK_SHIPMENTS)
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
    const [isLoading, setIsLoading] = useState(true)

    // Simulate initial data load
    useEffect(() => {
        const t = setTimeout(() => setIsLoading(false), 600)
        return () => clearTimeout(t)
    }, [])

    const selectedShipment = useMemo(
        () => shipments.find((s) => s.id === selectedId) ?? null,
        [shipments, selectedId],
    )

    const filteredShipments = useMemo(() => {
        const q = searchQuery.toLowerCase()
        return shipments.filter((s) => {
            const matchSearch =
                q === '' ||
                s.suratJalanNo.toLowerCase().includes(q) ||
                s.clientName.toLowerCase().includes(q) ||
                s.driverName.toLowerCase().includes(q)
            const matchStatus = statusFilter === 'all' || s.status === statusFilter
            return matchSearch && matchStatus
        })
    }, [shipments, searchQuery, statusFilter])

    /** Count shipments that need admin action (delivered or partial, not yet checked) */
    const pendingCheckCount = useMemo(
        () => shipments.filter((s) => s.status === 'delivered' || s.status === 'partial').length,
        [shipments],
    )

    function openDetail(id: string) {
        setSelectedId(id)
        setIsDetailOpen(true)
    }

    function closeDetail() {
        setIsDetailOpen(false)
        // Delay clearing selectedId so exit animation can play
        setTimeout(() => setSelectedId(null), 320)
    }

    function updateReceivingItem(shipmentId: string, itemId: string, update: ReceivingItemUpdate) {
        setShipments((prev) =>
            prev.map((s) => {
                if (s.id !== shipmentId) return s
                const updatedItems = s.items.map((item) =>
                    item.id === itemId ? { ...item, ...update } : item,
                )
                return { ...s, items: updatedItems }
            }),
        )
    }

    /**
     * Called when admin taps "Selesaikan Penerimaan".
     * If all items are checked (non-pending) → status becomes 'checked'.
     */
    function confirmReceiving(shipmentId: string) {
        setShipments((prev) =>
            prev.map((s) => {
                if (s.id !== shipmentId) return s
                const allChecked = s.items.every((i) => i.receivingStatus !== 'pending')
                if (allChecked) {
                    return { ...s, status: 'checked' }
                }
                return s
            }),
        )
    }

    return {
        shipments,
        filteredShipments,
        selectedShipment,
        isDetailOpen,
        openDetail,
        closeDetail,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        pendingCheckCount,
        updateReceivingItem,
        confirmReceiving,
        isLoading,
    }
}


