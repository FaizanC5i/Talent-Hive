import { Job, Skill } from '@/types/platform';

export const calculateJobMatchScore = (job: Job, userSkills: Skill[]): number => {
  if (!job.requirements || job.requirements.length === 0) return 0;
  
  const userSkillNames = userSkills.map(skill => skill.name.toLowerCase());
  const jobRequirements = job.requirements.map(req => req.toLowerCase());
  
  // Calculate skill matches
  const matchingSkills = jobRequirements.filter(req => 
    userSkillNames.some(skill => 
      skill.includes(req) || req.includes(skill)
    )
  );
  
  // Base match percentage
  const baseMatch = (matchingSkills.length / jobRequirements.length) * 100;
  
  // Apply bonus for advanced/expert skills
  const advancedBonus = userSkills
    .filter(skill => 
      (skill.level === 'advanced' || skill.level === 'expert') &&
      jobRequirements.some(req => req.includes(skill.name.toLowerCase()))
    )
    .length * 5;
  
  // Apply bonus for verified skills
  const verifiedBonus = userSkills
    .filter(skill => 
      skill.verified &&
      jobRequirements.some(req => req.includes(skill.name.toLowerCase()))
    )
    .length * 3;
  
  const finalScore = Math.min(100, Math.round(baseMatch + advancedBonus + verifiedBonus));
  
  return finalScore;
};