import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";
import { searchProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const results = useMemo(() => searchProducts(query), [query]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container mx-auto px-4 py-6">
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:text-foreground">Startseite</Link>
          <span>/</span>
          <span className="text-foreground font-medium">Suche: „{query}"</span>
        </nav>

        <h1 className="text-3xl font-bold font-heading text-foreground mb-1">
          Suchergebnisse für „{query}"
        </h1>
        <p className="text-sm text-muted-foreground mb-8">{results.length} Ergebnisse</p>

        {results.length === 0 ? (
          <div className="text-center py-20">
            <SearchIcon className="w-14 h-14 text-muted-foreground/20 mx-auto mb-4" />
            <p className="text-lg text-muted-foreground mb-6">Keine Ergebnisse für „{query}".</p>
            <Button asChild>
              <Link to="/kollektion/alle">Alle Produkte anzeigen</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {results.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
};

export default SearchPage;
