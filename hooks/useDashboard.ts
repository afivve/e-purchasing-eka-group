import { useState, useCallback } from 'react'
import type { DailyMenu, WeeklyPackage, ToastItem } from '@/types'
import { MOCK_MENUS } from '@/mock/menus'
import { generateId } from '@/lib/utils'

export function useDashboard() {
    const [selectedPackageId, setSelectedPackageId] = useState<string | null>('pkg-may-2')
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [menus, setMenus] = useState<DailyMenu[]>(MOCK_MENUS)
    const [searchQuery, setSearchQuery] = useState('')
    const [isSearchVisible, setIsSearchVisible] = useState(false)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingMenu, setEditingMenu] = useState<DailyMenu | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [toasts, setToasts] = useState<ToastItem[]>([])

    const selectedMenus = menus
        .filter((m) => m.packageId === selectedPackageId)
        .filter((m) =>
            searchQuery.trim() === ''
                ? true
                : m.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => a.deliveryDate.localeCompare(b.deliveryDate))

    const showToast = useCallback(
        (message: string, type: ToastItem['type'] = 'success') => {
            const id = generateId('toast')
            setToasts((prev) => [...prev, { id, message, type }])
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id))
            }, 3200)
        },
        []
    )

    const selectPackage = useCallback(
        (pkg: WeeklyPackage) => {
            if (selectedPackageId === pkg.id) {
                setIsSidebarOpen(false)
                return
            }
            setIsLoading(true)
            setSelectedPackageId(pkg.id)
            setSearchQuery('')
            setIsSearchVisible(false)
            setIsSidebarOpen(false)
            // Simulate async fetch transition
            setTimeout(() => setIsLoading(false), 350)
        },
        [selectedPackageId]
    )

    const openAddForm = useCallback(() => {
        setEditingMenu(null)
        setIsFormOpen(true)
    }, [])

    const openEditForm = useCallback((menu: DailyMenu) => {
        setEditingMenu(menu)
        setIsFormOpen(true)
    }, [])

    const closeForm = useCallback(() => {
        setIsFormOpen(false)
        setEditingMenu(null)
    }, [])

    const saveMenu = useCallback(
        (menu: DailyMenu) => {
            setMenus((prev) => {
                const exists = prev.find((m) => m.id === menu.id)
                if (exists) {
                    return prev.map((m) => (m.id === menu.id ? menu : m))
                }
                return [...prev, menu]
            })
            closeForm()
            showToast(
                editingMenu ? 'Menu berhasil diperbarui' : 'Menu berhasil ditambahkan',
                'success'
            )
        },
        [editingMenu, closeForm, showToast]
    )

    const deleteMenu = useCallback(
        (menuId: string) => {
            setMenus((prev) => prev.filter((m) => m.id !== menuId))
            showToast('Menu berhasil dihapus', 'success')
        },
        [showToast]
    )

    return {
        selectedPackageId,
        selectPackage,
        isSidebarOpen,
        setIsSidebarOpen,
        selectedMenus,
        searchQuery,
        setSearchQuery,
        isSearchVisible,
        setIsSearchVisible,
        isFormOpen,
        editingMenu,
        openAddForm,
        openEditForm,
        closeForm,
        saveMenu,
        deleteMenu,
        isLoading,
        toasts,
        showToast,
    }
}
