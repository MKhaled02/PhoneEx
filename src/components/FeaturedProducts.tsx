import { motion } from "framer-motion";
import { ShoppingCart, Heart } from "lucide-react";

type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  badge?: "NEU" | "SALE" | "TOP";
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "iPhone 16 Pro Max",
    brand: "Apple",
    price: 1299,
    badge: "NEU",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Galaxy S25 Ultra",
    brand: "Samsung",
    price: 1199,
    oldPrice: 1399,
    badge: "SALE",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Pixel 9 Pro",
    brand: "Google",
    price: 899,
    badge: "TOP",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "iPhone 15 (Gebraucht)",
    brand: "Apple",
    price: 549,
    oldPrice: 799,
    badge: "SALE",
    image: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "OnePlus 13",
    brand: "OnePlus",
    price: 749,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Galaxy Z Flip 6",
    brand: "Samsung",
    price: 999,
    badge: "NEU",
    image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=400&fit=crop",
  },
];

const badgeStyles: Record<string, string> = {
  NEU: "bg-badge-new text-accent-foreground",
  SALE: "bg-badge-sale text-primary-foreground",
  TOP: "bg-foreground text-background",
};

const FeaturedProducts = () => {
  return (
    <section id="produkte" className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Bestseller</h2>
        <a
          href="#alle"
          className="text-sm font-medium text-accent hover:underline"
        >
          Alle ansehen →
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Badge */}
            {product.badge && (
              <span
                className={`absolute top-2 left-2 z-10 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${badgeStyles[product.badge]}`}
              >
                {product.badge}
              </span>
            )}

            {/* Wishlist */}
            <button className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background">
              <Heart className="w-3.5 h-3.5 text-foreground" />
            </button>

            {/* Image */}
            <div className="aspect-square bg-secondary overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>

            {/* Info */}
            <div className="p-3">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                {product.brand}
              </p>
              <h3 className="text-sm font-semibold text-foreground mt-0.5 line-clamp-2 min-h-[2.5rem]">
                {product.name}
              </h3>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm font-bold text-foreground">
                  {product.price.toLocaleString("de-DE")} €
                </span>
                {product.oldPrice && (
                  <span className="text-xs text-muted-foreground line-through">
                    {product.oldPrice.toLocaleString("de-DE")} €
                  </span>
                )}
              </div>

              {/* Cart button */}
              <button className="mt-3 w-full h-8 rounded-md bg-accent text-accent-foreground text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-accent/90 transition-colors">
                <ShoppingCart className="w-3.5 h-3.5" />
                In den Warenkorb
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
