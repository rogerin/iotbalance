import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DashboardLayout from "./pages/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import ClientsPage from "./pages/clients/ClientsPage";
import LocationsPage from "./pages/locations/LocationsPage";
import ZonesPage from "./pages/zones/ZonesPage";
import DevicesPage from "./pages/devices/DevicesPage";
import DeviceDetailPage from "./pages/devices/DeviceDetailPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="clients" element={<ClientsPage />} />
              <Route path="locations" element={<LocationsPage />} />
              <Route path="zones" element={<ZonesPage />} />
              <Route path="devices" element={<DevicesPage />} />
              <Route path="devices/:id" element={<DeviceDetailPage />} />
              <Route path="products" element={<div className="p-6">Produtos - Em desenvolvimento</div>} />
              <Route path="reports" element={<div className="p-6">Relatórios - Em desenvolvimento</div>} />
              <Route path="settings" element={<div className="p-6">Configurações - Em desenvolvimento</div>} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
