export type RoleId =
    | 'admin_client'
    | 'admin_gudang_client'
    | 'manajer_koperasi'
    | 'admin_koperasi'
    | 'admin_gudang'

export interface NavItem {
    id: string
    label: string
    href: string
    iconName: string
    description?: string
}

export interface RoleConfig {
    id: RoleId
    label: string
    shortLabel: string
    homeHref: string
    accentClass: string
    navItems: NavItem[]
}
