"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Armada } from "@/types";
import type { TransportUpdateFormData } from "@/hooks/useTransporterRequests";

interface Driver {
  id: string;
  name: string;
  phone: string;
}

interface TransportUpdateSheetProps {
  isOpen: boolean;
  onClose: () => void;
  form: TransportUpdateFormData;
  setField: (key: keyof TransportUpdateFormData, value: string) => void;
  selectArmada: (platNo: string) => void;
  onSave: () => void;
  isValid: boolean;
  isSubmitting: boolean;
  activeArmada: Armada[];
  drivers: Driver[];
}

export function TransportUpdateSheet({
  isOpen,
  onClose,
  form,
  setField,
  selectArmada,
  onSave,
  isValid,
  isSubmitting,
  activeArmada,
  drivers,
}: TransportUpdateSheetProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/40 z-40 transition-opacity duration-200",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className={cn(
          "fixed bottom-0 inset-x-0 z-50 bg-white rounded-t-2xl shadow-xl transition-transform duration-300 ease-in-out",
          isOpen ? "translate-y-0" : "translate-y-full",
        )}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-800">
            Update Permintaan
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
            aria-label="Tutup"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-4 py-4 space-y-4 overflow-y-auto max-h-96">
          {/* Kendaraan */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">
              Kendaraan <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {activeArmada.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => selectArmada(a.platNo)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 rounded-lg border text-sm transition-colors",
                    form.vehicleNo === a.platNo
                      ? "bg-sky-50 border-sky-500 text-sky-700"
                      : "bg-white border-gray-200 text-gray-700 hover:border-sky-300",
                  )}
                >
                  <span className="font-medium">{a.platNo}</span>
                  <span className="text-xs text-gray-500">
                    {a.merk ? `${a.merk} · ` : ""}
                    {a.jenis}
                  </span>
                </button>
              ))}
              {activeArmada.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-2">
                  Tidak ada armada aktif.
                </p>
              )}
            </div>
          </div>

          {/* Driver */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">
              Driver <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2 mb-2">
              {drivers.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setField("driverName", d.name)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 rounded-lg border text-sm transition-colors",
                    form.driverName === d.name
                      ? "bg-sky-50 border-sky-500 text-sky-700"
                      : "bg-white border-gray-200 text-gray-700 hover:border-sky-300",
                  )}
                >
                  <span className="font-medium">{d.name}</span>
                  <span className="text-xs text-gray-400">{d.phone}</span>
                </button>
              ))}
            </div>
            <input
              type="text"
              value={
                drivers.some((d) => d.name === form.driverName)
                  ? ""
                  : form.driverName
              }
              onChange={(e) => setField("driverName", e.target.value)}
              placeholder="Nama driver lainnya..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>

          {/* Acc Waktu Keberangkatan */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Acc Waktu Keberangkatan
            </label>
            <input
              type="time"
              value={form.departureTime}
              onChange={(e) => setField("departureTime", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-gray-100">
          <button
            onClick={onSave}
            disabled={!isValid || isSubmitting}
            className={cn(
              "w-full py-3 rounded-xl text-sm font-semibold transition-colors",
              isValid && !isSubmitting
                ? "bg-sky-600 text-white hover:bg-sky-700"
                : "bg-gray-100 text-gray-400 cursor-not-allowed",
            )}
          >
            {isSubmitting ? "Menyimpan..." : "Simpan Update"}
          </button>
        </div>
      </div>
    </>
  );
}
