"use client";

import { X, Printer, Download } from "lucide-react";
import type { ShipmentLetter } from "@/types";
import { formatDate } from "@/lib/utils";

interface Props {
  letter: ShipmentLetter | null;
  onClose: () => void;
}

export function ShipmentPreview({ letter, onClose }: Props) {
  if (!letter) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 bg-black/60" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-x-4 top-8 bottom-4 z-50 flex flex-col rounded-2xl bg-white shadow-xl md:inset-x-auto md:left-1/2 md:w-full md:max-w-lg md:-translate-x-1/2">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <h2 className="text-sm font-bold text-slate-700">
            Preview Surat Jalan
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200"
            >
              <Printer size={15} />
            </button>
            <button
              onClick={() => alert("Fitur download PDF akan tersedia.")}
              className="flex items-center gap-1.5 h-8 rounded-lg bg-orange-600 px-3 text-xs font-semibold text-white hover:bg-orange-700"
            >
              <Download size={13} />
              Export
            </button>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Preview content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 text-slate-800">
            {/* Kop */}
            <div className="border-b-2 border-slate-800 pb-3 mb-4 text-center">
              <h1 className="text-lg font-extrabold tracking-wide uppercase">
                Koperasi Eka Group
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Jl. Industri No. 1, Cibubur, Jakarta Timur 13720
              </p>
              <h2 className="mt-2 text-base font-bold tracking-wider uppercase">
                Surat Jalan
              </h2>
            </div>

            {/* Detail header */}
            <div className="mb-4 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
              <div>
                <span className="text-slate-500">Nomor</span>
                <p className="font-semibold font-mono">{letter.code}</p>
              </div>
              <div>
                <span className="text-slate-500">Tanggal</span>
                <p className="font-semibold">
                  {formatDate(letter.deliveryDate)}
                </p>
              </div>
              <div>
                <span className="text-slate-500">Kepada</span>
                <p className="font-semibold">{letter.clientName}</p>
              </div>
              <div>
                <span className="text-slate-500">Menu</span>
                <p className="font-semibold">{letter.menuName}</p>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500">Alamat</span>
                <p className="font-semibold">{letter.clientAddress}</p>
              </div>
              {letter.driverName && (
                <div>
                  <span className="text-slate-500">Driver</span>
                  <p className="font-semibold">{letter.driverName}</p>
                </div>
              )}
              {letter.vehicleNo && (
                <div>
                  <span className="text-slate-500">Kendaraan</span>
                  <p className="font-semibold font-mono">{letter.vehicleNo}</p>
                </div>
              )}
            </div>

            {/* Items table */}
            <table className="w-full text-xs border border-slate-300 rounded-lg overflow-hidden">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-200 px-2 py-1.5 text-left w-6">
                    No
                  </th>
                  <th className="border border-slate-200 px-2 py-1.5 text-left">
                    Nama Bahan
                  </th>
                  <th className="border border-slate-200 px-2 py-1.5 text-right w-14">
                    Jumlah
                  </th>
                  <th className="border border-slate-200 px-2 py-1.5 text-left w-12">
                    Satuan
                  </th>
                  <th className="border border-slate-200 px-2 py-1.5 text-left">
                    Supplier
                  </th>
                </tr>
              </thead>
              <tbody>
                {letter.items.map((item, idx) => (
                  <tr
                    key={item.id}
                    className={idx % 2 === 1 ? "bg-slate-50" : ""}
                  >
                    <td className="border border-slate-200 px-2 py-1.5 text-center">
                      {idx + 1}
                    </td>
                    <td className="border border-slate-200 px-2 py-1.5">
                      {item.ingredientName}
                    </td>
                    <td className="border border-slate-200 px-2 py-1.5 text-right">
                      {item.quantity}
                    </td>
                    <td className="border border-slate-200 px-2 py-1.5">
                      {item.unit}
                    </td>
                    <td className="border border-slate-200 px-2 py-1.5 text-slate-500">
                      {item.supplierName ?? "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Notes */}
            {letter.note && (
              <div className="mt-3 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-800">
                <span className="font-semibold">Catatan: </span>
                {letter.note}
              </div>
            )}

            {/* Sign off */}
            <div className="mt-6 grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-slate-500">Dibuat oleh,</p>
                <div className="mt-12 border-t border-slate-400 pt-1">
                  <p className="font-semibold">Admin Koperasi</p>
                </div>
              </div>
              <div>
                <p className="text-slate-500">Diterima oleh,</p>
                <div className="mt-12 border-t border-slate-400 pt-1">
                  <p className="font-semibold">Penerima</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
