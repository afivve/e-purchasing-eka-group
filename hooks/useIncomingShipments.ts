'use client'

import { useState, useMemo } from 'react'
import { MOCK_INCOMING_SHIPMENTS } from '@/mock/incomingShipments'
import type { IncomingShipment, IncomingReceivingStatus } from '@/types'

export function useIncomingShipments() {
    const [shipments, setShipments] = useState<IncomingShipment[]>(MOCK_INCOMING_SHIPMENTS)
    const [dateFilter, setDateFilter] = useState<string>('2026-05-08')
    const [statusFilter, setStatusFilter] = useState<IncomingReceivingStatus | 'all'>('all')
    const [activeShipmentId, setActiveShipmentId] = useState<string | null>(null)
    const [isChecklistOpen, setIsChecklistOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState<string | null>(null)

    const filteredShipments = useMemo(() => {
        return shipments.filter((s) => {
            const matchDate = dateFilter === 'all' || s.deliveryDate === dateFilter
            const matchStatus = statusFilter === 'all' || s.status === statusFilter
            return matchDate && matchStatus
        })
    }, [shipments, dateFilter, statusFilter])

    const stats = useMemo(() => {
        const today = '2026-05-08'
        const todayShipments = shipments.filter((s) => s.deliveryDate === today)
        return {
            todayTotal: todayShipments.length,
            pending: todayShipments.filter((s) => s.status === 'pending').length,
            inspecting: todayShipments.filter((s) => s.status === 'inspecting').length,
            received: todayShipments.filter((s) => s.status === 'received').length,
            partial: todayShipments.filter((s) => s.status === 'partial').length,
        }
    }, [shipments])

    const activeShipment = shipments.find((s) => s.id === activeShipmentId) ?? null

    function openChecklist(id: string) {
        setActiveShipmentId(id)
        setIsChecklistOpen(true)
        // Mark as inspecting if still pending
        setShipments((prev) =>
            prev.map((s) =>
                s.id === id && s.status === 'pending' ? { ...s, status: 'inspecting' } : s,
            ),
        )
    }

    function closeChecklist() {
        setIsChecklistOpen(false)
        setActiveShipmentId(null)
    }

    function toggleItemChecked(shipmentId: string, itemId: string) {
        setShipments((prev) =>
            prev.map((s) => {
                if (s.id !== shipmentId) return s
                const updatedItems = s.items.map((i) =>
                    i.id === itemId ? { ...i, isChecked: !i.isChecked, receivedQty: !i.isChecked ? i.orderedQty : i.receivedQty } : i,
                )
                return { ...s, items: updatedItems }
            }),
        )
    }

    function setReceivedQty(shipmentId: string, itemId: string, qty: number) {
        setShipments((prev) =>
            prev.map((s) => {
                if (s.id !== shipmentId) return s
                return {
                    ...s,
                    items: s.items.map((i) =>
                        i.id === itemId ? { ...i, receivedQty: qty } : i,
                    ),
                }
            }),
        )
    }

    function setItemNote(shipmentId: string, itemId: string, note: string) {
        setShipments((prev) =>
            prev.map((s) => {
                if (s.id !== shipmentId) return s
                return {
                    ...s,
                    items: s.items.map((i) =>
                        i.id === itemId ? { ...i, note } : i,
                    ),
                }
            }),
        )
    }

    function finishReceiving(shipmentId: string) {
        const ship = shipments.find((s) => s.id === shipmentId)
        if (!ship) return
        const allChecked = ship.items.every((i) => i.isChecked)
        const hasShortage = ship.items.some((i) => i.receivedQty < i.orderedQty)
        const newStatus: IncomingReceivingStatus = allChecked
            ? hasShortage ? 'partial' : 'received'
            : 'partial'
        setShipments((prev) =>
            prev.map((s) =>
                s.id === shipmentId
                    ? { ...s, status: newStatus, receivedBy: 'Admin Gudang' }
                    : s,
            ),
        )
        setIsChecklistOpen(false)
        setActiveShipmentId(null)
        const label = newStatus === 'received' ? 'Penerimaan selesai lengkap.' : 'Penerimaan sebagian selesai.'
        setToastMessage(label)
        setTimeout(() => setToastMessage(null), 3000)
    }

    return {
        shipments,
        filteredShipments,
        dateFilter,
        setDateFilter,
        statusFilter,
        setStatusFilter,
        stats,
        activeShipmentId,
        activeShipment,
        isChecklistOpen,
        openChecklist,
        closeChecklist,
        toggleItemChecked,
        setReceivedQty,
        setItemNote,
        finishReceiving,
        toastMessage,
    }
}
