import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDate(dateStr: string): string {
    const date = new Date(dateStr + 'T00:00:00')
    return date.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
}

export function formatShortDate(dateStr: string): string {
    const date = new Date(dateStr + 'T00:00:00')
    return date.toLocaleDateString('id-ID', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
    })
}

export function formatDateRange(start: string, end: string): string {
    const s = new Date(start + 'T00:00:00')
    const e = new Date(end + 'T00:00:00')
    const startStr = s.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
    const endStr = e.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    return `${startStr} – ${endStr}`
}

/**
 * Menu terkunci jika sudah melewati H-1 jam 23:59 dari tanggal pengiriman.
 */
export function isMenuLocked(deliveryDate: string): boolean {
    const now = new Date()
    const delivery = new Date(deliveryDate + 'T00:00:00')
    const cutoff = new Date(delivery)
    cutoff.setDate(cutoff.getDate() - 1)
    cutoff.setHours(23, 59, 59, 999)
    return now > cutoff
}

export function generateId(prefix = 'id'): string {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}
