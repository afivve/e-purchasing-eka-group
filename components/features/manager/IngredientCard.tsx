"use client";

import { Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { StockStatusBadge } from "./StockStatusBadge";
import type { IngredientWithStock } from "@/types";

interface IngredientCardProps {
  ingredient: IngredientWithStock;
  primarySupplierName: string | null;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function IngredientCard({
  ingredient,
  primarySupplierName,
  onEdit,
  onDelete,
}: IngredientCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-800 leading-tight">
            {ingredient.name}
          </p>
          <p className="mt-0.5 text-xs text-slate-400">{ingredient.category}</p>
        </div>
        <StockStatusBadge status={ingredient.stockStatus} />
      </div>

      <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
        <span>
          Stok:{" "}
          <span
            className={cn(
              "font-medium",
              ingredient.stockStatus === "empty"
                ? "text-red-500"
                : ingredient.stockStatus === "low"
                  ? "text-amber-600"
                  : "text-slate-700",
            )}
          >
            {ingredient.stock} {ingredient.unit}
          </span>
        </span>
        {primarySupplierName && (
          <span className="truncate text-slate-400">{primarySupplierName}</span>
        )}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={() => onEdit(ingredient.id)}
          className="flex h-8 min-w-11 flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 text-xs font-medium text-slate-600 hover:bg-slate-50 active:scale-95 transition-transform"
        >
          <Pencil className="h-3 w-3" />
          Edit
        </button>
        <button
          onClick={() => onDelete(ingredient.id)}
          className="flex h-8 min-w-11 items-center justify-center gap-1.5 rounded-lg border border-red-100 px-3 text-xs font-medium text-red-500 hover:bg-red-50 active:scale-95 transition-transform"
        >
          <Trash2 className="h-3 w-3" />
          Hapus
        </button>
      </div>
    </div>
  );
}
