import { cn } from "@/lib/utils";
import type { ShipmentLetter, ShipmentLetterStatus } from "@/types";

const STATUS_CONFIG: Record<
  ShipmentLetterStatus,
  { label: string; className: string }
> = {
  draft: {
    label: "Draft",
    className: "bg-slate-50 text-slate-500 border-slate-200",
  },
  waiting_pickup: {
    label: "Menunggu Pickup",
    className: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  scheduled: {
    label: "Terjadwal",
    className: "bg-blue-50 text-blue-600 border-blue-200",
  },
  in_transit: {
    label: "Dalam Perjalanan",
    className: "bg-indigo-50 text-indigo-600 border-indigo-200",
  },
  partial_arrived: {
    label: "Sebagian Tiba",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  completed: {
    label: "Selesai",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  received_by_client: {
    label: "Diterima Client",
    className: "bg-teal-50 text-teal-700 border-teal-200",
  },
};

interface Props {
  letter: ShipmentLetter;
}

export default function ShipmentMonitoringCard({ letter }: Props) {
  const { label: statusLabel, className: statusClass } =
    STATUS_CONFIG[letter.status];
  const checkedCount = letter.items.filter((i) => i.isChecked).length;
  const totalCount = letter.items.length;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-800">
            {letter.clientName}
          </p>
          <p className="font-mono text-[11px] text-slate-400">{letter.code}</p>
        </div>
        <span
          className={cn(
            "inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[11px] font-medium",
            statusClass,
          )}
        >
          {statusLabel}
        </span>
      </div>

      {/* Details */}
      <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-slate-500">
        <div>
          <span className="text-slate-400">Tanggal: </span>
          <span className="font-medium text-slate-600">
            {letter.deliveryDate}
          </span>
        </div>
        <div>
          <span className="text-slate-400">Item: </span>
          <span className="font-medium text-slate-600">
            {checkedCount}/{totalCount}
          </span>
        </div>
        {letter.driverName && (
          <div className="col-span-2">
            <span className="text-slate-400">Driver: </span>
            <span className="font-medium text-slate-600">
              {letter.driverName}
            </span>
            {letter.vehicleNo && (
              <span className="ml-2 font-mono text-slate-500">
                ({letter.vehicleNo})
              </span>
            )}
          </div>
        )}
      </div>

      {/* Read-only indicator */}
      <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-400">
        <span>🔒</span>
        <span>Hanya Lihat</span>
      </div>
    </div>
  );
}
