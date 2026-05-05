import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  MapPin, 
  Calendar, 
  Briefcase, 
  Users, 
  Clock,
  CheckCircle,
  FileText,
  UserPlus
} from "lucide-react";
import { Job } from "@/types/platform";

interface JobDetailModalProps {
  job: Job | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userRole: string;
}

export const JobDetailModal = ({ job, open, onOpenChange, userRole }: JobDetailModalProps) => {
  const { toast } = useToast();

  if (!job) return null;

  const handleApply = () => {
    toast({
      title: "Application Submitted!",
      description: `Your application for ${job.title} has been submitted successfully. You'll hear back from HR within 5 business days.`,
    });
    onOpenChange(false);
  };

  const handleRefer = () => {
    toast({
      title: "Referral Started!",
      description: `Opening referral form for ${job.title}. Help us find great talent!`,
    });
    // Here you would typically navigate to referral form or open referral modal
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-tag-status-success text-tag-status-success-foreground';
      case 'shortlisting': return 'bg-tag-status-progress text-tag-status-progress-foreground';
      case 'interviewing': return 'bg-tag-status-progress text-tag-status-progress-foreground';
      case 'offer_stage': return 'bg-tag-status-progress text-tag-status-progress-foreground';
      case 'closed': return 'bg-tag-status-error text-tag-status-error-foreground';
      default: return 'bg-tag-status-pending text-tag-status-pending-foreground';
    }
  };

  const getWorkTypeIcon = (workType: string) => {
    switch (workType) {
      case 'remote': return '🏠';
      case 'onsite': return '🏢';
      case 'hybrid': return '🔄';
      default: return '📍';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto mx-4 sm:mx-auto">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl">{job.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 md:space-y-6">
          {/* Job Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{job.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{job.department}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">{getWorkTypeIcon(job.workType)}</span>
              <span className="text-sm capitalize">{job.workType}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Posted {new Date(job.openedDate).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            <Badge className={getStatusColor(job.status)}>
              {job.status.replace('_', ' ').toUpperCase()}
            </Badge>
            {job.isInternal && (
              <Badge variant="outline" className="border-primary text-primary">
                Internal Position
              </Badge>
            )}
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              {job.applicationsCount} applications
            </div>
          </div>

          <Separator />

          {/* Job Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Job Description</h3>
            <p className="text-muted-foreground leading-relaxed">{job.description}</p>
          </div>

          {/* Requirements */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Key Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {job.requirements.map((req, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                  <span className="text-sm">{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Application Process */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Application Process</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">1</div>
                <div>
                  <h4 className="font-medium text-sm">Application Review</h4>
                  <p className="text-xs text-muted-foreground">2-3 business days</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">2</div>
                <div>
                  <h4 className="font-medium text-sm">Technical Interview</h4>
                  <p className="text-xs text-muted-foreground">1-2 rounds</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">3</div>
                <div>
                  <h4 className="font-medium text-sm">Final Decision</h4>
                  <p className="text-xs text-muted-foreground">Within 1 week</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-4 border-t border-border">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button variant="outline" onClick={handleRefer} className="gap-2">
              <UserPlus className="h-4 w-4" />
              Refer a Friend
            </Button>
            {userRole === 'employee' && (
              <Button onClick={handleApply} className="gap-2">
                <FileText className="h-4 w-4" />
                Apply Now
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};