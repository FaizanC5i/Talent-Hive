import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockSkills, mockJobRecommendations } from "@/data/mockData";
import { Skill, SkillLevel } from "@/types/platform";
import { Star, TrendingUp, Award, Target, Briefcase } from "lucide-react";

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const getSkillLevelColor = (level: SkillLevel) => {
    switch (level) {
      case 'beginner': return 'bg-red-100 text-red-800 border-red-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'expert': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSkillLevelProgress = (level: SkillLevel) => {
    switch (level) {
      case 'beginner': return 25;
      case 'intermediate': return 50;
      case 'advanced': return 75;
      case 'expert': return 100;
      default: return 0;
    }
  };

  const categories = ["all", ...Array.from(new Set(mockSkills.map(skill => skill.category)))];
  const filteredSkills = selectedCategory === "all" 
    ? mockSkills 
    : mockSkills.filter(skill => skill.category === selectedCategory);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-foreground">Skills Profile</h1>
        <Button variant="enterprise" className="h-8 text-xs">
          <Target className="h-3 w-3 mr-1" />
          Take Assessment
        </Button>
      </div>

      {/* Skills Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Card className="shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              <div>
                <div className="text-lg font-bold">{mockSkills.length}</div>
                <div className="text-xs text-muted-foreground">Total Skills</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-success" />
              <div>
                <div className="text-lg font-bold">{mockSkills.filter(s => s.verified).length}</div>
                <div className="text-xs text-muted-foreground">Verified</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-warning" />
              <div>
                <div className="text-lg font-bold">{mockSkills.filter(s => s.level === 'expert').length}</div>
                <div className="text-xs text-muted-foreground">Expert Level</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-purple-500" />
              <div>
                <div className="text-lg font-bold">{mockJobRecommendations.length}</div>
                <div className="text-xs text-muted-foreground">Job Matches</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 h-8">
          <TabsTrigger value="profile">Skills Profile</TabsTrigger>
          <TabsTrigger value="recommendations">Job Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-3">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                className="h-7 text-xs"
                onClick={() => setSelectedCategory(category)}
              >
                {category === "all" ? "All Skills" : category}
              </Button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid gap-3">
            {filteredSkills.map((skill) => (
              <Card key={skill.id} className="shadow-sm">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-sm">{skill.name}</h3>
                      {skill.verified && (
                        <Badge variant="secondary" className="text-xs bg-success text-success-foreground">
                          <Star className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <Badge className={getSkillLevelColor(skill.level)} variant="outline">
                      {skill.level}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{skill.category}</span>
                      <span className="font-medium">{getSkillLevelProgress(skill.level)}%</span>
                    </div>
                    <Progress value={getSkillLevelProgress(skill.level)} className="h-1.5" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-3">
          <div className="text-center mb-4">
            <h3 className="text-base font-semibold mb-1.5">Personalized Job Recommendations</h3>
            <p className="text-xs text-muted-foreground">Based on your skills profile and expertise</p>
          </div>

          {mockJobRecommendations.map((recommendation) => (
            <Card key={recommendation.job.id} className="shadow-enterprise-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{recommendation.job.title}</CardTitle>
                    <div className="text-sm text-muted-foreground">
                      {recommendation.job.department} • {recommendation.job.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-success">{recommendation.matchScore}%</div>
                    <div className="text-sm text-muted-foreground">Match</div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2 text-success">Matching Skills:</h4>
                    <div className="flex flex-wrap gap-1">
                      {recommendation.matchingSkills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-success text-success-foreground">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {recommendation.missingSkills.length > 0 && (
                    <div>
                      <h4 className="font-medium text-sm mb-2 text-warning">Skills to Develop:</h4>
                      <div className="flex flex-wrap gap-1">
                        {recommendation.missingSkills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-muted-foreground">
                    Posted {new Date(recommendation.job.openedDate).toLocaleDateString()}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button size="sm" variant="enterprise">
                      Apply Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}