"use client";

import { X, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PickupFormData } from "@/hooks/usePickupRequests";

const VEHICLE_TYPES = [
  "Motor Kurir",
  "Pickup Engkel",
  "Pickup Double",
  "Box Truck",
  "Truk Besar",
];

interface Driver {
  id: string;
  name: string;
  phone: string;
}

interface Props {
  isOpen: boolean;
  isEditing: boolean;
  form: PickupFormData;
  isValid: boolean;
  isSubmitting: boolean;
  drivers: Driver[];
  onClose: () => void;
  onSave: () => void;
  onChange: <K extends keyof PickupFormData>(
    key: K,
    value: PickupFormData[K],
  ) => void;
  onAddDestination: () => void;
  onUpdateDestination: (
    id: string,
    field: "place" | "items",
    value: string,
  ) => void;
  onRemoveDestination: (id: string) => void;
}

export function PickupRequestSheet({
  isOpen,
  isEditing,
  form,
  isValid,
  isSubmitting,
  drivers,
  onClose,
  onSave,
  onChange,
  onAddDestination,
  onUpdateDestination,
  onRemoveDestination,
}: Props) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />

      <div className="fixed inset-x-0 bottom-0 z-50 flex max-h-[92dvh] flex-col rounded-t-2xl bg-white">
        {/* Drag handle */}
        <div className="flex justify-center pt-2.5 pb-1">
          <div className="h-1 w-10 rounded-full bg-slate-200" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-3 pt-1 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-800">
            {isEditing
              ? "Edit Permintaan Pickup"
              : "Permintaan Jemput Belanjaan"}
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
          {/* Tanggal & Waktu Perjalanan */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Tanggal & Waktu Perjalanan <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              value={form.departureDateTime}
              onChange={(e) => onChange("departureDateTime", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
          </div>

          {/* List Tujuan */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-600">
                List Tujuan <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={onAddDestination}
                className="inline-flex h-7 items-center gap-1 rounded-lg bg-orange-50 border border-orange-200 px-2.5 text-[11px] font-semibold text-orange-700 active:scale-95 transition-transform"
              >
                <Plus size={11} />
                Tambah Tujuan
              </button>
            </div>

            {form.destinations.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 py-6 text-center text-xs text-slate-400">
                Belum ada tujuan. Klik "Tambah Tujuan" untuk menambahkan.
              </div>
            ) : (
              <div className="space-y-3">
                {form.destinations.map((dest, idx) => (
                  <div
                    key={dest.id}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-2"
                  >
                    {/* Destination header */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                        Tujuan {idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => onRemoveDestination(dest.id)}
                        className="flex h-6 w-6 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 active:scale-95"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>

                    {/* Tempat */}
                    <div>
                      <label className="block text-[11px] font-medium text-slate-500 mb-1">
                        Tempat
                      </label>
                      <input
                        type="text"
                        value={dest.place}
                        onChange={(e) =>
                          onUpdateDestination(dest.id, "place", e.target.value)
                        }
                        placeholder="Nama pasar / supplier / toko"
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none"
                      />
                    </div>

                    {/* Barang */}
                    <div>
                      <label className="block text-[11px] font-medium text-slate-500 mb-1">
                        Barang yang Dibeli
                      </label>
                      <textarea
                        rows={2}
                        value={dest.items}
                        onChange={(e) =>
                          onUpdateDestination(dest.id, "items", e.target.value)
                        }
                        placeholder="Contoh: Ayam 10 kg, Beras 20 kg"
                        className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Driver */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Driver
            </label>
            <div className="space-y-1.5 mb-2">
              {drivers.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => onChange("driverName", d.name)}
                  className={cn(
                    "w-full rounded-xl border px-3 py-2 text-left transition-colors",
                    form.driverName === d.name
                      ? "border-orange-400 bg-orange-50 text-orange-700"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                  )}
                >
                  <p className="text-xs font-medium">{d.name}</p>
                  <p className="text-[11px] text-slate-400">{d.phone}</p>
                </button>
              ))}
            </div>
            <input
              type="text"
              value={form.driverName}
              onChange={(e) => onChange("driverName", e.target.value)}
              placeholder="Atau ketik nama driver lain"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
          </div>

          {/* Jenis Kendaraan */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Jenis Kendaraan
            </label>
            <select
              value={form.vehicleType}
              onChange={(e) => onChange("vehicleType", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            >
              <option value="">Pilih jenis kendaraan</option>
              {VEHICLE_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Nopol */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Nomor Kendaraan
            </label>
            <input
              type="text"
              value={form.vehicleNo}
              onChange={(e) => onChange("vehicleNo", e.target.value)}
              placeholder="B 1234 KOP"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 font-mono text-sm text-slate-800 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
          </div>

          {/* Catatan */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Catatan
            </label>
            <textarea
              rows={2}
              value={form.note}
              onChange={(e) => onChange("note", e.target.value)}
              placeholder="Catatan tambahan (opsional)"
              className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 p-4">
          <button
            onClick={onSave}
            disabled={!isValid || isSubmitting}
            className={cn(
              "w-full rounded-xl py-3.5 text-sm font-bold text-white transition-colors",
              isValid && !isSubmitting
                ? "bg-orange-600 hover:bg-orange-700 active:bg-orange-800"
                : "bg-slate-200 text-slate-400 cursor-not-allowed",
            )}
          >
            {isSubmitting
              ? "Menyimpan..."
              : isEditing
                ? "Perbarui"
                : "Buat Permintaan"}
          </button>
        </div>
      </div>
    </>
  );
}
