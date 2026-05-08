"use client";

import { cn } from "@/lib/utils";
import type { DailyNeedDeliveryStatus, DailyNeedPaymentStatus } from "@/types";

const DELIVERY_STATUS_CONFIG: Record<
  DailyNeedDeliveryStatus,
  { label: string; className: string; dot: string }
> = {
  unscheduled: {
    label: "Belum Dijadwalkan",
    className: "bg-slate-100 text-slate-600 border border-slate-200",
    dot: "bg-slate-400",
  },
  in_process: {
    label: "Proses Pengiriman",
    className: "bg-blue-50 text-blue-700 border border-blue-200",
    dot: "bg-blue-500",
  },
  partial: {
    label: "Sebagian Sampai",
    className: "bg-amber-50 text-amber-700 border border-amber-200",
    dot: "bg-amber-400",
  },
  complete: {
    label: "Lengkap",
    className: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    dot: "bg-emerald-500",
  },
};

const PAYMENT_STATUS_CONFIG: Record<
  DailyNeedPaymentStatus,
  { label: string; className: string }
> = {
  unpaid: {
    label: "Belum Dibayar",
    className: "bg-red-50 text-red-600 border border-red-100",
  },
  paid: {
    label: "Dibayar",
    className: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  },
};

interface DailyNeedDeliveryBadgeProps {
  status: DailyNeedDeliveryStatus;
  className?: string;
}

export function DailyNeedDeliveryBadge({
  status,
  className,
}: DailyNeedDeliveryBadgeProps) {
  const config = DELIVERY_STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium leading-none",
        config.className,
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", config.dot)} />
      {config.label}
    </span>
  );
}

interface DailyNeedPaymentBadgeProps {
  status: DailyNeedPaymentStatus;
  className?: string;
}

export function DailyNeedPaymentBadge({
  status,
  className,
}: DailyNeedPaymentBadgeProps) {
  const config = PAYMENT_STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium leading-none",
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  );
}

// Alias used by admin-koperasi components
export { DailyNeedDeliveryBadge as DailyNeedBadge };
