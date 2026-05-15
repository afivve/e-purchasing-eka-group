"use client";

import { useState } from "react";
import {
  useAdminDailyNeeds,
  type AdminNeedDateFilter,
} from "@/hooks/useAdminDailyNeeds";
import { useShipmentLetters } from "@/hooks/useShipmentLetters";
import { DailyNeedCardOps } from "@/components/features/admin-koperasi/DailyNeedCardOps";
import { ShipmentLetterFormSheet } from "@/components/features/admin-koperasi/ShipmentLetterFormSheet";
import { DailyNeedIngredientTable } from "@/components/features/manager/DailyNeedIngredientTable";
import type { DailyNeed } from "@/types";
import { ClipboardList, LayoutList, List } from "lucide-react";
import { cn } from "@/lib/utils";

const DATE_TABS: { id: AdminNeedDateFilter; label: string }[] = [
  { id: "yesterday", label: "Kemarin" },
  { id: "today", label: "Hari Ini" },
  { id: "tomorrow", label: "Besok" },
  { id: "all", label: "Semua" },
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
    clients,
  } = useAdminDailyNeeds();
  const {
    letters,
    isFormOpen,
    editingId,
    openAddForm,
    closeForm,
    form,
    setField,
    toggleItemChecked,
    setItemQuantity,
    isValid,
    isSubmitting,
    saveLetter,
    toastMessage,
  } = useShipmentLetters();

  function handleCreateShipmentLetter(need: DailyNeed) {
    openAddForm({
      dailyNeedId: need.id,
      clientId: need.clientId,
      clientName: need.clientName,
      clientAddress: "",
      menuName: need.menuName,
      deliveryDate: need.deliveryDate,
      items: need.ingredients.map((ing) => ({
        id: `sji-new-${ing.ingredientId}`,
        ingredientId: ing.ingredientId,
        ingredientName: ing.ingredientName,
        unit: ing.unit,
        quantity: ing.quantity,
        supplierId: ing.supplierSplits[0]?.supplierId ?? null,
        supplierName: ing.supplierSplits[0]?.supplierName ?? null,
        isChecked: false,
      })),
    });
  }

  function handleViewShipmentLetter(needId: string) {
    // Navigate to surat jalan page — in a real app would push route
    const letter = letters.find((l) => l.dailyNeedId === needId);
    if (letter) {
      window.location.href = `/admin-koperasi/surat-jalan`;
    }
  }

  return (
    <div className="min-h-dvh bg-slate-50">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white px-4 pt-4 pb-3 shadow-sm">
        <h1 className="text-lg font-bold text-slate-800">Kebutuhan Harian</h1>

        {/* Date filter tabs */}
        <div className="mt-3 flex gap-2 overflow-x-auto pb-0.5">
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

        {/* Client filter + view toggle */}
        <div className="mt-2 flex gap-2">
          <select
            value={clientFilter}
            onChange={(e) => setClientFilter(e.target.value)}
            className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
          >
            <option value="all">Semua Klien</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {/* View toggle */}
          <div className="flex rounded-xl border border-slate-200 overflow-hidden shrink-0">
            <button
              onClick={() => setViewMode("per_menu")}
              className={cn(
                "flex h-9 w-9 items-center justify-center transition-colors",
                viewMode === "per_menu"
                  ? "bg-orange-600 text-white"
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
                  ? "bg-orange-600 text-white"
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
            <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-12 text-center text-slate-400">
              <ClipboardList size={30} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium">Tidak ada kebutuhan harian</p>
              <p className="text-xs mt-1">
                Coba ubah filter tanggal atau klien.
              </p>
            </div>
          ) : (
            filteredNeeds.map((need) => {
              const linked = letters.find((l) => l.dailyNeedId === need.id);
              return (
                <DailyNeedCardOps
                  key={need.id}
                  need={need}
                  linkedShipmentCode={linked?.code ?? null}
                  onCreateShipmentLetter={handleCreateShipmentLetter}
                  onViewShipmentLetter={handleViewShipmentLetter}
                />
              );
            })
          )}
        </div>
      ) : (
        <div className="py-4">
          <DailyNeedIngredientTable needs={filteredNeeds} />
        </div>
      )}

      {/* Form sheet */}
      <ShipmentLetterFormSheet
        isOpen={isFormOpen}
        isEditing={editingId !== null}
        form={form}
        isValid={isValid}
        isSubmitting={isSubmitting}
        onClose={closeForm}
        onSave={saveLetter}
        onChange={setField}
        onToggleItem={toggleItemChecked}
        onSetItemQty={setItemQuantity}
      />

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-20 inset-x-4 z-50 rounded-xl bg-slate-800 px-4 py-3 text-sm text-white shadow-lg md:bottom-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-80">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
