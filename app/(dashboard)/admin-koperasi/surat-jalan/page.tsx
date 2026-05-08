"use client";

import { Plus, Search, ScrollText } from "lucide-react";
import { useShipmentLetters } from "@/hooks/useShipmentLetters";
import { ShipmentLetterCard } from "@/components/features/admin-koperasi/ShipmentLetterCard";
import { ShipmentLetterFormSheet } from "@/components/features/admin-koperasi/ShipmentLetterFormSheet";
import { ShipmentPreview } from "@/components/features/admin-koperasi/ShipmentPreview";
import type { ShipmentLetterStatus } from "@/types";

const STATUS_OPTIONS: { value: ShipmentLetterStatus | "all"; label: string }[] =
  [
    { value: "all", label: "Semua" },
    { value: "draft", label: "Draft" },
    { value: "waiting_pickup", label: "Menunggu Pickup" },
    { value: "scheduled", label: "Terjadwal" },
    { value: "in_transit", label: "Di Perjalanan" },
    { value: "partial_arrived", label: "Tiba Sebagian" },
    { value: "completed", label: "Selesai" },
    { value: "received_by_client", label: "Diterima" },
  ];

export default function SuratJalanPage() {
  const {
    filteredLetters,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter,
    stats,
    isFormOpen,
    editingId,
    openAddForm,
    openEditForm,
    closeForm,
    form,
    setField,
    toggleItemChecked,
    setItemQuantity,
    isValid,
    isSubmitting,
    saveLetter,
    deleteLetter,
    deleteConfirmId,
    setDeleteConfirmId,
    updateStatus,
    toastMessage,
    previewLetterId,
    setPreviewLetterId,
    previewLetter,
  } = useShipmentLetters();

  return (
    <div className="min-h-dvh bg-slate-50">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white px-4 pt-4 pb-3 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-lg font-bold text-slate-800">Surat Jalan</h1>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span>{stats.draft} draft</span>
            <span>•</span>
            <span>{stats.inTransit} berjalan</span>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-2">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kode, klien, menu..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
          />
        </div>

        {/* Filters row */}
        <div className="flex gap-2">
          <input
            type="date"
            value={dateFilter === "all" ? "" : dateFilter}
            onChange={(e) => setDateFilter(e.target.value || "all")}
            className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-orange-400 focus:outline-none"
          />
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as ShipmentLetterStatus | "all")
            }
            className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-orange-400 focus:outline-none"
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4 space-y-3">
        {filteredLetters.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-12 text-center text-slate-400">
            <ScrollText size={30} className="mx-auto mb-2 opacity-40" />
            <p className="text-sm font-medium">Tidak ada surat jalan</p>
            <p className="text-xs mt-1">
              Ubah filter atau buat surat jalan baru.
            </p>
          </div>
        ) : (
          filteredLetters.map((letter) => (
            <ShipmentLetterCard
              key={letter.id}
              letter={letter}
              onEdit={openEditForm}
              onDelete={(id) => setDeleteConfirmId(id)}
              onPreview={setPreviewLetterId}
              onUpdateStatus={updateStatus}
            />
          ))
        )}
      </div>

      {/* FAB */}
      <button
        onClick={() => openAddForm()}
        className="fixed bottom-20 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-orange-600 text-white shadow-lg hover:bg-orange-700 active:bg-orange-800 md:bottom-6"
        aria-label="Buat surat jalan baru"
      >
        <Plus size={22} />
      </button>

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

      {/* Preview modal */}
      {previewLetterId && (
        <ShipmentPreview
          letter={previewLetter}
          onClose={() => setPreviewLetterId(null)}
        />
      )}

      {/* Delete confirm */}
      {deleteConfirmId && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/40"
            onClick={() => setDeleteConfirmId(null)}
          />
          <div className="fixed inset-x-6 top-1/2 z-50 -translate-y-1/2 rounded-2xl bg-white p-5 shadow-xl">
            <h3 className="text-base font-bold text-slate-800 mb-1.5">
              Hapus surat jalan?
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              Tindakan ini tidak bisa dibatalkan.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                onClick={() => deleteLetter(deleteConfirmId)}
                className="flex-1 rounded-xl bg-red-600 py-3 text-sm font-semibold text-white hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </>
      )}

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-20 inset-x-4 z-50 rounded-xl bg-slate-800 px-4 py-3 text-sm text-white shadow-lg md:bottom-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-80">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
