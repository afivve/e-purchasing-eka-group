'use client'

import { useState, useMemo } from 'react'
import { MOCK_SHIPMENT_LETTERS } from '@/mock/shipmentLetters'
import type { ShipmentLetter, ShipmentLetterStatus, ShipmentLetterItem } from '@/types'
import { generateId } from '@/lib/utils'

export interface ShipmentLetterFormData {
    code: string
    dailyNeedId: string
    clientId: string
    clientName: string
    clientAddress: string
    menuName: string
    deliveryDate: string
    driverName: string
    vehicleNo: string
    note: string
    items: ShipmentLetterItem[]
}

const EMPTY_FORM: ShipmentLetterFormData = {
    code: '',
    dailyNeedId: '',
    clientId: '',
    clientName: '',
    clientAddress: '',
    menuName: '',
    deliveryDate: '',
    driverName: '',
    vehicleNo: '',
    note: '',
    items: [],
}

export function useShipmentLetters() {
    const [letters, setLetters] = useState<ShipmentLetter[]>(MOCK_SHIPMENT_LETTERS)
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState<ShipmentLetterStatus | 'all'>('all')
    const [dateFilter, setDateFilter] = useState<string>('2026-05-08')
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [form, setForm] = useState<ShipmentLetterFormData>(EMPTY_FORM)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [toastMessage, setToastMessage] = useState<string | null>(null)
    const [previewLetterId, setPreviewLetterId] = useState<string | null>(null)
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

    const filteredLetters = useMemo(() => {
        const q = searchQuery.toLowerCase()
        return letters.filter((l) => {
            const matchDate = dateFilter === 'all' || l.deliveryDate === dateFilter
            const matchStatus = statusFilter === 'all' || l.status === statusFilter
            const matchSearch =
                q === '' ||
                l.code.toLowerCase().includes(q) ||
                l.clientName.toLowerCase().includes(q) ||
                l.menuName.toLowerCase().includes(q)
            return matchDate && matchStatus && matchSearch
        })
    }, [letters, searchQuery, statusFilter, dateFilter])

    const stats = useMemo(() => ({
        total: letters.length,
        draft: letters.filter((l) => l.status === 'draft').length,
        inTransit: letters.filter((l) => l.status === 'in_transit').length,
        completed: letters.filter((l) => l.status === 'received_by_client' || l.status === 'completed').length,
    }), [letters])

    function openAddForm(prefill?: Partial<ShipmentLetterFormData>) {
        const nextNum = String(letters.length + 1).padStart(3, '0')
        setForm({
            ...EMPTY_FORM,
            code: `SJ/2026/05/${nextNum}`,
            ...prefill,
        })
        setEditingId(null)
        setIsFormOpen(true)
    }

    function openEditForm(id: string) {
        const l = letters.find((l) => l.id === id)
        if (!l) return
        setForm({
            code: l.code,
            dailyNeedId: l.dailyNeedId,
            clientId: l.clientId,
            clientName: l.clientName,
            clientAddress: l.clientAddress,
            menuName: l.menuName,
            deliveryDate: l.deliveryDate,
            driverName: l.driverName ?? '',
            vehicleNo: l.vehicleNo ?? '',
            note: l.note,
            items: l.items.map((i) => ({ ...i })),
        })
        setEditingId(id)
        setIsFormOpen(true)
    }

    function closeForm() {
        setIsFormOpen(false)
        setEditingId(null)
    }

    function setField<K extends keyof ShipmentLetterFormData>(key: K, value: ShipmentLetterFormData[K]) {
        setForm((prev) => ({ ...prev, [key]: value }))
    }

    function toggleItemChecked(itemId: string) {
        setForm((prev) => ({
            ...prev,
            items: prev.items.map((i) =>
                i.id === itemId ? { ...i, isChecked: !i.isChecked } : i,
            ),
        }))
    }

    function setItemQuantity(itemId: string, qty: number) {
        setForm((prev) => ({
            ...prev,
            items: prev.items.map((i) =>
                i.id === itemId ? { ...i, quantity: qty } : i,
            ),
        }))
    }

    const isValid = form.code.trim().length > 0 && form.clientId !== '' && form.deliveryDate !== ''

    async function saveLetter() {
        if (!isValid) return
        setIsSubmitting(true)
        await new Promise((r) => setTimeout(r, 700))

        if (editingId) {
            setLetters((prev) =>
                prev.map((l) =>
                    l.id === editingId
                        ? {
                            ...l,
                            code: form.code,
                            clientId: form.clientId,
                            clientName: form.clientName,
                            clientAddress: form.clientAddress,
                            menuName: form.menuName,
                            deliveryDate: form.deliveryDate,
                            driverName: form.driverName || null,
                            vehicleNo: form.vehicleNo || null,
                            note: form.note,
                            items: form.items,
                        }
                        : l,
                ),
            )
            setToastMessage(`Surat jalan ${form.code} berhasil diperbarui.`)
        } else {
            const newLetter: ShipmentLetter = {
                id: generateId('sj'),
                code: form.code,
                dailyNeedId: form.dailyNeedId,
                clientId: form.clientId,
                clientName: form.clientName,
                clientAddress: form.clientAddress,
                menuName: form.menuName,
                deliveryDate: form.deliveryDate,
                status: 'draft',
                items: form.items,
                driverName: form.driverName || null,
                vehicleNo: form.vehicleNo || null,
                note: form.note,
                createdAt: new Date().toISOString(),
            }
            setLetters((prev) => [...prev, newLetter])
            setToastMessage(`Surat jalan ${newLetter.code} berhasil dibuat.`)
        }

        setIsSubmitting(false)
        setIsFormOpen(false)
        setEditingId(null)
        setTimeout(() => setToastMessage(null), 3000)
    }

    function deleteLetter(id: string) {
        const l = letters.find((l) => l.id === id)
        setLetters((prev) => prev.filter((l) => l.id !== id))
        setDeleteConfirmId(null)
        setToastMessage(`Surat jalan ${l?.code} dihapus.`)
        setTimeout(() => setToastMessage(null), 3000)
    }

    function updateStatus(id: string, status: ShipmentLetterStatus) {
        setLetters((prev) =>
            prev.map((l) => (l.id === id ? { ...l, status } : l)),
        )
    }

    const previewLetter = letters.find((l) => l.id === previewLetterId) ?? null

    return {
        letters,
        filteredLetters,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        dateFilter,
        setDateFilter,
        stats,
        isFormOpen,
        editingId,
        openAddForm,
        openEditForm,
        closeForm,
        form,
        setField,
        toggleItemChecked,
        setItemQuantity,
        isValid,
        isSubmitting,
        saveLetter,
        deleteLetter,
        deleteConfirmId,
        setDeleteConfirmId,
        updateStatus,
        toastMessage,
        previewLetterId,
        setPreviewLetterId,
        previewLetter,
    }
}
