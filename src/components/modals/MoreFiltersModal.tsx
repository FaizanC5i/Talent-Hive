import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter } from "lucide-react";

interface MoreFiltersModalProps {
  selectedSupervisoryLevels: string[];
  setSelectedSupervisoryLevels: (levels: string[]) => void;
  selectedSegments: string[];
  setSelectedSegments: (segments: string[]) => void;
  selectedJobFamilyGroups: string[];
  setSelectedJobFamilyGroups: (groups: string[]) => void;
  selectedJobLevels: string[];
  setSelectedJobLevels: (levels: string[]) => void;
}

export const MoreFiltersModal = ({
  selectedSupervisoryLevels,
  setSelectedSupervisoryLevels,
  selectedSegments,
  setSelectedSegments,
  selectedJobFamilyGroups,
  setSelectedJobFamilyGroups,
  selectedJobLevels,
  setSelectedJobLevels,
}: MoreFiltersModalProps) => {
  const [open, setOpen] = useState(false);

  const supervisoryLevels = ["L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8"];
  const segments = ["Corporate", "Edge", "MW", "Food", "Pet care"];
  const jobFamilyGroups = [
    "Business Integration",
    "Commercial",
    "Corporate Affairs",
    "Data, Analytics & Insights",
    "Digital Technologies",
    "Finance"
  ];
  const jobLevels = [
    ["B1", "B2", "B3", "B4", "B5"],
    ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8"],
    ["P1", "P2", "P3", "P4"],
    ["GL1", "GL2"],
    ["Office of President"]
  ];

  const handleCheckboxChange = (
    value: string,
    selectedValues: string[],
    setSelectedValues: (values: string[]) => void
  ) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter(v => v !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  const clearAllFilters = () => {
    setSelectedSupervisoryLevels([]);
    setSelectedSegments([]);
    setSelectedJobFamilyGroups([]);
    setSelectedJobLevels([]);
  };

  const getTotalFiltersCount = () => {
    return selectedSupervisoryLevels.length + 
           selectedSegments.length + 
           selectedJobFamilyGroups.length + 
           selectedJobLevels.length;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="justify-between text-sm">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
          {getTotalFiltersCount() > 0 && (
            <Badge variant="secondary" className="ml-2 text-xs">
              {getTotalFiltersCount()}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl bg-background border shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Additional Filters</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {/* Supervisory Organization Level */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Supervisory Organization Level</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-4 gap-2">
                {supervisoryLevels.map((level) => (
                  <div key={level} className="flex items-center space-x-2">
                    <Checkbox
                      id={`supervisory-${level}`}
                      checked={selectedSupervisoryLevels.includes(level)}
                      onCheckedChange={() => handleCheckboxChange(level, selectedSupervisoryLevels, setSelectedSupervisoryLevels)}
                    />
                    <label htmlFor={`supervisory-${level}`} className="text-sm font-medium leading-none">
                      {level}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Segment */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Segment</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {segments.map((segment) => (
                  <div key={segment} className="flex items-center space-x-2">
                    <Checkbox
                      id={`segment-${segment}`}
                      checked={selectedSegments.includes(segment)}
                      onCheckedChange={() => handleCheckboxChange(segment, selectedSegments, setSelectedSegments)}
                    />
                    <label htmlFor={`segment-${segment}`} className="text-sm font-medium leading-none">
                      {segment}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Job Family Group */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Job Family Group</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {jobFamilyGroups.map((group) => (
                  <div key={group} className="flex items-center space-x-2">
                    <Checkbox
                      id={`job-family-${group}`}
                      checked={selectedJobFamilyGroups.includes(group)}
                      onCheckedChange={() => handleCheckboxChange(group, selectedJobFamilyGroups, setSelectedJobFamilyGroups)}
                    />
                    <label htmlFor={`job-family-${group}`} className="text-sm font-medium leading-none">
                      {group}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Job Level */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Job Level</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-5 gap-4">
                {jobLevels.map((column, columnIndex) => (
                  <div key={columnIndex} className="space-y-2">
                    {column.map((level) => (
                      <div key={level} className="flex items-center space-x-2">
                        <Checkbox
                          id={`job-level-${level}`}
                          checked={selectedJobLevels.includes(level)}
                          onCheckedChange={() => handleCheckboxChange(level, selectedJobLevels, setSelectedJobLevels)}
                        />
                        <label htmlFor={`job-level-${level}`} className="text-sm font-medium leading-none">
                          {level}
                        </label>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-4 border-t">
          <Button 
            variant="outline" 
            size="sm"
            onClick={clearAllFilters}
          >
            Clear All
          </Button>
          <Button 
            size="sm"
            onClick={() => setOpen(false)}
          >
            Apply Filters
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};