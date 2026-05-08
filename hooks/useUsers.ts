'use client'

import { useState, useMemo } from 'react'
import { MOCK_APP_USERS } from '@/mock/appUsers'
import { MOCK_CLIENTS } from '@/mock/clients'
import type { AppUser, UserRole } from '@/types'
import { generateId } from '@/lib/utils'

export interface UserFormData {
    name: string
    email: string
    phone: string
    role: UserRole
    clientId: string
}

const EMPTY_FORM: UserFormData = {
    name: '',
    email: '',
    phone: '',
    role: 'admin_client',
    clientId: '',
}

export function useUsers() {
    const [users, setUsers] = useState<AppUser[]>(MOCK_APP_USERS)
    const [searchQuery, setSearchQuery] = useState('')
    const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all')
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [form, setForm] = useState<UserFormData>(EMPTY_FORM)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [toastMessage, setToastMessage] = useState<string | null>(null)

    const clients = MOCK_CLIENTS

    const filteredUsers = useMemo(() => {
        const q = searchQuery.toLowerCase()
        return users.filter((u) => {
            const matchSearch =
                q === '' ||
                u.name.toLowerCase().includes(q) ||
                u.email.toLowerCase().includes(q)
            const matchRole = roleFilter === 'all' || u.role === roleFilter
            return matchSearch && matchRole
        })
    }, [users, searchQuery, roleFilter])

    const stats = useMemo(() => ({
        total: users.length,
        active: users.filter((u) => u.isActive).length,
        inactive: users.filter((u) => !u.isActive).length,
    }), [users])

    function openAddForm() {
        setForm(EMPTY_FORM)
        setEditingId(null)
        setIsFormOpen(true)
    }

    function openEditForm(id: string) {
        const u = users.find((u) => u.id === id)
        if (!u) return
        setForm({
            name: u.name,
            email: u.email,
            phone: u.phone,
            role: u.role,
            clientId: u.clientId ?? '',
        })
        setEditingId(id)
        setIsFormOpen(true)
    }

    function closeForm() {
        setIsFormOpen(false)
        setEditingId(null)
    }

    function setField<K extends keyof UserFormData>(key: K, value: UserFormData[K]) {
        setForm((prev) => ({ ...prev, [key]: value }))
    }

    const isValid =
        form.name.trim().length > 0 && form.email.trim().includes('@')

    async function saveUser() {
        if (!isValid) return
        setIsSubmitting(true)
        await new Promise((r) => setTimeout(r, 700))

        if (editingId) {
            setUsers((prev) =>
                prev.map((u) =>
                    u.id === editingId
                        ? {
                            ...u,
                            name: form.name.trim(),
                            email: form.email.trim(),
                            phone: form.phone.trim(),
                            role: form.role,
                            clientId: form.clientId || null,
                        }
                        : u,
                ),
            )
            setToastMessage(`Pengguna "${form.name}" berhasil diperbarui.`)
        } else {
            const newUser: AppUser = {
                id: generateId('usr'),
                name: form.name.trim(),
                email: form.email.trim(),
                phone: form.phone.trim(),
                role: form.role,
                clientId: form.clientId || null,
                isActive: true,
            }
            setUsers((prev) => [...prev, newUser])
            setToastMessage(`Pengguna "${newUser.name}" berhasil ditambahkan.`)
        }

        setIsSubmitting(false)
        setIsFormOpen(false)
        setEditingId(null)
        setTimeout(() => setToastMessage(null), 3000)
    }

    function toggleActive(id: string) {
        const u = users.find((u) => u.id === id)
        setUsers((prev) =>
            prev.map((u) => (u.id === id ? { ...u, isActive: !u.isActive } : u)),
        )
        const next = !u?.isActive
        setToastMessage(
            `Akun "${u?.name}" ${next ? 'diaktifkan' : 'dinonaktifkan'}.`,
        )
        setTimeout(() => setToastMessage(null), 3000)
    }

    function getClientName(id: string | null): string {
        if (!id) return '—'
        return clients.find((c) => c.id === id)?.name ?? id
    }

    return {
        users,
        filteredUsers,
        searchQuery,
        setSearchQuery,
        roleFilter,
        setRoleFilter,
        stats,
        isFormOpen,
        editingId,
        openAddForm,
        openEditForm,
        closeForm,
        form,
        setField,
        isValid,
        isSubmitting,
        saveUser,
        toggleActive,
        toastMessage,
        clients,
        getClientName,
    }
}
