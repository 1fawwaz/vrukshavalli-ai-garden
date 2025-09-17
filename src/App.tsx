import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import CategoryPage from "@/pages/CategoryPage";
import PlantDetailPage from "@/pages/PlantDetailPage";
import CartPage from "@/pages/CartPage";
import CustomerDashboard from "@/pages/CustomerDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background flex flex-col">
          <Navigation cartItems={0} />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/plant/:id" element={<PlantDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/account" element={<CustomerDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
