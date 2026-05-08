"use client";

import { Truck } from "lucide-react";
import { ShipmentCard } from "./ShipmentCard";
import type { Shipment } from "@/types";

interface ShipmentListProps {
  shipments: Shipment[];
  onDetail: (id: string) => void;
  isLoading: boolean;
}

function ShipmentListSkeleton() {
  return (
    <div className="flex flex-col gap-3 px-4 py-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="animate-pulse rounded-xl border border-slate-200 bg-white p-3"
        >
          <div className="mb-2 flex items-start justify-between gap-2">
            <div className="flex flex-col gap-1.5">
              <div className="h-2.5 w-16 rounded bg-slate-100" />
              <div className="h-4 w-44 rounded bg-slate-200" />
            </div>
            <div className="h-5 w-24 rounded-full bg-slate-100" />
          </div>
          <div className="mb-2.5 h-3 w-52 rounded bg-slate-100" />
          <div className="h-1.5 w-full rounded-full bg-slate-100" />
        </div>
      ))}
    </div>
  );
}

function ShipmentEmptyState({ hasFilter }: { hasFilter: boolean }) {
  return (
    <div className="mx-4 my-6 flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
        <Truck size={22} className="text-slate-400" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-slate-700">
          {hasFilter ? "Tidak ada hasil" : "Belum ada pengiriman"}
        </p>
        <p className="max-w-55 text-xs text-slate-400">
          {hasFilter
            ? "Coba ubah filter atau kata kunci pencarian."
            : "Pengiriman bahan baku yang terjadwal akan muncul di sini."}
        </p>
      </div>
    </div>
  );
}

export function ShipmentList({
  shipments,
  onDetail,
  isLoading,
}: ShipmentListProps) {
  if (isLoading) return <ShipmentListSkeleton />;

  if (shipments.length === 0) {
    return <ShipmentEmptyState hasFilter={false} />;
  }

  return (
    <div className="flex flex-col gap-3 px-4 py-3">
      {shipments.map((shipment) => (
        <ShipmentCard
          key={shipment.id}
          shipment={shipment}
          onDetail={onDetail}
        />
      ))}
    </div>
  );
}
