import type { ShipmentLetterStatus } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  status: ShipmentLetterStatus;
  className?: string;
}

const CONFIG: Record<
  ShipmentLetterStatus,
  { label: string; className: string }
> = {
  draft: {
    label: "Draft",
    className: "bg-slate-100 text-slate-600 border-slate-200",
  },
  waiting_pickup: {
    label: "Menunggu Pickup",
    className: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  scheduled: {
    label: "Terjadwal",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  in_transit: {
    label: "Dalam Perjalanan",
    className: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  partial_arrived: {
    label: "Tiba Sebagian",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  completed: {
    label: "Selesai",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  received_by_client: {
    label: "Diterima",
    className: "bg-green-50 text-green-700 border-green-200",
  },
};

export function ShipmentLetterStatusBadge({ status, className }: Props) {
  const cfg = CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium",
        cfg.className,
        className,
      )}
    >
      {cfg.label}
    </span>
  );
}
