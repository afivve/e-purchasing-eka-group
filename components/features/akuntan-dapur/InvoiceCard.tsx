"use client";

import { FileText, CalendarClock, StickyNote } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IncomingInvoice, InvoicePaymentStatus } from "@/types";

const PAYMENT_STATUS_CONFIG: Record<
  InvoicePaymentStatus,
  { label: string; className: string }
> = {
  unpaid: {
    label: "Belum Dibayar",
    className: "bg-red-50 text-red-700 border border-red-200",
  },
  partial: {
    label: "Dibayar Sebagian",
    className: "bg-amber-50 text-amber-700 border border-amber-200",
  },
  paid: {
    label: "Lunas",
    className: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  },
};

function formatRp(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

interface InvoiceCardProps {
  invoice: IncomingInvoice;
  onClick: (id: string) => void;
}

export function InvoiceCard({ invoice, onClick }: InvoiceCardProps) {
  const { label: statusLabel, className: statusClass } =
    PAYMENT_STATUS_CONFIG[invoice.paymentStatus];
  const remaining = invoice.totalAmount - invoice.paidAmount;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick(invoice.id)}
      onKeyDown={(e) => e.key === "Enter" && onClick(invoice.id)}
      className={cn(
        "rounded-xl border bg-white p-3 cursor-pointer active:bg-slate-50 transition-colors",
        invoice.paymentStatus === "unpaid"
          ? "border-red-200"
          : invoice.paymentStatus === "partial"
            ? "border-amber-200"
            : "border-slate-200",
      )}
    >
      {/* Row 1: invoice no + status */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            Invoice
          </span>
          <span className="text-sm font-bold text-slate-900 leading-snug">
            {invoice.invoiceNo}
          </span>
        </div>
        <span
          className={cn(
            "mt-0.5 inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[11px] font-medium",
            statusClass,
          )}
        >
          {statusLabel}
        </span>
      </div>

      {/* Row 2: supplier name */}
      <div className="mt-1.5 flex items-center gap-1">
        <FileText size={11} className="shrink-0 text-slate-400" />
        <span className="truncate text-xs text-slate-600">
          {invoice.supplierName}
        </span>
      </div>

      {/* Row 3: dates + SJ ref */}
      <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-slate-500">
        <div>
          <span className="text-slate-400">Tgl Invoice: </span>
          <span className="font-medium text-slate-600">
            {invoice.invoiceDate}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <CalendarClock size={10} className="shrink-0 text-slate-400" />
          <span className="text-slate-400">Jatuh Tempo: </span>
          <span className="font-medium text-slate-600">{invoice.dueDate}</span>
        </div>
        {invoice.suratJalanNo && (
          <div>
            <span className="text-slate-400">Ref SJ: </span>
            <span className="font-medium text-slate-600 font-mono">
              {invoice.suratJalanNo}
            </span>
          </div>
        )}
        <div>
          <span className="text-slate-400">Item: </span>
          <span className="font-medium text-slate-600">
            {invoice.items.length} item
          </span>
        </div>
      </div>

      {/* Row 4: amount */}
      <div className="mt-2.5 flex items-center justify-between gap-2 rounded-lg bg-slate-50 px-3 py-2">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] text-slate-400">Total</span>
          <span className="text-sm font-bold tabular-nums text-slate-900">
            {formatRp(invoice.totalAmount)}
          </span>
        </div>
        {invoice.paymentStatus !== "paid" && (
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-[10px] text-slate-400">Sisa</span>
            <span className="text-sm font-bold tabular-nums text-red-700">
              {formatRp(remaining)}
            </span>
          </div>
        )}
      </div>

      {/* Note */}
      {invoice.note && (
        <div className="mt-2 flex items-start gap-1.5">
          <StickyNote size={11} className="mt-0.5 shrink-0 text-amber-400" />
          <p className="text-[11px] text-amber-700">{invoice.note}</p>
        </div>
      )}
    </div>
  );
}
