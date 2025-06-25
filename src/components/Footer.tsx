import React from 'react';
import { personalInfo, socialLinks } from '../data/portfolio';
import { getBrandColors } from '../utils/brandColors';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();


  return (
    <footer className="bg-slate-900 border-t border-slate-800 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <button
              onClick={scrollToTop}
              className="text-3xl font-bold gradient-text hover:scale-105 transition-transform duration-200"
            >
              Ahmed Raza Khan
            </button>
            <p className="text-gray-400 leading-relaxed">
              Software Engineer specializing in Backend Development and AI/ML technologies. 
              Building scalable solutions that make a difference.
            </p>
            <div className="flex items-center text-gray-400">
              <i className="fas fa-map-marker-alt mr-2 text-primary"></i>
              <span>{personalInfo.location}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
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
                  className="text-gray-400 hover:text-primary transition-colors duration-200 text-left py-1"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Social Links and Contact */}
          <div className="space-y-4">
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
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-md ${colors.bg} ${colors.hover}`}
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
                className="flex items-center text-gray-400 hover:text-primary transition-colors duration-200"
              >
                <i className="fas fa-envelope mr-3"></i>
                <span className="text-sm">{personalInfo.email}</span>
              </a>
              <a
                href={`https://${personalInfo.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-primary transition-colors duration-200"
              >
                <i className="fas fa-globe mr-3"></i>
                <span className="text-sm">{personalInfo.website}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Ahmed Raza Khan. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Built with React & TypeScript</span>
              <span>•</span>
              <span>Styled with Tailwind CSS</span>
              <span>•</span>
              <button
                onClick={scrollToTop}
                className="flex items-center hover:text-primary transition-colors duration-200"
              >
                <span>Back to Top</span>
                <i className="fas fa-chevron-up ml-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
    </footer>
  );
};

export default Footer;