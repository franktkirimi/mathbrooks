import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { Toaster as Sonner } from "./components/ui/sonner";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import Index from "./pages/Index";

const About = lazy(() => import("./pages/About"));
const AvailableSolutions = lazy(() => import("./pages/AvailableSolutions"));
const AILabsPage = lazy(() => import("./pages/AILabsPage"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Clients = lazy(() => import("./pages/Clients"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Privacy = lazy(() => import("./pages/Privacy"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Products = lazy(() => import("./pages/Products"));
const Services = lazy(() => import("./pages/Services"));
const Things = lazy(() => import("./pages/Things"));
const ThingProject = lazy(() => import("./pages/ThingProject"));
const Work = lazy(() => import("./pages/Work"));
const Zifa = lazy(() => import("./pages/Zifa"));

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<div className="min-h-screen bg-background" role="status" aria-live="polite"><span className="sr-only">Loading page</span></div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/solutions" element={<Products />} />
              <Route path="/solutions/available" element={<AvailableSolutions />} />
              <Route path="/solutions/available/:slug" element={<ProductDetail />} />
              <Route path="/products" element={<Navigate to="/solutions" replace />} />
              <Route path="/products/:slug" element={<ProductDetail />} />
              <Route path="/services" element={<Services />} />
              <Route path="/things" element={<Things />} />
              <Route path="/things/:slug" element={<ThingProject />} />
              <Route path="/work" element={<Work />} />
              <Route path="/case-studies" element={<Work />} />
              <Route path="/ai-labs" element={<AILabsPage />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/resources" element={<Blog />} />
              <Route path="/start-trial" element={<Clients />} />
              <Route path="/book-demo" element={<Clients />} />
              <Route path="/contact" element={<Clients />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/zifa" element={<Zifa />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
