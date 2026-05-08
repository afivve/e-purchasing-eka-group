"use client";

import { Package, Search } from "lucide-react";
import { useWarehouseStock } from "@/hooks/useWarehouseStock";
import InventoryCard from "@/components/features/admin-gudang/InventoryCard";
import InventoryAdjustmentSheet from "@/components/features/admin-gudang/InventoryAdjustmentSheet";

const STATUS_TABS = [
  { value: "all", label: "Semua" },
  { value: "ok", label: "Aman" },
  { value: "low", label: "Menipis" },
  { value: "empty", label: "Kosong" },
  { value: "discrepancy", label: "Selisih" },
] as const;

export default function StokBahanBakuPage() {
  const {
    filteredStock,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
    stats,
    categories,
    selectedItem,
    isAdjustmentOpen,
    openAdjustment,
    closeAdjustment,
    adjustmentForm,
    setAdjustmentForm,
    adjustmentDiscrepancy,
    isAdjustmentValid,
    isSubmitting,
    submitAdjustment,
    toastMessage,
  } = useWarehouseStock();

  return (
    <>
      {/* Sticky header */}
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white shadow-sm">
        <div className="px-4 pb-3 pt-4">
          <h1 className="text-base font-bold text-slate-800">
            Stok Bahan Baku
          </h1>
          <p className="text-[11px] text-slate-400">
            {stats.total} item — {stats.low} menipis · {stats.empty} kosong ·{" "}
            {stats.discrepancy} selisih
          </p>
        </div>

        {/* Search */}
        <div className="px-4 pb-2">
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari bahan baku..."
              className="w-full min-h-10 rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
            />
          </div>
        </div>

        {/* Category filter */}
        <div className="px-4 pb-2">
          <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
            <button
              onClick={() => setCategoryFilter("all")}
              className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${categoryFilter === "all" ? "bg-emerald-700 border-emerald-700 text-white" : "border-slate-200 text-slate-500 hover:bg-slate-50"}`}
            >
              Semua
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${categoryFilter === cat ? "bg-emerald-700 border-emerald-700 text-white" : "border-slate-200 text-slate-500 hover:bg-slate-50"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Status tabs */}
        <div className="flex border-t border-slate-100">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value as typeof statusFilter)}
              className={`flex-1 py-2.5 text-xs font-medium transition-colors ${statusFilter === tab.value ? "border-b-2 border-emerald-700 text-emerald-700" : "text-slate-500 hover:text-slate-700"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Item list */}
      <div className="px-4 py-4">
        {filteredStock.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {filteredStock.map((item) => (
              <InventoryCard
                key={item.id}
                item={item}
                onUpdateClick={openAdjustment}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white py-12 text-center">
            <Package size={32} className="mb-3 text-slate-300" />
            <p className="text-sm font-medium text-slate-500">
              Tidak ada bahan baku
            </p>
            <p className="text-xs text-slate-400">Coba ubah filter pencarian</p>
          </div>
        )}
      </div>

      {/* Adjustment sheet */}
      <InventoryAdjustmentSheet
        isOpen={isAdjustmentOpen}
        item={selectedItem}
        form={adjustmentForm}
        onFormChange={setAdjustmentForm}
        discrepancy={adjustmentDiscrepancy}
        isValid={isAdjustmentValid}
        isSubmitting={isSubmitting}
        onClose={closeAdjustment}
        onSubmit={submitAdjustment}
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
