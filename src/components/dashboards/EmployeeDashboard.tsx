import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MetricsCard } from "@/components/platform/MetricsCard";
import { JobCard } from "@/components/platform/JobCard";
import { JobMatchCard } from "@/components/platform/JobMatchCard";
import { ReferralModal } from "@/components/modals/ReferralModal";
import { JobDetailModal } from "@/components/modals/JobDetailModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  FileText, 
  UserCheck, 
  TrendingUp,
  Calendar,
  Users
} from "lucide-react";
import { mockJobs, mockReferrals, mockApplications, mockSkills, mockJobRecommendations } from "@/data/mockData";
import { Job } from "@/types/platform";
import { useAuth } from "@/contexts/AuthContext";

export const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [showJobDetail, setShowJobDetail] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  
  // Filter to show only high-match job recommendations (85%+)
  const highMatchRecommendations = mockJobRecommendations.filter(rec => rec.matchScore >= 85);
  const recentReferrals = mockReferrals.slice(0, 3);
  const userApplications = mockApplications.filter(app => app.userId === '1');

  const handleJobView = (jobId: string) => {
    // First check in job recommendations
    const recommendedJob = mockJobRecommendations.find(rec => rec.job.id === jobId)?.job;
    // Fallback to checking in general mock jobs
    const job = recommendedJob || mockJobs.find(j => j.id === jobId);
    if (job) {
      setSelectedJob(job);
      setShowJobDetail(true);
    }
  };

  const getApplicationStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-blue-500 text-white';
      case 'po_review': return 'bg-orange-500 text-white';
      case 'shortlisted': return 'bg-yellow-500 text-white';
      case 'interview_scheduled': return 'bg-purple-500 text-white';
      case 'offered': return 'bg-green-500 text-white';
      case 'rejected': return 'bg-red-500 text-white';
      case 'hired': return 'bg-emerald-500 text-white';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getApplicationStatusText = (status: string) => {
    switch (status) {
      case 'po_review': return 'TA Review';
      default: return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  };

  return (
    <div className="space-y-5 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-foreground">Welcome back, {user?.name?.split(' ')[0]}!</h1>
          <p className="text-sm text-muted-foreground hidden sm:block">Associate Portal - Discover new opportunities and track your applications</p>
        </div>
        <Button 
          variant="enterprise" 
          className="shadow-sm h-9 text-sm w-full sm:w-auto"
          onClick={() => setShowReferralModal(true)}
        >
          <UserCheck className="h-4 w-4 mr-1.5" />
          Refer a Friend
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <MetricsCard
          title="My Applications"
          value={userApplications.length}
          change={50}
          changeType="increase"
          icon={<FileText className="h-4 w-4" />}
          variant="primary"
          description="This month"
        />
        <MetricsCard
          title="Referrals Made"
          value="2"
          change={100}
          changeType="increase"
          icon={<UserCheck className="h-4 w-4" />}
          variant="success"
          description="Active referrals"
        />
        <MetricsCard
          title="Available Jobs"
          value={mockJobs.length}
          icon={<Briefcase className="h-4 w-4" />}
          variant="warning"
          description="All opportunities"
        />
        <MetricsCard
          title="Interview Scheduled"
          value={userApplications.filter(app => app.status === 'interview_scheduled').length}
          icon={<Calendar className="h-4 w-4" />}
          description="This week"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
        {/* Personalized Job Recommendations */}
        <div className="lg:col-span-2">
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4" />
                  Personalized Job Recommendations
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-6 text-xs"
                  onClick={() => navigate('/jobs')}
                >
                  View All Jobs
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-2">
                {highMatchRecommendations.map(recommendation => (
                  <JobMatchCard 
                    key={recommendation.job.id} 
                    job={recommendation.job} 
                    matchScore={recommendation.matchScore}
                    userRole="employee"
                    onApply={(jobId) => handleJobView(jobId)}
                    onView={(jobId) => handleJobView(jobId)}
                    onRefer={(jobId) => console.log('Refer job:', jobId)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* My Referrals */}
        <div>
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4" />
                My Referrals
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-2">
                {recentReferrals.map(referral => (
                  <div key={referral.id} className="p-2 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{referral.candidateName}</span>
                      <Badge 
                        variant={referral.status === 'shortlisted' ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        {referral.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{referral.jobTitle}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Submitted {new Date(referral.submittedDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-3 h-7 text-xs"
                onClick={() => navigate('/referrals')}
              >
                View All Referrals
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            <Button 
              variant="outline" 
              className="h-12 flex-col gap-1 text-xs"
              onClick={() => navigate('/jobs')}
            >
              <Briefcase className="h-4 w-4" />
              Browse All Jobs
            </Button>
            <Button 
              variant="outline" 
              className="h-12 flex-col gap-1 text-xs"
              onClick={() => navigate('/applications')}
            >
              <FileText className="h-4 w-4" />
              Track Applications
            </Button>
            <Button 
              variant="outline" 
              className="h-12 flex-col gap-1 text-xs"
              onClick={() => setShowReferralModal(true)}
            >
              <UserCheck className="h-4 w-4" />
              Refer Candidate
            </Button>
          </div>
        </CardContent>
      </Card>


      {/* Modals */}
      <ReferralModal 
        open={showReferralModal} 
        onOpenChange={setShowReferralModal} 
      />
      
      <JobDetailModal
        job={selectedJob}
        open={showJobDetail}
        onOpenChange={setShowJobDetail}
        userRole="employee"
      />
    </div>
  );
};