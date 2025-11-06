import React from 'react';
import { skills } from '../data/portfolio';

// Brand colors and icons for technologies
const techColors: { [key: string]: { bg: string; text: string; icon?: string } } = {
  // Programming Languages
  'Python': { bg: 'bg-[#3776AB]', text: 'text-white', icon: 'fab fa-python' },
  'Go': { bg: 'bg-[#00ADD8]', text: 'text-white', icon: 'fab fa-golang' },
  'Java': { bg: 'bg-[#ED8B00]', text: 'text-white', icon: 'fab fa-java' },
  'JavaScript/TypeScript': { bg: 'bg-[#F7DF1E]', text: 'text-black', icon: 'fab fa-js' },
  'TypeScript': { bg: 'bg-[#007ACC]', text: 'text-white', icon: 'fab fa-js' },
  'JavaScript': { bg: 'bg-[#F7DF1E]', text: 'text-black', icon: 'fab fa-js' },

  // AI/ML
  'OpenAI': { bg: 'bg-[#412991]', text: 'text-white' },
  'Google Gemini': { bg: 'bg-[#4285F4]', text: 'text-white' },
  'LangChain': { bg: 'bg-[#1C3C3C]', text: 'text-white' },
  'ChromaDB': { bg: 'bg-[#FF6B6B]', text: 'text-white' },
  'HuggingFace': { bg: 'bg-[#FFD21E]', text: 'text-black' },
  'Transformers': { bg: 'bg-[#FF6F00]', text: 'text-white' },
  'RAFT': { bg: 'bg-[#8B5CF6]', text: 'text-white' },
  'Vector Embeddings': { bg: 'bg-[#10B981]', text: 'text-white' },

  // Backend
  'FastAPI': { bg: 'bg-[#009688]', text: 'text-white', icon: 'fas fa-rocket' },
  'Node.js': { bg: 'bg-[#339933]', text: 'text-white', icon: 'fab fa-node-js' },
  'Express.js': { bg: 'bg-[#000000]', text: 'text-white', icon: 'fas fa-server' },
  'NestJS': { bg: 'bg-[#E0234E]', text: 'text-white', icon: 'fas fa-cube' },
  'Go Fiber': { bg: 'bg-[#00ADD8]', text: 'text-white', icon: 'fas fa-bolt' },
  'Spring Boot': { bg: 'bg-[#6DB33F]', text: 'text-white', icon: 'fas fa-leaf' },

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
  'Cassandra': { bg: 'bg-[#1287B1]', text: 'text-white', icon: 'fas fa-database' },
  'Redis': { bg: 'bg-[#DC382D]', text: 'text-white', icon: 'fas fa-memory' },
  'Elasticsearch': { bg: 'bg-[#005571]', text: 'text-white', icon: 'fas fa-search' },

  // Cloud & DevOps
  'AWS': { bg: 'bg-[#FF9900]', text: 'text-black', icon: 'fab fa-aws' },
  'Docker': { bg: 'bg-[#2496ED]', text: 'text-white', icon: 'fab fa-docker' },
  'Google Cloud': { bg: 'bg-[#4285F4]', text: 'text-white', icon: 'fab fa-google' },
  'Jenkins': { bg: 'bg-[#D24939]', text: 'text-white', icon: 'fas fa-hammer' },
  'Nginx': { bg: 'bg-[#009639]', text: 'text-white', icon: 'fas fa-shield-alt' },
  'Kubernetes': { bg: 'bg-[#326CE5]', text: 'text-white', icon: 'fas fa-dharmachakra' },

  // Tools
  'Apache Kafka': { bg: 'bg-[#231F20]', text: 'text-white', icon: 'fas fa-stream' },
  'Git': { bg: 'bg-[#F05032]', text: 'text-white', icon: 'fab fa-git-alt' },
  'LangSmith': { bg: 'bg-[#1C3C3C]', text: 'text-white', icon: 'fas fa-link' },
  'Postman': { bg: 'bg-[#FF6C37]', text: 'text-white', icon: 'fas fa-paper-plane' },
};

const Skills: React.FC = () => {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'programming languages':
        return 'fas fa-code';
      case 'ai/ml':
        return 'fas fa-brain';
      case 'backend':
        return 'fas fa-server';
      case 'frontend':
        return 'fas fa-desktop';
      case 'databases':
        return 'fas fa-database';
      case 'cloud & devops':
        return 'fas fa-cloud';
      case 'tools':
        return 'fas fa-tools';
      default:
        return 'fas fa-cog';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'programming languages':
        return 'from-blue-500 to-purple-600';
      case 'ai/ml':
        return 'from-green-500 to-teal-600';
      case 'backend':
        return 'from-red-500 to-pink-600';
      case 'frontend':
        return 'from-yellow-500 to-orange-600';
      case 'databases':
        return 'from-indigo-500 to-blue-600';
      case 'cloud & devops':
        return 'from-purple-500 to-indigo-600';
      case 'tools':
        return 'from-gray-500 to-slate-600';
      default:
        return 'from-primary to-accent';
    }
  };

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Gradient overlay background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-primary/5 to-accent/5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="gradient-text-ts">Skills</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive toolkit spanning full-stack development, AI/ML, and cloud technologies
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skillCategory, index) => (
            <div
              key={index}
              className="glass-card glass-strong p-8 rounded-3xl shadow-glass-lg hover:shadow-glass-xl transition-all duration-500 transform hover:-translate-y-2 group animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center mb-6">
                <div className={`w-14 h-14 bg-gradient-liquid rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                  <i className={`${getCategoryIcon(skillCategory.category)} text-white text-xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                  {skillCategory.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {skillCategory.technologies.map((tech, techIndex) => {
                  const techStyle = techColors[tech] || { bg: 'bg-slate-800', text: 'text-gray-300' };
                  return (
                    <span
                      key={techIndex}
                      className="glass-light px-3 py-2 text-sm rounded-lg font-medium hover:scale-105 hover:shadow-glass transition-all duration-300 cursor-default flex items-center gap-2 text-white border border-white/10"
                    >
                      {techStyle.icon && (
                        <i className={`${techStyle.icon} text-xs opacity-70`}></i>
                      )}
                      {tech}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Skills Summary */}
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          <div className="glass-card glass-strong p-6 rounded-3xl shadow-glass-lg hover:shadow-glass-xl transition-all duration-500 text-center group animate-fade-in">
            <div className="w-16 h-16 bg-gradient-liquid rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-500 shadow-lg">
              <i className="fas fa-code text-white text-2xl"></i>
            </div>
            <div className="text-3xl font-bold gradient-text-ts mb-2">25+</div>
            <div className="text-gray-400">Technologies</div>
          </div>
          <div className="glass-card glass-strong p-6 rounded-3xl shadow-glass-lg hover:shadow-glass-xl transition-all duration-500 text-center group animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="w-16 h-16 bg-gradient-liquid rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-500 shadow-lg">
              <i className="fas fa-layer-group text-white text-2xl"></i>
            </div>
            <div className="text-3xl font-bold gradient-text-ts mb-2">7</div>
            <div className="text-gray-400">Categories</div>
          </div>
          <div className="glass-card glass-strong p-6 rounded-3xl shadow-glass-lg hover:shadow-glass-xl transition-all duration-500 text-center group animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="w-16 h-16 bg-gradient-liquid rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-500 shadow-lg">
              <i className="fas fa-calendar-check text-white text-2xl"></i>
            </div>
            <div className="text-3xl font-bold gradient-text-ts mb-2">5</div>
            <div className="text-gray-400">Years Experience</div>
          </div>
          <div className="glass-card glass-strong p-6 rounded-3xl shadow-glass-lg hover:shadow-glass-xl transition-all duration-500 text-center group animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="w-16 h-16 bg-gradient-liquid rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-500 shadow-lg">
              <i className="fas fa-infinity text-white text-2xl"></i>
            </div>
            <div className="text-3xl font-bold gradient-text-ts mb-2">∞</div>
            <div className="text-gray-400">Learning</div>
          </div>
        </div>

        {/* Expertise Areas */}
        <div className="mt-16 animate-fade-in">
          <h3 className="text-3xl font-bold text-center mb-12">
            Areas of <span className="gradient-text-ts">Expertise</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass-card glass-strong p-8 rounded-3xl shadow-glass-lg hover:shadow-glass-xl transition-all duration-500 text-center group transform hover:-translate-y-2 animate-slide-up">
              <div className="w-20 h-20 bg-gradient-liquid rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                <i className="fas fa-brain text-white text-3xl"></i>
              </div>
              <h4 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">AI/ML Engineering</h4>
              <p className="text-gray-400">
                LLMs, RAG systems, vector embeddings, semantic search, and intelligent content recommendation
              </p>
            </div>
            <div className="glass-card glass-strong p-8 rounded-3xl shadow-glass-lg hover:shadow-glass-xl transition-all duration-500 text-center group transform hover:-translate-y-2 animate-slide-up" style={{ animationDelay: '100ms' }}>
              <div className="w-20 h-20 bg-gradient-liquid rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                <i className="fas fa-server text-white text-3xl"></i>
              </div>
              <h4 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">Backend Architecture</h4>
              <p className="text-gray-400">
                Microservices, scalable APIs, database optimization, and high-performance system design
              </p>
            </div>
            <div className="glass-card glass-strong p-8 rounded-3xl shadow-glass-lg hover:shadow-glass-xl transition-all duration-500 text-center group transform hover:-translate-y-2 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="w-20 h-20 bg-gradient-liquid rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                <i className="fas fa-desktop text-white text-3xl"></i>
              </div>
              <h4 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">Frontend Development</h4>
              <p className="text-gray-400">
                React.js, Next.js, TypeScript, responsive design, and modern UI/UX implementation
              </p>
            </div>
            <div className="glass-card glass-strong p-8 rounded-3xl shadow-glass-lg hover:shadow-glass-xl transition-all duration-500 text-center group transform hover:-translate-y-2 animate-slide-up" style={{ animationDelay: '300ms' }}>
              <div className="w-20 h-20 bg-gradient-liquid rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                <i className="fas fa-cloud text-white text-3xl"></i>
              </div>
              <h4 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">Cloud Solutions</h4>
              <p className="text-gray-400">
                AWS, containerization, CI/CD pipelines, and scalable cloud infrastructure deployment
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;