import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Commons from "./pages/Commons";
import Mediation from "./pages/Mediation";
import Education from "./pages/Education";
import Governance from "./pages/Governance";
import PeaceCoin from "./pages/PeaceCoin";
import Security from "./pages/Security";
import Pilot from "./pages/Pilot";
import VRLabs from "./pages/VRLabs";
import AIAgents from "./pages/AIAgents";
import NotFound from "./pages/NotFound";

// Admin components
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SEODashboard from "./pages/admin/SEODashboard";
import PlatformManagement from "./pages/admin/PlatformManagement";
import GlobalSettings from "./pages/admin/GlobalSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/commons" element={<Commons />} />
          <Route path="/mediation" element={<Mediation />} />
          <Route path="/education" element={<Education />} />
          <Route path="/governance" element={<Governance />} />
          <Route path="/peacecoin" element={<PeaceCoin />} />
          <Route path="/security" element={<Security />} />
          <Route path="/pilot" element={<Pilot />} />
          <Route path="/vr-labs" element={<VRLabs />} />
          <Route path="/ai-agents" element={<AIAgents />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="platform" element={<PlatformManagement />} />
            <Route path="seo" element={<SEODashboard />} />
            <Route path="global" element={<GlobalSettings />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
