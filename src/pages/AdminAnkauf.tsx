import { useState } from "react";
import { Search, ChevronDown, Mail, Phone, Package } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { useAnkauf } from "@/context/AnkaufContext";
import type { AnkaufStatus } from "@/types/business";

// ─── Status-Konfiguration ──────────────────────────────────────
const STATUS_CONFIG: Record<AnkaufStatus, { label: string; className: string; next?: AnkaufStatus }> = {
  pending:        { label: "Neu",               className: "bg-blue-100 text-blue-700",    next: "label_sent" },
  label_sent:     { label: "Label gesendet",    className: "bg-purple-100 text-purple-700", next: "received" },
  received:       { label: "Eingegangen",       className: "bg-yellow-100 text-yellow-700", next: "in_inspection" },
  in_inspection:  { label: "In Prüfung",        className: "bg-orange-100 text-orange-700", next: "offer_made" },
  offer_made:     { label: "Angebot gemacht",   className: "bg-indigo-100 text-indigo-700", next: "offer_accepted" },
  offer_accepted: { label: "Angenommen",        className: "bg-green-100 text-green-700",   next: "payout_pending" },
  offer_rejected: { label: "Abgelehnt",         className: "bg-red-100 text-red-700",       next: "returned" },
  payout_pending: { label: "Auszahlung",        className: "bg-teal-100 text-teal-700",     next: "completed" },
  completed:      { label: "Abgeschlossen",     className: "bg-green-100 text-green-800" },
  returned:       { label: "Zurückgesendet",    className: "bg-gray-100 text-gray-700" },
};

const ALL_STATUSES = Object.keys(STATUS_CONFIG) as AnkaufStatus[];

function StatusBadge({ status }: { status: AnkaufStatus }) {
  const c = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${c.className}`}>
      {c.label}
    </span>
  );
}

// ─── Haupt-Komponente ──────────────────────────────────────────
export default function AdminAnkauf() {
  const { requests, updateStatus } = useAnkauf();
  const [filterStatus, setFilterStatus] = useState<AnkaufStatus | "alle">("alle");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [noteInputs, setNoteInputs] = useState<Record<string, string>>({});

  const filtered = requests.filter((r) => {
    const matchStatus = filterStatus === "alle" || r.status === filterStatus;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      r.id.toLowerCase().includes(q) ||
      r.sellerName.toLowerCase().includes(q) ||
      r.deviceModel.toLowerCase().includes(q) ||
      r.sellerEmail.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const pendingCount = requests.filter((r) =>
    ["pending", "received", "in_inspection", "offer_made", "payout_pending"].includes(r.status)
  ).length;

  return (
    <AdminLayout
      title="Ankauf-Anfragen"
      subtitle={`${requests.length} Anfragen gesamt · ${pendingCount} offen`}
    >
      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-foreground/20"
            placeholder="Suche nach ID, Name, Modell, E-Mail..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as AnkaufStatus | "alle")}
        >
          <option value="alle">Alle Status</option>
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
          ))}
        </select>
      </div>

      {/* Anfragen-Liste */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">Keine Anfragen gefunden.</div>
        )}
        {filtered.map((req) => {
          const isExpanded = expandedId === req.id;
          const cfg = STATUS_CONFIG[req.status];
          const nextStatus = cfg.next;

          return (
            <div key={req.id} className="bg-card border border-border rounded-xl overflow-hidden">
              {/* Hauptzeile */}
              <button
                className="w-full text-left p-4 flex items-center gap-4 hover:bg-secondary/30 transition-colors"
                onClick={() => setExpandedId(isExpanded ? null : req.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono text-muted-foreground">{req.id}</span>
                    <StatusBadge status={req.status} />
                  </div>
                  <p className="text-sm font-semibold text-foreground mt-0.5">
                    {req.sellerName} — {req.deviceModel} ({req.deviceStorage})
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {req.deviceCondition}
                    {req.deviceDefects.length > 0 && ` · Mängel: ${req.deviceDefects.length}`}
                    {" · "}Angeboten: {req.quotedPrice} €
                    {req.finalPrice && req.finalPrice !== req.quotedPrice && ` → Final: ${req.finalPrice} €`}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-foreground">{req.finalPrice ?? req.quotedPrice} €</p>
                  <p className="text-xs text-muted-foreground">
                    {req.createdAt.toLocaleDateString("de-DE")}
                  </p>
                </div>
                <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
              </button>

              {/* Detail-Ansicht */}
              {isExpanded && (
                <div className="border-t border-border p-4 bg-secondary/20 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    {/* Verkäufer */}
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Verkäufer</p>
                      <div className="space-y-1">
                        <p className="font-medium text-foreground">{req.sellerName}</p>
                        <a href={`mailto:${req.sellerEmail}`} className="flex items-center gap-1.5 text-accent hover:underline text-xs">
                          <Mail className="w-3 h-3" />{req.sellerEmail}
                        </a>
                        <a href={`tel:${req.sellerPhone}`} className="flex items-center gap-1.5 text-accent hover:underline text-xs">
                          <Phone className="w-3 h-3" />{req.sellerPhone}
                        </a>
                      </div>
                    </div>

                    {/* Gerät */}
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Gerät</p>
                      <div className="space-y-1 text-xs">
                        <p><span className="text-muted-foreground">Modell:</span> <span className="font-medium">{req.deviceModel} {req.deviceStorage}</span></p>
                        <p><span className="text-muted-foreground">Zustand:</span> <span className="font-medium">{req.deviceCondition}</span></p>
                        {req.deviceDefects.length > 0 && (
                          <p><span className="text-muted-foreground">Mängel:</span> <span className="font-medium">{req.deviceDefects.join(", ")}</span></p>
                        )}
                      </div>
                    </div>

                    {/* Preise & Zahlung */}
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Preise & Zahlung</p>
                      <div className="space-y-1 text-xs">
                        <p><span className="text-muted-foreground">Angeboten:</span> <span className="font-medium">{req.quotedPrice} €</span></p>
                        {req.finalPrice && (
                          <p><span className="text-muted-foreground">Final:</span> <span className="font-semibold text-foreground">{req.finalPrice} €</span></p>
                        )}
                        <p><span className="text-muted-foreground">Auszahlung:</span> <span className="font-medium">{req.payoutMethod === "paypal" ? `PayPal (${req.paypalEmail})` : `Bank (${req.iban ?? "IBAN fehlt"})`}</span></p>
                      </div>
                    </div>

                    {/* Tracking */}
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Tracking</p>
                      <div className="space-y-1 text-xs">
                        {req.trackingCode ? (
                          <p><span className="text-muted-foreground">Code:</span> <span className="font-mono font-medium">{req.trackingCode}</span></p>
                        ) : (
                          <p className="text-muted-foreground">Kein Tracking-Code</p>
                        )}
                        {req.labelSentAt && <p><span className="text-muted-foreground">Label gesendet:</span> {req.labelSentAt.toLocaleDateString("de-DE")}</p>}
                        {req.receivedAt && <p><span className="text-muted-foreground">Eingegangen:</span> {req.receivedAt.toLocaleDateString("de-DE")}</p>}
                        {req.completedAt && <p><span className="text-muted-foreground">Abgeschlossen:</span> {req.completedAt.toLocaleDateString("de-DE")}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Admin-Notizen */}
                  {req.adminNotes && (
                    <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                      <p className="text-xs font-semibold text-yellow-800 mb-1">Interne Notiz</p>
                      <p className="text-xs text-yellow-700">{req.adminNotes}</p>
                    </div>
                  )}

                  {/* Aktionen */}
                  <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-border">
                    <input
                      className="flex-1 px-3 py-2 text-xs border border-border rounded-lg bg-background focus:outline-none"
                      placeholder="Interne Notiz hinzufügen..."
                      value={noteInputs[req.id] ?? ""}
                      onChange={(e) => setNoteInputs((prev) => ({ ...prev, [req.id]: e.target.value }))}
                    />
                    {nextStatus && (
                      <button
                        onClick={() => {
                          updateStatus(req.id, nextStatus, noteInputs[req.id] || undefined);
                          setNoteInputs((prev) => ({ ...prev, [req.id]: "" }));
                        }}
                        className="px-4 py-2 bg-foreground text-background text-xs font-semibold rounded-lg hover:bg-foreground/90 transition-colors whitespace-nowrap"
                      >
                        → {STATUS_CONFIG[nextStatus].label}
                      </button>
                    )}
                    {req.status === "in_inspection" && (
                      <button
                        onClick={() => updateStatus(req.id, "offer_rejected", noteInputs[req.id] || undefined)}
                        className="px-4 py-2 border border-red-300 text-red-700 text-xs font-semibold rounded-lg hover:bg-red-50 transition-colors"
                      >
                        Ablehnen
                      </button>
                    )}
                  </div>

                  {/* Versand-Paket-Hinweis wenn kein Tracking */}
                  {req.status === "pending" && (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-50 border border-blue-200">
                      <Package className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                      <p className="text-xs text-blue-700">
                        Nächster Schritt: Kostenloses Versandlabel per E-Mail zusenden, dann Status auf "Label gesendet" setzen.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AdminLayout>
  );
}
