import React from 'react';
import { professionalSummary, personalInfo, education } from '../data/portfolio';

const About: React.FC = () => {
  const stats = [
    { number: '4.5+', label: 'Years Experience' },
    { number: '2M+', label: 'Monthly Revenue Impact' },
    { number: '400K+', label: 'Users Served' },
    { number: '265+', label: 'Partner Integrations' },
  ];

  return (
    <section id="about" className="py-20 bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Passionate about building scalable solutions and exploring the frontiers of AI/ML technology
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Professional Summary</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                {professionalSummary}
              </p>
            </div>

            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Currently Working On</h3>
              <p className="text-gray-300 leading-relaxed">
                Building AI-powered content recommendation systems with advanced semantic search capabilities, 
                focusing on improving user experience through intelligent content discovery and personalization.
              </p>
            </div>

            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-6 text-primary">Education</h3>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-primary pl-4">
                    <h4 className="font-semibold text-white">{edu.degree}</h4>
                    <p className="text-gray-400">{edu.institution}</p>
                    <p className="text-sm text-primary">{edu.duration}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="glass p-8 rounded-2xl text-center">
              <div className="mb-6">
                <i className="fas fa-map-marker-alt text-primary text-3xl mb-4"></i>
                <h3 className="text-xl font-semibold mb-2">Based in</h3>
                <p className="text-gray-400">{personalInfo.location}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="glass p-6 rounded-2xl text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="glass p-8 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4 text-primary">Key Achievements</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-primary mt-1 mr-3"></i>
                  Built systems processing millions of transactions monthly
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-primary mt-1 mr-3"></i>
                  Optimized performance by 78% reduction in processing time
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-primary mt-1 mr-3"></i>
                  Led development for 400K+ active users
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-primary mt-1 mr-3"></i>
                  Increased conversions by 2K users monthly
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