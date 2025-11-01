import React from 'react';
import { projects } from '../data/portfolio';

// Brand colors for technologies (shared with Skills component)
const techColors: { [key: string]: { bg: string; text: string; icon?: string } } = {
  // Programming Languages
  'Python': { bg: 'bg-[#3776AB]', text: 'text-white', icon: 'fab fa-python' },
  'Go': { bg: 'bg-[#00ADD8]', text: 'text-white', icon: 'fab fa-golang' },
  'JavaScript/TypeScript': { bg: 'bg-[#F7DF1E]', text: 'text-black', icon: 'fab fa-js' },
  'TypeScript': { bg: 'bg-[#007ACC]', text: 'text-white', icon: 'fab fa-js' },
  'JavaScript': { bg: 'bg-[#F7DF1E]', text: 'text-black', icon: 'fab fa-js' },
  
  // AI/ML
  'OpenAI': { bg: 'bg-[#412991]', text: 'text-white', icon: 'fas fa-brain' },
  'Google Gemini': { bg: 'bg-[#4285F4]', text: 'text-white', icon: 'fab fa-google' },
  'LangChain': { bg: 'bg-[#1C3C3C]', text: 'text-white', icon: 'fas fa-link' },
  'ChromaDB': { bg: 'bg-[#FF6B6B]', text: 'text-white', icon: 'fas fa-database' },
  'HuggingFace': { bg: 'bg-[#FFD21E]', text: 'text-black', icon: 'fas fa-robot' },
  'Transformers': { bg: 'bg-[#FF6F00]', text: 'text-white', icon: 'fas fa-cogs' },
  'T5-small': { bg: 'bg-[#FF6F00]', text: 'text-white', icon: 'fas fa-brain' },
  'CodeBERT': { bg: 'bg-[#FFD21E]', text: 'text-black', icon: 'fas fa-code' },
  'LangSmith': { bg: 'bg-[#1C3C3C]', text: 'text-white', icon: 'fas fa-chart-line' },
  
  // Backend
  'FastAPI': { bg: 'bg-[#009688]', text: 'text-white', icon: 'fas fa-rocket' },
  'Node.js': { bg: 'bg-[#339933]', text: 'text-white', icon: 'fab fa-node-js' },
  'Express.js': { bg: 'bg-[#000000]', text: 'text-white', icon: 'fas fa-server' },
  'NestJS': { bg: 'bg-[#E0234E]', text: 'text-white', icon: 'fas fa-cube' },
  'Go Fiber': { bg: 'bg-[#00ADD8]', text: 'text-white', icon: 'fas fa-bolt' },
  'Streamlit': { bg: 'bg-[#FF4B4B]', text: 'text-white', icon: 'fas fa-chart-bar' },
  
  // Frontend
  'React.js': { bg: 'bg-[#61DAFB]', text: 'text-black', icon: 'fab fa-react' },
  'React': { bg: 'bg-[#61DAFB]', text: 'text-black', icon: 'fab fa-react' },
  'Next.js': { bg: 'bg-[#000000]', text: 'text-white', icon: 'fas fa-arrow-right' },
  'Tailwind CSS': { bg: 'bg-[#38B2AC]', text: 'text-white', icon: 'fas fa-wind' },
  'Redux': { bg: 'bg-[#764ABC]', text: 'text-white', icon: 'fas fa-layer-group' },
  'styled-components': { bg: 'bg-[#DB7093]', text: 'text-white', icon: 'fas fa-palette' },
  'React Native': { bg: 'bg-[#61DAFB]', text: 'text-black', icon: 'fab fa-react' },
  'HTML5': { bg: 'bg-[#E34F26]', text: 'text-white', icon: 'fab fa-html5' },
  'CSS3': { bg: 'bg-[#1572B6]', text: 'text-white', icon: 'fab fa-css3-alt' },
  
  // Databases
  'PostgreSQL': { bg: 'bg-[#336791]', text: 'text-white', icon: 'fas fa-database' },
  'MongoDB': { bg: 'bg-[#47A248]', text: 'text-white', icon: 'fas fa-leaf' },
  'Redis': { bg: 'bg-[#DC382D]', text: 'text-white', icon: 'fas fa-memory' },
  'Elasticsearch': { bg: 'bg-[#005571]', text: 'text-white', icon: 'fas fa-search' },
  
  // Cloud & DevOps
  'AWS': { bg: 'bg-[#FF9900]', text: 'text-black', icon: 'fab fa-aws' },
  'Docker': { bg: 'bg-[#2496ED]', text: 'text-white', icon: 'fab fa-docker' },
  'Google Cloud': { bg: 'bg-[#4285F4]', text: 'text-white', icon: 'fab fa-google' },
  'Jenkins': { bg: 'bg-[#D24939]', text: 'text-white', icon: 'fas fa-hammer' },
  'Nginx': { bg: 'bg-[#009639]', text: 'text-white', icon: 'fas fa-shield-alt' },
  
  // Tools
  'Apache Kafka': { bg: 'bg-[#231F20]', text: 'text-white', icon: 'fas fa-stream' },
  'Git': { bg: 'bg-[#F05032]', text: 'text-white', icon: 'fab fa-git-alt' },
  'Postman': { bg: 'bg-[#FF6C37]', text: 'text-white', icon: 'fas fa-paper-plane' },
};

interface ProjectsProps {
  analytics?: {
    trackProjectClick: (projectName: string) => void;
  };
}

const Projects: React.FC<ProjectsProps> = ({ analytics }) => {
  const handleProjectClick = (repo: string, title: string) => {
    analytics?.trackProjectClick(title);
    window.open(`https://${repo}`, '_blank', 'noopener,noreferrer');
  };

  const getProjectIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    
    // More specific matching for better differentiation
    if (lowerTitle.includes('recommender') || lowerTitle.includes('content')) {
      return 'fas fa-search-plus'; // Search/discovery icon for content recommender
    } else if (lowerTitle.includes('summary') || lowerTitle.includes('article')) {
      return 'fas fa-file-alt'; // Document icon for article summarizer
    } else if (lowerTitle.includes('documentation') || lowerTitle.includes('raft')) {
      return 'fas fa-book'; // Book icon for documentation generator
    } else if (lowerTitle.includes('bot') || lowerTitle.includes('faq')) {
      return 'fas fa-comments'; // Chat icon for FAQ bot
    } else if (lowerTitle.includes('writing') || lowerTitle.includes('prompt')) {
      return 'fas fa-pen-fancy'; // Writing icon for prompt generator
    } else if (lowerTitle.includes('ai') && !lowerTitle.includes('writing')) {
      return 'fas fa-brain'; // Brain icon for general AI projects
    }
    return 'fas fa-code'; // Default code icon
  };

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-bg-primary via-bg-secondary/30 to-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text-ts">Projects</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Showcasing AI/ML innovations and full-stack solutions that solve real-world problems
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              onClick={() => handleProjectClick(project.repo, project.title)}
              className="glass-card glass-strong p-8 rounded-3xl cursor-pointer group shadow-glass-lg hover:shadow-glass-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-liquid rounded-2xl flex items-center justify-center mr-4 shadow-glass-lg group-hover:shadow-glass-xl transition-all duration-500">
                  <i className={`${getProjectIcon(project.title)} text-white text-2xl`}></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold gradient-text group-hover:scale-105 transition-transform duration-500">
                    {project.title}
                  </h3>
                  <div className="flex items-center text-gray-300 mt-1">
                    <i className="fab fa-github mr-2"></i>
                    <span className="text-sm">{project.repo.split('/').pop()}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.split(', ').map((tech, techIndex) => {
                  const techStyle = techColors[tech] || { bg: 'bg-primary/20', text: 'text-primary' };
                  return (
                    <span
                      key={techIndex}
                      className={`glass-light px-3 py-1 ${techStyle.bg} ${techStyle.text} text-sm rounded-full font-medium hover:scale-105 hover:shadow-glow-primary transition-all duration-500 cursor-default flex items-center gap-1.5`}
                    >
                      {techStyle.icon && (
                        <i className={`${techStyle.icon} text-xs`}></i>
                      )}
                      {tech}
                    </span>
                  );
                })}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-300 group-hover:gradient-text transition-all duration-500">
                  <i className="fas fa-external-link-alt mr-2"></i>
                  <span>View Project</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <i className="fas fa-star mr-1"></i>
                  <span className="text-sm">Featured</span>
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="text-center mt-16">
          <div className="glass-card glass-strong p-8 rounded-3xl max-w-2xl mx-auto shadow-glass-lg">
            <h3 className="text-2xl font-bold mb-4 gradient-text">More Projects on GitHub</h3>
            <p className="text-gray-300 mb-6">
              Explore my complete portfolio of open-source projects, contributions, and code samples
            </p>
            <a
              href="https://github.com/ahmedrzakhan"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-button inline-flex items-center bg-gradient-liquid text-white px-8 py-4 rounded-lg font-semibold transition-all duration-500 transform hover:scale-105 hover:shadow-glass-xl"
            >
              <i className="fab fa-github mr-3 text-xl"></i>
              View All Projects
              <i className="fas fa-arrow-right ml-3"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;