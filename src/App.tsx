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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
