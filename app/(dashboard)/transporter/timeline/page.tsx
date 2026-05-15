"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Truck } from "lucide-react";
import { MOCK_TRANSPORT_REQUESTS } from "@/mock/transportRequests";
import { MOCK_ARMADA } from "@/mock/armada";
import { cn } from "@/lib/utils";
import type { TransportStatus } from "@/types";

const STATUS_COLOR: Record<TransportStatus, string> = {
  waiting_driver: "bg-yellow-400",
  scheduled: "bg-blue-500",
  in_transit: "bg-indigo-500",
  completed: "bg-green-500",
};

const STATUS_LABEL: Record<TransportStatus, string> = {
  waiting_driver: "Menunggu",
  scheduled: "Terjadwal",
  in_transit: "Di Jalan",
  completed: "Selesai",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("id-ID", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function addDays(dateStr: string, days: number) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export default function TransporterTimelinePage() {
  const [startDate, setStartDate] = useState<string>(todayStr());
  const DAYS = 5;

  const dates = useMemo(
    () => Array.from({ length: DAYS }, (_, i) => addDays(startDate, i)),
    [startDate],
  );

  // Group requests by vehicleNo + date
  const requestsByVehicle = useMemo(() => {
    const map = new Map<string, typeof MOCK_TRANSPORT_REQUESTS>();
    for (const req of MOCK_TRANSPORT_REQUESTS) {
      const key = req.vehicleNo || "Belum Ditentukan";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(req);
    }
    return map;
  }, []);

  // All unique vehicles in timeline (active armada + any assigned vehicles)
  const lanes = useMemo(() => {
    const vehicleSet = new Set<string>();
    MOCK_ARMADA.filter((a) => a.isActive).forEach((a) =>
      vehicleSet.add(a.platNo),
    );
    MOCK_TRANSPORT_REQUESTS.forEach((r) => {
      if (r.vehicleNo) vehicleSet.add(r.vehicleNo);
    });
    return Array.from(vehicleSet).map((platNo) => {
      const armada = MOCK_ARMADA.find((a) => a.platNo === platNo);
      return {
        platNo,
        label: armada ? `${armada.merk || ""} ${armada.jenis}`.trim() : "",
      };
    });
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 bg-white border-b border-gray-100">
        <h1 className="text-lg font-bold text-gray-800">Timeline Armada</h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Jadwal pengiriman per unit kendaraan
        </p>

        {/* Date navigation */}
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={() => setStartDate((d) => addDays(d, -DAYS))}
            className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
            aria-label="Sebelumnya"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex-1 flex overflow-x-auto gap-1 no-scrollbar">
            {dates.map((d) => (
              <div key={d} className="flex-1 min-w-0 text-center">
                <p className="text-xs text-gray-500 whitespace-nowrap truncate">
                  {formatDate(d)}
                </p>
              </div>
            ))}
          </div>
          <button
            onClick={() => setStartDate((d) => addDays(d, DAYS))}
            className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
            aria-label="Selanjutnya"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="px-4 py-2 flex gap-3 flex-wrap bg-gray-50 border-b border-gray-100">
        {(Object.entries(STATUS_COLOR) as [TransportStatus, string][]).map(
          ([status, color]) => (
            <span
              key={status}
              className="flex items-center gap-1 text-xs text-gray-600"
            >
              <span className={cn("w-2.5 h-2.5 rounded-full", color)} />
              {STATUS_LABEL[status]}
            </span>
          ),
        )}
      </div>

      {/* Timeline grid */}
      <div className="flex-1 overflow-y-auto pb-6">
        {lanes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <Truck size={40} className="mb-3 opacity-30" />
            <p className="text-sm">Tidak ada armada terdaftar.</p>
          </div>
        ) : (
          lanes.map((lane) => {
            const laneReqs = requestsByVehicle.get(lane.platNo) ?? [];
            return (
              <div
                key={lane.platNo}
                className="border-b border-gray-100 last:border-b-0"
              >
                {/* Lane header */}
                <div className="flex items-center gap-2 px-4 py-2 bg-white sticky top-0 z-10 border-b border-gray-50">
                  <Truck size={14} className="text-sky-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-gray-800">
                      {lane.platNo}
                    </p>
                    {lane.label && (
                      <p className="text-xs text-gray-400">{lane.label}</p>
                    )}
                  </div>
                </div>

                {/* Date cells */}
                <div className="flex">
                  {dates.map((date) => {
                    const dayReqs = laneReqs.filter(
                      (r) => r.deliveryDate === date,
                    );
                    return (
                      <div
                        key={date}
                        className="flex-1 min-h-16 border-r border-gray-100 last:border-r-0 p-1 space-y-1"
                      >
                        {dayReqs.length === 0 ? (
                          <div className="h-full min-h-14 rounded-lg bg-gray-50" />
                        ) : (
                          dayReqs.map((req) => (
                            <div
                              key={req.id}
                              className={cn(
                                "rounded-lg px-2 py-1.5 text-white",
                                STATUS_COLOR[req.status],
                              )}
                            >
                              <p className="text-xs font-semibold leading-tight truncate">
                                {req.destination}
                              </p>
                              {req.departureTime && (
                                <p className="text-xs opacity-80 mt-0.5">
                                  {req.departureTime}
                                </p>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
