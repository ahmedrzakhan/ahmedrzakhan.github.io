import React from 'react';
import { personalInfo, socialLinks, resumeLink } from '../data/portfolio';

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
    <section id="contact" className="py-20 bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
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
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.link}
                  target={method.link.startsWith('http') ? '_blank' : '_self'}
                  rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
                  className={`glass p-6 rounded-2xl hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 transform hover:-translate-y-1 group ${
                    method.link === '#' ? 'cursor-default' : 'cursor-pointer'
                  }`}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
                      <i className={`${method.icon} text-white text-2xl`}></i>
                    </div>
                    <h4 className="font-semibold text-white group-hover:text-primary transition-colors duration-300 mb-2">
                      {method.title}
                    </h4>
                    <p className="text-sm text-gray-400 mb-2">{method.description}</p>
                    <p className="text-gray-300 text-sm break-all">{method.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="glass p-8 rounded-2xl text-center">
              <h4 className="text-2xl font-bold mb-8">Follow Me</h4>
              <div className="flex items-center justify-center space-x-8">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center group"
                    aria-label={link.name}
                  >
                    <div className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-primary hover:bg-primary/10 transition-all duration-300 transform hover:scale-110 mb-2">
                      <i className={`${link.icon} text-2xl`}></i>
                    </div>
                    <span className="text-sm text-gray-400 group-hover:text-primary transition-colors duration-300">
                      {link.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="glass p-8 rounded-2xl text-center">
              <h4 className="text-2xl font-bold mb-4">Ready to Work Together?</h4>
              <p className="text-gray-300 mb-6">
                Let's build something amazing together. Reach out and let's discuss your next project!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <a
                  href={`mailto:${personalInfo.email}`}
                  onClick={handleEmailClick}
                  className="inline-flex items-center bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
                >
                  <i className="fas fa-envelope mr-3"></i>
                  Get In Touch
                </a>
                <button
                  onClick={handleResumeDownload}
                  className="inline-flex items-center bg-gradient-to-r from-gray-600 to-gray-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-gray-500/25"
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