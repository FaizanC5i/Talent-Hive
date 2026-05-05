import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Users, Eye, Edit, UserPlus } from "lucide-react";
import { Job } from "@/types/platform";
import { cn } from "@/lib/utils";

interface JobCardProps {
  job: Job;
  userRole: 'employee' | 'po' | 'vendor';
  onApply?: (jobId: string) => void;
  onView?: (jobId: string) => void;
  onEdit?: (jobId: string) => void;
  onRefer?: (jobId: string) => void;
}

export const JobCard = ({ job, userRole, onApply, onView, onEdit, onRefer }: JobCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-tag-status-success text-tag-status-success-foreground border border-tag-status-success';
      case 'shortlisting': return 'bg-tag-status-progress text-tag-status-progress-foreground border border-tag-status-progress';
      case 'interviewing': return 'bg-tag-status-progress text-tag-status-progress-foreground border border-tag-status-progress';
      case 'offer_stage': return 'bg-tag-status-progress text-tag-status-progress-foreground border border-tag-status-progress';
      case 'closed': return 'bg-tag-status-error text-tag-status-error-foreground border border-tag-status-error';
      default: return 'bg-tag-status-pending text-tag-status-pending-foreground border border-tag-status-pending';
    }
  };

  const getWorkTypeColor = (workType: string) => {
    return 'bg-tag-source-base text-tag-source-base-foreground border border-tag-source-base';
  };

  const getSourceColor = (source: string) => {
    switch (source.toLowerCase()) {
      case 'linkedin': return 'bg-tag-source-base text-tag-source-base-foreground border-l-2 border-l-tag-source-linkedin border-y border-r border-tag-source-base';
      case 'workday': return 'bg-tag-source-base text-tag-source-base-foreground border-l-2 border-l-tag-source-workday border-y border-r border-tag-source-base';
      case 'indeed': return 'bg-tag-source-base text-tag-source-base-foreground border-l-2 border-l-tag-source-indeed border-y border-r border-tag-source-base';
      case 'successfactors': return 'bg-tag-source-base text-tag-source-base-foreground border border-tag-source-base';
      default: return 'bg-tag-source-base text-tag-source-base-foreground border border-tag-source-base';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-all duration-200 group">
      <CardHeader className="pb-0.5 pt-1.5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-xs font-medium text-foreground group-hover:text-primary transition-colors leading-tight">
              {job.title}
            </CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-muted-foreground">{job.department}</span>
              {job.isInternal && (
                <Badge variant="outline" className="text-xs border-border">Internal</Badge>
              )}
            </div>
          </div>
          <Badge className={getStatusColor(job.status)} variant="outline">
            {job.status.replace('_', ' ')}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 pb-1.5">
        <div className="space-y-1.5">
          <div className="flex items-center flex-wrap gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{job.location}</span>
            </div>
            <Badge className={getWorkTypeColor(job.workType)} variant="outline">
              {job.workType}
            </Badge>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{formatDate(job.openedDate)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="h-3 w-3" />
              <span>{job.applicationsCount} applicants</span>
            </div>
            <Badge className={getSourceColor(job.source)} variant="outline">
              {job.source}
            </Badge>
          </div>

          <div className="flex items-center gap-2 pt-0.5">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onView?.(job.id)}
              className="flex-1 h-6 text-xs"
            >
              <Eye className="h-3 w-3 mr-1" />
              View
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={() => onRefer?.(job.id)}
              className="h-6 text-xs px-2"
            >
              <UserPlus className="h-3 w-3" />
            </Button>
            
            {userRole === 'employee' && job.status === 'open' && (
              <Button
                size="sm"
                onClick={() => onApply?.(job.id)}
                className="flex-1 h-6 text-xs"
              >
                Apply
              </Button>
            )}
            
            {userRole === 'po' && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit?.(job.id)}
                className="h-6 text-xs px-2"
              >
                <Edit className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};