'use client'

import { useState, useMemo } from 'react'
import { MOCK_TRANSPORT_REQUESTS, MOCK_DRIVERS } from '@/mock/transportRequests'
import { MOCK_ARMADA } from '@/mock/armada'
import type { TransportRequest } from '@/types'

export interface TransportUpdateFormData {
    vehicleNo: string
    vehicleType: string
    driverName: string
    departureTime: string
}

const EMPTY_UPDATE: TransportUpdateFormData = {
    vehicleNo: '',
    vehicleType: '',
    driverName: '',
    departureTime: '',
}

export function useTransporterRequests() {
    const [requests, setRequests] = useState<TransportRequest[]>(MOCK_TRANSPORT_REQUESTS)
    const [isUpdateOpen, setIsUpdateOpen] = useState(false)
    const [activeRequestId, setActiveRequestId] = useState<string | null>(null)
    const [form, setForm] = useState<TransportUpdateFormData>(EMPTY_UPDATE)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [toastMessage, setToastMessage] = useState<string | null>(null)
    const [filterDate, setFilterDate] = useState<string>('')

    const activeArmada = MOCK_ARMADA.filter((a) => a.isActive)
    const drivers = MOCK_DRIVERS

    const filteredRequests = useMemo(() => {
        if (!filterDate) return requests
        return requests.filter((r) => r.deliveryDate === filterDate)
    }, [requests, filterDate])

    function openUpdate(id: string) {
        const req = requests.find((r) => r.id === id)
        if (!req) return
        setForm({
            vehicleNo: req.vehicleNo,
            vehicleType: req.vehicleType,
            driverName: req.driverName,
            departureTime: req.departureTime,
        })
        setActiveRequestId(id)
        setIsUpdateOpen(true)
    }

    function closeUpdate() {
        setIsUpdateOpen(false)
        setActiveRequestId(null)
    }

    function setField<K extends keyof TransportUpdateFormData>(
        key: K,
        value: TransportUpdateFormData[K],
    ) {
        setForm((prev) => ({ ...prev, [key]: value }))
    }

    function selectArmada(platNo: string) {
        const a = MOCK_ARMADA.find((a) => a.platNo === platNo)
        setForm((prev) => ({
            ...prev,
            vehicleNo: platNo,
            vehicleType: a ? a.jenis : prev.vehicleType,
        }))
    }

    const isValid = form.vehicleNo.length > 0 && form.driverName.length > 0

    async function saveUpdate() {
        if (!activeRequestId || !isValid) return
        setIsSubmitting(true)
        await new Promise((r) => setTimeout(r, 500))

        setRequests((prev) =>
            prev.map((r) => {
                if (r.id !== activeRequestId) return r
                const updated: TransportRequest = {
                    ...r,
                    vehicleNo: form.vehicleNo,
                    vehicleType: form.vehicleType,
                    driverName: form.driverName,
                    departureTime: form.departureTime,
                    status:
                        r.status === 'waiting_driver' && form.driverName && form.vehicleNo
                            ? 'scheduled'
                            : r.status,
                }
                return updated
            }),
        )

        setIsSubmitting(false)
        setIsUpdateOpen(false)
        setActiveRequestId(null)
        setToastMessage('Permintaan berhasil diperbarui.')
        setTimeout(() => setToastMessage(null), 3000)
    }

    return {
        requests,
        filteredRequests,
        filterDate,
        setFilterDate,
        isUpdateOpen,
        activeRequestId,
        openUpdate,
        closeUpdate,
        form,
        setField,
        selectArmada,
        isValid,
        isSubmitting,
        saveUpdate,
        toastMessage,
        activeArmada,
        drivers,
    }
}
