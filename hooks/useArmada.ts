'use client'

import { useState } from 'react'
import { MOCK_ARMADA } from '@/mock/armada'
import type { Armada } from '@/types'
import { generateId } from '@/lib/utils'

export interface ArmadaFormData {
    platNo: string
    merk: string
    jenis: string
}

const EMPTY_FORM: ArmadaFormData = {
    platNo: '',
    merk: '',
    jenis: '',
}

const JENIS_OPTIONS = [
    'Motor Kurir',
    'Pickup Engkel',
    'Pickup Double',
    'Box Truck',
    'Truk Besar',
]

export function useArmada() {
    const [armada, setArmada] = useState<Armada[]>(MOCK_ARMADA)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [form, setForm] = useState<ArmadaFormData>(EMPTY_FORM)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [toastMessage, setToastMessage] = useState<string | null>(null)

    function openAddForm() {
        setForm(EMPTY_FORM)
        setEditingId(null)
        setIsFormOpen(true)
    }

    function openEditForm(id: string) {
        const a = armada.find((a) => a.id === id)
        if (!a) return
        setForm({ platNo: a.platNo, merk: a.merk, jenis: a.jenis })
        setEditingId(id)
        setIsFormOpen(true)
    }

    function closeForm() {
        setIsFormOpen(false)
        setEditingId(null)
    }

    function setField<K extends keyof ArmadaFormData>(key: K, value: ArmadaFormData[K]) {
        setForm((prev) => ({ ...prev, [key]: value }))
    }

    const isValid = form.platNo.trim().length > 0 && form.jenis.length > 0

    async function saveArmada() {
        if (!isValid) return
        setIsSubmitting(true)
        await new Promise((r) => setTimeout(r, 500))

        if (editingId) {
            setArmada((prev) =>
                prev.map((a) =>
                    a.id === editingId
                        ? { ...a, platNo: form.platNo.trim(), merk: form.merk.trim(), jenis: form.jenis }
                        : a,
                ),
            )
            setToastMessage('Data armada diperbarui.')
        } else {
            const newArmada: Armada = {
                id: generateId('arm'),
                platNo: form.platNo.trim().toUpperCase(),
                merk: form.merk.trim(),
                jenis: form.jenis,
                isActive: true,
            }
            setArmada((prev) => [...prev, newArmada])
            setToastMessage('Armada berhasil ditambahkan.')
        }

        setIsSubmitting(false)
        setIsFormOpen(false)
        setEditingId(null)
        setTimeout(() => setToastMessage(null), 3000)
    }

    function toggleActive(id: string) {
        setArmada((prev) =>
            prev.map((a) => (a.id === id ? { ...a, isActive: !a.isActive } : a)),
        )
    }

    return {
        armada,
        isFormOpen,
        editingId,
        openAddForm,
        openEditForm,
        closeForm,
        form,
        setField,
        isValid,
        isSubmitting,
        saveArmada,
        toggleActive,
        toastMessage,
        jenisOptions: JENIS_OPTIONS,
    }
}
