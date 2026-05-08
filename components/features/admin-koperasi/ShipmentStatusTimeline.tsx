import type { ShipmentLetterStatus } from "@/types";

interface Props {
  status: ShipmentLetterStatus;
}

const STEPS: ShipmentLetterStatus[] = [
  "draft",
  "waiting_pickup",
  "scheduled",
  "in_transit",
  "partial_arrived",
  "completed",
  "received_by_client",
];

const LABELS: Record<ShipmentLetterStatus, string> = {
  draft: "Draft",
  waiting_pickup: "Menunggu Pickup",
  scheduled: "Terjadwal",
  in_transit: "Di Perjalanan",
  partial_arrived: "Tiba Sebagian",
  completed: "Selesai",
  received_by_client: "Diterima Klien",
};

export function ShipmentStatusTimeline({ status }: Props) {
  const currentIdx = STEPS.indexOf(status);

  return (
    <div className="flex items-start gap-0.5 overflow-x-auto pb-1 pt-1">
      {STEPS.map((step, idx) => {
        const isPast = idx < currentIdx;
        const isCurrent = idx === currentIdx;
        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={[
                  "h-2.5 w-2.5 rounded-full shrink-0",
                  isCurrent
                    ? "bg-orange-500 ring-2 ring-orange-300 ring-offset-1"
                    : isPast
                      ? "bg-green-500"
                      : "bg-slate-200",
                ].join(" ")}
              />
              <span
                className={[
                  "whitespace-nowrap text-[9px] leading-tight max-w-12 text-center",
                  isCurrent
                    ? "text-orange-600 font-semibold"
                    : isPast
                      ? "text-green-600"
                      : "text-slate-400",
                ].join(" ")}
              >
                {LABELS[step]}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={[
                  "h-px w-5 shrink-0 -mt-3",
                  idx < currentIdx ? "bg-green-400" : "bg-slate-200",
                ].join(" ")}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
