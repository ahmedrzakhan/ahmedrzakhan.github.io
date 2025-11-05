import React from 'react';
import { professionalSummary, personalInfo, education } from '../data/portfolio';

const About: React.FC = () => {
  const stats = [
    { number: '5+', label: 'Years Experience' },
    { number: '2M+', label: 'Monthly Revenue Impact' },
    { number: '400K+', label: 'Users Served' },
    { number: '265+', label: 'Partner Integrations' },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary/30 to-bg-primary"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text-ts">Me</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Passionate about building scalable solutions and exploring the frontiers of{' '}
            <span className="gradient-text font-semibold">AI/ML technology</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <div className="glass-card glass-strong p-8 rounded-3xl shadow-glass-lg hover:shadow-glass-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-liquid flex items-center justify-center mr-4 shadow-glow-primary">
                  <i className="fas fa-user-tie text-white text-xl"></i>
                </div>
                <h3 className="text-2xl font-bold gradient-text">Professional Summary</h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg">
                {professionalSummary}
              </p>
            </div>

            <div className="glass-card glass-strong p-8 rounded-3xl shadow-glass-lg hover:shadow-glass-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center mr-4 shadow-glow-secondary">
                  <i className="fas fa-rocket text-white text-xl"></i>
                </div>
                <h3 className="text-2xl font-bold gradient-text">Currently Working On</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Building AI-powered content recommendation systems with advanced semantic search capabilities,
                focusing on improving user experience through intelligent content discovery and personalization.
              </p>
            </div>

            <div className="glass-card glass-strong p-8 rounded-3xl shadow-glass-lg hover:shadow-glass-xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mr-4 shadow-glow-accent">
                  <i className="fas fa-graduation-cap text-white text-xl"></i>
                </div>
                <h3 className="text-2xl font-bold gradient-text">Education</h3>
              </div>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="relative pl-6 pb-4 border-l-2 border-gradient-liquid last:pb-0"
                  >
                    <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-gradient-liquid shadow-glow-primary"></div>
                    <h4 className="font-bold text-white text-lg">{edu.degree}</h4>
                    <p className="text-gray-300">{edu.institution}</p>
                    <p className="text-sm gradient-text font-semibold">{edu.duration}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card glass-strong p-8 rounded-3xl text-center shadow-glass-lg hover:shadow-glass-xl">
              <div className="w-16 h-16 rounded-2xl bg-gradient-liquid flex items-center justify-center mx-auto mb-4 shadow-glass-lg animate-float">
                <i className="fas fa-map-marker-alt text-white text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2 gradient-text">Based in</h3>
              <p className="text-gray-300 text-lg">{personalInfo.location}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="glass-card glass-strong p-6 rounded-2xl text-center shadow-glass hover:shadow-glass-lg group"
                >
                  <div className="text-4xl font-bold gradient-text-ts mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="glass-card glass-strong p-8 rounded-3xl shadow-glass-lg hover:shadow-glass-xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mr-4 shadow-glow-primary">
                  <i className="fas fa-trophy text-white text-xl"></i>
                </div>
                <h3 className="text-xl font-bold gradient-text">Key Achievements</h3>
              </div>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start group">
                  <div className="w-6 h-6 rounded-lg bg-gradient-liquid flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform shadow-glass">
                    <i className="fas fa-check text-white text-xs"></i>
                  </div>
                  <span className="leading-relaxed">
                    Won Best Project Award for IFSG platform at University of Dundee (2025)
                  </span>
                </li>
                <li className="flex items-start group">
                  <div className="w-6 h-6 rounded-lg bg-gradient-liquid flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform shadow-glass">
                    <i className="fas fa-check text-white text-xs"></i>
                  </div>
                  <span className="leading-relaxed">
                    Engineered scalable MF transaction system handling 20M+ monthly API calls
                  </span>
                </li>
                <li className="flex items-start group">
                  <div className="w-6 h-6 rounded-lg bg-gradient-liquid flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform shadow-glass">
                    <i className="fas fa-check text-white text-xs"></i>
                  </div>
                  <span className="leading-relaxed">
                    Built systems processing millions of transactions monthly
                  </span>
                </li>
                <li className="flex items-start group">
                  <div className="w-6 h-6 rounded-lg bg-gradient-liquid flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform shadow-glass">
                    <i className="fas fa-check text-white text-xs"></i>
                  </div>
                  <span className="leading-relaxed">
                    Optimized performance by 78% reduction in processing time
                  </span>
                </li>
                <li className="flex items-start group">
                  <div className="w-6 h-6 rounded-lg bg-gradient-liquid flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform shadow-glass">
                    <i className="fas fa-check text-white text-xs"></i>
                  </div>
                  <span className="leading-relaxed">
                    Led development for 400K+ active users
                  </span>
                </li>
                <li className="flex items-start group">
                  <div className="w-6 h-6 rounded-lg bg-gradient-liquid flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform shadow-glass">
                    <i className="fas fa-check text-white text-xs"></i>
                  </div>
                  <span className="leading-relaxed">
                    Increased conversions by 2K users monthly
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;