import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  Phone, 
  Calendar, 
  MapPin,
  FileText,
  CheckCircle,
  X,
  User
} from "lucide-react";
import { Candidate } from "@/types/platform";

interface CandidateDetailModalProps {
  candidate: Candidate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CandidateDetailModal = ({ candidate, open, onOpenChange }: CandidateDetailModalProps) => {
  const { toast } = useToast();

  if (!candidate) return null;

  const handleStatusUpdate = (newStatus: string) => {
    toast({
      title: "Status Updated",
      description: `${candidate.name}'s status has been updated to ${newStatus.replace('_', ' ')}.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'offered': return 'bg-tag-status-progress text-tag-status-progress-foreground';
      case 'interview_scheduled': return 'bg-tag-status-progress text-tag-status-progress-foreground';
      case 'shortlisted': return 'bg-tag-status-progress text-tag-status-progress-foreground';
      case 'rejected': return 'bg-tag-status-error text-tag-status-error-foreground';
      case 'hired': return 'bg-tag-status-success text-tag-status-success-foreground';
      default: return 'bg-tag-status-pending text-tag-status-pending-foreground';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Candidate Profile
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Candidate Overview */}
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">{candidate.name}</h2>
              <p className="text-muted-foreground">Applied for {candidate.appliedFor}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Applied {new Date(candidate.appliedDate).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Source: {candidate.source}
                </div>
              </div>
            </div>
            <Badge className={getStatusColor(candidate.status)}>
              {candidate.status.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>

          <Separator />

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{candidate.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{candidate.phone}</span>
              </div>
            </div>
          </div>

          {/* Skills & Experience (Mock Data) */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Skills & Experience</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-sm">5+ years in software development</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-sm">Expert in Java, Spring Boot, and microservices</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-sm">Experience with cloud platforms (AWS/Azure)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-sm">Strong background in agile development</span>
              </div>
            </div>
          </div>

          {/* Application Timeline */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Application Timeline</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">Application Submitted</span>
                    <span className="text-xs text-muted-foreground">{new Date(candidate.appliedDate).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Candidate applied via {candidate.source}</p>
                </div>
              </div>
              
              {candidate.status !== 'applied' && (
                <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">Status Updated</span>
                      <span className="text-xs text-muted-foreground">2 days ago</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Moved to {candidate.status.replace('_', ' ')}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4 border-t border-border">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleStatusUpdate('shortlisted')}
              >
                Shortlist
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleStatusUpdate('interview_scheduled')}
              >
                Schedule Interview
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleStatusUpdate('offered')}
              >
                Make Offer
              </Button>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => handleStatusUpdate('rejected')}
              >
                <X className="h-4 w-4 mr-1" />
                Reject
              </Button>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};