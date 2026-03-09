import { Link, useNavigate } from "react-router-dom";
import {
  Package, ShoppingCart, TrendingUp, AlertCircle,
  CheckCircle, Clock, Truck, XCircle, Eye, Plus,
  BarChart3, ArrowRight, RefreshCw
} from "lucide-react";
import { useAnkauf } from "@/context/AnkaufContext";
import { MOCK_ORDERS, MOCK_ADMIN_STATS } from "@/data/mockBusiness";
import { ALL_PRODUCTS } from "@/data/products";
import type { AnkaufStatus, OrderStatus } from "@/types/business";

// ─── Status-Badge Hilfsfunktionen ────────────────────────────

function AnkaufStatusBadge({ status }: { status: AnkaufStatus }) {
  const config: Record<AnkaufStatus, { label: string; className: string }> = {
    pending:        { label: "Neu",               className: "bg-blue-100 text-blue-700" },
    label_sent:     { label: "Label gesendet",    className: "bg-purple-100 text-purple-700" },
    received:       { label: "Eingegangen",       className: "bg-yellow-100 text-yellow-700" },
    in_inspection:  { label: "Prüfung",           className: "bg-orange-100 text-orange-700" },
    offer_made:     { label: "Angebot gemacht",   className: "bg-indigo-100 text-indigo-700" },
    offer_accepted: { label: "Angenommen",        className: "bg-green-100 text-green-700" },
    offer_rejected: { label: "Abgelehnt",         className: "bg-red-100 text-red-700" },
    payout_pending: { label: "Auszahlung",        className: "bg-teal-100 text-teal-700" },
    completed:      { label: "Abgeschlossen",     className: "bg-green-100 text-green-800" },
    returned:       { label: "Zurückgesendet",    className: "bg-gray-100 text-gray-700" },
  };
  const c = config[status];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${c.className}`}>
      {c.label}
    </span>
  );
}

function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const config: Record<OrderStatus, { label: string; className: string }> = {
    pending_payment:  { label: "Zahlung ausstehend",  className: "bg-yellow-100 text-yellow-700" },
    payment_received: { label: "Zahlung eingegangen", className: "bg-blue-100 text-blue-700" },
    processing:       { label: "In Bearbeitung",      className: "bg-purple-100 text-purple-700" },
    shipped:          { label: "Versendet",            className: "bg-indigo-100 text-indigo-700" },
    delivered:        { label: "Geliefert",            className: "bg-green-100 text-green-700" },
    return_requested: { label: "Rücksendung",          className: "bg-orange-100 text-orange-700" },
    returned:         { label: "Zurück",               className: "bg-gray-100 text-gray-700" },
    cancelled:        { label: "Storniert",            className: "bg-red-100 text-red-700" },
    refunded:         { label: "Erstattet",            className: "bg-red-100 text-red-800" },
  };
  const c = config[status];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${c.className}`}>
      {c.label}
    </span>
  );
}

// ─── Hauptkomponente ──────────────────────────────────────────

const Admin = () => {
  const { requests: ankaufRequests, pendingCount } = useAnkauf();
  const activeProducts = ALL_PRODUCTS.filter((p) => p.stock > 0).length;
  const stats = {
    ...MOCK_ADMIN_STATS,
    totalProducts: ALL_PRODUCTS.length,
    activeProducts,
    pendingAnkaufRequests: pendingCount,
  };

  return (
    <div className="min-h-screen bg-secondary/30">

      {/* Admin Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="font-heading text-xl font-bold text-foreground">PHONIX</Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm font-semibold text-foreground">Admin-Bereich</span>
            <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 text-xs font-medium">
              Demo-Modus
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Zur Website
            </Link>
            <button className="px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-secondary transition-colors text-muted-foreground">
              Abmelden
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">

        {/* Seitentitel */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Übersicht aller laufenden Geschäftsprozesse
          </p>
        </div>

        {/* KPI Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Aktive Produkte",
              value: stats.activeProducts,
              icon: Package,
              sub: `${stats.draftProducts} Entwürfe, ${stats.soldProducts} verkauft`,
              color: "text-blue-600",
              bg: "bg-blue-50",
            },
            {
              label: "Offene Ankäufe",
              value: stats.pendingAnkaufRequests,
              icon: AlertCircle,
              sub: `${stats.completedAnkaufThisMonth} abgeschlossen (Monat)`,
              color: "text-orange-600",
              bg: "bg-orange-50",
            },
            {
              label: "Bestellungen (Monat)",
              value: stats.ordersThisMonth,
              icon: ShoppingCart,
              sub: `Ø ${stats.averageOrderValue} € Warenkorbwert`,
              color: "text-purple-600",
              bg: "bg-purple-50",
            },
            {
              label: "Umsatz (Monat)",
              value: `${stats.revenueThisMonth.toLocaleString("de-DE")} €`,
              icon: TrendingUp,
              sub: `Ø Marge ${stats.averageMargin}%`,
              color: "text-green-600",
              bg: "bg-green-50",
            },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg ${kpi.bg} flex items-center justify-center`}>
                  <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
              <p className="text-xs font-medium text-foreground mt-0.5">{kpi.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Ankauf-Anfragen + Letzte Bestellungen */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">

          {/* Ankauf-Anfragen */}
          <div className="bg-card border border-border rounded-xl">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-foreground">Ankauf-Anfragen</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Aktuelle Verkäufer-Einreichungen</p>
              </div>
              <Link to="/admin/ankauf" className="text-xs text-accent hover:underline">
                Alle anzeigen →
              </Link>
            </div>
            <div className="divide-y divide-border">
              {ankaufRequests.slice(0, 4).map((req) => (
                <div key={req.id} className="p-4 flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-muted-foreground">{req.id}</span>
                      <AnkaufStatusBadge status={req.status} />
                    </div>
                    <p className="text-sm font-medium text-foreground mt-0.5 truncate">
                      {req.sellerName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {req.deviceModel} · {req.deviceStorage}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-foreground">{req.quotedPrice} €</p>
                    <p className="text-xs text-muted-foreground">
                      {req.createdAt.toLocaleDateString("de-DE")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-border">
              <button className="w-full flex items-center justify-center gap-2 py-2 text-sm font-medium text-accent hover:bg-accent/5 rounded-lg transition-colors">
                <Plus className="w-4 h-4" /> Neue Anfrage manuell anlegen
              </button>
            </div>
          </div>

          {/* Letzte Bestellungen */}
          <div className="bg-card border border-border rounded-xl">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-foreground">Letzte Bestellungen</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Kauf-Transaktionen</p>
              </div>
              <Link to="/admin/bestellungen" className="text-xs text-accent hover:underline">
                Alle anzeigen →
              </Link>
            </div>
            <div className="divide-y divide-border">
              {MOCK_ORDERS.map((order) => (
                <div key={order.id} className="p-4 flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-muted-foreground">{order.id}</span>
                      <OrderStatusBadge status={order.status} />
                    </div>
                    <p className="text-sm font-medium text-foreground mt-0.5 truncate">
                      {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">{order.items[0]?.productTitle}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-foreground">{order.total} €</p>
                    <p className="text-xs text-muted-foreground">
                      {order.createdAt.toLocaleDateString("de-DE")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-border">
              <p className="text-xs text-center text-muted-foreground">
                {stats.ordersThisMonth} Bestellungen diesen Monat ·{" "}
                {stats.revenueThisMonth.toLocaleString("de-DE")} € Umsatz
              </p>
            </div>
          </div>
        </div>

        {/* Produktbestand + Schnell-Aktionen + Performance */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Produkt-Status */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h2 className="font-semibold text-foreground mb-4">Produktbestand</h2>
            <div className="space-y-3">
              {[
                { label: "Aktiv & sichtbar", value: stats.activeProducts, color: "bg-green-500" },
                { label: "Entwurf",           value: stats.draftProducts,  color: "bg-gray-400" },
                { label: "Verkauft",          value: stats.soldProducts,   color: "bg-blue-500" },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${row.color}`} />
                    <span className="text-sm text-muted-foreground">{row.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{row.value}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-border flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">Gesamt</span>
                <span className="text-sm font-bold text-foreground">{stats.totalProducts}</span>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <Link
                to="/admin/produkte"
                className="flex items-center justify-center gap-2 w-full py-2 text-sm bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors"
              >
                <Package className="w-4 h-4" /> Produktverwaltung
              </Link>
              <Link
                to="/smartphones/alle"
                className="flex items-center justify-center gap-2 w-full py-2 text-sm border border-border rounded-lg hover:bg-secondary transition-colors text-foreground"
              >
                <Eye className="w-4 h-4" /> Shop-Ansicht
              </Link>
            </div>
          </div>

          {/* Schnell-Aktionen */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h2 className="font-semibold text-foreground mb-4">Schnell-Aktionen</h2>
            <div className="space-y-2">
              {[
                {
                  label: "Neues Gerät anlegen",
                  icon: Plus,
                  href: "/admin/produkt/neu",
                  desc: "Produkt erstellen & veröffentlichen",
                },
                {
                  label: "Ankauf bearbeiten",
                  icon: RefreshCw,
                  href: "/admin/ankauf",
                  desc: `${stats.pendingAnkaufRequests} offene Anfragen`,
                },
                {
                  label: "Bestellungen verwalten",
                  icon: ShoppingCart,
                  href: "/admin/bestellungen",
                  desc: "Versand & Status updaten",
                },
                {
                  label: "Alle Produkte",
                  icon: Package,
                  href: "/admin/produkte",
                  desc: `${stats.activeProducts} aktive Geräte`,
                },
              ].map((action) => (
                <Link
                  key={action.label}
                  to={action.href}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/70 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
                    <action.icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">{action.label}</p>
                    <p className="text-xs text-muted-foreground">{action.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                </Link>
              ))}
            </div>
          </div>

          {/* Performance-Kennzahlen */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h2 className="font-semibold text-foreground mb-4">Performance</h2>
            <div className="space-y-4">
              {[
                {
                  label: "Durchschn. Marge",
                  value: `${stats.averageMargin}%`,
                  desc: "Pro verkauftem Gerät",
                },
                {
                  label: "Conversion Rate",
                  value: `${stats.conversionRate}%`,
                  desc: "Besucher → Kauf",
                },
                {
                  label: "Ankäufe diesen Monat",
                  value: stats.completedAnkaufThisMonth,
                  desc: "Erfolgreich abgeschlossen",
                },
                {
                  label: "Ankauf-Volumen",
                  value: `${stats.totalAnkaufVolume.toLocaleString("de-DE")} €`,
                  desc: "Ausgezahlt diesen Monat",
                },
              ].map((metric) => (
                <div key={metric.label} className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">{metric.label}</p>
                    <p className="text-xs text-muted-foreground/60">{metric.desc}</p>
                  </div>
                  <p className="text-lg font-bold text-foreground">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Demo-Hinweis */}
        <div className="mt-8 p-4 rounded-xl bg-orange-50 border border-orange-200">
          <p className="text-sm font-semibold text-orange-800">Demo-Modus aktiv</p>
          <p className="text-xs text-orange-700 mt-1">
            Alle Daten sind Beispieldaten. Für den echten Betrieb: Backend (Supabase/Firebase) +
            Auth-System anbinden. Kontaktdaten, Bestellungen und Ankaufsanfragen werden dann aus
            einer echten Datenbank geladen.
          </p>
        </div>

      </main>
    </div>
  );
};

export default Admin;
