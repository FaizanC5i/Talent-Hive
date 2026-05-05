import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MetricsCard } from "@/components/platform/MetricsCard";
import { CreateJobModal } from "@/components/modals/CreateJobModal";
import { CandidateDetailModal } from "@/components/modals/CandidateDetailModal";
import { AnalyticsModal } from "@/components/modals/AnalyticsModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { 
  Users, 
  Briefcase, 
  Calendar, 
  TrendingUp,
  UserCheck,
  FileText,
  Plus,
  BarChart3,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import { 
  mockDashboardMetrics, 
  mockCandidates, 
  mockVendorPerformance,
  mockFunnelData,
  mockSourceData,
  mockApplications
} from "@/data/mockData";
import { Candidate, Application } from "@/types/platform";

export const HRDashboard = () => {
  const navigate = useNavigate();
  const [showCreateJob, setShowCreateJob] = useState(false);
  const [showCandidateDetail, setShowCandidateDetail] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  
  const metrics = mockDashboardMetrics;
  const recentCandidates = mockCandidates.slice(0, 4);
  const topVendors = mockVendorPerformance.slice(0, 3);
  
  // Filter applications that need P&O review
  const pendingApprovals = mockApplications.filter(app => app.status === 'po_review');

  const handleCandidateClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setShowCandidateDetail(true);
  };

  const handleApproveApplication = (application: Application) => {
    toast.success(`Application approved for ${application.jobTitle}. Forwarded to Hiring Manager.`);
  };

  const handleRejectApplication = (application: Application) => {
    toast.error(`Application rejected for ${application.jobTitle}. Associate notified.`);
  };

  return (
    <div className="space-y-5 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-foreground">TA Dashboard</h1>
          <p className="text-sm text-muted-foreground hidden sm:block">Manage your talent acquisition pipeline and application approvals</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline"
            className="h-9 text-sm flex-1 sm:flex-initial"
            onClick={() => setShowAnalytics(true)}
          >
            <BarChart3 className="h-4 w-4 mr-1.5" />
            Analytics
          </Button>
          <Button 
            variant="enterprise"
            className="h-9 text-sm flex-1 sm:flex-initial"
            onClick={() => setShowCreateJob(true)}
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Create Job
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4">
        <MetricsCard
          title="Total Applications"
          value={metrics.totalApplications}
          change={15}
          changeType="increase"
          icon={<FileText className="h-4 w-4" />}
          variant="primary"
          description="This month"
        />
        <MetricsCard
          title="Active Jobs"
          value={metrics.activeJobs}
          change={8}
          changeType="increase"
          icon={<Briefcase className="h-4 w-4" />}
          variant="success"
          description="Currently open"
        />
        <MetricsCard
          title="Pending Interviews"
          value={metrics.pendingInterviews}
          icon={<Calendar className="h-4 w-4" />}
          variant="warning"
          description="This week"
        />
        <MetricsCard
          title="Offers Extended"
          value={metrics.offersExtended}
          change={25}
          changeType="increase"
          icon={<UserCheck className="h-4 w-4" />}
          description="Awaiting response"
        />
        <MetricsCard
          title="Conversion Rate"
          value={`${metrics.conversionRate}%`}
          change={3}
          changeType="increase"
          icon={<TrendingUp className="h-4 w-4" />}
          description="Apply to hire"
        />
        <MetricsCard
          title="Avg Time to Fill"
          value={`${metrics.timeToFill} days`}
          change={2}
          changeType="decrease"
          icon={<Calendar className="h-4 w-4" />}
          description="Target: 20 days"
        />
      </div>

      {/* Applications Pending P&O Approval */}
      {pendingApprovals.length > 0 && (
        <Card className="shadow-sm border-warning/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-warning text-sm">
              <Clock className="h-4 w-4" />
              Applications Pending TA Approval ({pendingApprovals.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-2">
              {pendingApprovals.map(application => (
                <div key={application.id} className="p-3 bg-warning/5 border border-warning/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{application.jobTitle}</h4>
                      <p className="text-sm text-muted-foreground">
                        Applied on {new Date(application.appliedDate).toLocaleDateString()}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {application.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Last updated: {new Date(application.lastUpdated).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-success border-success hover:bg-success hover:text-success-foreground"
                        onClick={() => handleApproveApplication(application)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => handleRejectApplication(application)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4">
        {/* Hiring Funnel */}
        <div className="lg:col-span-2">
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4" />
              Application Pipeline & Source Funnel
            </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-3">
                {mockFunnelData.map((stage, index) => (
                  <div key={stage.stage} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{stage.stage}</span>
                      <span className="text-sm text-muted-foreground">{stage.count}</span>
                    </div>
                    <Progress 
                      value={(stage.count / mockFunnelData[0].count) * 100} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <h4 className="text-sm font-medium mb-3">Application Sources</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 text-center">
                  <div className="space-y-1">
                    <div className="text-lg font-bold text-blue-600">32%</div>
                    <div className="text-xs text-muted-foreground">LinkedIn/Indeed</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg font-bold text-green-600">25%</div>
                    <div className="text-xs text-muted-foreground">Workday</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg font-bold text-purple-600">23%</div>
                    <div className="text-xs text-muted-foreground">SuccessFactors</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg font-bold text-orange-600">20%</div>
                    <div className="text-xs text-muted-foreground">Company Portal</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Candidates */}
        <div>
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4" />
                Recent Candidates
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-2">
                {recentCandidates.map(candidate => (
                  <div 
                    key={candidate.id} 
                    className="p-2 bg-muted/30 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleCandidateClick(candidate)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{candidate.name}</span>
                      <Badge 
                        variant={
                          candidate.status === 'offered' ? 'default' :
                          candidate.status === 'interview_scheduled' ? 'default' :
                          candidate.status === 'shortlisted' ? 'secondary' : 'outline'
                        }
                        className="text-xs"
                      >
                        {candidate.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{candidate.appliedFor}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Applied {new Date(candidate.appliedDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-3 h-7 text-xs"
                onClick={() => navigate('/applications')}
              >
                View All Candidates
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Vendor Performance */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <BarChart3 className="h-4 w-4" />
            Vendor Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
            {topVendors.map(vendor => (
              <div key={vendor.vendorName} className="p-3 bg-muted/30 rounded-lg">
                <h4 className="font-medium mb-3">{vendor.vendorName}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Submissions:</span>
                    <span className="font-medium">{vendor.totalSubmissions}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Hires:</span>
                    <span className="font-medium text-success">{vendor.hires}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Conversion:</span>
                    <span className="font-medium">{vendor.conversionRate}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Avg Time:</span>
                    <span className="font-medium">{vendor.averageTimeToFill} days</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <CreateJobModal 
        open={showCreateJob} 
        onOpenChange={setShowCreateJob} 
      />
      
      <CandidateDetailModal
        candidate={selectedCandidate}
        open={showCandidateDetail}
        onOpenChange={setShowCandidateDetail}
      />

      <AnalyticsModal
        open={showAnalytics}
        onOpenChange={setShowAnalytics}
      />
    </div>
  );
};