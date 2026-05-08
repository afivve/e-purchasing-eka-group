"use client";

import { PackageCheck } from "lucide-react";
import { useIncomingShipments } from "@/hooks/useIncomingShipments";
import IncomingShipmentCard from "@/components/features/admin-gudang/IncomingShipmentCard";
import ReceivingChecklistSheet from "@/components/features/admin-gudang/ReceivingChecklistSheet";
import type { IncomingReceivingStatus } from "@/types";

const STATUS_TABS: { value: IncomingReceivingStatus | "all"; label: string }[] =
  [
    { value: "all", label: "Semua" },
    { value: "pending", label: "Menunggu" },
    { value: "inspecting", label: "Diperiksa" },
    { value: "partial", label: "Sebagian" },
    { value: "received", label: "Selesai" },
  ];

const DATE_OPTIONS = [
  { value: "2026-05-08", label: "Hari Ini" },
  { value: "2026-05-07", label: "Kemarin" },
  { value: "all", label: "Semua" },
];

export default function BarangDatangPage() {
  const {
    filteredShipments,
    dateFilter,
    setDateFilter,
    statusFilter,
    setStatusFilter,
    stats,
    activeShipment,
    isChecklistOpen,
    openChecklist,
    closeChecklist,
    toggleItemChecked,
    setReceivedQty,
    setItemNote,
    finishReceiving,
    toastMessage,
  } = useIncomingShipments();

  return (
    <>
      {/* Sticky header */}
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white shadow-sm">
        <div className="px-4 pb-2 pt-4">
          <h1 className="text-base font-bold text-slate-800">Barang Datang</h1>
          <p className="text-[11px] text-slate-400">
            Hari ini: {stats.todayTotal} pengiriman · {stats.pending} menunggu ·{" "}
            {stats.inspecting} diperiksa · {stats.received} selesai
          </p>
        </div>

        {/* Date filter */}
        <div className="flex gap-2 px-4 pb-2">
          {DATE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setDateFilter(opt.value)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${dateFilter === opt.value ? "bg-emerald-700 border-emerald-700 text-white" : "border-slate-200 text-slate-500 hover:bg-slate-50"}`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Status tabs */}
        <div className="flex border-t border-slate-100">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={`flex-1 py-2.5 text-[11px] font-medium transition-colors ${statusFilter === tab.value ? "border-b-2 border-emerald-700 text-emerald-700" : "text-slate-500 hover:text-slate-700"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="px-4 py-4 space-y-3">
        {filteredShipments.length > 0 ? (
          filteredShipments.map((shipment) => (
            <IncomingShipmentCard
              key={shipment.id}
              shipment={shipment}
              onPress={openChecklist}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white py-12 text-center">
            <PackageCheck size={32} className="mb-3 text-slate-300" />
            <p className="text-sm font-medium text-slate-500">
              Tidak ada barang datang
            </p>
            <p className="text-xs text-slate-400">
              Coba ubah filter tanggal atau status
            </p>
          </div>
        )}
      </div>

      {/* Checklist sheet */}
      <ReceivingChecklistSheet
        isOpen={isChecklistOpen}
        shipment={activeShipment}
        onClose={closeChecklist}
        onToggleItem={toggleItemChecked}
        onSetReceivedQty={setReceivedQty}
        onSetItemNote={setItemNote}
        onFinishReceiving={finishReceiving}
      />

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-800 px-4 py-2 text-sm text-white shadow-lg">
          {toastMessage}
        </div>
      )}
    </>
  );
}
