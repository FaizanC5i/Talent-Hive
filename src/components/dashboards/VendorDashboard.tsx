import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MetricsCard } from "@/components/platform/MetricsCard";
import { CandidateSubmissionModal } from "@/components/modals/CandidateSubmissionModal";
import { AnalyticsModal } from "@/components/modals/AnalyticsModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  TrendingUp, 
  Users, 
  Calendar,
  Upload,
  BarChart3,
  CheckCircle
} from "lucide-react";
import { mockCandidates } from "@/data/mockData";

export const VendorDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const mySubmissions = mockCandidates;
  const submissionStats = {
    total: 45,
    pending: 28,
    shortlisted: 12,
    hired: 5
  };

  const handleSubmitProfile = () => {
    setShowSubmissionModal(true);
  };

  const handleTrackStatus = () => {
    navigate('/applications');
  };

  const handleViewAnalytics = () => {
    setShowAnalytics(true);
  };

  const handleScheduleMeet = () => {
    toast({
      title: "Meeting Request Sent",
      description: "Your meeting request has been sent to the HR team. They will respond within 24 hours with available time slots.",
    });
  };

  return (
    <div className="space-y-5 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-foreground">Vendor Dashboard</h1>
          <p className="text-sm text-muted-foreground hidden sm:block">TalentBridge Pvt Ltd - Track your submissions and performance</p>
        </div>
        <Button 
          variant="enterprise"
          className="h-9 text-sm w-full sm:w-auto"
          onClick={handleSubmitProfile}
        >
          <Upload className="h-4 w-4 mr-1.5" />
          Submit Profile
        </Button>
      </div>

      {/* Vendor Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <MetricsCard
          title="Total Submissions"
          value={submissionStats.total}
          change={20}
          changeType="increase"
          icon={<FileText className="h-4 w-4" />}
          variant="primary"
          description="This month"
        />
        <MetricsCard
          title="Success Rate"
          value="11%"
          change={2}
          changeType="increase"
          icon={<TrendingUp className="h-4 w-4" />}
          variant="success"
          description="Hired/Submitted"
        />
        <MetricsCard
          title="Active Candidates"
          value={submissionStats.pending}
          icon={<Users className="h-4 w-4" />}
          variant="warning"
          description="In process"
        />
        <MetricsCard
          title="Hired This Month"
          value={submissionStats.hired}
          change={150}
          changeType="increase"
          icon={<CheckCircle className="h-4 w-4" />}
          description="Great job!"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4">
        {/* Submission Pipeline */}
        <div className="lg:col-span-2">
          <Card className="shadow-enterprise-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Submission Pipeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total Submitted</span>
                    <span className="text-sm text-muted-foreground">{submissionStats.total}</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Under Review</span>
                    <span className="text-sm text-muted-foreground">{submissionStats.pending}</span>
                  </div>
                  <Progress value={(submissionStats.pending / submissionStats.total) * 100} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Shortlisted</span>
                    <span className="text-sm text-muted-foreground">{submissionStats.shortlisted}</span>
                  </div>
                  <Progress value={(submissionStats.shortlisted / submissionStats.total) * 100} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Hired</span>
                    <span className="text-sm text-muted-foreground">{submissionStats.hired}</span>
                  </div>
                  <Progress value={(submissionStats.hired / submissionStats.total) * 100} className="h-2" />
                </div>
              </div>

              <div className="mt-6 p-4 bg-success/10 rounded-lg border border-success/20">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <span className="font-medium text-success">Performance Insight</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your conversion rate is above industry average! Keep submitting quality profiles.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Submissions */}
        <div>
          <Card className="shadow-enterprise-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Recent Submissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mySubmissions.map(candidate => (
                  <div key={candidate.id} className="p-3 bg-muted/30 rounded-lg">
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
                      Submitted {new Date(candidate.appliedDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={handleTrackStatus}
              >
                View All Submissions
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
        <Card className="shadow-enterprise-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="grid grid-cols-2 gap-2 md:gap-4">
              <Button 
                variant="outline" 
                className="h-12 md:h-16 flex-col gap-1 md:gap-2 text-xs"
                onClick={handleSubmitProfile}
              >
                <Upload className="h-4 w-4 md:h-5 md:w-5" />
                Submit
              </Button>
              <Button 
                variant="outline" 
                className="h-12 md:h-16 flex-col gap-1 md:gap-2 text-xs"
                onClick={handleTrackStatus}
              >
                <FileText className="h-4 w-4 md:h-5 md:w-5" />
                Track
              </Button>
              <Button 
                variant="outline" 
                className="h-12 md:h-16 flex-col gap-1 md:gap-2 text-xs"
                onClick={handleViewAnalytics}
              >
                <BarChart3 className="h-4 w-4 md:h-5 md:w-5" />
                Analytics
              </Button>
              <Button 
                variant="outline" 
                className="h-12 md:h-16 flex-col gap-1 md:gap-2 text-xs"
                onClick={handleScheduleMeet}
              >
                <Calendar className="h-4 w-4 md:h-5 md:w-5" />
                Meet
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-enterprise-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Monthly Performance</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                <span className="text-sm font-medium">Submissions Goal</span>
                <span className="text-lg font-bold text-primary">45/50</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-success/5 rounded-lg">
                <span className="text-sm font-medium">Quality Score</span>
                <span className="text-lg font-bold text-success">8.5/10</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-warning/5 rounded-lg">
                <span className="text-sm font-medium">Response Time</span>
                <span className="text-lg font-bold text-warning">2.3 days</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <CandidateSubmissionModal
        open={showSubmissionModal}
        onOpenChange={setShowSubmissionModal}
      />

      <AnalyticsModal
        open={showAnalytics}
        onOpenChange={setShowAnalytics}
      />
    </div>
  );
};