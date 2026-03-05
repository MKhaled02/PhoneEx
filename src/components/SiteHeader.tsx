import { Search, User, ShoppingCart, Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const navItems = [
  { label: "Smartphones", href: "/kollektion/alle" },
  { label: "Premium", href: "/kollektion/premium" },
  { label: "Midrange", href: "/kollektion/midrange" },
  { label: "Budget", href: "/kollektion/budget" },
  { label: "Ankauf", href: "/ankauf", highlight: true },
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
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      {/* Top header */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <Phone className="w-4 h-4 text-accent-foreground" />
          </div>
          <span className="font-heading text-xl font-bold tracking-tight text-foreground">PHONIX</span>
        </Link>

        {/* Search bar - desktop */}
        <div className="hidden md:flex flex-1 max-w-xl">
          <form onSubmit={handleSearch} className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Smartphone suchen..."
              className="w-full h-10 pl-4 pr-12 rounded-full border border-border bg-secondary text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 h-8 w-8 rounded-full bg-accent flex items-center justify-center hover:bg-accent/90 transition-colors"
            >
              <Search className="w-4 h-4 text-accent-foreground" />
            </button>
          </form>
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-2">
          <button
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="w-5 h-5 text-foreground" />
          </button>
          <Link to="/warenkorb" className="hidden sm:block p-2 hover:bg-secondary rounded-lg transition-colors">
            <User className="w-5 h-5 text-foreground" />
          </Link>
          <button
            onClick={() => setCartOpen(true)}
            className="p-2 hover:bg-secondary rounded-lg transition-colors relative"
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
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile search */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-3">
          <form onSubmit={handleSearch} className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Smartphone suchen..."
              className="w-full h-10 pl-4 pr-12 rounded-full border border-border bg-secondary text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              autoFocus
            />
            <button
              type="submit"
              className="absolute right-1 top-1 h-8 w-8 rounded-full bg-accent flex items-center justify-center"
            >
              <Search className="w-4 h-4 text-accent-foreground" />
            </button>
          </form>
        </div>
      )}

      {/* Navigation - desktop */}
      <nav className="hidden md:block border-t border-border">
        <div className="container mx-auto px-4">
          <ul className="flex items-center justify-center gap-1 py-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    item.highlight
                      ? "bg-foreground text-background hover:bg-foreground/90"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  {item.highlight && <span className="mr-1">💰</span>}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-border bg-background">
          <ul className="flex flex-col py-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={`block px-4 py-3 text-sm font-medium transition-colors ${
                    item.highlight ? "text-accent font-bold" : "text-foreground hover:bg-secondary"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.highlight && <span className="mr-1">💰</span>}
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
