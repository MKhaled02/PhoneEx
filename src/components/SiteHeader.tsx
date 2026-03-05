import { Search, User, ShoppingCart, Phone, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Smartphones", href: "#smartphones" },
  { label: "Tablets", href: "#tablets" },
  { label: "Zubehör", href: "#zubehoer" },
  { label: "Smartwatches", href: "#smartwatches" },
  { label: "Ankauf", href: "#ankauf" },
  { label: "Reparatur", href: "#reparatur" },
];

const SiteHeader = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      {/* Top header */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <Phone className="w-4 h-4 text-accent-foreground" />
          </div>
          <span className="font-heading text-xl font-bold tracking-tight text-foreground">
            PHONIX
          </span>
        </a>

        {/* Search bar - desktop */}
        <div className="hidden md:flex flex-1 max-w-xl">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Was suchst du?"
              className="w-full h-10 pl-4 pr-12 rounded-full border border-border bg-secondary text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button className="absolute right-1 top-1 h-8 w-8 rounded-full bg-accent flex items-center justify-center hover:bg-accent/90 transition-colors">
              <Search className="w-4 h-4 text-accent-foreground" />
            </button>
          </div>
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="w-5 h-5 text-foreground" />
          </button>
          <a href="#konto" className="p-2 hover:bg-secondary rounded-lg transition-colors hidden sm:block">
            <User className="w-5 h-5 text-foreground" />
          </a>
          <a href="#warenkorb" className="p-2 hover:bg-secondary rounded-lg transition-colors relative">
            <ShoppingCart className="w-5 h-5 text-foreground" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[10px] flex items-center justify-center font-bold">
              0
            </span>
          </a>
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
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Was suchst du?"
              className="w-full h-10 pl-4 pr-12 rounded-full border border-border bg-secondary text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              autoFocus
            />
            <button className="absolute right-1 top-1 h-8 w-8 rounded-full bg-accent flex items-center justify-center">
              <Search className="w-4 h-4 text-accent-foreground" />
            </button>
          </div>
        </div>
      )}

      {/* Navigation - desktop */}
      <nav className="hidden md:block border-t border-border">
        <div className="container mx-auto px-4">
          <ul className="flex items-center justify-center gap-8 py-2.5">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-sm font-medium text-foreground hover:text-accent transition-colors"
                >
                  {item.label}
                </a>
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
                <a
                  href={item.href}
                  className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default SiteHeader;
