"use client";

import { cn } from "@/lib/utils";
import type { DeliveryStatus } from "@/types";

interface ProgressStatusProps {
  status: DeliveryStatus;
  progress: number;
  showBar?: boolean;
  className?: string;
}

const STATUS_CONFIG: Record<
  DeliveryStatus,
  { label: (p: number) => string; badge: string; bar: string }
> = {
  pending: {
    label: () => "Menunggu Penjadwalan",
    badge: "bg-slate-100 text-slate-600 border border-slate-200",
    bar: "bg-slate-300",
  },
  partial: {
    label: (p) => `Barang Sampai ${p}%`,
    badge: "bg-amber-50 text-amber-700 border border-amber-200",
    bar: "bg-amber-400",
  },
  complete: {
    label: () => "Bahan Baku Lengkap",
    badge: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    bar: "bg-emerald-500",
  },
};

export function ProgressStatus({
  status,
  progress,
  showBar = true,
  className,
}: ProgressStatusProps) {
  const config = STATUS_CONFIG[status];

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium leading-none",
            config.badge,
          )}
        >
          {config.label(progress)}
        </span>
        {status !== "pending" && (
          <span className="text-[11px] text-slate-400 tabular-nums">
            {progress}%
          </span>
        )}
      </div>
      {showBar && (
        <div className="h-1 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              config.bar,
            )}
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}
    </div>
  );
}
