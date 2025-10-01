import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { Outlet } from "react-router-dom";
import { loadMockData } from "@/lib/mockData";
import { useState } from "react";

const DashboardLayout = () => {
  const [data] = useState(loadMockData());
  const activeAlerts = data.alerts.filter(a => a.status === "open");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header alertCount={activeAlerts.length} />
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
