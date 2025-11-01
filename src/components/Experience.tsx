import React from 'react';
import { experiences } from '../data/portfolio';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary/30 to-bg-primary"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Work <span className="gradient-text-ts">Experience</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            A journey through impactful roles in{' '}
            <span className="gradient-text font-semibold">software engineering</span> and technology innovation
          </p>
        </div>

        <div className="relative">
          {/* Liquid timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-gradient-liquid rounded-full shadow-glow-primary"></div>

          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <div
                key={index}
                className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:flex-row`}
              >
                {/* Glowing timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 z-10">
                  <div className="w-6 h-6 bg-gradient-liquid rounded-full shadow-glass-lg animate-pulse-glow"></div>
                  <div className="absolute inset-0 w-6 h-6 bg-gradient-liquid rounded-full blur-md opacity-75"></div>
                </div>

                {/* Content */}
                <div
                  className={`w-full md:w-5/12 ml-12 md:ml-0 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                    }`}
                >
                  <div className="glass-card glass-strong p-8 rounded-3xl shadow-glass-lg hover:shadow-glass-xl transition-all duration-500 transform hover:-translate-y-2">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">
                          {(() => {
                            const contractMatch = experience.title.match(/^(.+?)\s*-\s*\(Contract\)$/);
                            if (contractMatch) {
                              return (
                                <>
                                  {contractMatch[1]}
                                  <span className="glass-light text-sm font-normal px-3 py-1 rounded-full ml-2 inline-block">
                                    Contract
                                  </span>
                                </>
                              );
                            }
                            return experience.title;
                          })()}
                        </h3>
                        <h4 className="gradient-text font-bold text-lg mb-2">
                          {experience.company}
                        </h4>
                        {experience.type && (
                          <p className="text-sm text-gray-300 mb-2">
                            {experience.type}
                          </p>
                        )}
                      </div>
                      <div className="text-right text-sm ml-4">
                        <p className="gradient-text font-semibold mb-1">{experience.duration}</p>
                        <p className="text-gray-400">{experience.location}</p>
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {experience.description.map((desc, descIndex) => (
                        <li key={descIndex} className="flex items-start text-gray-300 group">
                          <div className="w-2 h-2 rounded-full bg-gradient-liquid mt-2 mr-3 flex-shrink-0 group-hover:scale-150 transition-transform shadow-glow-primary"></div>
                          <span className="text-sm leading-relaxed">{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block w-2/12"></div>
                <div className="hidden md:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Summary with liquid glass cards */}
        <div className="mt-20 grid md:grid-cols-3 gap-6">
          <div className="glass-card glass-strong p-8 rounded-3xl text-center shadow-glass-lg hover:shadow-glass-xl group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-liquid flex items-center justify-center mx-auto mb-4 shadow-glass-lg group-hover:scale-110 transition-transform">
              <i className="fas fa-building text-white text-2xl"></i>
            </div>
            <div className="text-4xl font-bold gradient-text-ts mb-2">6+</div>
            <div className="text-gray-300 font-semibold mb-1">Companies</div>
            <div className="text-sm text-gray-400">Diverse Experience</div>
          </div>
          <div className="glass-card glass-strong p-8 rounded-3xl text-center shadow-glass-lg hover:shadow-glass-xl group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center mx-auto mb-4 shadow-glass-lg group-hover:scale-110 transition-transform">
              <i className="fas fa-users text-white text-2xl"></i>
            </div>
            <div className="text-4xl font-bold gradient-text-ts mb-2">50K+</div>
            <div className="text-gray-300 font-semibold mb-1">Employees Impacted</div>
            <div className="text-sm text-gray-400">Through Solutions</div>
          </div>
          <div className="glass-card glass-strong p-8 rounded-3xl text-center shadow-glass-lg hover:shadow-glass-xl group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mx-auto mb-4 shadow-glass-lg group-hover:scale-110 transition-transform">
              <i className="fas fa-chart-line text-white text-2xl"></i>
            </div>
            <div className="text-4xl font-bold gradient-text-ts mb-2">78%</div>
            <div className="text-gray-300 font-semibold mb-1">Performance Improvement</div>
            <div className="text-sm text-gray-400">Optimization Achieved</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;