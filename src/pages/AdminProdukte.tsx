import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, Eye, EyeOff, Edit } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { ALL_PRODUCTS as PRODUCTS } from "@/data/products";
import type { ProductBrand, ProductCondition } from "@/data/products";

// ─── Condition-Badge ──────────────────────────────────────────
const CONDITION_STYLE: Record<ProductCondition, string> = {
  "Wie Neu":   "bg-green-100 text-green-700",
  "Exzellent": "bg-blue-100 text-blue-700",
  "Sehr Gut":  "bg-purple-100 text-purple-700",
  "Gut":       "bg-yellow-100 text-yellow-700",
  "Akzeptabel":"bg-red-100 text-red-700",
};

const BRANDS: ProductBrand[] = ["Apple", "Samsung", "Google", "Xiaomi", "OnePlus"];

// ─── Haupt-Komponente ──────────────────────────────────────────
export default function AdminProdukte() {
  const [search, setSearch] = useState("");
  const [filterBrand, setFilterBrand] = useState<ProductBrand | "alle">("alle");
  const [filterCondition, setFilterCondition] = useState<ProductCondition | "alle">("alle");

  const filtered = PRODUCTS.filter((p) => {
    const matchBrand = filterBrand === "alle" || p.brand === filterBrand;
    const matchCond = filterCondition === "alle" || p.condition === filterCondition;
    const q = search.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.model.toLowerCase().includes(q) || String(p.id).includes(q);
    return matchBrand && matchCond && matchSearch;
  });

  return (
    <AdminLayout
      title="Produktverwaltung"
      subtitle={`${PRODUCTS.length} Produkte im System · ${filtered.length} angezeigt`}
    >
      {/* Aktions-Leiste */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-foreground/20"
            placeholder="Produkt suchen..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none"
          value={filterBrand}
          onChange={(e) => setFilterBrand(e.target.value as ProductBrand | "alle")}
        >
          <option value="alle">Alle Marken</option>
          {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
        <select
          className="px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none"
          value={filterCondition}
          onChange={(e) => setFilterCondition(e.target.value as ProductCondition | "alle")}
        >
          <option value="alle">Alle Zustände</option>
          {(["Wie Neu", "Exzellent", "Sehr Gut", "Gut", "Akzeptabel"] as ProductCondition[]).map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <Link
          to="/admin/produkt/neu"
          className="flex items-center gap-1.5 px-4 py-2 bg-foreground text-background text-sm font-semibold rounded-lg hover:bg-foreground/90 transition-colors whitespace-nowrap"
        >
          <Plus className="w-4 h-4" /> Neues Gerät
        </Link>
      </div>

      {/* Tabelle */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-secondary/40">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Produkt</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground hidden sm:table-cell">Zustand</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Preis</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground hidden md:table-cell">Akku</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Bestand</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-10 text-muted-foreground text-sm">Keine Produkte gefunden.</td>
              </tr>
            )}
            {filtered.map((product) => (
              <tr key={product.id} className="hover:bg-secondary/20 transition-colors">
                <td className="px-4 py-3 text-xs font-mono text-muted-foreground">#{product.id}</td>
                <td className="px-4 py-3">
                  <p className="font-medium text-foreground text-sm leading-tight">{product.title}</p>
                  <p className="text-xs text-muted-foreground">{product.brand} · {product.year}</p>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${CONDITION_STYLE[product.condition]}`}>
                    {product.condition}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <p className="font-bold text-foreground">{product.price} €</p>
                  {product.oldPrice > product.price && (
                    <p className="text-xs text-muted-foreground line-through">{product.oldPrice} €</p>
                  )}
                </td>
                <td className="px-4 py-3 text-right text-xs text-muted-foreground hidden md:table-cell">
                  {product.battery}%
                </td>
                <td className="px-4 py-3 text-right">
                  <span className={`text-sm font-semibold ${product.stock === 0 ? "text-red-600" : product.stock <= 2 ? "text-orange-600" : "text-foreground"}`}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 justify-end">
                    <Link
                      to={`/produkt/${product.slug}`}
                      className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                      title="Im Shop ansehen"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                      title="Bearbeiten (Phase 2)"
                      onClick={() => alert(`Produkt #${product.id} bearbeiten – Bearbeitungs-Seite folgt in Phase 2 (Backend erforderlich).`)}
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Hinweis: Phase-2 Feature */}
      <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
        <p className="text-xs text-blue-700">
          <strong>Produkte anlegen & bearbeiten:</strong> Aktuell werden Produkte über <code className="bg-blue-100 px-1 rounded">src/data/products.ts</code> gepflegt.
          In Phase 2 (Backend-Anbindung) werden Produkte direkt über diese Oberfläche erstellt, bearbeitet und veröffentlicht.
          Das Formular dafür ist unter <strong>/admin/produkt/neu</strong> bereits vorbereitet.
        </p>
      </div>
    </AdminLayout>
  );
}
