import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, X } from "lucide-react";
import { JobSource } from "@/types/platform";

interface CreateJobModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateJobModal = ({ open, onOpenChange }: CreateJobModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    workType: "",
    description: "",
    requirements: [""],
    isInternal: false,
    postingPlatforms: ['Workday'] as JobSource[]
  });

  const platforms: JobSource[] = ['LinkedIn', 'Indeed', 'Workday', 'SuccessFactors'];

  const togglePlatform = (platform: JobSource) => {
    const currentPlatforms = formData.postingPlatforms;
    if (currentPlatforms.includes(platform)) {
      setFormData({
        ...formData,
        postingPlatforms: currentPlatforms.filter(p => p !== platform)
      });
    } else {
      setFormData({
        ...formData,
        postingPlatforms: [...currentPlatforms, platform]
      });
    }
  };

  const addRequirement = () => {
    setFormData({
      ...formData,
      requirements: [...formData.requirements, ""]
    });
  };

  const updateRequirement = (index: number, value: string) => {
    const newReqs = [...formData.requirements];
    newReqs[index] = value;
    setFormData({ ...formData, requirements: newReqs });
  };

  const removeRequirement = (index: number) => {
    if (formData.requirements.length > 1) {
      const newReqs = formData.requirements.filter((_, i) => i !== index);
      setFormData({ ...formData, requirements: newReqs });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const platformsText = formData.postingPlatforms.length > 0 
      ? `Posted to: ${formData.postingPlatforms.join(', ')}`
      : 'Posted internally';
    
    toast({
      title: "Job Created Successfully!",
      description: `${formData.title} has been posted and is now live. ${platformsText}`,
    });
    
    // Reset form
    setFormData({
      title: "",
      department: "",
      location: "",
      workType: "",
      description: "",
      requirements: [""],
      isInternal: false,
      postingPlatforms: ['Workday']
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New Job Posting
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="e.g., Senior Software Engineer"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="department">Department *</Label>
              <Select value={formData.department} onValueChange={(value) => setFormData({...formData, department: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Product">Product</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Human Resources">Human Resources</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Select value={formData.location} onValueChange={(value) => setFormData({...formData, location: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bangalore">Bangalore</SelectItem>
                  <SelectItem value="Mumbai">Mumbai</SelectItem>
                  <SelectItem value="Delhi">Delhi</SelectItem>
                  <SelectItem value="Pune">Pune</SelectItem>
                  <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                  <SelectItem value="Chennai">Chennai</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="workType">Work Type *</Label>
              <Select value={formData.workType} onValueChange={(value) => setFormData({...formData, workType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select work type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="onsite">On-site</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Job Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe the role, responsibilities, and what makes this position exciting..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-4">
            <Label>Key Requirements *</Label>
            {formData.requirements.map((req, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={req}
                  onChange={(e) => updateRequirement(index, e.target.value)}
                  placeholder={`Requirement ${index + 1}`}
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeRequirement(index)}
                  disabled={formData.requirements.length === 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addRequirement}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Requirement
            </Button>
          </div>

          <div className="space-y-4">
            <Label>Posting Platforms *</Label>
            <div className="grid grid-cols-2 gap-3">
              {platforms.map(platform => (
                <div
                  key={platform}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    formData.postingPlatforms.includes(platform)
                      ? 'border-primary bg-primary/5'
                      : 'border-input hover:border-primary/50'
                  }`}
                  onClick={() => togglePlatform(platform)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{platform}</span>
                    <Checkbox
                      checked={formData.postingPlatforms.includes(platform)}
                      onChange={() => {}} // Handled by div click
                    />
                  </div>
                </div>
              ))}
            </div>
            {formData.postingPlatforms.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground">Selected platforms:</span>
                {formData.postingPlatforms.map(platform => (
                  <Badge key={platform} variant="secondary">
                    {platform}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isInternal"
              checked={formData.isInternal}
              onCheckedChange={(checked) => setFormData({...formData, isInternal: checked as boolean})}
            />
            <Label htmlFor="isInternal">Internal Position (visible only to associates)</Label>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={
                !formData.title || 
                !formData.department || 
                !formData.location || 
                !formData.workType || 
                !formData.description ||
                formData.postingPlatforms.length === 0
              }
            >
              Create Job Posting
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};