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
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full ${
        isScrolled ? 'glass-strong py-4' : 'bg-transparent py-6'
      }`}
      style={{
        position: 'fixed',
        top: 0,
        transition: 'all 0.6s cubic-bezier(0.19, 1, 0.22, 1)',
        willChange: 'padding, backdrop-filter',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0 flex items-center space-x-3">
            {/* Animated Profile Picture with liquid glass border */}
            {personalInfo.avatar && (
              <div
                className={`transition-all duration-500 ease-out overflow-hidden ${
                  showProfilePic
                    ? 'opacity-100 w-10 mr-0'
                    : 'opacity-0 w-0 mr-0'
                  }`}
              >
                <div className="relative p-0.5 bg-gradient-liquid rounded-full animate-gradient-shift bg-[length:200%_200%]">
                  <img
                    src={personalInfo.avatar}
                    alt={personalInfo.name}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-bg-primary hover:scale-110 transition-all duration-300 flex-shrink-0"
                  />
                </div>
              </div>
            )}
            <button
              onClick={() => scrollToSection('#home')}
              className="text-2xl font-bold gradient-text-ts hover:scale-105 transition-transform duration-300 relative"
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
                  className="relative text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-liquid transition-all duration-300 px-3 py-2 text-sm font-medium group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-liquid group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
              <a
                href={resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="relative bg-gradient-liquid text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 shadow-glass-lg hover:shadow-glass-xl hover:scale-105 liquid-button overflow-hidden group"
              >
                <i className="fas fa-download relative z-10"></i>
                <span className="relative z-10">Resume</span>
              </a>
            </div>
          </div>

          {/* Mobile menu button with liquid glass effect */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="glass-light text-gray-300 hover:text-primary transition-all duration-300 p-3 rounded-xl hover:shadow-glow-primary"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation with liquid glass */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-6 pb-4 animate-slide-down">
            <div className="glass rounded-2xl p-4 flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-liquid transition-all duration-300 px-4 py-3 text-base font-medium text-left rounded-lg hover:glass-light"
                >
                  {item.name}
                </button>
              ))}
              <a
                href={resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-liquid text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 w-fit shadow-glass hover:shadow-glass-lg hover:scale-105 liquid-button overflow-hidden mt-2"
              >
                <i className="fas fa-download relative z-10"></i>
                <span className="relative z-10">Resume</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;