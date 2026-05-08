'use client'

import { useState, useMemo } from 'react'
import { MOCK_SUPPLIERS } from '@/mock/suppliers'
import { MOCK_INGREDIENTS_WITH_STOCK } from '@/mock/ingredientsWithStock'
import type { Supplier } from '@/types'
import { generateId } from '@/lib/utils'

export interface SupplierFormData {
    name: string
    contact: string
    phone: string
    address: string
    estimatedDeliveryDays: string
    priceNote: string
    ingredientIds: string[]
}

const EMPTY_FORM: SupplierFormData = {
    name: '',
    contact: '',
    phone: '',
    address: '',
    estimatedDeliveryDays: '1',
    priceNote: '',
    ingredientIds: [],
}

export function useSuppliers() {
    const [suppliers, setSuppliers] = useState<Supplier[]>(MOCK_SUPPLIERS)
    const [searchQuery, setSearchQuery] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [form, setForm] = useState<SupplierFormData>(EMPTY_FORM)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [toastMessage, setToastMessage] = useState<string | null>(null)
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

    const allIngredients = MOCK_INGREDIENTS_WITH_STOCK

    const filteredSuppliers = useMemo(() => {
        const q = searchQuery.toLowerCase()
        return suppliers.filter(
            (s) =>
                q === '' ||
                s.name.toLowerCase().includes(q) ||
                s.contact.toLowerCase().includes(q),
        )
    }, [suppliers, searchQuery])

    function openAddForm() {
        setForm(EMPTY_FORM)
        setEditingId(null)
        setIsFormOpen(true)
    }

    function openEditForm(id: string) {
        const s = suppliers.find((s) => s.id === id)
        if (!s) return
        setForm({
            name: s.name,
            contact: s.contact,
            phone: s.phone,
            address: s.address,
            estimatedDeliveryDays: String(s.estimatedDeliveryDays),
            priceNote: s.priceNote,
            ingredientIds: [...s.ingredientIds],
        })
        setEditingId(id)
        setIsFormOpen(true)
    }

    function closeForm() {
        setIsFormOpen(false)
        setEditingId(null)
    }

    function setField<K extends keyof SupplierFormData>(key: K, value: SupplierFormData[K]) {
        setForm((prev) => ({ ...prev, [key]: value }))
    }

    function toggleIngredient(id: string) {
        setForm((prev) => ({
            ...prev,
            ingredientIds: prev.ingredientIds.includes(id)
                ? prev.ingredientIds.filter((i) => i !== id)
                : [...prev.ingredientIds, id],
        }))
    }

    const isValid = form.name.trim().length > 0 && form.contact.trim().length > 0

    async function saveSupplier() {
        if (!isValid) return
        setIsSubmitting(true)
        await new Promise((r) => setTimeout(r, 700))

        if (editingId) {
            setSuppliers((prev) =>
                prev.map((s) =>
                    s.id === editingId
                        ? {
                            ...s,
                            name: form.name.trim(),
                            contact: form.contact.trim(),
                            phone: form.phone.trim(),
                            address: form.address.trim(),
                            estimatedDeliveryDays: Number(form.estimatedDeliveryDays) || 1,
                            priceNote: form.priceNote.trim(),
                            ingredientIds: form.ingredientIds,
                        }
                        : s,
                ),
            )
            setToastMessage(`Supplier "${form.name}" berhasil diperbarui.`)
        } else {
            const newSupplier: Supplier = {
                id: generateId('sup'),
                name: form.name.trim(),
                contact: form.contact.trim(),
                phone: form.phone.trim(),
                address: form.address.trim(),
                ingredientIds: form.ingredientIds,
                isActive: true,
                estimatedDeliveryDays: Number(form.estimatedDeliveryDays) || 1,
                priceNote: form.priceNote.trim(),
            }
            setSuppliers((prev) => [...prev, newSupplier])
            setToastMessage(`Supplier "${newSupplier.name}" berhasil ditambahkan.`)
        }

        setIsSubmitting(false)
        setIsFormOpen(false)
        setEditingId(null)
        setTimeout(() => setToastMessage(null), 3000)
    }

    function deleteSupplier(id: string) {
        const s = suppliers.find((s) => s.id === id)
        setSuppliers((prev) => prev.filter((s) => s.id !== id))
        setDeleteConfirmId(null)
        setToastMessage(`Supplier "${s?.name}" dihapus.`)
        setTimeout(() => setToastMessage(null), 3000)
    }

    function toggleActive(id: string) {
        setSuppliers((prev) =>
            prev.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s)),
        )
    }

    function getIngredientName(id: string): string {
        return allIngredients.find((i) => i.id === id)?.name ?? id
    }

    return {
        suppliers,
        filteredSuppliers,
        searchQuery,
        setSearchQuery,
        isFormOpen,
        editingId,
        openAddForm,
        openEditForm,
        closeForm,
        form,
        setField,
        toggleIngredient,
        isValid,
        isSubmitting,
        saveSupplier,
        deleteSupplier,
        deleteConfirmId,
        setDeleteConfirmId,
        toggleActive,
        toastMessage,
        allIngredients,
        getIngredientName,
    }
}
