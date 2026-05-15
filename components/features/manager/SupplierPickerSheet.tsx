"use client";

import { useState } from "react";
import { X, Clock, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DailyNeed, DailyNeedIngredient, Supplier } from "@/types";

interface SupplierPickerSheetProps {
  isOpen: boolean;
  onClose: () => void;
  need: DailyNeed | null;
  ingredient: DailyNeedIngredient | null;
  allSuppliers: Supplier[];
  onAddSplit: (
    needId: string,
    ingredientId: string,
    supplierId: string,
    qty: number,
  ) => void;
  onRemoveSplit: (
    needId: string,
    ingredientId: string,
    supplierId: string,
  ) => void;
}

export function SupplierPickerSheet({
  isOpen,
  onClose,
  need,
  ingredient,
  allSuppliers,
  onAddSplit,
  onRemoveSplit,
}: SupplierPickerSheetProps) {
  const [qtyMap, setQtyMap] = useState<Record<string, string>>({});

  if (!isOpen || !need || !ingredient) return null;

  const eligibleSuppliers = allSuppliers.filter(
    (s) => s.isActive && s.ingredientIds.includes(ingredient.ingredientId),
  );

  const assignedIds = new Set(
    ingredient.supplierSplits.map((s) => s.supplierId),
  );

  return (
    <div className="fixed inset-0 z-60 flex flex-col justify-end">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative flex max-h-[85dvh] flex-col rounded-t-2xl bg-white shadow-2xl">
        <div className="flex justify-center pt-2.5 pb-1">
          <div className="h-1 w-10 rounded-full bg-slate-200" />
        </div>
        <div className="flex items-center justify-between border-b border-slate-100 px-4 pb-3">
          <div>
            <h2 className="text-base font-semibold text-slate-800">
              Supplier Split
            </h2>
            <p className="text-xs text-slate-500">
              {ingredient.ingredientName} · Total {ingredient.quantity}{" "}
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

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
          {/* Existing splits */}
          {ingredient.supplierSplits.length > 0 && (
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Sudah Ditentukan
              </p>
              <div className="space-y-1.5">
                {ingredient.supplierSplits.map((split) => (
                  <div
                    key={split.supplierId}
                    className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-slate-800">
                        {split.supplierName}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {split.quantity} {ingredient.unit}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        onRemoveSplit(need.id, ingredient.id, split.supplierId)
                      }
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 active:scale-95"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Eligible suppliers */}
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Tambah Supplier
            </p>
            {eligibleSuppliers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <p className="text-sm font-medium text-slate-600">
                  Tidak ada supplier tersedia
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Tidak ada supplier aktif untuk {ingredient.ingredientName}.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {eligibleSuppliers.map((s) => {
                  const qty = qtyMap[s.id] ?? "";
                  return (
                    <div
                      key={s.id}
                      className={cn(
                        "rounded-xl border p-3",
                        assignedIds.has(s.id)
                          ? "border-emerald-200 bg-emerald-50/50"
                          : "border-slate-200 bg-white",
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-slate-800">
                            {s.name}
                          </p>
                          {s.contact && (
                            <p className="text-[11px] text-slate-500">
                              {s.contact}
                            </p>
                          )}
                          <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-400">
                            <Clock className="h-3 w-3" />
                            {s.estimatedDeliveryDays}h pengiriman
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 flex gap-2">
                        <input
                          type="number"
                          min={0}
                          value={qty}
                          onChange={(e) =>
                            setQtyMap((prev) => ({
                              ...prev,
                              [s.id]: e.target.value,
                            }))
                          }
                          placeholder={`Jml (${ingredient.unit})`}
                          className="h-9 flex-1 rounded-lg border border-slate-200 px-2 text-xs text-slate-800 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
                        />
                        <button
                          type="button"
                          disabled={!qty || Number(qty) <= 0}
                          onClick={() => {
                            const parsed = Number(qty);
                            if (parsed > 0) {
                              onAddSplit(need.id, ingredient.id, s.id, parsed);
                              setQtyMap((prev) => ({ ...prev, [s.id]: "" }));
                            }
                          }}
                          className={cn(
                            "h-9 shrink-0 rounded-lg px-3 text-xs font-semibold text-white transition-transform",
                            qty && Number(qty) > 0
                              ? "bg-teal-600 active:scale-95"
                              : "bg-slate-300",
                          )}
                        >
                          Tambah
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
