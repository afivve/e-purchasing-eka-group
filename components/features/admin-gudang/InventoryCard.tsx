"use client";

import StockStatusBadge from "./StockStatusBadge";
import type { WarehouseIngredient } from "@/types";

interface Props {
  item: WarehouseIngredient;
  onUpdateClick: (id: string) => void;
}

export default function InventoryCard({ item, onUpdateClick }: Props) {
  const diff = item.realStock - item.systemStock;
  const hasDiff = diff !== 0;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
            {item.category}
          </p>
          <p className="mt-0.5 truncate text-sm font-semibold text-slate-800">
            {item.name}
          </p>
        </div>
        <StockStatusBadge status={item.stockStatus} className="shrink-0" />
      </div>

      {/* Stock number */}
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-2xl font-bold leading-none text-slate-900">
          {item.realStock.toLocaleString("id-ID")}
        </span>
        <span className="text-xs text-slate-500">{item.unit}</span>
      </div>

      {/* System vs real discrepancy */}
      {hasDiff && (
        <p className="mt-1 text-[11px] text-violet-600">
          Sistem: {item.systemStock.toLocaleString("id-ID")} {item.unit}{" "}
          &nbsp;|&nbsp; Selisih:{" "}
          <span
            className={
              diff < 0
                ? "text-red-600 font-semibold"
                : "text-emerald-600 font-semibold"
            }
          >
            {diff > 0 ? `+${diff}` : diff}
          </span>
        </p>
      )}

      {/* Supplier */}
      {item.primarySupplierName && (
        <p className="mt-1 text-[11px] text-slate-400 truncate">
          Supplier: {item.primarySupplierName}
        </p>
      )}

      {/* Last note */}
      {item.lastNote && (
        <p className="mt-1 line-clamp-1 text-[11px] italic text-slate-400">
          {item.lastNote}
        </p>
      )}

      {/* Action */}
      <button
        onClick={() => onUpdateClick(item.id)}
        className="mt-3 flex min-h-11 w-full items-center justify-center rounded-lg bg-emerald-50 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-100 active:bg-emerald-200"
      >
        Update Stok
      </button>
    </div>
  );
}
