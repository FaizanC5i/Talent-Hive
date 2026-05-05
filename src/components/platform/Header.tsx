import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bell, Search, Settings, LogOut, Menu } from "lucide-react";
import { User } from "@/types/platform";
import { useAuth } from "@/contexts/AuthContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface HeaderProps {
  user: User;
  onRoleSwitch?: (role: string) => void;
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

export const Header = ({ user, onRoleSwitch, onMenuClick, showMenuButton = false }: HeaderProps) => {
  const { logout } = useAuth();
  
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'po': return 'bg-primary text-primary-foreground';
      case 'employee': return 'bg-success text-success-foreground';
      case 'vendor': return 'bg-warning text-warning-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case 'po': return 'TA Lead';
      case 'employee': return 'Associate';
      case 'vendor': return 'Vendor';
      default: return role.toUpperCase();
    }
  };

  return (
    <header className="bg-card border-b border-border h-14 md:h-16 flex items-center justify-between px-3 md:px-6 shadow-enterprise-sm">
      <div className="flex items-center gap-2 md:gap-3">
        {showMenuButton && (
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-8 w-8"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 md:w-7 md:h-7 bg-gradient-primary rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-primary-foreground font-bold text-[10px] md:text-xs tracking-wide">TH</span>
          </div>
          <h1 className="text-base md:text-lg font-semibold text-foreground tracking-tight hidden sm:block">TalentHive</h1>
        </div>
        <Badge className="bg-muted text-foreground border border-border text-xs" variant="outline">
          {getRoleName(user.role)}
        </Badge>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Search - Hidden on mobile */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-3 w-3" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-3 py-1.5 w-48 bg-background border border-input rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        
        {/* Mobile search button */}
        <Button variant="ghost" size="icon" className="md:hidden h-8 w-8">
          <Search className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Bell className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="icon" className="hidden sm:flex h-8 w-8">
          <Settings className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-2 md:gap-3 pl-2 md:pl-3 border-l border-border">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="text-sm hidden lg:block">
            <div className="font-medium text-foreground text-xs">{user.name}</div>
            <div className="text-muted-foreground text-xs">{user.department || user.vendorId}</div>
          </div>
          <Button variant="ghost" size="icon" onClick={logout} className="h-8 w-8">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};