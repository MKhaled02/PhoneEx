import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import type { ProductFormData } from "@/types/business";
import type { ProductCondition } from "@/data/products";

const BRANDS = ["Apple", "Samsung", "Google", "Xiaomi", "OnePlus", "Sonstige"];
const CONDITIONS: ProductCondition[] = ["Wie Neu", "Exzellent", "Sehr Gut", "Gut", "Akzeptabel"];
const STORAGES = ["64GB", "128GB", "256GB", "512GB", "1TB"];
const SUPPLIERS = ["Privat-Ankauf", "Großhändler", "B2B-Partner", "Inzahlungnahme", "Sonstige"];

const EMPTY: ProductFormData = {
  title: "", brand: "Apple", model: "", storage: "128GB",
  condition: "Sehr Gut", price: 0, oldPrice: 0, purchaseCost: 0,
  battery: 85, stock: 1, year: new Date().getFullYear(), description: "",
  display: "", chip: "", ram: "", kamera: "", akku: "", os: "", sim: "", farbe: "",
  serialNumber: "", supplier: "Privat-Ankauf", internalNotes: "", badge: "", status: "draft",
};

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls = "w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-foreground/20";
const selectCls = `${inputCls} cursor-pointer`;

export default function AdminProduktNeu() {
  const [form, setForm] = useState<ProductFormData>(EMPTY);
  const [saved, setSaved] = useState(false);

  const set = (field: keyof ProductFormData, value: string | number) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const margin = form.purchaseCost > 0
    ? Math.round(((form.price - form.purchaseCost) / form.price) * 100)
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production: POST to /api/admin/products
    console.log("Produkt-Daten (Demo):", form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AdminLayout title="Neues Gerät anlegen" subtitle="Produkt erstellen und zur Veröffentlichung vorbereiten">
      <div className="mb-4">
        <Link to="/admin/produkte" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Zurück zu Produkten
        </Link>
      </div>

      {/* Demo-Hinweis */}
      <div className="mb-6 p-3 rounded-lg bg-orange-50 border border-orange-200 flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 shrink-0" />
        <p className="text-xs text-orange-700">
          <strong>Demo-Modus:</strong> Das Formular ist vollständig funktional, speichert aber noch nicht dauerhaft.
          Für echten Betrieb: Backend-API anbinden (Supabase/eigener Server). Das vollständige Datenmodell ist bereits in <code className="bg-orange-100 px-1 rounded">src/types/business.ts</code> definiert.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Sektion: Grunddaten */}
        <section className="bg-card border border-border rounded-xl p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Grunddaten</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Titel (z.B. iPhone 15 Pro 256GB)" required>
              <input className={inputCls} value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="iPhone 15 Pro 256GB" required />
            </Field>
            <Field label="Modell (z.B. iPhone 15 Pro)" required>
              <input className={inputCls} value={form.model} onChange={(e) => set("model", e.target.value)} placeholder="iPhone 15 Pro" required />
            </Field>
            <Field label="Marke" required>
              <select className={selectCls} value={form.brand} onChange={(e) => set("brand", e.target.value)}>
                {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </Field>
            <Field label="Speicher" required>
              <select className={selectCls} value={form.storage} onChange={(e) => set("storage", e.target.value)}>
                {STORAGES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Zustand" required>
              <select className={selectCls} value={form.condition} onChange={(e) => set("condition", e.target.value)}>
                {CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Farbe">
              <input className={inputCls} value={form.farbe} onChange={(e) => set("farbe", e.target.value)} placeholder="Space Black, Titan Natural, ..." />
            </Field>
            <Field label="Erscheinungsjahr">
              <input type="number" className={inputCls} value={form.year} onChange={(e) => set("year", Number(e.target.value))} min={2018} max={2030} />
            </Field>
            <Field label="Status">
              <select className={selectCls} value={form.status} onChange={(e) => set("status", e.target.value as ProductFormData["status"])}>
                <option value="draft">Entwurf (nicht sichtbar)</option>
                <option value="active">Aktiv (öffentlich)</option>
                <option value="in_repair">In Aufbereitung</option>
              </select>
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Beschreibung">
              <textarea
                className={`${inputCls} h-24 resize-none`}
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Kurze Produktbeschreibung für die Detailseite..."
              />
            </Field>
          </div>
        </section>

        {/* Sektion: Preise & Marge */}
        <section className="bg-card border border-border rounded-xl p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Preise & Marge</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Verkaufspreis (€)" required>
              <input type="number" className={inputCls} value={form.price || ""} onChange={(e) => set("price", Number(e.target.value))} min={0} step={1} placeholder="399" required />
            </Field>
            <Field label="Streichpreis (€)">
              <input type="number" className={inputCls} value={form.oldPrice || ""} onChange={(e) => set("oldPrice", Number(e.target.value))} min={0} step={1} placeholder="499" />
            </Field>
            <Field label="Einkaufspreis / Ankaufspreis (€)">
              <input type="number" className={inputCls} value={form.purchaseCost || ""} onChange={(e) => set("purchaseCost", Number(e.target.value))} min={0} step={1} placeholder="280" />
            </Field>
          </div>
          {form.price > 0 && form.purchaseCost > 0 && (
            <div className={`mt-3 p-3 rounded-lg text-xs font-medium ${margin >= 25 ? "bg-green-50 text-green-700 border border-green-200" : "bg-yellow-50 text-yellow-700 border border-yellow-200"}`}>
              Kalkulierte Marge: <strong>{margin}%</strong> ({form.price - form.purchaseCost} €)
              {margin < 25 && " — Warnung: unter 25% Marge"}
            </div>
          )}
        </section>

        {/* Sektion: Technische Daten */}
        <section className="bg-card border border-border rounded-xl p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Technische Daten</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Display">
              <input className={inputCls} value={form.display} onChange={(e) => set("display", e.target.value)} placeholder='6.1", OLED, 2556×1179' />
            </Field>
            <Field label="Chip / Prozessor">
              <input className={inputCls} value={form.chip} onChange={(e) => set("chip", e.target.value)} placeholder="Apple A17 Pro" />
            </Field>
            <Field label="RAM">
              <input className={inputCls} value={form.ram} onChange={(e) => set("ram", e.target.value)} placeholder="8 GB" />
            </Field>
            <Field label="Kamera">
              <input className={inputCls} value={form.kamera} onChange={(e) => set("kamera", e.target.value)} placeholder="48MP + 12MP + 12MP" />
            </Field>
            <Field label="Akku (Beschreibung)">
              <input className={inputCls} value={form.akku} onChange={(e) => set("akku", e.target.value)} placeholder="3274 mAh, 20W" />
            </Field>
            <Field label="Betriebssystem">
              <input className={inputCls} value={form.os} onChange={(e) => set("os", e.target.value)} placeholder="iOS 18.3" />
            </Field>
            <Field label="SIM">
              <input className={inputCls} value={form.sim} onChange={(e) => set("sim", e.target.value)} placeholder="Dual SIM (Nano + eSIM)" />
            </Field>
            <Field label="Akku-Kapazität (%)">
              <input type="number" className={inputCls} value={form.battery} onChange={(e) => set("battery", Number(e.target.value))} min={50} max={100} />
            </Field>
          </div>
        </section>

        {/* Sektion: Lager & Intern */}
        <section className="bg-card border border-border rounded-xl p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Lager & Interne Daten</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Lagerbestand" required>
              <input type="number" className={inputCls} value={form.stock} onChange={(e) => set("stock", Number(e.target.value))} min={0} required />
            </Field>
            <Field label="Herkunft / Lieferant">
              <select className={selectCls} value={form.supplier} onChange={(e) => set("supplier", e.target.value)}>
                {SUPPLIERS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="IMEI / Seriennummer">
              <input className={inputCls} value={form.serialNumber ?? ""} onChange={(e) => set("serialNumber", e.target.value)} placeholder="354321..." />
            </Field>
            <Field label="Badge (optional)">
              <input className={inputCls} value={form.badge ?? ""} onChange={(e) => set("badge", e.target.value)} placeholder="Top Deal, Bestseller, Neu rein" />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Interne Notizen">
              <textarea
                className={`${inputCls} h-20 resize-none`}
                value={form.internalNotes ?? ""}
                onChange={(e) => set("internalNotes", e.target.value)}
                placeholder="Nur intern sichtbar: Zustand-Details, Herkunft, Besonderheiten..."
              />
            </Field>
          </div>
        </section>

        {/* Speichern */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-foreground text-background text-sm font-semibold rounded-lg hover:bg-foreground/90 transition-colors"
          >
            <Save className="w-4 h-4" />
            {form.status === "active" ? "Speichern & Veröffentlichen" : "Als Entwurf speichern"}
          </button>
          <Link to="/admin/produkte" className="px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-secondary transition-colors">
            Abbrechen
          </Link>
          {saved && (
            <span className="text-sm text-green-600 font-medium">
              ✓ Gespeichert (Demo — noch kein Backend)
            </span>
          )}
        </div>
      </form>
    </AdminLayout>
  );
}
