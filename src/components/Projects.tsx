import React from 'react';
import { projects } from '../data/portfolio';

const Projects: React.FC = () => {
  const handleProjectClick = (repo: string) => {
    window.open(`https://${repo}`, '_blank', 'noopener,noreferrer');
  };

  const getProjectIcon = (title: string) => {
    if (title.toLowerCase().includes('ai') || title.toLowerCase().includes('recommender')) {
      return 'fas fa-robot';
    } else if (title.toLowerCase().includes('summary') || title.toLowerCase().includes('article')) {
      return 'fas fa-file-alt';
    } else if (title.toLowerCase().includes('documentation') || title.toLowerCase().includes('raft')) {
      return 'fas fa-book';
    } else if (title.toLowerCase().includes('bot') || title.toLowerCase().includes('faq')) {
      return 'fas fa-comments';
    }
    return 'fas fa-code';
  };

  return (
    <section id="projects" className="py-20 bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Showcasing AI/ML innovations and full-stack solutions that solve real-world problems
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              onClick={() => handleProjectClick(project.repo)}
              className="glass p-8 rounded-2xl cursor-pointer group hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center mr-4 group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
                  <i className={`${getProjectIcon(project.title)} text-white text-2xl`}></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <div className="flex items-center text-gray-400 mt-1">
                    <i className="fab fa-github mr-2"></i>
                    <span className="text-sm">{project.repo.split('/').pop()}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.split(', ').map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full border border-primary/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-400 group-hover:text-primary transition-colors duration-300">
                  <i className="fas fa-external-link-alt mr-2"></i>
                  <span>View Project</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <i className="fas fa-star mr-1"></i>
                  <span className="text-sm">Featured</span>
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="text-center mt-16">
          <div className="glass p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">More Projects on GitHub</h3>
            <p className="text-gray-400 mb-6">
              Explore my complete portfolio of open-source projects, contributions, and code samples
            </p>
            <a
              href="https://github.com/ahmedrzakhan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
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