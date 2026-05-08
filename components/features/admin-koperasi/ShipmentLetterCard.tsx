"use client";

import { useState } from "react";
import {
  Truck,
  User,
  ChevronDown,
  ChevronUp,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
} from "lucide-react";
import type { ShipmentLetter, ShipmentLetterStatus } from "@/types";
import { formatDate } from "@/lib/utils";
import { ShipmentLetterStatusBadge } from "./ShipmentLetterStatusBadge";
import { ShipmentStatusTimeline } from "./ShipmentStatusTimeline";

const STATUS_NEXT: Partial<Record<ShipmentLetterStatus, ShipmentLetterStatus>> =
  {
    draft: "waiting_pickup",
    waiting_pickup: "scheduled",
    scheduled: "in_transit",
    in_transit: "completed",
    completed: "received_by_client",
  };

interface Props {
  letter: ShipmentLetter;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onPreview: (id: string) => void;
  onUpdateStatus: (id: string, status: ShipmentLetterStatus) => void;
}

export function ShipmentLetterCard({
  letter,
  onEdit,
  onDelete,
  onPreview,
  onUpdateStatus,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  const checkedCount = letter.items.filter((i) => i.isChecked).length;
  const totalCount = letter.items.length;
  const nextStatus = STATUS_NEXT[letter.status];
  const isDone = letter.status === "received_by_client";

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      {/* Header */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-semibold text-orange-600">
                {letter.code}
              </span>
              <ShipmentLetterStatusBadge status={letter.status} />
            </div>
            <p className="mt-0.5 truncate text-sm font-medium text-slate-800">
              {letter.clientName}
            </p>
            <p className="truncate text-xs text-slate-500">{letter.menuName}</p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => onPreview(letter.id)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 active:bg-slate-200"
              aria-label="Preview surat jalan"
            >
              <Eye size={15} />
            </button>
            <button
              onClick={() => onEdit(letter.id)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 active:bg-slate-200"
              aria-label="Edit surat jalan"
            >
              <Edit2 size={15} />
            </button>
            <button
              onClick={() => onDelete(letter.id)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-red-400 hover:bg-red-50 active:bg-red-100"
              aria-label="Hapus surat jalan"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>

        {/* Meta row */}
        <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
          <span>{formatDate(letter.deliveryDate)}</span>
          <span className="text-slate-300">•</span>
          <span
            className={[
              "font-medium",
              checkedCount === totalCount ? "text-green-600" : "text-amber-600",
            ].join(" ")}
          >
            {checkedCount}/{totalCount} item
          </span>
          {letter.driverName && (
            <>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1 truncate">
                <User size={10} />
                {letter.driverName}
              </span>
            </>
          )}
          {letter.vehicleNo && (
            <>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1">
                <Truck size={10} />
                {letter.vehicleNo}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded((p) => !p)}
        className="flex w-full items-center justify-center gap-1 border-t border-slate-100 py-1.5 text-[11px] text-slate-400 hover:bg-slate-50 active:bg-slate-100"
      >
        {expanded ? (
          <>
            <ChevronUp size={12} /> Sembunyikan
          </>
        ) : (
          <>
            <ChevronDown size={12} /> Detail &amp; Timeline
          </>
        )}
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-slate-100 p-3 space-y-3">
          {/* Timeline */}
          <div>
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Status
            </p>
            <ShipmentStatusTimeline status={letter.status} />
          </div>

          {/* Items */}
          <div>
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Item
            </p>
            <div className="space-y-1">
              {letter.items.map((item) => (
                <div key={item.id} className="flex items-center gap-2 text-xs">
                  <CheckCircle2
                    size={13}
                    className={
                      item.isChecked ? "text-green-500" : "text-slate-300"
                    }
                  />
                  <span
                    className={
                      item.isChecked ? "text-slate-700" : "text-slate-400"
                    }
                  >
                    {item.ingredientName}
                  </span>
                  <span className="text-slate-400">
                    {item.quantity} {item.unit}
                  </span>
                  {item.supplierName && (
                    <span className="ml-auto text-slate-400 truncate max-w-28">
                      {item.supplierName}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {letter.note && (
            <p className="rounded-lg bg-amber-50 px-2.5 py-1.5 text-xs text-amber-700">
              Catatan: {letter.note}
            </p>
          )}

          {/* Quick status advance */}
          {!isDone && nextStatus && (
            <button
              onClick={() => onUpdateStatus(letter.id, nextStatus)}
              className="w-full rounded-lg bg-orange-600 px-3 py-2.5 text-sm font-semibold text-white hover:bg-orange-700 active:bg-orange-800"
            >
              Tandai:{" "}
              {nextStatus === "waiting_pickup"
                ? "Menunggu Pickup"
                : nextStatus === "scheduled"
                  ? "Terjadwal"
                  : nextStatus === "in_transit"
                    ? "Dalam Perjalanan"
                    : nextStatus === "completed"
                      ? "Selesai"
                      : "Diterima Klien"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
