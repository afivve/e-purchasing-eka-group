'use client'

import { useState, useMemo } from 'react'
import { MOCK_TRANSPORT_REQUESTS, MOCK_DRIVERS, MOCK_VEHICLES } from '@/mock/transportRequests'
import { MOCK_CLIENTS } from '@/mock/clients'
import type { TransportRequest, TransportStatus } from '@/types'
import { generateId } from '@/lib/utils'

export interface TransportFormData {
    destination: string
    clientId: string
    clientName: string
    deliveryDate: string
    driverName: string
    vehicleType: string
    vehicleNo: string
    note: string
    shipmentLetterIds: string[]
}

const EMPTY_FORM: TransportFormData = {
    destination: '',
    clientId: '',
    clientName: '',
    deliveryDate: '',
    driverName: '',
    vehicleType: '',
    vehicleNo: '',
    note: '',
    shipmentLetterIds: [],
}

export function useTransport() {
    const [requests, setRequests] = useState<TransportRequest[]>(MOCK_TRANSPORT_REQUESTS)
    const [dateFilter, setDateFilter] = useState<string>('all')
    const [statusFilter, setStatusFilter] = useState<TransportStatus | 'all'>('all')
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [form, setForm] = useState<TransportFormData>(EMPTY_FORM)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [toastMessage, setToastMessage] = useState<string | null>(null)

    const filteredRequests = useMemo(() => {
        return requests.filter((r) => {
            const matchDate = dateFilter === 'all' || r.deliveryDate === dateFilter
            const matchStatus = statusFilter === 'all' || r.status === statusFilter
            return matchDate && matchStatus
        })
    }, [requests, dateFilter, statusFilter])

    function openAddForm() {
        setForm(EMPTY_FORM)
        setEditingId(null)
        setIsFormOpen(true)
    }

    function openEditForm(id: string) {
        const r = requests.find((r) => r.id === id)
        if (!r) return
        setForm({
            destination: r.destination,
            clientId: r.clientId,
            clientName: r.clientName,
            deliveryDate: r.deliveryDate,
            driverName: r.driverName,
            vehicleType: r.vehicleType,
            vehicleNo: r.vehicleNo,
            note: r.note,
            shipmentLetterIds: [...r.shipmentLetterIds],
        })
        setEditingId(id)
        setIsFormOpen(true)
    }

    function closeForm() {
        setIsFormOpen(false)
        setEditingId(null)
    }

    function setField<K extends keyof TransportFormData>(key: K, value: TransportFormData[K]) {
        setForm((prev) => ({ ...prev, [key]: value }))
    }

    const isValid =
        form.destination.trim().length > 0 &&
        form.deliveryDate !== '' &&
        form.driverName !== ''

    async function saveRequest() {
        if (!isValid) return
        setIsSubmitting(true)
        await new Promise((r) => setTimeout(r, 700))

        if (editingId) {
            setRequests((prev) =>
                prev.map((r) =>
                    r.id === editingId
                        ? {
                            ...r,
                            destination: form.destination,
                            clientId: form.clientId,
                            clientName: form.clientName,
                            deliveryDate: form.deliveryDate,
                            driverName: form.driverName,
                            vehicleType: form.vehicleType,
                            vehicleNo: form.vehicleNo,
                            note: form.note,
                            shipmentLetterIds: form.shipmentLetterIds,
                        }
                        : r,
                ),
            )
            setToastMessage('Permintaan transportasi diperbarui.')
        } else {
            const newReq: TransportRequest = {
                id: generateId('trp'),
                destination: form.destination,
                clientId: form.clientId,
                clientName: form.clientName,
                deliveryDate: form.deliveryDate,
                driverName: form.driverName,
                vehicleType: form.vehicleType,
                vehicleNo: form.vehicleNo,
                status: 'waiting_driver',
                note: form.note,
                shipmentLetterIds: form.shipmentLetterIds,
            }
            setRequests((prev) => [...prev, newReq])
            setToastMessage('Permintaan transportasi dibuat.')
        }

        setIsSubmitting(false)
        setIsFormOpen(false)
        setEditingId(null)
        setTimeout(() => setToastMessage(null), 3000)
    }

    function updateStatus(id: string, status: TransportStatus) {
        setRequests((prev) =>
            prev.map((r) => (r.id === id ? { ...r, status } : r)),
        )
        setToastMessage('Status diperbarui.')
        setTimeout(() => setToastMessage(null), 3000)
    }

    return {
        requests,
        filteredRequests,
        dateFilter,
        setDateFilter,
        statusFilter,
        setStatusFilter,
        isFormOpen,
        editingId,
        openAddForm,
        openEditForm,
        closeForm,
        form,
        setField,
        isValid,
        isSubmitting,
        saveRequest,
        updateStatus,
        toastMessage,
        drivers: MOCK_DRIVERS,
        vehicles: MOCK_VEHICLES,
        clients: MOCK_CLIENTS,
    }
}
