import React, { useState, useEffect } from 'react';
import { resumeLink, personalInfo } from '../data/portfolio';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfilePic, setShowProfilePic] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setIsScrolled(scrollY > 50);
          setShowProfilePic(scrollY > 200);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'backdrop-blur-md bg-slate-900/80 border-b border-slate-700/50 py-4' : 'bg-transparent py-6'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0 flex items-center space-x-3">
            {/* Animated Profile Picture */}
            {personalInfo.avatar && (
              <div
                className={`transition-all duration-300 ease-out overflow-hidden ${showProfilePic
                  ? 'opacity-100 w-8 mr-0'
                  : 'opacity-0 w-0 mr-0'
                  }`}
              >
                <img
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-primary/50 hover:border-primary transition-all duration-200 flex-shrink-0"
                />
              </div>
            )}
            <button
              onClick={() => scrollToSection('#home')}
              className="text-2xl font-medium gradient-text hover:scale-105 transition-transform duration-200"
            >
              ARZ
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-300 hover:text-primary transition-colors duration-200 px-3 py-2 text-sm font-medium"
                >
                  {item.name}
                </button>
              ))}
              <a
                href={resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
              >
                <i className="fas fa-download"></i>
                Resume
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-primary transition-colors duration-200 p-2"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-300 hover:text-primary transition-colors duration-200 px-3 py-2 text-base font-medium text-left"
                >
                  {item.name}
                </button>
              ))}
              <a
                href={resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2 w-fit"
              >
                <i className="fas fa-download"></i>
                Resume
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;