import { useState, useMemo } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, List, SlidersHorizontal, X, ChevronDown, Battery, Check } from "lucide-react";
import {
  ALL_PRODUCTS,
  ALL_BRANDS,
  ALL_CONDITIONS,
  ALL_STORAGES,
  PRICE_RANGES,
  BATTERY_RANGES,
  type ProductBrand,
  type ProductCondition,
  type StorageSize,
  type Product,
} from "@/data/products";
import ProductCard from "@/components/ProductCard";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useCart } from "@/context/CartContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Marken-Titel für die Seite
const brandTitles: Record<string, string> = {
  alle: "Alle Smartphones",
  apple: "iPhone",
  samsung: "Samsung Galaxy",
  google: "Google Pixel",
  xiaomi: "Xiaomi",
  oneplus: "OnePlus",
};

// Sortier-Optionen
const sortOptions = [
  { value: "relevance", label: "Relevanz" },
  { value: "price_asc", label: "Preis aufsteigend" },
  { value: "price_desc", label: "Preis absteigend" },
  { value: "newest", label: "Neueste zuerst" },
  { value: "battery", label: "Beste Batterie" },
  { value: "condition", label: "Bester Zustand" },
];

const Collection = () => {
  const { brand: brandParam = "alle" } = useParams<{ brand: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter-States
  const [selectedStorages, setSelectedStorages] = useState<StorageSize[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<ProductCondition[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [minBattery, setMinBattery] = useState<number>(0);
  const [sort, setSort] = useState(searchParams.get("sort") || "relevance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Aktive Marke aus URL
  const activeBrand = brandParam.toLowerCase();
  const title = brandTitles[activeBrand] || "Smartphones";

  // Gefilterte Produkte
  const filtered = useMemo(() => {
    let products = [...ALL_PRODUCTS];

    // Nach Marke filtern
    if (activeBrand !== "alle") {
      const brandMap: Record<string, ProductBrand> = {
        apple: "Apple",
        samsung: "Samsung",
        google: "Google",
        xiaomi: "Xiaomi",
        oneplus: "OnePlus",
      };
      const brand = brandMap[activeBrand];
      if (brand) {
        products = products.filter((p) => p.brand === brand);
      }
    }

    // Nach Speicher filtern
    if (selectedStorages.length > 0) {
      products = products.filter((p) => selectedStorages.includes(p.storage));
    }

    // Nach Zustand filtern
    if (selectedConditions.length > 0) {
      products = products.filter((p) => selectedConditions.includes(p.condition));
    }

    // Nach Preis filtern
    if (selectedPriceRange) {
      const range = PRICE_RANGES.find((r) => r.label === selectedPriceRange);
      if (range) {
        products = products.filter((p) => p.price >= range.min && p.price <= range.max);
      }
    }

    // Nach Batterie filtern
    if (minBattery > 0) {
      products = products.filter((p) => p.battery >= minBattery);
    }

    // Sortieren
    switch (sort) {
      case "price_asc":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        products.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        products.sort((a, b) => b.year - a.year || b.id - a.id);
        break;
      case "battery":
        products.sort((a, b) => b.battery - a.battery);
        break;
      case "condition":
        const conditionOrder = ["Wie Neu", "Exzellent", "Sehr Gut", "Gut", "Akzeptabel"];
        products.sort(
          (a, b) => conditionOrder.indexOf(a.condition) - conditionOrder.indexOf(b.condition)
        );
        break;
      default:
        // Relevanz: Badges zuerst, dann nach ID
        products.sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0) || b.id - a.id);
    }

    return products;
  }, [activeBrand, selectedStorages, selectedConditions, selectedPriceRange, minBattery, sort]);

  // Anzahl aktiver Filter
  const activeFilterCount =
    selectedStorages.length +
    selectedConditions.length +
    (selectedPriceRange ? 1 : 0) +
    (minBattery > 0 ? 1 : 0);

  // Filter zurücksetzen
  const resetFilters = () => {
    setSelectedStorages([]);
    setSelectedConditions([]);
    setSelectedPriceRange(null);
    setMinBattery(0);
  };

  // Toggle für Multi-Select Filter
  const toggleStorage = (storage: StorageSize) => {
    setSelectedStorages((prev) =>
      prev.includes(storage) ? prev.filter((s) => s !== storage) : [...prev, storage]
    );
  };

  const toggleCondition = (condition: ProductCondition) => {
    setSelectedConditions((prev) =>
      prev.includes(condition) ? prev.filter((c) => c !== condition) : [...prev, condition]
    );
  };

  // Filter-Sidebar Komponente (wiederverwendbar für Desktop & Mobile)
  const FilterSidebar = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={isMobile ? "" : "space-y-6"}>
      <Accordion
        type="multiple"
        defaultValue={["brand", "storage", "condition", "price", "battery"]}
        className="space-y-2"
      >
        {/* Marke (nur auf Desktop wenn "alle" aktiv) */}
        {activeBrand === "alle" && (
          <AccordionItem value="brand" className="border-b-0">
            <AccordionTrigger className="text-sm font-semibold hover:no-underline py-3">
              Marke
            </AccordionTrigger>
            <AccordionContent className="pt-1 pb-3">
              <div className="space-y-1">
                {Object.entries(brandTitles)
                  .filter(([key]) => key !== "alle")
                  .map(([key, label]) => {
                    const count = ALL_PRODUCTS.filter(
                      (p) => p.brand.toLowerCase() === key || (key === "apple" && p.brand === "Apple")
                    ).length;
                    return (
                      <Link
                        key={key}
                        to={`/smartphones/${key}`}
                        className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                        onClick={() => isMobile && setMobileFiltersOpen(false)}
                      >
                        <span>{label}</span>
                        <span className="text-xs text-muted-foreground">({count})</span>
                      </Link>
                    );
                  })}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Speicher */}
        <AccordionItem value="storage" className="border-b-0">
          <AccordionTrigger className="text-sm font-semibold hover:no-underline py-3">
            Speicher
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-3">
            <div className="flex flex-wrap gap-2">
              {ALL_STORAGES.map((storage) => {
                const isSelected = selectedStorages.includes(storage);
                const count = filtered.filter((p) => p.storage === storage).length;
                return (
                  <button
                    key={storage}
                    onClick={() => toggleStorage(storage)}
                    disabled={count === 0 && !isSelected}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      isSelected
                        ? "bg-foreground text-background"
                        : count > 0
                        ? "bg-secondary text-foreground hover:bg-secondary/80"
                        : "bg-secondary/50 text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    {storage}
                  </button>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Zustand */}
        <AccordionItem value="condition" className="border-b-0">
          <AccordionTrigger className="text-sm font-semibold hover:no-underline py-3">
            Zustand
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-3">
            <div className="space-y-1">
              {ALL_CONDITIONS.map((condition) => {
                const isSelected = selectedConditions.includes(condition);
                return (
                  <button
                    key={condition}
                    onClick={() => toggleCondition(condition)}
                    className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                      isSelected
                        ? "bg-secondary text-foreground font-medium"
                        : "text-muted-foreground hover:bg-secondary/50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor:
                            condition === "Wie Neu"
                              ? "#16a34a"
                              : condition === "Exzellent"
                              ? "#2563eb"
                              : condition === "Sehr Gut"
                              ? "#7c3aed"
                              : condition === "Gut"
                              ? "#d97706"
                              : "#dc2626",
                        }}
                      />
                      {condition}
                    </span>
                    {isSelected && <Check className="w-4 h-4" />}
                  </button>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Preis */}
        <AccordionItem value="price" className="border-b-0">
          <AccordionTrigger className="text-sm font-semibold hover:no-underline py-3">
            Preis
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-3">
            <div className="space-y-1">
              {PRICE_RANGES.map((range) => {
                const isSelected = selectedPriceRange === range.label;
                return (
                  <button
                    key={range.label}
                    onClick={() => setSelectedPriceRange(isSelected ? null : range.label)}
                    className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                      isSelected
                        ? "bg-secondary text-foreground font-medium"
                        : "text-muted-foreground hover:bg-secondary/50"
                    }`}
                  >
                    <span>{range.label}</span>
                    {isSelected && <Check className="w-4 h-4" />}
                  </button>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Batterie */}
        <AccordionItem value="battery" className="border-b-0">
          <AccordionTrigger className="text-sm font-semibold hover:no-underline py-3">
            <span className="flex items-center gap-2">
              <Battery className="w-4 h-4" />
              Batterie-Zustand
            </span>
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-3">
            <div className="space-y-1">
              {BATTERY_RANGES.map((range) => {
                const isSelected = minBattery === range.min;
                return (
                  <button
                    key={range.label}
                    onClick={() => setMinBattery(isSelected ? 0 : range.min)}
                    className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                      isSelected
                        ? "bg-secondary text-foreground font-medium"
                        : "text-muted-foreground hover:bg-secondary/50"
                    }`}
                  >
                    <span>{range.label}</span>
                    {isSelected && <Check className="w-4 h-4" />}
                  </button>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Reset Button */}
      {activeFilterCount > 0 && (
        <button
          onClick={resetFilters}
          className="w-full mt-4 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/10 rounded-lg transition-colors"
        >
          Filter zurücksetzen ({activeFilterCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:text-foreground transition-colors">
            Startseite
          </Link>
          <span>/</span>
          <Link to="/smartphones/alle" className="hover:text-foreground transition-colors">
            Smartphones
          </Link>
          {activeBrand !== "alle" && (
            <>
              <span>/</span>
              <span className="text-foreground font-medium">{title}</span>
            </>
          )}
        </nav>

        {/* Title + Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold font-heading text-foreground">{title}</h1>
            <p className="text-sm text-muted-foreground mt-1">{filtered.length} Produkte</p>
          </div>
          <div className="flex items-center gap-2">
            {/* Mobile Filter Button */}
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <button className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-secondary transition-colors">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filter
                  {activeFilterCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[350px]">
                <SheetHeader>
                  <SheetTitle>Filter</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterSidebar isMobile />
                </div>
              </SheetContent>
            </Sheet>

            {/* Sort Dropdown */}
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-[180px] h-10">
                <SelectValue placeholder="Sortierung" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* View Toggle */}
            <button
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition-colors"
            >
              {viewMode === "grid" ? (
                <List className="w-4 h-4" />
              ) : (
                <LayoutGrid className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSidebar />
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            {/* Active Filters Pills */}
            <AnimatePresence>
              {activeFilterCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap gap-2 mb-4"
                >
                  {selectedStorages.map((storage) => (
                    <span
                      key={storage}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary text-xs font-medium"
                    >
                      {storage}
                      <button
                        onClick={() => toggleStorage(storage)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {selectedConditions.map((condition) => (
                    <span
                      key={condition}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary text-xs font-medium"
                    >
                      {condition}
                      <button
                        onClick={() => toggleCondition(condition)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {selectedPriceRange && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary text-xs font-medium">
                      {selectedPriceRange}
                      <button
                        onClick={() => setSelectedPriceRange(null)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {minBattery > 0 && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary text-xs font-medium">
                      🔋 {minBattery}%+
                      <button
                        onClick={() => setMinBattery(0)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  <button
                    onClick={resetFilters}
                    className="text-xs text-accent hover:underline font-medium"
                  >
                    Alle zurücksetzen
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* No Results */}
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <SlidersHorizontal className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-lg font-medium text-foreground mb-1">Keine Produkte gefunden</p>
                <p className="text-muted-foreground text-sm mb-4">
                  Versuche andere Filter-Kombinationen
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
                >
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

// List View Card
function ListCard({ product, index }: { product: Product; index: number }) {
  const { addItem } = useCart();
  const pct = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03 }}
    >
      <Link
        to={`/produkt/${product.slug}`}
        className="flex bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow"
      >
        <div className="w-32 sm:w-40 bg-secondary flex items-center justify-center flex-shrink-0 relative">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover"
          />
          <span
            className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase text-white"
            style={{ backgroundColor: product.conditionColor }}
          >
            {product.condition}
          </span>
        </div>
        <div className="flex-1 p-4 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
              {product.brand} · {product.storage}
            </p>
            <h3 className="text-sm font-semibold text-foreground mt-0.5 truncate">
              {product.title}
            </h3>
            <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
              <span>Akku {product.battery}%</span>
              {product.stock <= 3 && (
                <span className="font-medium">Nur {product.stock}</span>
              )}
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-lg font-bold text-foreground">{product.price} €</div>
            <div className="text-xs text-muted-foreground line-through">{product.oldPrice} €</div>
            <span className="text-[10px] font-medium text-muted-foreground">
              -{pct}%
            </span>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addItem(product);
              }}
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
