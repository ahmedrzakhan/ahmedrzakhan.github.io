import React from 'react';
import { personalInfo, socialLinks } from '../data/portfolio';
import { getBrandColors } from '../utils/brandColors';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    const duration = 1400;
    const startPosition = window.pageYOffset;
    let start: number | null = null;

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      window.scrollTo(0, startPosition * (1 - ease));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition - 80;
      const duration = 800; // Optimal duration for smooth feel
      let start: number | null = null;

      // Custom easing function - smooth and natural like iOS
      const easeInOutQuart = (t: number): number => {
        return t < 0.5
          ? 8 * t * t * t * t
          : 1 - Math.pow(-2 * t + 2, 4) / 2;
      };

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutQuart(progress);

        window.scrollTo({
          top: startPosition + distance * ease,
          behavior: 'auto' // Use our custom animation instead of browser's
        });

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    }
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
              className="text-3xl font-bold gradient-text hover:scale-105 transition-all duration-700 cubic-bezier-smooth inline-block"
            >
              Ahmed Raza Khan
            </button>
            <p className="text-gray-300 leading-relaxed transition-colors duration-500 hover:text-gray-100">
              Software Engineer specializing in Backend Development and AI/ML technologies.
              Building scalable solutions that make a difference.
            </p>
            <div className="flex items-center text-gray-300 transition-all duration-500 hover:text-gray-100 group">
              <i className="fas fa-map-marker-alt mr-2 gradient-text group-hover:scale-110 transition-transform duration-500"></i>
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
                  onClick={() => scrollToSection(link.href)}
                  className="text-gray-300 hover:text-white transition-all duration-700 text-left py-1 hover:translate-x-2 group flex items-center"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-700 mr-2">→</span>
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
                    className={`w-10 h-10 rounded-lg glass-light flex items-center justify-center transition-all duration-700 transform hover:scale-115 hover:-translate-y-2 shadow-md hover:shadow-2xl ${colors.hover} hover:backdrop-blur-xl`}
                    style={{ transition: 'all 0.7s cubic-bezier(0.19, 1, 0.22, 1)' }}
                    aria-label={link.name}
                  >
                    <i className={`${link.icon} text-lg ${colors.icon} transition-transform duration-700`}></i>
                  </a>
                );
              })}
            </div>
            <div className="space-y-2">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center text-gray-300 hover:text-white transition-all duration-700 group"
              >
                <i className="fas fa-envelope mr-3 group-hover:scale-125 transition-transform duration-700"></i>
                <span className="text-sm">{personalInfo.email}</span>
              </a>
              <a
                href={`https://${personalInfo.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-white transition-all duration-700 group"
              >
                <i className="fas fa-globe mr-3 group-hover:scale-125 group-hover:rotate-12 transition-all duration-700"></i>
                <span className="text-sm">{personalInfo.website}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gradient mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-300 text-sm transition-colors duration-500 hover:text-gray-100">
              © {currentYear} Ahmed Raza Khan. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-300">
              <span className="transition-colors duration-500 hover:text-gray-100">Built with React & TypeScript</span>
              <span className="transition-opacity duration-500 hover:opacity-50">•</span>
              <span className="transition-colors duration-500 hover:text-gray-100">Styled with Tailwind CSS</span>
              <span className="transition-opacity duration-500 hover:opacity-50">•</span>
              <button
                onClick={scrollToTop}
                className="liquid-button glass-light flex items-center hover:scale-105 px-4 py-2 rounded-lg font-medium group"
                style={{ transition: 'all 0.7s cubic-bezier(0.19, 1, 0.22, 1)' }}
              >
                <span>Back to Top</span>
                <i className="fas fa-chevron-up ml-2 group-hover:-translate-y-1 transition-transform duration-700"></i>
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