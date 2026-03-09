import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { AnkaufProvider } from "@/context/AnkaufContext";
import CartDrawer from "@/components/CartDrawer";
import CookieConsent from "@/components/CookieConsent";
import Index from "./pages/Index";
import Collection from "./pages/Collection";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import AnkaufPage from "./pages/Ankauf";
import SearchPage from "./pages/Search";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import AGB from "./pages/AGB";
import Widerruf from "./pages/Widerruf";
import FAQ from "./pages/FAQ";
import Kontakt from "./pages/Kontakt";
import Admin from "./pages/Admin";
import AdminAnkauf from "./pages/AdminAnkauf";
import AdminBestellungen from "./pages/AdminBestellungen";
import AdminProdukte from "./pages/AdminProdukte";
import AdminProduktNeu from "./pages/AdminProduktNeu";
import Konto from "./pages/Konto";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <AnkaufProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <CartDrawer />
          <CookieConsent />
          <Routes>
            <Route path="/" element={<Index />} />
            {/* Neue Marken-basierte Routes */}
            <Route path="/smartphones/:brand" element={<Collection />} />
            <Route path="/smartphones" element={<Navigate to="/smartphones/alle" replace />} />
            {/* Alte Routes als Redirects (SEO-freundlich) */}
            <Route path="/kollektion/alle" element={<Navigate to="/smartphones/alle" replace />} />
            <Route path="/kollektion/premium" element={<Navigate to="/smartphones/apple" replace />} />
            <Route path="/kollektion/midrange" element={<Navigate to="/smartphones/samsung" replace />} />
            <Route path="/kollektion/budget" element={<Navigate to="/smartphones/alle" replace />} />
            <Route path="/kollektion/:category" element={<Navigate to="/smartphones/alle" replace />} />
            {/* Produktdetails */}
            <Route path="/produkt/:slug" element={<ProductDetail />} />
            {/* Shop-Funktionen */}
            <Route path="/warenkorb" element={<CartPage />} />
            <Route path="/kasse" element={<Checkout />} />
            <Route path="/bestellung-bestaetigt" element={<OrderConfirmation />} />
            <Route path="/ankauf" element={<AnkaufPage />} />
            <Route path="/suche" element={<SearchPage />} />
            {/* Legal & Info */}
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            <Route path="/agb" element={<AGB />} />
            <Route path="/widerruf" element={<Widerruf />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/kontakt" element={<Kontakt />} />
            {/* Konto */}
            <Route path="/konto" element={<Konto />} />
            {/* Admin */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/ankauf" element={<AdminAnkauf />} />
            <Route path="/admin/bestellungen" element={<AdminBestellungen />} />
            <Route path="/admin/produkte" element={<AdminProdukte />} />
            <Route path="/admin/produkt/neu" element={<AdminProduktNeu />} />
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </AnkaufProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
