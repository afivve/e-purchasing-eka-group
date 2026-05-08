"use client";

import { cn } from "@/lib/utils";
import type { IncomingShipment, IncomingReceivingStatus } from "@/types";

const STATUS_CONFIG: Record<
  IncomingReceivingStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "Menunggu",
    className: "bg-slate-50 text-slate-600 border-slate-200",
  },
  inspecting: {
    label: "Diperiksa",
    className: "bg-blue-50 text-blue-600 border-blue-200",
  },
  partial: {
    label: "Sebagian",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  received: {
    label: "Diterima",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
};

interface Props {
  shipment: IncomingShipment;
  onPress: (id: string) => void;
}

export default function IncomingShipmentCard({ shipment, onPress }: Props) {
  const totalItems = shipment.items.length;
  const checkedItems = shipment.items.filter((i) => i.isChecked).length;
  const pct = totalItems > 0 ? (checkedItems / totalItems) * 100 : 0;
  const { label, className: statusClass } = STATUS_CONFIG[shipment.status];

  const isActionable = shipment.status !== "received";
  const buttonLabel =
    shipment.status === "pending"
      ? "Mulai Periksa"
      : shipment.status === "received"
        ? "Lihat Detail"
        : "Periksa Barang";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-800">
            {shipment.supplierName}
          </p>
          <p className="mt-0.5 font-mono text-[11px] text-slate-400">
            {shipment.code}
          </p>
        </div>
        <span
          className={cn(
            "inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[11px] font-medium",
            statusClass,
          )}
        >
          {label}
        </span>
      </div>

      {/* Progress */}
      <div className="mt-3">
        <div className="mb-1 flex items-center justify-between text-[11px] text-slate-500">
          <span>
            {checkedItems}/{totalItems} item diperiksa
          </span>
          <span>{shipment.deliveryDate}</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Action */}
      <button
        onClick={() => onPress(shipment.id)}
        className={cn(
          "mt-3 flex min-h-11 w-full items-center justify-center rounded-lg text-sm font-medium transition-colors",
          isActionable
            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 active:bg-emerald-200"
            : "bg-slate-50 text-slate-500 hover:bg-slate-100",
        )}
      >
        {buttonLabel}
      </button>
    </div>
  );
}
