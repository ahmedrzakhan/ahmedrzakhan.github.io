import React from 'react';
import { personalInfo, socialLinks } from '../data/portfolio';
import { getBrandColors } from '../utils/brandColors';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();


  return (
    <footer className="glass-strong border-t border-gradient relative z-10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4 animate-fade-in">
            <button
              onClick={scrollToTop}
              className="text-3xl font-bold gradient-text hover:scale-105 transition-all duration-300"
            >
              Ahmed Raza Khan
            </button>
            <p className="text-gray-300 leading-relaxed">
              Software Engineer specializing in Backend Development and AI/ML technologies.
              Building scalable solutions that make a difference.
            </p>
            <div className="flex items-center text-gray-300">
              <i className="fas fa-map-marker-alt mr-2 gradient-text"></i>
              <span>{personalInfo.location}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-xl font-semibold text-white">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: 'About', href: '#about' },
                { name: 'Experience', href: '#experience' },
                { name: 'Projects', href: '#projects' },
                { name: 'Skills', href: '#skills' },
                { name: 'Contact', href: '#contact' },
              ].map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    const element = document.querySelector(link.href);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-gray-300 hover:gradient-text transition-all duration-300 text-left py-1 hover:translate-x-1"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Social Links and Contact */}
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-semibold text-white">Connect</h3>
            <div className="flex items-center space-x-4">
              {socialLinks.map((link) => {
                const colors = getBrandColors(link.name);
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-lg glass-light flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-md hover:shadow-xl ${colors.hover}`}
                    aria-label={link.name}
                  >
                    <i className={`${link.icon} text-lg ${colors.icon}`}></i>
                  </a>
                );
              })}
            </div>
            <div className="space-y-2">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center text-gray-300 hover:gradient-text transition-all duration-300 group"
              >
                <i className="fas fa-envelope mr-3 group-hover:scale-110 transition-transform duration-300"></i>
                <span className="text-sm">{personalInfo.email}</span>
              </a>
              <a
                href={`https://${personalInfo.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:gradient-text transition-all duration-300 group"
              >
                <i className="fas fa-globe mr-3 group-hover:scale-110 transition-transform duration-300"></i>
                <span className="text-sm">{personalInfo.website}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gradient mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-300 text-sm">
              © {currentYear} Ahmed Raza Khan. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-300">
              <span>Built with React & TypeScript</span>
              <span>•</span>
              <span>Styled with Tailwind CSS</span>
              <span>•</span>
              <button
                onClick={scrollToTop}
                className="liquid-button bg-gradient-liquid flex items-center hover:scale-105 transition-all duration-300 px-4 py-2 rounded-lg font-medium"
              >
                <span>Back to Top</span>
                <i className="fas fa-chevron-up ml-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-liquid-cyan/50 to-transparent opacity-50"></div>
    </footer>
  );
};

export default Footer;