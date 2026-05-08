"use client";

import { Search, Plus, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSuppliers } from "@/hooks/useSuppliers";
import { SupplierCard } from "@/components/features/manager/SupplierCard";
import { SupplierFormSheet } from "@/components/features/manager/SupplierFormSheet";

export default function SupplierPage() {
  const {
    filteredSuppliers,
    searchQuery,
    setSearchQuery,
    isFormOpen,
    editingId,
    openAddForm,
    openEditForm,
    closeForm,
    form,
    setField,
    toggleIngredient,
    isValid,
    isSubmitting,
    saveSupplier,
    deleteSupplier,
    deleteConfirmId,
    setDeleteConfirmId,
    toastMessage,
    allIngredients,
    getIngredientName,
    suppliers,
  } = useSuppliers();

  const activeCount = suppliers.filter((s) => s.isActive).length;

  return (
    <div className="flex flex-col">
      {/* Sticky sub-header */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-4 pt-3 pb-3 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-slate-800">Supplier</h1>
            <p className="text-xs text-slate-500">
              {activeCount} aktif · {suppliers.length - activeCount} nonaktif
            </p>
          </div>
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari supplier…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-800 placeholder-slate-400 focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-100"
          />
        </div>
      </div>

      {/* List */}
      <div className="px-4 py-4 space-y-3">
        {filteredSuppliers.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-12 text-center">
            <Building2 className="mx-auto h-8 w-8 text-slate-300 mb-3" />
            <p className="text-sm font-medium text-slate-500">
              Belum ada supplier
            </p>
            <p className="mt-1 text-xs text-slate-400">
              {searchQuery
                ? "Tidak ada hasil untuk pencarian ini."
                : "Tambah supplier pertama Anda."}
            </p>
          </div>
        ) : (
          filteredSuppliers.map((s) => (
            <SupplierCard
              key={s.id}
              supplier={s}
              ingredientNames={s.ingredientIds.map(getIngredientName)}
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

      {/* Form Sheet */}
      <SupplierFormSheet
        isOpen={isFormOpen}
        onClose={closeForm}
        form={form}
        setField={setField}
        toggleIngredient={toggleIngredient}
        isValid={isValid}
        isSubmitting={isSubmitting}
        onSave={saveSupplier}
        editingId={editingId}
        allIngredients={allIngredients}
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
              Hapus Supplier?
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Tindakan ini tidak dapat dibatalkan. Supplier akan dihapus
              permanen.
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 h-11 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                onClick={() => deleteSupplier(deleteConfirmId)}
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
