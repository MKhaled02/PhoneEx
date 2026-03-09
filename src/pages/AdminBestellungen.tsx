import { useState } from "react";
import { Search, ChevronDown, Truck, Mail, MapPin, ExternalLink } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { MOCK_ORDERS } from "@/data/mockBusiness";
import type { OrderStatus } from "@/types/business";

// ─── Status-Konfiguration ──────────────────────────────────────
const STATUS_CONFIG: Record<OrderStatus, { label: string; className: string; next?: OrderStatus }> = {
  pending_payment:  { label: "Zahlung ausstehend",  className: "bg-yellow-100 text-yellow-700",  next: "payment_received" },
  payment_received: { label: "Zahlung eingegangen", className: "bg-blue-100 text-blue-700",      next: "processing" },
  processing:       { label: "In Bearbeitung",      className: "bg-purple-100 text-purple-700",  next: "shipped" },
  shipped:          { label: "Versendet",            className: "bg-indigo-100 text-indigo-700",  next: "delivered" },
  delivered:        { label: "Geliefert",            className: "bg-green-100 text-green-700" },
  return_requested: { label: "Rücksendung",          className: "bg-orange-100 text-orange-700", next: "returned" },
  returned:         { label: "Zurück",               className: "bg-gray-100 text-gray-700",     next: "refunded" },
  cancelled:        { label: "Storniert",            className: "bg-red-100 text-red-700" },
  refunded:         { label: "Erstattet",            className: "bg-red-100 text-red-800" },
};

const PAYMENT_LABELS: Record<string, string> = {
  paypal: "PayPal",
  card: "Kreditkarte",
  klarna: "Klarna",
  transfer: "Überweisung",
};

function StatusBadge({ status }: { status: OrderStatus }) {
  const c = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${c.className}`}>
      {c.label}
    </span>
  );
}

// ─── Haupt-Komponente ──────────────────────────────────────────
export default function AdminBestellungen() {
  // In production: orders come from API/DB. For MVP: use mock + local state.
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "alle">("alle");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [trackingInputs, setTrackingInputs] = useState<Record<string, string>>({});

  const filtered = orders.filter((o) => {
    const matchStatus = filterStatus === "alle" || o.status === filterStatus;
    const q = search.toLowerCase();
    const fullName = `${o.shippingAddress.firstName} ${o.shippingAddress.lastName}`.toLowerCase();
    const matchSearch =
      !q ||
      o.id.toLowerCase().includes(q) ||
      fullName.includes(q) ||
      o.email.toLowerCase().includes(q) ||
      o.items.some((i) => i.productTitle.toLowerCase().includes(q));
    return matchStatus && matchSearch;
  });

  const advanceStatus = (id: string, newStatus: OrderStatus, trackingCode?: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
              ...o,
              status: newStatus,
              updatedAt: new Date(),
              ...(newStatus === "shipped" ? { shippedAt: new Date(), trackingCode: trackingCode || o.trackingCode } : {}),
              ...(newStatus === "delivered" ? { deliveredAt: new Date() } : {}),
            }
          : o
      )
    );
  };

  return (
    <AdminLayout
      title="Bestellungen"
      subtitle={`${orders.length} Bestellungen gesamt`}
    >
      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-foreground/20"
            placeholder="Suche nach ID, Name, E-Mail, Produkt..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as OrderStatus | "alle")}
        >
          <option value="alle">Alle Status</option>
          {(Object.keys(STATUS_CONFIG) as OrderStatus[]).map((s) => (
            <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
          ))}
        </select>
      </div>

      {/* Bestellungen-Liste */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">Keine Bestellungen gefunden.</div>
        )}
        {filtered.map((order) => {
          const isExpanded = expandedId === order.id;
          const cfg = STATUS_CONFIG[order.status];
          const nextStatus = cfg.next;

          return (
            <div key={order.id} className="bg-card border border-border rounded-xl overflow-hidden">
              {/* Hauptzeile */}
              <button
                className="w-full text-left p-4 flex items-center gap-4 hover:bg-secondary/30 transition-colors"
                onClick={() => setExpandedId(isExpanded ? null : order.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono text-muted-foreground">{order.id}</span>
                    <StatusBadge status={order.status} />
                    <span className="text-xs text-muted-foreground">{PAYMENT_LABELS[order.paymentMethod]}</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground mt-0.5">
                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {order.items.map((i) => `${i.productTitle} (×${i.qty})`).join(", ")}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-foreground">{order.total} €</p>
                  <p className="text-xs text-muted-foreground">
                    {order.createdAt.toLocaleDateString("de-DE")}
                  </p>
                </div>
                <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
              </button>

              {/* Detail-Ansicht */}
              {isExpanded && (
                <div className="border-t border-border p-4 bg-secondary/20 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    {/* Kunde */}
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Kunde</p>
                      <div className="space-y-1 text-xs">
                        <p className="font-medium text-foreground">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                        <a href={`mailto:${order.email}`} className="flex items-center gap-1.5 text-accent hover:underline">
                          <Mail className="w-3 h-3" />{order.email}
                        </a>
                      </div>
                    </div>

                    {/* Lieferadresse */}
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Lieferadresse</p>
                      <div className="flex items-start gap-1.5 text-xs">
                        <MapPin className="w-3 h-3 text-muted-foreground mt-0.5 shrink-0" />
                        <p className="text-foreground">
                          {order.shippingAddress.street} {order.shippingAddress.houseNumber},<br />
                          {order.shippingAddress.postalCode} {order.shippingAddress.city}
                        </p>
                      </div>
                    </div>

                    {/* Artikel */}
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Artikel</p>
                      <div className="space-y-1">
                        {order.items.map((item) => (
                          <div key={item.productId} className="flex justify-between text-xs">
                            <span className="text-foreground">{item.productTitle} · {item.condition}</span>
                            <span className="font-semibold">{item.price * item.qty} €</span>
                          </div>
                        ))}
                        <div className="flex justify-between text-xs pt-1 border-t border-border">
                          <span className="text-muted-foreground">Versand ({order.shippingMethod === "express" ? "Express" : "Standard"})</span>
                          <span>{order.shippingCost === 0 ? "kostenlos" : `${order.shippingCost} €`}</span>
                        </div>
                        <div className="flex justify-between text-xs font-bold text-foreground">
                          <span>Gesamt</span>
                          <span>{order.total} €</span>
                        </div>
                      </div>
                    </div>

                    {/* Versand & Tracking */}
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Versand</p>
                      <div className="space-y-1 text-xs">
                        {order.trackingCode ? (
                          <div className="flex items-center gap-1.5">
                            <Truck className="w-3 h-3 text-muted-foreground" />
                            <span className="font-mono">{order.trackingCode}</span>
                            {order.carrier && <span className="text-muted-foreground">({order.carrier})</span>}
                          </div>
                        ) : (
                          <p className="text-muted-foreground">Noch kein Tracking-Code</p>
                        )}
                        {order.shippedAt && <p><span className="text-muted-foreground">Versendet:</span> {order.shippedAt.toLocaleDateString("de-DE")}</p>}
                        {order.deliveredAt && <p><span className="text-muted-foreground">Geliefert:</span> {order.deliveredAt.toLocaleDateString("de-DE")}</p>}
                        {order.paymentReference && (
                          <p><span className="text-muted-foreground">Zahlung-ID:</span> <span className="font-mono">{order.paymentReference}</span></p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Aktionen */}
                  <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-border">
                    {order.status === "processing" && (
                      <input
                        className="flex-1 px-3 py-2 text-xs border border-border rounded-lg bg-background focus:outline-none"
                        placeholder="Tracking-Code eingeben..."
                        value={trackingInputs[order.id] ?? ""}
                        onChange={(e) => setTrackingInputs((prev) => ({ ...prev, [order.id]: e.target.value }))}
                      />
                    )}
                    {nextStatus && (
                      <button
                        onClick={() => advanceStatus(order.id, nextStatus, trackingInputs[order.id])}
                        className="px-4 py-2 bg-foreground text-background text-xs font-semibold rounded-lg hover:bg-foreground/90 transition-colors whitespace-nowrap"
                      >
                        → {STATUS_CONFIG[nextStatus].label}
                      </button>
                    )}
                    {!["cancelled", "refunded", "delivered"].includes(order.status) && (
                      <button
                        onClick={() => advanceStatus(order.id, "cancelled")}
                        className="px-4 py-2 border border-red-300 text-red-700 text-xs font-semibold rounded-lg hover:bg-red-50 transition-colors"
                      >
                        Stornieren
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AdminLayout>
  );
}
