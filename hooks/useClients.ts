'use client'

import { useState, useMemo } from 'react'
import { MOCK_CLIENTS } from '@/mock/clients'
import { MOCK_APP_USERS } from '@/mock/appUsers'
import type { Client, AppUser } from '@/types'
import { generateId } from '@/lib/utils'

export interface ClientFormData {
    name: string
    address: string
    kepalaSppiId: string
    akuntanClientId: string
    ahliGiziId: string
}

const EMPTY_FORM: ClientFormData = {
    name: '',
    address: '',
    kepalaSppiId: '',
    akuntanClientId: '',
    ahliGiziId: '',
}

export function useClients() {
    const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS)
    const [searchQuery, setSearchQuery] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [form, setForm] = useState<ClientFormData>(EMPTY_FORM)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [toastMessage, setToastMessage] = useState<string | null>(null)

    const users = MOCK_APP_USERS

    const filteredClients = useMemo(() => {
        const q = searchQuery.toLowerCase()
        return clients.filter(
            (c) =>
                q === '' ||
                c.name.toLowerCase().includes(q) ||
                c.address.toLowerCase().includes(q),
        )
    }, [clients, searchQuery])

    const stats = useMemo(() => ({
        total: clients.length,
        active: clients.filter((c) => c.operationalStatus === 'active').length,
        inactive: clients.filter((c) => c.operationalStatus === 'inactive').length,
    }), [clients])

    function openForm() {
        setForm(EMPTY_FORM)
        setIsFormOpen(true)
    }

    function closeForm() {
        setIsFormOpen(false)
    }

    function setField<K extends keyof ClientFormData>(key: K, value: ClientFormData[K]) {
        setForm((prev) => ({ ...prev, [key]: value }))
    }

    const isValid =
        form.name.trim().length > 0 &&
        form.kepalaSppiId !== '' &&
        form.akuntanClientId !== '' &&
        form.ahliGiziId !== ''

    async function saveClient() {
        if (!isValid) return
        setIsSubmitting(true)
        await new Promise((r) => setTimeout(r, 700))
        const newClient: Client = {
            id: generateId('cli'),
            name: form.name.trim(),
            address: form.address.trim(),
            kepalaSppiId: form.kepalaSppiId,
            akuntanClientId: form.akuntanClientId,
            ahliGiziId: form.ahliGiziId,
            activeMenuCount: 0,
            weeklyDeliveryProgress: 0,
            operationalStatus: 'active',
        }
        setClients((prev) => [...prev, newClient])
        setIsSubmitting(false)
        setIsFormOpen(false)
        setToastMessage(`Client "${newClient.name}" berhasil ditambahkan.`)
        setTimeout(() => setToastMessage(null), 3000)
    }

    function getUser(id: string): AppUser | undefined {
        return users.find((u) => u.id === id)
    }

    return {
        clients,
        filteredClients,
        searchQuery,
        setSearchQuery,
        stats,
        isFormOpen,
        openForm,
        closeForm,
        form,
        setField,
        isValid,
        isSubmitting,
        saveClient,
        toastMessage,
        getUser,
        users,
    }
}
