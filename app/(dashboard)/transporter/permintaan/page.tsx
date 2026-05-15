"use client";

import {
  MapPin,
  Clock,
  Truck,
  User,
  CalendarDays,
  Package,
} from "lucide-react";
import { useTransporterRequests } from "@/hooks/useTransporterRequests";
import { TransportUpdateSheet } from "@/components/features/transporter/TransportUpdateSheet";
import { cn } from "@/lib/utils";
import type { TransportStatus } from "@/types";

const STATUS_CONFIG: Record<
  TransportStatus,
  { label: string; className: string }
> = {
  waiting_driver: {
    label: "Menunggu Driver",
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
  completed: {
    label: "Selesai",
    className: "bg-green-50 text-green-700 border-green-200",
  },
};

export default function TransporterPermintaanPage() {
  const {
    filteredRequests,
    filterDate,
    setFilterDate,
    isUpdateOpen,
    openUpdate,
    closeUpdate,
    form,
    setField,
    selectArmada,
    isValid,
    isSubmitting,
    saveUpdate,
    toastMessage,
    activeArmada,
    drivers,
  } = useTransporterRequests();

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 bg-white border-b border-gray-100">
        <h1 className="text-lg font-bold text-gray-800">
          Permintaan Transportasi
        </h1>
        <div className="mt-2">
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          {filterDate && (
            <button
              onClick={() => setFilterDate("")}
              className="ml-2 text-xs text-sky-600 underline"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 pb-24">
        {filteredRequests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <Package size={40} className="mb-3 opacity-30" />
            <p className="text-sm">Tidak ada permintaan.</p>
          </div>
        ) : (
          filteredRequests.map((req) => {
            const cfg = STATUS_CONFIG[req.status];
            const canUpdate = req.status !== "completed";
            return (
              <div
                key={req.id}
                className="bg-white rounded-xl border border-gray-100 p-4 space-y-3"
              >
                {/* Row 1: destination + status */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 min-w-0">
                    <MapPin
                      size={14}
                      className="text-sky-500 mt-0.5 shrink-0"
                    />
                    <p className="text-sm font-semibold text-gray-800 leading-snug">
                      {req.destination}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 text-xs px-2 py-0.5 rounded-full border font-medium",
                      cfg.className,
                    )}
                  >
                    {cfg.label}
                  </span>
                </div>

                {/* Row 2: date + time */}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <CalendarDays size={12} />
                    {req.deliveryDate}
                  </span>
                  {req.departureTime && (
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      Berangkat {req.departureTime}
                    </span>
                  )}
                </div>

                {/* Row 3: vehicle + driver */}
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  {req.vehicleNo ? (
                    <span className="flex items-center gap-1">
                      <Truck size={12} className="text-sky-500" />
                      {req.vehicleNo} · {req.vehicleType}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-yellow-600">
                      <Truck size={12} />
                      Kendaraan belum ditentukan
                    </span>
                  )}
                  {req.driverName ? (
                    <span className="flex items-center gap-1">
                      <User size={12} className="text-sky-500" />
                      {req.driverName}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-yellow-600">
                      <User size={12} />
                      Driver belum ditentukan
                    </span>
                  )}
                </div>

                {/* Update Button */}
                {canUpdate && (
                  <button
                    onClick={() => openUpdate(req.id)}
                    className="w-full py-2 rounded-lg bg-sky-50 text-sky-700 text-xs font-semibold border border-sky-200 hover:bg-sky-100 transition-colors"
                  >
                    Update Kendaraan & Driver
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Update Sheet */}
      <TransportUpdateSheet
        isOpen={isUpdateOpen}
        onClose={closeUpdate}
        form={form}
        setField={setField}
        selectArmada={selectArmada}
        onSave={saveUpdate}
        isValid={isValid}
        isSubmitting={isSubmitting}
        activeArmada={activeArmada}
        drivers={drivers}
      />

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-gray-800 text-white text-xs px-4 py-2 rounded-full shadow-lg whitespace-nowrap">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
