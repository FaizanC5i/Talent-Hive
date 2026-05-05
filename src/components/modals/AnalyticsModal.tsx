import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Calendar,
  Target,
  Clock
} from "lucide-react";

interface AnalyticsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AnalyticsModal = ({ open, onOpenChange }: AnalyticsModalProps) => {
  const analyticsData = {
    totalHires: 42,
    avgTimeToHire: 18,
    conversionRate: 12.5,
    topSources: [
      { name: 'LinkedIn', percentage: 45, count: 156 },
      { name: 'Associate Referrals', percentage: 28, count: 97 },
      { name: 'Job Boards', percentage: 18, count: 62 },
      { name: 'Direct Applications', percentage: 9, count: 31 }
    ],
    monthlyTrends: [
      { month: 'Jan', applications: 234, hires: 28 },
      { month: 'Feb', applications: 198, hires: 24 },
      { month: 'Mar', applications: 267, hires: 32 },
      { month: 'Apr', applications: 289, hires: 35 },
      { month: 'May', applications: 312, hires: 38 }
    ],
    skillsInDemand: [
      { skill: 'React/Next.js', demand: 85 },
      { skill: 'Python', demand: 78 },
      { skill: 'AWS/Cloud', demand: 72 },
      { skill: 'Java/Spring', demand: 68 },
      { skill: 'Data Analytics', demand: 64 }
    ]
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Analytics Dashboard
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Total Hires (YTD)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{analyticsData.totalHires}</div>
                <div className="flex items-center gap-1 text-sm text-success">
                  <TrendingUp className="h-3 w-3" />
                  +23% vs last year
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Avg Time to Hire
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{analyticsData.avgTimeToHire} days</div>
                <div className="flex items-center gap-1 text-sm text-success">
                  <TrendingUp className="h-3 w-3" />
                  -3 days vs last quarter
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Conversion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{analyticsData.conversionRate}%</div>
                <div className="flex items-center gap-1 text-sm text-success">
                  <TrendingUp className="h-3 w-3" />
                  +1.2% vs last month
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Source Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Hiring Sources Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.topSources.map((source, index) => (
                  <div key={source.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{index + 1}</Badge>
                        <span className="font-medium">{source.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{source.count} candidates</div>
                        <div className="text-sm text-muted-foreground">{source.percentage}%</div>
                      </div>
                    </div>
                    <Progress value={source.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Trends */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Hiring Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.monthlyTrends.map((month) => (
                    <div key={month.month} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="font-medium">{month.month} 2024</div>
                      <div className="text-right">
                        <div className="font-semibold text-primary">{month.hires} hires</div>
                        <div className="text-sm text-muted-foreground">{month.applications} applications</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skills in High Demand</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.skillsInDemand.map((skill) => (
                    <div key={skill.skill} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{skill.skill}</span>
                        <span className="text-sm text-muted-foreground">{skill.demand}% demand</span>
                      </div>
                      <Progress value={skill.demand} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="font-medium text-primary">Top Performance</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Associate referrals have the highest conversion rate at 28%, making them our most effective hiring source.
                  </p>
                </div>
                
                <div className="p-4 bg-warning/5 rounded-lg border border-warning/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-warning" />
                    <span className="font-medium text-warning">Opportunity</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Technical skills gaps in React/Next.js present opportunities for targeted skill development programs.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};