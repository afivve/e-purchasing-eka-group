"use client";

import { useState } from "react";
import { Truck } from "lucide-react";
import { useShipmentLetters } from "@/hooks/useShipmentLetters";
import { ShipmentLetterCard } from "@/components/features/admin-koperasi/ShipmentLetterCard";
import { ShipmentLetterStatusBadge } from "@/components/features/admin-koperasi/ShipmentLetterStatusBadge";
import type { ShipmentLetterStatus } from "@/types";
import { formatDate } from "@/lib/utils";

const ACTIVE_STATUSES: ShipmentLetterStatus[] = [
  "scheduled",
  "waiting_pickup",
  "in_transit",
  "partial_arrived",
];

const QUICK_STATUS_OPTIONS: { value: ShipmentLetterStatus; label: string }[] = [
  { value: "waiting_pickup", label: "Menunggu Pickup" },
  { value: "scheduled", label: "Terjadwal" },
  { value: "in_transit", label: "Dalam Perjalanan" },
  { value: "partial_arrived", label: "Tiba Sebagian" },
  { value: "completed", label: "Selesai" },
  { value: "received_by_client", label: "Diterima Klien" },
];

export default function PengirimanPage() {
  const {
    letters,
    openEditForm,
    setDeleteConfirmId,
    setPreviewLetterId,
    updateStatus,
    toastMessage,
    previewLetter,
    deleteConfirmId,
    deleteLetter,
  } = useShipmentLetters();
  const [statusSheetId, setStatusSheetId] = useState<string | null>(null);

  const activeLetters = letters.filter((l) =>
    ACTIVE_STATUSES.includes(l.status),
  );

  // Group by deliveryDate
  const grouped = activeLetters.reduce<Record<string, typeof activeLetters>>(
    (acc, l) => {
      const key = l.deliveryDate;
      if (!acc[key]) acc[key] = [];
      acc[key].push(l);
      return acc;
    },
    {},
  );

  const sortedDates = Object.keys(grouped).sort();

  const statusSheetLetter = letters.find((l) => l.id === statusSheetId);

  return (
    <div className="min-h-dvh bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white px-4 py-4 shadow-sm">
        <h1 className="text-lg font-bold text-slate-800">Pengiriman Aktif</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          {activeLetters.length} pengiriman berjalan
        </p>
      </div>

      {/* Content */}
      <div className="px-4 py-4 space-y-5">
        {sortedDates.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-12 text-center text-slate-400">
            <Truck size={30} className="mx-auto mb-2 opacity-40" />
            <p className="text-sm font-medium">Tidak ada pengiriman aktif</p>
          </div>
        ) : (
          sortedDates.map((date) => (
            <div key={date}>
              <p className="mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                {formatDate(date)}
              </p>
              <div className="space-y-2">
                {grouped[date].map((letter) => (
                  <ShipmentLetterCard
                    key={letter.id}
                    letter={letter}
                    onEdit={openEditForm}
                    onDelete={(id) => setDeleteConfirmId(id)}
                    onPreview={setPreviewLetterId}
                    onUpdateStatus={updateStatus}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick status bottom sheet */}
      {statusSheetId && statusSheetLetter && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setStatusSheetId(null)}
          />
          <div className="fixed inset-x-0 bottom-0 z-50 rounded-t-2xl bg-white pb-safe-or-4">
            <div className="flex justify-center pt-2.5 pb-1">
              <div className="h-1 w-10 rounded-full bg-slate-200" />
            </div>
            <div className="px-4 pb-2 pt-1">
              <p className="text-sm font-bold text-slate-800 mb-0.5">
                Ubah Status
              </p>
              <p className="text-xs text-slate-500 font-mono">
                {statusSheetLetter.code}
              </p>
            </div>
            <div className="px-4 pb-4 space-y-2">
              {QUICK_STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    updateStatus(statusSheetId, opt.value);
                    setStatusSheetId(null);
                  }}
                  className="flex w-full items-center justify-between rounded-xl border border-slate-200 px-3 py-2.5 text-left hover:bg-slate-50"
                >
                  <span className="text-sm text-slate-700">{opt.label}</span>
                  {statusSheetLetter.status === opt.value && (
                    <ShipmentLetterStatusBadge status={opt.value} />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
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
                className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700"
              >
                Batal
              </button>
              <button
                onClick={() => deleteLetter(deleteConfirmId)}
                className="flex-1 rounded-xl bg-red-600 py-3 text-sm font-semibold text-white"
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
