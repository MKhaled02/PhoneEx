import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import Index from "./pages/Index";
import Collection from "./pages/Collection";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/Cart";
import AnkaufPage from "./pages/Ankauf";
import SearchPage from "./pages/Search";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <CartDrawer />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/kollektion/:category" element={<Collection />} />
            <Route path="/produkt/:slug" element={<ProductDetail />} />
            <Route path="/warenkorb" element={<CartPage />} />
            <Route path="/ankauf" element={<AnkaufPage />} />
            <Route path="/suche" element={<SearchPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
