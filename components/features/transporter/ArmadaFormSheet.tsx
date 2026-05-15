"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArmadaFormSheetProps {
  isOpen: boolean;
  onClose: () => void;
  form: { platNo: string; merk: string; jenis: string };
  setField: (key: "platNo" | "merk" | "jenis", value: string) => void;
  onSave: () => void;
  isValid: boolean;
  isSubmitting: boolean;
  jenisOptions: string[];
  isEditing: boolean;
}

export function ArmadaFormSheet({
  isOpen,
  onClose,
  form,
  setField,
  onSave,
  isValid,
  isSubmitting,
  jenisOptions,
  isEditing,
}: ArmadaFormSheetProps) {
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
            {isEditing ? "Edit Armada" : "Tambah Armada"}
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
          {/* Nomor Plat */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Nomor Plat <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.platNo}
              onChange={(e) => setField("platNo", e.target.value.toUpperCase())}
              placeholder="B 1234 KOP"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>

          {/* Merk */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Merk Kendaraan
            </label>
            <input
              type="text"
              value={form.merk}
              onChange={(e) => setField("merk", e.target.value)}
              placeholder="Toyota, Hino, Mitsubishi, ..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>

          {/* Jenis */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Jenis Kendaraan <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {jenisOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setField("jenis", opt)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                    form.jenis === opt
                      ? "bg-sky-600 text-white border-sky-600"
                      : "bg-white text-gray-600 border-gray-300 hover:border-sky-400",
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
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
            {isSubmitting
              ? "Menyimpan..."
              : isEditing
                ? "Simpan Perubahan"
                : "Tambah Armada"}
          </button>
        </div>
      </div>
    </>
  );
}
