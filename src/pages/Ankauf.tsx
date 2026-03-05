import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { ANKAUF_MODELS, CONDITIONS, DEFECTS, calculateAnkaufPrice } from "@/data/ankauf";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const AnkaufPage = () => {
  const [model, setModel] = useState("");
  const [storage, setStorage] = useState("");
  const [condition, setCondition] = useState("");
  const [defects, setDefects] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

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
            <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold font-heading mb-3">Anfrage eingegangen!</h1>
            <p className="text-muted-foreground mb-2">
              Dein <strong className="text-foreground">{model} ({storage})</strong> wurde für{" "}
              <strong className="text-foreground">{price} €</strong> zum Ankauf vorgemerkt.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Du erhältst in Kürze eine E-Mail mit deinem kostenlosen Versandlabel. Nach Eingang und Prüfung wird der Betrag innerhalb von 24h ausgezahlt.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => { setSubmitted(false); setModel(""); setStorage(""); setCondition(""); setDefects([]); }}>
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
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
            💰 Automatische Preisberechnung
          </span>
          <h1 className="text-3xl font-bold font-heading text-foreground mb-2">Handy verkaufen</h1>
          <p className="text-muted-foreground">Wähle dein Gerät und erhalte sofort deinen Ankaufpreis.</p>
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
                      <span className="font-semibold text-amber-600">×{condObj?.multiplier}</span>
                    </div>
                    {totalDed > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Mängel ({defects.length}×)</span>
                        <span className="font-semibold text-destructive">−{totalDed} €</span>
                      </div>
                    )}
                  </div>
                  <Button className="w-full" size="lg" onClick={() => setSubmitted(true)}>
                    Jetzt verkaufen <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                  <p className="text-[10px] text-muted-foreground text-center mt-3">Preis 48h gültig · Kostenloser Versand</p>
                </>
              ) : (
                <div className="text-center py-10">
                  <div className="text-5xl opacity-15 mb-3">📱</div>
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
