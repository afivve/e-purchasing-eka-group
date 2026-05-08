"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { StockAdjustmentForm } from "@/hooks/useWarehouseStock";
import type { WarehouseIngredient } from "@/types";

interface Props {
  isOpen: boolean;
  item: WarehouseIngredient | null;
  form: StockAdjustmentForm;
  onFormChange: (form: StockAdjustmentForm) => void;
  discrepancy: number;
  isValid: boolean;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export default function InventoryAdjustmentSheet({
  isOpen,
  item,
  form,
  onFormChange,
  discrepancy,
  isValid,
  isSubmitting,
  onClose,
  onSubmit,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 350);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  if (!item) return null;

  const highDiscrepancy =
    item.systemStock > 0 && Math.abs(discrepancy) > item.systemStock * 0.1;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 flex max-h-[90dvh] flex-col rounded-t-2xl bg-white shadow-xl transition-transform duration-300 ${isOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="h-1 w-10 rounded-full bg-slate-200" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <div>
            <p className="text-xs text-slate-400">{item.category}</p>
            <h3 className="text-base font-semibold text-slate-800">
              {item.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100"
            aria-label="Tutup"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {/* Current info */}
          <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-600 space-y-1">
            <div className="flex justify-between">
              <span>Stok sistem</span>
              <span className="font-semibold text-slate-800">
                {item.systemStock.toLocaleString("id-ID")} {item.unit}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Stok real sebelumnya</span>
              <span className="font-semibold text-slate-800">
                {item.realStock.toLocaleString("id-ID")} {item.unit}
              </span>
            </div>
          </div>

          {/* New real stock input */}
          <div>
            <label
              htmlFor="realStock"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Stok Real Sekarang <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                id="realStock"
                type="number"
                min="0"
                step="0.5"
                inputMode="decimal"
                value={form.realStock}
                onChange={(e) =>
                  onFormChange({ ...form, realStock: e.target.value })
                }
                placeholder="0"
                className="block min-h-11 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
              />
              <span className="shrink-0 text-sm text-slate-500">
                {item.unit}
              </span>
            </div>

            {/* Live discrepancy display */}
            {form.realStock !== "" && !isNaN(parseFloat(form.realStock)) && (
              <p
                className={`mt-1.5 text-[11px] font-medium ${discrepancy === 0 ? "text-slate-400" : discrepancy < 0 ? "text-red-600" : "text-emerald-600"}`}
              >
                Selisih dari sistem:{" "}
                {discrepancy > 0
                  ? `+${discrepancy.toLocaleString("id-ID")}`
                  : discrepancy.toLocaleString("id-ID")}{" "}
                {item.unit}
              </p>
            )}

            {/* High discrepancy warning */}
            {highDiscrepancy && (
              <div className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] text-amber-700">
                ⚠️ Selisih lebih dari 10% dari stok sistem. Pastikan angka sudah
                benar.
              </div>
            )}
          </div>

          {/* Note */}
          <div>
            <label
              htmlFor="adjNote"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Catatan <span className="text-red-500">*</span>
            </label>
            <textarea
              id="adjNote"
              rows={3}
              value={form.note}
              onChange={(e) => onFormChange({ ...form, note: e.target.value })}
              placeholder="Contoh: stok opname, barang rusak, barang baru datang, barang hilang..."
              className="block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-400 resize-none"
            />
          </div>
        </div>

        {/* Sticky footer */}
        <div className="border-t border-slate-100 bg-white px-4 py-3">
          <button
            onClick={onSubmit}
            disabled={!isValid || isSubmitting}
            className="flex min-h-11 w-full items-center justify-center rounded-xl bg-emerald-700 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 disabled:opacity-50"
          >
            {isSubmitting ? "Menyimpan…" : "Simpan Perubahan Stok"}
          </button>
        </div>
      </div>
    </>
  );
}
