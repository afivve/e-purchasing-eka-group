"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatShortDate } from "@/lib/utils";
import {
  DailyNeedDeliveryBadge,
  DailyNeedPaymentBadge,
} from "./DailyNeedBadge";
import { IngredientStatusItem } from "./IngredientStatusItem";
import type { DailyNeed } from "@/types";

interface DailyNeedCardProps {
  need: DailyNeed;
  onPickSupplier: (needId: string, ingredientId: string) => void;
  onRemoveSplit?: (
    needId: string,
    ingredientId: string,
    supplierId: string,
  ) => void;
  defaultExpanded?: boolean;
}

export function DailyNeedCard({
  need,
  onPickSupplier,
  onRemoveSplit,
  defaultExpanded = false,
}: DailyNeedCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const unassignedCount = need.ingredients.filter(
    (i) => i.supplierSplits.length === 0,
  ).length;

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full p-3 text-left active:bg-slate-50"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-800 leading-tight line-clamp-2">
              {need.menuName}
            </p>
            <p className="mt-0.5 text-xs text-slate-500">{need.clientName}</p>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <DailyNeedDeliveryBadge status={need.deliveryStatus} />
            {expanded ? (
              <ChevronUp className="h-4 w-4 text-slate-300" />
            ) : (
              <ChevronDown className="h-4 w-4 text-slate-300" />
            )}
          </div>
        </div>

        <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
          <span>{formatShortDate(need.deliveryDate)}</span>
          <DailyNeedPaymentBadge status={need.paymentStatus} />
        </div>

        {unassignedCount > 0 && (
          <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-0.5 text-[11px] font-medium text-orange-600 border border-orange-200">
            {unassignedCount} bahan belum ada supplier
          </div>
        )}
      </button>

      {/* Expanded ingredient list */}
      {expanded && (
        <div className="border-t border-slate-100 px-3 pb-3">
          <p className="pt-2.5 pb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Bahan-bahan ({need.ingredients.length})
          </p>
          <div className="divide-y divide-slate-50">
            {need.ingredients.map((ing) => (
              <IngredientStatusItem
                key={ing.id}
                ingredient={ing}
                onPickSupplier={(ingId) => onPickSupplier(need.id, ingId)}
                onRemoveSplit={
                  onRemoveSplit
                    ? (ingId, supplierId) =>
                        onRemoveSplit(need.id, ingId, supplierId)
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
