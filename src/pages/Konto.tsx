import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Package,
  RefreshCw,
  Heart,
  Settings,
  LogOut,
  ChevronRight,
  Truck,
  CheckCircle,
  Clock,
  ArrowRight,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { MOCK_ORDERS, MOCK_ANKAUF_REQUESTS } from "@/data/mockBusiness";
import type { OrderStatus, AnkaufStatus } from "@/types/business";

// Demo-Nutzer
const DEMO_USER = {
  firstName: "Sarah",
  lastName: "Meier",
  email: "sarah.m@gmail.com",
  phone: "+49 162 444 55666",
  memberSince: new Date("2025-09-15"),
};

function OrderStatusIcon({ status }: { status: OrderStatus }) {
  if (status === "delivered") return <CheckCircle className="w-4 h-4 text-green-600" />;
  if (status === "shipped") return <Truck className="w-4 h-4 text-blue-600" />;
  return <Clock className="w-4 h-4 text-orange-500" />;
}

function AnkaufStatusLabel({ status }: { status: AnkaufStatus }) {
  const map: Partial<Record<AnkaufStatus, { label: string; color: string }>> = {
    pending:        { label: "Eingereicht",        color: "text-blue-600" },
    label_sent:     { label: "Label unterwegs",    color: "text-purple-600" },
    received:       { label: "Eingegangen",        color: "text-yellow-600" },
    in_inspection:  { label: "Wird geprüft",       color: "text-orange-600" },
    offer_made:     { label: "Angebot erhalten",   color: "text-indigo-600" },
    completed:      { label: "Abgeschlossen",      color: "text-green-600" },
  };
  const cfg = map[status] ?? { label: status, color: "text-muted-foreground" };
  return <span className={`text-sm font-medium ${cfg.color}`}>{cfg.label}</span>;
}

type Tab = "overview" | "orders" | "ankauf" | "wishlist" | "settings";

const Konto = () => {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "overview",  label: "Übersicht",    icon: <User className="w-4 h-4" /> },
    { id: "orders",    label: "Bestellungen", icon: <Package className="w-4 h-4" /> },
    { id: "ankauf",    label: "Ankäufe",      icon: <RefreshCw className="w-4 h-4" /> },
    { id: "wishlist",  label: "Merkliste",    icon: <Heart className="w-4 h-4" /> },
    { id: "settings",  label: "Einstellungen", icon: <Settings className="w-4 h-4" /> },
  ];

  // Bestellungen gefiltert auf Demo-Nutzer
  const userOrders = MOCK_ORDERS.filter((o) => o.email === DEMO_USER.email);
  // Ankauf-Anfragen des Demo-Nutzers
  const userAnkaufe = MOCK_ANKAUF_REQUESTS.filter(
    (r) => r.sellerEmail === DEMO_USER.email
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        {/* Demo Banner */}
        <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
          <strong>Demo-Konto:</strong> Angemeldet als Sarah Meier. In der
          Produktionsversion erfolgt hier echtes Login/Logout.
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="md:w-64 flex-shrink-0">
            {/* Profil-Card */}
            <div className="bg-card border border-border rounded-xl p-5 mb-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-foreground flex items-center justify-center text-background font-bold text-lg">
                  {DEMO_USER.firstName[0]}
                  {DEMO_USER.lastName[0]}
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {DEMO_USER.firstName} {DEMO_USER.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground">{DEMO_USER.email}</p>
                </div>
              </div>
              <div className="flex justify-between text-center text-xs">
                <div>
                  <p className="font-bold text-foreground text-base">{MOCK_ORDERS.length}</p>
                  <p className="text-muted-foreground">Bestellungen</p>
                </div>
                <div>
                  <p className="font-bold text-foreground text-base">{userAnkaufe.length}</p>
                  <p className="text-muted-foreground">Ankäufe</p>
                </div>
                <div>
                  <p className="font-bold text-foreground text-base">3</p>
                  <p className="text-muted-foreground">Merkliste</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="bg-card border border-border rounded-xl overflow-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors border-b border-border last:border-0 ${
                    activeTab === tab.id
                      ? "bg-foreground text-background"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                  {activeTab !== tab.id && (
                    <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground" />
                  )}
                </button>
              ))}
              <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/5 transition-colors">
                <LogOut className="w-4 h-4" />
                Abmelden
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* ÜBERSICHT */}
            {activeTab === "overview" && (
              <div className="space-y-4">
                <h1 className="text-xl font-bold text-foreground">
                  Willkommen zurück, {DEMO_USER.firstName}!
                </h1>

                {/* Letzte Bestellung */}
                {userOrders[0] && (
                  <div className="bg-card border border-border rounded-xl p-5">
                    <h2 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                      Letzte Bestellung
                    </h2>
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={userOrders[0].items[0]?.imageUrl}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {userOrders[0].items[0]?.productTitle}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {userOrders[0].id} · {userOrders[0].total} €
                        </p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <OrderStatusIcon status={userOrders[0].status} />
                          <span className="text-xs font-medium">
                            {userOrders[0].status === "shipped"
                              ? "Unterwegs · " + userOrders[0].trackingCode
                              : "In Bearbeitung"}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveTab("orders")}
                        className="text-xs text-accent hover:underline flex-shrink-0"
                      >
                        Details →
                      </button>
                    </div>
                  </div>
                )}

                {/* Schnell-Links */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Neues Gerät kaufen",  href: "/smartphones/alle", desc: "50+ geprüfte Geräte" },
                    { label: "Handy verkaufen",      href: "/ankauf",           desc: "Sofort Preis berechnen" },
                    { label: "Häufige Fragen",       href: "/faq",              desc: "Hilfe & Support" },
                    { label: "Kontakt aufnehmen",    href: "/kontakt",          desc: "Mo–Sa erreichbar" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="bg-card border border-border rounded-xl p-4 hover:bg-secondary/50 transition-colors"
                    >
                      <p className="text-sm font-semibold text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* BESTELLUNGEN */}
            {activeTab === "orders" && (
              <div>
                <h1 className="text-xl font-bold text-foreground mb-4">Meine Bestellungen</h1>
                {MOCK_ORDERS.length === 0 ? (
                  <div className="text-center py-16 bg-card border border-border rounded-xl">
                    <Package className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="font-medium text-foreground">Noch keine Bestellungen</p>
                    <Link
                      to="/smartphones/alle"
                      className="text-sm text-accent hover:underline mt-2 block"
                    >
                      Jetzt shoppen →
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {MOCK_ORDERS.map((order) => (
                      <div key={order.id} className="bg-card border border-border rounded-xl p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <span className="text-xs font-mono text-muted-foreground">
                              {order.id}
                            </span>
                            <p className="text-xs text-muted-foreground">
                              {order.createdAt.toLocaleDateString("de-DE", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <OrderStatusIcon status={order.status} />
                            <span className="text-xs font-medium">
                              {order.status === "shipped"
                                ? "Unterwegs"
                                : order.status === "delivered"
                                ? "Geliefert"
                                : "In Bearbeitung"}
                            </span>
                          </div>
                        </div>
                        {order.items.map((item) => (
                          <div key={item.productId} className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={item.imageUrl}
                                alt={item.productTitle}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-foreground truncate">
                                {item.productTitle}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {item.storage} · {item.condition}
                              </p>
                            </div>
                            <p className="text-sm font-bold text-foreground flex-shrink-0">
                              {item.price} €
                            </p>
                          </div>
                        ))}
                        {order.trackingCode && (
                          <div className="mt-3 p-2.5 bg-secondary/50 rounded-lg">
                            <p className="text-xs text-muted-foreground">
                              Tracking:{" "}
                              <span className="font-mono font-medium text-foreground">
                                {order.trackingCode}
                              </span>
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ANKÄUFE */}
            {activeTab === "ankauf" && (
              <div>
                <h1 className="text-xl font-bold text-foreground mb-4">
                  Meine Ankauf-Anfragen
                </h1>
                <div className="bg-card border border-border rounded-xl p-5 mb-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    Hier siehst du den Status deiner eingesendeten Geräte.
                  </p>
                  {/* Demo-Anfrage */}
                  <div className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-mono text-muted-foreground">
                        ANK-20260308-001
                      </span>
                      <AnkaufStatusLabel status="in_inspection" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">
                      iPhone 15 Pro Max 256GB
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Angebotener Preis: 620 € · Zustand: Sehr Gut
                    </p>
                    <div className="mt-3 grid grid-cols-4 gap-2">
                      {[
                        { label: "Eingereicht",    done: true },
                        { label: "Label erhalten", done: true },
                        { label: "Eingegangen",    done: true },
                        { label: "Geprüft",        done: false },
                      ].map((step) => (
                        <div key={step.label} className="text-center">
                          <div
                            className={`w-6 h-6 rounded-full mx-auto mb-1 flex items-center justify-center text-xs font-bold ${
                              step.done
                                ? "bg-foreground text-background"
                                : "bg-border text-muted-foreground"
                            }`}
                          >
                            {step.done ? "✓" : "○"}
                          </div>
                          <p className="text-[10px] text-muted-foreground leading-tight">
                            {step.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <Link
                  to="/ankauf"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-foreground text-background rounded-xl font-medium text-sm hover:bg-foreground/90 transition-colors"
                >
                  Weiteres Gerät verkaufen <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}

            {/* MERKLISTE */}
            {activeTab === "wishlist" && (
              <div>
                <h1 className="text-xl font-bold text-foreground mb-4">Merkliste</h1>
                <div className="text-center py-16 bg-card border border-border rounded-xl">
                  <Heart className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="font-medium text-foreground">Deine Merkliste ist leer</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Klicke auf das Herz-Symbol bei einem Produkt um es zu merken.
                  </p>
                  <Link
                    to="/smartphones/alle"
                    className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-lg text-sm font-medium hover:bg-foreground/90 transition-colors"
                  >
                    Produkte entdecken <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}

            {/* EINSTELLUNGEN */}
            {activeTab === "settings" && (
              <div>
                <h1 className="text-xl font-bold text-foreground mb-4">Einstellungen</h1>
                <div className="bg-card border border-border rounded-xl divide-y divide-border">
                  {[
                    { label: "Persönliche Daten",   value: `${DEMO_USER.firstName} ${DEMO_USER.lastName}` },
                    { label: "E-Mail-Adresse",       value: DEMO_USER.email },
                    { label: "Telefonnummer",        value: DEMO_USER.phone ?? "Nicht hinterlegt" },
                    { label: "Lieferadressen",       value: "1 Adresse gespeichert" },
                    { label: "Zahlungsmethoden",     value: "PayPal verbunden" },
                    { label: "Benachrichtigungen",   value: "E-Mail aktiv" },
                    { label: "Passwort ändern",      value: "Zuletzt geändert: nie" },
                  ].map((item) => (
                    <button
                      key={item.label}
                      className="w-full flex items-center justify-between px-5 py-4 hover:bg-secondary/50 transition-colors text-left"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.value}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Konto;
