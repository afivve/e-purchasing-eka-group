"use client";

import Link from "next/link";
import {
  ScrollText,
  Truck,
  ClipboardList,
  Car,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { MOCK_SHIPMENT_LETTERS } from "@/mock/shipmentLetters";
import { MOCK_DAILY_NEEDS } from "@/mock/dailyNeeds";
import { MOCK_TRANSPORT_REQUESTS } from "@/mock/transportRequests";
import { ShipmentLetterStatusBadge } from "@/components/features/admin-koperasi/ShipmentLetterStatusBadge";
import { formatDate } from "@/lib/utils";

const TODAY = "2026-05-08";

export default function AdminKoperasiDashboard() {
  const todayNeeds = MOCK_DAILY_NEEDS.filter((n) => n.deliveryDate === TODAY);
  const todayLetters = MOCK_SHIPMENT_LETTERS.filter(
    (l) => l.deliveryDate === TODAY,
  );
  const inTransitLetters = MOCK_SHIPMENT_LETTERS.filter(
    (l) => l.status === "in_transit" || l.status === "partial_arrived",
  );
  const pendingTransport = MOCK_TRANSPORT_REQUESTS.filter(
    (t) => t.status === "waiting_driver" || t.status === "scheduled",
  );
  const alertLetters = MOCK_SHIPMENT_LETTERS.filter(
    (l) => l.status === "draft" || l.status === "waiting_pickup",
  );

  return (
    <div className="min-h-dvh bg-slate-50 px-4 pt-4 pb-6">
      {/* Page header */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          {new Date().toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-xl border border-slate-200 bg-white p-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50">
              <ClipboardList size={15} className="text-blue-600" />
            </div>
            <span className="text-xs text-slate-500">Kebutuhan Hari Ini</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">
            {todayNeeds.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50">
              <ScrollText size={15} className="text-orange-600" />
            </div>
            <span className="text-xs text-slate-500">Surat Jalan Hari Ini</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">
            {todayLetters.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50">
              <Truck size={15} className="text-indigo-600" />
            </div>
            <span className="text-xs text-slate-500">Dalam Perjalanan</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">
            {inTransitLetters.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50">
              <Car size={15} className="text-amber-600" />
            </div>
            <span className="text-xs text-slate-500">Transportasi Pending</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">
            {pendingTransport.length}
          </p>
        </div>
      </div>

      {/* Alert: draft/unscheduled */}
      {alertLetters.length > 0 && (
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-3">
          <div className="flex items-center gap-2 mb-1.5">
            <AlertCircle size={14} className="text-amber-600 shrink-0" />
            <p className="text-sm font-semibold text-amber-800">
              {alertLetters.length} surat jalan belum terjadwal
            </p>
          </div>
          <div className="space-y-1.5">
            {alertLetters.slice(0, 3).map((l) => (
              <div
                key={l.id}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-mono text-[11px] text-orange-700 font-semibold shrink-0">
                    {l.code}
                  </span>
                  <span className="text-[11px] text-amber-700 truncate">
                    {l.clientName}
                  </span>
                </div>
                <ShipmentLetterStatusBadge status={l.status} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick nav */}
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
        Menu Cepat
      </p>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          {
            href: "/admin-koperasi/kebutuhan-harian",
            label: "Kebutuhan Harian",
            icon: ClipboardList,
            color: "text-blue-600",
            bg: "bg-blue-50",
            desc: `${todayNeeds.length} hari ini`,
          },
          {
            href: "/admin-koperasi/surat-jalan",
            label: "Surat Jalan",
            icon: ScrollText,
            color: "text-orange-600",
            bg: "bg-orange-50",
            desc: `${todayLetters.length} dibuat`,
          },
          {
            href: "/admin-koperasi/pengiriman",
            label: "Pengiriman",
            icon: Truck,
            color: "text-indigo-600",
            bg: "bg-indigo-50",
            desc: `${inTransitLetters.length} berjalan`,
          },
          {
            href: "/admin-koperasi/transportasi",
            label: "Transportasi",
            icon: Car,
            color: "text-amber-600",
            bg: "bg-amber-50",
            desc: `${pendingTransport.length} pending`,
          },
        ].map(({ href, label, icon: Icon, color, bg, desc }) => (
          <Link
            key={href}
            href={href}
            className="rounded-xl border border-slate-200 bg-white p-3 hover:bg-slate-50 active:bg-slate-100"
          >
            <div
              className={`mb-2 flex h-9 w-9 items-center justify-center rounded-xl ${bg}`}
            >
              <Icon size={18} className={color} />
            </div>
            <p className="text-sm font-semibold text-slate-800">{label}</p>
            <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
          </Link>
        ))}
      </div>

      {/* Today's letters */}
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
        Surat Jalan Hari Ini
      </p>
      {todayLetters.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center text-slate-400">
          <ScrollText size={28} className="mx-auto mb-2 opacity-40" />
          <p className="text-sm">Belum ada surat jalan untuk hari ini.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {todayLetters.map((l) => (
            <div
              key={l.id}
              className="rounded-xl border border-slate-200 bg-white p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-orange-600">
                      {l.code}
                    </span>
                    <ShipmentLetterStatusBadge status={l.status} />
                  </div>
                  <p className="mt-0.5 text-sm font-medium text-slate-700 truncate">
                    {l.clientName}
                  </p>
                  <p className="text-xs text-slate-400">
                    {formatDate(l.deliveryDate)}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0 text-xs text-slate-500">
                  {l.items.filter((i) => i.isChecked).length ===
                  l.items.length ? (
                    <CheckCircle2 size={14} className="text-green-500" />
                  ) : null}
                  {l.items.filter((i) => i.isChecked).length}/{l.items.length}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
