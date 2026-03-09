import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { ANKAUF_MODELS, CONDITIONS, DEFECTS, calculateAnkaufPrice } from "@/data/ankauf";
import { useAnkauf } from "@/context/AnkaufContext";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const AnkaufPage = () => {
  const { addRequest } = useAnkauf();
  const [model, setModel] = useState("");
  const [storage, setStorage] = useState("");
  const [condition, setCondition] = useState("");
  const [defects, setDefects] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [sellerName, setSellerName] = useState("");
  const [sellerEmail, setSellerEmail] = useState("");
  const [sellerPhone, setSellerPhone] = useState("");
  const [payoutMethod, setPayoutMethod] = useState<"bank_transfer" | "paypal">("bank_transfer");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [iban, setIban] = useState("");

  const models = Object.keys(ANKAUF_MODELS);
  const storages = model ? Object.keys(ANKAUF_MODELS[model] || {}) : [];
  const price = useMemo(() => calculateAnkaufPrice(model, storage, condition, defects), [model, storage, condition, defects]);
  const basePrice = ANKAUF_MODELS[model]?.[storage] || 0;
  const condObj = CONDITIONS.find((c) => c.key === condition);
  const totalDed = defects.reduce((s, d) => s + (DEFECTS.find((x) => x.key === d)?.deduction || 0), 0);

  const toggleDefect = (key: string) => {
    setDefects((prev) => prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key]);
  };

  const chipClass = (active: boolean, activeColor = "border-accent bg-accent/5 text-accent") =>
    `px-4 py-2.5 rounded-xl border text-sm font-medium transition-all cursor-pointer text-center ${
      active ? activeColor : "border-border bg-background text-muted-foreground hover:border-border/80 hover:bg-secondary/50"
    }`;

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="container mx-auto px-4 py-20 max-w-lg text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <div className="w-16 h-16 border-2 border-foreground rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-foreground" />
            </div>
            <h1 className="text-2xl font-bold font-heading mb-3">Anfrage eingegangen!</h1>
            <p className="text-muted-foreground mb-2">
              Hallo <strong className="text-foreground">{sellerName}</strong>, dein{" "}
              <strong className="text-foreground">{model} ({storage})</strong> wurde für{" "}
              <strong className="text-foreground">{price} €</strong> zum Ankauf vorgemerkt. Wir kontaktieren dich unter{" "}
              <strong className="text-foreground">{sellerEmail}</strong>.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Du erhältst in Kürze eine E-Mail mit deinem kostenlosen Versandlabel. Nach Eingang und Prüfung wird der Betrag innerhalb von 1-3 Werktagen ausgezahlt.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => { setSubmitted(false); setShowContactForm(false); setSellerName(""); setSellerEmail(""); setSellerPhone(""); setModel(""); setStorage(""); setCondition(""); setDefects([]); setIban(""); setPaypalEmail(""); }}>
                Weiteres Gerät verkaufen
              </Button>
              <Button asChild>
                <Link to="/">Zum Shop</Link>
              </Button>
            </div>
          </motion.div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Startseite</Link>
          <span>/</span>
          <span className="text-foreground font-medium">Handy verkaufen</span>
        </nav>

        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-secondary border border-border text-foreground text-xs font-medium uppercase tracking-wider mb-3">
            Automatische Preisberechnung
          </span>
          <h1 className="text-3xl font-bold font-heading text-foreground mb-2">Handy verkaufen</h1>
          <p className="text-muted-foreground">Wähle dein Gerät und erhalte sofort deinen Ankaufpreis.</p>
        </div>

        {/* Warum bei PHONIX verkaufen */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto mb-10">
          {[
            { icon: "💶", title: "Faire Preise", text: "Marktgerechte Ankaufpreise, keine versteckten Abzüge" },
            { icon: "📦", title: "Kostenloser Versand", text: "Wir senden dir ein kostenloses Versandlabel zu" },
            { icon: "⚡", title: "Schnelle Auszahlung", text: "Nach Prüfung Auszahlung innerhalb von 1-3 Werktagen" },
            { icon: "🔒", title: "Datenschutz", text: "Professionelle Datenlöschung nach DSGVO-Standards" },
          ].map(item => (
            <div key={item.title} className="rounded-xl border border-border bg-card p-4 text-center">
              <div className="text-2xl mb-2">{item.icon}</div>
              <p className="text-sm font-semibold text-foreground mb-1">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Model */}
            <div>
              <StepLabel n={1} label="Modell wählen" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {models.map((m) => (
                  <button key={m} onClick={() => { setModel(m); setStorage(""); setCondition(""); setDefects([]); }} className={chipClass(model === m)}>
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Storage */}
            <AnimatePresence>
              {model && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                  <StepLabel n={2} label="Speicher" />
                  <div className="flex flex-wrap gap-2">
                    {storages.map((s) => (
                      <button key={s} onClick={() => { setStorage(s); setCondition(""); setDefects([]); }} className={chipClass(storage === s)} style={{ minWidth: 80 }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 3: Condition */}
            <AnimatePresence>
              {storage && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                  <StepLabel n={3} label="Zustand" />
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {CONDITIONS.map((c) => (
                      <button
                        key={c.key}
                        onClick={() => { setCondition(c.key); setDefects([]); }}
                        className={`text-left px-4 py-3 rounded-xl border transition-all cursor-pointer ${
                          condition === c.key ? "border-accent bg-accent/5" : "border-border hover:bg-secondary/50"
                        }`}
                      >
                        <span className={`text-sm font-semibold ${condition === c.key ? "text-accent" : "text-foreground"}`}>
                          {c.icon} {c.label}
                        </span>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{c.description}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 4: Defects */}
            <AnimatePresence>
              {condition && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                  <StepLabel n={4} label="Mängel" sub="(optional)" />
                  <div className="grid grid-cols-2 gap-2">
                    {DEFECTS.map((d) => {
                      const active = defects.includes(d.key);
                      return (
                        <button
                          key={d.key}
                          onClick={() => toggleDefect(d.key)}
                          className={`flex items-center gap-2 text-left px-4 py-2.5 rounded-xl border transition-all cursor-pointer ${
                            active ? "border-destructive bg-destructive/5 text-destructive" : "border-border text-muted-foreground hover:bg-secondary/50"
                          }`}
                        >
                          <span>{d.icon}</span>
                          <span className="flex-1 text-sm font-medium">{d.label}</span>
                          <span className="text-[10px] opacity-60">-{d.deduction}€</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Price Card */}
          <div>
            <div className="sticky top-24 bg-card border border-border rounded-xl p-6">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold text-center mb-5">
                Dein Ankaufpreis
              </p>
              {price !== null ? (
                <>
                  <motion.div
                    key={price}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center mb-4"
                  >
                    <span className="text-5xl font-bold font-heading text-foreground">{price}</span>
                    <span className="text-2xl font-bold text-foreground ml-1">€</span>
                  </motion.div>
                  <p className="text-xs text-muted-foreground text-center mb-4">Sofort-Auszahlung möglich</p>
                  <Separator className="mb-4" />
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Basis ({storage})</span>
                      <span className="font-semibold">{basePrice} €</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Zustand ({condition})</span>
                      <span className="font-semibold">×{condObj?.multiplier}</span>
                    </div>
                    {totalDed > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Mängel ({defects.length}×)</span>
                        <span className="font-semibold text-destructive">−{totalDed} €</span>
                      </div>
                    )}
                  </div>
                  {showContactForm ? (
                    <div className="rounded-xl border border-border bg-background p-4 space-y-3">
                      <p className="text-xs font-semibold text-foreground text-center mb-1">Deine Kontaktdaten</p>
                      <input
                        type="text"
                        placeholder="Dein Name"
                        value={sellerName}
                        onChange={(e) => setSellerName(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      <input
                        type="email"
                        placeholder="deine@email.de"
                        value={sellerEmail}
                        onChange={(e) => setSellerEmail(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      <input
                        type="tel"
                        placeholder="+49 ..."
                        value={sellerPhone}
                        onChange={(e) => setSellerPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      {/* Auszahlungsmethode */}
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-foreground">Auszahlung via</p>
                        <div className="grid grid-cols-2 gap-2">
                          {(["bank_transfer", "paypal"] as const).map((method) => (
                            <button
                              key={method}
                              type="button"
                              onClick={() => setPayoutMethod(method)}
                              className={`py-2 px-3 rounded-lg border text-xs font-medium transition-all ${
                                payoutMethod === method
                                  ? "border-accent bg-accent/5 text-accent"
                                  : "border-border text-muted-foreground hover:bg-secondary/50"
                              }`}
                            >
                              {method === "bank_transfer" ? "Banküberweisung" : "PayPal"}
                            </button>
                          ))}
                        </div>
                        {payoutMethod === "bank_transfer" && (
                          <input
                            type="text"
                            placeholder="IBAN (optional)"
                            value={iban}
                            onChange={(e) => setIban(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        )}
                        {payoutMethod === "paypal" && (
                          <input
                            type="email"
                            placeholder="PayPal-E-Mail"
                            value={paypalEmail}
                            onChange={(e) => setPaypalEmail(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        Deine Daten werden nur für die Bearbeitung deines Verkaufs verwendet. <a href="/datenschutz" className="underline hover:text-foreground">Datenschutz</a>
                      </p>
                      <Button
                        className="w-full"
                        size="lg"
                        onClick={() => {
                          if (sellerName.trim() && sellerEmail.trim() && sellerPhone.trim() && price !== null) {
                            addRequest({
                              sellerName: sellerName.trim(),
                              sellerEmail: sellerEmail.trim(),
                              sellerPhone: sellerPhone.trim(),
                              deviceModel: model,
                              deviceStorage: storage,
                              deviceCondition: condition,
                              deviceDefects: defects,
                              quotedPrice: price,
                              payoutMethod,
                              iban: payoutMethod === "bank_transfer" ? iban.trim() || undefined : undefined,
                              paypalEmail: payoutMethod === "paypal" ? paypalEmail.trim() || undefined : undefined,
                            });
                            setSubmitted(true);
                          }
                        }}
                        disabled={!sellerName.trim() || !sellerEmail.trim() || !sellerPhone.trim()}
                      >
                        Anfrage senden <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                      <button
                        onClick={() => setShowContactForm(false)}
                        className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors text-center"
                      >
                        Zurück
                      </button>
                    </div>
                  ) : (
                    <Button className="w-full" size="lg" onClick={() => setShowContactForm(true)}>
                      Jetzt verkaufen <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  )}
                  <p className="text-[10px] text-muted-foreground text-center mt-3">Preis 48h gültig · Kostenloser Versand</p>
                </>
              ) : (
                <div className="text-center py-10">
                  <p className="text-sm text-muted-foreground">
                    Wähle dein Gerät für eine<br />sofortige Preisberechnung
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

function StepLabel({ n, label, sub }: { n: number; label: string; sub?: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="w-6 h-6 rounded-md bg-foreground text-background text-xs font-bold flex items-center justify-center">
        {n}
      </span>
      <span className="text-sm font-bold text-foreground">{label}</span>
      {sub && <span className="text-sm text-muted-foreground">{sub}</span>}
    </div>
  );
}

export default AnkaufPage;
