import { Search, User, ShoppingCart, Phone, Menu, X, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const categoryNavItems = [
  { label: "Alle Produkte", href: "/smartphones/alle" },
  { label: "iPhone", href: "/smartphones/apple" },
  { label: "Samsung", href: "/smartphones/samsung" },
  { label: "Google", href: "/smartphones/google" },
  { label: "Xiaomi", href: "/smartphones/xiaomi" },
  { label: "OnePlus", href: "/smartphones/oneplus" },
];

const serviceNavItems = [
  { label: "Ankauf", href: "/ankauf", highlight: true },
  { label: "Mein Konto", href: "/konto", highlight: false },
  { label: "FAQ", href: "/faq" },
  { label: "Kontakt", href: "/kontakt" },
];

const SiteHeader = () => {
  const navigate = useNavigate();
  const { cartCount, setCartOpen } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/suche?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="hidden md:block border-b border-border bg-secondary/60">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-6">
            <p className="inline-flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5" />
              Kostenloser Versand ab 50 €
            </p>
            <p className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              12 Monate Garantie
            </p>
            <p className="inline-flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5" />
              30 Tage kostenlos testen
            </p>
          </div>
          <div className="flex items-center gap-5">
            {serviceNavItems.map((item) => (
              <Link key={item.label} to={item.href} className="hover:text-foreground transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-foreground flex items-center justify-center">
            <Phone className="w-4 h-4 text-background" />
          </div>
          <div className="leading-tight">
            <span className="font-heading text-xl font-bold tracking-tight text-foreground block">PHONIX</span>
            <span className="hidden sm:block text-[11px] text-muted-foreground">Refurbished Smartphones</span>
          </div>
        </Link>

        <div className="hidden md:flex flex-1 max-w-xl">
          <form onSubmit={handleSearch} className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nach Modell, Marke oder Speicher suchen..."
              className="w-full h-11 pl-4 pr-12 rounded-xl border border-border bg-secondary text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 h-8 w-8 rounded-lg bg-foreground flex items-center justify-center hover:bg-foreground/90 transition-colors"
            >
              <Search className="w-4 h-4 text-background" />
            </button>
          </form>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Suche öffnen"
          >
            <Search className="w-5 h-5 text-foreground" />
          </button>
          <Link to="/konto" className="hidden sm:block p-2 hover:bg-secondary rounded-lg transition-colors" aria-label="Mein Konto">
            <User className="w-5 h-5 text-foreground" />
          </Link>
          <button
            onClick={() => setCartOpen(true)}
            className="p-2 hover:bg-secondary rounded-lg transition-colors relative"
            aria-label="Warenkorb öffnen"
          >
            <ShoppingCart className="w-5 h-5 text-foreground" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] rounded-full bg-accent text-accent-foreground text-[10px] flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
          <button
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menü öffnen"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="md:hidden px-4 pb-3">
          <form onSubmit={handleSearch} className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nach Modell oder Marke suchen..."
              className="w-full h-10 pl-4 pr-12 rounded-xl border border-border bg-secondary text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              autoFocus
            />
            <button
              type="submit"
              className="absolute right-1 top-1 h-8 w-8 rounded-lg bg-foreground flex items-center justify-center"
            >
              <Search className="w-4 h-4 text-background" />
            </button>
          </form>
        </div>
      )}

      <nav className="hidden md:block border-t border-border">
        <div className="container mx-auto px-4">
          <ul className="flex items-center justify-between gap-1 py-2 overflow-x-auto">
            {categoryNavItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className="px-4 py-1.5 rounded-md text-sm font-medium transition-colors text-foreground hover:bg-secondary whitespace-nowrap"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/ankauf"
                className="px-4 py-1.5 rounded-md text-sm font-medium transition-colors bg-foreground text-background hover:bg-foreground/90 whitespace-nowrap"
              >
                Handy verkaufen
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-border bg-background">
          <ul className="flex flex-col py-2">
            {[...categoryNavItems, ...serviceNavItems].map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={`block px-4 py-3 text-sm font-medium transition-colors ${
                    item.highlight ? "text-foreground font-bold" : "text-foreground hover:bg-secondary"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default SiteHeader;
