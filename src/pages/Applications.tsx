import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockApplications } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Calendar, MapPin, Clock, Eye, CheckCircle, XCircle } from "lucide-react";
import { Application } from "@/types/platform";

export default function Applications() {
  const { user } = useAuth();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-tag-status-pending text-tag-status-pending-foreground';
      case 'po_review': return 'bg-tag-status-progress text-tag-status-progress-foreground';
      case 'shortlisted': return 'bg-tag-status-progress text-tag-status-progress-foreground';
      case 'interview_scheduled': return 'bg-tag-status-progress text-tag-status-progress-foreground';
      case 'offered': return 'bg-tag-status-progress text-tag-status-progress-foreground';
      case 'rejected': return 'bg-tag-status-error text-tag-status-error-foreground';
      case 'hired': return 'bg-tag-status-success text-tag-status-success-foreground';
      default: return 'bg-tag-status-pending text-tag-status-pending-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'po_review': return 'P&O Review';
      default: return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  };

  const activeApplications = mockApplications.filter(app => 
    !['rejected', 'hired'].includes(app.status)
  );

  const completedApplications = mockApplications.filter(app => 
    ['rejected', 'hired'].includes(app.status)
  );

  const handleApproveApplication = (application: Application) => {
    toast.success(`Application approved for ${application.jobTitle}. Forwarded to Hiring Manager.`);
  };

  const handleRejectApplication = (application: Application) => {
    toast.error(`Application rejected for ${application.jobTitle}. Associate notified.`);
  };

  return (
    <div className="space-y-5 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-lg md:text-xl font-bold text-foreground">My Applications</h1>
        <Badge variant="outline" className="px-3 py-1.5 text-sm w-fit">
          {mockApplications.length} total
        </Badge>
      </div>

      {/* Application Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="text-xl font-bold text-blue-600">
              {mockApplications.filter(a => a.status === 'applied').length}
            </div>
            <div className="text-sm text-muted-foreground">Applied</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="text-xl font-bold text-orange-600">
              {mockApplications.filter(a => a.status === 'po_review').length}
            </div>
            <div className="text-sm text-muted-foreground">P&O Review</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="text-xl font-bold text-green-600">
              {mockApplications.filter(a => a.status === 'offered').length}
            </div>
            <div className="text-sm text-muted-foreground">Offers</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="text-xl font-bold text-emerald-600">
              {mockApplications.filter(a => a.status === 'hired').length}
            </div>
            <div className="text-sm text-muted-foreground">Hired</div>
          </CardContent>
        </Card>
      </div>

      {/* Applications Tabs */}
      <Tabs defaultValue="active" className="space-y-5">
        <TabsList className="grid w-full grid-cols-2 h-10">
          <TabsTrigger value="active" className="text-sm">Active ({activeApplications.length})</TabsTrigger>
          <TabsTrigger value="completed" className="text-sm">Completed ({completedApplications.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-3">
          {activeApplications.map((application) => (
            <Card key={application.id} className="shadow-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-base">{application.jobTitle}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Applied {new Date(application.appliedDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Updated {new Date(application.lastUpdated).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(application.status)}>
                    {getStatusText(application.status)}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* IJP Application Pipeline */}
                <div className="mb-4">
                  <div className="text-sm font-medium mb-2">IJP Progress:</div>
                  <div className="flex flex-wrap items-center gap-1 md:gap-2 text-xs">
                    <div className={`px-1.5 md:px-2 py-1 rounded text-[10px] md:text-xs ${application.status === 'applied' || ['manager_review', 'po_review', 'interview_scheduled', 'decision', 'approved'].includes(application.status) ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                      Applied ✓
                    </div>
                    <div className="w-2 md:w-4 h-px bg-gray-300 hidden sm:block"></div>
                    <div className={`px-1.5 md:px-2 py-1 rounded text-[10px] md:text-xs ${application.status === 'manager_review' || ['po_review', 'interview_scheduled', 'decision', 'approved'].includes(application.status) ? 'bg-green-100 text-green-800' : application.status === 'applied' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-600'}`}>
                      Manager {(['manager_review', 'po_review', 'interview_scheduled', 'decision', 'approved'].includes(application.status)) ? '✓' : application.status === 'applied' ? '⏳' : ''}
                    </div>
                    <div className="w-2 md:w-4 h-px bg-gray-300 hidden sm:block"></div>
                    <div className={`px-1.5 md:px-2 py-1 rounded text-[10px] md:text-xs ${application.status === 'po_review' || ['interview_scheduled', 'decision', 'approved'].includes(application.status) ? 'bg-green-100 text-green-800' : application.status === 'manager_review' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-600'}`}>
                      P&O {(['po_review', 'interview_scheduled', 'decision', 'approved'].includes(application.status)) ? '✓' : application.status === 'manager_review' ? '⏳' : ''}
                    </div>
                    <div className="w-2 md:w-4 h-px bg-gray-300 hidden sm:block"></div>
                    <div className={`px-1.5 md:px-2 py-1 rounded text-[10px] md:text-xs ${application.status === 'interview_scheduled' || ['decision', 'approved'].includes(application.status) ? 'bg-green-100 text-green-800' : application.status === 'po_review' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-600'}`}>
                      Interview {(['interview_scheduled', 'decision', 'approved'].includes(application.status)) ? '✓' : application.status === 'po_review' ? '⏳' : ''}
                    </div>
                    <div className="w-2 md:w-4 h-px bg-gray-300 hidden sm:block"></div>
                    <div className={`px-1.5 md:px-2 py-1 rounded text-[10px] md:text-xs ${application.status === 'decision' || application.status === 'approved' ? 'bg-green-100 text-green-800' : application.status === 'interview_scheduled' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-600'}`}>
                      Decision {application.status === 'decision' || application.status === 'approved' ? '✓' : application.status === 'interview_scheduled' ? '⏳' : ''}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    ID: #{application.id}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    {user?.role === 'po' && application.status === 'po_review' && (
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
                    )}
                    {application.status === 'interview_scheduled' && (
                      <Button size="sm" variant="enterprise">
                        Join Interview
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-3">
          {completedApplications.map((application) => (
            <Card key={application.id} className="shadow-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-base">{application.jobTitle}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Applied {new Date(application.appliedDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(application.status)}>
                    {getStatusText(application.status)}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Application ID: #{application.id}
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}