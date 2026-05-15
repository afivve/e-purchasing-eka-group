"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  ScrollText,
  ClipboardList,
} from "lucide-react";
import type { DailyNeed } from "@/types";
import { formatDate } from "@/lib/utils";
import { DailyNeedBadge } from "@/components/features/manager/DailyNeedBadge";

interface Props {
  need: DailyNeed;
  linkedShipmentCode?: string | null;
  onCreateShipmentLetter: (need: DailyNeed) => void;
  onViewShipmentLetter: (needId: string) => void;
}

export function DailyNeedCardOps({
  need,
  linkedShipmentCode,
  onCreateShipmentLetter,
  onViewShipmentLetter,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      {/* Header */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-semibold text-slate-800 truncate">
                {need.clientName}
              </p>
              <DailyNeedBadge status={need.deliveryStatus} />
            </div>
            <p className="mt-0.5 text-xs text-slate-500 truncate">
              {need.menuName}
            </p>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
          <span>{formatDate(need.deliveryDate)}</span>
          <span className="text-slate-300">•</span>
          <span>{need.portionCount} porsi</span>
          <span className="text-slate-300">•</span>
          <span>{need.ingredients.length} bahan</span>
        </div>

        {/* CTA button */}
        <div className="mt-3">
          {linkedShipmentCode ? (
            <button
              onClick={() => onViewShipmentLetter(need.id)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-orange-200 bg-orange-50 px-3 py-2.5 text-sm font-semibold text-orange-700 hover:bg-orange-100 active:bg-orange-200"
            >
              <ScrollText size={15} />
              Lihat Surat Jalan #{linkedShipmentCode}
            </button>
          ) : (
            <button
              onClick={() => onCreateShipmentLetter(need)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 px-3 py-2.5 text-sm font-semibold text-white hover:bg-orange-700 active:bg-orange-800"
            >
              <ClipboardList size={15} />
              Buat Surat Jalan
            </button>
          )}
        </div>
      </div>

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded((p) => !p)}
        className="flex w-full items-center justify-center gap-1 border-t border-slate-100 py-1.5 text-[11px] text-slate-400 hover:bg-slate-50 active:bg-slate-100"
      >
        {expanded ? (
          <>
            <ChevronUp size={12} /> Sembunyikan detail
          </>
        ) : (
          <>
            <ChevronDown size={12} /> Lihat bahan ({need.ingredients.length})
          </>
        )}
      </button>

      {/* Expanded: ingredient list */}
      {expanded && (
        <div className="border-t border-slate-100 px-3 pb-3 pt-2">
          <div className="space-y-1.5">
            {need.ingredients.map((ing) => (
              <div
                key={ing.ingredientId}
                className="flex items-center gap-2 text-xs"
              >
                <span className="flex-1 text-slate-700">
                  {ing.ingredientName}
                </span>
                <span className="font-medium text-slate-800">
                  {ing.quantity} {ing.unit}
                </span>
                {ing.supplierSplits.length > 0 ? (
                  <span className="text-slate-400 truncate max-w-24">
                    {ing.supplierSplits.map((s) => s.supplierName).join(", ")}
                  </span>
                ) : (
                  <span className="text-amber-500 italic">
                    Belum ada supplier
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
