import React from 'react';
import { personalInfo, socialLinks, resumeLink } from '../data/portfolio';
import { getBrandColors } from '../utils/brandColors';

interface ContactProps {
  analytics?: {
    trackContactFormSubmission: () => void;
    trackResumeDownload: () => void;
  };
}

const Contact: React.FC<ContactProps> = ({ analytics }) => {
  const handleEmailClick = () => {
    analytics?.trackContactFormSubmission();
  };

  const handleResumeDownload = () => {
    analytics?.trackResumeDownload();
    window.open(resumeLink, '_blank');
  };


  const contactMethods = [
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      value: personalInfo.email,
      link: `mailto:${personalInfo.email}`,
      description: 'Send me an email'
    },
    {
      icon: 'fab fa-linkedin',
      title: 'LinkedIn',
      value: personalInfo.linkedin,
      link: `https://${personalInfo.linkedin}`,
      description: 'Connect professionally'
    },
    {
      icon: 'fab fa-github',
      title: 'GitHub',
      value: personalInfo.github,
      link: `https://${personalInfo.github}`,
      description: 'Check out my code'
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Location',
      value: personalInfo.location,
      link: '#',
      description: 'Based in'
    }
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-800/30 to-slate-900/50"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="gradient-text-ts">Touch</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Let's discuss opportunities, collaborations, or just connect! I'm always open to interesting conversations and new projects.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
              <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
                I'm currently open to new opportunities and collaborations. Whether you have a project in mind, 
                want to discuss AI/ML innovations, or just want to say hello, I'd love to hear from you!
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {contactMethods.map((method, index) => {
                const colors = getBrandColors(method.title);
                return (
                  <a
                    key={index}
                    href={method.link}
                    target={method.link.startsWith('http') ? '_blank' : '_self'}
                    rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
                    className={`glass-card glass-strong p-6 rounded-3xl shadow-glass-lg hover:shadow-glass-xl glow-on-hover transition-all duration-500 transform hover:-translate-y-2 group ${
                      method.link === '#' ? 'cursor-default' : 'cursor-pointer'
                    } animate-fade-in-up`}
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-liquid flex items-center justify-center mx-auto mb-4 shadow-glass-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                        <i className={`${method.icon} text-2xl text-white`}></i>
                      </div>
                      <h4 className="font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-liquid group-hover:bg-clip-text transition-all duration-300 mb-2">
                        {method.title}
                      </h4>
                      <p className="text-sm text-gray-400 mb-2">{method.description}</p>
                      <p className="text-gray-300 text-sm break-all">{method.value}</p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="glass-card glass-strong p-8 rounded-3xl shadow-glass-lg hover:shadow-glass-xl text-center animate-fade-in-up transition-all duration-500">
              <h4 className="text-2xl font-bold mb-8 gradient-text-ts">Follow Me</h4>
              <div className="flex items-center justify-center space-x-8 flex-wrap gap-4">
                {socialLinks.map((link, index) => {
                  const colors = getBrandColors(link.name);
                  return (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center group animate-fade-in-up"
                      aria-label={link.name}
                      style={{
                        animationDelay: `${index * 100 + 400}ms`
                      }}
                    >
                      <div className="w-16 h-16 rounded-2xl bg-gradient-liquid flex items-center justify-center transition-all duration-500 transform hover:scale-125 hover:rotate-12 mb-2 shadow-glass-lg hover:shadow-glass-xl glow-on-hover">
                        <i className={`${link.icon} text-2xl text-white`}></i>
                      </div>
                      <span className="text-sm text-gray-400 group-hover:text-white transition-colors duration-300">
                        {link.name}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Call to Action */}
            <div className="glass-card glass-strong p-8 rounded-3xl shadow-glass-lg hover:shadow-glass-xl text-center animate-fade-in-up transition-all duration-500">
              <h4 className="text-2xl font-bold mb-4 gradient-text-ts">Ready to Work Together?</h4>
              <p className="text-gray-300 mb-6">
                Let's build something amazing together. Reach out and let's discuss your next project!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <a
                  href={`mailto:${personalInfo.email}`}
                  onClick={handleEmailClick}
                  className="liquid-button inline-flex items-center bg-gradient-liquid text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-500 transform hover:scale-105 hover:shadow-glass-xl glow-on-hover"
                >
                  <i className="fas fa-envelope mr-3"></i>
                  Get In Touch
                </a>
                <button
                  onClick={handleResumeDownload}
                  className="liquid-button inline-flex items-center bg-gradient-liquid text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-500 transform hover:scale-105 hover:shadow-glass-xl glow-on-hover"
                >
                  <i className="fas fa-download mr-3"></i>
                  Download Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;