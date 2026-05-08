"use client";

import { X, Download, FileText } from "lucide-react";
import type { DailyNeed } from "@/types";
import { formatDate } from "@/lib/utils";

interface Props {
  needs: DailyNeed[];
  dateFilter: string;
  onClose: () => void;
}

export function ExportNeedsPreview({ needs, dateFilter, onClose }: Props) {
  const title =
    dateFilter === "all"
      ? "Semua Kebutuhan Harian"
      : `Kebutuhan Harian — ${formatDate(dateFilter)}`;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/60" onClick={onClose} />

      <div className="fixed inset-x-4 top-8 bottom-4 z-50 flex flex-col rounded-2xl bg-white shadow-xl md:inset-x-auto md:left-1/2 md:w-full md:max-w-2xl md:-translate-x-1/2">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <h2 className="text-sm font-bold text-slate-700">Preview Export</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert("Fitur export Excel akan tersedia.")}
              className="flex items-center gap-1.5 h-8 rounded-lg bg-green-600 px-3 text-xs font-semibold text-white hover:bg-green-700"
            >
              <FileText size={12} />
              Excel
            </button>
            <button
              onClick={() => alert("Fitur export PDF akan tersedia.")}
              className="flex items-center gap-1.5 h-8 rounded-lg bg-red-600 px-3 text-xs font-semibold text-white hover:bg-red-700"
            >
              <Download size={12} />
              PDF
            </button>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-4">
            <h1 className="text-base font-bold text-slate-800">{title}</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {needs.length} kebutuhan — diekspor{" "}
              {new Date().toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="space-y-4">
            {needs.map((need) => (
              <div
                key={need.id}
                className="rounded-xl border border-slate-200 overflow-hidden"
              >
                {/* Card header */}
                <div className="bg-orange-50 border-b border-orange-100 px-3 py-2">
                  <p className="font-semibold text-sm text-orange-800">
                    {need.clientName}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-orange-600">
                    <span>{need.menuName}</span>
                    <span>•</span>
                    <span>{formatDate(need.deliveryDate)}</span>
                    <span>•</span>
                    <span>{need.portionCount} porsi</span>
                  </div>
                </div>

                {/* Items table */}
                <table className="w-full text-xs">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-3 py-1.5 text-left text-slate-500 font-medium w-6">
                        No
                      </th>
                      <th className="px-3 py-1.5 text-left text-slate-500 font-medium">
                        Bahan
                      </th>
                      <th className="px-3 py-1.5 text-right text-slate-500 font-medium w-14">
                        Jumlah
                      </th>
                      <th className="px-3 py-1.5 text-left text-slate-500 font-medium w-12">
                        Satuan
                      </th>
                      <th className="px-3 py-1.5 text-left text-slate-500 font-medium hidden sm:table-cell">
                        Supplier
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {need.ingredients.map((ing, idx) => (
                      <tr
                        key={ing.ingredientId}
                        className={idx % 2 === 1 ? "bg-slate-50" : ""}
                      >
                        <td className="px-3 py-1.5 text-center text-slate-400">
                          {idx + 1}
                        </td>
                        <td className="px-3 py-1.5 font-medium text-slate-700">
                          {ing.ingredientName}
                        </td>
                        <td className="px-3 py-1.5 text-right text-slate-700">
                          {ing.quantity}
                        </td>
                        <td className="px-3 py-1.5 text-slate-500">
                          {ing.unit}
                        </td>
                        <td className="px-3 py-1.5 text-slate-400 hidden sm:table-cell">
                          {ing.supplierName ?? "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}

            {needs.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <p className="text-sm">Tidak ada data untuk diekspor.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
