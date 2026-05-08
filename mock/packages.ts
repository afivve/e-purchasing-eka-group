import type { WeeklyPackage, PackageGroup } from '@/types'

export const MOCK_PACKAGES: WeeklyPackage[] = [
    // Januari 2026
    {
        id: 'pkg-jan-1', name: 'Paket Minggu 1 Januari', weekPeriod: 'Minggu 1',
        startDate: '2026-01-01', endDate: '2026-01-07',
        deliveryProgress: 100, month: 1, year: 2026, weekNumber: 1,
    },
    {
        id: 'pkg-jan-2', name: 'Paket Minggu 2 Januari', weekPeriod: 'Minggu 2',
        startDate: '2026-01-08', endDate: '2026-01-14',
        deliveryProgress: 100, month: 1, year: 2026, weekNumber: 2,
    },
    {
        id: 'pkg-jan-3', name: 'Paket Minggu 3 Januari', weekPeriod: 'Minggu 3',
        startDate: '2026-01-15', endDate: '2026-01-21',
        deliveryProgress: 100, month: 1, year: 2026, weekNumber: 3,
    },
    {
        id: 'pkg-jan-4', name: 'Paket Minggu 4 Januari', weekPeriod: 'Minggu 4',
        startDate: '2026-01-22', endDate: '2026-01-31',
        deliveryProgress: 100, month: 1, year: 2026, weekNumber: 4,
    },
    // Februari 2026
    {
        id: 'pkg-feb-1', name: 'Paket Minggu 1 Februari', weekPeriod: 'Minggu 1',
        startDate: '2026-02-01', endDate: '2026-02-07',
        deliveryProgress: 100, month: 2, year: 2026, weekNumber: 1,
    },
    {
        id: 'pkg-feb-2', name: 'Paket Minggu 2 Februari', weekPeriod: 'Minggu 2',
        startDate: '2026-02-08', endDate: '2026-02-14',
        deliveryProgress: 100, month: 2, year: 2026, weekNumber: 2,
    },
    {
        id: 'pkg-feb-3', name: 'Paket Minggu 3 Februari', weekPeriod: 'Minggu 3',
        startDate: '2026-02-15', endDate: '2026-02-21',
        deliveryProgress: 100, month: 2, year: 2026, weekNumber: 3,
    },
    {
        id: 'pkg-feb-4', name: 'Paket Minggu 4 Februari', weekPeriod: 'Minggu 4',
        startDate: '2026-02-22', endDate: '2026-02-28',
        deliveryProgress: 100, month: 2, year: 2026, weekNumber: 4,
    },
    // Maret 2026
    {
        id: 'pkg-mar-1', name: 'Paket Minggu 1 Maret', weekPeriod: 'Minggu 1',
        startDate: '2026-03-01', endDate: '2026-03-07',
        deliveryProgress: 100, month: 3, year: 2026, weekNumber: 1,
    },
    {
        id: 'pkg-mar-2', name: 'Paket Minggu 2 Maret', weekPeriod: 'Minggu 2',
        startDate: '2026-03-08', endDate: '2026-03-14',
        deliveryProgress: 100, month: 3, year: 2026, weekNumber: 2,
    },
    {
        id: 'pkg-mar-3', name: 'Paket Minggu 3 Maret', weekPeriod: 'Minggu 3',
        startDate: '2026-03-15', endDate: '2026-03-21',
        deliveryProgress: 100, month: 3, year: 2026, weekNumber: 3,
    },
    {
        id: 'pkg-mar-4', name: 'Paket Minggu 4 Maret', weekPeriod: 'Minggu 4',
        startDate: '2026-03-22', endDate: '2026-03-31',
        deliveryProgress: 100, month: 3, year: 2026, weekNumber: 4,
    },
    // April 2026
    {
        id: 'pkg-apr-1', name: 'Paket Minggu 1 April', weekPeriod: 'Minggu 1',
        startDate: '2026-04-01', endDate: '2026-04-07',
        deliveryProgress: 100, month: 4, year: 2026, weekNumber: 1,
    },
    {
        id: 'pkg-apr-2', name: 'Paket Minggu 2 April', weekPeriod: 'Minggu 2',
        startDate: '2026-04-08', endDate: '2026-04-14',
        deliveryProgress: 100, month: 4, year: 2026, weekNumber: 2,
    },
    {
        id: 'pkg-apr-3', name: 'Paket Minggu 3 April', weekPeriod: 'Minggu 3',
        startDate: '2026-04-15', endDate: '2026-04-21',
        deliveryProgress: 100, month: 4, year: 2026, weekNumber: 3,
    },
    {
        id: 'pkg-apr-4', name: 'Paket Minggu 4 April', weekPeriod: 'Minggu 4',
        startDate: '2026-04-22', endDate: '2026-04-30',
        deliveryProgress: 100, month: 4, year: 2026, weekNumber: 4,
    },
    // Mei 2026
    {
        id: 'pkg-may-1', name: 'Paket Minggu 1 Mei', weekPeriod: 'Minggu 1',
        startDate: '2026-05-01', endDate: '2026-05-07',
        deliveryProgress: 100, month: 5, year: 2026, weekNumber: 1,
    },
    {
        id: 'pkg-may-2', name: 'Paket Minggu 2 Mei', weekPeriod: 'Minggu 2',
        startDate: '2026-05-08', endDate: '2026-05-14',
        deliveryProgress: 14, month: 5, year: 2026, weekNumber: 2,
    },
    {
        id: 'pkg-may-3', name: 'Paket Minggu 3 Mei', weekPeriod: 'Minggu 3',
        startDate: '2026-05-15', endDate: '2026-05-21',
        deliveryProgress: 0, month: 5, year: 2026, weekNumber: 3,
    },
    {
        id: 'pkg-may-4', name: 'Paket Minggu 4 Mei', weekPeriod: 'Minggu 4',
        startDate: '2026-05-22', endDate: '2026-05-31',
        deliveryProgress: 0, month: 5, year: 2026, weekNumber: 4,
    },
]

const MONTH_NAMES = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]

export function groupPackagesByMonth(packages: WeeklyPackage[]): PackageGroup[] {
    const map = new Map<string, PackageGroup>()

    for (const pkg of packages) {
        const key = `${pkg.year}-${String(pkg.month).padStart(2, '0')}`
        if (!map.has(key)) {
            map.set(key, {
                key,
                label: `${MONTH_NAMES[pkg.month - 1]} ${pkg.year}`,
                packages: [],
            })
        }
        map.get(key)!.packages.push(pkg)
    }

    return Array.from(map.values()).sort((a, b) => a.key.localeCompare(b.key))
}
