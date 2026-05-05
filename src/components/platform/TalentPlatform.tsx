import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { EmployeeDashboard } from "@/components/dashboards/EmployeeDashboard";
import { HRDashboard } from "@/components/dashboards/HRDashboard";
import { VendorDashboard } from "@/components/dashboards/VendorDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockUsers } from "@/data/mockData";
import { UserRole } from "@/types/platform";
import { useAuth } from "@/contexts/AuthContext";
import Jobs from "@/pages/Jobs";
import Applications from "@/pages/Applications";
import Referrals from "@/pages/Referrals";

export const TalentPlatform = () => {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  if (!user) return null;

  const handleRoleSwitch = (role: string) => {
    // This is handled by the login system now
    setActiveView('dashboard');
  };

  const renderMainContent = () => {
    switch (activeView) {
      case 'dashboard':
        switch (user.role) {
          case 'employee':
            return <EmployeeDashboard />;
          case 'po':
            return <HRDashboard />;
          case 'vendor':
            return <VendorDashboard />;
          default:
            return <EmployeeDashboard />;
        }
      case 'jobs':
        return <Jobs />;
      case 'applications':
        return <Applications />;
      case 'referrals':
        return <Referrals />;
      default:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-xl md:text-2xl font-bold text-foreground capitalize">
                {activeView.replace('_', ' ')}
              </h1>
              <p className="text-muted-foreground text-sm">
                {user.role.toUpperCase()} View
              </p>
            </div>
            
            <Card className="shadow-enterprise-sm">
              <CardHeader>
                <CardTitle>Coming Soon</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This {activeView} view is under development. Switch to the Dashboard to see the full prototype.
                </p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={user} 
        onRoleSwitch={handleRoleSwitch}
        showMenuButton={true}
        onMenuClick={() => setIsMobileSidebarOpen(true)}
      />
      
      <div className="flex">
        <Sidebar 
          userRole={user.role}
          activeView={activeView}
          onViewChange={setActiveView}
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={() => setIsMobileSidebarOpen(false)}
        />
        
        <main className="flex-1 p-4 md:p-5 lg:p-6 overflow-auto min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-4rem)]">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};