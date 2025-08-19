import { Experience, Project, Skill, PersonalInfo, SocialLink } from "../types";

export const personalInfo: PersonalInfo = {
  name: "Ahmed Raza Khan",
  title: "Software Engineer • AI/ML Specialist",
  location: "London, UK",
  email: "khanahmed925@gmail.com",
  linkedin: "linkedin.com/in/ahmedrza",
  github: "github.com/ahmedrzakhan",
  twitter: "x.com/ahdrzkn",
  leetcode: "leetcode.com/u/ahmedrza/",
  portfolio: "ahmdrz.com",
  website: "ahmdrz.com",
  avatar: "/profile.jpeg",
};

export const professionalSummary =
  "Results-driven Software Engineer with 5 years of experience in developing scalable applications and microservices architectures. Specialized expertise in AI/ML technologies including LLMs, RAG systems, and semantic search. Demonstrated leadership in technical initiatives that drove significant business impact, including systems that processed millions of transactions and improved operational efficiency.";

export const animatedRoles = [
  "Backend Engineer",
  "AI/ML Enthusiast",
  "Full-Stack Developer",
  "Problem Solver",
];

export const experiences: Experience[] = [
  {
    title: "Software Engineer",
    company: "Islamic Finance Singapore",
    duration: "May 2025 - Jul 2025",
    location: "Singapore",
    description: [
      "Platform Leadership: Spearheaded full-stack development of a Zakat platform, delivering scalable solutions for accurate Zakat calculations and contribution tracking",
      "Authentication and UI: Designed secure authentication with multiple providers and built responsive user interface with comprehensive testing framework",
    ],
  },
  {
    title: "Generative AI Engineer",
    company: "Reality AI Lab",
    duration: "Mar 2025 - Jul 2025",
    location: "San Francisco, US",
    description: [
      "AI Technology Integration: Developed understanding of AI system architecture through documentation review and team collaboration",
    ],
  },
  {
    title: "Backend Engineer",
    company: "Peekabox",
    duration: "Oct 2024 - Feb 2025",
    location: "Dubai, UAE",
    description: [
      "Backend Architecture Leadership: Architected and implemented comprehensive authentication system and core services, enabling seamless connection between local businesses and consumers",
      "API Development & Integration: Designed robust enterprise-grade APIs supporting user engagement features and internal admin systems",
      "Technical Infrastructure: Engineered scalable cloud-based backend infrastructure ensuring high availability and performance",
    ],
  },
  {
    title: "SDE 1",
    company: "smallcase",
    duration: "Apr 2021 - Jul 2024",
    location: "Bengaluru, India",
    type: "Backend Role (Oct 2021 - Jul 2024)",
    description: [
      "Automatic Order Execution: Built an automated order processing system to address financial delays, increasing order fulfillment and contributing to a 2 million dollars monthly revenue gain",
      "Gateway Transactions: Revamped gateway systems to integrate mutual fund transactions with 265 external smallcase partners, significantly expanding service accessibility",
      "Enable MF Transactions: Developed and integrated mutual fund transaction functionality, enabling 5 million users to access these services and expanding the offerings",
      "Real Time Notification: Successfully addressed a bottleneck in the critical communication notification system, leading to a 78% reduction in processing time",
      "Lead Generation Service: Enhanced lead generation service, integrating customer support systems and increasing first-time investor/subscriber conversions by 2K users monthly",
      "Domain Driven Design: Refactored multiple backend services to prioritize maintainability and eliminate redundancy streamlining future development efforts",
    ],
  },
  {
    title: "SDE 1 - Frontend",
    company: "smallcase",
    duration: "Apr 2021 - Sep 2021",
    location: "Bengaluru, India",
    type: "Frontend Role",
    description: [
      "Subscription Management: Designed and integrated a subscription renewal feature, offering intuitive management tools for a streamlined and user-friendly experience",
      "Goal based Investments: Led the development of Horizon Smallcases, a financial planning tool that aligns long-term goals with investment strategies, currently used by 400K users",
      "Profile Interface: Redesigned smallcase profiles to enhance navigation and data presentation, facilitating user engagement and decision-making clarity",
      "Ability to modify user details: Expanded user profiles with phone, email, and WhatsApp consent fields, leading to a 75% increase in click rate and improved engagement",
      "User Onboarding: Streamlined user onboarding with a new feature, providing clear guidance and driving a 85% click rate for enhanced engagement",
    ],
  },
  {
    title: "Software Engineer",
    company: "5C Network",
    duration: "Dec 2020 - Feb 2021",
    location: "Bengaluru, India",
    description: [
      "Client Management System: Designed and implemented an intuitive client management system and blogging section, actively used by 35% of the users",
      "Migration to Microservices: Facilitated the migration from a monolithic architecture to a microservices framework, enhancing system maintainability and code reusability",
    ],
  },
  {
    title: "Software Engineer",
    company: "Right Brain Infotech",
    duration: "Aug 2019 - Mar 2020",
    location: "Pune, India",
    description: [
      "Employment Self Service: Designed a custom Employee self service mobile app tailored for Tata Motors, simplifying HR processes for 50K employees",
      "Driver Management Service: Designed and implemented the registration process and a driver rating system tailored for Drivers in India, used by 70K users",
    ],
  },
];

export const projects: Project[] = [
  {
    title: "AI Content Recommender",
    repo: "github.com/ahmedrzakhan/keyword-based-content-recommender",
    tech: "FastAPI, ChromaDB, LangChain",
    description:
      "Semantic Search Engine with vector embeddings for intelligent content discovery. Features real-time analytics and 80+ sample content across multiple domains.",
  },
  {
    title: "Article Summary Generator",
    repo: "github.com/ahmedrzakhan/article-summary-generator",
    tech: "Google Gemini, Streamlit, LangSmith",
    description:
      "Intelligent Summarization with multiple length options. Real-time processing with async architecture and production monitoring.",
  },
  {
    title: "RAFT Documentation Generator",
    repo: "github.com/ahmedrzakhan/RAFT-code-docs",
    tech: "T5-small, CodeBERT, HuggingFace",
    description:
      "Retrieval-Augmented Fine-Tuning for automated code documentation. CPU-optimized training for accessibility.",
  },
  {
    title: "AI FAQ Bot",
    repo: "github.com/ahmedrzakhan/ai-faq-bot",
    tech: "OpenAI, ChromaDB, Docker",
    description:
      "Multi-AI Architecture with intelligent fallback. RAG implementation for accurate customer support responses.",
  },
  {
    title: "AI Writing Prompt Generator",
    repo: "github.com/ahmedrzakhan/ai-writing-prompt-generator",
    tech: "HuggingFace, FastAPI, Streamlit",
    description:
      "Creative Writing Assistant with customizable prompts across genres. Features prompt library, search/filter, and export functionality with fallback mechanisms.",
  },
];

export const skills: Skill[] = [
  {
    category: "Programming Languages",
    technologies: ["Python", "Go", "JavaScript/TypeScript"],
  },
  {
    category: "AI/ML",
    technologies: [
      "OpenAI",
      "Google Gemini",
      "LangChain",
      "ChromaDB",
      "HuggingFace",
      "Transformers",
      "RAFT",
      "Vector Embeddings",
    ],
  },
  {
    category: "Backend",
    technologies: ["FastAPI", "Node.js", "Express.js", "NestJS", "Go Fiber"],
  },
  {
    category: "Frontend",
    technologies: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Redux",
      "styled-components",
      "React Native",
      "HTML5",
      "CSS3",
    ],
  },
  {
    category: "Databases",
    technologies: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Elasticsearch",
      "ChromaDB",
    ],
  },
  {
    category: "Cloud & DevOps",
    technologies: ["AWS", "Docker", "Google Cloud", "Jenkins", "Nginx"],
  },
  {
    category: "Tools",
    technologies: ["Apache Kafka", "Git", "LangSmith", "Postman"],
  },
];

export const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/ahmedrza",
    icon: "fab fa-linkedin",
  },
  {
    name: "GitHub",
    url: "https://github.com/ahmedrzakhan",
    icon: "fab fa-github",
  },
  {
    name: "Twitter",
    url: "https://x.com/ahdrzkn",
    icon: "fab fa-twitter",
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/ahmedrza/",
    icon: "fas fa-code",
  },
  {
    name: "Email",
    url: "mailto:khanahmed925@gmail.com",
    icon: "fas fa-envelope",
  },
];

export const resumeLink =
  "https://drive.google.com/drive/folders/1NBlu6s5Rns8gA2DU8eIx5fwytC0aK550";

export const education = [
  {
    degree: "MSc in Islamic Finance and Digital Economy",
    institution: "University of Dundee, UK",
    duration: "2024-2025",
  },
  {
    degree: "BE in Information Technology",
    institution: "University of Mumbai, India",
    duration: "2014-2019",
  },
];
