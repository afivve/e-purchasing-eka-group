"use client";

import { CheckCircle2 } from "lucide-react";
import { ReceivingItem } from "./ReceivingItem";
import { ShipmentProgress } from "./ShipmentProgress";
import type { Shipment, ItemReceivingStatus } from "@/types";

interface ReceivingItemUpdate {
  receivedQty?: number;
  receivingStatus?: ItemReceivingStatus;
  receivingNote?: string;
}

interface ReceivingChecklistProps {
  shipment: Shipment;
  isEditable: boolean;
  onUpdateItem: (itemId: string, update: ReceivingItemUpdate) => void;
}

export function ReceivingChecklist({
  shipment,
  isEditable,
  onUpdateItem,
}: ReceivingChecklistProps) {
  const total = shipment.items.length;
  const checked = shipment.items.filter(
    (i) => i.receivingStatus !== "pending",
  ).length;
  const allChecked = checked === total;

  return (
    <div className="flex flex-col gap-3">
      {/* Progress header */}
      <div className="flex flex-col gap-1.5 rounded-xl border border-slate-200 bg-white p-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-slate-700">
            Checklist Penerimaan
          </span>
          <span className="text-[11px] font-bold tabular-nums text-slate-600">
            {checked} / {total}
          </span>
        </div>
        <ShipmentProgress items={shipment.items} />
      </div>

      {/* Success state */}
      {allChecked && (
        <div className="flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
          <CheckCircle2
            size={18}
            className="mt-0.5 shrink-0 text-emerald-600"
          />
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-bold text-emerald-800">
              Penerimaan Selesai
            </p>
            <p className="text-xs text-emerald-700">
              Semua item telah diperiksa. Tekan "Selesaikan Penerimaan" untuk
              mengkonfirmasi.
            </p>
          </div>
        </div>
      )}

      {/* Items */}
      <div className="flex flex-col gap-2">
        {shipment.items.map((item) => (
          <ReceivingItem
            key={item.id}
            item={item}
            isEditable={isEditable}
            onUpdate={(update) => onUpdateItem(item.id, update)}
          />
        ))}
      </div>
    </div>
  );
}
