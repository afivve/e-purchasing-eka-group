"use client";

import { cn } from "@/lib/utils";
import type { ShipmentItem } from "@/types";

interface ShipmentProgressProps {
  items: ShipmentItem[];
  className?: string;
}

export function ShipmentProgress({ items, className }: ShipmentProgressProps) {
  const total = items.length;
  const checked = items.filter((i) => i.receivingStatus !== "pending").length;
  const pct = total > 0 ? Math.round((checked / total) * 100) : 0;

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-slate-500">
          {checked} / {total} item diperiksa
        </span>
        <span className="text-[11px] font-semibold tabular-nums text-slate-600">
          {pct}%
        </span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            pct === 100
              ? "bg-emerald-500"
              : pct > 0
                ? "bg-teal-500"
                : "bg-slate-200",
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
