export interface PersonalInfo {
  name: string
  title: string
  tagline: string
  location: string
  email: string
  phone: string
  github: string
  linkedin: string
  photo: string
  cvFile: string
}

export interface ProjectItem {
  id: string
  title: string
  description: string
  tech: string[]
  metrics: string[]
  liveUrl: string
  appStoreUrl?: string
  githubUrl?: string
  featured: boolean
  image?: string
  category: ('fintech' | 'cloud' | 'ai' | 'fullstack' | 'data')[]
  highlights?: string[]
}

export interface ExperienceItem {
  id: string
  role: string
  company: string
  companyUrl: string
  location: string
  period: string
  type: 'Full-time' | 'Contract' | 'Part-time'
  highlights: string[]
  tech: string[]
}

export interface SkillGroup {
  group: string
  items: string[]
}

export interface CertificationItem {
  id: string
  title: string
  level: string
  issuer: string
  credlyUrl: string
}

export interface EducationItem {
  id: string
  degree: string
  institution: string
  location: string
  period: string
  status: 'in-progress' | 'completed'
  verifyUrl?: string
}

export interface SnippetItem {
  id: string
  title: string
  description: string
  tech: string
  code: string
}
