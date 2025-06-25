import React from 'react';
import { skills } from '../data/portfolio';

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
    <section id="skills" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive toolkit spanning full-stack development, AI/ML, and cloud technologies
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skillCategory, index) => (
            <div
              key={index}
              className="glass p-8 rounded-2xl hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className="flex items-center mb-6">
                <div className={`w-14 h-14 bg-gradient-to-r ${getCategoryColor(skillCategory.category)} rounded-xl flex items-center justify-center mr-4 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300`}>
                  <i className={`${getCategoryIcon(skillCategory.category)} text-white text-xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                  {skillCategory.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {skillCategory.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-2 bg-slate-800 text-gray-300 text-sm rounded-lg border border-slate-700 hover:border-primary hover:text-primary transition-all duration-200 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Skills Summary */}
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          <div className="glass p-6 rounded-2xl text-center">
            <div className="text-3xl font-bold text-primary mb-2">25+</div>
            <div className="text-gray-400">Technologies</div>
          </div>
          <div className="glass p-6 rounded-2xl text-center">
            <div className="text-3xl font-bold text-primary mb-2">7</div>
            <div className="text-gray-400">Categories</div>
          </div>
          <div className="glass p-6 rounded-2xl text-center">
            <div className="text-3xl font-bold text-primary mb-2">4.5+</div>
            <div className="text-gray-400">Years Experience</div>
          </div>
          <div className="glass p-6 rounded-2xl text-center">
            <div className="text-3xl font-bold text-primary mb-2">∞</div>
            <div className="text-gray-400">Learning</div>
          </div>
        </div>

        {/* Expertise Areas */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-center mb-12">
            Areas of <span className="gradient-text">Expertise</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass p-8 rounded-2xl text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-brain text-white text-3xl"></i>
              </div>
              <h4 className="text-xl font-bold mb-4">AI/ML Engineering</h4>
              <p className="text-gray-400">
                LLMs, RAG systems, vector embeddings, semantic search, and intelligent content recommendation
              </p>
            </div>
            <div className="glass p-8 rounded-2xl text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-server text-white text-3xl"></i>
              </div>
              <h4 className="text-xl font-bold mb-4">Backend Architecture</h4>
              <p className="text-gray-400">
                Microservices, scalable APIs, database optimization, and high-performance system design
              </p>
            </div>
            <div className="glass p-8 rounded-2xl text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-desktop text-white text-3xl"></i>
              </div>
              <h4 className="text-xl font-bold mb-4">Frontend Development</h4>
              <p className="text-gray-400">
                React.js, Next.js, TypeScript, responsive design, and modern UI/UX implementation
              </p>
            </div>
            <div className="glass p-8 rounded-2xl text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-cloud text-white text-3xl"></i>
              </div>
              <h4 className="text-xl font-bold mb-4">Cloud Solutions</h4>
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