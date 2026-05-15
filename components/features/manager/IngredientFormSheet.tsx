"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IngredientFormData } from "@/hooks/useIngredientsManager";
import type { Supplier } from "@/types";

interface IngredientFormSheetProps {
  isOpen: boolean;
  onClose: () => void;
  form: IngredientFormData;
  setField: <K extends keyof IngredientFormData>(
    key: K,
    value: IngredientFormData[K],
  ) => void;
  toggleSupplier: (id: string) => void;
  isValid: boolean;
  isSubmitting: boolean;
  onSave: () => void;
  editingId: string | null;
  suppliers: Supplier[];
  categories: string[];
}

export function IngredientFormSheet({
  isOpen,
  onClose,
  form,
  setField,
  toggleSupplier,
  isValid,
  isSubmitting,
  onSave,
  editingId,
  suppliers,
  categories,
}: IngredientFormSheetProps) {
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
            {editingId ? "Edit Bahan Baku" : "Tambah Bahan Baku"}
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
              Nama Bahan Baku <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              placeholder="Nama bahan baku"
              className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 placeholder-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
            />
          </div>

          {/* Satuan & Kategori */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">
                Satuan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.unit}
                onChange={(e) => setField("unit", e.target.value)}
                placeholder="kg, liter, pcs…"
                className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 placeholder-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-600">
                Kategori
              </label>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setField("category", c)}
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
                      form.category === c
                        ? "border-violet-400 bg-violet-50 text-violet-700"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300",
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stok */}
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              Stok Awal
            </label>
            <input
              type="number"
              min={0}
              value={form.stock}
              onChange={(e) => setField("stock", e.target.value)}
              className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
            />
          </div>

          {/* Supplier */}
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-600">
              Supplier ({form.supplierIds.length} dipilih)
            </label>
            <div className="space-y-1.5 rounded-lg border border-slate-200 p-2">
              {suppliers.map((s) => (
                <label
                  key={s.id}
                  className="flex items-center gap-2.5 cursor-pointer py-1 px-1"
                >
                  <input
                    type="checkbox"
                    checked={form.supplierIds.includes(s.id)}
                    onChange={() => toggleSupplier(s.id)}
                    className="h-4 w-4 rounded border-slate-300 accent-violet-600"
                  />
                  <span className="flex-1 text-xs text-slate-700">
                    {s.name}
                  </span>
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
              "h-12 w-full rounded-xl text-sm font-semibold text-white",
              isValid && !isSubmitting
                ? "bg-violet-600 active:scale-95"
                : "bg-violet-300",
            )}
          >
            {isSubmitting
              ? "Menyimpan…"
              : editingId
                ? "Simpan Perubahan"
                : "Tambah Bahan Baku"}
          </button>
        </div>
      </div>
    </div>
  );
}
