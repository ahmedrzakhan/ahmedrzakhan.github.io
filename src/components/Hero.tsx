import React, { useState, useEffect } from 'react';
import { personalInfo, animatedRoles, socialLinks } from '../data/portfolio';

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
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="block text-white mb-2">Hi, I'm</span>
            <span className="gradient-text">{personalInfo.name}</span>
          </h1>
          
          <div className="text-2xl md:text-4xl font-semibold mb-8 h-16 flex items-center justify-center">
            <span className="text-gray-300">I'm a </span>
            <span className="text-primary ml-2 min-w-[300px] text-left">
              {currentText}
              <span className="typed-cursor">|</span>
            </span>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Specializing in Backend Development and AI/ML technologies with 4.5 years of experience building scalable applications.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <button
              onClick={() => scrollToSection('#projects')}
              className="bg-primary hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection('#contact')}
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Let's Connect
            </button>
          </div>
          
          <div className="flex items-center justify-center space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary text-2xl transition-all duration-300 transform hover:scale-125"
                aria-label={link.name}
              >
                <i className={link.icon}></i>
              </a>
            ))}
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={() => scrollToSection('#about')}
            className="text-gray-400 hover:text-primary transition-colors duration-300"
          >
            <i className="fas fa-chevron-down text-2xl"></i>
          </button>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full floating blur-sm"></div>
      <div className="absolute top-40 right-10 w-16 h-16 bg-accent/10 rounded-full floating" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-primary/10 rounded-full floating" style={{animationDelay: '4s'}}></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-accent/10 rounded-full floating" style={{animationDelay: '1s'}}></div>
    </section>
  );
};

export default Hero;