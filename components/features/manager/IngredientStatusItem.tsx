"use client";

import { cn } from "@/lib/utils";
import { DailyNeedDeliveryBadge } from "./DailyNeedBadge";
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
}

export function IngredientStatusItem({
  ingredient,
  onPickSupplier,
}: IngredientStatusItemProps) {
  const config = ING_STATUS_CONFIG[ingredient.deliveryStatus];

  return (
    <div className="flex items-center gap-2 py-1.5">
      <span
        className={cn("mt-0.5 h-2 w-2 shrink-0 rounded-full", config.dot)}
      />
      <div className="min-w-0 flex-1">
        <p className="text-xs text-slate-700 leading-tight">
          {ingredient.ingredientName}
        </p>
        <p className="text-[11px] text-slate-400">
          {ingredient.quantity} {ingredient.unit}
          {ingredient.supplierName && <> · {ingredient.supplierName}</>}
        </p>
      </div>
      {ingredient.supplierId === null ? (
        <button
          onClick={() => onPickSupplier(ingredient.id)}
          className="shrink-0 h-7 rounded-lg bg-teal-50 border border-teal-200 px-2.5 text-[11px] font-semibold text-teal-700 active:scale-95 transition-transform"
        >
          Pilih Supplier
        </button>
      ) : (
        <span className={cn("shrink-0 text-[11px] font-medium", config.text)}>
          {ingredient.deliveryStatus === "complete"
            ? "Tiba"
            : ingredient.deliveryStatus === "partial"
              ? "Sebagian"
              : ingredient.deliveryStatus === "in_process"
                ? "Proses"
                : "—"}
        </span>
      )}
    </div>
  );
}
