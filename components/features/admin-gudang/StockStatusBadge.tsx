import { cn } from "@/lib/utils";
import type { WarehouseStockStatus } from "@/types";

const CONFIG: Record<
  WarehouseStockStatus,
  { label: string; className: string }
> = {
  ok: {
    label: "Aman",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  low: {
    label: "Menipis",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  empty: {
    label: "Kosong",
    className: "bg-red-50 text-red-700 border-red-200",
  },
  discrepancy: {
    label: "Selisih",
    className: "bg-violet-50 text-violet-700 border-violet-200",
  },
};

interface Props {
  status: WarehouseStockStatus;
  className?: string;
}

export default function StockStatusBadge({ status, className }: Props) {
  const { label, className: colorClass } = CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium",
        colorClass,
        className,
      )}
    >
      {label}
    </span>
  );
}
