'use client'

import { useState, useMemo } from 'react'
import { MOCK_PICKUP_REQUESTS } from '@/mock/pickupRequests'
import { MOCK_DRIVERS } from '@/mock/transportRequests'
import type { PickupRequest, PickupRequestStatus, PickupDestination } from '@/types'
import { generateId } from '@/lib/utils'

export interface PickupFormData {
    departureDateTime: string
    destinations: PickupDestination[]
    driverName: string
    vehicleType: string
    vehicleNo: string
    note: string
}

const EMPTY_FORM: PickupFormData = {
    departureDateTime: '',
    destinations: [],
    driverName: '',
    vehicleType: '',
    vehicleNo: '',
    note: '',
}

export function usePickupRequests() {
    const [requests, setRequests] = useState<PickupRequest[]>(MOCK_PICKUP_REQUESTS)
    const [statusFilter, setStatusFilter] = useState<PickupRequestStatus | 'all'>('all')
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [form, setForm] = useState<PickupFormData>(EMPTY_FORM)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [toastMessage, setToastMessage] = useState<string | null>(null)

    const filteredRequests = useMemo(() => {
        return requests.filter((r) =>
            statusFilter === 'all' || r.status === statusFilter
        )
    }, [requests, statusFilter])

    function openAddForm() {
        setForm(EMPTY_FORM)
        setEditingId(null)
        setIsFormOpen(true)
    }

    function openEditForm(id: string) {
        const r = requests.find((r) => r.id === id)
        if (!r) return
        setForm({
            departureDateTime: r.departureDateTime,
            destinations: r.destinations.map((d) => ({ ...d })),
            driverName: r.driverName,
            vehicleType: r.vehicleType,
            vehicleNo: r.vehicleNo,
            note: r.note,
        })
        setEditingId(id)
        setIsFormOpen(true)
    }

    function closeForm() {
        setIsFormOpen(false)
        setEditingId(null)
    }

    function setField<K extends keyof PickupFormData>(key: K, value: PickupFormData[K]) {
        setForm((prev) => ({ ...prev, [key]: value }))
    }

    function addDestination() {
        setForm((prev) => ({
            ...prev,
            destinations: [
                ...prev.destinations,
                { id: generateId('pkpd'), place: '', items: '' },
            ],
        }))
    }

    function updateDestination(id: string, field: 'place' | 'items', value: string) {
        setForm((prev) => ({
            ...prev,
            destinations: prev.destinations.map((d) =>
                d.id === id ? { ...d, [field]: value } : d,
            ),
        }))
    }

    function removeDestination(id: string) {
        setForm((prev) => ({
            ...prev,
            destinations: prev.destinations.filter((d) => d.id !== id),
        }))
    }

    const isValid =
        form.departureDateTime !== '' &&
        form.destinations.length > 0 &&
        form.destinations.every((d) => d.place.trim().length > 0)

    async function saveRequest() {
        if (!isValid) return
        setIsSubmitting(true)
        await new Promise((r) => setTimeout(r, 600))

        if (editingId) {
            setRequests((prev) =>
                prev.map((r) =>
                    r.id === editingId
                        ? {
                            ...r,
                            departureDateTime: form.departureDateTime,
                            destinations: form.destinations,
                            driverName: form.driverName,
                            vehicleType: form.vehicleType,
                            vehicleNo: form.vehicleNo,
                            note: form.note,
                        }
                        : r,
                ),
            )
            setToastMessage('Permintaan pickup diperbarui.')
        } else {
            const newReq: PickupRequest = {
                id: generateId('pkp'),
                departureDateTime: form.departureDateTime,
                destinations: form.destinations,
                driverName: form.driverName,
                vehicleType: form.vehicleType,
                vehicleNo: form.vehicleNo,
                status: 'pending',
                note: form.note,
            }
            setRequests((prev) => [...prev, newReq])
            setToastMessage('Permintaan pickup dibuat.')
        }

        setIsSubmitting(false)
        setIsFormOpen(false)
        setEditingId(null)
        setTimeout(() => setToastMessage(null), 3000)
    }

    function updateStatus(id: string, status: PickupRequestStatus) {
        setRequests((prev) =>
            prev.map((r) => (r.id === id ? { ...r, status } : r)),
        )
        setToastMessage('Status diperbarui.')
        setTimeout(() => setToastMessage(null), 3000)
    }

    return {
        requests,
        filteredRequests,
        statusFilter,
        setStatusFilter,
        isFormOpen,
        editingId,
        openAddForm,
        openEditForm,
        closeForm,
        form,
        setField,
        addDestination,
        updateDestination,
        removeDestination,
        isValid,
        isSubmitting,
        saveRequest,
        updateStatus,
        toastMessage,
        drivers: MOCK_DRIVERS,
    }
}
