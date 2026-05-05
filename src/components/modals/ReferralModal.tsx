import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { UserCheck, X } from "lucide-react";
import { mockJobs } from "@/data/mockData";

interface ReferralModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ReferralModal = ({ open, onOpenChange }: ReferralModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    candidateName: "",
    candidateEmail: "",
    candidatePhone: "",
    jobId: "",
    relationship: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Referral Submitted!",
      description: `Thank you for referring ${formData.candidateName}. HR will review the profile and get back to you.`,
    });
    
    // Reset form
    setFormData({
      candidateName: "",
      candidateEmail: "",
      candidatePhone: "",
      jobId: "",
      relationship: "",
      notes: ""
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base md:text-lg">
            <UserCheck className="h-4 w-4 md:h-5 md:w-5" />
            Refer a Candidate
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div className="space-y-2">
              <Label htmlFor="candidateName" className="text-sm">Candidate Name *</Label>
              <Input
                id="candidateName"
                value={formData.candidateName}
                onChange={(e) => setFormData({...formData, candidateName: e.target.value})}
                placeholder="Enter candidate's full name"
                required
                className="h-9"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="candidateEmail" className="text-sm">Email Address *</Label>
              <Input
                id="candidateEmail"
                type="email"
                value={formData.candidateEmail}
                onChange={(e) => setFormData({...formData, candidateEmail: e.target.value})}
                placeholder="candidate@email.com"
                required
                className="h-9"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div className="space-y-2">
              <Label htmlFor="candidatePhone" className="text-sm">Phone Number</Label>
              <Input
                id="candidatePhone"
                value={formData.candidatePhone}
                onChange={(e) => setFormData({...formData, candidatePhone: e.target.value})}
                placeholder="+91-9876543210"
                className="h-9"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="jobId" className="text-sm">Position *</Label>
              <Select value={formData.jobId} onValueChange={(value) => setFormData({...formData, jobId: value})}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Select a position" />
                </SelectTrigger>
                <SelectContent>
                  {mockJobs.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      {job.title} - {job.location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="relationship" className="text-sm">How do you know this candidate? *</Label>
            <Select value={formData.relationship} onValueChange={(value) => setFormData({...formData, relationship: value})}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Select relationship" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="colleague">Former Colleague</SelectItem>
                <SelectItem value="friend">Friend</SelectItem>
                <SelectItem value="professional">Professional Network</SelectItem>
                <SelectItem value="family">Family Member</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Tell us why this candidate would be a great fit..."
              rows={3}
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-3 md:pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="h-9">
              Cancel
            </Button>
            <Button type="submit" disabled={!formData.candidateName || !formData.candidateEmail || !formData.jobId || !formData.relationship} className="h-9">
              Submit Referral
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};