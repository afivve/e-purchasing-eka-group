"use client";

import { Search, Plus, Package, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIngredientsManager } from "@/hooks/useIngredientsManager";
import { IngredientCard } from "@/components/features/manager/IngredientCard";
import { IngredientFormSheet } from "@/components/features/manager/IngredientFormSheet";
import type { StockStatus } from "@/types";

const STOCK_FILTER_OPTIONS: { value: StockStatus | "all"; label: string }[] = [
  { value: "all", label: "Semua Stok" },
  { value: "ok", label: "Aman" },
  { value: "low", label: "Menipis" },
  { value: "empty", label: "Kosong" },
];

export default function BahanBakuPage() {
  const {
    filteredIngredients,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    stockFilter,
    setStockFilter,
    stats,
    isFormOpen,
    editingId,
    openAddForm,
    openEditForm,
    closeForm,
    form,
    setField,
    toggleSupplier,
    isValid,
    isSubmitting,
    saveIngredient,
    deleteIngredient,
    deleteConfirmId,
    setDeleteConfirmId,
    toastMessage,
    suppliers,
    getSupplierName,
    INGREDIENT_CATEGORIES,
    ingredients,
  } = useIngredientsManager();

  return (
    <div className="flex flex-col">
      {/* Sticky sub-header */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-4 pt-3 pb-3 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-slate-800">Bahan Baku</h1>
            <p className="text-xs text-slate-500">
              {stats.total} item ·{" "}
              {stats.empty > 0 && (
                <span className="text-red-500">{stats.empty} kosong · </span>
              )}
              {stats.low > 0 && (
                <span className="text-amber-600">{stats.low} menipis · </span>
              )}
              <span className="text-emerald-600">{stats.ok} aman</span>
            </p>
          </div>
        </div>

        {/* Stock status strip */}
        {(stats.empty > 0 || stats.low > 0) && (
          <div className="grid grid-cols-3 gap-2">
            {[
              {
                label: "Aman",
                value: stats.ok,
                color: "bg-emerald-50 text-emerald-700",
                onClick: () => setStockFilter("ok"),
              },
              {
                label: "Menipis",
                value: stats.low,
                color: "bg-amber-50 text-amber-700",
                onClick: () => setStockFilter("low"),
              },
              {
                label: "Kosong",
                value: stats.empty,
                color: "bg-red-50 text-red-600",
                onClick: () => setStockFilter("empty"),
              },
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.onClick}
                className={cn(
                  "rounded-lg py-1.5 px-2 text-center active:scale-95 transition-transform",
                  item.color,
                )}
              >
                <p className="text-base font-bold">{item.value}</p>
                <p className="text-[10px] font-medium">{item.label}</p>
              </button>
            ))}
          </div>
        )}

        {/* Search */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari bahan baku…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-800 placeholder-slate-400 focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-100"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 gap-2">
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-9 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-9 text-xs text-slate-700 focus:border-violet-400 focus:outline-none"
            >
              <option value="all">Semua Kategori</option>
              {INGREDIENT_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
          <div className="relative">
            <select
              value={stockFilter}
              onChange={(e) =>
                setStockFilter(e.target.value as StockStatus | "all")
              }
              className="h-9 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-9 text-xs text-slate-700 focus:border-violet-400 focus:outline-none"
            >
              {STOCK_FILTER_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
      </div>

      {/* List */}
      <div className="px-4 py-4 space-y-3">
        {filteredIngredients.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-12 text-center">
            <Package className="mx-auto h-8 w-8 text-slate-300 mb-3" />
            <p className="text-sm font-medium text-slate-500">
              Belum ada bahan baku
            </p>
            <p className="mt-1 text-xs text-slate-400">
              {searchQuery || categoryFilter !== "all" || stockFilter !== "all"
                ? "Tidak ada hasil untuk filter ini."
                : "Tambah bahan baku pertama Anda."}
            </p>
          </div>
        ) : (
          filteredIngredients.map((ing) => (
            <IngredientCard
              key={ing.id}
              ingredient={ing}
              primarySupplierName={
                ing.primarySupplierId
                  ? getSupplierName(ing.primarySupplierId)
                  : null
              }
              onEdit={openEditForm}
              onDelete={(id) => setDeleteConfirmId(id)}
            />
          ))
        )}
      </div>

      {/* FAB */}
      <button
        onClick={openAddForm}
        className="fixed bottom-24 right-4 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 shadow-lg shadow-violet-200 active:scale-95 transition-transform md:bottom-6"
      >
        <Plus className="h-6 w-6 text-white" />
      </button>

      {/* Form sheet */}
      <IngredientFormSheet
        isOpen={isFormOpen}
        onClose={closeForm}
        form={form}
        setField={setField}
        toggleSupplier={toggleSupplier}
        isValid={isValid}
        isSubmitting={isSubmitting}
        onSave={saveIngredient}
        editingId={editingId}
        suppliers={suppliers}
        categories={INGREDIENT_CATEGORIES}
      />

      {/* Delete confirm */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setDeleteConfirmId(null)}
          />
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-base font-semibold text-slate-800">
              Hapus Bahan Baku?
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Bahan baku yang dihapus tidak dapat dipulihkan.
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 h-11 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                onClick={() => deleteIngredient(deleteConfirmId)}
                className="flex-1 h-11 rounded-xl bg-red-500 text-sm font-medium text-white hover:bg-red-600 active:scale-95"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-28 left-4 right-4 z-50 rounded-xl bg-slate-800 px-4 py-3 shadow-lg md:bottom-8">
          <p className="text-sm font-medium text-white">{toastMessage}</p>
        </div>
      )}
    </div>
  );
}
