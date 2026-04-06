import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { Toaster as Sonner } from "./components/ui/sonner";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import About from "./pages/About";
import AILabsPage from "./pages/AILabsPage";
import Blog from "./pages/Blog";
import Clients from "./pages/Clients";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import Privacy from "./pages/Privacy";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Work from "./pages/Work";
import Zifa from "./pages/Zifa";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/work" element={<Work />} />
            <Route path="/case-studies" element={<Work />} />
            <Route path="/ai-labs" element={<AILabsPage />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/resources" element={<Blog />} />
            <Route path="/book-demo" element={<Clients />} />
            <Route path="/contact" element={<Clients />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/zifa" element={<Zifa />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
