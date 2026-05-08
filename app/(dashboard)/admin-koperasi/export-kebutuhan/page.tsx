"use client";

import { useState } from "react";
import { FileDown, Eye } from "lucide-react";
import {
  useAdminDailyNeeds,
  type AdminNeedDateFilter,
} from "@/hooks/useAdminDailyNeeds";
import { ExportNeedsPreview } from "@/components/features/admin-koperasi/ExportNeedsPreview";
import { DailyNeedBadge } from "@/components/features/manager/DailyNeedBadge";
import { formatDate } from "@/lib/utils";

const DATE_TABS: { id: AdminNeedDateFilter; label: string }[] = [
  { id: "yesterday", label: "Kemarin" },
  { id: "today", label: "Hari Ini" },
  { id: "tomorrow", label: "Besok" },
  { id: "all", label: "Semua" },
];

const DATE_LABEL: Record<AdminNeedDateFilter, string> = {
  yesterday: "2026-05-07",
  today: "2026-05-08",
  tomorrow: "2026-05-09",
  all: "all",
};

export default function ExportKebutuhanPage() {
  const {
    filteredNeeds,
    dateFilter,
    setDateFilter,
    clientFilter,
    setClientFilter,
    clients,
  } = useAdminDailyNeeds();
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="min-h-dvh bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white px-4 pt-4 pb-3 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-lg font-bold text-slate-800">Export Kebutuhan</h1>
          <button
            onClick={() => setShowPreview(true)}
            className="flex items-center gap-1.5 rounded-xl bg-orange-600 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-700 active:bg-orange-800"
          >
            <Eye size={14} />
            Preview &amp; Export
          </button>
        </div>

        {/* Date tabs */}
        <div className="flex gap-2 overflow-x-auto pb-0.5">
          {DATE_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setDateFilter(tab.id)}
              className={[
                "shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                dateFilter === tab.id
                  ? "bg-orange-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200",
              ].join(" ")}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Client filter */}
        <div className="mt-2">
          <select
            value={clientFilter}
            onChange={(e) => setClientFilter(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-orange-400 focus:outline-none"
          >
            <option value="all">Semua Klien</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4 space-y-3">
        <p className="text-xs text-slate-500">
          {filteredNeeds.length} kebutuhan siap diekspor
        </p>

        {filteredNeeds.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-12 text-center text-slate-400">
            <FileDown size={30} className="mx-auto mb-2 opacity-40" />
            <p className="text-sm font-medium">Tidak ada data untuk diekspor</p>
          </div>
        ) : (
          filteredNeeds.map((need) => (
            <div
              key={need.id}
              className="rounded-xl border border-slate-200 bg-white p-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-800 truncate">
                    {need.clientName}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {need.menuName}
                  </p>
                  <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-400">
                    <span>{formatDate(need.deliveryDate)}</span>
                    <span>•</span>
                    <span>{need.portionCount} porsi</span>
                    <span>•</span>
                    <span>{need.ingredients.length} bahan</span>
                  </div>
                </div>
                <DailyNeedBadge status={need.deliveryStatus} />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Preview modal */}
      {showPreview && (
        <ExportNeedsPreview
          needs={filteredNeeds}
          dateFilter={DATE_LABEL[dateFilter]}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}
