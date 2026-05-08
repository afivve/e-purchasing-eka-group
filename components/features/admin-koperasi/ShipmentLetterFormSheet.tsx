"use client";

import { X, CheckCircle2 } from "lucide-react";
import type { ShipmentLetterFormData } from "@/hooks/useShipmentLetters";
import { cn } from "@/lib/utils";

interface Props {
  isOpen: boolean;
  isEditing: boolean;
  form: ShipmentLetterFormData;
  isValid: boolean;
  isSubmitting: boolean;
  onClose: () => void;
  onSave: () => void;
  onChange: <K extends keyof ShipmentLetterFormData>(
    key: K,
    value: ShipmentLetterFormData[K],
  ) => void;
  onToggleItem: (itemId: string) => void;
  onSetItemQty: (itemId: string, qty: number) => void;
}

export function ShipmentLetterFormSheet({
  isOpen,
  isEditing,
  form,
  isValid,
  isSubmitting,
  onClose,
  onSave,
  onChange,
  onToggleItem,
  onSetItemQty,
}: Props) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />

      {/* Sheet */}
      <div className="fixed inset-x-0 bottom-0 z-50 flex max-h-[92dvh] flex-col rounded-t-2xl bg-white">
        {/* Drag handle */}
        <div className="flex justify-center pt-2.5 pb-1">
          <div className="h-1 w-10 rounded-full bg-slate-200" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-3 pt-1">
          <h2 className="text-base font-bold text-slate-800">
            {isEditing ? "Edit Surat Jalan" : "Buat Surat Jalan"}
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
          {/* Kode Surat Jalan */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Nomor Surat Jalan
            </label>
            <input
              type="text"
              value={form.code}
              onChange={(e) => onChange("code", e.target.value)}
              placeholder="SJ/2026/05/001"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 font-mono text-sm text-slate-800 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
          </div>

          {/* Tanggal Pengiriman */}
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

          {/* Client */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Klien / Tujuan
            </label>
            <input
              type="text"
              value={form.clientName}
              onChange={(e) => onChange("clientName", e.target.value)}
              placeholder="Nama klien"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
          </div>

          {/* Menu */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Nama Menu
            </label>
            <input
              type="text"
              value={form.menuName}
              onChange={(e) => onChange("menuName", e.target.value)}
              placeholder="Nama menu hari ini"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
          </div>

          {/* Items */}
          {form.items.length > 0 && (
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">
                Item Bahan Baku
              </label>
              <div className="space-y-2">
                {form.items.map((item) => (
                  <div
                    key={item.id}
                    className={cn(
                      "rounded-xl border p-3 transition-colors",
                      item.isChecked
                        ? "border-green-200 bg-green-50"
                        : "border-slate-200 bg-white",
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => onToggleItem(item.id)}
                        className={cn(
                          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                          item.isChecked
                            ? "border-green-500 bg-green-500 text-white"
                            : "border-slate-300 bg-white",
                        )}
                      >
                        {item.isChecked && <CheckCircle2 size={12} />}
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800">
                          {item.ingredientName}
                        </p>
                        {item.supplierName && (
                          <p className="text-[11px] text-slate-500">
                            {item.supplierName}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <input
                          type="number"
                          min={0}
                          step={0.5}
                          value={item.quantity}
                          onChange={(e) =>
                            onSetItemQty(
                              item.id,
                              parseFloat(e.target.value) || 0,
                            )
                          }
                          className="w-16 rounded-lg border border-slate-200 px-2 py-1 text-right text-sm focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-200"
                        />
                        <span className="text-xs text-slate-500 w-8">
                          {item.unit}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Driver */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Nama Driver
            </label>
            <input
              type="text"
              value={form.driverName}
              onChange={(e) => onChange("driverName", e.target.value)}
              placeholder="Nama driver"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
          </div>

          {/* Vehicle No */}
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

          {/* Note */}
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

        {/* Sticky footer */}
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
                ? "Perbarui Surat Jalan"
                : "Buat Surat Jalan"}
          </button>
        </div>
      </div>
    </>
  );
}
