import React from 'react';
import { experiences } from '../data/portfolio';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A journey through impactful roles in software engineering and technology innovation
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary to-accent"></div>

          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <div
                key={index}
                className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:flex-row`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-slate-900 z-10"></div>

                {/* Content */}
                <div
                  className={`w-full md:w-5/12 ml-12 md:ml-0 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                    }`}
                >
                  <div className="glass p-6 rounded-2xl hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          {(() => {
                            const contractMatch = experience.title.match(/^(.+?)\s*-\s*\(Contract\)$/);
                            if (contractMatch) {
                              return (
                                <>
                                  {contractMatch[1]}
                                  <span className="text-sm font-normal text-gray-400 ml-2">
                                    (Contract)
                                  </span>
                                </>
                              );
                            }
                            return experience.title;
                          })()}
                        </h3>
                        <h4 className="text-primary font-semibold text-lg mb-1">
                          {experience.company}
                        </h4>
                        {experience.type && (
                          <p className="text-sm text-gray-400 mb-2">
                            {experience.type}
                          </p>
                        )}
                      </div>
                      <div className="text-right text-sm">
                        <p className="text-primary font-medium">{experience.duration}</p>
                        <p className="text-gray-400">{experience.location}</p>
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {experience.description.map((desc, descIndex) => (
                        <li key={descIndex} className="flex items-start text-gray-300">
                          <i className="fas fa-chevron-right text-primary text-xs mt-2 mr-3 flex-shrink-0"></i>
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

        {/* Experience Summary */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="glass p-6 rounded-2xl text-center">
            <div className="text-3xl font-bold text-primary mb-2">6+</div>
            <div className="text-gray-400">Companies</div>
            <div className="text-sm text-gray-500 mt-1">Diverse Experience</div>
          </div>
          <div className="glass p-6 rounded-2xl text-center">
            <div className="text-3xl font-bold text-primary mb-2">50K+</div>
            <div className="text-gray-400">Employees Impacted</div>
            <div className="text-sm text-gray-500 mt-1">Through Solutions</div>
          </div>
          <div className="glass p-6 rounded-2xl text-center">
            <div className="text-3xl font-bold text-primary mb-2">78%</div>
            <div className="text-gray-400">Performance Improvement</div>
            <div className="text-sm text-gray-500 mt-1">Optimization Achieved</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;