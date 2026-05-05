import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { mockAssessments, mockAssessmentResults } from "@/data/mockData";
import { Question } from "@/types/platform";
import { useToast } from "@/hooks/use-toast";
import { Clock, Award, CheckCircle, Target, BookOpen, TrendingUp, Calendar } from "lucide-react";

export default function Assessments() {
  const [selectedAssessment, setSelectedAssessment] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const startAssessment = (assessment: any) => {
    setSelectedAssessment(assessment);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setIsAssessmentOpen(true);
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);

    if (currentQuestion < selectedAssessment.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Assessment completed
      const correctAnswers = selectedAssessment.questions.filter(
        (q: Question, index: number) => q.correctAnswer === newAnswers[index]
      ).length;
      const score = Math.round((correctAnswers / selectedAssessment.questions.length) * 100);
      
      setShowResults(true);
      toast({
        title: "Assessment Completed!",
        description: `You scored ${score}% on ${selectedAssessment.title}`,
      });
    }
  };

  const closeAssessment = () => {
    setIsAssessmentOpen(false);
    setSelectedAssessment(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  const availableAssessments = mockAssessments.filter(
    assessment => !mockAssessmentResults.some(result => result.assessmentId === assessment.id)
  );

  const completedAssessments = mockAssessmentResults.map(result => {
    const assessment = mockAssessments.find(a => a.id === result.assessmentId);
    return { ...result, assessment };
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-foreground">Skill Assessments</h1>
        <Badge variant="outline" className="px-2 py-0.5 h-6 text-xs">
          {mockAssessments.length} assessments available
        </Badge>
      </div>

      {/* Assessment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Card className="shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <div>
                <div className="text-lg font-bold">{mockAssessments.length}</div>
                <div className="text-xs text-muted-foreground">Available</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <div>
                <div className="text-lg font-bold">{completedAssessments.length}</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-warning" />
              <div>
                <div className="text-lg font-bold">{completedAssessments.filter(r => r.passed).length}</div>
                <div className="text-xs text-muted-foreground">Passed</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-purple-500" />
              <div>
                <div className="text-lg font-bold">
                  {completedAssessments.length > 0 
                    ? Math.round(completedAssessments.reduce((acc, r) => acc + r.score, 0) / completedAssessments.length)
                    : 0}%
                </div>
                <div className="text-xs text-muted-foreground">Avg Score</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="available" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 h-8">
          <TabsTrigger value="available">Available ({availableAssessments.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedAssessments.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-3">
          {availableAssessments.map((assessment) => (
            <Card key={assessment.id} className="shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="space-y-1.5">
                    <CardTitle className="text-base">{assessment.title}</CardTitle>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Target className="h-3 w-3" />
                        {assessment.category}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {assessment.duration} minutes
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        {assessment.passingScore}% to pass
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="h-6 text-xs">
                    {assessment.questions.length} questions
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="text-sm text-muted-foreground">
                  Test your knowledge in {assessment.category.toLowerCase()} with this comprehensive assessment.
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    Difficulty: Intermediate
                  </div>
                  <Button onClick={() => startAssessment(assessment)} variant="enterprise" className="h-7 text-xs">
                    Start Assessment
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-3">
          {completedAssessments.map((result) => (
            <Card key={result.id} className="shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="space-y-1.5">
                    <CardTitle className="text-base">{result.assessment?.title}</CardTitle>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Completed {new Date(result.completedAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="h-3 w-3" />
                        {result.assessment?.category}
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-lg font-bold text-primary">{result.score}%</div>
                    <Badge className={result.passed ? "bg-tag-blue text-tag-blue-foreground" : "bg-tag-gray text-tag-gray-foreground"}>
                      {result.passed ? "Passed" : "Failed"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between">
                  <Progress value={result.score} className="flex-1 mr-4 h-1.5" />
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    View Certificate
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Assessment Dialog */}
      <Dialog open={isAssessmentOpen} onOpenChange={setIsAssessmentOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedAssessment?.title}
              {!showResults && (
                <div className="text-sm font-normal text-muted-foreground mt-1">
                  Question {currentQuestion + 1} of {selectedAssessment?.questions.length}
                </div>
              )}
            </DialogTitle>
          </DialogHeader>
          
          {selectedAssessment && !showResults && (
            <div className="space-y-6">
              <Progress 
                value={((currentQuestion + 1) / selectedAssessment.questions.length) * 100} 
                className="w-full"
              />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  {selectedAssessment.questions[currentQuestion]?.question}
                </h3>
                
                <div className="space-y-2">
                  {selectedAssessment.questions[currentQuestion]?.options.map((option: string, index: number) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full text-left justify-start h-auto p-4"
                      onClick={() => handleAnswer(index)}
                    >
                      <span className="mr-3 font-mono">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {showResults && selectedAssessment && (
            <div className="space-y-6 text-center">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Assessment Complete!</h3>
                <div className="text-4xl font-bold text-primary">
                  {Math.round((answers.filter((answer, index) => 
                    selectedAssessment.questions[index].correctAnswer === answer
                  ).length / selectedAssessment.questions.length) * 100)}%
                </div>
                <p className="text-muted-foreground">
                  You got {answers.filter((answer, index) => 
                    selectedAssessment.questions[index].correctAnswer === answer
                  ).length} out of {selectedAssessment.questions.length} questions correct.
                </p>
              </div>
              
              <div className="flex gap-2 justify-center">
                <Button onClick={closeAssessment}>
                  Close
                </Button>
                <Button variant="enterprise">
                  View Certificate
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}