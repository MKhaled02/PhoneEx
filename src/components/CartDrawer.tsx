import { useNavigate } from "react-router-dom";
import { X, Minus, Plus, ShoppingCart, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

const FREE_SHIPPING_THRESHOLD = 50;

const CartDrawer = () => {
  const navigate = useNavigate();
  const { items, updateQty, removeItem, cartCount, cartTotal, isCartOpen, setCartOpen } = useCart();
  const freeShipping = cartTotal >= FREE_SHIPPING_THRESHOLD;
  const shippingProgress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="flex flex-col w-full sm:max-w-md p-0">
        <SheetHeader className="px-5 pt-5 pb-3">
          <SheetTitle className="flex items-center gap-2 text-base">
            <ShoppingCart className="w-5 h-5" />
            Warenkorb ({cartCount})
          </SheetTitle>
        </SheetHeader>

        {/* Free shipping bar */}
        {cartCount > 0 && (
          <div className={`mx-5 px-3 py-2 rounded-lg text-xs font-medium ${freeShipping ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
            <div className="flex items-center gap-1.5 mb-1.5">
              <Truck className="w-3.5 h-3.5" />
              {freeShipping
                ? "Kostenloser Versand!"
                : `Noch ${(FREE_SHIPPING_THRESHOLD - cartTotal).toFixed(2)} € bis zum Gratis-Versand`}
            </div>
            {!freeShipping && <Progress value={shippingProgress} className="h-1.5" />}
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart className="w-12 h-12 text-muted-foreground/30 mb-3" />
              <p className="text-sm text-muted-foreground">Dein Warenkorb ist leer.</p>
              <Button variant="outline" className="mt-4" onClick={() => { setCartOpen(false); navigate("/kollektion/alle"); }}>
                Jetzt einkaufen
              </Button>
            </div>
          ) : (
            <div className="space-y-0">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 py-3 border-b border-border last:border-0">
                  <div
                    onClick={() => { setCartOpen(false); navigate(`/produkt/${item.slug}`); }}
                    className="w-16 h-16 bg-secondary rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
                  >
                    <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4
                      onClick={() => { setCartOpen(false); navigate(`/produkt/${item.slug}`); }}
                      className="text-xs font-semibold text-foreground truncate cursor-pointer hover:text-accent"
                    >
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {item.storage} ·{" "}
                      <span style={{ color: item.conditionColor }} className="font-semibold">
                        {item.condition}
                      </span>
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-border rounded-md overflow-hidden">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-secondary transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-secondary transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-sm font-bold">{(item.price * item.qty).toLocaleString("de-DE")} €</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="self-start w-6 h-6 rounded-md flex items-center justify-center text-muted-foreground hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-4 border-t border-border">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-muted-foreground font-medium">Gesamt</span>
              <span className="text-lg font-bold">{cartTotal.toLocaleString("de-DE")} €</span>
            </div>
            <Button
              className="w-full mb-2"
              onClick={() => { setCartOpen(false); navigate("/warenkorb"); }}
            >
              Zum Warenkorb →
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setCartOpen(false)}
            >
              Weiter einkaufen
            </Button>
            <div className="flex gap-2 justify-center mt-3">
              {["PayPal", "Klarna", "Visa", "MC"].map((p) => (
                <span key={p} className="text-[9px] font-medium text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
                  {p}
                </span>
              ))}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
