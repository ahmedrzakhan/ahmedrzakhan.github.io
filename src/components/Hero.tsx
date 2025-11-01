import React, { useState, useEffect } from 'react';
import { personalInfo, animatedRoles, socialLinks } from '../data/portfolio';
import { getBrandColors } from '../utils/brandColors';

const Hero: React.FC = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typeSpeed, setTypeSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentRole = animatedRoles[currentRoleIndex];

      if (isDeleting) {
        setCurrentText(prev => prev.substring(0, prev.length - 1));
        setTypeSpeed(75);
      } else {
        setCurrentText(prev => currentRole.substring(0, prev.length + 1));
        setTypeSpeed(150);
      }

      if (!isDeleting && currentText === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentRoleIndex(prev => (prev + 1) % animatedRoles.length);
      }
    };

    const timer = setTimeout(handleTyping, typeSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, typeSpeed]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 relative">
        <div className="animate-fade-in">
          {personalInfo.avatar && (
            <div className="mt-8 mb-8 relative inline-block">
              {/* Glowing ring around avatar */}
              <div className="absolute inset-0 -m-1 rounded-full bg-gradient-liquid blur-md opacity-75 animate-pulse-glow"></div>
              <div className="relative p-1 bg-gradient-liquid rounded-full animate-gradient-shift bg-[length:200%_200%]">
                <div className="glass rounded-full p-1">
                  <img
                    src={personalInfo.avatar}
                    alt={personalInfo.name}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto object-cover ring-4 ring-bg-primary shadow-glass-xl hover:scale-105 transition-all duration-500 transform"
                  />
                </div>
              </div>
            </div>
          )}

          <h1 className="text-5xl md:text-7xl font-bold mb-6 relative">
            <span className="block text-white mb-2 animate-slide-down">Hi, I'm</span>
            <span className="gradient-text-ts text-6xl md:text-8xl animate-float">
              {personalInfo.name}
            </span>
          </h1>

          <div className="text-2xl md:text-4xl font-semibold mb-8 h-16 flex items-center justify-center">
            <span className="text-gray-300">I'm a </span>
            <span className="gradient-text ml-2 min-w-[300px] text-left">
              {currentText}
              <span className="typed-cursor">|</span>
            </span>
          </div>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Specializing in{' '}
            <span className="gradient-text font-semibold">Backend Development</span> and{' '}
            <span className="gradient-text font-semibold">AI/ML technologies</span> with 5+ years of
            experience building scalable applications.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <button
              onClick={() => scrollToSection('#projects')}
              className="relative group bg-gradient-liquid text-white px-10 py-4 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-glass-lg hover:shadow-glass-xl liquid-button overflow-hidden"
            >
              <span className="relative z-10">View My Work</span>
              <i className="fas fa-arrow-right ml-2 relative z-10 group-hover:translate-x-1 transition-transform"></i>
            </button>
            <button
              onClick={() => scrollToSection('#contact')}
              className="glass-strong holographic-border text-white hover:glass px-10 py-4 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-glass hover:shadow-glass-lg"
            >
              Let's Connect
              <i className="fas fa-paper-plane ml-2"></i>
            </button>
          </div>

          <div className="flex items-center justify-center space-x-6 flex-wrap gap-4">
            {socialLinks.map((link, index) => {
              const colors = getBrandColors(link.name);
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`glass-light w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 transform hover:scale-125 shadow-glass hover:shadow-glass-lg glow-on-hover animate-slide-up ${colors.bg} ${colors.hover}`}
                  aria-label={link.name}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <i className={`${link.icon} ${colors.icon}`}></i>
                </a>
              );
            })}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <button
            onClick={() => scrollToSection('#about')}
            className="glass-light p-4 rounded-full text-gray-300 hover:text-primary transition-all duration-300 shadow-glass hover:shadow-glow-primary"
          >
            <i className="fas fa-chevron-down text-2xl"></i>
          </button>
        </div>
      </div>

      {/* Liquid glass orbs floating in background */}
      <div className="absolute top-20 left-10 w-24 h-24 glass-light rounded-full animate-float blur-lg opacity-40 shadow-glow-primary"></div>
      <div className="absolute top-40 right-10 w-32 h-32 glass-light rounded-full animate-float-slow blur-lg opacity-30 shadow-glow-secondary" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-40 left-20 w-20 h-20 glass-light rounded-full animate-float blur-lg opacity-35 shadow-glow-accent" style={{ animationDelay: '4s' }}></div>
      <div className="absolute bottom-20 right-20 w-28 h-28 glass-light rounded-full animate-float-slow blur-lg opacity-40 shadow-glow-primary" style={{ animationDelay: '1s' }}></div>

      {/* Additional morphing shapes */}
      <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full animate-morph blur-2xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full animate-morph blur-2xl" style={{ animationDelay: '4s' }}></div>
    </section>
  );
};

export default Hero;