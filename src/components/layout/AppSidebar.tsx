import { Building2, Package, Activity, BarChart3, Settings, Home } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Clientes", url: "/dashboard/clients", icon: Building2 },
  { title: "Dispositivos", url: "/dashboard/devices", icon: Activity },
  { title: "Produtos", url: "/dashboard/products", icon: Package },
  { title: "Relatórios", url: "/dashboard/reports", icon: BarChart3 },
  { title: "Configurações", url: "/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border/50 p-4">
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          <div>
            <h2 className="font-semibold text-foreground">SmartDrink</h2>
            <p className="text-xs text-muted-foreground">KeyCore Admin</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : ""
                      }
                      end={item.url === "/dashboard"}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
