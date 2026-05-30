import type { Project, SkillCategory, SocialLink } from "@/types/project";

export const summary =
  "I am an Information Technology student with interests in web development, system design, business technology, digital communication, and technology-driven solutions. I enjoy building user-focused digital experiences and continuously improving my technical and professional skills through hands-on projects, certifications, and practical learning.";

export const heroRoles = [
  "Aspiring Web Developer",
  "Technology Enthusiast",
  "Future Software Engineer",
  "Continuous Learner",
];

export const socials: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shean-anika-javier-b2a593412/",
    icon: "Network",
    priority: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/oizysmiseriaaa",
    icon: "GitBranch",
    priority: true,
  },
  {
    label: "Email",
    href: "mailto:shean.javier.sh@gmail.com",
    icon: "Mail",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/sheananika.javier",
    icon: "Link2",
  },
];

export const profileCards = [
  {
    title: "Technology + Business",
    text: "Interested in using technology to support business workflows, digital communication, and practical system improvements.",
  },
  {
    title: "Web Development",
    text: "Focused on responsive interfaces, organized content, and digital experiences that are easy to understand and use.",
  },
  {
    title: "Career Readiness",
    text: "Building a professional foundation through projects, certifications, independent work, and continuous learning.",
  },
];

export const timeline = [
  {
    label: "Current",
    title: "BSIT Student",
    text: "Studying Information Technology at Naga College Foundation while strengthening web development, systems thinking, and professional communication.",
  },
  {
    label: "2025",
    title: "Microsoft Credential",
    text: "Earned the Microsoft Office Specialist Word Associate certification for Microsoft 365 Apps.",
  },
  {
    label: "Ongoing",
    title: "Project-Based Learning",
    text: "Creating academic and self-directed websites that build confidence in frontend delivery and user-focused design.",
  },
];

export const skills: SkillCategory[] = [
  {
    title: "Frontend Development",
    icon: "Code2",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript (Learning)",
      "Next.js (Learning)",
      "Tailwind CSS (Learning)",
      "Responsive Web Design",
      "UI Development",
    ],
  },
  {
    title: "Database & Data Management",
    icon: "Database",
    skills: [
      "Database Fundamentals",
      "Database Design",
      "Data Modeling",
      "SQL Basics",
      "CRUD Operations",
      "Data Organization",
    ],
  },
  {
    title: "Data & Analytics",
    icon: "BarChart3",
    skills: [
      "Power BI",
      "Data Analytics",
      "Data Visualization",
      "Dashboard Development",
      "Data Interpretation",
    ],
  },
  {
    title: "Productivity Tools",
    icon: "FileText",
    skills: [
      "Microsoft Word",
      "Microsoft Excel",
      "Microsoft PowerPoint",
    ],
  },
  {
    title: "Design Tools",
    icon: "PenTool",
    skills: ["Canva", "Figma"],
  },
  {
    title: "Professional Skills",
    icon: "BadgeCheck",
    skills: [
      "Communication",
      "Independent Work",
      "Organization",
      "Adaptability",
      "Problem Solving",
      "Attention to Detail",
      "Willingness to Learn",
    ],
  },
];
export const featuredProject: Project = {
  title: "CCSFix",
  label: "Featured Academic Project",
  description:
    "A repository-driven academic project focused on practical CCS-related solutions, issue organization, and technology-enabled process improvement.",
  image: "/projects/ccsfix.PNG",
  technologies: ["HTML", "CSS", "JavaScript","Flask", "Sqlite", "Academic Project"],
  liveDemo: "https://github.com/oizysmiseriaaa/CCSFix",
  github: "https://github.com/oizysmiseriaaa/CCSFix",
  featured: true,
};

export const projects: Project[] = [
  {
    title: "Street Paws Naga",
    description:
      "A pet adoption and animal welfare platform designed to connect rescued animals with potential adopters and promote responsible pet ownership.",
    image: "/projects/street-paws.PNG",
    technologies: ["Next.js", "Tailwind CSS", "MySQL", "Responsive UI"],
    liveDemo: "https://street-paws-naga.vercel.app/",
    github: "https://github.com/oizysmiseriaaa",
  },
  {
    title: "Infinity Real Events",
    description:
      "An event management website showcasing services, event planning solutions, and customer engagement experiences.",
    image: "/projects/infinity-events.PNG",
    technologies: ["HTML", "CSS", "JavaScript", "Web Design"],
    liveDemo: "https://oizysmiseriaaa.github.io/infinity_real_events.io/",
    github: "https://github.com/oizysmiseriaaa",
  },
  {
    title: "BagLuxe",
    description:
      "A luxury bag e-commerce concept focused on modern product presentation and user experience.",
    image: "/projects/bagluxe.PNG",
    technologies: ["HTML", "CSS", "JavaScript", "E-commerce UI"],
    liveDemo: "https://oizysmiseriaaa.github.io/BagLuxe.io/",
    github: "https://github.com/oizysmiseriaaa",
  },
  {
    title: "SpotGarage",
    description:
      "A parking and garage management platform designed to improve parking organization and accessibility.",
    image: "/projects/spotgarage.PNG",
    technologies: ["HTML", "CSS", "JavaScript", "System Concept"],
    liveDemo: "https://oizysmiseriaaa.github.io/SpotGarage.io/",
    github: "https://github.com/oizysmiseriaaa",
  },
];

export const certification = {
  title: "Microsoft Office Specialist - Word Associate",
  issuer: "Microsoft 365 Apps",
  issued: "January 24, 2025",
  verification:
    "https://www.credly.com/badges/0523c074-cc38-46c5-a5e2-03d1762b87b1/public_url",
  badge: "/certificates/mos-word-badge.svg",
};

export const availability = [
  "Internships",
  "Entry-Level IT Roles",
  "Freelance Projects",
  "Collaborations",
];
