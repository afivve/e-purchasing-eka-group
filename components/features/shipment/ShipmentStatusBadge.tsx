"use client";

import { cn } from "@/lib/utils";
import type { ShipmentStatus } from "@/types";

const STATUS_CONFIG: Record<
  ShipmentStatus,
  { label: string; className: string; dotClass: string }
> = {
  scheduled: {
    label: "Dijadwalkan",
    className: "bg-slate-100 text-slate-600 border border-slate-200",
    dotClass: "bg-slate-400",
  },
  in_transit: {
    label: "Dalam Perjalanan",
    className: "bg-blue-50 text-blue-700 border border-blue-200",
    dotClass: "bg-blue-500",
  },
  delivered: {
    label: "Sampai",
    className: "bg-teal-50 text-teal-700 border border-teal-200",
    dotClass: "bg-teal-500",
  },
  checked: {
    label: "Diterima ✓",
    className: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    dotClass: "bg-emerald-500",
  },
};

interface ShipmentStatusBadgeProps {
  status: ShipmentStatus;
  className?: string;
}

export function ShipmentStatusBadge({
  status,
  className,
}: ShipmentStatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium leading-none",
        config.className,
        className,
      )}
    >
      <span
        className={cn("h-1.5 w-1.5 shrink-0 rounded-full", config.dotClass)}
      />
      {config.label}
    </span>
  );
}
