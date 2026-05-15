"use client";

import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DailyNeedIngredient, DailyNeedDeliveryStatus } from "@/types";

const ING_STATUS_CONFIG: Record<
  DailyNeedDeliveryStatus,
  { dot: string; text: string }
> = {
  unscheduled: { dot: "bg-slate-400", text: "text-slate-500" },
  in_process: { dot: "bg-blue-500", text: "text-blue-700" },
  partial: { dot: "bg-amber-400", text: "text-amber-700" },
  complete: { dot: "bg-emerald-500", text: "text-emerald-700" },
};

interface IngredientStatusItemProps {
  ingredient: DailyNeedIngredient;
  onPickSupplier: (ingredientId: string) => void;
  onRemoveSplit?: (ingredientId: string, supplierId: string) => void;
}

export function IngredientStatusItem({
  ingredient,
  onPickSupplier,
  onRemoveSplit,
}: IngredientStatusItemProps) {
  const config = ING_STATUS_CONFIG[ingredient.deliveryStatus];
  const hasSplits = ingredient.supplierSplits.length > 0;

  return (
    <div className="py-1.5">
      {/* Ingredient name + status */}
      <div className="flex items-center gap-2">
        <span
          className={cn("mt-0.5 h-2 w-2 shrink-0 rounded-full", config.dot)}
        />
        <div className="min-w-0 flex-1">
          <p className="text-xs text-slate-700 leading-tight">
            {ingredient.ingredientName}
          </p>
          <p className="text-[11px] text-slate-400">
            Total: {ingredient.quantity} {ingredient.unit}
          </p>
        </div>
        <span className={cn("shrink-0 text-[11px] font-medium", config.text)}>
          {ingredient.deliveryStatus === "complete"
            ? "Tiba"
            : ingredient.deliveryStatus === "partial"
              ? "Sebagian"
              : ingredient.deliveryStatus === "in_process"
                ? "Proses"
                : "—"}
        </span>
      </div>

      {/* Supplier splits */}
      {hasSplits && (
        <div className="mt-1.5 ml-4 flex flex-col gap-1">
          {ingredient.supplierSplits.map((split) => (
            <div
              key={split.supplierId}
              className="flex items-center gap-1.5 rounded-lg bg-slate-50 border border-slate-100 px-2 py-1"
            >
              <span className="min-w-0 flex-1 truncate text-[11px] text-slate-600">
                {split.supplierName}
              </span>
              <span className="shrink-0 text-[11px] tabular-nums font-medium text-slate-500">
                {split.quantity} {ingredient.unit}
              </span>
              {onRemoveSplit && (
                <button
                  type="button"
                  onClick={() => onRemoveSplit(ingredient.id, split.supplierId)}
                  className="flex h-4 w-4 shrink-0 items-center justify-center rounded text-slate-400 hover:text-red-500"
                >
                  <X size={10} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Action button */}
      <div className="mt-1.5 ml-4">
        <button
          type="button"
          onClick={() => onPickSupplier(ingredient.id)}
          className="inline-flex h-6 items-center gap-1 rounded-lg bg-teal-50 border border-teal-200 px-2 text-[11px] font-semibold text-teal-700 active:scale-95 transition-transform"
        >
          <Plus size={10} />
          {hasSplits ? "Tambah Supplier" : "Pilih Supplier"}
        </button>
      </div>
    </div>
  );
}
