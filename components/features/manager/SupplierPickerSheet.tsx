"use client";

import { X, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DailyNeed, Supplier } from "@/types";

interface SupplierPickerSheetProps {
  isOpen: boolean;
  onClose: () => void;
  need: DailyNeed | null;
  ingredientId: string | null;
  allSuppliers: Supplier[];
  onAssign: (needId: string, ingredientId: string, supplierId: string) => void;
}

export function SupplierPickerSheet({
  isOpen,
  onClose,
  need,
  ingredientId,
  allSuppliers,
  onAssign,
}: SupplierPickerSheetProps) {
  if (!isOpen || !need || !ingredientId) return null;

  const ingredient = need.ingredients.find((i) => i.id === ingredientId);
  if (!ingredient) return null;

  const eligibleSuppliers = allSuppliers.filter(
    (s) => s.isActive && s.ingredientIds.includes(ingredient.ingredientId),
  );

  return (
    <div className="fixed inset-0 z-60 flex flex-col justify-end">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative flex max-h-[80dvh] flex-col rounded-t-2xl bg-white shadow-2xl">
        <div className="flex justify-center pt-2.5 pb-1">
          <div className="h-1 w-10 rounded-full bg-slate-200" />
        </div>
        <div className="flex items-center justify-between border-b border-slate-100 px-4 pb-3">
          <div>
            <h2 className="text-base font-semibold text-slate-800">
              Pilih Supplier
            </h2>
            <p className="text-xs text-slate-500">
              {ingredient.ingredientName} · {ingredient.quantity}{" "}
              {ingredient.unit}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100 active:scale-95"
          >
            <X className="h-4 w-4 text-slate-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
          {eligibleSuppliers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <p className="text-sm font-medium text-slate-600">
                Tidak ada supplier tersedia
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Tidak ada supplier aktif yang menyuplai{" "}
                {ingredient.ingredientName}.
              </p>
            </div>
          ) : (
            eligibleSuppliers.map((s) => (
              <div
                key={s.id}
                className="rounded-xl border border-slate-200 bg-white p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-800">
                      {s.name}
                    </p>
                    <p className="text-xs text-slate-500">{s.contact}</p>
                    {s.phone && (
                      <p className="text-xs text-slate-400">{s.phone}</p>
                    )}
                    <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {s.estimatedDeliveryDays}h pengiriman
                      </span>
                      {s.priceNote && (
                        <span className="text-slate-300">· {s.priceNote}</span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => onAssign(need.id, ingredientId, s.id)}
                    className="shrink-0 h-9 rounded-lg bg-teal-600 px-4 text-xs font-semibold text-white active:scale-95 transition-transform"
                  >
                    Pilih
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
