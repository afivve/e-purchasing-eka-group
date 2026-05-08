"use client";

import { X } from "lucide-react";
import type { TransportFormData } from "@/hooks/useTransport";
import { cn } from "@/lib/utils";

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
  form: TransportFormData;
  isValid: boolean;
  isSubmitting: boolean;
  drivers: Driver[];
  onClose: () => void;
  onSave: () => void;
  onChange: <K extends keyof TransportFormData>(
    key: K,
    value: TransportFormData[K],
  ) => void;
}

export function TransportRequestSheet({
  isOpen,
  isEditing,
  form,
  isValid,
  isSubmitting,
  drivers,
  onClose,
  onSave,
  onChange,
}: Props) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />

      <div className="fixed inset-x-0 bottom-0 z-50 flex max-h-[90dvh] flex-col rounded-t-2xl bg-white">
        {/* Drag handle */}
        <div className="flex justify-center pt-2.5 pb-1">
          <div className="h-1 w-10 rounded-full bg-slate-200" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-3 pt-1">
          <h2 className="text-base font-bold text-slate-800">
            {isEditing ? "Edit Transportasi" : "Tambah Transportasi"}
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
          {/* Tujuan */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Tujuan Pengiriman
            </label>
            <input
              type="text"
              value={form.destination}
              onChange={(e) => onChange("destination", e.target.value)}
              placeholder="Nama klien / alamat tujuan"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
          </div>

          {/* Tanggal */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Tanggal Pengiriman
            </label>
            <input
              type="date"
              value={form.deliveryDate}
              onChange={(e) => onChange("deliveryDate", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
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
                  <p className="text-sm font-medium">{d.name}</p>
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
              rows={3}
              value={form.note}
              onChange={(e) => onChange("note", e.target.value)}
              placeholder="Catatan pengiriman (opsional)"
              className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 p-4 pb-safe-or-4">
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
