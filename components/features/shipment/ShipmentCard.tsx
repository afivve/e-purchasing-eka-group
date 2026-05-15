"use client";

import { MapPin, Package, ChevronRight } from "lucide-react";
import { cn, formatShortDate } from "@/lib/utils";
import { ShipmentStatusBadge } from "./ShipmentStatusBadge";
import { ShipmentProgress } from "./ShipmentProgress";
import type { Shipment } from "@/types";

interface ShipmentCardProps {
  shipment: Shipment;
  onDetail: (id: string) => void;
}

/** States that show the receiving progress bar */
const PROGRESS_STATES = new Set(["delivered", "checked"]);
/** States that prompt admin to take action */
const ACTION_STATES = new Set(["delivered"]);

export function ShipmentCard({ shipment, onDetail }: ShipmentCardProps) {
  const showProgress = PROGRESS_STATES.has(shipment.status);
  const needsAction = ACTION_STATES.has(shipment.status);

  return (
    <div
      className={cn(
        "rounded-xl border bg-white overflow-hidden",
        needsAction
          ? "border-teal-200 ring-1 ring-teal-100"
          : shipment.status === "in_transit"
            ? "border-blue-200"
            : "border-slate-200",
      )}
    >
      {/* Main card body — fully tappable */}
      <div
        className="cursor-pointer select-none p-3"
        onClick={() => onDetail(shipment.id)}
      >
        {/* Row 1: SJ number + status badge */}
        <div className="mb-2 flex items-start justify-between gap-2">
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              Surat Jalan
            </span>
            <span className="text-sm font-bold text-slate-900 leading-snug">
              {shipment.suratJalanNo}
            </span>
          </div>
          <ShipmentStatusBadge
            status={shipment.status}
            className="mt-0.5 shrink-0"
          />
        </div>

        {/* Row 2: client name + date/time */}
        <div className="mb-2.5 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1">
            <MapPin size={11} className="shrink-0 text-slate-400" />
            <span className="truncate text-xs text-slate-600">
              {shipment.clientName}
            </span>
          </div>
          <span className="shrink-0 text-[11px] tabular-nums text-slate-400">
            {formatShortDate(shipment.deliveryDate)} · {shipment.scheduledTime}
          </span>
        </div>

        {/* Row 3: progress bar OR item count */}
        {showProgress ? (
          <ShipmentProgress items={shipment.items} />
        ) : (
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <Package size={11} className="text-slate-400" />
              <span className="text-xs text-slate-400">
                {shipment.items.length} item bahan baku
              </span>
            </div>
            <span className="inline-flex items-center gap-0.5 text-xs font-medium text-slate-500">
              Detail <ChevronRight size={12} />
            </span>
          </div>
        )}
      </div>

      {/* CTA strip — only for actionable states */}
      {needsAction && (
        <div className="border-t border-teal-100 bg-teal-50 px-3 py-2.5">
          <button
            type="button"
            onClick={() => onDetail(shipment.id)}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-teal-600 px-3 py-2.5 text-xs font-semibold text-white transition-colors active:bg-teal-700"
          >
            Mulai Checklist Penerimaan
            <ChevronRight size={13} />
          </button>
        </div>
      )}
    </div>
  );
}
