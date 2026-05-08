"use client";

import { X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SupplierFormData } from "@/hooks/useSuppliers";
import type { IngredientWithStock } from "@/types";

interface SupplierFormSheetProps {
  isOpen: boolean;
  onClose: () => void;
  form: SupplierFormData;
  setField: <K extends keyof SupplierFormData>(
    key: K,
    value: SupplierFormData[K],
  ) => void;
  toggleIngredient: (id: string) => void;
  isValid: boolean;
  isSubmitting: boolean;
  onSave: () => void;
  editingId: string | null;
  allIngredients: IngredientWithStock[];
}

export function SupplierFormSheet({
  isOpen,
  onClose,
  form,
  setField,
  toggleIngredient,
  isValid,
  isSubmitting,
  onSave,
  editingId,
  allIngredients,
}: SupplierFormSheetProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative flex max-h-[92dvh] flex-col rounded-t-2xl bg-white shadow-2xl">
        <div className="flex justify-center pt-2.5 pb-1">
          <div className="h-1 w-10 rounded-full bg-slate-200" />
        </div>
        <div className="flex items-center justify-between border-b border-slate-100 px-4 pb-3">
          <h2 className="text-base font-semibold text-slate-800">
            {editingId ? "Edit Supplier" : "Tambah Supplier"}
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100 active:scale-95"
          >
            <X className="h-4 w-4 text-slate-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {/* Nama */}
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              Nama Supplier <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              placeholder="Nama perusahaan/usaha"
              className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 placeholder-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
            />
          </div>

          {/* Kontak */}
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              Nama Kontak <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.contact}
              onChange={(e) => setField("contact", e.target.value)}
              placeholder="Nama PIC"
              className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 placeholder-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              Nomor HP
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setField("phone", e.target.value)}
              placeholder="08xx-xxxx-xxxx"
              className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 placeholder-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
            />
          </div>

          {/* Alamat */}
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              Alamat
            </label>
            <textarea
              value={form.address}
              onChange={(e) => setField("address", e.target.value)}
              placeholder="Alamat lengkap supplier"
              rows={2}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100 resize-none"
            />
          </div>

          {/* Est. Pengiriman */}
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              Estimasi Pengiriman (hari)
            </label>
            <input
              type="number"
              min={1}
              value={form.estimatedDeliveryDays}
              onChange={(e) =>
                setField("estimatedDeliveryDays", e.target.value)
              }
              className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
            />
          </div>

          {/* Catatan Harga */}
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              Catatan Harga
            </label>
            <input
              type="text"
              value={form.priceNote}
              onChange={(e) => setField("priceNote", e.target.value)}
              placeholder="Misal: Harga grosir, nego, dll"
              className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 placeholder-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
            />
          </div>

          {/* Bahan Baku */}
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-600">
              Bahan Baku yang Disuplai ({form.ingredientIds.length} dipilih)
            </label>
            <div className="space-y-1.5 max-h-52 overflow-y-auto rounded-lg border border-slate-200 p-2">
              {allIngredients.map((ing) => (
                <label
                  key={ing.id}
                  className="flex items-center gap-2.5 cursor-pointer py-1 px-1"
                >
                  <input
                    type="checkbox"
                    checked={form.ingredientIds.includes(ing.id)}
                    onChange={() => toggleIngredient(ing.id)}
                    className="h-4 w-4 rounded border-slate-300 text-violet-600 accent-violet-600"
                  />
                  <span className="flex-1 text-xs text-slate-700">
                    {ing.name}
                  </span>
                  <span className="text-[10px] text-slate-400">{ing.unit}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 p-4">
          <button
            onClick={onSave}
            disabled={!isValid || isSubmitting}
            className={cn(
              "h-12 w-full rounded-xl text-sm font-semibold text-white transition-opacity",
              isValid && !isSubmitting
                ? "bg-violet-600 active:scale-95"
                : "bg-violet-300",
            )}
          >
            {isSubmitting
              ? "Menyimpan…"
              : editingId
                ? "Simpan Perubahan"
                : "Tambah Supplier"}
          </button>
        </div>
      </div>
    </div>
  );
}
