import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { mockReferrals, mockJobs } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Calendar, Mail, Phone, FileText } from "lucide-react";

export default function Referrals() {
  const [selectedJob, setSelectedJob] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [candidatePhone, setCandidatePhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmitReferral = () => {
    if (!selectedJob || !candidateName || !candidateEmail) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Referral Submitted",
      description: `Thank you for referring ${candidateName}. They will be contacted soon.`,
    });

    // Reset form
    setSelectedJob("");
    setCandidateName("");
    setCandidateEmail("");
    setCandidatePhone("");
    setNotes("");
    setIsDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'shortlisted': return 'bg-tag-status-progress text-tag-status-progress-foreground';
      case 'interview_scheduled': return 'bg-tag-status-progress text-tag-status-progress-foreground';
      case 'offered': return 'bg-tag-status-progress text-tag-status-progress-foreground';
      case 'rejected': return 'bg-tag-status-error text-tag-status-error-foreground';
      case 'hired': return 'bg-tag-status-success text-tag-status-success-foreground';
      default: return 'bg-tag-status-pending text-tag-status-pending-foreground';
    }
  };

  return (
    <div className="space-y-5 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-lg md:text-xl font-bold text-foreground">Associate Referrals</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="enterprise" className="h-9 text-sm w-full sm:w-auto">
              <UserPlus className="h-4 w-4 mr-1.5" />
              Refer a Candidate
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Submit a Referral</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="job">Select Job Position *</Label>
                <Select value={selectedJob} onValueChange={setSelectedJob}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a position" />
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

              <div>
                <Label htmlFor="name">Candidate Name *</Label>
                <Input
                  id="name"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={candidateEmail}
                  onChange={(e) => setCandidateEmail(e.target.value)}
                  placeholder="candidate@email.com"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={candidatePhone}
                  onChange={(e) => setCandidatePhone(e.target.value)}
                  placeholder="+91-9876543210"
                />
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Why do you think they'd be a good fit?"
                  rows={3}
                />
              </div>

              <Button onClick={handleSubmitReferral} className="w-full">
                Submit Referral
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Referral Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        <Card className="shadow-enterprise-sm">
          <CardContent className="p-3 md:p-4">
            <div className="text-xl md:text-2xl font-bold text-primary">
              {mockReferrals.length}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">Total Referrals</div>
          </CardContent>
        </Card>
        <Card className="shadow-enterprise-sm">
          <CardContent className="p-3 md:p-4">
            <div className="text-xl md:text-2xl font-bold text-success">
              {mockReferrals.filter(r => r.status === 'shortlisted').length}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">Shortlisted</div>
          </CardContent>
        </Card>
        <Card className="shadow-enterprise-sm">
          <CardContent className="p-3 md:p-4">
            <div className="text-xl md:text-2xl font-bold text-warning">
              {mockReferrals.filter(r => r.status === 'interview_scheduled').length}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">In Process</div>
          </CardContent>
        </Card>
        <Card className="shadow-enterprise-sm">
          <CardContent className="p-3 md:p-4">
            <div className="text-xl md:text-2xl font-bold text-emerald-600">
              0
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">Hired</div>
          </CardContent>
        </Card>
      </div>

      {/* Referral Program Info */}
      <Card className="shadow-sm bg-gradient-to-r from-primary/10 to-accent/5">
        <CardContent className="p-3 md:p-4">
          <h3 className="text-sm md:text-base font-semibold mb-2">🎯 Referral Rewards Program</h3>
          <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
            Earn rewards for successful referrals! Get $500 for each hired candidate and $100 for shortlisted candidates.
          </p>
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            <Badge variant="secondary" className="bg-success text-success-foreground text-xs">$500 per hire</Badge>
            <Badge variant="outline" className="text-xs">$100 per shortlist</Badge>
            <Badge variant="outline" className="text-xs">Fast-track process</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Referrals List */}
      <Tabs defaultValue="all" className="space-y-3 md:space-y-4">
        <TabsList className="grid w-full grid-cols-3 h-8 text-xs">
          <TabsTrigger value="all" className="text-xs">All ({mockReferrals.length})</TabsTrigger>
          <TabsTrigger value="active" className="text-xs">Active ({mockReferrals.filter(r => !['rejected', 'hired'].includes(r.status)).length})</TabsTrigger>
          <TabsTrigger value="completed" className="text-xs">Done ({mockReferrals.filter(r => ['rejected', 'hired'].includes(r.status)).length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3">
          {mockReferrals.map((referral) => (
            <Card key={referral.id} className="shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="space-y-1.5">
                    <CardTitle className="text-base">{referral.candidateName}</CardTitle>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        {referral.jobTitle}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Submitted {new Date(referral.submittedDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(referral.status)}>
                    {referral.status.replace('_', ' ')}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="active" className="space-y-3">
          {mockReferrals.filter(r => !['rejected', 'hired'].includes(r.status)).map((referral) => (
            <Card key={referral.id} className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-sm">{referral.candidateName}</h3>
                    <p className="text-xs text-muted-foreground">{referral.jobTitle}</p>
                  </div>
                  <Badge className={getStatusColor(referral.status)}>
                    {referral.status.replace('_', ' ')}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-3">
          {mockReferrals.filter(r => ['rejected', 'hired'].includes(r.status)).map((referral) => (
            <Card key={referral.id} className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-sm">{referral.candidateName}</h3>
                    <p className="text-xs text-muted-foreground">{referral.jobTitle}</p>
                  </div>
                  <Badge className={getStatusColor(referral.status)}>
                    {referral.status.replace('_', ' ')}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}