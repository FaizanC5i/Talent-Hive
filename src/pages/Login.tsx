import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/types/platform";
import { useAuth } from "@/contexts/AuthContext";
import { Users, Building, Briefcase } from "lucide-react";

const roleData = {
  employee: {
    title: "Associate Portal",
    description: "Access job opportunities, submit referrals, and track your applications",
    icon: Users,
    color: "bg-success text-success-foreground",
    features: ["Browse Internal Jobs", "Apply for Positions", "Track Applications", "Submit Referrals", "Skill Assessments"]
  },
  po: {
    title: "TA Dashboard",
    description: "Manage hiring pipeline, candidates, and analytics",
    icon: Building,
    color: "bg-primary text-primary-foreground",
    features: ["Manage Candidates", "Post Job Openings", "Interview Scheduling", "Analytics & Reports", "Vendor Management"]
  },
  vendor: {
    title: "Vendor Portal",
    description: "Submit candidate profiles and track performance metrics",
    icon: Briefcase,
    color: "bg-warning text-warning-foreground",
    features: ["Submit Profiles", "Track Submissions", "Performance Analytics", "Job Requirements", "Client Communication"]
  }
};

export default function Login() {
  const { login } = useAuth();

  const handleLogin = (role: UserRole) => {
    login(role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/10 flex items-center justify-center px-5 py-8 md:p-8">
      <div className="w-full max-w-6xl space-y-8 md:space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 md:space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4 md:mb-5">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-primary rounded-lg flex items-center justify-center shadow-md">
              <span className="text-primary-foreground font-bold text-base md:text-lg tracking-wider">TH</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">TalentHive</h1>
          </div>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Enterprise Talent Acquisition Platform
          </p>
          <p className="text-sm text-muted-foreground">
            Choose your role to access your dashboard
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
          {(Object.entries(roleData) as [UserRole, typeof roleData.employee][]).map(([role, data]) => {
            const Icon = data.icon;
            return (
              <Card key={role} className="group hover:scale-[1.02] transition-all duration-200 shadow-enterprise-sm hover:shadow-enterprise-md cursor-pointer">
                <CardHeader className="text-center space-y-3 pb-4 px-5 pt-6">
                  <div className="mx-auto">
                    <div className="w-12 h-12 rounded-lg bg-muted border border-border flex items-center justify-center mb-3">
                      <Icon className="h-6 w-6 text-foreground" />
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-lg mb-1.5">{data.title}</CardTitle>
                    <CardDescription className="text-center text-sm leading-relaxed">
                      {data.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4 px-5 pb-6">
                  <div className="space-y-2">
                    <h4 className="font-medium text-xs text-muted-foreground">Key Features:</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {data.features.slice(0, 4).map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs border-border py-0.5">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => handleLogin(role)}
                    className="w-full mt-4 h-10"
                    variant="enterprise"
                  >
                    Login
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Demo Notice */}
        <div className="text-center pt-2">
          <Badge variant="outline" className="px-5 py-2.5 text-sm">
            Demo Platform - No actual authentication required
          </Badge>
        </div>
      </div>
    </div>
  );
}