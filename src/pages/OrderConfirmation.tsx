import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Package,
  Mail,
  Truck,
  Clock,
  ArrowRight,
  Phone,
  Copy,
  Check,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

interface OrderData {
  orderNumber: string;
  items: Array<{
    id: number;
    title: string;
    price: number;
    qty: number;
    storage: string;
    condition: string;
    images: string[];
  }>;
  shipping: {
    firstName: string;
    lastName: string;
    street: string;
    houseNumber: string;
    postalCode: string;
    city: string;
    email: string;
    phone: string;
    shipping: string;
    payment: string;
  };
  total: number;
  date: string;
}

const paymentLabels: Record<string, string> = {
  paypal: "PayPal",
  card: "Kreditkarte",
  klarna: "Klarna",
  transfer: "Überweisung (Vorkasse)",
};

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const storedOrder = sessionStorage.getItem("lastOrder");
    if (storedOrder) {
      setOrder(JSON.parse(storedOrder));
    } else {
      // Keine Bestellung gefunden - zurück zur Startseite
      navigate("/");
    }
  }, [navigate]);

  const copyOrderNumber = () => {
    if (order) {
      navigator.clipboard.writeText(order.orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const orderDate = new Date(order.date);
  const formattedDate = orderDate.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const formattedTime = orderDate.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const isExpress = order.shipping.shipping === "express";
  const deliveryDays = isExpress ? "1-2" : "2-4";

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Erfolgs-Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-10"
          >
            <div className="w-16 h-16 border-2 border-foreground rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-foreground" />
            </div>

            <h1 className="font-heading text-3xl font-bold text-foreground mb-3">
              Vielen Dank für Ihre Bestellung!
            </h1>
            <p className="text-muted-foreground text-lg">
              Ihre Bestellung wurde erfolgreich aufgenommen.
            </p>
          </motion.div>

          {/* Bestellnummer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-xl p-6 mb-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Bestellnummer</p>
                <div className="flex items-center gap-2">
                  <span className="font-heading text-xl font-bold text-foreground">
                    {order.orderNumber}
                  </span>
                  <button
                    onClick={copyOrderNumber}
                    className="p-1.5 rounded-md hover:bg-secondary transition-colors"
                    title="Bestellnummer kopieren"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-foreground" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Bestelldatum: {formattedDate}</p>
                <p>Uhrzeit: {formattedTime} Uhr</p>
              </div>
            </div>
          </motion.div>

          {/* Info-Karten */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card border border-border rounded-xl p-5"
            >
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Bestätigung per E-Mail
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Eine Bestätigung wurde an{" "}
                    <span className="font-medium text-foreground">
                      {order.shipping.email}
                    </span>{" "}
                    gesendet.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-card border border-border rounded-xl p-5"
            >
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Lieferung in {deliveryDays} Werktagen
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isExpress ? "Expressversand" : "Standardversand"} —
                    Sendungsverfolgung per E-Mail.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bestelldetails */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-card border border-border rounded-xl overflow-hidden mb-8"
          >
            <div className="p-6 border-b border-border">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                Bestellübersicht
              </h2>
            </div>

            {/* Produkte */}
            <div className="p-6 border-b border-border">
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-secondary rounded-lg flex-shrink-0 overflow-hidden">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.storage} · {item.condition}
                      </p>
                      <p className="text-sm text-muted-foreground">Menge: {item.qty}</p>
                    </div>
                    <p className="font-semibold text-foreground whitespace-nowrap">
                      {(item.price * item.qty).toFixed(2).replace(".", ",")} €
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Lieferadresse & Zahlung */}
            <div className="p-6 grid sm:grid-cols-2 gap-6 border-b border-border">
              <div>
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Package className="w-4 h-4 text-muted-foreground" />
                  Lieferadresse
                </h3>
                <p className="text-sm text-muted-foreground">
                  {order.shipping.firstName} {order.shipping.lastName}
                  <br />
                  {order.shipping.street} {order.shipping.houseNumber}
                  <br />
                  {order.shipping.postalCode} {order.shipping.city}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  Zahlungsmethode
                </h3>
                <p className="text-sm text-muted-foreground">
                  {paymentLabels[order.shipping.payment] || order.shipping.payment}
                </p>
                {order.shipping.payment === "transfer" && (
                  <p className="text-xs text-amber-600 mt-2">
                    Bitte überweisen Sie den Betrag innerhalb von 7 Tagen.
                    Bankdaten erhalten Sie per E-Mail.
                  </p>
                )}
              </div>
            </div>

            {/* Summe */}
            <div className="p-6 bg-secondary/30">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-foreground">Gesamtbetrag</span>
                <span className="font-heading text-xl font-bold text-foreground">
                  {order.total.toFixed(2).replace(".", ",")} €
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">inkl. MwSt. und Versand</p>
            </div>
          </motion.div>

          {/* Nächste Schritte */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-accent/5 border border-accent/20 rounded-xl p-6 mb-8"
          >
            <h3 className="font-semibold text-foreground mb-4">
              Wie geht es weiter?
            </h3>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center flex-shrink-0">
                  1
                </span>
                <p className="text-sm text-muted-foreground">
                  Sie erhalten eine <strong className="text-foreground">Bestätigungs-E-Mail</strong> mit
                  allen Bestelldetails.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center flex-shrink-0">
                  2
                </span>
                <p className="text-sm text-muted-foreground">
                  Wir bereiten Ihre Bestellung vor und prüfen das Gerät ein letztes Mal.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center flex-shrink-0">
                  3
                </span>
                <p className="text-sm text-muted-foreground">
                  Sie erhalten eine <strong className="text-foreground">Versandbenachrichtigung</strong> mit
                  Tracking-Link.
                </p>
              </li>
            </ol>
          </motion.div>

          {/* Support & Weiter shoppen */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/smartphones/alle"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors"
            >
              Weiter shoppen
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/kontakt"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 border border-border text-foreground font-medium rounded-lg hover:bg-secondary transition-colors"
            >
              <Phone className="w-4 h-4" />
              Fragen? Kontakt
            </Link>
          </motion.div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default OrderConfirmation;
