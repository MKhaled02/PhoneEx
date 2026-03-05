import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const badgeStyles: Record<string, string> = {
  "Top Deal": "bg-accent text-accent-foreground",
  "Bestseller": "bg-foreground text-background",
  "Preis-Hit": "bg-badge-sale text-white",
  "Neu Rein": "bg-badge-new text-white",
  "Preis-Tipp": "bg-emerald-600 text-white",
  "Budget Pick": "bg-amber-600 text-white",
};

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [imgIdx, setImgIdx] = useState(0);
  const [liked, setLiked] = useState(false);

  const savings = product.oldPrice - product.price;
  const pct = Math.round((savings / product.oldPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/produkt/${product.slug}`)}
    >
      {/* Badge */}
      {product.badge && (
        <span
          className={`absolute top-2 left-2 z-10 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
            badgeStyles[product.badge] || "bg-foreground text-background"
          }`}
        >
          {product.badge}
        </span>
      )}

      {/* Condition Badge */}
      <span
        className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded text-[10px] font-bold uppercase text-white"
        style={{ backgroundColor: product.conditionColor }}
      >
        {product.condition}
      </span>

      {/* Wishlist */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setLiked(!liked);
        }}
        className="absolute top-10 right-2 z-10 w-7 h-7 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
      >
        <Heart className={`w-3.5 h-3.5 ${liked ? "fill-red-500 text-red-500" : "text-foreground"}`} />
      </button>

      {/* Image */}
      <div
        className="aspect-square bg-secondary overflow-hidden relative"
        onMouseEnter={() => product.images.length > 1 && setImgIdx(1)}
        onMouseLeave={() => setImgIdx(0)}
      >
        <img
          src={product.images[imgIdx] || product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Quick Buy overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-foreground/90 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addItem(product);
            }}
            className="w-full h-8 rounded-md bg-background text-foreground text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-background/90 transition-colors"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            In den Warenkorb
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
            {product.brand} · {product.storage}
          </p>
          {product.battery && (
            <span
              className={`text-[10px] font-semibold ${
                product.battery >= 90 ? "text-emerald-600" : product.battery >= 80 ? "text-amber-600" : "text-red-600"
              }`}
            >
              🔋{product.battery}%
            </span>
          )}
        </div>
        <h3 className="text-sm font-semibold text-foreground line-clamp-2 min-h-[2.5rem]">{product.title}</h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm font-bold text-foreground">{product.price.toLocaleString("de-DE")} €</span>
          <span className="text-xs text-muted-foreground line-through">
            {product.oldPrice.toLocaleString("de-DE")} €
          </span>
          <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">-{pct}%</span>
        </div>
        {product.stock <= 3 && (
          <p className="text-[10px] text-red-600 font-semibold mt-1.5">⚡ Nur noch {product.stock} verfügbar</p>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
