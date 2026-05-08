"use client";

import { cn } from "@/lib/utils";
import type { StockStatus } from "@/types";

const STOCK_CONFIG: Record<StockStatus, { label: string; className: string }> =
  {
    ok: {
      label: "Aman",
      className: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    },
    low: {
      label: "Menipis",
      className: "bg-amber-50 text-amber-700 border border-amber-200",
    },
    empty: {
      label: "Kosong",
      className: "bg-red-50 text-red-600 border border-red-100",
    },
  };

interface StockStatusBadgeProps {
  status: StockStatus;
  className?: string;
}

export function StockStatusBadge({ status, className }: StockStatusBadgeProps) {
  const config = STOCK_CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium leading-none",
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  );
}
