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
import UserManagement from "./pages/admin/UserManagement";
import Analytics from "./pages/admin/Analytics";
import SecurityManagement from "./pages/admin/SecurityManagement";
import AdminLogin from "./pages/admin/AdminLogin";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";

// PAXIS User System
import PaxisLogin from "./pages/PaxisLogin";
import DashboardRouter from "./pages/DashboardRouter";
import Archetypes from "./pages/Archetypes";
import Pricing from "./pages/Pricing";
import PeaceArchitectDashboard from "./pages/dashboards/PeaceArchitectDashboard";
import TechDiplomatDashboard from "./pages/dashboards/TechDiplomatDashboard";
import GrassrootsDashboard from "./pages/dashboards/GrassrootsDashboard";
import { PaxisAuthProvider } from "./contexts/PaxisAuthContext";
import ProtectedPaxisRoute from "./components/ProtectedPaxisRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AdminAuthProvider>
          <PaxisAuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedPaxisRoute>
                    <Dashboard />
                  </ProtectedPaxisRoute>
                }
              />
              <Route
                path="/commons"
                element={
                  <ProtectedPaxisRoute>
                    <Commons />
                  </ProtectedPaxisRoute>
                }
              />
              <Route
                path="/mediation"
                element={
                  <ProtectedPaxisRoute>
                    <Mediation />
                  </ProtectedPaxisRoute>
                }
              />
              <Route
                path="/education"
                element={
                  <ProtectedPaxisRoute>
                    <Education />
                  </ProtectedPaxisRoute>
                }
              />
              <Route
                path="/governance"
                element={
                  <ProtectedPaxisRoute>
                    <Governance />
                  </ProtectedPaxisRoute>
                }
              />
              <Route
                path="/peacecoin"
                element={
                  <ProtectedPaxisRoute>
                    <PeaceCoin />
                  </ProtectedPaxisRoute>
                }
              />
              <Route path="/security" element={<Security />} />
              <Route path="/pilot" element={<Pilot />} />
              <Route path="/vr-labs" element={<VRLabs />} />
              <Route path="/ai-agents" element={<AIAgents />} />

              {/* PAXIS User Authentication */}
              <Route path="/login" element={<PaxisLogin />} />
              <Route path="/archetypes" element={<Archetypes />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/user-dashboard" element={<DashboardRouter />} />

              {/* Archetype-specific dashboards */}
              <Route
                path="/dashboard/peace-architect"
                element={<PeaceArchitectDashboard />}
              />
              <Route
                path="/dashboard/tech-diplomat"
                element={<TechDiplomatDashboard />}
              />
              <Route
                path="/dashboard/grassroots"
                element={<GrassrootsDashboard />}
              />

              {/* Admin Login Route */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Protected Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedAdminRoute>
                    <AdminLayout />
                  </ProtectedAdminRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="platform" element={<PlatformManagement />} />
                <Route
                  path="seo"
                  element={
                    <ProtectedAdminRoute requiredPermission="seo_management">
                      <SEODashboard />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="users"
                  element={
                    <ProtectedAdminRoute requiredPermission="user_management">
                      <UserManagement />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="analytics"
                  element={
                    <ProtectedAdminRoute requiredPermission="analytics_read">
                      <Analytics />
                    </ProtectedAdminRoute>
                  }
                />
                <Route path="global" element={<GlobalSettings />} />
                <Route
                  path="security"
                  element={
                    <ProtectedAdminRoute requiredPermission="security_management">
                      <SecurityManagement />
                    </ProtectedAdminRoute>
                  }
                />
              </Route>

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PaxisAuthProvider>
        </AdminAuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
