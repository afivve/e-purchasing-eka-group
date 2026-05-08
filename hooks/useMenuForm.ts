import { useState, useCallback, useMemo } from 'react'
import type { DailyMenu, MenuIngredientLine, MenuFormData } from '@/types'
import { MOCK_INGREDIENTS } from '@/mock/ingredients'
import { generateId } from '@/lib/utils'

const EMPTY_FORM: MenuFormData = {
    name: '',
    deliveryDate: '',
    portionCount: '',
    ingredientLines: [],
}

export function useMenuForm(packageId: string | null) {
    const [form, setForm] = useState<MenuFormData>(EMPTY_FORM)
    const [ingredientSearch, setIngredientSearch] = useState('')
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isAddingNew, setIsAddingNew] = useState(false)
    const [newIngName, setNewIngName] = useState('')
    const [newIngUnit, setNewIngUnit] = useState('')

    const filteredIngredients = useMemo(() => {
        const q = ingredientSearch.trim().toLowerCase()
        if (!q) return MOCK_INGREDIENTS.slice(0, 8)
        return MOCK_INGREDIENTS.filter((i) =>
            i.name.toLowerCase().includes(q)
        ).slice(0, 10)
    }, [ingredientSearch])

    const populate = useCallback((menu: DailyMenu) => {
        setForm({
            name: menu.name,
            deliveryDate: menu.deliveryDate,
            portionCount: String(menu.portionCount),
            ingredientLines: menu.ingredients.map((ing) => ({
                tempId: generateId('line'),
                ingredientId: ing.ingredientId,
                ingredientName: ing.ingredientName,
                unit: ing.unit,
                quantity: String(ing.quantity),
                note: ing.note,
                isNew: false,
            })),
        })
    }, [])

    const reset = useCallback(() => {
        setForm(EMPTY_FORM)
        setIngredientSearch('')
        setIsDropdownOpen(false)
        setIsAddingNew(false)
        setNewIngName('')
        setNewIngUnit('')
    }, [])

    const setField = useCallback(
        <K extends keyof MenuFormData>(key: K, value: MenuFormData[K]) => {
            setForm((prev) => ({ ...prev, [key]: value }))
        },
        []
    )

    const addIngredientLine = useCallback((ing: { id: string; name: string; unit: string }) => {
        setForm((prev) => ({
            ...prev,
            ingredientLines: [
                ...prev.ingredientLines,
                {
                    tempId: generateId('line'),
                    ingredientId: ing.id,
                    ingredientName: ing.name,
                    unit: ing.unit,
                    quantity: '',
                    note: '',
                    isNew: false,
                },
            ],
        }))
        setIngredientSearch('')
        setIsDropdownOpen(false)
    }, [])

    const addNewIngredient = useCallback(() => {
        if (!newIngName.trim() || !newIngUnit.trim()) return
        setForm((prev) => ({
            ...prev,
            ingredientLines: [
                ...prev.ingredientLines,
                {
                    tempId: generateId('line'),
                    ingredientId: null,
                    ingredientName: newIngName.trim(),
                    unit: newIngUnit.trim(),
                    quantity: '',
                    note: '',
                    isNew: true,
                },
            ],
        }))
        setNewIngName('')
        setNewIngUnit('')
        setIsAddingNew(false)
        setIngredientSearch('')
        setIsDropdownOpen(false)
    }, [newIngName, newIngUnit])

    const updateLine = useCallback(
        (tempId: string, updates: Partial<MenuIngredientLine>) => {
            setForm((prev) => ({
                ...prev,
                ingredientLines: prev.ingredientLines.map((l) =>
                    l.tempId === tempId ? { ...l, ...updates } : l
                ),
            }))
        },
        []
    )

    const removeLine = useCallback((tempId: string) => {
        setForm((prev) => ({
            ...prev,
            ingredientLines: prev.ingredientLines.filter((l) => l.tempId !== tempId),
        }))
    }, [])

    const isValid = useMemo(() => {
        return (
            form.name.trim() !== '' &&
            form.deliveryDate !== '' &&
            Number(form.portionCount) >= 1 &&
            form.ingredientLines.length > 0 &&
            form.ingredientLines.every((l) => Number(l.quantity) > 0)
        )
    }, [form])

    const buildMenu = useCallback(
        (existingId?: string): DailyMenu => ({
            id: existingId ?? generateId('menu'),
            packageId: packageId ?? '',
            name: form.name.trim(),
            deliveryDate: form.deliveryDate,
            portionCount: Number(form.portionCount),
            ingredients: form.ingredientLines.map((l) => ({
                id: generateId('ing'),
                ingredientId: l.ingredientId ?? generateId('custom'),
                ingredientName: l.ingredientName,
                unit: l.unit,
                quantity: Number(l.quantity),
                note: l.note,
            })),
            deliveryProgress: 0,
            status: 'pending',
        }),
        [form, packageId]
    )

    return {
        form,
        setField,
        populate,
        reset,
        ingredientSearch,
        setIngredientSearch,
        isDropdownOpen,
        setIsDropdownOpen,
        isAddingNew,
        setIsAddingNew,
        newIngName,
        setNewIngName,
        newIngUnit,
        setNewIngUnit,
        filteredIngredients,
        addIngredientLine,
        addNewIngredient,
        updateLine,
        removeLine,
        isValid,
        buildMenu,
    }
}
