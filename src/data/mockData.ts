// Mock data for the Talent Acquisition Platform prototype

import { User, Job, Candidate, Referral, DashboardMetrics, VendorPerformance, Skill, SkillAssessment, AssessmentResult, JobRecommendation, Application } from '@/types/platform';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Emily Johnson',
    email: 'emily.johnson@company.com',
    role: 'employee',
    department: 'Marketing',
    employeeId: '1024'
  },
  {
    id: '2',
    name: 'Michael Davis',
    email: 'michael.davis@company.com',
    role: 'po',
    department: 'P&O'
  },
  {
    id: '3',
    name: 'John Anderson',
    email: 'john.anderson@talentbridge.com',
    role: 'vendor',
    vendorId: 'V-45'
  }
];

export const mockJobs: Job[] = [
  // Real job postings from user requirements
  {
    id: 'job-real-1',
    title: 'Data Scientist',
    department: 'Manufacturing',
    location: 'US',
    workType: 'hybrid',
    status: 'open',
    openedDate: '2024-08-25',
    description: 'Join our data science team to build predictive models and drive data-driven insights across the organization. Work with large datasets, machine learning algorithms, and business stakeholders.',
    requirements: ['Python', 'R', 'Machine Learning', 'SQL', 'Statistics', 'Data Visualization'],
    isInternal: false,
    applicationsCount: 23,
    source: 'LinkedIn'
  },
  {
    id: 'job-real-2',
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'UK',
    workType: 'hybrid',
    status: 'open',
    openedDate: '2024-08-24',
    description: 'Lead comprehensive marketing strategies and campaigns to drive brand awareness and customer engagement. Manage cross-functional teams and marketing budgets.',
    requirements: ['Digital Marketing', 'Campaign Management', 'Brand Strategy', 'Analytics', 'Team Leadership'],
    isInternal: false,
    applicationsCount: 34,
    source: 'Indeed'
  },
  {
    id: 'job-real-3',
    title: 'Cloud Automation Architect',
    department: 'Manufacturing',
    location: 'US',
    workType: 'remote',
    status: 'open',
    openedDate: '2024-08-23',
    description: 'Lead strategy and modernization of web hosting platforms. Provide expert guidance to product and engineering teams. Manage technology roadmap for web services infrastructure.',
    requirements: ['AWS', 'Azure', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD', 'Infrastructure as Code'],
    isInternal: false,
    applicationsCount: 15,
    source: 'SuccessFactors'
  },
  {
    id: 'job-real-4',
    title: 'Sales Representative',
    department: 'Supply Chain',
    location: 'Europe',
    workType: 'onsite',
    status: 'open',
    openedDate: '2024-08-22',
    description: 'Work closely with customers to determine their needs, answer questions, and recommend solutions. Ensure customer satisfaction through excellent sales service.',
    requirements: ['Sales Experience', 'Customer Service', 'Communication', 'Product Knowledge', 'CRM'],
    isInternal: false,
    applicationsCount: 42,
    source: 'Workday'
  },
  // Existing jobs
  {
    id: 'job-1',
    title: 'Software Engineer – Java',
    department: 'Manufacturing',
    location: 'UK',
    workType: 'hybrid',
    status: 'shortlisting',
    openedDate: '2024-08-15',
    description: 'We are looking for an experienced Java developer to join our backend team.',
    requirements: ['Java 8+', 'Spring Boot', 'Microservices', 'SQL'],
    isInternal: false,
    applicationsCount: 45,
    source: 'LinkedIn'
  },
  {
    id: 'job-2',
    title: 'Product Manager – Digital',
    department: 'Marketing',
    location: 'US',
    workType: 'remote',
    status: 'interviewing',
    openedDate: '2024-08-18',
    description: 'Lead digital product initiatives and drive product strategy.',
    requirements: ['5+ years PM experience', 'Digital products', 'Agile', 'Analytics'],
    isInternal: true,
    applicationsCount: 28,
    source: 'Indeed'
  },
  {
    id: 'job-3',
    title: 'P&O Business Partner',
    department: 'P&O',
    location: 'Europe',
    workType: 'onsite',
    status: 'offer_stage',
    openedDate: '2024-08-12',
    description: 'Strategic P&O partner to support business units.',
    requirements: ['HRBP experience', 'Change management', 'Analytics', 'Communication'],
    isInternal: false,
    applicationsCount: 32,
    source: 'Workday'
  },
  {
    id: 'job-4',
    title: 'Data Scientist – NLP',
    department: 'Manufacturing',
    location: 'US',
    workType: 'hybrid',
    status: 'open',
    openedDate: '2024-08-20',
    description: 'Build and deploy ML models for natural language processing applications.',
    requirements: ['Python', 'NLP', 'Machine Learning', 'TensorFlow/PyTorch'],
    isInternal: false,
    applicationsCount: 18,
    source: 'SuccessFactors'
  },
  {
    id: 'job-5',
    title: 'Marketing Specialist',
    department: 'Marketing',
    location: 'UK',
    workType: 'hybrid',
    status: 'open',
    openedDate: '2024-08-21',
    description: 'Drive marketing campaigns and brand strategy across digital channels.',
    requirements: ['Digital Marketing', 'Content Strategy', 'Analytics', 'Social Media'],
    isInternal: true,
    applicationsCount: 22,
    source: 'LinkedIn'
  },
  {
    id: 'job-6',
    title: 'UX Designer',
    department: 'Marketing',
    location: 'Europe',
    workType: 'remote',
    status: 'open',
    openedDate: '2024-08-19',
    description: 'Create intuitive user experiences for our digital products.',
    requirements: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    isInternal: false,
    applicationsCount: 35,
    source: 'Indeed'
  },
  {
    id: 'job-7',
    title: 'DevOps Engineer',
    department: 'Manufacturing',
    location: 'GEMS',
    workType: 'onsite',
    status: 'shortlisting',
    openedDate: '2024-08-17',
    description: 'Manage infrastructure and deployment pipelines for scalable applications.',
    requirements: ['AWS/Azure', 'Kubernetes', 'CI/CD', 'Terraform'],
    isInternal: true,
    applicationsCount: 29,
    source: 'Workday'
  },
  {
    id: 'job-8',
    title: 'Financial Analyst',
    department: 'Finance',
    location: 'US',
    workType: 'hybrid',
    status: 'interviewing',
    openedDate: '2024-08-14',
    description: 'Analyze financial data and provide insights for business decisions.',
    requirements: ['Excel', 'Financial Modeling', 'SQL', 'Power BI'],
    isInternal: false,
    applicationsCount: 17,
    source: 'SuccessFactors'
  },
  {
    id: 'job-9',
    title: 'Technical Writer',
    department: 'Supply Chain',
    location: 'Others',
    workType: 'remote',
    status: 'open',
    openedDate: '2024-08-23',
    description: 'Create comprehensive technical documentation and user guides.',
    requirements: ['Technical Writing', 'API Documentation', 'Markdown', 'Git'],
    isInternal: true,
    applicationsCount: 12,
    source: 'LinkedIn'
  },
  {
    id: 'job-10',
    title: 'Sales Manager',
    department: 'Supply Chain',
    location: 'Europe',
    workType: 'onsite',
    status: 'open',
    openedDate: '2024-08-22',
    description: 'Lead sales initiatives and manage client relationships.',
    requirements: ['Sales Experience', 'CRM', 'Client Management', 'Communication'],
    isInternal: false,
    applicationsCount: 31,
    source: 'Indeed'
  },
  // Additional dummy jobs to reach 24 total
  {
    id: 'job-11',
    title: 'Frontend Developer',
    department: 'Manufacturing',
    location: 'Thailand',
    workType: 'hybrid',
    status: 'open',
    openedDate: '2024-08-26',
    description: 'Build responsive web applications using modern JavaScript frameworks.',
    requirements: ['React', 'TypeScript', 'CSS', 'HTML'],
    isInternal: false,
    applicationsCount: 38,
    source: 'LinkedIn'
  },
  {
    id: 'job-12',
    title: 'Business Analyst',
    department: 'Finance',
    location: 'US',
    workType: 'remote',
    status: 'open',
    openedDate: '2024-08-25',
    description: 'Analyze business processes and recommend solutions for improvement.',
    requirements: ['Business Analysis', 'Process Mapping', 'SQL', 'Excel'],
    isInternal: true,
    applicationsCount: 25,
    source: 'Workday'
  },
  {
    id: 'job-13',
    title: 'Quality Assurance Engineer',
    department: 'Manufacturing',
    location: 'UK',
    workType: 'onsite',
    status: 'shortlisting',
    openedDate: '2024-08-24',
    description: 'Ensure product quality through comprehensive testing and validation.',
    requirements: ['Test Automation', 'Selenium', 'API Testing', 'JIRA'],
    isInternal: false,
    applicationsCount: 19,
    source: 'Indeed'
  },
  {
    id: 'job-14',
    title: 'Content Marketing Specialist',
    department: 'Marketing',
    location: 'Europe',
    workType: 'hybrid',
    status: 'open',
    openedDate: '2024-08-23',
    description: 'Create compelling content across digital platforms to engage audiences.',
    requirements: ['Content Writing', 'SEO', 'Social Media', 'Analytics'],
    isInternal: false,
    applicationsCount: 27,
    source: 'LinkedIn'
  },
  {
    id: 'job-15',
    title: 'Supply Chain Coordinator',
    department: 'Supply Chain',
    location: 'GEMS',
    workType: 'onsite',
    status: 'open',
    openedDate: '2024-08-22',
    description: 'Coordinate supply chain operations and optimize logistics processes.',
    requirements: ['Supply Chain Management', 'SAP', 'Logistics', 'Excel'],
    isInternal: true,
    applicationsCount: 33,
    source: 'SuccessFactors'
  },
  {
    id: 'job-16',
    title: 'HR Generalist',
    department: 'P&O',
    location: 'US',
    workType: 'hybrid',
    status: 'interviewing',
    openedDate: '2024-08-21',
    description: 'Support all HR functions including recruitment, associate relations, and compliance.',
    requirements: ['HR Experience', 'Associate Relations', 'Recruitment', 'HRIS'],
    isInternal: false,
    applicationsCount: 41,
    source: 'Workday'
  },
  {
    id: 'job-17',
    title: 'Cybersecurity Analyst',
    department: 'Manufacturing',
    location: 'UK',
    workType: 'remote',
    status: 'open',
    openedDate: '2024-08-20',
    description: 'Monitor and protect organizational IT infrastructure from security threats.',
    requirements: ['Network Security', 'SIEM', 'Incident Response', 'Risk Assessment'],
    isInternal: false,
    applicationsCount: 16,
    source: 'LinkedIn'
  },
  {
    id: 'job-18',
    title: 'Project Manager',
    department: 'Supply Chain',
    location: 'Europe',
    workType: 'hybrid',
    status: 'open',
    openedDate: '2024-08-19',
    description: 'Lead cross-functional projects from initiation to completion.',
    requirements: ['PMP Certification', 'Agile', 'Stakeholder Management', 'Risk Management'],
    isInternal: true,
    applicationsCount: 29,
    source: 'Indeed'
  },
  {
    id: 'job-19',
    title: 'Mobile App Developer',
    department: 'Manufacturing',
    location: 'Thailand',
    workType: 'hybrid',
    status: 'shortlisting',
    openedDate: '2024-08-18',
    description: 'Develop native and cross-platform mobile applications.',
    requirements: ['React Native', 'iOS Development', 'Android Development', 'Mobile UI/UX'],
    isInternal: false,
    applicationsCount: 22,
    source: 'SuccessFactors'
  },
  {
    id: 'job-20',
    title: 'Operations Manager',
    department: 'Supply Chain',
    location: 'Others',
    workType: 'onsite',
    status: 'open',
    openedDate: '2024-08-17',
    description: 'Oversee daily operations and drive operational excellence initiatives.',
    requirements: ['Operations Management', 'Lean Six Sigma', 'Team Leadership', 'KPI Management'],
    isInternal: false,
    applicationsCount: 35,
    source: 'Workday'
  }
];

export const mockCandidates: Candidate[] = [
  {
    id: 'candidate-1',
    name: 'Emily Clark',
    email: 'emily.clark@email.com',
    phone: '+44-7911-123456',
    appliedFor: 'Data Scientist – NLP',
    status: 'interview_scheduled',
    appliedDate: '2024-08-22',
    source: 'LinkedIn'
  },
  {
    id: 'candidate-2',
    name: 'David Brown',
    email: 'david.brown@email.com',
    phone: '+1-555-987-6543',
    appliedFor: 'Software Engineer – Java',
    status: 'shortlisted',
    appliedDate: '2024-08-20',
    source: 'Company Portal'
  },
  {
    id: 'candidate-3',
    name: 'Jessica Williams',
    email: 'jessica.williams@email.com',
    phone: '+1-555-234-5678',
    appliedFor: 'Product Manager – Digital',
    status: 'offered',
    appliedDate: '2024-08-19',
    source: 'Referral'
  }
];

export const mockReferrals: Referral[] = [
  {
    id: 'ref-1',
    referrerName: 'John Miller',
    candidateName: 'Robert Thompson',
    jobTitle: 'Software Engineer – Java',
    status: 'shortlisted',
    submittedDate: '2024-08-21'
  },
  {
    id: 'ref-2',
    referrerName: 'Amanda Davis',
    candidateName: 'Mark Wilson',
    jobTitle: 'P&O Business Partner',
    status: 'rejected',
    submittedDate: '2024-08-18'
  }
];

export const mockDashboardMetrics: DashboardMetrics = {
  totalApplications: 423,
  activeJobs: 24,
  pendingInterviews: 8,
  offersExtended: 5,
  conversionRate: 24,
  timeToFill: 18
};

export const mockVendorPerformance: VendorPerformance[] = [
  {
    vendorName: 'TalentBridge Pvt Ltd',
    totalSubmissions: 45,
    hires: 8,
    conversionRate: 18,
    averageTimeToFill: 16
  },
  {
    vendorName: 'Manpower Solutions',
    totalSubmissions: 32,
    hires: 4,
    conversionRate: 13,
    averageTimeToFill: 22
  },
  {
    vendorName: 'Global Talent',
    totalSubmissions: 28,
    hires: 3,
    conversionRate: 11,
    averageTimeToFill: 25
  }
];

export const mockFunnelData = [
  { stage: 'Applied', count: 423, color: 'hsl(213, 94%, 50%)' },
  { stage: 'Shortlisted', count: 178, color: 'hsl(142, 76%, 48%)' },
  { stage: 'Interviewed', count: 52, color: 'hsl(38, 92%, 50%)' },
  { stage: 'Offers', count: 18, color: 'hsl(0, 84%, 60%)' },
  { stage: 'Joins', count: 10, color: 'hsl(142, 76%, 36%)' }
];

export const mockSourceData = [
  { name: 'LinkedIn', value: 42, color: 'hsl(213, 94%, 50%)' },
  { name: 'Referrals', value: 28, color: 'hsl(142, 76%, 48%)' },
  { name: 'Vendors', value: 20, color: 'hsl(38, 92%, 50%)' },
  { name: 'Company Portal', value: 10, color: 'hsl(210, 6%, 46%)' }
];

export const mockSkills: Skill[] = [
  { id: 'skill-1', name: 'Python', level: 'advanced', verified: true, category: 'Programming' },
  { id: 'skill-2', name: 'Project Management', level: 'expert', verified: true, category: 'Management' },
  { id: 'skill-3', name: 'Data Analysis', level: 'intermediate', verified: false, category: 'Analytics' },
  { id: 'skill-4', name: 'Machine Learning', level: 'intermediate', verified: true, category: 'AI/ML' },
  { id: 'skill-5', name: 'Java', level: 'advanced', verified: true, category: 'Programming' },
  { id: 'skill-6', name: 'SQL', level: 'expert', verified: true, category: 'Database' },
  { id: 'skill-7', name: 'React', level: 'intermediate', verified: false, category: 'Web Development' },
  { id: 'skill-8', name: 'Leadership', level: 'advanced', verified: true, category: 'Soft Skills' }
];

export const mockAssessments: SkillAssessment[] = [
  {
    id: 'assessment-1',
    title: 'Python Programming Fundamentals',
    category: 'Programming',
    duration: 45,
    passingScore: 70,
    questions: [
      {
        id: 'q1',
        question: 'Which of the following is the correct way to define a function in Python?',
        options: ['function myFunc():', 'def myFunc():', 'function: myFunc()', 'def: myFunc()'],
        correctAnswer: 1
      },
      {
        id: 'q2',
        question: 'What is the output of print(type([]))?',
        options: ['<class \'list\'>', '<class \'array\'>', '<class \'tuple\'>', '<class \'dict\'>'],
        correctAnswer: 0
      },
      {
        id: 'q3',
        question: 'Which method is used to add an element to the end of a list?',
        options: ['add()', 'append()', 'insert()', 'extend()'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'assessment-2',
    title: 'Data Analysis with SQL',
    category: 'Database',
    duration: 60,
    passingScore: 75,
    questions: [
      {
        id: 'q1',
        question: 'Which SQL clause is used to filter rows?',
        options: ['WHERE', 'HAVING', 'ORDER BY', 'GROUP BY'],
        correctAnswer: 0
      },
      {
        id: 'q2',
        question: 'What does INNER JOIN return?',
        options: ['All rows from both tables', 'Only matching rows from both tables', 'All rows from left table', 'All rows from right table'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'assessment-3',
    title: 'Project Management Essentials',
    category: 'Management',
    duration: 30,
    passingScore: 65,
    questions: [
      {
        id: 'q1',
        question: 'What is the critical path in project management?',
        options: ['The shortest path to completion', 'The longest sequence of activities', 'The most important tasks', 'The riskiest activities'],
        correctAnswer: 1
      }
    ]
  }
];

export const mockAssessmentResults: AssessmentResult[] = [
  {
    id: 'result-1',
    assessmentId: 'assessment-2',
    userId: '1',
    score: 85,
    completedAt: '2024-08-20',
    passed: true
  }
];

// New job data for recommendations
const newRecommendedJobs: Job[] = [
  {
    id: 'job-rec-1',
    title: 'Digital Core Integration Delivery Lead (F/M/X)',
    department: 'Technology',
    location: 'Berlin, Germany',
    workType: 'hybrid',
    status: 'open',
    openedDate: '2024-08-20',
    description: 'Join Mars\' Digital & Business Transformation journey! As an Integration Delivery Lead, you\'ll modernize ERP integrations using SAP S/4 Hana, APIs, and automation tools. Lead a global team, drive seamless integration, and collaborate with diverse stakeholders across Mars.',
    requirements: [
      "Educational Background: Master's in engineering, IT, computer science, or management",
      "Experience: 5+ years in IT with strong background in applications/technology",
      "Leadership: Proven experience in leading Agile projects and managing SI partners",
      "Tech Expertise: API Management, Event-Driven Architecture, IPaaS, Automation in SAP/Azure",
      "Strategy & design workshops with solution architects",
      "Manage vendor resources & risk",
      "Define & track KPIs",
      "Drive continuous improvement in delivery efficiency",
      "Perks at Mars: Diverse associates, strong learning culture, competitive package, Mars University access"
    ],
    isInternal: false,
    applicationsCount: 24,
    source: 'Workday'
  },
  {
    id: 'job-rec-2',
    title: 'Site Infrastructure Manager (F/M/X)',
    department: 'IT Services',
    location: 'Munich, Germany',
    workType: 'onsite',
    status: 'open',
    openedDate: '2024-08-18',
    description: 'Be the Service Account Lead for Mars Site IT Services across the DACH region. Strengthen client partnerships, ensure top-quality service, and improve IT delivery for business success.',
    requirements: [
      "Qualifications: University degree (preferably IT), fluent in French & English",
      "Skills: Broad technical understanding, ability to simplify technical details, stakeholder management",
      "Relationship & escalation management with internal customers",
      "Ensure SLA-driven IT service delivery",
      "Review service KPIs & drive improvements",
      "Plan IT projects based on business needs (non-delivery role)",
      "Enhance customer satisfaction via continuous improvements",
      "Value at Mars: Work in a trusted partner role, grow with continuous improvement focus, stay ahead of industry best practices"
    ],
    isInternal: false,
    applicationsCount: 18,
    source: 'Workday'
  },
  {
    id: 'job-rec-3',
    title: 'Cloud Automation Architect',
    department: 'Cloud Infrastructure',
    location: 'London, UK',
    workType: 'remote',
    status: 'open',
    openedDate: '2024-08-15',
    description: 'The Technology Owner for Web Hosting is a recognized expert responsible for the strategy, modernization, and optimization of web services infrastructure. Lead cross-functional teams and deliver world-class web hosting capabilities.',
    requirements: [
      "Hands-on experience managing web hosting platforms (e.g., IIS, Apache, Nginx), container-based services (Docker, Kubernetes), and hybrid cloud deployments",
      "Expertise with AWS Elastic Beanstalk, Azure App Services, CloudFront, Azure Front Door",
      "Knowledge of CI/CD tools and Infrastructure as Code (Terraform, GitHub Actions, Jenkins)",
      "Understanding of DNS, SSL/TLS, WAFs, load balancing",
      "Experience with both Windows and Linux web applications",
      "Strong understanding of web application security and compliance",
      "Lead strategy and modernization of web hosting platforms",
      "Provide expert guidance to product and engineering teams",
      "Manage technology roadmap for web services infrastructure",
      "Implement secure, scalable, high-performance cloud-native solutions",
      "Oversee DNS, CDN, WAF, load balancing, SSL, and API gateway integrations"
    ],
    isInternal: false,
    applicationsCount: 31,
    source: 'LinkedIn'
  },
  {
    id: 'job-rec-4',
    title: 'Sales Representative',
    department: 'Sales',
    location: 'Austin, TX',
    workType: 'onsite',
    status: 'open',
    openedDate: '2024-08-12',
    description: 'The Sales Representative\'s responsibilities include working closely with customers to determine their needs, answer questions, and recommend solutions. You should promptly resolve customer complaints and ensure client satisfaction.',
    requirements: [
      "Work experience as Retail Sales Associate or similar role",
      "Strong knowledge of sales principles and customer service practices",
      "Valid driver's license and ability to travel",
      "Ability to lift up to 40 lbs and work flexible shifts",
      "Ensure customer satisfaction through excellent sales service",
      "Assess customer needs and provide assistance on product features",
      "Follow and achieve sales goals monthly, quarterly, yearly",
      "Maintain in-stock and presentable displays",
      "Process POS purchases and manage inventory",
      "Build trust relationships with customers"
    ],
    isInternal: false,
    applicationsCount: 45,
    source: 'Indeed'
  }
];

export const mockJobRecommendations: JobRecommendation[] = [
  {
    job: newRecommendedJobs[0],
    matchScore: 85,
    matchingSkills: ['API Management', 'SAP', 'Integration', 'Leadership'],
    missingSkills: ['Event-Driven Architecture']
  },
  {
    job: newRecommendedJobs[1],
    matchScore: 90,
    matchingSkills: ['IT Services', 'Stakeholder Management', 'French', 'English'],
    missingSkills: ['SLA Management']
  },
  {
    job: newRecommendedJobs[2],
    matchScore: 95,
    matchingSkills: ['Cloud', 'Docker', 'Kubernetes', 'AWS', 'Azure'],
    missingSkills: ['Terraform']
  },
  {
    job: newRecommendedJobs[3],
    matchScore: 100,
    matchingSkills: ['Sales', 'Customer Service', 'Retail', 'Communication'],
    missingSkills: []
  }
];

export const mockApplications: Application[] = [
  {
    id: 'app-1',
    jobId: 'job-1',
    jobTitle: 'Software Engineer – Java',
    userId: '1',
    status: 'interview_scheduled',
    appliedDate: '2024-08-18',
    lastUpdated: '2024-08-22'
  },
  {
    id: 'app-2',
    jobId: 'job-3',
    jobTitle: 'P&O Business Partner',
    userId: '1',
    status: 'shortlisted',
    appliedDate: '2024-08-15',
    lastUpdated: '2024-08-20'
  },
  {
    id: 'app-3',
    jobId: 'job-4',
    jobTitle: 'Data Scientist – NLP',
    userId: '1',
    status: 'applied',
    appliedDate: '2024-08-22',
    lastUpdated: '2024-08-22'
  },
  {
    id: 'app-4',
    jobId: 'job-2',
    jobTitle: 'Product Manager – Digital',
    userId: '1',
    status: 'offered',
    appliedDate: '2024-08-10',
    lastUpdated: '2024-08-24'
  },
  {
    id: 'app-5',
    jobId: 'job-5',
    jobTitle: 'Marketing Specialist',
    userId: '1',
    status: 'po_review',
    appliedDate: '2024-08-23',
    lastUpdated: '2024-08-23'
  },
  {
    id: 'app-6',
    jobId: 'job-6',
    jobTitle: 'UX Designer',
    userId: '1',
    status: 'hired',
    appliedDate: '2024-07-15',
    lastUpdated: '2024-08-01'
  },
  {
    id: 'app-7',
    jobId: 'job-7',
    jobTitle: 'DevOps Engineer',
    userId: '1',
    status: 'po_review',
    appliedDate: '2024-08-24',
    lastUpdated: '2024-08-25'
  }
];

export const mockRegions = [
  { id: 'all', name: 'All Regions' },
  { id: 'us', name: 'US' },
  { id: 'uk', name: 'UK' },
  { id: 'europe', name: 'Europe' },
  { id: 'gems', name: 'GEMS' },
  { id: 'others', name: 'Others' }
];