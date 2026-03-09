import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Package, RefreshCw, ShoppingCart,
  Plus, ArrowLeft, AlertCircle
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/produkte", label: "Produkte", icon: Package },
  { href: "/admin/ankauf", label: "Ankauf-Anfragen", icon: RefreshCw },
  { href: "/admin/bestellungen", label: "Bestellungen", icon: ShoppingCart },
];

export default function AdminLayout({ children, title, subtitle }: AdminLayoutProps) {
  const location = useLocation();

  const isActive = (href: string, exact?: boolean) =>
    exact ? location.pathname === href : location.pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-secondary/30 flex flex-col">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="font-heading text-xl font-bold text-foreground">PHONIX</Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm font-semibold text-foreground">Admin</span>
            <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 text-xs font-medium">
              Demo
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Zur Website
            </Link>
            <Link to="/admin/produkt/neu" className="flex items-center gap-1.5 px-3 py-1.5 bg-foreground text-background text-sm font-medium rounded-lg hover:bg-foreground/90 transition-colors">
              <Plus className="w-3.5 h-3.5" /> Neues Gerät
            </Link>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* Sidebar */}
        <nav className="w-56 shrink-0 py-6 px-3 border-r border-border bg-background hidden md:block">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const active = isActive(item.href, item.exact);
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 p-3 rounded-lg bg-orange-50 border border-orange-200">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-orange-600 mt-0.5 shrink-0" />
              <p className="text-xs text-orange-700">
                Demo-Modus: Alle Daten sind temporär (Session-basiert). Für echten Betrieb Backend anbinden.
              </p>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1 px-4 py-6 md:px-8 overflow-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
