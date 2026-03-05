import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { ALL_PRODUCTS, ALL_BRANDS, ALL_CONDITIONS, type ProductCategory } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useCart } from "@/context/CartContext";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const categoryTitles: Record<string, string> = {
  alle: "Alle Smartphones",
  premium: "Premium Smartphones",
  midrange: "Mittelklasse",
  budget: "Budget Deals",
};

const Collection = () => {
  const { category = "alle" } = useParams<{ category: string }>();
  const [brand, setBrand] = useState("Alle");
  const [condition, setCondition] = useState("Alle");
  const [sort, setSort] = useState("relevance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const title = categoryTitles[category] || "Smartphones";

  const filtered = useMemo(() => {
    let products = category === "alle"
      ? ALL_PRODUCTS
      : ALL_PRODUCTS.filter((p) => p.category === category);
    if (brand !== "Alle") products = products.filter((p) => p.brand === brand);
    if (condition !== "Alle") products = products.filter((p) => p.condition === condition);
    if (sort === "price_asc") products = [...products].sort((a, b) => a.price - b.price);
    if (sort === "price_desc") products = [...products].sort((a, b) => b.price - a.price);
    if (sort === "newest") products = [...products].sort((a, b) => b.id - a.id);
    return products;
  }, [category, brand, condition, sort]);

  const resetFilters = () => { setBrand("Alle"); setCondition("Alle"); };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:text-foreground transition-colors">Startseite</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{title}</span>
        </nav>

        {/* Title + Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold font-heading text-foreground">{title}</h1>
            <p className="text-sm text-muted-foreground mt-1">{filtered.length} Produkte</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-[160px] h-9 text-xs">
                <SelectValue placeholder="Sortierung" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevanz</SelectItem>
                <SelectItem value="price_asc">Preis aufsteigend</SelectItem>
                <SelectItem value="price_desc">Preis absteigend</SelectItem>
                <SelectItem value="newest">Neueste zuerst</SelectItem>
              </SelectContent>
            </Select>
            <button
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition-colors"
            >
              {viewMode === "grid" ? <List className="w-4 h-4" /> : <LayoutGrid className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-56 flex-shrink-0 space-y-6">
            {/* Category */}
            <div>
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">Kategorie</h4>
              {Object.entries(categoryTitles).map(([key, label]) => (
                <Link
                  key={key}
                  to={`/kollektion/${key}`}
                  className={`block px-3 py-2 rounded-lg text-sm transition-colors mb-0.5 ${
                    category === key ? "bg-secondary text-foreground font-semibold" : "text-muted-foreground hover:bg-secondary/50"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Brand */}
            <div>
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">Marke</h4>
              {["Alle", ...ALL_BRANDS].map((b) => (
                <button
                  key={b}
                  onClick={() => setBrand(b)}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors mb-0.5 ${
                    brand === b ? "bg-secondary text-foreground font-semibold" : "text-muted-foreground hover:bg-secondary/50"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>

            {/* Condition */}
            <div>
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">Zustand</h4>
              {["Alle", ...ALL_CONDITIONS].map((c) => (
                <button
                  key={c}
                  onClick={() => setCondition(c)}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors mb-0.5 ${
                    condition === c ? "bg-secondary text-foreground font-semibold" : "text-muted-foreground hover:bg-secondary/50"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            {/* Active filters - mobile */}
            {(brand !== "Alle" || condition !== "Alle") && (
              <div className="flex flex-wrap gap-2 mb-4">
                {brand !== "Alle" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary text-xs font-medium">
                    {brand}
                    <button onClick={() => setBrand("Alle")} className="ml-1 hover:text-destructive">×</button>
                  </span>
                )}
                {condition !== "Alle" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary text-xs font-medium">
                    {condition}
                    <button onClick={() => setCondition("Alle")} className="ml-1 hover:text-destructive">×</button>
                  </span>
                )}
                <button onClick={resetFilters} className="text-xs text-accent hover:underline">
                  Alle zurücksetzen
                </button>
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <SlidersHorizontal className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground">Keine Produkte gefunden.</p>
                <button onClick={resetFilters} className="mt-3 text-sm text-accent hover:underline font-medium">
                  Filter zurücksetzen
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
                    : "flex flex-col gap-3"
                }
              >
                {filtered.map((product, i) =>
                  viewMode === "grid" ? (
                    <ProductCard key={product.id} product={product} index={i} />
                  ) : (
                    <ListCard key={product.id} product={product} index={i} />
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

function ListCard({ product, index }: { product: any; index: number }) {
  const { addItem } = useCart();
  const pct = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
    >
      <Link to={`/produkt/${product.slug}`} className="flex bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
        <div className="w-32 sm:w-40 bg-secondary flex items-center justify-center flex-shrink-0 relative">
          <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
          <span
            className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase text-white"
            style={{ backgroundColor: product.conditionColor }}
          >
            {product.condition}
          </span>
        </div>
        <div className="flex-1 p-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{product.brand} · {product.storage}</p>
            <h3 className="text-sm font-semibold text-foreground mt-0.5">{product.title}</h3>
            <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
              <span>🔋 {product.battery}%</span>
              {product.stock <= 3 && <span className="text-red-600 font-medium">⚡ Nur {product.stock}</span>}
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-lg font-bold text-foreground">{product.price} €</div>
            <div className="text-xs text-muted-foreground line-through">{product.oldPrice} €</div>
            <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">-{pct}%</span>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); addItem(product); }}
              className="mt-2 block w-full px-3 py-1.5 rounded-md bg-accent text-accent-foreground text-xs font-semibold hover:bg-accent/90 transition-colors"
            >
              In den Warenkorb
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default Collection;
