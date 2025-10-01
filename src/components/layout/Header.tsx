import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface HeaderProps {
  alertCount: number;
}

export const Header = ({ alertCount }: HeaderProps) => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="px-6 py-4 flex items-center justify-between">
        <SidebarTrigger />
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Bell className="h-6 w-6 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
            {alertCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {alertCount}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
