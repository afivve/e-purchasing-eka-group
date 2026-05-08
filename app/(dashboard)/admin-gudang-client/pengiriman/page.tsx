"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useShipments } from "@/hooks/useShipments";
import { ShipmentList } from "@/components/features/shipment/ShipmentList";
import { ShipmentDetailSheet } from "@/components/features/shipment/ShipmentDetailSheet";
import type { StatusFilter } from "@/hooks/useShipments";

const TODAY = new Date("2026-05-08T00:00:00");
const TODAY_LABEL = TODAY.toLocaleDateString("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "Semua Status" },
  { value: "scheduled", label: "Dijadwalkan" },
  { value: "in_transit", label: "Dalam Perjalanan" },
  { value: "partial", label: "Tiba Sebagian" },
  { value: "delivered", label: "Sampai" },
  { value: "checked", label: "Diterima ✓" },
];

export default function PengirimanPage() {
  const {
    filteredShipments,
    selectedShipment,
    isDetailOpen,
    openDetail,
    closeDetail,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    pendingCheckCount,
    updateReceivingItem,
    confirmReceiving,
    isLoading,
  } = useShipments();

  return (
    <>
      {/* ── Sticky page sub-header ──────────────────────────────────────── */}
      <div className="sticky top-0 z-10 flex flex-col gap-2.5 border-b border-slate-100 bg-white px-4 pb-3 pt-3">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-sm font-bold text-slate-900">Pengiriman</h1>
            <p className="text-[11px] text-slate-400">{TODAY_LABEL}</p>
          </div>
          {pendingCheckCount > 0 && (
            <span className="mt-0.5 inline-flex shrink-0 items-center gap-1 rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-semibold text-teal-700 border border-teal-200">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
              {pendingCheckCount} perlu dicek
            </span>
          )}
        </div>

        {/* Search + filter row */}
        <div className="flex gap-2">
          {/* Search input */}
          <div className="relative flex-1">
            <Search
              size={14}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              placeholder="Cari no. surat jalan, driver..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
            />
          </div>

          {/* Status filter */}
          <div className="relative shrink-0">
            <SlidersHorizontal
              size={13}
              className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="h-9 appearance-none rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 text-sm text-slate-600 outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 cursor-pointer"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── Shipment list ────────────────────────────────────────────────── */}
      <ShipmentList
        shipments={filteredShipments}
        onDetail={openDetail}
        isLoading={isLoading}
      />

      {/* ── Detail bottom sheet ──────────────────────────────────────────── */}
      <ShipmentDetailSheet
        open={isDetailOpen}
        shipment={selectedShipment}
        onClose={closeDetail}
        onUpdateItem={updateReceivingItem}
        onConfirmReceiving={confirmReceiving}
      />
    </>
  );
}
