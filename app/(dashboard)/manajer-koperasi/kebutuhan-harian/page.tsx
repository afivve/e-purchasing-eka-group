"use client";

import { ClipboardList, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDailyNeeds } from "@/hooks/useDailyNeeds";
import { DailyNeedCard } from "@/components/features/manager/DailyNeedCard";
import { SupplierPickerSheet } from "@/components/features/manager/SupplierPickerSheet";
import { MOCK_SUPPLIERS } from "@/mock/suppliers";
import { MOCK_CLIENTS } from "@/mock/clients";
import type { DailyNeedDateFilter } from "@/hooks/useDailyNeeds";

const DATE_TABS: { value: DailyNeedDateFilter; label: string }[] = [
  { value: "yesterday", label: "Kemarin" },
  { value: "today", label: "Hari Ini" },
  { value: "tomorrow", label: "Besok" },
  { value: "all", label: "Semua" },
];

export default function KebutuhanHarianPage() {
  const {
    filteredNeeds,
    dateFilter,
    setDateFilter,
    clientFilter,
    setClientFilter,
    stats,
    openSupplierPicker,
    closeSupplierPicker,
    assignSupplier,
    activePickerNeed,
    activePickerIng,
    isSupplierPickerOpen,
  } = useDailyNeeds();

  const clients = MOCK_CLIENTS;

  return (
    <div className="flex flex-col">
      {/* Sticky sub-header */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-4 pt-3 pb-3 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-slate-800">
              Kebutuhan Harian
            </h1>
            <p className="text-xs text-slate-500">
              {stats.unscheduled > 0 && (
                <span className="text-orange-500">
                  {stats.unscheduled} belum terjadwal ·{" "}
                </span>
              )}
              {stats.inProcess} proses · {stats.complete} selesai
            </p>
          </div>
        </div>

        {/* Date tabs */}
        <div className="flex gap-1.5">
          {DATE_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setDateFilter(tab.value)}
              className={cn(
                "flex-1 h-8 rounded-lg text-xs font-medium transition-colors",
                dateFilter === tab.value
                  ? "bg-violet-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Client filter */}
        <div className="relative">
          <select
            value={clientFilter}
            onChange={(e) => setClientFilter(e.target.value)}
            className="h-9 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-9 text-xs text-slate-700 focus:border-violet-400 focus:outline-none"
          >
            <option value="all">Semua Client</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* List */}
      <div className="px-4 py-4 space-y-3">
        {filteredNeeds.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-12 text-center">
            <ClipboardList className="mx-auto h-8 w-8 text-slate-300 mb-3" />
            <p className="text-sm font-medium text-slate-500">
              Tidak ada kebutuhan harian
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Coba ganti filter tanggal atau client.
            </p>
          </div>
        ) : (
          filteredNeeds.map((need) => (
            <DailyNeedCard
              key={need.id}
              need={need}
              onPickSupplier={openSupplierPicker}
              defaultExpanded={need.ingredients.some(
                (i) => i.supplierId === null,
              )}
            />
          ))
        )}
      </div>

      {/* Supplier Picker Sheet */}
      <SupplierPickerSheet
        isOpen={isSupplierPickerOpen}
        onClose={closeSupplierPicker}
        need={activePickerNeed}
        ingredientId={activePickerIng?.id ?? null}
        allSuppliers={MOCK_SUPPLIERS}
        onAssign={assignSupplier}
      />

      <div className="h-4" />
    </div>
  );
}
