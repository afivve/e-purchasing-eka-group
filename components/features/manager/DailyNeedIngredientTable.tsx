"use client";

import { cn } from "@/lib/utils";
import type { DailyNeed, DailyNeedDeliveryStatus } from "@/types";

const STATUS_BADGE: Record<
  DailyNeedDeliveryStatus,
  { label: string; className: string }
> = {
  unscheduled: {
    label: "Belum",
    className: "bg-slate-100 text-slate-500",
  },
  in_process: {
    label: "Proses",
    className: "bg-blue-50 text-blue-700 border border-blue-200",
  },
  partial: {
    label: "Sebagian",
    className: "bg-amber-50 text-amber-700 border border-amber-200",
  },
  complete: {
    label: "Tiba",
    className: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  },
};

interface Row {
  no: number;
  ingredientName: string;
  unit: string;
  quantity: number;
  deliveryStatus: DailyNeedDeliveryStatus;
  supplierNames: string[];
}

interface DailyNeedIngredientTableProps {
  needs: DailyNeed[];
  onPickSupplier?: (needId: string, ingredientId: string) => void;
}

export function DailyNeedIngredientTable({
  needs,
  onPickSupplier,
}: DailyNeedIngredientTableProps) {
  // Aggregate ingredients by ingredientId
  const aggregated = new Map<
    string,
    {
      ingredientId: string;
      ingredientName: string;
      unit: string;
      totalQty: number;
      statuses: DailyNeedDeliveryStatus[];
      supplierNames: Set<string>;
      // track first needId + ingId for picker
      firstNeedId: string;
      firstIngId: string;
    }
  >();

  for (const need of needs) {
    for (const ing of need.ingredients) {
      const existing = aggregated.get(ing.ingredientId);
      if (existing) {
        existing.totalQty += ing.quantity;
        existing.statuses.push(ing.deliveryStatus);
        ing.supplierSplits.forEach((s) =>
          existing.supplierNames.add(s.supplierName),
        );
      } else {
        aggregated.set(ing.ingredientId, {
          ingredientId: ing.ingredientId,
          ingredientName: ing.ingredientName,
          unit: ing.unit,
          totalQty: ing.quantity,
          statuses: [ing.deliveryStatus],
          supplierNames: new Set(ing.supplierSplits.map((s) => s.supplierName)),
          firstNeedId: need.id,
          firstIngId: ing.id,
        });
      }
    }
  }

  const rows: Row[] = Array.from(aggregated.values()).map((r, i) => {
    // Derive aggregate status
    const hasUnscheduled = r.statuses.some((s) => s === "unscheduled");
    const allComplete = r.statuses.every((s) => s === "complete");
    const anyInProcess = r.statuses.some((s) => s === "in_process");
    const aggStatus: DailyNeedDeliveryStatus = allComplete
      ? "complete"
      : anyInProcess
        ? "in_process"
        : hasUnscheduled
          ? "unscheduled"
          : "partial";

    return {
      no: i + 1,
      ingredientName: r.ingredientName,
      unit: r.unit,
      quantity: r.totalQty,
      deliveryStatus: aggStatus,
      supplierNames: Array.from(r.supplierNames),
    };
  });

  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-12 text-center mx-4">
        <p className="text-sm font-medium text-slate-500">Tidak ada bahan</p>
      </div>
    );
  }

  return (
    <div className="mx-4 mb-4 rounded-xl border border-slate-200 bg-white overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-[24px_1fr_44px_44px_72px] gap-x-2 border-b border-slate-100 bg-slate-50 px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
        <span>#</span>
        <span>Item</span>
        <span className="text-right">Sat</span>
        <span className="text-right">Jml</span>
        <span className="text-center">Status</span>
      </div>

      {/* Rows */}
      <div className="divide-y divide-slate-50">
        {rows.map((row) => {
          const badge = STATUS_BADGE[row.deliveryStatus];
          return (
            <div
              key={row.no}
              className="grid grid-cols-[24px_1fr_44px_44px_72px] items-start gap-x-2 px-3 py-2.5"
            >
              <span className="text-[11px] text-slate-400 pt-0.5">
                {row.no}
              </span>
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-800 leading-tight">
                  {row.ingredientName}
                </p>
                {row.supplierNames.length > 0 && (
                  <p className="mt-0.5 text-[10px] text-slate-400 leading-tight">
                    {row.supplierNames.join(", ")}
                  </p>
                )}
              </div>
              <span className="text-right text-[11px] text-slate-500 pt-0.5">
                {row.unit}
              </span>
              <span className="text-right text-[11px] tabular-nums font-medium text-slate-700 pt-0.5">
                {row.quantity}
              </span>
              <div className="flex justify-center">
                <span
                  className={cn(
                    "inline-flex h-5 items-center rounded-full px-1.5 text-[10px] font-medium",
                    badge.className,
                  )}
                >
                  {badge.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
