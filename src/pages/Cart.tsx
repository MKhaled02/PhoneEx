import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, X, ShoppingCart, Truck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const FREE_SHIPPING = 50;

const CartPage = () => {
  const navigate = useNavigate();
  const { items, updateQty, removeItem, cartTotal, cartCount } = useCart();
  const freeShipping = cartTotal >= FREE_SHIPPING;
  const shippingCost = freeShipping ? 0 : 4.99;
  const total = cartTotal + shippingCost;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:text-foreground">Startseite</Link>
          <span>/</span>
          <span className="text-foreground font-medium">Warenkorb</span>
        </nav>

        <h1 className="text-3xl font-bold font-heading text-foreground mb-1">Warenkorb</h1>
        <p className="text-sm text-muted-foreground mb-8">
          {cartCount === 0 ? "Dein Warenkorb ist leer." : `${cartCount} Artikel`}
        </p>

        {cartCount === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <ShoppingCart className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
            <p className="text-lg text-muted-foreground mb-6">Noch nichts im Warenkorb.</p>
            <Button onClick={() => navigate("/smartphones/alle")} size="lg">
              Jetzt einkaufen <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2">
              {/* Free shipping bar */}
              <div className="px-4 py-3 rounded-xl mb-4 text-sm font-medium bg-secondary text-foreground">
                <div className="flex items-center gap-2 mb-1.5">
                  <Truck className="w-4 h-4 text-muted-foreground" />
                  {freeShipping
                    ? "Kostenloser Versand"
                    : `Noch ${(FREE_SHIPPING - cartTotal).toFixed(2)} € bis zum kostenlosen Versand`}
                </div>
                {!freeShipping && <Progress value={(cartTotal / FREE_SHIPPING) * 100} className="h-1.5" />}
              </div>

              {/* Cart items */}
              <div className="border border-border rounded-xl overflow-hidden">
                {items.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-4 p-4 border-b border-border last:border-0"
                  >
                    {/* Image */}
                    <Link to={`/produkt/${item.slug}`} className="w-20 h-20 bg-secondary rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                    </Link>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <Link to={`/produkt/${item.slug}`} className="text-sm font-semibold text-foreground hover:text-accent transition-colors">
                        {item.title}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.brand} · {item.storage} ·{" "}
                        <span className="font-medium" style={{ color: item.conditionColor }}>
                          {item.condition}
                        </span>
                      </p>
                    </div>

                    {/* Qty */}
                    <div className="flex items-center border border-border rounded-lg overflow-hidden">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-secondary">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-10 text-center text-sm font-bold">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-secondary">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right min-w-[80px]">
                      <div className="text-sm font-bold">{(item.price * item.qty).toLocaleString("de-DE")} €</div>
                      {item.qty > 1 && <div className="text-[10px] text-muted-foreground">je {item.price} €</div>}
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card border border-border rounded-xl p-6">
                <h3 className="text-base font-bold text-foreground mb-4">Bestellübersicht</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Zwischensumme</span>
                    <span className="font-medium">{cartTotal.toLocaleString("de-DE")} €</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Versand</span>
                    <span className="font-medium">
                      {freeShipping ? "Kostenlos" : `${shippingCost.toFixed(2)} €`}
                    </span>
                  </div>
                </div>
                <Separator className="mb-4" />
                <div className="flex justify-between mb-6">
                  <span className="text-base font-bold">Gesamt</span>
                  <span className="text-xl font-bold">{total.toLocaleString("de-DE")} €</span>
                </div>
                <Button className="w-full mb-3" size="lg" onClick={() => navigate("/kasse")}>
                  Zur Kasse <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                <Button variant="outline" className="w-full" onClick={() => navigate("/smartphones/alle")}>
                  Weiter einkaufen
                </Button>
                <div className="flex gap-2 justify-center mt-4">
                  {["PayPal", "Klarna", "Visa", "MC", "Apple Pay"].map((p) => (
                    <span key={p} className="text-[9px] text-muted-foreground font-medium bg-secondary px-1.5 py-0.5 rounded">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
};

export default CartPage;
