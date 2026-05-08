'use client'

import { useState, useMemo } from 'react'
import { MOCK_DAILY_NEEDS } from '@/mock/dailyNeeds'
import { MOCK_CLIENTS } from '@/mock/clients'
import type { DailyNeed } from '@/types'

export type AdminNeedDateFilter = 'yesterday' | 'today' | 'tomorrow' | 'all'

export function useAdminDailyNeeds() {
    const [needs] = useState<DailyNeed[]>(MOCK_DAILY_NEEDS)
    const [dateFilter, setDateFilter] = useState<AdminNeedDateFilter>('today')
    const [clientFilter, setClientFilter] = useState<string>('all')

    const TODAY = '2026-05-08'
    const YESTERDAY = '2026-05-07'
    const TOMORROW = '2026-05-09'

    const filteredNeeds = useMemo(() => {
        return needs.filter((n) => {
            const dateMatch =
                dateFilter === 'all' ||
                (dateFilter === 'yesterday' && n.deliveryDate === YESTERDAY) ||
                (dateFilter === 'today' && n.deliveryDate === TODAY) ||
                (dateFilter === 'tomorrow' && n.deliveryDate === TOMORROW)
            const clientMatch = clientFilter === 'all' || n.clientId === clientFilter
            return dateMatch && clientMatch
        })
    }, [needs, dateFilter, clientFilter])

    const todayStats = useMemo(() => {
        const todayNeeds = needs.filter((n) => n.deliveryDate === TODAY)
        return {
            total: todayNeeds.length,
            unscheduled: todayNeeds.filter((n) => n.deliveryStatus === 'unscheduled').length,
            inProcess: todayNeeds.filter((n) => n.deliveryStatus === 'in_process').length,
            complete: todayNeeds.filter((n) => n.deliveryStatus === 'complete').length,
        }
    }, [needs])

    return {
        needs,
        filteredNeeds,
        dateFilter,
        setDateFilter,
        clientFilter,
        setClientFilter,
        todayStats,
        clients: MOCK_CLIENTS,
    }
}
