"use client";

import { useState } from "react";
import { ClipboardList, ChevronDown, LayoutList, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDailyNeeds } from "@/hooks/useDailyNeeds";
import { DailyNeedCard } from "@/components/features/manager/DailyNeedCard";
import { SupplierPickerSheet } from "@/components/features/manager/SupplierPickerSheet";
import { DailyNeedIngredientTable } from "@/components/features/manager/DailyNeedIngredientTable";
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
  const [viewMode, setViewMode] = useState<"per_menu" | "per_bahan">(
    "per_menu",
  );

  const {
    filteredNeeds,
    dateFilter,
    setDateFilter,
    clientFilter,
    setClientFilter,
    stats,
    openSupplierPicker,
    closeSupplierPicker,
    addSupplierSplit,
    removeSupplierSplit,
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

        {/* Client filter + view toggle */}
        <div className="flex gap-2">
          <div className="relative flex-1">
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
          {/* View mode toggle */}
          <div className="flex rounded-lg border border-slate-200 overflow-hidden shrink-0">
            <button
              onClick={() => setViewMode("per_menu")}
              className={cn(
                "flex h-9 w-9 items-center justify-center transition-colors",
                viewMode === "per_menu"
                  ? "bg-violet-600 text-white"
                  : "bg-white text-slate-500 hover:bg-slate-50",
              )}
              title="Per Menu"
            >
              <LayoutList size={15} />
            </button>
            <button
              onClick={() => setViewMode("per_bahan")}
              className={cn(
                "flex h-9 w-9 items-center justify-center border-l border-slate-200 transition-colors",
                viewMode === "per_bahan"
                  ? "bg-violet-600 text-white"
                  : "bg-white text-slate-500 hover:bg-slate-50",
              )}
              title="Per Bahan"
            >
              <List size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {viewMode === "per_menu" ? (
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
                onRemoveSplit={(needId, ingId, supplierId) =>
                  removeSupplierSplit(needId, ingId, supplierId)
                }
                defaultExpanded={need.ingredients.some(
                  (i) => i.supplierSplits.length === 0,
                )}
              />
            ))
          )}
        </div>
      ) : (
        <div className="py-4">
          <DailyNeedIngredientTable
            needs={filteredNeeds}
            onPickSupplier={openSupplierPicker}
          />
        </div>
      )}

      {/* Supplier Picker Sheet */}
      <SupplierPickerSheet
        isOpen={isSupplierPickerOpen}
        onClose={closeSupplierPicker}
        need={activePickerNeed}
        ingredient={activePickerIng}
        allSuppliers={MOCK_SUPPLIERS}
        onAddSplit={addSupplierSplit}
        onRemoveSplit={removeSupplierSplit}
      />

      <div className="h-4" />
    </div>
  );
}
