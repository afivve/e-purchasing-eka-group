"use client";

import { useState } from "react";
import { Truck } from "lucide-react";
import { MOCK_SHIPMENT_LETTERS } from "@/mock/shipmentLetters";
import ShipmentMonitoringCard from "@/components/features/admin-gudang/ShipmentMonitoringCard";
import type { ShipmentLetterStatus } from "@/types";

const STATUS_TABS: { value: ShipmentLetterStatus | "all"; label: string }[] = [
  { value: "all", label: "Semua" },
  { value: "scheduled", label: "Terjadwal" },
  { value: "in_transit", label: "Jalan" },
  { value: "partial_arrived", label: "Sebagian" },
  { value: "completed", label: "Selesai" },
];

export default function PengirimanPage() {
  const [statusFilter, setStatusFilter] = useState<
    ShipmentLetterStatus | "all"
  >("all");

  const filtered = MOCK_SHIPMENT_LETTERS.filter(
    (l) => statusFilter === "all" || l.status === statusFilter,
  );

  // Group by deliveryDate
  const grouped = filtered.reduce<Record<string, typeof filtered>>((acc, l) => {
    if (!acc[l.deliveryDate]) acc[l.deliveryDate] = [];
    acc[l.deliveryDate].push(l);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <>
      {/* Sticky header */}
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white shadow-sm">
        <div className="px-4 pb-2 pt-4">
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-slate-800">
              Monitoring Pengiriman
            </h1>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] text-slate-500">
              Hanya Lihat
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            {MOCK_SHIPMENT_LETTERS.length} surat jalan total
          </p>
        </div>

        {/* Status tabs */}
        <div className="flex border-t border-slate-100">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={`flex-1 py-2.5 text-[10px] font-medium transition-colors ${statusFilter === tab.value ? "border-b-2 border-emerald-700 text-emerald-700" : "text-slate-500 hover:text-slate-700"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4 space-y-6">
        {sortedDates.length > 0 ? (
          sortedDates.map((date) => (
            <div key={date}>
              <p className="mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                {date}
              </p>
              <div className="space-y-3">
                {grouped[date].map((letter) => (
                  <ShipmentMonitoringCard key={letter.id} letter={letter} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white py-12 text-center">
            <Truck size={32} className="mb-3 text-slate-300" />
            <p className="text-sm font-medium text-slate-500">
              Tidak ada pengiriman
            </p>
            <p className="text-xs text-slate-400">Coba ubah filter status</p>
          </div>
        )}
      </div>
    </>
  );
}
