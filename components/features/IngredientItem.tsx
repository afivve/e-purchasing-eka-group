"use client";

import { Trash2, Pencil, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MenuIngredientLine } from "@/types";

interface IngredientItemProps {
  line: MenuIngredientLine;
  index: number;
  onUpdate: (tempId: string, updates: Partial<MenuIngredientLine>) => void;
  onRemove: (tempId: string) => void;
}

export function IngredientItem({
  line,
  index,
  onUpdate,
  onRemove,
}: IngredientItemProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-slate-50/60 p-3">
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-slate-200 text-[10px] font-semibold text-slate-600">
            {index + 1}
          </span>
          <span className="text-sm font-medium text-slate-800 leading-tight truncate">
            {line.ingredientName}
          </span>
          {line.isNew && (
            <span className="shrink-0 text-[9px] font-medium px-1 py-0.5 rounded bg-blue-100 text-blue-600 border border-blue-200">
              BARU
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => onRemove(line.tempId)}
          className="shrink-0 flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
          aria-label="Hapus bahan baku"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Input row */}
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">
            Jumlah
          </label>
          <div className="flex items-center gap-1 rounded-md border border-slate-200 bg-white overflow-hidden focus-within:ring-1 focus-within:ring-blue-400 focus-within:border-blue-400">
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              value={line.quantity}
              onChange={(e) =>
                onUpdate(line.tempId, { quantity: e.target.value })
              }
              placeholder="0"
              className={cn(
                "flex-1 min-w-0 px-2.5 py-2 text-sm bg-transparent outline-none tabular-nums",
                !line.quantity && "text-slate-400",
              )}
            />
            <span className="shrink-0 px-2 text-[11px] text-slate-500 border-l border-slate-200 bg-slate-50 h-full flex items-center py-2">
              {line.unit}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">
            Keterangan
          </label>
          <input
            type="text"
            value={line.note}
            onChange={(e) => onUpdate(line.tempId, { note: e.target.value })}
            placeholder="Opsional"
            className="w-full rounded-md border border-slate-200 bg-white px-2.5 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 placeholder:text-slate-400"
          />
        </div>
      </div>
    </div>
  );
}
