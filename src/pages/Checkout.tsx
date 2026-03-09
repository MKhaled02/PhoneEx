import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChevronLeft,
  Truck,
  CreditCard,
  ShieldCheck,
  Package,
  Check,
  Lock,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useCart } from "@/context/CartContext";

// Validierungsschema
const checkoutSchema = z.object({
  // Kontaktdaten
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  phone: z.string().min(6, "Bitte geben Sie eine Telefonnummer ein"),
  // Lieferadresse
  firstName: z.string().min(2, "Bitte geben Sie Ihren Vornamen ein"),
  lastName: z.string().min(2, "Bitte geben Sie Ihren Nachnamen ein"),
  street: z.string().min(3, "Bitte geben Sie Ihre Straße ein"),
  houseNumber: z.string().min(1, "Hausnummer erforderlich"),
  postalCode: z.string().regex(/^\d{5}$/, "PLZ muss 5 Ziffern haben"),
  city: z.string().min(2, "Bitte geben Sie Ihre Stadt ein"),
  // Optional
  company: z.string().optional(),
  addressNote: z.string().optional(),
  // Versand & Zahlung
  shipping: z.enum(["standard", "express"]),
  payment: z.enum(["paypal", "card", "klarna", "transfer"]),
  // AGB
  agbAccepted: z.boolean().refine((v) => v === true, {
    message: "Bitte akzeptieren Sie die AGB",
  }),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

// Versandoptionen
const shippingOptions = [
  {
    id: "standard",
    name: "Standardversand",
    price: 0,
    priceLabel: "Kostenlos",
    time: "2-4 Werktage",
    icon: Package,
  },
  {
    id: "express",
    name: "Expressversand",
    price: 9.99,
    priceLabel: "9,99 €",
    time: "1-2 Werktage",
    icon: Truck,
  },
];

// Zahlungsmethoden
const paymentMethods = [
  { id: "paypal", name: "PayPal", icon: "💳" },
  { id: "card", name: "Kreditkarte", icon: "💳", description: "Visa, Mastercard" },
  { id: "klarna", name: "Klarna", icon: "🛒", description: "Rechnung oder Ratenkauf" },
  { id: "transfer", name: "Vorkasse", icon: "🏦", description: "Überweisung" },
];

const Checkout = () => {
  const navigate = useNavigate();
  const { items, cartTotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      shipping: "standard",
      payment: "paypal",
      agbAccepted: false,
    },
  });

  const selectedShipping = watch("shipping");
  const selectedPayment = watch("payment");

  // Versandkosten berechnen
  const shippingCost = selectedShipping === "express" ? 9.99 : 0;
  const total = cartTotal + shippingCost;

  // Formular absenden
  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);

    // Simuliere API-Aufruf
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Bestelldaten für Bestätigungsseite speichern
    const orderData = {
      orderNumber: `PHX-${Date.now().toString().slice(-8)}`,
      items: items,
      shipping: data,
      total: total,
      date: new Date().toISOString(),
    };
    sessionStorage.setItem("lastOrder", JSON.stringify(orderData));

    // Warenkorb leeren
    clearCart();

    // Zur Bestätigungsseite
    navigate("/bestellung-bestaetigt");
  };

  // Leerer Warenkorb
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="container mx-auto px-4 py-20 text-center">
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Ihr Warenkorb ist leer
          </h1>
          <p className="text-muted-foreground mb-6">
            Fügen Sie Produkte hinzu, um zur Kasse zu gehen.
          </p>
          <Link
            to="/smartphones/alle"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors"
          >
            Jetzt shoppen
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Zurück-Link */}
        <Link
          to="/warenkorb"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Zurück zum Warenkorb
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formular */}
          <div className="lg:col-span-2">
            <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Kontaktdaten */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <h2 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                  Kontaktdaten
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      E-Mail-Adresse *
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="ihre@email.de"
                      className={`w-full px-4 py-2.5 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                        errors.email ? "border-red-500" : "border-border"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Telefonnummer *
                    </label>
                    <input
                      {...register("phone")}
                      type="tel"
                      placeholder="+49 123 456 789"
                      className={`w-full px-4 py-2.5 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                        errors.phone ? "border-red-500" : "border-border"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
              </motion.section>

              {/* Lieferadresse */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <h2 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  Lieferadresse
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Vorname *
                    </label>
                    <input
                      {...register("firstName")}
                      type="text"
                      className={`w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                        errors.firstName ? "border-red-500" : "border-border"
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Nachname *
                    </label>
                    <input
                      {...register("lastName")}
                      type="text"
                      className={`w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                        errors.lastName ? "border-red-500" : "border-border"
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Firma (optional)
                    </label>
                    <input
                      {...register("company")}
                      type="text"
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>

                  <div className="md:col-span-2 grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Straße *
                      </label>
                      <input
                        {...register("street")}
                        type="text"
                        className={`w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                          errors.street ? "border-red-500" : "border-border"
                        }`}
                      />
                      {errors.street && (
                        <p className="text-red-500 text-xs mt-1">{errors.street.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Nr. *
                      </label>
                      <input
                        {...register("houseNumber")}
                        type="text"
                        className={`w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                          errors.houseNumber ? "border-red-500" : "border-border"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      PLZ *
                    </label>
                    <input
                      {...register("postalCode")}
                      type="text"
                      maxLength={5}
                      className={`w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                        errors.postalCode ? "border-red-500" : "border-border"
                      }`}
                    />
                    {errors.postalCode && (
                      <p className="text-red-500 text-xs mt-1">{errors.postalCode.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Stadt *
                    </label>
                    <input
                      {...register("city")}
                      type="text"
                      className={`w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                        errors.city ? "border-red-500" : "border-border"
                      }`}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Lieferhinweis (optional)
                    </label>
                    <input
                      {...register("addressNote")}
                      type="text"
                      placeholder="z.B. Klingeln bei Müller"
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
              </motion.section>

              {/* Versandart */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <h2 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-bold">
                    3
                  </span>
                  Versandart
                </h2>

                <div className="space-y-3">
                  {shippingOptions.map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedShipping === option.id
                          ? "border-accent bg-accent/5"
                          : "border-border hover:bg-secondary/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          value={option.id}
                          {...register("shipping")}
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedShipping === option.id
                              ? "border-accent"
                              : "border-muted-foreground"
                          }`}
                        >
                          {selectedShipping === option.id && (
                            <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                          )}
                        </div>
                        <option.icon className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">{option.name}</p>
                          <p className="text-sm text-muted-foreground">{option.time}</p>
                        </div>
                      </div>
                      <span className="font-semibold text-foreground">
                        {option.priceLabel}
                      </span>
                    </label>
                  ))}
                </div>
              </motion.section>

              {/* Zahlungsmethode */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <h2 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-bold">
                    4
                  </span>
                  Zahlungsmethode
                </h2>

                <div className="grid sm:grid-cols-2 gap-3">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedPayment === method.id
                          ? "border-accent bg-accent/5"
                          : "border-border hover:bg-secondary/50"
                      }`}
                    >
                      <input
                        type="radio"
                        value={method.id}
                        {...register("payment")}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          selectedPayment === method.id
                            ? "border-accent"
                            : "border-muted-foreground"
                        }`}
                      >
                        {selectedPayment === method.id && (
                          <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground flex items-center gap-2">
                          <span>{method.icon}</span>
                          {method.name}
                        </p>
                        {method.description && (
                          <p className="text-xs text-muted-foreground">{method.description}</p>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </motion.section>

              {/* AGB & Absenden (Mobile) */}
              <div className="lg:hidden space-y-4">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    {...register("agbAccepted")}
                    className="mt-1 w-4 h-4 rounded border-border"
                  />
                  <span className="text-sm text-muted-foreground">
                    Ich akzeptiere die{" "}
                    <Link to="/agb" className="text-accent hover:underline">
                      AGB
                    </Link>{" "}
                    und{" "}
                    <Link to="/widerruf" className="text-accent hover:underline">
                      Widerrufsbelehrung
                    </Link>
                    . *
                  </span>
                </label>
                {errors.agbAccepted && (
                  <p className="text-red-500 text-xs">{errors.agbAccepted.message}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                      Bestellung wird verarbeitet...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Kostenpflichtig bestellen · {total.toFixed(2).replace(".", ",")} €
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Bestellübersicht (Sidebar) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
                  Bestellübersicht
                </h3>

                {/* Produkte */}
                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 bg-secondary rounded-lg flex-shrink-0 overflow-hidden">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {item.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.storage} · {item.condition}
                        </p>
                        <p className="text-xs text-muted-foreground">Menge: {item.qty}</p>
                      </div>
                      <p className="text-sm font-semibold text-foreground whitespace-nowrap">
                        {(item.price * item.qty).toFixed(2).replace(".", ",")} €
                      </p>
                    </div>
                  ))}
                </div>

                {/* Summen */}
                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Zwischensumme</span>
                    <span className="text-foreground">
                      {cartTotal.toFixed(2).replace(".", ",")} €
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Versand</span>
                    <span className="text-foreground font-medium">
                      {shippingCost === 0 ? "Kostenlos" : `${shippingCost.toFixed(2).replace(".", ",")} €`}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                    <span className="text-foreground">Gesamt</span>
                    <span className="text-foreground">
                      {total.toFixed(2).replace(".", ",")} €
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">inkl. MwSt.</p>
                </div>
              </motion.div>

              {/* AGB & Absenden (Desktop) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="hidden lg:block space-y-4"
              >
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    {...register("agbAccepted")}
                    className="mt-1 w-4 h-4 rounded border-border"
                  />
                  <span className="text-sm text-muted-foreground">
                    Ich akzeptiere die{" "}
                    <Link to="/agb" className="text-accent hover:underline">
                      AGB
                    </Link>{" "}
                    und{" "}
                    <Link to="/widerruf" className="text-accent hover:underline">
                      Widerrufsbelehrung
                    </Link>
                    . *
                  </span>
                </label>
                {errors.agbAccepted && (
                  <p className="text-red-500 text-xs">{errors.agbAccepted.message}</p>
                )}

                <button
                  type="submit"
                  form="checkout-form"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                  className="w-full py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                      Verarbeite...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Kostenpflichtig bestellen
                    </>
                  )}
                </button>
              </motion.div>

              {/* Trust Signale */}
              <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  SSL-verschlüsselt
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  30 Tage Rückgabe
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Checkout;
