// ═══════════════════════════════════════════════════════════════
// PHONIX Business Types — Vollständiges Typsystem
// ═══════════════════════════════════════════════════════════════

// ─── PRODUKT-STATUS (Admin-seitig) ───────────────────────────
export type ProductStatus =
  | "draft"        // Wird gerade angelegt, nicht sichtbar
  | "active"       // Öffentlich sichtbar, kaufbar
  | "reserved"     // Für Bestellung reserviert (Bezahlung ausstehend)
  | "sold"         // Verkauft
  | "in_repair"    // In Aufbereitung
  | "inactive";    // Deaktiviert (z.B. Preis zu überprüfen)

// ─── ADMIN-PRODUKT (interne Felder zusätzlich zum Produkt) ───
export interface AdminProduct {
  id: number;
  productId: number;        // Referenz auf Product.id
  status: ProductStatus;
  purchaseCost: number;     // Was haben wir bezahlt (Ankauf)?
  refurbishCost: number;    // Aufbereitungskosten (Reinigung, Reparatur, etc.)
  margin: number;           // Berechnete Marge in %
  internalNotes: string;    // Interne Notizen (Beschädigungen, Herkunft, etc.)
  supplier: string;         // Woher kommt das Gerät? (Privat-Ankauf, Großhändler, B2B)
  serialNumber?: string;    // IMEI / Seriennummer
  testedBy?: string;        // Mitarbeiter der getestet hat
  testedAt?: Date;
  listedAt?: Date;          // Wann wurde es live gestellt?
  createdAt: Date;
  updatedAt: Date;
}

// ─── ANKAUF-ANFRAGE ──────────────────────────────────────────
export type AnkaufStatus =
  | "pending"         // Gerade eingereicht, noch nicht bearbeitet
  | "label_sent"      // Versandlabel wurde zugeschickt
  | "received"        // Gerät eingegangen
  | "in_inspection"   // Gerät wird geprüft
  | "offer_made"      // Angebot wurde unterbreitet (ggf. abweichend)
  | "offer_accepted"  // Verkäufer hat Angebot akzeptiert
  | "offer_rejected"  // Verkäufer hat abgelehnt → Rücksendung
  | "payout_pending"  // Auszahlung in Bearbeitung
  | "completed"       // Abgeschlossen, Gerät angekauft
  | "returned";       // Gerät zurückgesendet

export interface AnkaufRequest {
  id: string;               // z.B. "ANK-20260308-001"
  status: AnkaufStatus;

  // Verkäuferdaten
  sellerName: string;
  sellerEmail: string;
  sellerPhone: string;

  // Gerätedaten (vom Rechner)
  deviceModel: string;      // z.B. "iPhone 15 Pro"
  deviceStorage: string;    // z.B. "256GB"
  deviceCondition: string;  // z.B. "Sehr Gut"
  deviceDefects: string[];  // z.B. ["display_kratzer"]

  // Preisgestaltung
  quotedPrice: number;      // Angebotener Preis vom Rechner
  finalPrice?: number;      // Tatsächlich gezahlter Preis (nach Inspektion)

  // Auszahlung
  payoutMethod?: "bank_transfer" | "paypal";
  iban?: string;
  paypalEmail?: string;

  // Tracking
  trackingCode?: string;    // Versand-Tracking des Eingangspakets
  adminNotes?: string;      // Interne Notizen

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  labelSentAt?: Date;
  receivedAt?: Date;
  completedAt?: Date;
}

// ─── BESTELLUNGEN ────────────────────────────────────────────
export type OrderStatus =
  | "pending_payment"   // Warten auf Zahlung
  | "payment_received"  // Zahlung eingegangen
  | "processing"        // Wird bearbeitet/verpackt
  | "shipped"           // Versendet
  | "delivered"         // Geliefert
  | "return_requested"  // Rücksendung angefragt
  | "returned"          // Zurückgekommen
  | "cancelled"         // Storniert
  | "refunded";         // Erstattet

export type PaymentMethod = "paypal" | "card" | "klarna" | "transfer";
export type ShippingMethod = "standard" | "express";

export interface OrderAddress {
  firstName: string;
  lastName: string;
  company?: string;
  street: string;
  houseNumber: string;
  addressNote?: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface OrderItem {
  productId: number;
  productTitle: string;
  productSlug: string;
  storage: string;
  condition: string;
  price: number;
  qty: number;
  imageUrl: string;
}

export interface Order {
  id: string;               // z.B. "PHX-20260308-001"
  status: OrderStatus;

  // Kundendaten
  email: string;
  phone: string;

  // Adresse
  shippingAddress: OrderAddress;

  // Artikel
  items: OrderItem[];

  // Preise
  subtotal: number;
  shippingCost: number;
  total: number;

  // Zahlung
  paymentMethod: PaymentMethod;
  paymentReference?: string;  // PayPal-ID, Stripe-ID, etc.

  // Versand
  shippingMethod: ShippingMethod;
  trackingCode?: string;
  carrier?: string;           // z.B. "DHL", "Hermes"

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
}

// ─── NUTZERPROFIL ────────────────────────────────────────────
export type UserRole = "customer" | "admin" | "staff";

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;

  // Adressen
  addresses: OrderAddress[];
  defaultAddressIndex?: number;

  // Merkliste
  wishlist: number[];          // Array von Product-IDs

  // Statistiken
  totalOrders: number;
  totalAnkaufRequests: number;

  createdAt: Date;
  lastLoginAt?: Date;
}

// ─── ADMIN-STATISTIKEN ───────────────────────────────────────
export interface AdminStats {
  // Produkte
  totalProducts: number;
  activeProducts: number;
  soldProducts: number;
  draftProducts: number;

  // Ankauf
  pendingAnkaufRequests: number;
  completedAnkaufThisMonth: number;
  totalAnkaufVolume: number;     // Gesamt ausgezahlt diesen Monat

  // Verkauf
  ordersThisMonth: number;
  revenueThisMonth: number;
  averageOrderValue: number;

  // Performance
  conversionRate: number;        // Checkout-Starts / Käufe
  averageMargin: number;         // Durchschnittliche Marge %
}

// ─── GERÄT-WORKFLOW-SCHRITT ──────────────────────────────────
export interface WorkflowStep {
  id: string;
  label: string;
  description: string;
  completedAt?: Date;
  completedBy?: string;
}

// ─── PRODUKT-FORMULAR (für Admin-Produktanlage) ──────────────
export interface ProductFormData {
  // Basisdaten
  title: string;
  brand: string;
  model: string;
  storage: string;
  condition: string;

  // Preise
  price: number;
  oldPrice: number;
  purchaseCost: number;

  // Technische Daten
  battery: number;
  stock: number;
  year: number;
  description: string;

  // Specs
  display: string;
  chip: string;
  ram: string;
  kamera: string;
  akku: string;
  os: string;
  sim: string;
  farbe: string;

  // Admin
  serialNumber?: string;
  supplier: string;
  internalNotes?: string;
  badge?: string;
  status: ProductStatus;
}

// ─── HELPER TYPES ─────────────────────────────────────────────
export type SortDirection = "asc" | "desc";

export interface PaginationMeta {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  meta?: PaginationMeta;
}
