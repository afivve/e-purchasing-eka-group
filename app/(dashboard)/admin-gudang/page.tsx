"use client";

import Link from "next/link";
import { AlertTriangle, Package, PackageCheck } from "lucide-react";
import { MOCK_WAREHOUSE_STOCK } from "@/mock/warehouseStock";
import { MOCK_INCOMING_SHIPMENTS } from "@/mock/incomingShipments";
import IncomingShipmentCard from "@/components/features/admin-gudang/IncomingShipmentCard";
import StockStatusBadge from "@/components/features/admin-gudang/StockStatusBadge";

const TODAY = "2026-05-08";

export default function AdminGudangDashboardPage() {
  const lowItems = MOCK_WAREHOUSE_STOCK.filter((s) => s.stockStatus === "low");
  const emptyItems = MOCK_WAREHOUSE_STOCK.filter(
    (s) => s.stockStatus === "empty",
  );
  const discrepancyItems = MOCK_WAREHOUSE_STOCK.filter(
    (s) => s.stockStatus === "discrepancy",
  );
  const todayIncoming = MOCK_INCOMING_SHIPMENTS.filter(
    (s) => s.deliveryDate === TODAY,
  );
  const recentIncoming = todayIncoming.slice(0, 3);

  const statCards = [
    {
      label: "Stok Menipis",
      value: lowItems.length,
      icon: <Package size={18} className="text-amber-600" />,
      bgColor: "bg-amber-50",
      textColor: "text-amber-700",
      href: "/admin-gudang/stok-bahan-baku",
    },
    {
      label: "Stok Kosong",
      value: emptyItems.length,
      icon: <Package size={18} className="text-red-600" />,
      bgColor: "bg-red-50",
      textColor: "text-red-700",
      href: "/admin-gudang/stok-bahan-baku",
    },
    {
      label: "Barang Datang Hari Ini",
      value: todayIncoming.length,
      icon: <PackageCheck size={18} className="text-blue-600" />,
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      href: "/admin-gudang/barang-datang",
    },
    {
      label: "Selisih Stok",
      value: discrepancyItems.length,
      icon: <AlertTriangle size={18} className="text-violet-600" />,
      bgColor: "bg-violet-50",
      textColor: "text-violet-700",
      href: "/admin-gudang/stok-bahan-baku",
    },
  ];

  return (
    <div className="space-y-5 px-4 py-4">
      {/* Greeting */}
      <div>
        <h1 className="text-lg font-bold text-slate-800">
          Selamat Pagi, Admin Gudang
        </h1>
        <p className="text-xs text-slate-400">
          {TODAY} · Operasional gudang hari ini
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        {statCards.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-xl border border-slate-200 bg-white p-3 hover:bg-slate-50 transition-colors"
          >
            <div
              className={`mb-2 inline-flex size-9 items-center justify-center rounded-lg ${s.bgColor}`}
            >
              {s.icon}
            </div>
            <p className={`text-2xl font-bold ${s.textColor}`}>{s.value}</p>
            <p className="mt-0.5 text-[11px] text-slate-500 leading-tight">
              {s.label}
            </p>
          </Link>
        ))}
      </div>

      {/* Alert: empty items */}
      {emptyItems.length > 0 && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={16} className="text-red-600 shrink-0" />
            <p className="text-sm font-semibold text-red-700">
              Stok Kosong ({emptyItems.length} item)
            </p>
          </div>
          <ul className="space-y-1">
            {emptyItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between text-xs text-red-600"
              >
                <span>{item.name}</span>
                <StockStatusBadge status="empty" />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Alert: low items */}
      {lowItems.length > 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
          <div className="flex items-center gap-2 mb-2">
            <Package size={16} className="text-amber-600 shrink-0" />
            <p className="text-sm font-semibold text-amber-700">
              Stok Menipis ({lowItems.length} item)
            </p>
          </div>
          <ul className="space-y-1">
            {lowItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between text-xs text-amber-700"
              >
                <span>{item.name}</span>
                <span className="font-mono font-semibold">
                  {item.realStock} {item.unit}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Barang Datang Hari Ini */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-700">
            Barang Datang Hari Ini
          </h2>
          <Link
            href="/admin-gudang/barang-datang"
            className="text-xs font-medium text-emerald-700 hover:underline"
          >
            Lihat Semua →
          </Link>
        </div>
        {recentIncoming.length > 0 ? (
          <div className="space-y-3">
            {recentIncoming.map((s) => (
              <IncomingShipmentCard
                key={s.id}
                shipment={s}
                onPress={() => undefined}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-200 bg-white p-6 text-center">
            <PackageCheck size={28} className="mx-auto mb-2 text-slate-300" />
            <p className="text-sm text-slate-400">
              Belum ada barang datang hari ini
            </p>
          </div>
        )}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-3 pb-4">
        <Link
          href="/admin-gudang/stok-bahan-baku"
          className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition-colors"
        >
          <Package size={16} />
          Stok Bahan Baku
        </Link>
        <Link
          href="/admin-gudang/barang-datang"
          className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
        >
          <PackageCheck size={16} />
          Barang Datang
        </Link>
      </div>
    </div>
  );
}
