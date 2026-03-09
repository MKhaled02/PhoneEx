import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Minus, Plus, Heart, Share2, Truck, Shield, RotateCcw, CheckCircle2 } from "lucide-react";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const product = slug ? getProductBySlug(slug) : undefined;
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [liked, setLiked] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <h1 className="text-2xl font-bold mb-2">Produkt nicht gefunden</h1>
          <p className="text-muted-foreground mb-6">Dieses Produkt existiert nicht oder ist nicht mehr verfügbar.</p>
          <Button onClick={() => navigate("/smartphones/alle")}>Zurück zum Shop</Button>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const related = getRelatedProducts(product);
  const pct = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
  const totalPrice = product.price * qty;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Startseite</Link>
          <span>/</span>
          <Link to="/smartphones/alle" className="hover:text-foreground">Smartphones</Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Images */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            {/* Main image */}
            <div className="aspect-square bg-secondary rounded-2xl overflow-hidden border border-border relative">
              <img
                src={product.images[activeImg] || product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <Badge className="absolute top-4 left-4 text-xs">{product.badge}</Badge>
              )}
              <span
                className="absolute top-4 right-4 px-2.5 py-1 rounded-md text-xs font-bold text-white"
                style={{ backgroundColor: product.conditionColor }}
              >
                {product.condition}
              </span>
            </div>
            {/* Thumbnails */}
            <div className="flex gap-3 mt-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`flex-1 aspect-square rounded-xl overflow-hidden border-2 transition-colors ${
                    activeImg === i ? "border-accent" : "border-border"
                  }`}
                >
                  <img src={img} alt={`${product.title} ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right: Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
            {/* Brand & Storage */}
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1">
              {product.brand} · {product.storage} · {product.condition}
            </p>

            {/* Title */}
            <h1 className="text-2xl lg:text-3xl font-bold font-heading text-foreground mb-2">{product.title}</h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-3xl font-bold font-heading text-foreground">
                {product.price.toLocaleString("de-DE")} €
              </span>
              <span className="text-lg text-muted-foreground line-through">
                {product.oldPrice.toLocaleString("de-DE")} €
              </span>
            </div>
            <div className="flex gap-2 mb-6">
              <span className="text-xs font-medium text-muted-foreground">
                -{pct}% · Spare {product.oldPrice - product.price} €
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                inkl. MwSt.
              </span>
            </div>

            {/* Condition & Battery */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="px-4 py-3 bg-secondary rounded-xl border border-border">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Zustand</p>
                <p className="text-sm font-bold" style={{ color: product.conditionColor }}>{product.condition}</p>
              </div>
              <div className="px-4 py-3 bg-secondary rounded-xl border border-border">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Batterie</p>
                <p className="text-sm font-bold text-foreground">
                  {product.battery}%
                </p>
              </div>
            </div>

            {/* Trust Signale */}
            <div className="grid grid-cols-2 gap-3 mt-4 mb-6">
              {[
                { icon: "✓", label: "12 Monate Garantie", sub: "Auf alle Geräte" },
                { icon: "↩", label: "30 Tage Rückgabe", sub: "Kostenlos & unkompliziert" },
                { icon: "🔒", label: "SSL-verschlüsselt", sub: "Sichere Bezahlung" },
                { icon: "⚡", label: "1-3 Tage Lieferung", sub: "DHL versichert" },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-2 p-3 rounded-lg bg-secondary/50">
                  <span className="text-sm font-bold text-accent mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-foreground">{item.label}</p>
                    <p className="text-[11px] text-muted-foreground">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Qty + Add to Cart */}
            <div className="flex gap-3 mb-4">
              <div className="flex items-center border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-11 h-12 flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold text-sm">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-11 h-12 flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <Button className="flex-1 h-12 text-sm font-bold" onClick={() => addItem(product, qty)}>
                In den Warenkorb · {totalPrice.toLocaleString("de-DE")} €
              </Button>
              <button
                onClick={() => setLiked(!liked)}
                className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-colors ${
                  liked ? "border-foreground bg-secondary" : "border-border hover:bg-secondary"
                }`}
              >
                <Heart className={`w-5 h-5 ${liked ? "fill-foreground text-foreground" : "text-muted-foreground"}`} />
              </button>
            </div>

            {product.stock <= 3 && (
              <p className="text-xs text-muted-foreground font-medium mb-4">Nur noch {product.stock} Stück verfügbar</p>
            )}

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { icon: Truck, label: "Gratis Versand" },
                { icon: Shield, label: "12 Mon. Garantie" },
                { icon: RotateCcw, label: "30 Tage Rückgabe" },
                { icon: CheckCircle2, label: "42-Punkte-Check" },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary border border-border text-xs font-medium">
                  <Icon className="w-3.5 h-3.5 text-accent" />
                  {label}
                </span>
              ))}
            </div>

            <Separator className="mb-5" />

            {/* Tabs */}
            <Tabs defaultValue="description">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="description">Beschreibung</TabsTrigger>
                <TabsTrigger value="specs">Technische Daten</TabsTrigger>
                <TabsTrigger value="shipping">Versand</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="pt-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
              </TabsContent>
              <TabsContent value="specs" className="pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                  {Object.entries(product.specs).map(([key, value], i) => (
                    <div key={key} className={`flex justify-between px-3 py-2.5 text-sm ${i % 2 === 0 ? "bg-secondary/50" : ""} rounded`}>
                      <span className="text-muted-foreground capitalize">{key}</span>
                      <span className="font-medium text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="shipping" className="pt-4 text-sm text-muted-foreground leading-relaxed space-y-2">
                <p><strong className="text-foreground">Kostenloser Versand</strong> ab 50€ Bestellwert via DHL.</p>
                <p>Lieferzeit: <strong className="text-foreground">1-3 Werktage</strong> innerhalb Deutschlands.</p>
                <p><strong className="text-foreground">30 Tage Rückgaberecht</strong> — einfach und unkompliziert.</p>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-16 border-t border-border pt-10">
            <h2 className="text-xl font-bold font-heading text-foreground mb-6">Ähnliche Produkte</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
};

export default ProductDetail;
