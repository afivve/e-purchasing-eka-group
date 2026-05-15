"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, FileText, Truck } from "lucide-react";
import { useShipments } from "@/hooks/useShipments";
import { ShipmentList } from "@/components/features/shipment/ShipmentList";
import { ShipmentDetailSheet } from "@/components/features/shipment/ShipmentDetailSheet";
import { InvoiceCard } from "@/components/features/akuntan-dapur/InvoiceCard";
import { MOCK_INCOMING_INVOICES } from "@/mock/incomingInvoices";
import { cn } from "@/lib/utils";
import type { StatusFilter } from "@/hooks/useShipments";
import type { InvoicePaymentStatus } from "@/types";

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
  { value: "delivered", label: "Sampai" },
  { value: "checked", label: "Diterima ✓" },
];

const INVOICE_STATUS_OPTIONS: {
  value: InvoicePaymentStatus | "all";
  label: string;
}[] = [
  { value: "all", label: "Semua" },
  { value: "unpaid", label: "Belum Dibayar" },
  { value: "partial", label: "Sebagian" },
  { value: "paid", label: "Lunas" },
];

type PageTab = "pengiriman" | "invoice";

export default function PengirimanPage() {
  const [activeTab, setActiveTab] = useState<PageTab>("pengiriman");
  const [invoiceFilter, setInvoiceFilter] = useState<
    InvoicePaymentStatus | "all"
  >("all");
  const [invoiceSearch, setInvoiceSearch] = useState("");

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

  const filteredInvoices = MOCK_INCOMING_INVOICES.filter((inv) => {
    const matchStatus =
      invoiceFilter === "all" || inv.paymentStatus === invoiceFilter;
    const q = invoiceSearch.toLowerCase();
    const matchSearch =
      q === "" ||
      inv.invoiceNo.toLowerCase().includes(q) ||
      inv.supplierName.toLowerCase().includes(q) ||
      (inv.suratJalanNo?.toLowerCase().includes(q) ?? false);
    return matchStatus && matchSearch;
  });

  const unpaidCount = MOCK_INCOMING_INVOICES.filter(
    (inv) => inv.paymentStatus !== "paid",
  ).length;

  return (
    <>
      {/* ── Sticky page sub-header ──────────────────────────────────────── */}
      <div className="sticky top-0 z-10 flex flex-col gap-0 border-b border-slate-100 bg-white">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2 px-4 pb-2.5 pt-3">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-sm font-bold text-slate-900">
              Pengiriman & Invoice
            </h1>
            <p className="text-[11px] text-slate-400">{TODAY_LABEL}</p>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            {pendingCheckCount > 0 && activeTab === "pengiriman" && (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-semibold text-teal-700 border border-teal-200">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                {pendingCheckCount} dicek
              </span>
            )}
            {unpaidCount > 0 && activeTab === "invoice" && (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-700 border border-red-200">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                {unpaidCount} belum lunas
              </span>
            )}
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex px-4 gap-0">
          <button
            type="button"
            onClick={() => setActiveTab("pengiriman")}
            className={cn(
              "flex items-center gap-1.5 px-3 pb-2.5 pt-1 text-xs font-semibold border-b-2 transition-colors",
              activeTab === "pengiriman"
                ? "border-teal-600 text-teal-700"
                : "border-transparent text-slate-400 hover:text-slate-600",
            )}
          >
            <Truck size={13} />
            Pengiriman
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("invoice")}
            className={cn(
              "flex items-center gap-1.5 px-3 pb-2.5 pt-1 text-xs font-semibold border-b-2 transition-colors",
              activeTab === "invoice"
                ? "border-teal-600 text-teal-700"
                : "border-transparent text-slate-400 hover:text-slate-600",
            )}
          >
            <FileText size={13} />
            Invoice Masuk
            {unpaidCount > 0 && (
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {unpaidCount}
              </span>
            )}
          </button>
        </div>

        {/* Search + filter row */}
        <div className="flex gap-2 px-4 pb-3 pt-2.5 border-t border-slate-100">
          {activeTab === "pengiriman" ? (
            <>
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
              <div className="relative shrink-0">
                <SlidersHorizontal
                  size={13}
                  className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value as StatusFilter)
                  }
                  className="h-9 appearance-none rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 text-sm text-slate-600 outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 cursor-pointer"
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            <>
              <div className="relative flex-1">
                <Search
                  size={14}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="search"
                  placeholder="Cari no. invoice, supplier..."
                  value={invoiceSearch}
                  onChange={(e) => setInvoiceSearch(e.target.value)}
                  className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                />
              </div>
              <div className="relative shrink-0">
                <SlidersHorizontal
                  size={13}
                  className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <select
                  value={invoiceFilter}
                  onChange={(e) =>
                    setInvoiceFilter(
                      e.target.value as InvoicePaymentStatus | "all",
                    )
                  }
                  className="h-9 appearance-none rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 text-sm text-slate-600 outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 cursor-pointer"
                >
                  {INVOICE_STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      {activeTab === "pengiriman" ? (
        <ShipmentList
          shipments={filteredShipments}
          onDetail={openDetail}
          isLoading={isLoading}
        />
      ) : (
        <div className="flex flex-col gap-3 px-4 py-3">
          {filteredInvoices.length === 0 ? (
            <div className="my-6 flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                <FileText size={22} className="text-slate-400" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-slate-700">
                  Tidak ada invoice
                </p>
                <p className="max-w-55 text-xs text-slate-400">
                  Coba ubah filter atau kata kunci pencarian.
                </p>
              </div>
            </div>
          ) : (
            filteredInvoices.map((inv) => (
              <InvoiceCard key={inv.id} invoice={inv} onClick={() => {}} />
            ))
          )}
        </div>
      )}

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
