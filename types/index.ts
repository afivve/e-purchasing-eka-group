export type DeliveryStatus = 'pending' | 'partial' | 'complete'

export interface WeeklyPackage {
    id: string
    name: string
    weekPeriod: string
    startDate: string
    endDate: string
    deliveryProgress: number
    month: number
    year: number
    weekNumber: number
}

export interface PackageGroup {
    key: string
    label: string
    packages: WeeklyPackage[]
}

export interface Ingredient {
    id: string
    name: string
    unit: string
    category: string
}

export interface MenuIngredient {
    id: string
    ingredientId: string
    ingredientName: string
    unit: string
    quantity: number
    note: string
}

export interface DailyMenu {
    id: string
    packageId: string
    name: string
    deliveryDate: string
    portionCount: number
    ingredients: MenuIngredient[]
    deliveryProgress: number
    status: DeliveryStatus
}

export interface MenuIngredientLine {
    tempId: string
    ingredientId: string | null
    ingredientName: string
    unit: string
    quantity: string
    note: string
    isNew: boolean
}

export interface MenuFormData {
    name: string
    deliveryDate: string
    portionCount: string
    ingredientLines: MenuIngredientLine[]
}

export interface ToastItem {
    id: string
    message: string
    type: 'success' | 'error' | 'warning'
}

export interface MenuTemplate {
    id: string
    clientId: string
    name: string
    ingredients: MenuIngredient[]
}

// ─── Shipment / Receiving ──────────────────────────────────────────────────────

export type ShipmentStatus = 'scheduled' | 'in_transit' | 'delivered' | 'checked'

export type ItemReceivingStatus = 'pending' | 'ok' | 'short' | 'missing'

export interface ShipmentItem {
    id: string
    ingredientName: string
    unit: string
    orderedQty: number
    receivedQty: number
    supplier: string
    receivingStatus: ItemReceivingStatus
    receivingNote: string
}

export interface Shipment {
    id: string
    suratJalanNo: string
    clientName: string
    clientAddress: string
    deliveryDate: string
    scheduledTime: string
    status: ShipmentStatus
    items: ShipmentItem[]
    deliveryNote: string
    driverName: string
    vehicleNo: string
}

// ─── Manager / Koperasi domain ────────────────────────────────────────────────

export type UserRole =
    | 'admin_client'
    | 'admin_gudang_client'
    | 'manajer_koperasi'
    | 'admin_koperasi'
    | 'admin_gudang'

export interface ClientContact {
    id: string
    name: string
    role: string
    phone: string
}

export interface Client {
    id: string
    name: string
    address: string
    clientType: 'dapur' | 'non_dapur'
    kepalaSppiId: string
    akuntanClientId: string
    ahliGiziId: string
    managerClientId: string
    activeMenuCount: number
    weeklyDeliveryProgress: number
    operationalStatus: 'active' | 'inactive'
}

export interface AppUser {
    id: string
    name: string
    email: string
    phone: string
    role: UserRole
    clientId: string | null
    isActive: boolean
}

export type StockStatus = 'ok' | 'low' | 'empty'

export interface Supplier {
    id: string
    name: string
    contact: string
    phone: string
    address: string
    ingredientIds: string[]
    isActive: boolean
    estimatedDeliveryDays: number
    priceNote: string
}

export interface IngredientWithStock {
    id: string
    name: string
    unit: string
    category: string
    stock: number
    stockStatus: StockStatus
    primarySupplierId: string | null
    supplierIds: string[]
}

export type DailyNeedDeliveryStatus = 'unscheduled' | 'in_process' | 'partial' | 'complete'
export type DailyNeedPaymentStatus = 'unpaid' | 'paid'

// ─── Admin Koperasi domain ────────────────────────────────────────────────────

export type ShipmentLetterStatus =
    | 'draft'
    | 'waiting_pickup'
    | 'scheduled'
    | 'in_transit'
    | 'partial_arrived'
    | 'completed'
    | 'received_by_client'

export interface ShipmentLetterItem {
    id: string
    ingredientId: string
    ingredientName: string
    unit: string
    quantity: number
    supplierId: string | null
    supplierName: string | null
    isChecked: boolean
}

export interface ShipmentLetter {
    id: string
    code: string
    dailyNeedId: string
    clientId: string
    clientName: string
    clientAddress: string
    menuName: string
    deliveryDate: string
    status: ShipmentLetterStatus
    items: ShipmentLetterItem[]
    driverName: string | null
    vehicleNo: string | null
    note: string
    createdAt: string
}

export type TransportStatus =
    | 'waiting_driver'
    | 'scheduled'
    | 'in_transit'
    | 'completed'

export interface TransportRequest {
    id: string
    destination: string
    clientId: string
    clientName: string
    deliveryDate: string
    departureTime: string
    driverName: string
    vehicleType: string
    vehicleNo: string
    status: TransportStatus
    note: string
    shipmentLetterIds: string[]
}

export interface Armada {
    id: string
    platNo: string
    merk: string
    jenis: string
    isActive: boolean
}

export type PickupRequestStatus = 'pending' | 'confirmed' | 'in_transit' | 'done'

export interface PickupDestination {
    id: string
    place: string
    items: string
}

export interface PickupRequest {
    id: string
    departureDateTime: string
    destinations: PickupDestination[]
    driverName: string
    vehicleType: string
    vehicleNo: string
    status: PickupRequestStatus
    note: string
}

export interface SupplierSplit {
    supplierId: string
    supplierName: string
    quantity: number
}

export interface DailyNeedIngredient {
    id: string
    ingredientId: string
    ingredientName: string
    unit: string
    quantity: number
    supplierSplits: SupplierSplit[]
    deliveryStatus: DailyNeedDeliveryStatus
}

export interface DailyNeed {
    id: string
    clientId: string
    clientName: string
    menuName: string
    deliveryDate: string
    portionCount: number
    ingredients: DailyNeedIngredient[]
    deliveryStatus: DailyNeedDeliveryStatus
    paymentStatus: DailyNeedPaymentStatus
}

// ─── Admin Gudang domain ──────────────────────────────────────────────────────

export type WarehouseStockStatus = 'ok' | 'low' | 'empty' | 'discrepancy'

export interface WarehouseIngredient {
    id: string
    ingredientId: string
    name: string
    unit: string
    category: string
    systemStock: number
    realStock: number
    stockStatus: WarehouseStockStatus
    primarySupplierId: string | null
    primarySupplierName: string | null
    lastAdjustedAt: string | null
    lastNote: string
}

export type IncomingReceivingStatus = 'pending' | 'inspecting' | 'partial' | 'received'

export interface IncomingShipmentItem {
    id: string
    ingredientId: string
    ingredientName: string
    unit: string
    orderedQty: number
    receivedQty: number
    isChecked: boolean
    note: string
}

export interface IncomingShipment {
    id: string
    code: string
    supplierId: string
    supplierName: string
    deliveryDate: string
    status: IncomingReceivingStatus
    items: IncomingShipmentItem[]
    note: string
    receivedBy: string | null
    createdAt: string
}

// ─── Akuntan Dapur — Invoice Masuk ────────────────────────────────────────────

export type InvoicePaymentStatus = 'unpaid' | 'partial' | 'paid'

export interface IncomingInvoiceItem {
    id: string
    description: string
    qty: number
    unit: string
    unitPrice: number
    totalPrice: number
}

export interface IncomingInvoice {
    id: string
    invoiceNo: string
    suratJalanNo: string | null
    supplierName: string
    invoiceDate: string
    dueDate: string
    items: IncomingInvoiceItem[]
    totalAmount: number
    paidAmount: number
    paymentStatus: InvoicePaymentStatus
    note: string | null
}
