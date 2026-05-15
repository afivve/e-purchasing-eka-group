'use client'

import { useState, useCallback } from 'react'
import type { MenuTemplate, MenuIngredient } from '@/types'
import { MOCK_MENU_TEMPLATES } from '@/mock/menuTemplates'
import { generateId } from '@/lib/utils'

export function useMenuTemplates(clientId: string) {
    const [templates, setTemplates] = useState<MenuTemplate[]>(
        MOCK_MENU_TEMPLATES.filter((t) => t.clientId === clientId),
    )

    const saveTemplate = useCallback(
        (name: string, ingredients: MenuIngredient[]) => {
            const newTemplate: MenuTemplate = {
                id: generateId('tpl'),
                clientId,
                name,
                ingredients: ingredients.map((ing) => ({
                    ...ing,
                    id: generateId('mi'),
                })),
            }
            setTemplates((prev) => [...prev, newTemplate])
            return newTemplate
        },
        [clientId],
    )

    const deleteTemplate = useCallback((id: string) => {
        setTemplates((prev) => prev.filter((t) => t.id !== id))
    }, [])

    return {
        templates,
        saveTemplate,
        deleteTemplate,
    }
}
