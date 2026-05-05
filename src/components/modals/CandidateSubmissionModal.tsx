import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, User } from "lucide-react";
import { mockJobs } from "@/data/mockData";

interface CandidateSubmissionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CandidateSubmissionModal = ({ open, onOpenChange }: CandidateSubmissionModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    candidateName: "",
    candidateEmail: "",
    candidatePhone: "",
    jobId: "",
    experience: "",
    currentCompany: "",
    expectedSalary: "",
    noticePeriod: "",
    skills: "",
    resumeFile: null as File | null,
    notes: ""
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, resumeFile: file });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Candidate Submitted Successfully!",
      description: `${formData.candidateName} has been submitted for ${mockJobs.find(j => j.id === formData.jobId)?.title || 'the selected position'}. HR will review and get back to you within 2-3 business days.`,
    });
    
    // Reset form
    setFormData({
      candidateName: "",
      candidateEmail: "",
      candidatePhone: "",
      jobId: "",
      experience: "",
      currentCompany: "",
      expectedSalary: "",
      noticePeriod: "",
      skills: "",
      resumeFile: null,
      notes: ""
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Submit Candidate Profile
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-4 w-4" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="candidateName">Full Name *</Label>
                <Input
                  id="candidateName"
                  value={formData.candidateName}
                  onChange={(e) => setFormData({...formData, candidateName: e.target.value})}
                  placeholder="Enter candidate's full name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="candidateEmail">Email Address *</Label>
                <Input
                  id="candidateEmail"
                  type="email"
                  value={formData.candidateEmail}
                  onChange={(e) => setFormData({...formData, candidateEmail: e.target.value})}
                  placeholder="candidate@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="candidatePhone">Phone Number *</Label>
                <Input
                  id="candidatePhone"
                  value={formData.candidatePhone}
                  onChange={(e) => setFormData({...formData, candidatePhone: e.target.value})}
                  placeholder="+91-9876543210"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobId">Position *</Label>
                <Select value={formData.jobId} onValueChange={(value) => setFormData({...formData, jobId: value})}>
                  <SelectTrigger>
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
          </div>

          {/* Professional Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Professional Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="experience">Total Experience *</Label>
                <Select value={formData.experience} onValueChange={(value) => setFormData({...formData, experience: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">0-1 years</SelectItem>
                    <SelectItem value="2-3">2-3 years</SelectItem>
                    <SelectItem value="4-6">4-6 years</SelectItem>
                    <SelectItem value="7-10">7-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentCompany">Current Company</Label>
                <Input
                  id="currentCompany"
                  value={formData.currentCompany}
                  onChange={(e) => setFormData({...formData, currentCompany: e.target.value})}
                  placeholder="e.g., Google, Microsoft, etc."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expectedSalary">Expected Salary (LPA)</Label>
                <Input
                  id="expectedSalary"
                  value={formData.expectedSalary}
                  onChange={(e) => setFormData({...formData, expectedSalary: e.target.value})}
                  placeholder="e.g., 15-20 LPA"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="noticePeriod">Notice Period</Label>
                <Select value={formData.noticePeriod} onValueChange={(value) => setFormData({...formData, noticePeriod: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select notice period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="15-days">15 days</SelectItem>
                    <SelectItem value="1-month">1 month</SelectItem>
                    <SelectItem value="2-months">2 months</SelectItem>
                    <SelectItem value="3-months">3 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Skills & Resume */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Skills & Documents</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="skills">Key Skills *</Label>
                <Textarea
                  id="skills"
                  value={formData.skills}
                  onChange={(e) => setFormData({...formData, skills: e.target.value})}
                  placeholder="e.g., React, Node.js, Python, AWS, etc."
                  rows={2}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="resume">Resume Upload *</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                    required
                  />
                  {formData.resumeFile && (
                    <div className="flex items-center gap-2 text-sm text-success">
                      <FileText className="h-4 w-4" />
                      {formData.resumeFile.name}
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Any additional information about the candidate..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!formData.candidateName || !formData.candidateEmail || !formData.candidatePhone || !formData.jobId || !formData.experience || !formData.skills || !formData.resumeFile}
            >
              Submit Candidate
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};