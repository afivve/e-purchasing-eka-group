"use client";

import { useState } from "react";
import { X, CheckSquare, Square } from "lucide-react";
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
  isOpen: boolean;
  shipment: IncomingShipment | null;
  onClose: () => void;
  onToggleItem: (shipmentId: string, itemId: string) => void;
  onSetReceivedQty: (shipmentId: string, itemId: string, qty: number) => void;
  onSetItemNote: (shipmentId: string, itemId: string, note: string) => void;
  onFinishReceiving: (shipmentId: string) => void;
}

export default function ReceivingChecklistSheet({
  isOpen,
  shipment,
  onClose,
  onToggleItem,
  onSetReceivedQty,
  onSetItemNote,
  onFinishReceiving,
}: Props) {
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

  if (!shipment) return null;

  const totalItems = shipment.items.length;
  const checkedItems = shipment.items.filter((i) => i.isChecked).length;
  const pct = totalItems > 0 ? (checkedItems / totalItems) * 100 : 0;
  const allDone = checkedItems === totalItems;
  const isReadOnly = shipment.status === "received";

  const { label: statusLabel, className: statusClass } =
    STATUS_CONFIG[shipment.status];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 flex max-h-[92dvh] flex-col rounded-t-2xl bg-white shadow-xl transition-transform duration-300 ${isOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="h-1 w-10 rounded-full bg-slate-200" />
        </div>

        {/* Header */}
        <div className="border-b border-slate-100 px-4 pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-semibold text-slate-800">
                {shipment.supplierName}
              </p>
              <p className="font-mono text-[11px] text-slate-400">
                {shipment.code}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium shrink-0",
                  statusClass,
                )}
              >
                {statusLabel}
              </span>
              <button
                onClick={onClose}
                className="flex size-9 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100"
                aria-label="Tutup"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-3">
            <div className="mb-1 flex items-center justify-between text-[11px] text-slate-500">
              <span>
                {checkedItems}/{totalItems} item diperiksa
              </span>
              {allDone && (
                <span className="font-semibold text-emerald-600">
                  Semua Selesai ✓
                </span>
              )}
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Item list */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {shipment.items.map((item) => {
            const isExpanded = expandedItemId === item.id;
            return (
              <div
                key={item.id}
                className={cn(
                  "px-4 py-3",
                  item.isChecked && !isReadOnly && "bg-emerald-50/40",
                )}
              >
                <div className="flex items-start gap-3">
                  {/* Checkbox */}
                  <button
                    onClick={() =>
                      !isReadOnly && onToggleItem(shipment.id, item.id)
                    }
                    disabled={isReadOnly}
                    className={cn(
                      "mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-lg transition-colors",
                      item.isChecked
                        ? "text-emerald-600 hover:bg-emerald-100"
                        : "text-slate-300 hover:bg-slate-100",
                      isReadOnly && "cursor-default opacity-70",
                    )}
                    aria-label={item.isChecked ? "Uncheck" : "Check"}
                  >
                    {item.isChecked ? (
                      <CheckSquare size={24} />
                    ) : (
                      <Square size={24} />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <p
                      className={cn(
                        "text-sm font-semibold",
                        item.isChecked ? "text-emerald-700" : "text-slate-800",
                      )}
                    >
                      {item.ingredientName}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Pesan: {item.orderedQty.toLocaleString("id-ID")}{" "}
                      {item.unit}
                    </p>

                    {/* Received qty */}
                    <div className="mt-2 flex items-center gap-2">
                      <label className="shrink-0 text-[11px] text-slate-500">
                        Diterima:
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        inputMode="decimal"
                        disabled={isReadOnly}
                        value={item.receivedQty}
                        onChange={(e) =>
                          onSetReceivedQty(
                            shipment.id,
                            item.id,
                            parseFloat(e.target.value) || 0,
                          )
                        }
                        className="w-20 min-h-9 rounded-lg border border-slate-200 px-2 py-1 text-sm text-slate-800 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 disabled:bg-slate-50"
                      />
                      <span className="text-[11px] text-slate-400">
                        {item.unit}
                      </span>

                      {item.receivedQty < item.orderedQty &&
                        item.receivedQty > 0 && (
                          <span className="text-[11px] text-amber-600 font-medium">
                            (kurang{" "}
                            {(
                              item.orderedQty - item.receivedQty
                            ).toLocaleString("id-ID")}
                            )
                          </span>
                        )}
                    </div>

                    {/* Note toggle */}
                    <button
                      onClick={() =>
                        setExpandedItemId(isExpanded ? null : item.id)
                      }
                      className="mt-1.5 text-[11px] text-slate-400 hover:text-slate-600"
                    >
                      {isExpanded
                        ? "▲ Sembunyikan catatan"
                        : item.note
                          ? `✎ ${item.note}`
                          : "+ Tambah catatan"}
                    </button>

                    {isExpanded && !isReadOnly && (
                      <input
                        type="text"
                        placeholder="Catatan (opsional)..."
                        value={item.note}
                        onChange={(e) =>
                          onSetItemNote(shipment.id, item.id, e.target.value)
                        }
                        className="mt-1.5 w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs text-slate-700 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        {!isReadOnly && (
          <div className="border-t border-slate-100 bg-white px-4 py-3 space-y-2">
            <button
              onClick={() => onFinishReceiving(shipment.id)}
              className="flex min-h-11 w-full items-center justify-center rounded-xl bg-emerald-700 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-50 transition-colors"
            >
              {allDone ? "Selesai Penerimaan" : "Simpan Sebagian"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
