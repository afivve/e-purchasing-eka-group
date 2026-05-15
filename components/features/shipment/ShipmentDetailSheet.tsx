"use client";

import { useEffect } from "react";
import { X, MapPin, Truck, FileText, Package } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { ShipmentStatusBadge } from "./ShipmentStatusBadge";
import { ReceivingChecklist } from "./ReceivingChecklist";
import type { Shipment, ItemReceivingStatus } from "@/types";

interface ReceivingItemUpdate {
  receivedQty?: number;
  receivingStatus?: ItemReceivingStatus;
  receivingNote?: string;
}

interface ShipmentDetailSheetProps {
  open: boolean;
  shipment: Shipment | null;
  onClose: () => void;
  onUpdateItem: (
    shipmentId: string,
    itemId: string,
    update: ReceivingItemUpdate,
  ) => void;
  onConfirmReceiving: (shipmentId: string) => void;
}

/** States where admin can interactively check items */
const EDITABLE_STATES = new Set(["delivered"]);

export function ShipmentDetailSheet({
  open,
  shipment,
  onClose,
  onUpdateItem,
  onConfirmReceiving,
}: ShipmentDetailSheetProps) {
  const isEditable = shipment ? EDITABLE_STATES.has(shipment.status) : false;
  const isCheckedState = shipment?.status === "checked";

  const allChecked =
    shipment != null &&
    shipment.items.every((i) => i.receivingStatus !== "pending");

  // Trap body scroll when sheet is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function handleConfirm() {
    if (!shipment) return;
    onConfirmReceiving(shipment.id);
    onClose();
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-2xl bg-white",
          "max-h-[92dvh] transition-transform duration-300 ease-in-out",
          open ? "translate-y-0" : "translate-y-full",
        )}
      >
        {shipment && (
          <>
            {/* Drag handle */}
            <div className="flex shrink-0 justify-center pb-1 pt-3">
              <div className="h-1 w-10 rounded-full bg-slate-300" />
            </div>

            {/* Sheet header */}
            <div className="flex shrink-0 items-start justify-between gap-2 border-b border-slate-100 px-4 py-3">
              <div className="flex min-w-0 flex-col gap-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-base font-bold text-slate-900">
                    {shipment.suratJalanNo}
                  </span>
                  <ShipmentStatusBadge status={shipment.status} />
                </div>
                <p className="text-xs text-slate-500">{shipment.clientName}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100"
                aria-label="Tutup detail"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 pt-4 pb-3">
              <div className="flex flex-col gap-4">
                {/* Info strip */}
                <div className="rounded-xl border border-slate-200 bg-slate-50 divide-y divide-slate-100">
                  {/* Date */}
                  <div className="flex items-center gap-2.5 px-3 py-2.5">
                    <Package size={14} className="shrink-0 text-slate-400" />
                    <span className="text-xs text-slate-500">
                      Tanggal kirim
                    </span>
                    <span className="ml-auto text-xs font-medium text-slate-700 text-right">
                      {formatDate(shipment.deliveryDate)} ·{" "}
                      {shipment.scheduledTime}
                    </span>
                  </div>

                  {/* Driver + vehicle */}
                  <div className="flex items-center gap-2.5 px-3 py-2.5">
                    <Truck size={14} className="shrink-0 text-slate-400" />
                    <span className="text-xs text-slate-500">Driver</span>
                    <span className="ml-auto text-xs font-medium text-slate-700">
                      {shipment.driverName} · {shipment.vehicleNo}
                    </span>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-2.5 px-3 py-2.5">
                    <MapPin
                      size={14}
                      className="mt-0.5 shrink-0 text-slate-400"
                    />
                    <span className="text-xs text-slate-500 shrink-0">
                      Tujuan
                    </span>
                    <span className="ml-auto text-xs font-medium text-slate-700 text-right leading-relaxed max-w-52">
                      {shipment.clientAddress}
                    </span>
                  </div>

                  {/* Delivery note (if any) */}
                  {shipment.deliveryNote && (
                    <div className="flex items-start gap-2.5 px-3 py-2.5">
                      <FileText
                        size={14}
                        className="mt-0.5 shrink-0 text-slate-400"
                      />
                      <span className="text-xs text-slate-500 shrink-0">
                        Catatan
                      </span>
                      <span className="ml-auto text-xs text-amber-700 text-right leading-relaxed max-w-52">
                        {shipment.deliveryNote}
                      </span>
                    </div>
                  )}
                </div>

                {/* Checklist section — for delivered, partial, checked */}
                {(isEditable || isCheckedState) && (
                  <ReceivingChecklist
                    shipment={shipment}
                    isEditable={isEditable}
                    onUpdateItem={(itemId, update) =>
                      onUpdateItem(shipment.id, itemId, update)
                    }
                  />
                )}

                {/* Read-only item list — for scheduled & in_transit */}
                {!isEditable && !isCheckedState && (
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Daftar Bahan Baku · {shipment.items.length} item
                    </p>
                    {shipment.items.map((item, idx) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-slate-100 text-[10px] font-semibold text-slate-500">
                          {idx + 1}
                        </span>
                        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                          <p className="text-sm font-medium text-slate-800">
                            {item.ingredientName}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {item.unit}
                          </p>
                        </div>
                        <span className="shrink-0 text-sm font-semibold tabular-nums text-slate-700">
                          {item.orderedQty}{" "}
                          <span className="text-xs font-normal text-slate-500">
                            {item.unit}
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sticky footer — only when editable */}
            {isEditable && (
              <div className="shrink-0 border-t border-slate-100 px-4 py-3">
                <button
                  type="button"
                  onClick={handleConfirm}
                  className={cn(
                    "flex w-full items-center justify-center rounded-xl py-3 text-sm font-bold transition-colors",
                    allChecked
                      ? "bg-emerald-600 text-white active:bg-emerald-700"
                      : "bg-teal-600 text-white active:bg-teal-700",
                  )}
                >
                  {allChecked ? "Selesaikan Penerimaan ✓" : "Simpan & Tutup"}
                </button>
              </div>
            )}

            {/* Footer for checked — read-only close */}
            {isCheckedState && (
              <div className="shrink-0 border-t border-slate-100 px-4 py-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex w-full items-center justify-center rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-600 transition-colors active:bg-slate-50"
                >
                  Tutup
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
