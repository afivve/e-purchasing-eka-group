"use client";

import {
  Plus,
  Car,
  User,
  Truck,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useTransport } from "@/hooks/useTransport";
import { TransportRequestSheet } from "@/components/features/admin-koperasi/TransportRequestSheet";
import { formatDate } from "@/lib/utils";
import type { TransportStatus } from "@/types";

const STATUS_CONFIG: Record<
  TransportStatus,
  { label: string; className: string }
> = {
  waiting_driver: {
    label: "Menunggu Driver",
    className: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  scheduled: {
    label: "Terjadwal",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  in_transit: {
    label: "Dalam Perjalanan",
    className: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  completed: {
    label: "Selesai",
    className: "bg-green-50 text-green-700 border-green-200",
  },
};

export default function TransportasiPage() {
  const {
    filteredRequests,
    dateFilter,
    setDateFilter,
    statusFilter,
    setStatusFilter,
    isFormOpen,
    editingId,
    openAddForm,
    openEditForm,
    closeForm,
    form,
    setField,
    isValid,
    isSubmitting,
    saveRequest,
    updateStatus,
    toastMessage,
    drivers,
  } = useTransport();

  // Group by deliveryDate
  const grouped = filteredRequests.reduce<
    Record<string, typeof filteredRequests>
  >((acc, r) => {
    const key = r.deliveryDate;
    if (!acc[key]) acc[key] = [];
    acc[key].push(r);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort();

  return (
    <div className="min-h-dvh bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white px-4 pt-4 pb-3 shadow-sm">
        <h1 className="text-lg font-bold text-slate-800">Transportasi</h1>

        <div className="mt-3 flex gap-2">
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-orange-400 focus:outline-none"
          >
            <option value="all">Semua Tanggal</option>
            <option value="2026-05-07">7 Mei 2026</option>
            <option value="2026-05-08">8 Mei 2026</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as TransportStatus | "all")
            }
            className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-orange-400 focus:outline-none"
          >
            <option value="all">Semua Status</option>
            <option value="waiting_driver">Menunggu Driver</option>
            <option value="scheduled">Terjadwal</option>
            <option value="in_transit">Di Perjalanan</option>
            <option value="completed">Selesai</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4 space-y-5">
        {sortedDates.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-12 text-center text-slate-400">
            <Car size={30} className="mx-auto mb-2 opacity-40" />
            <p className="text-sm font-medium">Tidak ada data transportasi</p>
          </div>
        ) : (
          sortedDates.map((date) => (
            <div key={date}>
              <p className="mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                {formatDate(date)}
              </p>
              <div className="space-y-2">
                {grouped[date].map((req) => {
                  const cfg = STATUS_CONFIG[req.status];
                  return (
                    <div
                      key={req.id}
                      className="rounded-xl border border-slate-200 bg-white p-3"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-slate-800 truncate">
                            {req.destination}
                          </p>
                          <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-500">
                            <User size={11} />
                            <span>
                              {req.driverName || "Driver belum ditentukan"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                            <Truck size={11} />
                            <span className="font-mono">
                              {req.vehicleNo || "-"}
                            </span>
                            {req.vehicleType && (
                              <span className="text-slate-400">
                                ({req.vehicleType})
                              </span>
                            )}
                          </div>
                        </div>
                        <span
                          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium shrink-0 ${cfg.className}`}
                        >
                          {cfg.label}
                        </span>
                      </div>

                      {req.note && (
                        <p className="mb-2 rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs text-slate-600">
                          {req.note}
                        </p>
                      )}

                      {req.shipmentLetterIds.length > 0 && (
                        <p className="mb-2 text-[11px] text-slate-400">
                          {req.shipmentLetterIds.length} surat jalan terhubung
                        </p>
                      )}

                      {req.status === "waiting_driver" && (
                        <div className="flex items-center gap-1.5 rounded-lg bg-amber-50 border border-amber-200 px-2.5 py-1.5 text-xs text-amber-700 mb-2">
                          <AlertCircle size={12} />
                          Driver belum dikonfirmasi
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditForm(req.id)}
                          className="flex-1 rounded-xl border border-slate-200 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                        >
                          Edit
                        </button>
                        {req.status !== "completed" && (
                          <button
                            onClick={() => {
                              const next: Record<
                                TransportStatus,
                                TransportStatus | null
                              > = {
                                waiting_driver: "scheduled",
                                scheduled: "in_transit",
                                in_transit: "completed",
                                completed: null,
                              };
                              const n = next[req.status];
                              if (n) updateStatus(req.id, n);
                            }}
                            className="flex-1 rounded-xl bg-orange-600 py-2 text-xs font-semibold text-white hover:bg-orange-700"
                          >
                            {req.status === "waiting_driver"
                              ? "Jadwalkan"
                              : req.status === "scheduled"
                                ? "Berangkat"
                                : "Selesai"}
                          </button>
                        )}
                        {req.status === "completed" && (
                          <div className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-green-50 py-2 text-xs font-semibold text-green-700">
                            <CheckCircle2 size={13} />
                            Selesai
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* FAB */}
      <button
        onClick={openAddForm}
        className="fixed bottom-20 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-orange-600 text-white shadow-lg hover:bg-orange-700 active:bg-orange-800 md:bottom-6"
        aria-label="Tambah permintaan transportasi"
      >
        <Plus size={22} />
      </button>

      {/* Form sheet */}
      <TransportRequestSheet
        isOpen={isFormOpen}
        isEditing={editingId !== null}
        form={form}
        isValid={isValid}
        isSubmitting={isSubmitting}
        drivers={drivers}
        onClose={closeForm}
        onSave={saveRequest}
        onChange={setField}
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
