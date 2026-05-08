"use client";

import { Phone, MapPin, Package, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Supplier } from "@/types";

interface SupplierCardProps {
  supplier: Supplier;
  ingredientNames: string[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function SupplierCard({
  supplier,
  ingredientNames,
  onEdit,
  onDelete,
}: SupplierCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-white p-3",
        supplier.isActive ? "border-slate-200" : "border-slate-100 opacity-60",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-800 leading-tight">
            {supplier.name}
          </p>
          <p className="mt-0.5 text-xs text-slate-500">{supplier.contact}</p>
        </div>
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium leading-none shrink-0",
            supplier.isActive
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-slate-100 text-slate-500 border border-slate-200",
          )}
        >
          {supplier.isActive ? "Aktif" : "Nonaktif"}
        </span>
      </div>

      <div className="mt-2 space-y-1 text-xs text-slate-500">
        {supplier.phone && (
          <div className="flex items-center gap-1.5">
            <Phone className="h-3 w-3 shrink-0" />
            {supplier.phone}
          </div>
        )}
        {supplier.address && (
          <div className="flex items-start gap-1.5">
            <MapPin className="h-3 w-3 shrink-0 mt-0.5" />
            <span className="line-clamp-1">{supplier.address}</span>
          </div>
        )}
        <div className="flex items-center gap-1.5">
          <Package className="h-3 w-3 shrink-0" />
          <span>{supplier.ingredientIds.length} bahan baku</span>
          {supplier.estimatedDeliveryDays > 0 && (
            <span className="text-slate-400">
              · kirim {supplier.estimatedDeliveryDays}h
            </span>
          )}
        </div>
      </div>

      {ingredientNames.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {ingredientNames.slice(0, 4).map((name) => (
            <span
              key={name}
              className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium bg-slate-100 text-slate-600"
            >
              {name}
            </span>
          ))}
          {ingredientNames.length > 4 && (
            <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium bg-slate-100 text-slate-400">
              +{ingredientNames.length - 4} lainnya
            </span>
          )}
        </div>
      )}

      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={() => onEdit(supplier.id)}
          className="flex h-8 min-w-11 flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 text-xs font-medium text-slate-600 hover:bg-slate-50 active:scale-95 transition-transform"
        >
          <Pencil className="h-3 w-3" />
          Edit
        </button>
        <button
          onClick={() => onDelete(supplier.id)}
          className="flex h-8 min-w-11 items-center justify-center gap-1.5 rounded-lg border border-red-100 px-3 text-xs font-medium text-red-500 hover:bg-red-50 active:scale-95 transition-transform"
        >
          <Trash2 className="h-3 w-3" />
          Hapus
        </button>
      </div>
    </div>
  );
}
