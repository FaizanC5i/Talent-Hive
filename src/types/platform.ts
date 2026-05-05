// Core platform types for the Talent Acquisition Platform

export type UserRole = 'employee' | 'po' | 'vendor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  employeeId?: string;
  vendorId?: string;
}

export type JobStatus = 'open' | 'shortlisting' | 'interviewing' | 'offer_stage' | 'closed';
export type ApplicationStatus = 'applied' | 'manager_review' | 'po_review' | 'shortlisted' | 'interview_scheduled' | 'decision' | 'approved' | 'offered' | 'rejected' | 'hired';

export type JobSource = 'LinkedIn' | 'Indeed' | 'Workday' | 'SuccessFactors';

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  workType: 'onsite' | 'remote' | 'hybrid';
  status: JobStatus;
  openedDate: string;
  description: string;
  requirements: string[];
  isInternal: boolean;
  applicationsCount: number;
  source: JobSource;
  postingPlatforms?: JobSource[];
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  appliedFor: string;
  status: ApplicationStatus;
  appliedDate: string;
  source: string;
  resume?: string;
  notes?: string;
}

export interface Referral {
  id: string;
  referrerName: string;
  candidateName: string;
  jobTitle: string;
  status: ApplicationStatus;
  submittedDate: string;
}

export interface DashboardMetrics {
  totalApplications: number;
  activeJobs: number;
  pendingInterviews: number;
  offersExtended: number;
  conversionRate: number;
  timeToFill: number;
}

export interface VendorPerformance {
  vendorName: string;
  totalSubmissions: number;
  hires: number;
  conversionRate: number;
  averageTimeToFill: number;
}

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface Skill {
  id: string;
  name: string;
  level: SkillLevel;
  verified: boolean;
  category: string;
}

export interface SkillAssessment {
  id: string;
  title: string;
  category: string;
  questions: Question[];
  duration: number; // in minutes
  passingScore: number;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface AssessmentResult {
  id: string;
  assessmentId: string;
  userId: string;
  score: number;
  completedAt: string;
  passed: boolean;
}

export interface JobRecommendation {
  job: Job;
  matchScore: number;
  matchingSkills: string[];
  missingSkills: string[];
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  userId: string;
  status: ApplicationStatus;
  appliedDate: string;
  lastUpdated: string;
}