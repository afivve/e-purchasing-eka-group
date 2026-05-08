import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { MOCK_CLIENTS } from "@/mock/clients";
import { MOCK_APP_USERS } from "@/mock/appUsers";
import { ClientDetailView } from "@/components/features/manager/ClientDetailView";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ClientDetailPage({ params }: Props) {
  const { id } = await params;
  const client = MOCK_CLIENTS.find((c) => c.id === id);
  if (!client) notFound();

  const kepalaSppiUser = client.kepalaSppiId
    ? MOCK_APP_USERS.find((u) => u.id === client.kepalaSppiId)
    : undefined;

  const ahliGiziUser = client.ahliGiziId
    ? MOCK_APP_USERS.find((u) => u.id === client.ahliGiziId)
    : undefined;

  return (
    <div className="flex flex-col">
      {/* Sticky sub-header */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-4 pt-3 pb-3">
        <div className="flex items-center gap-3">
          <Link
            href="/manajer-koperasi/client"
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-slate-100 active:scale-95 transition-transform"
          >
            <ArrowLeft className="h-4 w-4 text-slate-600" />
          </Link>
          <div className="min-w-0">
            <h1 className="text-base font-bold text-slate-800 truncate">
              {client.name}
            </h1>
            <p className="text-xs text-slate-500">Detail Client</p>
          </div>
          <span
            className={
              client.operationalStatus === "active"
                ? "ml-auto inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "ml-auto inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium bg-slate-100 text-slate-500 border border-slate-200"
            }
          >
            {client.operationalStatus === "active" ? "Aktif" : "Nonaktif"}
          </span>
        </div>
      </div>

      <div className="py-4">
        <ClientDetailView
          client={client}
          kepalaSppiUser={kepalaSppiUser}
          ahliGiziUser={ahliGiziUser}
        />
      </div>
    </div>
  );
}
