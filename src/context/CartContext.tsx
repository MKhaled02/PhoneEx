import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import type { Product } from "@/data/products";
import { toast } from "sonner";

const CART_STORAGE_KEY = "phonix_cart";

export interface CartItem extends Product {
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, qty?: number) => void;
  removeItem: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | null>(null);

// Warenkorb aus localStorage laden
function loadCartFromStorage(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Validiere die Struktur
      if (Array.isArray(parsed)) {
        return parsed.filter(
          (item) =>
            typeof item === "object" &&
            item !== null &&
            typeof item.id === "number" &&
            typeof item.qty === "number"
        );
      }
    }
  } catch (error) {
    console.warn("Fehler beim Laden des Warenkorbs:", error);
  }
  return [];
}

// Warenkorb in localStorage speichern
function saveCartToStorage(items: CartItem[]): void {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.warn("Fehler beim Speichern des Warenkorbs:", error);
  }
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => loadCartFromStorage());
  const [isCartOpen, setCartOpen] = useState(false);

  // Speichere Warenkorb bei Änderungen
  useEffect(() => {
    saveCartToStorage(items);
  }, [items]);

  const addItem = useCallback((product: Product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { ...product, qty }];
    });
    toast.success(`${product.title} hinzugefügt`, {
      description: `${product.storage} · ${product.condition}`,
      duration: 2000,
    });
    setCartOpen(true);
  }, []);

  const removeItem = useCallback((id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQty = useCallback((id: number, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const cartCount = items.reduce((s, i) => s + i.qty, 0);
  const cartTotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQty, clearCart, cartCount, cartTotal, isCartOpen, setCartOpen }}
    >
      {children}
    </CartContext.Provider>
  );
}
