import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  UserCheck, 
  BarChart3, 
  Calendar,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";
import { UserRole } from "@/types/platform";
import { cn } from "@/lib/utils";

interface SidebarProps {
  userRole: UserRole;
  activeView: string;
  onViewChange: (view: string) => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  roles: UserRole[];
  badge?: string;
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['employee', 'po', 'vendor'] },
  { id: 'jobs', label: 'Search Jobs', icon: Briefcase, roles: ['employee', 'po'], badge: '24' },
  { id: 'applications', label: 'Applications', icon: FileText, roles: ['employee', 'po', 'vendor'] },
  { id: 'referrals', label: 'Referrals', icon: UserCheck, roles: ['employee', 'po'] },
  { id: 'submissions', label: 'My Submissions', icon: FileText, roles: ['vendor'] },
];

export const Sidebar = ({ userRole, activeView, onViewChange, isMobileOpen, onMobileClose }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  
  const filteredItems = menuItems.filter(item => item.roles.includes(userRole));

  const handleViewChange = (view: string) => {
    onViewChange(view);
    onMobileClose?.();
  };

  const sidebarContent = (
    <>
      <div className="p-3 md:p-4 border-b border-border flex items-center justify-between">
        {!collapsed && <h2 className="font-semibold text-foreground text-sm md:text-base">Navigation</h2>}
        {/* Close button for mobile */}
        {isMobileOpen && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMobileClose}
            className="h-8 w-8 md:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        {/* Collapse button for desktop */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 hidden md:flex"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="flex-1 p-2">
        <div className="space-y-1">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-10 text-sm",
                  collapsed && "justify-center px-0 hidden md:flex"
                )}
                onClick={() => handleViewChange(item.id)}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {(!collapsed || isMobileOpen) && (
                  <>
                    <span className="flex-1 text-left truncate">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Button>
            );
          })}
        </div>
      </nav>

      <div className="p-2 border-t border-border">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 h-10 text-sm",
            collapsed && "justify-center px-0 hidden md:flex"
          )}
        >
          <Settings className="h-4 w-4" />
          {(!collapsed || isMobileOpen) && <span>Settings</span>}
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile sidebar overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onMobileClose}
        />
      )}
      
      {/* Mobile sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 h-full bg-card border-r border-border flex flex-col shadow-enterprise-lg z-50 transition-transform duration-300 md:hidden w-64",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className={cn(
        "hidden md:flex bg-card border-r border-border flex-col shadow-enterprise-sm transition-all duration-300 sticky top-0 h-[calc(100vh-4rem)]",
        collapsed ? "w-16" : "w-56 lg:w-64"
      )}>
        {sidebarContent}
      </aside>
    </>
  );
};