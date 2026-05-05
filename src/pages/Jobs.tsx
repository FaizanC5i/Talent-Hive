import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { mockJobs } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { MoreFiltersModal } from "@/components/modals/MoreFiltersModal";
import { Search, MapPin, Clock, Users, Briefcase, Filter, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Jobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedBusinessUnits, setSelectedBusinessUnits] = useState<string[]>([]);
  const [selectedRemoteTypes, setSelectedRemoteTypes] = useState<string[]>([]);
  const [selectedSupervisoryLevels, setSelectedSupervisoryLevels] = useState<string[]>([]);
  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);
  const [selectedJobFamilyGroups, setSelectedJobFamilyGroups] = useState<string[]>([]);
  const [selectedJobLevels, setSelectedJobLevels] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState("compact"); // cards or compact
  const [sortBy, setSortBy] = useState("most-relevant"); // most-relevant or most-recent
  const { user } = useAuth();
  const { toast } = useToast();

  const filterOptions = {
    categories: ["Retail", "Sales", "Students & Graduates", "Supply Chain & Engineering", "Support Services"],
    countries: ["Thailand", "Turkiye", "Ukraine", "US", "UK"],
    cities: ["Acheson", "Amsterdam", "Barcelona", "Batley", "Beijing", "Brooklyn"],
    businessUnits: ["Mars Corporate", "Mars Food & Nutrition", "Mars Global Services", "Mars Petcare", "Mars Snacking"],
    remoteTypes: ["Hybrid", "On-site", "Remote", "Unspecified"]
  };

  const filteredAndSortedJobs = mockJobs
    .filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.department.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(job.department);
      const matchesCountry = selectedCountries.length === 0 || selectedCountries.some(country => 
        job.location.toLowerCase().includes(country.toLowerCase())
      );
      const matchesCity = selectedCities.length === 0 || selectedCities.some(city => 
        job.location.toLowerCase().includes(city.toLowerCase())
      );
      const matchesBusinessUnit = selectedBusinessUnits.length === 0 || selectedBusinessUnits.includes(job.department);
      const matchesRemoteType = selectedRemoteTypes.length === 0 || selectedRemoteTypes.some(type => 
        job.workType.toLowerCase().includes(type.toLowerCase())
      );
      
      return matchesSearch && matchesCategory && matchesCountry && matchesCity && matchesBusinessUnit && matchesRemoteType;
    })
    .sort((a, b) => {
      if (sortBy === "most-recent") {
        return new Date(b.openedDate).getTime() - new Date(a.openedDate).getTime();
      }
      // Default to most relevant (by applications count for now)
      return b.applicationsCount - a.applicationsCount;
    });

  const handleApply = (jobId: string, jobTitle: string) => {
    toast({
      title: "Application Submitted",
      description: `Your application for ${jobTitle} has been submitted successfully.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-tag-status-success text-tag-status-success-foreground';
      case 'shortlisting': return 'bg-tag-status-progress text-tag-status-progress-foreground';
      case 'interviewing': return 'bg-tag-status-progress text-tag-status-progress-foreground';
      case 'offer_stage': return 'bg-tag-status-progress text-tag-status-progress-foreground';
      default: return 'bg-tag-status-pending text-tag-status-pending-foreground';
    }
  };

  const getWorkTypeIcon = (workType: string) => {
    switch (workType) {
      case 'remote': return '🏠';
      case 'hybrid': return '🔄';
      case 'onsite': return '🏢';
      default: return '📍';
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'LinkedIn': return 'bg-tag-source-base text-tag-source-base-foreground border-l-2 border-l-tag-source-linkedin border-y border-r border-tag-source-base';
      case 'Workday': return 'bg-tag-source-base text-tag-source-base-foreground border-l-2 border-l-tag-source-workday border-y border-r border-tag-source-base';
      case 'Indeed': return 'bg-tag-source-base text-tag-source-base-foreground border-l-2 border-l-tag-source-indeed border-y border-r border-tag-source-base';
      case 'SuccessFactors': return 'bg-tag-source-base text-tag-source-base-foreground border border-tag-source-base';
      default: return 'bg-tag-source-base text-tag-source-base-foreground border border-tag-source-base';
    }
  };

  const CompactJobCard = ({ job }: { job: any }) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <h3 className="font-medium text-sm truncate">{job.title}</h3>
          {job.isInternal && (
            <Badge variant="secondary" className="text-xs bg-success text-success-foreground">Internal</Badge>
          )}
        </div>
        <div className="flex items-center gap-3 sm:gap-4 text-sm text-muted-foreground flex-wrap">
          <span className="flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate">{job.department}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate">{job.location}</span>
          </span>
          <span className="hidden sm:inline">{getWorkTypeIcon(job.workType)} {job.workType}</span>
          <Badge className={`${getSourceColor(job.source)} hidden md:inline-flex`} variant="secondary">
            {job.source}
          </Badge>
        </div>
      </div>
      <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
        <Badge className={`${getStatusColor(job.status)} text-xs`}>
          {job.status.replace('_', ' ')}
        </Badge>
        <Button 
          variant="outline" 
          size="sm"
          className="text-sm h-9"
          onClick={() => {
            toast({
              title: "Referral Started!",
              description: `Opening referral form for ${job.title}. Help us find great talent!`,
            });
          }}
        >
          Refer
        </Button>
        <Button size="sm" className="text-sm h-9" onClick={() => handleApply(job.id, job.title)}>
          Apply
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-5 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-lg md:text-xl font-bold text-foreground">Search Jobs</h1>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="px-3 py-1.5 text-sm">
            {filteredAndSortedJobs.length} positions
          </Badge>
          <Button
            variant="outline"
            size="sm"
            className="text-sm h-9"
            onClick={() => setViewMode(viewMode === "cards" ? "compact" : "cards")}
          >
            {viewMode === "cards" ? "Compact" : "Cards"}
          </Button>
        </div>
      </div>

      {/* Sort Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <span className="text-sm font-medium text-foreground">Sort by:</span>
        <div className="flex gap-3">
          <Button
            variant={sortBy === "most-relevant" ? "default" : "outline"}
            size="sm"
            className="text-sm h-9"
            onClick={() => setSortBy("most-relevant")}
          >
            Most Relevant
          </Button>
          <Button
            variant={sortBy === "most-recent" ? "default" : "outline"}
            size="sm"
            className="text-xs h-8"
            onClick={() => setSortBy("most-recent")}
          >
            Most Recent
          </Button>
        </div>
      </div>

      {/* Enhanced Multi-Select Filters */}
      <Card className="shadow-sm">
        <CardContent className="p-3 md:p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Category Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-between text-sm">
                  Category
                  {selectedCategories.length > 0 && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {selectedCategories.length}
                    </Badge>
                  )}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-3" align="start">
                <div className="space-y-2">
                  {filterOptions.categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCategories([...selectedCategories, category]);
                          } else {
                            setSelectedCategories(selectedCategories.filter(c => c !== category));
                          }
                        }}
                      />
                      <label htmlFor={`category-${category}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Country Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-between text-sm">
                  Country
                  {selectedCountries.length > 0 && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {selectedCountries.length}
                    </Badge>
                  )}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-3" align="start">
                <div className="space-y-2">
                  {filterOptions.countries.map((country) => (
                    <div key={country} className="flex items-center space-x-2">
                      <Checkbox
                        id={`country-${country}`}
                        checked={selectedCountries.includes(country)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCountries([...selectedCountries, country]);
                          } else {
                            setSelectedCountries(selectedCountries.filter(c => c !== country));
                          }
                        }}
                      />
                      <label htmlFor={`country-${country}`} className="text-sm font-medium leading-none">
                        {country}
                      </label>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* City Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-between text-sm">
                  City
                  {selectedCities.length > 0 && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {selectedCities.length}
                    </Badge>
                  )}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-3" align="start">
                <div className="space-y-2">
                  {filterOptions.cities.map((city) => (
                    <div key={city} className="flex items-center space-x-2">
                      <Checkbox
                        id={`city-${city}`}
                        checked={selectedCities.includes(city)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCities([...selectedCities, city]);
                          } else {
                            setSelectedCities(selectedCities.filter(c => c !== city));
                          }
                        }}
                      />
                      <label htmlFor={`city-${city}`} className="text-sm font-medium leading-none">
                        {city}
                      </label>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Business Unit Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-between text-sm">
                  Business Unit
                  {selectedBusinessUnits.length > 0 && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {selectedBusinessUnits.length}
                    </Badge>
                  )}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-3" align="start">
                <div className="space-y-2">
                  {filterOptions.businessUnits.map((unit) => (
                    <div key={unit} className="flex items-center space-x-2">
                      <Checkbox
                        id={`unit-${unit}`}
                        checked={selectedBusinessUnits.includes(unit)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedBusinessUnits([...selectedBusinessUnits, unit]);
                          } else {
                            setSelectedBusinessUnits(selectedBusinessUnits.filter(u => u !== unit));
                          }
                        }}
                      />
                      <label htmlFor={`unit-${unit}`} className="text-sm font-medium leading-none">
                        {unit}
                      </label>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Remote Type Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-between text-sm">
                  Remote Type
                  {selectedRemoteTypes.length > 0 && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {selectedRemoteTypes.length}
                    </Badge>
                  )}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-3" align="start">
                <div className="space-y-2">
                  {filterOptions.remoteTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`remote-${type}`}
                        checked={selectedRemoteTypes.includes(type)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedRemoteTypes([...selectedRemoteTypes, type]);
                          } else {
                            setSelectedRemoteTypes(selectedRemoteTypes.filter(t => t !== type));
                          }
                        }}
                      />
                      <label htmlFor={`remote-${type}`} className="text-sm font-medium leading-none">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          {/* More Filters and Clear All Filters */}
          <div className="flex justify-between items-center mt-3">
            <MoreFiltersModal 
              selectedSupervisoryLevels={selectedSupervisoryLevels}
              setSelectedSupervisoryLevels={setSelectedSupervisoryLevels}
              selectedSegments={selectedSegments}
              setSelectedSegments={setSelectedSegments}
              selectedJobFamilyGroups={selectedJobFamilyGroups}
              setSelectedJobFamilyGroups={setSelectedJobFamilyGroups}
              selectedJobLevels={selectedJobLevels}
              setSelectedJobLevels={setSelectedJobLevels}
            />
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategories([]);
                setSelectedCountries([]);
                setSelectedCities([]);
                setSelectedBusinessUnits([]);
                setSelectedRemoteTypes([]);
                setSelectedSupervisoryLevels([]);
                setSelectedSegments([]);
                setSelectedJobFamilyGroups([]);
                setSelectedJobLevels([]);
              }}
              className="text-xs"
            >
              <Filter className="h-3 w-3 mr-1" />
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* All Jobs - Unified View */}
      {viewMode === "compact" ? (
        <div className="max-h-96 overflow-y-auto space-y-2">
          {filteredAndSortedJobs.map((job) => (
            <CompactJobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredAndSortedJobs.map((job) => (
            <Card key={job.id} className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base">{job.title}</CardTitle>
                      {job.isInternal && (
                        <Badge variant="secondary" className="text-xs bg-success text-success-foreground">Internal</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {job.department}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <span>{getWorkTypeIcon(job.workType)}</span>
                        {job.workType}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {job.applicationsCount} applied
                      </div>
                      <Badge className={getSourceColor(job.source)} variant="secondary">
                        {job.source}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <Badge className={getStatusColor(job.status)}>
                      {job.status.replace('_', ' ')}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      Posted {new Date(job.openedDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{job.description}</p>
                
                <div>
                  <h4 className="font-medium mb-2">Required Skills:</h4>
                  <div className="flex flex-wrap gap-1">
                    {job.requirements.map((req, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-muted-foreground">
                    {job.applicationsCount} candidates applied
                  </div>
                    <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        const jobData = mockJobs.find(j => j.id === job.id);
                        if (jobData) {
                          toast({
                            title: "Job Details",
                            description: `${jobData.title} - ${jobData.department} • ${jobData.location}`,
                          });
                        }
                      }}
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Referral Started!",
                          description: `Opening referral form for ${job.title}. Help us find great talent!`,
                        });
                      }}
                    >
                      Refer a Friend
                    </Button>
                    {user?.role === 'employee' && (
                      <Button 
                        size="sm" 
                        onClick={() => handleApply(job.id, job.title)}
                      >
                        Apply Now
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}