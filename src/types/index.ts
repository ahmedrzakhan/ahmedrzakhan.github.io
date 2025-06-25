export interface Experience {
  title: string;
  company: string;
  duration: string;
  location: string;
  description: string[];
  type?: string;
}

export interface Project {
  title: string;
  repo: string;
  tech: string;
  description: string;
}

export interface Skill {
  category: string;
  technologies: string[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  phone?: string;
  linkedin: string;
  github: string;
  twitter: string;
  leetcode: string;
  portfolio: string;
  website: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}