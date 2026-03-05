import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/data/products";

interface FeaturedProductsProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllHref?: string;
  viewAllLabel?: string;
}

const FeaturedProducts = ({
  title,
  subtitle,
  products,
  viewAllHref,
  viewAllLabel = "Alle ansehen",
}: FeaturedProductsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => scrollRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex items-end justify-between mb-5">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-foreground">{title}</h2>
          {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll(-1)}
            className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll(1)}
            className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          {viewAllHref && (
            <Link
              to={viewAllHref}
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline ml-2"
            >
              {viewAllLabel} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>

      {/* Scrollable product row */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", scrollSnapType: "x mandatory" }}
      >
        {products.map((product, i) => (
          <div key={product.id} className="min-w-[220px] max-w-[220px] flex-shrink-0" style={{ scrollSnapAlign: "start" }}>
            <ProductCard product={product} index={i} />
          </div>
        ))}
        {/* "View all" card */}
        {viewAllHref && (
          <Link
            to={viewAllHref}
            className="min-w-[220px] max-w-[220px] flex-shrink-0 bg-secondary border border-border rounded-xl flex flex-col items-center justify-center gap-3 hover:bg-secondary/80 transition-colors"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="w-12 h-12 rounded-full bg-border flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </div>
            <span className="text-sm font-semibold text-foreground">{viewAllLabel}</span>
          </Link>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
