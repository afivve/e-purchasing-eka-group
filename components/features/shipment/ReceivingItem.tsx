"use client";

import { Check, Minus, Plus, AlertTriangle, Ban } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ShipmentItem, ItemReceivingStatus } from "@/types";

interface ReceivingItemUpdate {
  receivedQty?: number;
  receivingStatus?: ItemReceivingStatus;
  receivingNote?: string;
}

interface ReceivingItemProps {
  item: ShipmentItem;
  isEditable: boolean;
  onUpdate: (update: ReceivingItemUpdate) => void;
}

export function ReceivingItem({
  item,
  isEditable,
  onUpdate,
}: ReceivingItemProps) {
  const isChecked = item.receivingStatus !== "pending";
  const isMissing = item.receivingStatus === "missing";
  const isShort = isChecked && !isMissing && item.receivedQty < item.orderedQty;

  function toggleCheck() {
    if (!isEditable) return;
    if (isChecked) {
      // Uncheck — reset to pending
      onUpdate({
        receivingStatus: "pending",
        receivedQty: item.orderedQty,
        receivingNote: "",
      });
    } else {
      // Check — default to full quantity received
      onUpdate({
        receivingStatus: "ok",
        receivedQty: item.orderedQty,
      });
    }
  }

  function handleQtyChange(raw: number) {
    const qty = Math.max(0, Math.min(item.orderedQty, raw));
    const status: ItemReceivingStatus =
      qty === 0 ? "missing" : qty < item.orderedQty ? "short" : "ok";
    onUpdate({ receivedQty: qty, receivingStatus: status });
  }

  function markMissing() {
    if (!isEditable) return;
    onUpdate({
      receivingStatus: "missing",
      receivedQty: 0,
      receivingNote: "",
    });
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-0 rounded-xl border transition-colors",
        isChecked
          ? isMissing
            ? "border-red-100 bg-red-50"
            : isShort
              ? "border-amber-100 bg-amber-50"
              : "border-teal-100 bg-teal-50"
          : "border-slate-200 bg-white",
      )}
    >
      {/* Header row: checkbox + item info + ordered qty */}
      <div className="flex items-start gap-2.5 p-3">
        {/* Large touch-friendly checkbox */}
        <button
          type="button"
          onClick={toggleCheck}
          disabled={!isEditable}
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-all",
            "mt-0.5 disabled:cursor-default",
            isChecked && !isMissing
              ? "border-teal-600 bg-teal-600"
              : isMissing
                ? "border-red-400 bg-red-50"
                : "border-slate-300 bg-white hover:border-teal-400",
          )}
          aria-label={
            isChecked ? "Batalkan penerimaan item" : "Konfirmasi item diterima"
          }
        >
          {isChecked && !isMissing && (
            <Check size={13} className="text-white" strokeWidth={2.5} />
          )}
          {isMissing && (
            <Ban size={11} className="text-red-400" strokeWidth={2} />
          )}
        </button>

        {/* Name + supplier */}
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <p className="text-sm font-semibold leading-snug text-slate-900">
            {item.ingredientName}
          </p>
          <p className="text-[11px] text-slate-500">{item.supplier}</p>
        </div>

        {/* Ordered qty */}
        <div className="shrink-0 text-right">
          <p className="text-xs font-medium tabular-nums text-slate-700">
            {item.orderedQty} {item.unit}
          </p>
          <p className="text-[10px] text-slate-400">pesanan</p>
        </div>
      </div>

      {/* Expanded: qty stepper + note (when checked & not missing) */}
      {isChecked && !isMissing && isEditable && (
        <div className="flex flex-col gap-2.5 border-t border-current/10 px-3 pb-3 pt-2.5">
          {/* Qty stepper */}
          <div className="flex items-center gap-2">
            <span className="w-20 text-[11px] font-medium text-slate-500">
              Diterima:
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleQtyChange(item.receivedQty - 1)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors active:bg-slate-100"
                aria-label="Kurangi jumlah"
              >
                <Minus size={13} />
              </button>
              <input
                type="number"
                inputMode="numeric"
                value={item.receivedQty}
                min={0}
                max={item.orderedQty}
                onChange={(e) => handleQtyChange(Number(e.target.value))}
                className="w-14 rounded-lg border border-slate-200 bg-white py-1.5 text-center text-sm font-bold tabular-nums outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
              />
              <button
                type="button"
                onClick={() => handleQtyChange(item.receivedQty + 1)}
                disabled={item.receivedQty >= item.orderedQty}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors active:bg-slate-100 disabled:opacity-40"
                aria-label="Tambah jumlah"
              >
                <Plus size={13} />
              </button>
              <span className="text-xs text-slate-500">{item.unit}</span>
            </div>
          </div>

          {/* Short indicator */}
          {isShort && (
            <div className="flex items-center gap-1.5">
              <AlertTriangle size={12} className="shrink-0 text-amber-500" />
              <span className="text-[11px] font-medium text-amber-700">
                {item.orderedQty - item.receivedQty} {item.unit} kurang dari
                pesanan
              </span>
            </div>
          )}

          {/* Note textarea */}
          <textarea
            value={item.receivingNote}
            onChange={(e) => onUpdate({ receivingNote: e.target.value })}
            placeholder="Catatan selisih (opsional: kemasan rusak, sisa stok, dll...)"
            rows={2}
            className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
          />
        </div>
      )}

      {/* Missing state info */}
      {isMissing && (
        <div className="flex items-center gap-2 border-t border-red-100 px-3 pb-2.5 pt-2">
          <Ban size={12} className="shrink-0 text-red-400" />
          <span className="flex-1 text-xs font-medium text-red-700">
            Item tidak diterima
          </span>
          {isEditable && (
            <button
              type="button"
              onClick={() =>
                onUpdate({
                  receivingStatus: "ok",
                  receivedQty: item.orderedQty,
                  receivingNote: "",
                })
              }
              className="text-[11px] text-slate-500 underline"
            >
              batalkan
            </button>
          )}
        </div>
      )}

      {/* Mark as missing button for unchecked items (editable only) */}
      {!isChecked && isEditable && (
        <div className="border-t border-slate-100 px-3 pb-2 pt-1.5">
          <button
            type="button"
            onClick={markMissing}
            className="text-[11px] font-medium text-red-500 hover:text-red-600"
          >
            Tandai Tidak Datang
          </button>
        </div>
      )}

      {/* Read-only note display (when not editable and note exists) */}
      {!isEditable && item.receivingNote && (
        <div className="border-t border-current/10 px-3 pb-2.5 pt-2">
          <p className="text-[11px] italic text-slate-500">
            "{item.receivingNote}"
          </p>
        </div>
      )}
    </div>
  );
}
