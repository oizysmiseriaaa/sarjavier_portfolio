export type Project = {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveDemo: string;
  github: string;
  featured?: boolean;
  label?: string;
};

export type SkillCategory = {
  title: string;
  icon: string;
  skills: string[];
};

export type SocialLink = {
  label: string;
  href: string;
  icon: string;
  priority?: boolean;
};
