import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { Toaster as Sonner } from "./components/ui/sonner";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import About from "./pages/About";
import AvailableSolutions from "./pages/AvailableSolutions";
import AILabsPage from "./pages/AILabsPage";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Clients from "./pages/Clients";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import Privacy from "./pages/Privacy";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Things from "./pages/Things";
import ThingProject from "./pages/ThingProject";
import Work from "./pages/Work";
import Zifa from "./pages/Zifa";

const queryClient = new QueryClient();

export const AppContent = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/solutions" element={<Products />} />
          <Route path="/solutions/available" element={<AvailableSolutions />} />
          <Route path="/solutions/available/:slug" element={<ProductDetail />} />
          <Route path="/products" element={<Navigate to="/solutions" replace />} />
          <Route path="/products/:slug" element={<Navigate to="/solutions" replace />} />
          <Route path="/services" element={<Services />} />
          <Route path="/things" element={<Things />} />
          <Route path="/things/:slug" element={<ThingProject />} />
          <Route path="/work" element={<Work />} />
          <Route path="/case-studies" element={<Navigate to="/work" replace />} />
          <Route path="/ai-labs" element={<AILabsPage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/resources" element={<Navigate to="/blog" replace />} />
          <Route path="/start-trial" element={<Clients />} />
          <Route path="/book-demo" element={<Clients />} />
          <Route path="/contact" element={<Clients />} />
          <Route path="/clients" element={<Navigate to="/contact" replace />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/zifa" element={<Zifa />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Analytics />
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
